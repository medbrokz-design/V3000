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
    whyTitle: "Мы не «еще одно агентство с ChatGPT»",
    caseTitle: "Цифры вместо слов",
    stepTitle: "Как это работает",
    step1: "Бриф", step1D: "Вы рассказываете о задачах, стиле бренда и инструментах.",
    step2: "Настройка", step2D: "Мы создаём ИИ-воркфлоу под ваш бизнес — без шаблонов.",
    step3: "Масштаб", step3D: "Вы получаете контент, аналитику и растёте без перегруза.",
    roiTitle: "Рассчитайте выгоду",
    finalTitle: "Готовы масштабировать маркетинг на настоящем ИИ?",
    finalSub: "Забронируйте бесплатную 30-минутную сессию. Без продаж — только конкретные рекомендации.",
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
    whyTitle: "We’re Not Another “AI Agency”",
    caseTitle: "Real Results, Not Promises",
    stepTitle: "Simple. Transparent.",
    step1: "Brief", step1D: "You share your goals, brand voice, and tech stack.",
    step2: "Build", step2D: "We design a custom AI workflow — no off-the-shelf templates.",
    step3: "Scale", step3D: "You get high-quality output, real-time analytics, and room to grow.",
    roiTitle: "Calculate ROI",
    finalTitle: "Ready to Scale Your Marketing with Real AI?",
    finalSub: "Book a free 30-minute strategy session. No sales pitch — just actionable insights.",
    statusSuccess: "ACCEPTED. STAND BY.",
    statusError: "LINK ERROR."
  }
};

const partners = ["NOTION", "AWS", "SHOPIFY", "TECHCRUNCH", "WILDBERRIES", "TINKOFF"];

const services = [
  { id: "01", icon: "📝", t: { ru: "Generative Content Studio", en: "Generative Content Studio" }, d: { ru: "SEO блоги, email-цепочки, рекламные тексты — масштабируемо и в стиле бренда.", en: "SEO blogs, email sequences, ad copy — at scale, on-brand." } },
  { id: "02", icon: "🎨", t: { ru: "AI Visual Design Engine", en: "AI Visual Design Engine" }, d: { ru: "Посты, баннеры, карточки товаров — генерация за секунды без дизайнеров.", en: "Social posts, banners, product mockups — generated in seconds." } },
  { id: "03", icon: "🎥", t: { ru: "Automated Video Production", en: "Automated Video Production" }, d: { ru: "Создание видео-кампаний и рекламы через нейро-рендеринг.", en: "Creation of video campaigns and ads via neural rendering." } },
  { id: "04", icon: "🤖", t: { ru: "Custom AI Agents", en: "Custom AI Agents" }, d: { ru: "Ваш круглосуточный ассистент для идей, исследований и поддержки.", en: "Your 24/7 marketing assistant for ideation, research, and support." } },
  { id: "05", icon: "📊", t: { ru: "Smart Campaign Automation", en: "Smart Campaign Automation" }, d: { ru: "Масштабирование рекламных креативов под тысячи сегментов аудитории.", en: "Scaling ad creatives for thousands of audience segments." } },
  { id: "06", icon: "🔗", t: { ru: "RAG-Powered Brand Knowledge", en: "RAG-Powered Brand Knowledge" }, d: { ru: "Точный, без галлюцинаций ИИ, обученный на ваших данных.", en: "Accurate, hallucination-free AI trained on your data." } }
];

const cases = [
  { 
    title: { ru: "E-commerce Бренд", en: "E-commerce Brand" },
    challenge: { ru: "Масштабировать рекламу без найма дизайнеров.", en: "Scale ads without hiring a creative team." },
    result: { ru: "↓ CPA на 38%, ↑ ROAS 4.2x за 6 недель.", en: "↓ CPA by 38%, ↑ ROAS to 4.2x in 6 weeks." },
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2070"
  },
  { 
    title: { ru: "B2B SaaS (Германия)", en: "B2B SaaS (Germany)" },
    challenge: { ru: "Генерация экспертного контента в блог.", en: "Produce consistent thought leadership content." },
    result: { ru: "↑ Органика на 210%, в 3 раза больше лидов.", en: "↑ Organic traffic by 210%, 3x more leads." },
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026"
  }
];

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
    <div className="bg-black text-white antialiased selection:bg-white selection:text-black font-sans scroll-smooth cursor-none">
      <AnimatePresence>{loading && (
        <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center">
          <div className="w-12 h-[1px] bg-white/20 relative overflow-hidden"><motion.div animate={{ left: ["-100%", "100%"] }} transition={{ duration: 1, repeat: Infinity }} className="absolute inset-0 bg-white" /></div>
        </motion.div>
      )}</AnimatePresence>

      <CustomCursor />
      
      <nav className="fixed top-0 left-0 w-full z-[100] px-10 py-10 flex justify-between items-center mix-blend-difference">
        <div className="font-display font-bold text-xl tracking-tighter italic">V3000</div>
        <button onClick={() => setLang(lang==='ru'?'en':'ru')} className="font-mono text-[9px] border border-white/10 px-4 py-1 rounded-full uppercase hover:bg-white hover:text-black transition-all">{lang}</button>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-20">
        {/* HERO */}
        <motion.section style={{ opacity: heroOpacity }} className="h-screen flex flex-col justify-center items-center text-center space-y-12">
          <div className="space-y-4 uppercase tracking-[0.6em] font-mono text-[10px] text-cyan-500 italic"><span>{t.heroSub}</span></div>
          <h1 className="text-[10vw] md:text-[8vw] font-display font-light tracking-tighter leading-[0.9] text-gradient">{t.heroTitle}</h1>
          <p className="text-lg md:text-xl font-light text-gray-400 max-w-2xl mx-auto leading-relaxed">{t.heroDesc}</p>
          <button className="px-14 py-6 bg-white text-black text-[10px] uppercase tracking-[0.5em] font-black hover:invert transition-all rounded-sm">{t.cta}</button>
        </motion.section>

        {/* SOCIAL PROOF BAR */}
        <section className="py-32 border-y border-white/5">
          <div className="space-y-16">
            <p className="text-center font-mono text-[10px] text-gray-600 uppercase tracking-widest">{t.trustBar}</p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-30 grayscale filter brightness-200">
              {partners.map(p => <span key={p} className="font-display font-bold text-xs tracking-widest">{p}</span>)}
            </div>
            <div className="max-w-3xl mx-auto text-center space-y-4 pt-10">
              <p className="text-xl italic font-light text-gray-300">{t.trustQuote}</p>
              <p className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">{t.trustAuthor}</p>
            </div>
          </div>
        </section>

        {/* SERVICES GRID (6 Modules) */}
        <section className="py-40">
          <div className="grid lg:grid-cols-2 gap-20 items-end mb-32">
            <h2 className="text-5xl md:text-7xl font-display font-light tracking-tighter uppercase italic leading-none">{t.servicesTitle}</h2>
            <p className="text-gray-500 font-light text-lg max-w-md">{t.servicesSub}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {services.map((s, i) => (
              <div key={s.id} className="p-12 bg-black space-y-8 group hover:bg-zinc-950 transition-colors">
                <div className="text-4xl opacity-20 group-hover:opacity-100 transition-opacity">{s.icon}</div>
                <h3 className="text-xl font-display font-light uppercase tracking-widest leading-tight">{s[lang].title}</h3>
                <p className="text-xs text-gray-500 font-light leading-relaxed">{s[lang].desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CASE STUDIES */}
        <section className="py-40 border-t border-white/5 space-y-32">
          <h2 className="text-6xl font-display font-light uppercase tracking-tighter italic text-center">{t.caseTitle}</h2>
          <div className="grid md:grid-cols-2 gap-20">
            {cases.map((c, i) => (
              <div key={i} className="space-y-10 group">
                <div className="aspect-video overflow-hidden bg-zinc-900 border border-white/5">
                  <img src={c.img} className="w-full h-full object-cover opacity-40 group-hover:opacity-80 transition-all duration-1000 group-hover:scale-105" alt="Case" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-light uppercase italic">{c.title[lang]}</h3>
                  <p className="text-gray-500 text-sm font-light">{c.challenge[lang]}</p>
                  <div className="inline-block px-4 py-2 border border-cyan-500/20 bg-cyan-500/5 text-cyan-500 font-mono text-[10px] uppercase tracking-widest">{c.result[lang]}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WHY US? */}
        <section className="py-40 border-t border-white/5">
          <h2 className="text-5xl font-display font-light uppercase tracking-tighter italic mb-20">{t.whyTitle}</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { t: { ru: "Системы, а не промпты", en: "Systems, Not Prompts" }, d: { ru: "Мы проектируем воркфлоу, а не просто копируем чат GPT.", en: "We engineer workflows, not just paste prompts into ChatGPT." } },
              { t: { ru: "Точность над хайпом", en: "Accuracy Over Hype" }, d: { ru: "RAG-архитектура исключает галлюцинации ИИ.", en: "RAG architecture eliminates AI hallucinations." } },
              { t: { ru: "Готовый Стек", en: "Built for Your Stack" }, d: { ru: "Интеграция с CRM, Slack, Notion и вашим софтом.", en: "Integrates with your CRM, Slack, and existing stack." } }
            ].map((item, i) => (
              <div key={i} className="space-y-6">
                <div className="text-cyan-500 font-mono text-[10px]">0{i+1} // SUCCESS</div>
                <h3 className="text-xl font-light uppercase tracking-widest italic">{item.t[lang]}</h3>
                <p className="text-xs text-gray-500 font-light leading-relaxed">{item.d[lang]}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WORKFLOW */}
        <section className="py-40 border-t border-white/5">
          <h2 className="text-6xl font-display font-light uppercase tracking-tighter italic text-center mb-32">{t.stepTitle}</h2>
          <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {[
              {t: t.step1, d: t.step1D},
              {t: t.step2, d: t.step2D},
              {t: t.step3, d: t.step3D}
            ].map((step, i) => (
              <div key={i} className="p-16 bg-black space-y-8">
                <div className="text-5xl font-display font-black text-white/5">0{i+1}</div>
                <h3 className="text-xl uppercase tracking-widest italic leading-tight">{step.t}</h3>
                <p className="text-xs text-gray-500 font-light leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CONVERSION */}
        <section className="py-60 flex justify-center border-t border-white/5">
          <div className="max-w-2xl w-full text-center space-y-20">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-7xl font-display font-light tracking-tighter uppercase italic text-gradient">{t.finalTitle}</h2>
              <p className="text-gray-500 text-sm font-light tracking-widest uppercase">{t.finalSub}</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid gap-4">
                <input type="text" placeholder="Name" required value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} className="bg-transparent border-b border-white/5 py-6 text-center text-2xl font-light outline-none focus:border-white transition-colors" />
                <input type="text" placeholder="Company" required value={formData.company} onChange={e=>setFormData({...formData, company:e.target.value})} className="bg-transparent border-b border-white/5 py-6 text-center text-2xl font-light outline-none focus:border-white transition-colors" />
                <input type="email" placeholder="Email" required value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})} className="bg-transparent border-b border-white/5 py-6 text-center text-2xl font-light outline-none focus:border-white transition-colors" />
                <textarea placeholder="Your biggest marketing bottleneck?" value={formData.bottleneck} onChange={e=>setFormData({...formData, bottleneck:e.target.value})} className="bg-transparent border-b border-white/5 py-6 text-center text-lg font-light outline-none focus:border-white transition-colors h-32" />
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
