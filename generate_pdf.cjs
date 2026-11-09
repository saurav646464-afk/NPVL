const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const logoPath = 'C:/Users/ADMIN/.gemini/antigravity/brain/6326bfac-7025-4f93-bdb3-a991be619099/.user_uploaded/media_1794224069047_a060075f.png';
const logoBase64 = fs.readFileSync(logoPath).toString('base64');
const dataUri = 'data:image/png;base64,' + logoBase64;

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Razorpay KYC Requirements - The Backstory Media</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  @page {
    size: A4 portrait;
    margin: 10mm 12mm 10mm 12mm;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #1e293b;
    background: #ffffff;
    font-size: 10pt;
    line-height: 1.45;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .header-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2.5px solid #E22128;
    padding-bottom: 12px;
    margin-bottom: 14px;
  }

  .logo-wrap {
    max-width: 320px;
  }

  .logo-wrap img {
    width: 100%;
    height: auto;
    display: block;
  }

  .company-meta {
    text-align: right;
    font-size: 8.5pt;
    color: #475569;
    line-height: 1.35;
  }

  .company-meta .founder-title {
    color: #0f172a;
    font-weight: 800;
    font-size: 9.5pt;
  }

  .company-meta .agency-tag {
    color: #E22128;
    font-weight: 800;
    text-transform: uppercase;
    font-size: 8pt;
    letter-spacing: 0.5px;
  }

  .doc-hero {
    background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
    border-radius: 8px;
    padding: 14px 18px;
    color: #ffffff;
    margin-bottom: 14px;
    border-left: 5px solid #E22128;
  }

  .doc-hero h1 {
    font-size: 14pt;
    font-weight: 800;
    letter-spacing: 0.3px;
    margin-bottom: 3px;
    color: #ffffff;
  }

  .doc-hero .hero-sub {
    font-size: 8.5pt;
    color: #cbd5e1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .badge-tag {
    background: #E22128;
    color: #ffffff;
    font-weight: 800;
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 7.5pt;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .notice-banner {
    background: #FFF1F2;
    border: 1px solid #FECDD3;
    border-left: 4px solid #E22128;
    padding: 9px 12px;
    border-radius: 6px;
    font-size: 8.2pt;
    color: #9F1239;
    margin-bottom: 14px;
    line-height: 1.35;
  }

  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 12px;
  }

  .card {
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    padding: 10px 12px;
  }

  .card.highlight {
    background: #FFFBFB;
    border-color: #FECACA;
  }

  .card-header {
    font-size: 9pt;
    font-weight: 800;
    color: #0F172A;
    margin-bottom: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-tag {
    font-size: 6.8pt;
    font-weight: 800;
    padding: 2px 6px;
    border-radius: 4px;
    text-transform: uppercase;
  }

  .tag-green {
    background: #DCFCE7;
    color: #166534;
  }

  .tag-blue {
    background: #E0E7FF;
    color: #3730A3;
  }

  .checklist {
    list-style: none;
    font-size: 8.2pt;
    color: #334155;
  }

  .checklist li {
    position: relative;
    padding-left: 15px;
    margin-bottom: 5px;
    line-height: 1.3;
  }

  .checklist li:last-child {
    margin-bottom: 0;
  }

  .checklist li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: #E22128;
    font-size: 8.5pt;
    font-weight: 900;
  }

  .checklist li strong {
    color: #0F172A;
  }

  .checklist .subtext {
    font-size: 7.5pt;
    color: #64748B;
    display: block;
    margin-top: 1px;
  }

  .compliance-box {
    background: #F1F5F9;
    border: 1px solid #CBD5E1;
    border-radius: 8px;
    padding: 10px 14px;
    margin-bottom: 12px;
  }

  .compliance-box h3 {
    font-size: 9pt;
    font-weight: 800;
    color: #0F172A;
    margin-bottom: 4px;
  }

  .compliance-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    margin-top: 6px;
  }

  .pill {
    background: #ffffff;
    border: 1px solid #E2E8F0;
    border-radius: 6px;
    padding: 5px 6px;
    text-align: center;
    font-size: 7.5pt;
    font-weight: 700;
    color: #1E293B;
  }

  .pill span {
    display: block;
    color: #16A34A;
    font-weight: 800;
    font-size: 6.8pt;
  }

  .footer-sig {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #E2E8F0;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .sig-left {
    font-size: 7.8pt;
    color: #64748B;
    line-height: 1.35;
  }

  .sig-right {
    text-align: right;
  }

  .sig-title {
    font-size: 7.2pt;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #64748B;
    margin-bottom: 2px;
  }

  .sig-name {
    font-size: 10.5pt;
    font-weight: 800;
    color: #0F172A;
  }

  .sig-role {
    font-size: 7.8pt;
    color: #E22128;
    font-weight: 800;
  }

  .sig-company {
    font-size: 7.8pt;
    color: #475569;
    font-weight: 600;
  }
</style>
</head>
<body>

  <!-- Header -->
  <div class="header-card">
    <div class="logo-wrap">
      <img src="${dataUri}" alt="The Backstory Media" />
    </div>
    <div class="company-meta">
      <div class="agency-tag">Official Media & Tech Partner</div>
      <div class="founder-title">The Backstory Media</div>
      <div><strong>Founder:</strong> Shourabh Tomar</div>
      <div>Client: North Premier Volleyball League (NPVL)</div>
    </div>
  </div>

  <!-- Hero Section -->
  <div class="doc-hero">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <h1>Razorpay Payment Gateway — Required Documents</h1>
      <span class="badge-tag">Sole Proprietorship Model</span>
    </div>
    <div class="hero-sub" style="margin-top:4px;">
      <span>Prepared for: <strong>NPVL Executive & Management Board</strong></span>
      <span>KYC Activation: <strong>Fast-Track (24–48 Hours)</strong></span>
    </div>
  </div>

  <!-- Note Banner -->
  <div class="notice-banner">
    <strong>Instant Onboarding Flow:</strong> NPVL Sole Proprietorship status ke anusaar yeh sabse saral (simplest) documentation checklist hai. Isme kisi complex audited financial statement ya CA certificate ki aavashyakta nahi hai. Niche diye gaye 4 basic documents submit karte hi account instant live ho jata hai.
  </div>

  <!-- Section 1 & 2 in Grid -->
  <div class="grid-2">
    <!-- Box 1: Owner KYC -->
    <div class="card">
      <div class="card-header">
        <span>1. Proprietor KYC (Individual Proofs)</span>
        <span class="card-tag tag-blue">Mandatory</span>
      </div>
      <ul class="checklist">
        <li>
          <strong>Proprietor PAN Card</strong>
          <span class="subtext">Clear photo / scanned copy (Proprietor ka personal PAN card).</span>
        </li>
        <li>
          <strong>Proprietor Aadhaar Card</strong>
          <span class="subtext">Front & Back copy (Mobile number linked hona chahiye OTP verification ke liye).</span>
        </li>
      </ul>
    </div>

    <!-- Box 2: Business Proof -->
    <div class="card highlight">
      <div class="card-header">
        <span>2. Business Proof (Only 1 Required)</span>
        <span class="card-tag tag-green">Easiest & Free</span>
      </div>
      <ul class="checklist">
        <li>
          <strong>Udyam / MSME Registration Certificate</strong>
          <span class="subtext"><strong>Recommended:</strong> udyamregistration.gov.in se 10 min mein free download ho jata hai (Aadhaar + PAN se).</span>
        </li>
        <li>
          <strong>GST Certificate</strong> <em>(Optional)</em>
          <span class="subtext">Agar GST number registered hai toh de sakte hain (mandatory nahi hai).</span>
        </li>
      </ul>
    </div>
  </div>

  <!-- Section 3 & 4 in Grid -->
  <div class="grid-2">
    <!-- Box 3: Bank Details -->
    <div class="card">
      <div class="card-header">
        <span>3. Bank Account Proof (Payouts & Settlements)</span>
        <span class="card-tag tag-blue">Settlement</span>
      </div>
      <ul class="checklist">
        <li>
          <strong>Cancelled Cheque</strong> ya <strong>Bank Statement / Passbook First Page</strong>
          <span class="subtext">Account Holder Name, Account Number aur IFSC Code saaf dikhna chahiye.</span>
        </li>
        <li>
          <strong>Account Type:</strong> Firm Current Account ya Proprietor ka Savings Account (initial KYC ke liye dono valid hain).
        </li>
      </ul>
    </div>

    <!-- Box 4: Contact & Office Info -->
    <div class="card">
      <div class="card-header">
        <span>4. Official Business & Contact Info</span>
        <span class="card-tag tag-blue">Account Info</span>
      </div>
      <ul class="checklist">
        <li>
          <strong>Official Business Email ID</strong>
          <span class="subtext">Jisme Razorpay account login banega aur payment reports aayenge.</span>
        </li>
        <li>
          <strong>Official Mobile Number</strong>
          <span class="subtext">OTP verification aur transaction alerts ke liye.</span>
        </li>
        <li>
          <strong>Registered Office Address</strong>
          <span class="subtext">Full address with Pincode (website compliance ke liye zaroori).</span>
        </li>
      </ul>
    </div>
  </div>

  <!-- Website Compliance Checklist -->
  <div class="compliance-box">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <h3>5. Website Mandatory Policies (Handled by The Backstory Media)</h3>
      <span style="font-size:7pt; font-weight:800; color:#16A34A; background:#DCFCE7; padding:2px 8px; border-radius:4px;">MANAGED & INTEGRATED</span>
    </div>
    <p style="font-size:7.8pt; color:#475569; margin-top:2px;">
      Razorpay approval ke liye website par mandatory policy pages ka hona zaroori hota hai. Yeh sabhi pages <strong>The Backstory Media</strong> dwara website par integrate kiye ja rahe hain taaki pehle hi attempt mein approval mil sake:
    </p>
    <div class="compliance-grid">
      <div class="pill">
        <strong>Terms & Conditions</strong>
        <span>COMPLIANT</span>
      </div>
      <div class="pill">
        <strong>Privacy Policy</strong>
        <span>COMPLIANT</span>
      </div>
      <div class="pill">
        <strong>Refund & Cancellation</strong>
        <span>COMPLIANT</span>
      </div>
      <div class="pill">
        <strong>Contact Us & Support</strong>
        <span>COMPLIANT</span>
      </div>
    </div>
  </div>

  <!-- Signoff & Footer -->
  <div class="footer-sig">
    <div class="sig-left">
      <div><strong>Document Ref:</strong> TBM-NPVL-RZP-2026-v1</div>
      <div>Issued on: 09 November 2026 | Technical & Payment Integration Advisory</div>
      <div>Need assistance with Udyam registration? The Backstory Media team is ready to guide.</div>
    </div>
    <div class="sig-right">
      <div class="sig-title">Issued & Certified By:</div>
      <div class="sig-name">Shourabh Tomar</div>
      <div class="sig-role">Founder & Managing Director</div>
      <div class="sig-company">The Backstory Media</div>
    </div>
  </div>

</body>
</html>`;

const outHtml = path.resolve('razorpay_docs_thebackstorymedia.html');
fs.writeFileSync(outHtml, htmlContent, 'utf8');
console.log('HTML written to:', outHtml);

const outPdf = path.resolve('Razorpay_KYC_Documents_TheBackstoryMedia.pdf');
const chromePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const cmd = `"${chromePath}" --headless --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf="${outPdf}" --no-pdf-header-footer "${outHtml}"`;
console.log('Running Edge headless print to PDF...');
try {
  execSync(cmd, { stdio: 'inherit' });
  console.log('PDF Created successfully at:', outPdf);
} catch (err) {
  console.error('Edge print failed:', err);
}
