const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
const QRCode = require('qrcode');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://nrfehxsfqtgrzkladwtn.supabase.co',
  'sb_publishable_qYaWUq0KarA2LxOPGgYYWw_YkdlJv0X'
);

async function generatePass(regId) {
  const { data: records, error } = await supabase
    .from('player_registrations')
    .select('*')
    .eq('registration_id', regId);

  if (error || !records || records.length === 0) {
    console.error('Player not found:', regId);
    return;
  }

  const p = records[0];
  console.log('Generating pass for:', p.full_name, p.registration_id);

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [85.6, 140],
  });

  const width = 85.6;
  const height = 140;

  // Background
  doc.setFillColor(18, 28, 56);
  doc.rect(0, 0, width, height, 'F');

  // Lanyard hole placeholder
  doc.setFillColor(10, 15, 30);
  doc.rect(0, 0, width, 5.5, 'F');
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(width / 2 - 8, 1.2, 16, 2.8, 1.4, 1.4, 'F');

  // White Header
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 5.5, width, 22.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(232, 32, 36);
  doc.text('NORTH PREMIER VOLLEYBALL LEAGUE', width / 2, 14, { align: 'center' });
  doc.setFontSize(6.5);
  doc.setTextColor(56, 84, 164);
  doc.text('OFFICIAL ATHLETE ACCREDITATION PASS', width / 2, 21, { align: 'center' });

  // Ribbon
  doc.setFillColor(232, 32, 36);
  doc.rect(0, 22.5, width, 5.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.8);
  doc.setTextColor(255, 255, 255);
  doc.text('SEASON 1 • OFFICIAL ATHLETE REGISTRATION ACCREDITATION', width / 2, 26.2, { align: 'center' });

  // Photo Area
  const photoX = width / 2 - 16;
  const photoY = 30.5;
  const photoW = 32;
  const photoH = 36;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(photoX, photoY, photoW, photoH, 2, 2, 'F');
  doc.setDrawColor(232, 32, 36);
  doc.setLineWidth(0.8);
  doc.roundedRect(photoX, photoY, photoW, photoH, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('PASSPORT', width / 2, photoY + 16, { align: 'center' });
  doc.text('PHOTO', width / 2, photoY + 22, { align: 'center' });

  // Candidate Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text(p.full_name.toUpperCase(), width / 2, 70, { align: 'center' });

  // Category Badge Pill
  doc.setFillColor(56, 84, 164);
  doc.roundedRect(width / 2 - 28, 72.5, 56, 6, 3, 3, 'F');
  doc.setFontSize(6.8);
  doc.setTextColor(255, 255, 255);
  doc.text((p.player_category || 'NATIONAL PLAYER').toUpperCase(), width / 2, 76.7, { align: 'center' });

  // Details Box
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(5, 81, width - 10, 52, 2.5, 2.5, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);
  doc.roundedRect(5, 81, width - 10, 52, 2.5, 2.5, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(18, 28, 56);

  // Row 1: REG ID + FEE PAID
  doc.text('REG ID:', 8, 86.5);
  doc.setTextColor(232, 32, 36);
  doc.text(p.registration_id, 24, 86.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(18, 28, 56);
  doc.text('FEE:', 53, 86.5);
  doc.setTextColor(22, 163, 74);
  doc.setFontSize(6);
  doc.text('500 PAID (VERIFIED)', 59, 86.5);
  doc.setFontSize(6.5);

  // Row 2: AADHAAR + DOB/AGE
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(18, 28, 56);
  doc.text('AADHAAR:', 8, 92);
  doc.setFont('helvetica', 'normal');
  const maskedAadhar = p.aadhar_no ? `XXXX XXXX ${String(p.aadhar_no).slice(-4)}` : 'XXXXXXXXXXXX';
  doc.text(maskedAadhar, 24, 92);
  doc.setFont('helvetica', 'bold');
  doc.text('DOB/AGE:', 50, 92);
  doc.setFont('helvetica', 'normal');
  doc.text(`${p.dob || '-'} (${p.age || '-'}Y)`, 63, 92);

  // Row 3: MOBILE + ROLE
  doc.setFont('helvetica', 'bold');
  doc.text('MOBILE:', 8, 97.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`${p.mobile_no || '-'}`, 24, 97.5);
  const position = p.medical_history?.playing_position || p.current_team_dept?.match(/Position:\s*([^|]+)/)?.[1]?.trim() || 'PLAYER';
  doc.setFont('helvetica', 'bold');
  doc.text('ROLE:', 50, 97.5);
  doc.setTextColor(232, 32, 36);
  doc.text(String(position).toUpperCase(), 61, 97.5);
  doc.setTextColor(18, 28, 56);

  // Row 4: CITY + STATE
  doc.setFont('helvetica', 'bold');
  doc.text('CITY:', 8, 103);
  doc.setFont('helvetica', 'normal');
  doc.text((p.city || '-').slice(0, 15), 20, 103);
  doc.setFont('helvetica', 'bold');
  doc.text('STATE:', 50, 103);
  doc.setFont('helvetica', 'normal');
  doc.text((p.state || '-').slice(0, 14), 61, 103);

  // QR Code
  try {
    const cleanRegId = encodeURIComponent(p.registration_id);
    const verificationUrl = `https://npvlofficial.com/?id=${cleanRegId}`;
    const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
      margin: 1,
      width: 140,
      color: { dark: '#121C38', light: '#FFFFFF' },
    });

    doc.addImage(qrDataUrl, 'PNG', 61, 106.5, 17, 17);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(4.2);
    doc.setTextColor(56, 84, 164);
    doc.text('SCAN TO VERIFY', 69.5, 125, { align: 'center' });
  } catch (_) {}

  // Stats
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(18, 28, 56);
  doc.text('HT/WT:', 8, 108.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`${p.height_cms || '-'}cm / ${p.weight_kgs || '-'}kg`, 20, 108.5);

  doc.setFont('helvetica', 'bold');
  doc.text('REACH:', 8, 114);
  doc.setFont('helvetica', 'normal');
  doc.text(`Std: - | Jmp: -`, 20, 114);

  doc.setFont('helvetica', 'bold');
  doc.text('ACHIEVE:', 8, 119.5);
  doc.setFont('helvetica', 'normal');
  doc.text((p.top_achievement || 'National Player').slice(0, 20), 22, 119.5);

  // Footer / Verification
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(22, 163, 74);
  doc.setFontSize(5.5);
  doc.text('NPVL LEAGUE ACCREDITED • OFFICIAL ENTRY PASS', 8, 125);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.2);
  doc.text(`ISSUED: ${new Date().toLocaleDateString('en-IN')}`, 8, 129);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(56, 84, 164);
  doc.setFontSize(5);
  doc.text('AUTHENTICATED BY NPVL LEAGUE COMMISSIONER', width / 2, 131, { align: 'center' });

  // Security Barcode Simulation
  doc.setFillColor(18, 28, 56);
  const barY = 133.5;
  for (let x = 8; x < width - 8; x += 1.8) {
    const barW = (x % 3 === 0) ? 1.1 : 0.6;
    doc.rect(x, barY, barW, 2.8, 'F');
  }

  // Footer Note
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(4.8);
  doc.setTextColor(203, 213, 225);
  doc.text('OFFICIAL REGISTRATION ENTRY PASS • PRESENT ORIGINAL AADHAAR AT VENUE', width / 2, 138, { align: 'center' });

  const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
  const safeName = p.full_name.trim().replace(/\s+/g, '_');
  const destFile1 = path.join(__dirname, `public/passes/${p.registration_id}.pdf`);
  const destFile2 = path.join(__dirname, `public/passes/NPVL_Official_ID_Pass_${safeName}.pdf`);
  const destFile3 = path.join(__dirname, `NPVL_Official_ID_Pass_${safeName}.pdf`);

  fs.writeFileSync(destFile1, pdfBuffer);
  fs.writeFileSync(destFile2, pdfBuffer);
  fs.writeFileSync(destFile3, pdfBuffer);

  console.log(`Saved passes for ${p.full_name}:`, destFile1);
}

async function run() {
  await generatePass('NPVL-2026-M9649');
  await generatePass('NPVL-2026-M9456');
  await generatePass('NPVL-2026-M1428');
  console.log('All 3 passes generated successfully!');
}

run();
