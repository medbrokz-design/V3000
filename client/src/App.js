import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

const translations = {
  ru: {
    heroTitle: "Маркетинг на ИИ, который реально работает",
    heroSub: "БЕЗ ПУСТЫХ ОБЕЩАНИЙ",
    heroDesc: "Создаём кастомные ИИ-системы для бизнесов, которые хотят стабильный рост, а не просто «крутые шортсы».",
    cta: "ЗАБРОНИРОВАТЬ СЕССИЮ",
    ctaShort: "ПОЛУЧИТЬ ПЛАН БЕСПЛАТНО",
    trustBar: "Нам доверяют команды и основатели из",
    trustQuote: "«Снизили стоимость лида на 47% за 3 недели — без единого часа ручной работы над контентом».",
    trustAuthor: "— Алексей, маркетолог, IT-стартап",
    servicesTitle: "Что мы делаем",
    servicesSub: "Мы проектируем системы, а не просто пишем промпты.",
    compareTitle: "Контроль реальности",
    caseTitle: "Цифры вместо слов",
    whyTitle: "Почему V3000?",
    roiTitle: "Ваша экономия",
    stepTitle: "Как это работает",
    step1: "Бриф", step1D: "Вы рассказываете о задачах и стиле бренда.",
    step2: "Настройка", step2D: "Создаём ИИ-воркфлоу под ваш бизнес.",
    step3: "Масштаб", step3D: "Вы получаете результат и растёте.",
    faqTitle: "Вопросы",
    statusSuccess: "ПРИНЯТО. ОЖИДАЙТЕ.",
    statusError: "ОШИБКА СВЯЗИ."
  },
  en: {
    heroTitle: "AI Marketing That Actually Scales",
    heroSub: "WITHOUT THE HYPE",
    heroDesc: "We build custom generative systems for brands that want predictable growth, not just viral experiments.",
    cta: "BOOK A STRATEGY SESSION",
    ctaShort: "GET MY FREE STRATEGY PLAN",
    trustBar: "Trusted by founders and marketing teams at",
    trustQuote: "“Reduced our cost per lead by 47% in 3 weeks — with zero manual content creation.”",
    trustAuthor: "— Sarah K., Growth Lead, SaaS Scale-up",
    servicesTitle: "What We Deliver",
    servicesSub: "We engineer systems, not just paste prompts into ChatGPT.",
    compareTitle: "Reality Control",
    caseTitle: "Real Results",
    whyTitle: "Why Us?",
    roiTitle: "Economics",
    stepTitle: "Simple. Transparent.",
    step1: "Brief", step1D: "You share your goals and brand voice.",
    step2: "Build", step2D: "We design a custom AI workflow.",
    step3: "Scale", step3D: "You get output and room to grow.",
    faqTitle: "FAQ",
    statusSuccess: "ACCEPTED. STAND BY.",
    statusError: "LINK ERROR."
  }
};

const partners = ["NOTION", "AWS", "SHOPIFY", "TECHCRUNCH", "WILDBERRIES", "TINKOFF"];

const services = [
  { id: "01", icon: "📝", t: { ru: "Generative Content Studio", en: "Generative Content Studio" }, d: { ru: "SEO блоги, email, рекламные тексты в стиле бренда.", en: "SEO blogs, email sequences, ad copy on-brand." } },
  { id: "02", icon: "🎨", t: { ru: "AI Visual Design Engine", en: "AI Visual Design Engine" }, d: { ru: "Посты, баннеры, карточки товаров за секунды.", en: "Social posts, banners, product mockups in seconds." } },
  { id: "03", icon: "🎥", t: { ru: "Automated Video Production", en: "Automated Video Production" }, d: { ru: "Создание видео-рекламы через нейро-рендеринг.", en: "Video campaigns via neural rendering." } },
  { id: "04", icon: "🤖", t: { ru: "Custom AI Agents", en: "Custom AI Agents" }, d: { ru: "Круглосуточный ассистент для вашего маркетинга.", en: "Your 24/7 marketing assistant." } },
  { id: "05", icon: "📊", t: { ru: "Smart Automation", en: "Smart Automation" }, d: { ru: "Масштабирование креативов под тысячи сегментов.", en: "Scaling creatives for thousands of segments." } },
  { id: "06", icon: "🔗", t: { ru: "RAG Brand Knowledge", en: "RAG Brand Knowledge" }, d: { ru: "Точный ИИ, обученный на ваших данных.", en: "Accurate AI trained on your data." } }
];

const BeforeAfter = ({ t }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const handleMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX || (e.touches && e.touches[0].clientX)) - rect.left) / rect.width * 100;
    setSliderPos(Math.max(0, Math.min(100, x)));
  };
  return (
    <div className="py-40 space-y-12 border-t border-white/5">
      <h2 className="text-4xl font-display font-light uppercase tracking-tighter italic text-center">{t.compareTitle}</h2>
      <div ref={containerRef} className="relative aspect-video w-full overflow-hidden border border-white/5 cursor-col-resize group" onMouseMove={handleMove} onTouchMove={handleMove}>
        <div className="absolute inset-0 grayscale"><img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80" className="w-full h-full object-cover opacity-40" alt="B" /></div>
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}><img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80" className="w-full h-full object-cover" alt="A" /></div>
        <div className="absolute inset-y-0 w-[1px] bg-cyan-500 z-10 shadow-[0_0_20px_rgba(6,182,212,0.5)]" style={{ left: `${sliderPos}%` }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 backdrop-blur-2xl flex items-center justify-center text-[8px]">SCAN</div>
        </div>
      </div>
    </div>
  );
};

const ROICalculator = ({ t }) => {
  const [budget, setBudget] = useState(10000);
  return (
    <div className="py-40 border-t border-white/5 grid md:grid-cols-2 gap-20 items-center">
      <div className="space-y-8">
        <h2 className="text-5xl font-display font-light uppercase tracking-tighter italic">{t.roiTitle}</h2>
        <div className="space-y-4">
          <div className="flex justify-between font-mono text-[10px] text-gray-500 uppercase"><span>Budget / mo</span><span>${budget.toLocaleString()}</span></div>
          <input type="range" min="2000" max="100000" step="1000" value={budget} onChange={(e) => setBudget(parseInt(e.target.value))} className="w-full h-[1px] bg-white/10 appearance-none accent-cyan-500" />
        </div>
      </div>
      <div className="p-16 bg-white/[0.02] border border-white/5 text-center space-y-4">
        <div className="text-7xl font-display font-bold tracking-tighter text-gradient">${(budget * 0.88).toLocaleString()}</div>
        <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">{t.roiSavings} / Year</p>
      </div>
    </div>
  );
};

const CustomCursor = () => {
  const mouseX = useSpring(0, { damping: 25, stiffness: 250 });
  const mouseY = useSpring(0, { damping: 25, stiffness: 250 });
  useEffect(() => {
    const m = (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener('mousemove', m);
    return () => window.removeEventListener('mousemove', m);
  }, [mouseX, mouseY]);
  return (
    <motion.div className="fixed top-0 left-0 w-6 h-6 border border-white/20 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block" style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }} />
  );
};

function App() {
  const [lang, setLang] = useState('ru');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', bottleneck: '' });
  const [status, setStatus] = useState('');
  const t = translations[lang];
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => { setTimeout(() => setLoading(false), 1500); }, []);

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
    <div className="bg-black text-white antialiased selection:bg-white selection:text-black font-sans cursor-none overflow-x-hidden">
      <AnimatePresence>{loading && (
        <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black flex items-center justify-center">
          <div className="w-12 h-[1px] bg-white/20 relative overflow-hidden"><motion.div animate={{ left: ["-100%", "100%"] }} transition={{ duration: 1, repeat: Infinity }} className="absolute inset-0 bg-white" /></div>
        </motion.div>
      )}</AnimatePresence>

      <CustomCursor />
      <nav className="fixed top-0 left-0 w-full z-[100] px-10 py-10 flex justify-between items-center mix-blend-difference">
        <div className="font-display font-bold text-xl tracking-tighter italic">V3000</div>
        <button onClick={() => setLang(lang==='ru'?'en':'ru')} className="font-mono text-[9px] border border-white/10 px-4 py-1 rounded-full uppercase hover:bg-white hover:text-black transition-all">{lang}</button>
      </nav>

      <main className="max-w-7xl mx-auto px-6">
        {/* HERO */}
        <motion.section style={{ opacity: heroOpacity }} className="h-screen flex flex-col justify-center items-center text-center space-y-12">
          <span className="uppercase tracking-[0.6em] font-mono text-[10px] text-cyan-500 italic"><span>{t.heroSub}</span></span>
          <h1 className="text-[10vw] md:text-[8vw] font-display font-light tracking-tighter leading-[0.9] text-gradient">{t.heroTitle}</h1>
          <p className="text-lg md:text-xl font-light text-gray-400 max-w-xl mx-auto">{t.heroDesc}</p>
          <button className="px-14 py-6 bg-white text-black text-[10px] uppercase tracking-[0.5em] font-black hover:invert transition-all">{t.cta}</button>
        </motion.section>

        {/* SOCIAL PROOF */}
        <section className="py-32 border-y border-white/5 space-y-16">
          <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale brightness-200">
            {partners.map(p => <span key={p} className="font-display font-bold text-xs tracking-widest">{p}</span>)}
          </div>
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <p className="text-xl italic font-light text-gray-300">{t.trustQuote}</p>
            <p className="text-[10px] font-mono text-cyan-500 uppercase">{t.trustAuthor}</p>
          </div>
        </section>

        {/* SERVICES */}
        <section className="py-40">
          <h2 className="text-5xl md:text-7xl font-display font-light tracking-tighter uppercase italic mb-32 leading-none">{t.servicesTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {services.map(s => (
              <div key={s.id} className="p-12 bg-black space-y-8 group hover:bg-zinc-950 transition-colors">
                <div className="text-4xl opacity-20 group-hover:opacity-100 transition-opacity">{s.icon}</div>
                <h3 className="text-xl font-display font-light uppercase tracking-widest leading-tight">{s[lang].title}</h3>
                <p className="text-xs text-gray-500 font-light leading-relaxed">{s[lang].desc}</p>
              </div>
            ))}
          </div>
        </section>

        <BeforeAfter t={t} />

        {/* WHY US */}
        <section className="py-40 border-t border-white/5 space-y-20">
          <h2 className="text-5xl font-display font-light uppercase italic tracking-tighter">{t.whyTitle}</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { t: { ru: "Системы, а не промпты", en: "Systems, Not Prompts" }, d: { ru: "Мы проектируем воркфлоу, а не просто копируем GPT.", en: "We engineer workflows, not just paste prompts." } },
              { t: { ru: "Точность над хайпом", en: "Accuracy Over Hype" }, d: { ru: "RAG-архитектура исключает галлюцинации.", en: "RAG architecture eliminates hallucinations." } },
              { t: { ru: "Готовый Стек", en: "Built for Your Stack" }, d: { ru: "Интеграция с CRM, Slack, Notion.", en: "Integrates with CRM, Slack, Notion." } }
            ].map((item, i) => (
              <div key={i} className="space-y-4">
                <div className="text-cyan-500 font-mono text-[9px]">MODULE 0{i+1}</div>
                <h3 className="text-xl uppercase italic">{item.t[lang]}</h3>
                <p className="text-xs text-gray-500 font-light leading-relaxed">{item.d[lang]}</p>
              </div>
            ))}
          </div>
        </section>

        <ROICalculator t={t} />

        {/* FINAL FORM */}
        <section className="py-60 flex justify-center border-t border-white/5">
          <div className="max-w-2xl w-full text-center space-y-20">
            <h2 className="text-5xl md:text-7xl font-display font-light tracking-tighter uppercase italic text-gradient">{t.finalTitle}</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid gap-2">
                <input type="text" placeholder="Name" required value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} className="bg-transparent border-b border-white/5 py-6 text-center text-2xl font-light outline-none focus:border-white transition-colors" />
                <input type="text" placeholder="Company" required value={formData.company} onChange={e=>setFormData({...formData, company:e.target.value})} className="bg-transparent border-b border-white/5 py-6 text-center text-2xl font-light outline-none focus:border-white transition-colors" />
                <input type="email" placeholder="Email" required value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})} className="bg-transparent border-b border-white/5 py-6 text-center text-2xl font-light outline-none focus:border-white transition-colors" />
                <textarea placeholder="Bottleneck?" value={formData.bottleneck} onChange={e=>setFormData({...formData, bottleneck:e.target.value})} className="bg-transparent border-b border-white/5 py-6 text-center text-lg font-light outline-none focus:border-white transition-colors h-32 resize-none" />
              </div>
              <button className="px-16 py-8 bg-white text-black text-[10px] uppercase tracking-[0.6em] font-bold hover:invert transition-all">{t.ctaShort}</button>
              <AnimatePresence>{status && <motion.p initial={{opacity:0}} animate={{opacity:1}} className="font-mono text-[9px] tracking-widest text-cyan-500 uppercase animate-pulse pt-4">{status}</motion.p>}</AnimatePresence>
            </form>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 text-center opacity-20 font-mono text-[7px] tracking-[1em]">© 2026 V3000 NEURAL ARCHITECTURES</footer>
    </div>
  );
}

export default App;