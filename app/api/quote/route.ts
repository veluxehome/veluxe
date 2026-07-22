import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, phone, message, productTitle, productSku } = await req.json();

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
      to: process.env.GMAIL_USER, // Formların düşeceği adres
      subject: `YENİ TEKLİF: ${productTitle} (${productSku})`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Yeni Teklif Talebi Alındı</h2>
          <p><strong>Ürün:</strong> ${productTitle} (SKU: ${productSku})</p>
          <hr />
          <p><strong>Müşteri:</strong> ${name}</p>
          <p><strong>Telefon:</strong> ${phone}</p>
          <p><strong>E-posta:</strong> ${email}</p>
          <p><strong>Mesaj/Özel İstekler:</strong></p>
          <p style="padding: 15px; background: #f9f9f9; border-left: 4px solid #111;">${message}</p>
        </div>
      `
    };

    // 2. Müşteriye Gidecek Otomatik Teşekkür/Bilgi Maili
    const customerMail = {
      from: `"Veluxe Premium" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `${productTitle} - Teklif Talebiniz Alınmıştır`,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="font-weight: 300;">Sayın ${name},</h2>
          <p><strong>${productTitle}</strong> modelimiz için iletmiş olduğunuz bilgi ve teklif talebi ekibimize ulaşmıştır.</p>
          <p>Tasarım danışmanlarımız, ilettiğiniz detayları (varsa özel ölçü/renk taleplerinizi) inceleyerek en kısa sürede sizinle <strong>${phone}</strong> numaralı telefonunuz veya e-posta adresiniz üzerinden iletişime geçecektir.</p>
          <br/>
          <p>İlginiz için teşekkür ederiz.</p>
          <p style="font-size: 12px; color: #777;">Veluxe İletişim Ekibi</p>
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