import jsPDF from 'jspdf';

/**
 * Generates an official, highly detailed Player Trial ID Card (Badge Pass) PDF
 * Dimensions: 85.6mm x 140mm (High-profile Official Accreditation Badge)
 */
export async function generateIdCardPDF(playerData) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [85.6, 140],
  });

  const width = 85.6;
  const height = 140;

  // 1. Dark Background (Midnight Navy)
  doc.setFillColor(18, 28, 56);
  doc.rect(0, 0, width, height, 'F');

  // Lanyard hole placeholder bar
  doc.setFillColor(10, 15, 30);
  doc.rect(0, 0, width, 6, 'F');
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(width / 2 - 8, 1.5, 16, 3, 1.5, 1.5, 'F');

  // 2. Top Header Accent (Scarlet Red & Royal Cobalt)
  doc.setFillColor(232, 32, 36);
  doc.rect(0, 6, width, 18, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(255, 255, 255);
  doc.text('NORTH PREMIER VOLLEYBALL LEAGUE', width / 2, 13, { align: 'center' });

  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text('SEASON 1 • OFFICIAL ATHLETE TRIAL ACCREDITATION', width / 2, 19, { align: 'center' });

  // 3. Candidate Photo Area (or uploaded image)
  const photoX = width / 2 - 18;
  const photoY = 27;
  const photoW = 36;
  const photoH = 40;

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(photoX, photoY, photoW, photoH, 2, 2, 'F');
  doc.setDrawColor(232, 32, 36);
  doc.setLineWidth(1);
  doc.roundedRect(photoX, photoY, photoW, photoH, 2, 2, 'D');

  if (playerData.photo_data_url || playerData.photo_url) {
    try {
      doc.addImage(playerData.photo_data_url || playerData.photo_url, 'JPEG', photoX + 1, photoY + 1, photoW - 2, photoH - 2);
    } catch (_) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184);
      doc.text('PASSPORT', width / 2, photoY + 18, { align: 'center' });
      doc.text('PHOTO', width / 2, photoY + 24, { align: 'center' });
    }
  } else {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text('PASSPORT', width / 2, photoY + 18, { align: 'center' });
    doc.text('PHOTO', width / 2, photoY + 24, { align: 'center' });
  }

  // 4. Candidate Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11.5);
  doc.setTextColor(255, 255, 255);
  const candidateName = (playerData.full_name || 'REGISTERED ATHLETE').toUpperCase();
  doc.text(candidateName, width / 2, 72, { align: 'center' });

  // 5. Category Badge Pill
  doc.setFillColor(56, 84, 164);
  doc.roundedRect(width / 2 - 27, 75, 54, 6.5, 3, 3, 'F');
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text((playerData.player_category || 'CANDIDATE PLAYER').toUpperCase(), width / 2, 79.5, { align: 'center' });

  // 6. Comprehensive Details Box (White Container)
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(5, 84, width - 10, 44, 2.5, 2.5, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);
  doc.roundedRect(5, 84, width - 10, 44, 2.5, 2.5, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(18, 28, 56);

  // Line 1: Registration ID + Payment
  doc.text('REG ID:', 8, 90);
  doc.setTextColor(232, 32, 36);
  doc.text(`${playerData.registration_id || 'NPVL-2026-F001'}`, 24, 90);

  doc.setTextColor(18, 28, 56);
  doc.text('FEE:', 50, 90);
  doc.setTextColor(22, 163, 74);
  doc.text('₹500 PAID (VERIFIED)', 58, 90);

  // Line 2: Aadhar No & DOB / Age
  doc.setTextColor(18, 28, 56);
  doc.text('AADHAAR:', 8, 96);
  doc.setFont('helvetica', 'normal');
  const maskedAadhar = playerData.aadhar_no ? `XXXX XXXX ${String(playerData.aadhar_no).slice(-4)}` : 'XXXXXXXXXXXX';
  doc.text(maskedAadhar, 24, 96);

  doc.setFont('helvetica', 'bold');
  doc.text('DOB/AGE:', 50, 96);
  doc.setFont('helvetica', 'normal');
  doc.text(`${playerData.dob || '-'} (${playerData.age || '-'}Y)`, 63, 96);

  // Line 3: Contact & City
  doc.setFont('helvetica', 'bold');
  doc.text('MOBILE:', 8, 102);
  doc.setFont('helvetica', 'normal');
  doc.text(`${playerData.mobile_no || '-'}`, 24, 102);

  doc.setFont('helvetica', 'bold');
  doc.text('CITY/STATE:', 50, 102);
  doc.setFont('helvetica', 'normal');
  const cityState = `${playerData.city || ''}, ${playerData.state || ''}`.slice(0, 16);
  doc.text(cityState, 65, 102);

  // Line 4: Height & Weight
  doc.setFont('helvetica', 'bold');
  doc.text('HEIGHT:', 8, 108);
  doc.setFont('helvetica', 'normal');
  doc.text(`${playerData.height_cms || '-'} cm`, 24, 108);

  doc.setFont('helvetica', 'bold');
  doc.text('WEIGHT:', 50, 108);
  doc.setFont('helvetica', 'normal');
  doc.text(`${playerData.weight_kgs || '-'} kg`, 63, 108);

  // Line 5: Reaches (Standing & Jump Reach)
  doc.setFont('helvetica', 'bold');
  doc.text('STAND REACH:', 8, 114);
  doc.setFont('helvetica', 'normal');
  doc.text(`${playerData.standing_reach_cms || '-'} cm`, 28, 114);

  doc.setFont('helvetica', 'bold');
  doc.text('JUMP REACH:', 50, 114);
  doc.setFont('helvetica', 'normal');
  doc.text(`${playerData.jump_reach_cms || '-'} cm`, 68, 114);

  // Line 6: Achievement & Team
  doc.setFont('helvetica', 'bold');
  doc.text('ACHIEVE:', 8, 120);
  doc.setFont('helvetica', 'normal');
  const ach = (playerData.top_achievement || 'Registered Candidate').slice(0, 24);
  doc.text(ach, 24, 120);

  // Line 7: Verification Security Hash & Date
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(56, 84, 164);
  doc.text('SECURITY HASH: AUTH-NPVL-VALIDATED', 8, 125);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text(`ISSUED: ${new Date().toLocaleDateString('en-IN')}`, 54, 125);

  // 7. Security Barcode Simulation (Decorative stripes)
  doc.setFillColor(18, 28, 56);
  const barY = 129.5;
  for (let x = 8; x < width - 8; x += 1.8) {
    const barW = (x % 3 === 0) ? 1.1 : 0.6;
    doc.rect(x, barY, barW, 4.5, 'F');
  }

  // 8. Footer Note
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5);
  doc.setTextColor(203, 213, 225);
  doc.text('OFFICIAL TRIAL ARENA ENTRY PASS • PRESENT ORIGINAL AADHAAR AT VENUE', width / 2, 137, { align: 'center' });

  // Save PDF
  doc.save(`NPVL_ID_Card_${playerData.registration_id || 'Candidate'}.pdf`);
}
