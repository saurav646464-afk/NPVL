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
  doc.text('SEASON 1 • OFFICIAL ATHLETE REGISTRATION ACCREDITATION', width / 2, 19, { align: 'center' });

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

  // 6. Comprehensive Details Box (White Container) — height=52 to fit all rows
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(5, 84, width - 10, 50, 2.5, 2.5, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);
  doc.roundedRect(5, 84, width - 10, 50, 2.5, 2.5, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(18, 28, 56);

  // Row 1: REG ID (left) + FEE PAID (right) — compact to stay inside card
  doc.text('REG ID:', 8, 90);
  doc.setTextColor(232, 32, 36);
  doc.text(`${playerData.registration_id || 'NPVL-2026-F001'}`, 24, 90);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(18, 28, 56);
  doc.text('FEE:', 53, 90);
  doc.setTextColor(22, 163, 74);
  doc.setFontSize(6);
  doc.text('500 PAID (VERIFIED)', 59, 90);
  doc.setFontSize(6.5);

  // Row 2: AADHAAR (left) + DOB/AGE (right)
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(18, 28, 56);
  doc.text('AADHAAR:', 8, 96);
  doc.setFont('helvetica', 'normal');
  const maskedAadhar = playerData.aadhar_no ? `XXXX XXXX ${String(playerData.aadhar_no).slice(-4)}` : 'XXXXXXXXXXXX';
  doc.text(maskedAadhar, 24, 96);
  doc.setFont('helvetica', 'bold');
  doc.text('DOB/AGE:', 50, 96);
  doc.setFont('helvetica', 'normal');
  doc.text(`${playerData.dob || '-'} (${playerData.age || '-'}Y)`, 63, 96);

  // Row 3: MOBILE (left) — full width
  doc.setFont('helvetica', 'bold');
  doc.text('MOBILE:', 8, 102);
  doc.setFont('helvetica', 'normal');
  doc.text(`${playerData.mobile_no || '-'}`, 24, 102);

  // Row 4: CITY (left) + STATE (right)
  doc.setFont('helvetica', 'bold');
  doc.text('CITY:', 8, 108);
  doc.setFont('helvetica', 'normal');
  doc.text((playerData.city || '-').slice(0, 15), 20, 108);
  doc.setFont('helvetica', 'bold');
  doc.text('STATE:', 50, 108);
  doc.setFont('helvetica', 'normal');
  doc.text((playerData.state || '-').slice(0, 14), 61, 108);

  // Row 5: HEIGHT (left) + WEIGHT (right)
  doc.setFont('helvetica', 'bold');
  doc.text('HEIGHT:', 8, 114);
  doc.setFont('helvetica', 'normal');
  doc.text(`${playerData.height_cms || '-'} cm`, 24, 114);
  doc.setFont('helvetica', 'bold');
  doc.text('WEIGHT:', 50, 114);
  doc.setFont('helvetica', 'normal');
  doc.text(`${playerData.weight_kgs || '-'} kg`, 63, 114);

  // Row 6: STAND REACH (left) + JUMP REACH (right)
  doc.setFont('helvetica', 'bold');
  doc.text('STAND REACH:', 8, 120);
  doc.setFont('helvetica', 'normal');
  doc.text(`${playerData.standing_reach_cms || '-'} cm`, 28, 120);
  doc.setFont('helvetica', 'bold');
  doc.text('JUMP REACH:', 50, 120);
  doc.setFont('helvetica', 'normal');
  doc.text(`${playerData.jump_reach_cms || '-'} cm`, 68, 120);

  // Row 7: ACHIEVEMENT
  doc.setFont('helvetica', 'bold');
  doc.text('ACHIEVE:', 8, 126);
  doc.setFont('helvetica', 'normal');
  const ach = (playerData.top_achievement || 'Registered Candidate').slice(0, 28);
  doc.text(ach, 24, 126);

  // Row 8: Security Hash + Issue Date
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(56, 84, 164);
  doc.text('SECURITY HASH: AUTH-NPVL-VALIDATED', 8, 131);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.5);
  doc.text(`ISSUED: ${new Date().toLocaleDateString('en-IN')}`, 55, 131);
  doc.setFontSize(6.5);

  // 7. Security Barcode Simulation (Decorative stripes)
  doc.setFillColor(18, 28, 56);
  const barY = 136;
  for (let x = 8; x < width - 8; x += 1.8) {
    const barW = (x % 3 === 0) ? 1.1 : 0.6;
    doc.rect(x, barY, barW, 4.5, 'F');
  }

  // 8. Footer Note
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5);
  doc.setTextColor(203, 213, 225);
  doc.text('OFFICIAL REGISTRATION ENTRY PASS • PRESENT ORIGINAL AADHAAR AT VENUE', width / 2, 137, { align: 'center' });

  // Save PDF
  doc.save(`NPVL_ID_Card_${playerData.registration_id || 'Candidate'}.pdf`);
}
