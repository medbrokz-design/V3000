import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const translations = {
  ru: {
    heroTitle: "Замените продакшн",
    heroSub: "Протокол V3000",
    heroDesc: "Создаём кастомные ИИ-системы для бизнесов, которые хотят стабильный рост, а не просто «крутые шортсы».",
    cta: "ЗАБРОНИРОВАТЬ СЕССИЮ",
    ctaShort: "ПОЛУЧИТЬ ПЛАН",
    trustBar: "Доверяют лидеры из",
    trustQuote: "«Снизили CPA на 47% за 3 недели без ручной работы».",
    trustAuthor: "— Алексей, IT-стартап",
    servicesTitle: "Что мы делаем",
    howTitle: "С контролем.",
    caseTitle: "Результаты",
    whyTitle: "Почему мы?",
    testimonialTitle: "Отзывы",
    roiTitle: "Ваша экономия",
    roiLabel: "Бюджет",
    roiSavings: "Выгода",
    finalTitle: "Масштабируйте маркетинг",
    finalSub: "Бесплатная сессия и аудит вашего бренда.",
    privacy: "🔒 No spam. Secure.",
    statusSuccess: "ПРИНЯТО.",
    statusError: "ОШИБКА.",
    compareTitle: "Контроль реальности"
  },
  en: {
    heroTitle: "AI Marketing That Scales",
    heroSub: "V3000 PROTOCOL",
    heroDesc: "We build custom generative systems for brands that want predictable growth, not experiments.",
    cta: "BOOK SESSION",
    ctaShort: "GET PLAN",
    trustBar: "Trusted by founders at",
    trustQuote: "“Reduced CPA by 47% in 3 weeks with zero manual content.”",
    trustAuthor: "— Sarah K., Growth Lead",
    servicesTitle: "Deliverables",
    howTitle: "Transparency.",
    caseTitle: "Real Results",
    whyTitle: "Why Us?",
    testimonialTitle: "Testimonials",
    roiTitle: "Economics",
    roiLabel: "Budget",
    roiSavings: "Net Benefit",
    finalTitle: "Ready to Scale?",
    finalSub: "Free strategy session and actionable insights.",
    privacy: "🔒 Secure. Private.",
    statusSuccess: "ACCEPTED.",
    statusError: "ERROR.",
    compareTitle: "Reality Control"
  }
};

const partners = ["NOTION", "AWS", "SHOPIFY", "TECHCRUNCH"];

// Memoized static sections for performance
const ServicesList = memo(({ lang }) => (
  <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5">
    {[
      { id: "01", icon: "📝", t: { ru: "Content Studio", en: "Content Studio" } },
      { id: "02", icon: "🎨", t: { ru: "Design Engine", en: "Design Engine" } },
      { id: "03", icon: "🎥", t: { ru: "Video Prod", en: "Video Prod" } }
    ].map(s => (
      <div key={s.id} className="p-8 md:p-12 bg-black space-y-6 hover:bg-zinc-950 transition-colors">
        <div className="text-3xl opacity-20" aria-hidden="true">{s.icon}</div>
        <h3 className="text-lg uppercase tracking-widest">{s.t[lang]}</h3>
      </div>
    ))}
  </div>
));

const BeforeAfter = memo(({ t }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const handleMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = (clientX - rect.left) / rect.width * 100;
    setSliderPos(Math.max(0, Math.min(100, x)));
  };
  return (
    <section className="py-20 md:py-40 space-y-12 border-t border-white/5">
      <h2 className="text-3xl md:text-4xl font-display font-light uppercase tracking-tighter italic text-center">{t.compareTitle}</h2>
      <div 
        ref={containerRef} onMouseMove={handleMove} onTouchMove={handleMove}
        className="relative aspect-video w-full overflow-hidden border border-white/5 cursor-col-resize touch-none"
        aria-label="Comparison slider showing before and after neural production"
      >
        <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=60&auto=format" className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale" alt="Standard production example" />
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
          <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=60&auto=format" className="w-full h-full object-cover" alt="V3000 Neural production example" />
        </div>
        <div className="absolute inset-y-0 w-px bg-white/50" style={{ left: `${sliderPos}%` }} />
      </div>
    </section>
  );
});

const Home = ({ lang }) => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [status, setStatus] = useState('');
  const t = translations[lang];
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('...');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      const data = await res.json();
      if (data.success) { setStatus(t.statusSuccess); setFormData({ name: '', email: '', company: '' }); }
    } catch (e) { setStatus(t.statusError); }
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      <Helmet>
        <title>V3000 | {t.heroTitle}</title>
        <meta name="description" content={t.heroDesc} />
      </Helmet>

      <motion.section style={{ opacity: heroOpacity }} className="min-h-screen flex flex-col justify-center items-center text-center space-y-10 py-20 motion-safe-gpu">
        <span className="uppercase tracking-[0.6em] font-mono text-[10px] text-cyan-500"><span>{t.heroSub}</span></span>
        <h1 className="text-[14vw] md:text-[8vw] font-display font-light tracking-tighter leading-none text-gradient">{t.heroTitle}</h1>
        <p className="text-base md:text-xl font-light text-gray-400 max-w-xl mx-auto">{t.heroDesc}</p>
        <button aria-label={t.cta} className="px-10 py-5 bg-white text-black text-[10px] uppercase tracking-[0.5em] font-black hover:invert transition-all">{t.cta}</button>
      </motion.section>

      <section className="py-20 border-y border-white/5 space-y-12">
        <h2 className="sr-only">Our Partners</h2>
        <div className="flex flex-wrap justify-center gap-10 opacity-30 grayscale brightness-200">
          {partners.map(p => <span key={p} className="font-display font-bold text-[10px] tracking-widest">{p}</span>)}
        </div>
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-xl md:text-2xl italic font-light text-gray-300">{t.trustQuote}</p>
          <p className="text-[10px] font-mono text-cyan-500 uppercase">{t.trustAuthor}</p>
        </div>
      </section>

      <section className="py-20 md:py-40">
        <h2 className="text-4xl md:text-7xl font-display font-light tracking-tighter uppercase italic mb-16 leading-none">{t.servicesTitle}</h2>
        <ServicesList lang={lang} />
      </section>

      <BeforeAfter t={t} />

      <section className="py-40 flex justify-center border-t border-white/5">
        <div className="max-w-2xl w-full text-center space-y-12">
          <h2 className="text-4xl md:text-7xl font-display font-light tracking-tighter uppercase italic text-gradient">{t.finalTitle}</h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid gap-2">
              <label htmlFor="name" className="sr-only">Name</label>
              <input id="name" type="text" placeholder="Name" aria-label="Your Name" required value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} className="bg-transparent border-b border-white/5 py-4 text-center text-xl font-light outline-none focus:border-white transition-colors" />
              
              <label htmlFor="company" className="sr-only">Company</label>
              <input id="company" type="text" placeholder="Company" aria-label="Company Name" required value={formData.company} onChange={e=>setFormData({...formData, company:e.target.value})} className="bg-transparent border-b border-white/5 py-4 text-center text-xl font-light outline-none focus:border-white transition-colors" />
              
              <label htmlFor="email" className="sr-only">Email</label>
              <input id="email" type="email" placeholder="Email" aria-label="Your Email" required value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})} className="bg-transparent border-b border-white/5 py-4 text-center text-xl font-light outline-none focus:border-white transition-colors" />
            </div>
            <button type="submit" aria-label={t.ctaShort} className="px-12 py-6 bg-white text-black text-[10px] uppercase tracking-[0.6em] font-black hover:invert transition-all">{t.ctaShort}</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;