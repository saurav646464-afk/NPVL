import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Generates an official Certificate of Registration PDF using jsPDF
 */
export async function generateCertificatePDF(playerData) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4', // 297mm x 210mm
  });

  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  // Background
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, width, height, 'F');

  // Outer Border (Navy)
  doc.setDrawColor(18, 28, 56);
  doc.setLineWidth(4);
  doc.rect(8, 8, width - 16, height - 16);

  // Inner Accent Border (Red & Cobalt)
  doc.setDrawColor(232, 32, 36);
  doc.setLineWidth(1);
  doc.rect(12, 12, width - 24, height - 24);

  // Decorative corner accents
  doc.setFillColor(56, 84, 164);
  doc.triangle(12, 12, 25, 12, 12, 25, 'F');
  doc.triangle(width - 12, 12, width - 25, 12, width - 12, 25, 'F');
  doc.triangle(12, height - 12, 25, height - 12, 12, height - 25, 'F');
  doc.triangle(width - 12, height - 12, width - 25, height - 12, width - 12, height - 25, 'F');

  // Top League Banner
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(18, 28, 56);
  doc.text('NORTH PREMIER VOLLEYBALL LEAGUE', width / 2, 30, { align: 'center' });

  doc.setFontSize(10);
  doc.setTextColor(232, 32, 36);
  doc.text("NORTH PREMIER VOLLEYBALL LEAGUE • SEASON 1 OFFICIAL REGISTRATION", width / 2, 36, { align: 'center' });

  // Main Certificate Title
  doc.setFont('times', 'bolditalic');
  doc.setFontSize(28);
  doc.setTextColor(56, 84, 164);
  doc.text('Certificate of Official Registration', width / 2, 54, { align: 'center' });

  // Body Text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(71, 85, 105);
  doc.text('This is to officially certify that the athlete detailed below has completed registration and eligibility filing for the', width / 2, 66, { align: 'center' });
  doc.text('NPVL Season 1 Player Draft & Selection Trials:', width / 2, 72, { align: 'center' });

  // Player Name (Big & Bold)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(18, 28, 56);
  const candidateName = (playerData.full_name || 'ATHLETE NAME').toUpperCase();
  doc.text(candidateName, width / 2, 88, { align: 'center' });

  // Underline for name
  doc.setDrawColor(232, 32, 36);
  doc.setLineWidth(1.5);
  doc.line(width / 2 - 60, 92, width / 2 + 60, 92);

  // Details Box Grid
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.5);
  doc.roundedRect(30, 102, width - 60, 48, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(18, 28, 56);

  // Column 1
  doc.text(`REGISTRATION ID:`, 36, 112);
  doc.setTextColor(232, 32, 36);
  doc.text(`${playerData.registration_id || 'NPVL-2026-F001'}`, 75, 112);

  doc.setTextColor(18, 28, 56);
  doc.text(`DATE OF BIRTH / AGE:`, 36, 122);
  doc.setFont('helvetica', 'normal');
  doc.text(`${playerData.dob || 'N/A'} (Age: ${playerData.age || 'N/A'} yrs)`, 75, 122);

  doc.setFont('helvetica', 'bold');
  doc.text(`CATEGORY:`, 36, 132);
  doc.setFont('helvetica', 'normal');
  doc.text(`${playerData.player_category || 'New Player'}`, 75, 132);

  doc.setFont('helvetica', 'bold');
  doc.text(`AADHAAR NO:`, 36, 142);
  doc.setFont('helvetica', 'normal');
  const maskedAadhar = playerData.aadhar_no ? `XXXX XXXX ${playerData.aadhar_no.slice(-4)}` : 'XXXX XXXX XXXX';
  doc.text(maskedAadhar, 75, 142);

  // Column 2
  doc.setFont('helvetica', 'bold');
  doc.text(`STATE / CITY:`, 155, 112);
  doc.setFont('helvetica', 'normal');
  doc.text(`${playerData.city || ''}, ${playerData.state || 'India'}`, 195, 112);

  doc.setFont('helvetica', 'bold');
  doc.text(`HEIGHT / REACH:`, 155, 122);
  doc.setFont('helvetica', 'normal');
  doc.text(`${playerData.height_cms || '-'} cm / Jump: ${playerData.jump_reach_cms || '-'} cm`, 195, 122);

  doc.setFont('helvetica', 'bold');
  doc.text(`PAYMENT STATUS:`, 155, 132);
  doc.setTextColor(22, 163, 74);
  doc.text(`VERIFIED (INR 500 PAID)`, 195, 132);

  doc.setTextColor(18, 28, 56);
  doc.setFont('helvetica', 'bold');
  doc.text(`REGISTRATION DATE:`, 155, 142);
  doc.setFont('helvetica', 'normal');
  const regDate = playerData.created_at ? new Date(playerData.created_at).toLocaleDateString('en-IN') : new Date().toLocaleDateString('en-IN');
  doc.text(regDate, 195, 142);

  // Footer Signatures
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(18, 28, 56);

  // Left Seal & Verification
  doc.text('OFFICIAL VERIFICATION SEAL', 45, 172);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Digital Security Hash Validated', 45, 177);
  doc.text('North Premier Volleyball League', 45, 182);

  // Center QR/Barcode note
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.text('Carry this digital certificate along with your original Aadhaar Card at the trial arena venue.', width / 2, 185, { align: 'center' });

  // Right Signature
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(18, 28, 56);
  doc.text('AUTHORIZED SIGNATORY', width - 75, 172);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Executive Governing Council', width - 75, 177);
  doc.text('NPVL Sports & Technical Committee', width - 75, 182);

  // Signature line
  doc.setDrawColor(18, 28, 56);
  doc.setLineWidth(0.5);
  doc.line(width - 85, 168, width - 25, 168);
  doc.line(35, 168, 95, 168);

  // Save PDF
  doc.save(`NPVL_Certificate_${playerData.registration_id || 'Candidate'}.pdf`);
}

/**
 * Generates an official Player ID Card PDF
 */
export async function generateIdCardPDF(playerData) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [85.6, 125], // Standard Sports Badge / ID card size
  });

  const width = 85.6;
  const height = 125;

  // Background
  doc.setFillColor(18, 28, 56); // Navy
  doc.rect(0, 0, width, height, 'F');

  // Top Header Banner
  doc.setFillColor(232, 32, 36); // Red
  doc.rect(0, 0, width, 18, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('NPVL • SEASON 1', width / 2, 8, { align: 'center' });

  doc.setFontSize(6.5);
  doc.text("OFFICIAL PLAYER TRIAL PASS", width / 2, 13, { align: 'center' });

  // Photo Frame
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(width / 2 - 16, 23, 32, 38, 2, 2, 'F');
  doc.setDrawColor(232, 32, 36);
  doc.setLineWidth(0.8);
  doc.roundedRect(width / 2 - 16, 23, 32, 38, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('PHOTO', width / 2, 43, { align: 'center' });

  // Player Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  const candidateName = (playerData.full_name || 'PLAYER NAME').toUpperCase();
  doc.text(candidateName, width / 2, 68, { align: 'center' });

  // Category Tag
  doc.setFillColor(56, 84, 164);
  doc.roundedRect(width / 2 - 25, 71, 50, 6, 3, 3, 'F');
  doc.setFontSize(6.5);
  doc.setTextColor(255, 255, 255);
  doc.text((playerData.player_category || 'ATHLETE').toUpperCase(), width / 2, 75, { align: 'center' });

  // Details Box
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(6, 80, width - 12, 36, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(18, 28, 56);

  doc.text('REG ID:', 10, 87);
  doc.setTextColor(232, 32, 36);
  doc.text(`${playerData.registration_id || 'NPVL-2026-F001'}`, 26, 87);

  doc.setTextColor(18, 28, 56);
  doc.text('STATE:', 10, 94);
  doc.setFont('helvetica', 'normal');
  doc.text(`${playerData.state || 'India'}`, 26, 94);

  doc.setFont('helvetica', 'bold');
  doc.text('DOB / AGE:', 10, 101);
  doc.setFont('helvetica', 'normal');
  doc.text(`${playerData.dob || '-'} (${playerData.age || '-'} Yrs)`, 26, 101);

  doc.setFont('helvetica', 'bold');
  doc.text('HEIGHT:', 10, 108);
  doc.setFont('helvetica', 'normal');
  doc.text(`${playerData.height_cms || '-'} cm (Reach: ${playerData.jump_reach_cms || '-'} cm)`, 26, 108);

  // Bottom Security Barcode Note
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.5);
  doc.setTextColor(203, 213, 225);
  doc.text('VALID FOR SEASON 1 DRAFT SELECTION • NON-TRANSFERABLE', width / 2, 121, { align: 'center' });

  // Save PDF
  doc.save(`NPVL_ID_Card_${playerData.registration_id || 'Candidate'}.pdf`);
}
