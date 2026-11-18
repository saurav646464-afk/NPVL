const fs = require('fs');
const csv = fs.readFileSync('razorpay_invoice.csv', 'utf8');
const lines = csv.split('\n').filter(l => l.trim().length > 0);

const regIdCounts = new Map();
let parsedNotesCount = 0;

lines.slice(1).forEach((l) => {
  const parts = l.split(',');
  if (parts[1] !== 'payment') return;
  const payId = parts[0];
  const notesMatch = l.match(/"({.*})"/);
  if (notesMatch) {
    try {
      const cleanJson = notesMatch[1].replace(/""/g, '"');
      const notes = JSON.parse(cleanJson);
      const regId = notes.registration_id;
      parsedNotesCount++;
      if (regId) {
        if (!regIdCounts.has(regId)) regIdCounts.set(regId, []);
        regIdCounts.get(regId).push({ payId, name: notes.full_name, mobile: notes.mobile_no });
      }
    } catch (e) {
      console.error('JSON parse err:', e.message);
    }
  }
});

console.log('Total notes parsed:', parsedNotesCount);
for (const [regId, list] of regIdCounts.entries()) {
  if (list.length > 1) {
    console.log('Collision on regId:', regId, JSON.stringify(list, null, 2));
  }
}
