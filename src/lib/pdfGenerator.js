import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import { NPVL_CREST_LOGO } from './logoBase64';

/**
 * Generates an official, highly detailed Player Accreditation ID Card (Badge Pass) PDF
 * Dimensions: 85.6mm x 140mm (High-profile Official Accreditation Badge)
 */
export async function generateIdCardPDF(data) {
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
  doc.rect(0, 0, width, 5.5, 'F');
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(width / 2 - 8, 1.2, 16, 2.8, 1.4, 1.4, 'F');

  // 2. Top Header with Official NPVL Logo
  // White crisp container for official logo
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 5.5, width, 22.5, 'F');

  // Place official NPVL Vector Crest Logo
  try {
    const logoW = 20;
    const logoH = 15;
    const logoX = width / 2 - logoW / 2;
    const logoY = 6.2;
    doc.addImage(NPVL_CREST_LOGO, 'PNG', logoX, logoY, logoW, logoH);
  } catch (err) {
    console.warn('Logo embed note:', err);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(232, 32, 36);
    doc.text('NORTH PREMIER VOLLEYBALL LEAGUE', width / 2, 14, { align: 'center' });
  }

  // Header Subtitle ribbon
  doc.setFillColor(232, 32, 36);
  doc.rect(0, 22.5, width, 5.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.8);
  doc.setTextColor(255, 255, 255);
  doc.text('SEASON 1 • OFFICIAL ATHLETE REGISTRATION ACCREDITATION', width / 2, 26.2, { align: 'center' });

  // 3. Photo Area
  const photoX = width / 2 - 16;
  const photoY = 30.5;
  const photoW = 32;
  const photoH = 36;

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(photoX, photoY, photoW, photoH, 2, 2, 'F');
  doc.setDrawColor(232, 32, 36);
  doc.setLineWidth(0.8);
  doc.roundedRect(photoX, photoY, photoW, photoH, 2, 2, 'D');

  if (data.photo_data_url || data.photo_url) {
    try {
      doc.addImage(data.photo_data_url || data.photo_url, 'JPEG', photoX + 0.8, photoY + 0.8, photoW - 1.6, photoH - 1.6);
    } catch (_) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text('PASSPORT', width / 2, photoY + 16, { align: 'center' });
      doc.text('PHOTO', width / 2, photoY + 22, { align: 'center' });
    }
  } else {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text('PASSPORT', width / 2, photoY + 16, { align: 'center' });
    doc.text('PHOTO', width / 2, photoY + 22, { align: 'center' });
  }

  // 4. Candidate Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  const candidateName = (data.full_name || 'OFFICIAL ATHLETE').toUpperCase();
  doc.text(candidateName, width / 2, 70, { align: 'center' });

  // 5. Category Badge Pill (Royal Cobalt)
  doc.setFillColor(56, 84, 164);
  doc.roundedRect(width / 2 - 28, 72.5, 56, 6, 3, 3, 'F');
  doc.setFontSize(6.8);
  doc.setTextColor(255, 255, 255);
  doc.text((data.player_category || 'CANDIDATE PLAYER').toUpperCase(), width / 2, 76.7, { align: 'center' });

  // 6. Comprehensive Details Box (White Container)
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(5, 81, width - 10, 52, 2.5, 2.5, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);
  doc.roundedRect(5, 81, width - 10, 52, 2.5, 2.5, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(18, 28, 56);

  // Row 1: REG ID (left) + FEE PAID (right)
  doc.text('REG ID:', 8, 86.5);
  doc.setTextColor(232, 32, 36);
  doc.text(`${data.registration_id || 'NPVL-2026-M0001'}`, 24, 86.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(18, 28, 56);
  doc.text('FEE:', 53, 86.5);
  doc.setTextColor(22, 163, 74);
  doc.setFontSize(6);
  doc.text('500 PAID (VERIFIED)', 59, 86.5);
  doc.setFontSize(6.5);

  // Row 2: AADHAAR (left) + DOB/AGE (right)
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(18, 28, 56);
  doc.text('AADHAAR:', 8, 92);
  doc.setFont('helvetica', 'normal');
  const maskedAadhar = data.aadhar_no ? `XXXX XXXX ${String(data.aadhar_no).slice(-4)}` : 'XXXXXXXXXXXX';
  doc.text(maskedAadhar, 24, 92);
  doc.setFont('helvetica', 'bold');
  doc.text('DOB/AGE:', 50, 92);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.dob || '-'} (${data.age || '-'}Y)`, 63, 92);

  // Row 3: MOBILE
  doc.setFont('helvetica', 'bold');
  doc.text('MOBILE:', 8, 97.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.mobile_no || '-'}`, 24, 97.5);

  // Row 4: CITY (left) + STATE (right)
  doc.setFont('helvetica', 'bold');
  doc.text('CITY:', 8, 103);
  doc.setFont('helvetica', 'normal');
  doc.text((data.city || '-').slice(0, 15), 20, 103);
  doc.setFont('helvetica', 'bold');
  doc.text('STATE:', 50, 103);
  doc.setFont('helvetica', 'normal');
  doc.text((data.state || '-').slice(0, 14), 61, 103);

  // Left Details + Right QR Code layout for Rows 5 to 7
  // QR Code on right side: x=61, y=106.5, size=17mm
  try {
    const cleanRegId = encodeURIComponent(data.registration_id || 'NPVL-2026-M0001');
    const verificationUrl = `https://npvlofficial.com/?id=${cleanRegId}`;
    
    const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
      margin: 1,
      width: 140,
      color: {
        dark: '#121C38',
        light: '#FFFFFF',
      },
    });

    doc.addImage(qrDataUrl, 'PNG', 61, 106.5, 17, 17);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(4.2);
    doc.setTextColor(56, 84, 164);
    doc.text('SCAN TO VERIFY', 69.5, 125, { align: 'center' });
  } catch (qrErr) {
    console.warn('QR generation note:', qrErr);
  }

  // PLAYER DETAILS (Left column up to x=58)
  // Row 5: HEIGHT & WEIGHT
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(18, 28, 56);
  doc.text('HT/WT:', 8, 108.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.height_cms || '-'}cm / ${data.weight_kgs || '-'}kg`, 20, 108.5);

  // Row 6: STAND & JUMP REACH
  doc.setFont('helvetica', 'bold');
  doc.text('REACH:', 8, 114);
  doc.setFont('helvetica', 'normal');
  doc.text(`Std: ${data.standing_reach_cms || '-'}cm | Jmp: ${data.jump_reach_cms || '-'}cm`, 20, 114);

  // Row 7: ACHIEVEMENT
  doc.setFont('helvetica', 'bold');
  doc.text('ACHIEVE:', 8, 119.5);
  doc.setFont('helvetica', 'normal');
  const ach = (data.top_achievement || 'Registered Athlete').slice(0, 20);
  doc.text(ach, 22, 119.5);

  // Row 8: Official Verification & Date
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(22, 163, 74);
  doc.setFontSize(5.5);
  doc.text('NPVL LEAGUE ACCREDITED • OFFICIAL ENTRY PASS', 8, 125);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.2);
  doc.text(`ISSUED: ${new Date().toLocaleDateString('en-IN')}`, 8, 129);

  // Row 9: Commissioner Digital Verification
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(56, 84, 164);
  doc.setFontSize(5);
  doc.text('AUTHENTICATED BY NPVL LEAGUE COMMISSIONER', width / 2, 131, { align: 'center' });

  // 7. Security Barcode Simulation (Decorative stripes)
  doc.setFillColor(18, 28, 56);
  const barY = 133.5;
  for (let x = 8; x < width - 8; x += 1.8) {
    const barW = (x % 3 === 0) ? 1.1 : 0.6;
    doc.rect(x, barY, barW, 2.8, 'F');
  }

  // 8. Footer Note
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(4.8);
  doc.setTextColor(203, 213, 225);
  doc.text('OFFICIAL REGISTRATION ENTRY PASS • PRESENT ORIGINAL AADHAAR AT VENUE', width / 2, 138, { align: 'center' });

  // Save PDF
  doc.save(`NPVL_Player_ID_${data.registration_id || 'Pass'}.pdf`);
}
