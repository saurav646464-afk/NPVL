const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://nrfehxsfqtgrzkladwtn.supabase.co',
  'sb_publishable_qYaWUq0KarA2LxOPGgYYWw_YkdlJv0X'
);

async function checkAllNotesAgainstDb() {
  const csv = fs.readFileSync('razorpay_invoice.csv', 'utf8');
  const lines = csv.split('\n').filter(l => l.trim().length > 0);

  const { data: dbRecords } = await supabase
    .from('player_registrations')
    .select('id, full_name, mobile_no, registration_id, razorpay_payment_id, created_at');

  const regMap = new Map();
  dbRecords.forEach(r => regMap.set(r.registration_id, r));

  const mobileMap = new Map();
  dbRecords.forEach(r => {
    const cleanMob = r.mobile_no.replace(/\D/g, '').slice(-10);
    mobileMap.set(cleanMob, r);
  });

  const missingPlayers = [];
  const mismatchedPayIds = [];

  lines.slice(1).forEach((l) => {
    const parts = l.split(',');
    if (parts[1] !== 'payment') return;
    const payId = parts[0];
    const notesMatch = l.match(/"({.*})"/);
    if (notesMatch) {
      try {
        const cleanJson = notesMatch[1].replace(/""/g, '"');
        const notes = JSON.parse(cleanJson);
        const cleanMob = String(notes.mobile_no || '').replace(/\D/g, '').slice(-10);
        
        const byMobile = mobileMap.get(cleanMob);
        const byRegId = regMap.get(notes.registration_id);

        if (!byMobile) {
          missingPlayers.push({
            notes,
            payId,
            conflictedDbRecord: byRegId ? { name: byRegId.full_name, reg_id: byRegId.registration_id, mobile: byRegId.mobile_no, pay_id: byRegId.razorpay_payment_id } : null
          });
        } else if (byMobile.razorpay_payment_id !== payId) {
          mismatchedPayIds.push({
            player: byMobile.full_name,
            reg_id: byMobile.registration_id,
            dbPayId: byMobile.razorpay_payment_id,
            rzpPayId: payId
          });
        }
      } catch (e) {}
    }
  });

  console.log('Total completely missing players from DB:', missingPlayers.length);
  console.log('Missing players details:', JSON.stringify(missingPlayers, null, 2));

  console.log('\nMismatched payment IDs for existing players:', mismatchedPayIds.length);
  console.log(JSON.stringify(mismatchedPayIds, null, 2));
}

checkAllNotesAgainstDb();
