import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData()
    const get = (k: string) => (body.get(k) as string) || ''

    const name = get('name'), email = get('email'), company = get('company')
    const phone = get('phone'), service = get('service'), budget = get('budget')
    const timeline = get('timeline'), message = get('message'), via = get('via')

    const files = body.getAll('files') as File[]
    const attachments = await Promise.all(
      files.filter(f => f.size > 0).map(async f => ({
        filename: f.name,
        content: Buffer.from(await f.arrayBuffer()),
      }))
    )

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })

    const html = `
<!DOCTYPE html><html><head><style>
body{font-family:Figtree,Arial,sans-serif;background:#0d0b1a;color:#f5ede0;margin:0;padding:24px}
.card{background:#110f22;border:1px solid rgba(212,146,10,0.2);border-radius:20px;padding:40px;max-width:600px;margin:0 auto}
h1{color:#f0b429;font-size:22px;margin:0 0 24px;font-weight:600}
.row{margin-bottom:18px}
.lbl{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(200,184,154,0.4);margin-bottom:5px}
.val{color:#f5ede0;font-size:14px;line-height:1.6}
.tag{display:inline-block;background:rgba(212,146,10,0.1);border:1px solid rgba(212,146,10,0.2);color:#d4920a;border-radius:100px;padding:4px 12px;font-size:11px}
hr{border:none;border-top:1px solid rgba(212,146,10,0.1);margin:24px 0}
.msg{background:rgba(212,146,10,0.04);border:1px solid rgba(212,146,10,0.1);border-radius:14px;padding:18px;color:#c8b89a;font-size:13px;line-height:1.7}
.foot{text-align:center;color:rgba(200,184,154,0.3);font-size:11px;margin-top:24px}
</style></head><body>
<div class="card">
  <h1>⚡ New Enquiry — Shastra AI</h1>
  <div class="row"><div class="lbl">From</div><div class="val"><strong>${name}</strong> · ${company}</div></div>
  <div class="row"><div class="lbl">Email</div><div class="val">${email}</div></div>
  ${phone ? `<div class="row"><div class="lbl">Phone / WhatsApp</div><div class="val">${phone}</div></div>` : ''}
  <hr/>
  <div class="row"><div class="lbl">Service</div><div class="val"><span class="tag">${service}</span></div></div>
  ${budget ? `<div class="row"><div class="lbl">Budget</div><div class="val">${budget}</div></div>` : ''}
  ${timeline ? `<div class="row"><div class="lbl">Timeline</div><div class="val">${timeline}</div></div>` : ''}
  <div class="row"><div class="lbl">Response Requested Via</div><div class="val">${via}</div></div>
  <hr/>
  <div class="row"><div class="lbl">Requirement</div><div class="msg">${message.replace(/\n/g, '<br/>')}</div></div>
  ${attachments.length > 0 ? `<div class="row"><div class="lbl">Attachments</div><div class="val">${attachments.map(a => a.filename).join(', ')}</div></div>` : ''}
  <div class="foot">Shastra AI · Strategic Intelligence for the Enterprise</div>
</div></body></html>`

    // Send to Shastra AI
    await transporter.sendMail({
      from: `"Shastra AI Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || 'hello@shastra.ai',
      subject: `New Enquiry: ${service} — ${name} (${company})`,
      html,
      attachments,
      replyTo: email,
    })

    // Confirmation to user
    await transporter.sendMail({
      from: `"Shastra AI" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'We received your enquiry — Shastra AI',
      html: `<!DOCTYPE html><html><head><style>
body{font-family:Figtree,Arial,sans-serif;background:#0d0b1a;color:#f5ede0;margin:0;padding:24px}
.card{background:#110f22;border:1px solid rgba(212,146,10,0.2);border-radius:20px;padding:40px;max-width:560px;margin:0 auto}
h1{color:#f0b429;font-size:22px;margin:0 0 12px}
p{color:rgba(200,184,154,0.75);font-size:14px;line-height:1.7;margin:0 0 14px}
strong{color:#f5ede0}
.foot{text-align:center;color:rgba(200,184,154,0.25);font-size:11px;margin-top:28px;padding-top:20px;border-top:1px solid rgba(212,146,10,0.1)}
</style></head><body>
<div class="card">
  <h1>Message received, ${name.split(' ')[0]}.</h1>
  <p>Thanks for reaching out to Shastra AI. We've received your enquiry about <strong>${service}</strong>.</p>
  <p>We'll be in touch within 24 hours — typically the same day. If you'd like to speak sooner, reply to this email or WhatsApp us directly.</p>
  <p style="color:rgba(200,184,154,0.45);font-size:13px">— The Shastra AI Team</p>
  <div class="foot">Shastra AI · hello@shastra.ai · Strategic Intelligence for the Enterprise</div>
</div></body></html>`,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact error:', err)
    return NextResponse.json({ ok: false, message: 'Failed to send. Please email hello@shastra.ai directly.' }, { status: 500 })
  }
}
