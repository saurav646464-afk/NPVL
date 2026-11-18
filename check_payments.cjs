const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://nrfehxsfqtgrzkladwtn.supabase.co',
  'sb_publishable_qYaWUq0KarA2LxOPGgYYWw_YkdlJv0X'
);

async function check() {
  const { data, error } = await supabase
    .from('player_registrations')
    .select('id, registration_id, full_name, mobile_no, payment_status, razorpay_payment_id, amount, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error:', error);
    return;
  }

  const paidPlayers = data.filter(p => p.payment_status === 'paid');
  console.log('Total records:', data.length);
  console.log('PAID records count:', paidPlayers.length);
  console.log('PAID sum @ 500:', paidPlayers.length * 500);

  // Check sum of amount column
  const sumAmount = paidPlayers.reduce((acc, p) => acc + (Number(p.amount) || 500), 0);
  console.log('Sum of amount column for paid players:', sumAmount);

  // Check pending or other statuses
  const nonPaid = data.filter(p => p.payment_status !== 'paid');
  console.log('Non-paid count:', nonPaid.length);
  
  const pendingWithPayId = data.filter(p => p.payment_status !== 'paid' && p.razorpay_payment_id);
  console.log('Non-paid with razorpay_payment_id:', JSON.stringify(pendingWithPayId, null, 2));

  console.log('\n--- Recent 15 non-paid registrations ---');
  nonPaid.slice(0, 15).forEach(p => {
    console.log(`${p.registration_id} | ${p.full_name} | ${p.mobile_no} | status: ${p.payment_status} | payId: ${p.razorpay_payment_id} | at: ${p.created_at}`);
  });
}

check();
