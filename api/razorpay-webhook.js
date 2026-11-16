import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nrfehxsfqtgrzkladwtn.supabase.co';
const supabaseAnonKey = 'sb_publishable_qYaWUq0KarA2LxOPGgYYWw_YkdlJv0X';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const event = req.body?.event;
    const payload = req.body?.payload;

    console.log('[Razorpay Webhook] Received event:', event);

    if (event === 'payment.captured') {
      const payment = payload?.payment?.entity;
      if (!payment) {
        return res.status(200).json({ status: 'ignored_no_payment_entity' });
      }

      const paymentId = payment.id;
      const amount = payment.amount ? payment.amount / 100 : 500;
      const notes = payment.notes || {};
      const regId = notes.registration_id || null;
      const contact = payment.contact || notes.mobile_no || '';
      const email = payment.email || notes.email || '';
      const fullName = notes.full_name || 'REGISTERED PLAYER';

      console.log(`[Razorpay Webhook] Processing payment.captured: ${paymentId} for ${fullName} (${contact})`);

      // Wait 5 seconds to allow the user's browser to complete normal registration insert first
      await new Promise((resolve) => setTimeout(resolve, 5000));

      // 1. Check if record already exists by payment ID or registration ID
      let existingRecord = null;

      const { data: byPayId } = await supabase
        .from('player_registrations')
        .select('id, registration_id, payment_status')
        .eq('razorpay_payment_id', paymentId)
        .limit(1);

      if (byPayId && byPayId.length > 0) {
        existingRecord = byPayId[0];
      } else if (regId) {
        const { data: byRegId } = await supabase
          .from('player_registrations')
          .select('id, registration_id, payment_status')
          .eq('registration_id', regId)
          .limit(1);
        if (byRegId && byRegId.length > 0) {
          existingRecord = byRegId[0];
        }
      }

      if (existingRecord) {
        // Record pre-saved by client: Activate account with payment_status = 'paid'
        await supabase
          .from('player_registrations')
          .update({
            payment_status: 'paid',
            razorpay_payment_id: paymentId,
            amount: amount,
            id_card_generated: true,
          })
          .eq('id', existingRecord.id);

        console.log(`[Razorpay Webhook] Successfully activated pre-saved record: ${existingRecord.registration_id}`);
      } else {
        // Fallback: If pre-save had failed, recover from notes with candidate's actual password
        const finalRegId = regId || `NPVL-2026-M${Math.floor(1000 + Math.random() * 9000)}`;

        const newPlayerPayload = {
          full_name: fullName,
          dob: notes.dob || '2000-01-01',
          age: notes.age ? Number(notes.age) : 24,
          gender: notes.gender || 'Male',
          nationality: 'Indian',
          aadhar_no: notes.aadhar_no || '000000000000',
          mobile_no: contact,
          whatsapp_no: contact.replace(/\D/g, '').slice(-10),
          email: email,
          postal_address: notes.postal_address || (notes.city ? `${notes.city}, ${notes.state}` : 'North India'),
          city: notes.city || 'North India',
          pincode: notes.pincode || '000000',
          state: notes.state || 'North India',
          country: 'India',
          instagram_id: notes.instagram_id || '',
          employment_status: notes.employment_status || 'Athlete',
          institution_name: notes.institution_name || '-',
          player_category: notes.player_category || 'Player',
          top_achievement: notes.top_achievement || 'Registered Athlete',
          current_team_dept: notes.current_team_dept || '-',
          height_cms: notes.height_cms ? Number(notes.height_cms) : null,
          weight_kgs: notes.weight_kgs ? Number(notes.weight_kgs) : null,
          standing_reach_cms: notes.standing_reach_cms ? Number(notes.standing_reach_cms) : null,
          jump_reach_cms: notes.jump_reach_cms ? Number(notes.jump_reach_cms) : null,
          tshirt_size: notes.tshirt_size || 'M',
          declaration_agreed: true,
          registration_id: finalRegId,
          payment_status: 'paid',
          razorpay_payment_id: paymentId,
          amount: amount,
          certificate_generated: false,
          id_card_generated: true,
          verification_status: 'under_review',
          medical_history: {
            account_password: notes.account_password || ('npvl' + Math.floor(1000 + Math.random() * 9000)),
            voluntary_payment_consent: true,
            recovered_by_webhook: true,
          },
        };

        const { error: insertErr } = await supabase
          .from('player_registrations')
          .insert([newPlayerPayload]);

        if (insertErr) {
          console.error('[Razorpay Webhook] Insert error:', insertErr);
        } else {
          console.log(`[Razorpay Webhook] Successfully recovered dropped registration: ${finalRegId}`);
        }
      }
    } else if (event === 'refund.processed') {
      const refund = payload?.refund?.entity;
      const paymentId = refund?.payment_id;
      if (paymentId) {
        await supabase
          .from('player_registrations')
          .update({ payment_status: 'refunded' })
          .eq('razorpay_payment_id', paymentId);
        console.log(`[Razorpay Webhook] Marked payment as refunded: ${paymentId}`);
      }
    }

    return res.status(200).json({ status: 'ok' });
  } catch (err) {
    console.error('[Razorpay Webhook] Error:', err);
    return res.status(500).json({ error: err.message });
  }
}
