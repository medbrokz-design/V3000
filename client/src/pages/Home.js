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
    ctaShort: "ПОЛУЧИТЬ ПЛАН БЕСПЛАТНО",
    trustBar: "Нам доверяют команды и основатели из",
    trustQuote: "«Снизили стоимость лида на 47% за 3 недели — без единого часа ручной работы над контентом».",
    trustAuthor: "— Алексей, IT-стартап",
    servicesTitle: "Что мы делаем",
    servicesSub: "Мы проектируем системы, а не просто пишем промпты.",
    howTitle: "Просто. Прозрачно. С контролем.",
    step1: "Бриф", step1D: "Вы рассказываете о задачах, стиле бренда и инструментах.",
    step2: "Настройка", step2D: "Мы создаём ИИ-воркфлоу под ваш бизнес — без шаблонов.",
    step3: "Масштаб", step3D: "Вы получаете контент, аналитику и растёте без перегруза.",
    caseTitle: "Цифры вместо слов",
    whyTitle: "Почему мы?",
    testimonialTitle: "Мнения лидеров",
    roiTitle: "Ваша экономия",
    roiLabel: "Бюджет на контент",
    roiSavings: "Чистая выгода",
    finalTitle: "Готовы масштабировать маркетинг?",
    finalSub: "Без продаж — только конкретные рекомендации под ваш бизнес.",
    privacy: "🔒 Без спама. Без шаблонных презентаций.",
    statusSuccess: "ПРИНЯТО.",
    statusError: "ОШИБКА.",
    compareTitle: "Контроль реальности",
    compareSub: "Обычный метод vs Протокол V3000"
  },
  en: {
    heroTitle: "AI Marketing That Actually Scales",
    heroSub: "WITHOUT THE HYPE",
    heroDesc: "We build custom generative systems for brands that want predictable growth, not just viral experiments.",
    cta: "BOOK A STRATEGY SESSION",
    ctaShort: "GET MY FREE STRATEGY PLAN",
    trustBar: "Trusted by founders and marketing teams at",
    trustQuote: "“Reduced our cost per lead by 47% in 3 weeks — with zero manual content creation.”",
    trustAuthor: "— Sarah K., Growth Lead",
    servicesTitle: "What We Deliver",
    servicesSub: "We engineer systems, not just paste prompts into ChatGPT.",
    howTitle: "Simple. Transparent. Human-in-the-Loop.",
    step1: "Brief", step1D: "You share your goals, brand voice, and tech stack.",
    step2: "Build", step2D: "We design a custom AI workflow — no off-the-shelf templates.",
    step3: "Scale", step3D: "You get high-quality output, real-time analytics, and room to grow.",
    caseTitle: "Real Results, Not Promises",
    whyTitle: "We’re Not Another “AI Agency”",
    testimonialTitle: "Testimonials",
    roiTitle: "Economics",
    roiLabel: "Content Budget",
    roiSavings: "Net Benefit",
    finalTitle: "Ready to Scale with Real AI?",
    finalSub: "No sales pitch — just actionable insights tailored to your business.",
    privacy: "🔒 We respect your privacy. No spam. Ever.",
    statusSuccess: "ACCEPTED.",
    statusError: "ERROR.",
    compareTitle: "Reality Control",
    compareSub: "Standard Method vs V3000 Protocol"
  }
};

const partners = ["NOTION", "AWS", "SHOPIFY", "TECHCRUNCH", "WILDBERRIES", "TINKOFF"];

const servicesList = [
  { id: "01", icon: "📝", t: { ru: "Content Studio", en: "Content Studio" }, d: { ru: "Тексты и email в стиле бренда.", en: "On-brand texts and emails." } },
  { id: "02", icon: "🎨", t: { ru: "Design Engine", en: "Design Engine" }, d: { ru: "Дизайн любой сложности за секунды.", en: "Design generated in seconds." } },
  { id: "03", icon: "🎥", t: { ru: "Video Production", en: "Video Production" }, d: { ru: "Видео-реклама через нейро-рендеринг.", en: "Video via neural rendering." } },
  { id: "04", icon: "🤖", t: { ru: "AI Agents", en: "AI Agents" }, d: { ru: "Автономные ИИ-сотрудники.", en: "Autonomous AI employees." } },
  { id: "05", icon: "📊", t: { ru: "Smart Automation", en: "Smart Automation" }, d: { ru: "Масштабирование креативов.", en: "Scaling ad creatives." } },
  { id: "06", icon: "🔗", t: { ru: "RAG Knowledge", en: "RAG Knowledge" }, d: { ru: "ИИ на ваших данных.", en: "AI on your private data." } }
];

const testimonials = [
  { 
    q: { ru: "Раньше тратили 20 часов в неделю на контент. Теперь — 2 часа на правки. Это не автоматизация — это рычаг роста.", en: "Before, we spent 20 hours/week on content. Now it’s 2 hours for final edits. This isn’t automation — it’s leverage." },
    a: "Mark T., CMO, EdTech"
  },
  { 
    q: { ru: "Наконец-то агентство, которое использует ИИ как инфраструктуру, а не как фокус-группу.", en: "Finally, an agency that treats AI like infrastructure — not a party trick." },
    a: "Lena R., Founder, Climate Tech"
  }
];

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
    <div className="py-20 md:py-40 space-y-12 border-t border-white/5">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-display font-light uppercase tracking-tighter italic">{t.compareTitle}</h2>
        <p className="font-mono text-[10px] text-gray-600 uppercase tracking-[0.3em]">{t.compareSub}</p>
      </div>
      <div ref={containerRef} className="relative aspect-video w-full overflow-hidden border border-white/5 cursor-col-resize group touch-none">
        <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=60&auto=format" className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale" alt="B" />
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
          <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=60&auto=format" className="w-full h-full object-cover" alt="A" />
        </div>
        <div className="absolute inset-y-0 w-px bg-cyan-500 z-10 shadow-[0_0_20px_rgba(6,182,212,0.5)]" style={{ left: `${sliderPos}%` }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 backdrop-blur-2xl flex items-center justify-center text-[8px]">SCAN</div>
        </div>
      </div>
    </div>
  );
});

const ROICalculator = memo(({ t }) => {
  const [budget, setBudget] = useState(10000);
  return (
    <div className="py-20 md:py-40 border-t border-white/5 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
      <div className="space-y-8">
        <h2 className="text-4xl md:text-5xl font-display font-light uppercase tracking-tighter italic">{t.roiTitle}</h2>
        <div className="space-y-4">
          <div className="flex justify-between font-mono text-[10px] text-gray-500 uppercase"><span>Budget / mo</span><span>${budget.toLocaleString()}</span></div>
          <input type="range" min="2000" max="100000" step="1000" value={budget} onChange={(e) => setBudget(parseInt(e.target.value))} className="w-full h-[1px] bg-white/10 appearance-none accent-cyan-500" />
        </div>
      </div>
      <div className="p-8 md:p-16 bg-white/[0.02] border border-white/5 text-center space-y-4">
        <div className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-gradient">${(budget * 0.88).toLocaleString()}</div>
        <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">{t.roiSavings} / Year</p>
      </div>
    </div>
  );
});

const Home = ({ lang }) => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', bottleneck: '' });
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
      if (data.success) { setStatus(t.statusSuccess); setFormData({ name: '', email: '', company: '', bottleneck: '' }); }
    } catch (e) { setStatus(t.statusError); }
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      <Helmet>
        <title>V3000 | {t.heroTitle}</title>
        <meta name="description" content={t.heroDesc} />
      </Helmet>

      {/* 1. HERO */}
      <motion.section style={{ opacity: heroOpacity }} className="min-h-screen flex flex-col justify-center items-center text-center space-y-10 py-20">
        <div className="space-y-4 uppercase tracking-[0.6em] font-mono text-[10px] text-cyan-500 italic"><span>{t.heroSub}</span></div>
        <h1 className="text-[14vw] md:text-[8vw] font-display font-light tracking-tighter leading-[0.9] text-gradient">{t.heroTitle}</h1>
        <p className="text-base md:text-xl font-light text-gray-400 max-w-xl mx-auto leading-relaxed">{t.heroDesc}</p>
        <button className="px-10 py-5 md:px-14 md:py-6 bg-white text-black text-[10px] uppercase tracking-[0.5em] font-black hover:invert transition-all rounded-sm">{t.cta}</button>
      </motion.section>

      {/* 2. SOCIAL PROOF */}
      <section className="py-20 border-y border-white/5 space-y-12">
        <div className="flex flex-wrap justify-center gap-8 md:gap-20 opacity-30 grayscale filter brightness-200">
          {partners.map(p => <span key={p} className="font-display font-bold text-[10px] tracking-widest">{p}</span>)}
        </div>
        <div className="max-w-3xl mx-auto text-center space-y-4 pt-10">
          <p className="text-xl md:text-2xl italic font-light text-gray-300 leading-relaxed">{t.trustQuote}</p>
          <p className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">{t.trustAuthor}</p>
        </div>
      </section>

      {/* 3. SERVICES (FULL 6 GRID) */}
      <section className="py-20 md:py-40">
        <h2 className="text-4xl md:text-7xl font-display font-light tracking-tighter uppercase italic mb-16 leading-none">{t.servicesTitle}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {servicesList.map(s => (
            <div key={s.id} className="p-10 bg-black space-y-8 group hover:bg-zinc-950 transition-colors">
              <div className="text-4xl opacity-20 group-hover:opacity-100 transition-opacity">{s.icon}</div>
              <h3 className="text-xl font-display font-light uppercase tracking-widest leading-tight">{s.t[lang]}</h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">{s.d[lang]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PROOF (BEFORE/AFTER) */}
      <BeforeAfter t={t} />

      {/* 5. ROI (ECONOMICS) - MOVED UP */}
      <ROICalculator t={t} />

      {/* 6. WORKFLOW */}
      <section className="py-20 md:py-40 border-t border-white/5">
        <h2 className="text-4xl md:text-6xl font-display font-light uppercase tracking-tighter italic text-center mb-16 md:mb-32">{t.howTitle}</h2>
        <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {[
            {t: t.step1, d: t.step1D},
            {t: t.step2, d: t.step2D},
            {t: t.step3, d: t.step3D}
          ].map((step, i) => (
            <div key={i} className="p-10 bg-black space-y-8 group hover:bg-zinc-950 transition-colors">
              <div className="text-5xl font-display font-black text-white/5 group-hover:text-cyan-500/20 transition-colors">0{i+1}</div>
              <h3 className="text-xl uppercase tracking-widest italic leading-tight">{step.t}</h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CASE STUDIES PREVIEW */}
      <section className="py-20 border-t border-white/5 space-y-20">
        <h2 className="text-4xl md:text-5xl font-display font-light uppercase tracking-tighter italic text-center">{t.caseTitle}</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {[
            { id: "ecom", t: { ru: "E-commerce Бренд", en: "E-commerce Brand" }, r: { ru: "↓ CPA на 38%", en: "↓ CPA by 38%" }, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800" },
            { id: "saas", t: { ru: "B2B SaaS (Германия)", en: "B2B SaaS (Germany)" }, r: { ru: "↑ Трафик на 210%", en: "↑ Traffic by 210%" }, img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800" }
          ].map((c, i) => (
            <Link to={`/cases/${c.id}`} key={i} className="space-y-6 group cursor-none">
              <div className="aspect-video bg-zinc-900 overflow-hidden border border-white/5">
                <img src={c.img} className="w-full h-full object-cover opacity-40 group-hover:opacity-80 transition-all duration-1000 group-hover:scale-105" alt="Case" />
              </div>
              <div className="flex justify-between items-center">
                <h3 className="text-lg uppercase italic group-hover:text-cyan-500 transition-colors">{c.t[lang]}</h3>
                <div className="text-cyan-500 font-mono text-[10px] uppercase">{c.r[lang]}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-20 border-t border-white/5">
        <h2 className="text-4xl md:text-5xl font-display font-light uppercase tracking-tighter italic mb-16">{t.testimonialTitle}</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {testimonials.map((test, i) => (
            <div key={i} className="space-y-6 p-10 bg-zinc-950/30 border border-white/5">
              <p className="text-xl font-light italic text-gray-400">"{test.q[lang]}"</p>
              <p className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">— {test.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FINAL FORM */}
      <section className="py-20 md:py-60 flex justify-center border-t border-white/5">
        <div className="max-w-2xl w-full text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-7xl font-display font-light tracking-tighter uppercase italic text-gradient">{t.finalTitle}</h2>
            <p className="text-gray-500 text-sm font-light tracking-widest uppercase">{t.finalSub}</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid gap-2">
              <input type="text" placeholder="Name" required value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} className="bg-transparent border-b border-white/5 py-6 text-center text-2xl font-light outline-none focus:border-white transition-colors" />
              <input type="text" placeholder="Company" required value={formData.company} onChange={e=>setFormData({...formData, company:e.target.value})} className="bg-transparent border-b border-white/5 py-6 text-center text-2xl font-light outline-none focus:border-white transition-colors" />
              <input type="email" placeholder="Email" required value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})} className="bg-transparent border-b border-white/5 py-6 text-center text-2xl font-light outline-none focus:border-white transition-colors" />
              <textarea placeholder="Your biggest marketing bottleneck?" value={formData.bottleneck} onChange={e=>setFormData({...formData, bottleneck:e.target.value})} className="bg-transparent border-b border-white/5 py-6 text-center text-lg font-light outline-none focus:border-white transition-colors h-32 resize-none" />
            </div>
            <div className="space-y-6">
              <button className="px-16 py-8 bg-white text-black text-[10px] uppercase tracking-[0.6em] font-black hover:invert transition-all">{t.ctaShort}</button>
              <p className="text-[9px] font-mono text-gray-600 uppercase tracking-widest opacity-50">{t.privacy}</p>
            </div>
            <AnimatePresence>{status && <motion.p initial={{opacity:0}} animate={{opacity:1}} className="font-mono text-[9px] tracking-widest text-cyan-500 uppercase animate-pulse pt-4">{status}</motion.p>}</AnimatePresence>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
