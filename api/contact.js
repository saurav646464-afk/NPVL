import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, organisation, interest, message } = req.body || {};

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const data = await resend.emails.send({
      from: 'NPVL Website <onboarding@resend.dev>',
      to: 'hello@npvlofficial.com',
      replyTo: email,
      subject: `[NPVL Website Enquiry] ${interest || 'General Enquiry'} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #111827; max-width: 600px; border: 1px solid #E5E7EB; rounded: 8px;">
          <h2 style="color: #E50914; margin-top: 0;">New Official Website Enquiry</h2>
          <hr style="border: none; border-top: 2px solid #E50914; margin-bottom: 20px;" />
          <p><strong>Full Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Organisation / Entity:</strong> ${organisation || 'Not specified'}</p>
          <p><strong>Area of Interest:</strong> ${interest || 'General Enquiry'}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #F9FAFB; border-left: 4px solid #E50914;">
            <strong>Message:</strong><br />
            <p style="white-space: pre-wrap; margin-top: 8px;">${message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #E5E7EB; margin-top: 30px;" />
          <p style="font-size: 12px; color: #6B7280;">Sent automatically from NPVL Website Contact Form.</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Resend Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
