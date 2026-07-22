"use client";

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <main className="max-w-[1920px] mx-auto pt-16 pb-24 md:pt-24 md:pb-32">
      
      {/* BAŞLIK ALANI */}
      <div className="px-4 sm:px-8 xl:px-24 mb-16 md:mb-24 text-center max-w-4xl mx-auto">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium block mb-4">Bize Ulaşın</span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-gray-900 tracking-tight mb-6">
          Zarafeti Tasarlamak İçin Buradayız
        </h1>
        <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed">
          Yaşam alanlarınıza değer katacak projeler, özel ölçü üretim talepleriniz veya koleksiyonlarımız hakkında detaylı bilgi almak için bizimle iletişime geçin.
        </p>
      </div>

      {/* İLETİŞİM BİLGİLERİ VE FORM GRİDİ */}
      <div className="px-4 sm:px-8 xl:px-24 grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 mb-20 md:mb-24">
        
        {/* SOL: İletişim Bilgileri (Adresler) */}
        <div className="lg:col-span-4 flex flex-col gap-12">
          
          {/* Merkez Ofis */}
          <div>
            <h2 className="text-xs uppercase tracking-[0.25em] font-semibold text-gray-900 mb-5 flex items-center gap-3">
              <span className="w-6 h-[1px] bg-gray-900 block"></span> Ofisimiz
            </h2>
            <div className="text-sm text-gray-500 font-light leading-relaxed flex flex-col gap-1.5">
              <p>Küçükbakkalköy Mah. Ali Ay Sok.</p>
              <p>Orkide Apartmanı No:3/1</p>
              <p>Ataşehir / İstanbul</p>
              <a href="tel:+902165768826" className="text-gray-900 hover:text-[#c25b19] transition-colors mt-3 block">T: +90 (216) 576 88 26</a>
              <a href="mailto:info@veluxe.com.tr" className="text-gray-900 hover:text-[#c25b19] transition-colors block">E: info@veluxe.com.tr</a>
            </div>
          </div>

          {/* Atölye */}
          <div>
            <h2 className="text-xs uppercase tracking-[0.25em] font-semibold text-gray-900 mb-5 flex items-center gap-3">
              <span className="w-6 h-[1px] bg-gray-300 block"></span> Atölye
            </h2>
            <div className="text-sm text-gray-500 font-light leading-relaxed flex flex-col gap-1.5">
              <p>Mevlana Mah. Gazi Atatürk Cad.</p>
              <p>No:44/C</p>
              <p>Ataşehir / İstanbul</p>
              <a href="tel:+905424895826" className="text-gray-900 hover:text-[#c25b19] transition-colors mt-3 block">M: +90 (542) 489 58 26</a>
            </div>
          </div>

          {/* Mağaza & Depo */}
          <div>
             <h2 className="text-xs uppercase tracking-[0.25em] font-semibold text-gray-900 mb-5 flex items-center gap-3">
              <span className="w-6 h-[1px] bg-gray-300 block"></span> Mağaza / Depo
            </h2>
            <div className="text-sm text-gray-500 font-light leading-relaxed flex flex-col gap-1.5">
              <p>Kayışdağı Mah. Nusret Sok.</p>
              <p>No:25</p>
              <p>Ataşehir / İstanbul</p>
            </div>
          </div>

          {/* Sosyal Medya */}
          <div className="pt-4 border-t border-gray-100">
             <h2 className="text-[10px] uppercase tracking-[0.25em] font-medium text-gray-400 mb-5">
              Bizi Takip Edin
            </h2>
            <div className="flex gap-6">
              <a href="https://www.instagram.com/veluxehome/" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-900 hover:text-[#c25b19] uppercase tracking-widest transition-colors">Instagram</a>
              <a href="https://www.facebook.com/people/Veluxe-Home/61568232810321/" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-900 hover:text-[#c25b19] uppercase tracking-widest transition-colors">Facebook</a>
              <a href="https://tr.pinterest.com/veluxehome/" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-900 hover:text-[#c25b19] uppercase tracking-widest transition-colors">Pinterest</a>
            </div>
          </div>

        </div>

        {/* SAĞ: İletişim Formu */}
        <div className="lg:col-span-8 bg-[#f9f9f9] p-8 md:p-12 border border-gray-100 h-max">
          <h3 className="text-xl font-serif font-light text-gray-900 mb-8">Bize Mesaj Bırakın</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex flex-col">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Adınız Soyadınız *</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-transparent border-b border-gray-300 py-2 px-0 text-sm focus:outline-none focus:border-gray-900 transition-colors font-light"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Telefon Numaranız *</label>
                <input 
                  type="tel" 
                  required 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-transparent border-b border-gray-300 py-2 px-0 text-sm focus:outline-none focus:border-gray-900 transition-colors font-light"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex flex-col">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">E-Posta Adresiniz *</label>
                <input 
                  type="email" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-transparent border-b border-gray-300 py-2 px-0 text-sm focus:outline-none focus:border-gray-900 transition-colors font-light"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Konu</label>
                <input 
                  type="text" 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-transparent border-b border-gray-300 py-2 px-0 text-sm focus:outline-none focus:border-gray-900 transition-colors font-light"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Mesajınız *</label>
              <textarea 
                required 
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-transparent border-b border-gray-300 py-2 px-0 text-sm focus:outline-none focus:border-gray-900 transition-colors font-light resize-none"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={formStatus === 'loading'}
              className="mt-4 bg-[#111] hover:bg-black text-white py-5 px-10 text-xs uppercase tracking-[0.2em] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto self-start"
            >
              {formStatus === 'loading' ? 'Gönderiliyor...' : 'Mesajı Gönder'}
            </button>

            {formStatus === 'success' && (
              <p className="text-sm text-green-600 font-light bg-green-50 p-4 border border-green-100 mt-2">
                Mesajınız başarıyla iletildi. En kısa sürede sizinle iletişime geçeceğiz.
              </p>
            )}
            {formStatus === 'error' && (
              <p className="text-sm text-red-600 font-light bg-red-50 p-4 border border-red-100 mt-2">
                Bir hata oluştu. Lütfen doğrudan telefon veya e-posta yoluyla ulaşın.
              </p>
            )}
          </form>
        </div>
      </div>

      {/* HARİTALAR ALANI (3 Adres için 3'lü Grid) */}
      <div className="px-4 sm:px-8 xl:px-0 grid grid-cols-1 md:grid-cols-3 gap-2">
        
        {/* Merkez Ofis Haritası */}
        <div className="relative h-[300px] md:h-[400px] bg-gray-100 group overflow-hidden">
          <iframe 
            src="https://maps.google.com/maps?q=Kucukbakkalkoy+Mah.+Ali+Ay+Sok.+No:3+Atasehir+Istanbul&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'grayscale(100%) opacity(0.8)' }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 group-hover:filter-none transition-all duration-700"
          ></iframe>
          <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-5 py-3 border border-white pointer-events-none shadow-sm">
             <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-900 mb-1">Merkez Ofis</h4>
             <p className="text-[9px] text-gray-500 uppercase tracking-widest">Ataşehir</p>
          </div>
        </div>

        {/* Atölye Haritası */}
        <div className="relative h-[300px] md:h-[400px] bg-gray-100 group overflow-hidden">
          <iframe 
            src="https://maps.google.com/maps?q=Mevlana+Mah.+Gazi+Ataturk+Cad.+No:44+Atasehir+Istanbul&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'grayscale(100%) opacity(0.8)' }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 group-hover:filter-none transition-all duration-700"
          ></iframe>
          <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-5 py-3 border border-white pointer-events-none shadow-sm">
             <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-900 mb-1">Atölye</h4>
             <p className="text-[9px] text-gray-500 uppercase tracking-widest">Ataşehir</p>
          </div>
        </div>

        {/* Mağaza & Depo Haritası */}
        <div className="relative h-[300px] md:h-[400px] bg-gray-100 group overflow-hidden">
          <iframe 
            src="https://maps.google.com/maps?q=Kayisdagi+Mah.+Nusret+Sok.+No:25+Atasehir+Istanbul&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'grayscale(100%) opacity(0.8)' }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 group-hover:filter-none transition-all duration-700"
          ></iframe>
          <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-5 py-3 border border-white pointer-events-none shadow-sm">
             <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-900 mb-1">Mağaza & Depo</h4>
             <p className="text-[9px] text-gray-500 uppercase tracking-widest">Ataşehir</p>
          </div>
        </div>

      </div>

    </main>
  );
}