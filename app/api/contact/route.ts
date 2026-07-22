import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // 1. Yöneticiye (Size) Gidecek Mail
    const adminMail = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `İLETİŞİM FORMU: ${subject || 'Yeni Mesaj'}`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Web Sitesinden Yeni Bir Mesajınız Var</h2>
          <hr />
          <p><strong>Gönderen:</strong> ${name}</p>
          <p><strong>Telefon:</strong> ${phone}</p>
          <p><strong>E-posta:</strong> ${email}</p>
          <p><strong>Konu:</strong> ${subject}</p>
          <p><strong>Mesaj:</strong></p>
          <p style="padding: 15px; background: #f9f9f9; border-left: 4px solid #111;">${message}</p>
        </div>
      `
    };

    // 2. Müşteriye Gidecek Otomatik Teşekkür Maili
    const customerMail = {
      from: `"Veluxe Premium" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Mesajınız Alınmıştır | Veluxe`,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="font-weight: 300;">Sayın ${name},</h2>
          <p>Bizimle iletişime geçtiğiniz için teşekkür ederiz. Mesajınız ekibimize başarıyla ulaşmıştır.</p>
          <p>Konuyla ilgili yetkili tasarım ve müşteri ilişkileri uzmanlarımız, iletmiş olduğunuz <strong>${phone}</strong> numaralı telefon veya e-posta üzerinden en kısa sürede tarafınıza dönüş yapacaktır.</p>
          <br/>
          <p>Saygılarımızla,</p>
          <p style="font-size: 12px; color: #777;">Veluxe Premium İletişim Ekibi</p>
        </div>
      `
    };

    await transporter.sendMail(adminMail);
    await transporter.sendMail(customerMail);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Mail gönderilemedi' }, { status: 500 });
  }
}