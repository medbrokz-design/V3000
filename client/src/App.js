import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

const translations = {
  ru: {
    heroTitle: "Замените продакшн",
    heroSub: "Протокол V3000",
    heroDesc: "Мировой уровень визуального контента без съемок, моделей и студий. В 10 раз быстрее, в 5 раз дешевле.",
    cta: "ЗАПРОСИТЬ АУДИТ",
    servicesTitle: "AI-Powered Marketing That Scales",
    servicesSub: "Мы не просто используем ИИ — мы создаём кастомные генеративные системы, которые автоматизируют ваш контент, персонализируют коммуникации и ускоряют рост.",
    ctaStrategy: "Забронировать сессию —→",
    compareTitle: "Контроль реальности",
    roiTitle: "Экономика",
    statusSuccess: "ПРИНЯТО.",
    statusError: "ОШИБКА."
  },
  en: {
    heroTitle: "Replace Production",
    heroSub: "V3000 Protocol",
    heroDesc: "World-class visual content without shoots, models, or studios. 10x faster, 5x cheaper.",
    cta: "REQUEST AUDIT",
    servicesTitle: "AI-Powered Marketing That Scales",
    servicesSub: "We don’t just use AI — we build custom generative systems that automate your content, personalize your messaging, and accelerate growth.",
    ctaStrategy: "Book a Strategy Session —→",
    compareTitle: "Reality Control",
    roiTitle: "Economics",
    statusSuccess: "ACCEPTED.",
    statusError: "ERROR."
  }
};

const services = [
  { id: "01", icon: "📝", t: { ru: "Generative Content Studio", en: "Generative Content Studio" }, d: { ru: "Автоматизированная фабрика текстов и смыслов под ДНК вашего бренда.", en: "Automated text and meaning factory aligned with your brand DNA." } },
  { id: "02", icon: "🎨", t: { ru: "AI Visual Design Engine", en: "AI Visual Design Engine" }, d: { ru: "Генерация графики и дизайна любой сложности без участия дизайнеров.", en: "Generation of graphics and design of any complexity without designers." } },
  { id: "03", icon: "🎥", t: { ru: "Automated Video Production", en: "Automated Video Production" }, d: { ru: "Создание видео-кампаний и рекламы через нейро-рендеринг.", en: "Creation of video campaigns and ads via neural rendering." } },
  { id: "04", icon: "📊", t: { ru: "Smart Ad & Campaign Automation", en: "Smart Ad & Campaign Automation" }, d: { ru: "Масштабирование рекламных креативов под тысячи сегментов аудитории.", en: "Scaling ad creatives for thousands of audience segments." } },
  { id: "05", icon: "🤖", t: { ru: "Custom AI Agents for Marketing", en: "Custom AI Agents for Marketing" }, d: { ru: "Автономные ИИ-сотрудники, управляющие вашим маркетингом 24/7.", en: "Autonomous AI employees managing your marketing 24/7." } },
  { id: "06", icon: "🔗", t: { ru: "RAG-Powered Brand Knowledge", en: "RAG-Powered Brand Knowledge" }, d: { ru: "Единая база знаний бренда, доступная для всех ИИ-моделей компании.", en: "Unified brand knowledge base accessible to all company AI models." } }
];

const ServiceCard = ({ s, lang, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="p-10 border border-white/5 bg-zinc-950/20 group hover:bg-white/5 transition-all duration-500 flex flex-col justify-between aspect-square md:aspect-auto"
  >
    <div className="space-y-6">
      <div className="text-3xl opacity-20 group-hover:opacity-100 transition-opacity">{s.icon}</div>
      <h3 className="text-xl font-display font-light uppercase tracking-widest leading-tight">{s.t[lang]}</h3>
      <p className="text-xs text-gray-500 font-light leading-relaxed max-w-[200px]">{s.d[lang]}</p>
    </div>
    <div className="font-mono text-[8px] text-gray-700 mt-10">Module // {s.id}</div>
  </motion.div>
);

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
    <section className="py-40 space-y-12 border-t border-white/5">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-display font-light uppercase tracking-tighter italic">{t.compareTitle}</h2>
      </div>
      <div ref={containerRef} className="relative aspect-[21/9] w-full overflow-hidden border border-white/5 cursor-col-resize group" onMouseMove={handleMove} onTouchMove={handleMove}>
        <div className="absolute inset-0 grayscale"><img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-40" alt="B" /></div>
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}><img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="A" /></div>
        <div className="absolute inset-y-0 w-[1px] bg-cyan-500 z-10" style={{ left: `${sliderPos}%` }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-cyan-500/20 backdrop-blur-3xl flex items-center justify-center text-[8px] text-cyan-500 tracking-tighter uppercase">Compare</div>
        </div>
      </div>
    </section>
  );
};

function App() {
  const [lang, setLang] = useState('ru');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
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
      if (data.success) { setStatus(t.statusSuccess); setFormData({ name: '', email: '', company: '' }); }
    } catch (e) { setStatus(t.statusError); }
  };

  return (
    <div className="bg-black text-white antialiased selection:bg-white selection:text-black font-sans scroll-smooth">
      <AnimatePresence>{loading && (
        <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black flex items-center justify-center">
          <div className="w-12 h-[1px] bg-white/20 relative overflow-hidden"><motion.div animate={{ left: ["-100%", "100%"] }} transition={{ duration: 1, repeat: Infinity }} className="absolute inset-0 bg-white" /></div>
        </motion.div>
      )}</AnimatePresence>

      <nav className="fixed top-0 left-0 w-full z-[100] px-10 py-10 flex justify-between items-center mix-blend-difference">
        <div className="font-display font-bold text-xl tracking-tighter italic">V3000</div>
        <button onClick={() => setLang(lang==='ru'?'en':'ru')} className="font-mono text-[9px] border border-white/10 px-4 py-1 rounded-full uppercase hover:bg-white hover:text-black transition-all">{lang}</button>
      </nav>

      <main className="max-w-7xl mx-auto px-6">
        {/* HERO */}
        <motion.section style={{ opacity: heroOpacity }} className="h-screen flex flex-col justify-center items-center text-center space-y-12">
          <span className="uppercase tracking-[0.6em] font-mono text-[9px] text-cyan-500 italic">{t.heroSub}</span>
          <h1 className="text-[14vw] md:text-[11vw] font-display font-light tracking-tighter leading-[0.85] text-gradient">{t.heroTitle}</h1>
          <p className="text-lg md:text-xl font-light text-gray-400 max-w-xl mx-auto leading-relaxed">{t.heroDesc}</p>
          <button className="px-14 py-6 bg-white text-black text-[9px] uppercase tracking-[0.5em] font-bold hover:invert transition-all rounded-sm">{t.cta}</button>
        </motion.section>

        {/* NEW SERVICES SECTION */}
        <section className="py-40 border-t border-white/5">
          <div className="grid lg:grid-cols-2 gap-20 items-end mb-32">
            <h2 className="text-5xl md:text-7xl font-display font-light tracking-tighter uppercase italic leading-none">{t.servicesTitle}</h2>
            <p className="text-gray-500 font-light text-lg max-w-md">{t.servicesSub}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {services.map((s, i) => (
              <ServiceCard key={s.id} s={s} lang={lang} index={i} />
            ))}
          </div>

          <div className="mt-20 flex justify-center">
            <motion.button 
              whileHover={{ x: 10 }}
              className="text-cyan-500 font-display font-bold uppercase tracking-[0.4em] text-xs"
            >
              {t.ctaStrategy}
            </motion.button>
          </div>
        </section>

        <BeforeAfter t={t} />

        {/* WORKFLOW */}
        <section className="py-40 border-t border-white/5">
          <h2 className="text-6xl font-display font-light uppercase tracking-tighter italic text-center mb-32">{t.stepTitle}</h2>
          <div className="grid md:grid-cols-3 gap-px bg-white/5">
            {["Audit", "Neural Synthesis", "Mass Scaling"].map((step, i) => (
              <div key={i} className="p-16 bg-black space-y-8 group hover:bg-zinc-950 transition-colors">
                <div className="text-5xl font-display font-black text-white/5">0{i+1}</div>
                <h3 className="text-xl uppercase tracking-widest italic leading-tight">{step}</h3>
                <div className="h-[1px] w-12 bg-white/20 group-hover:w-full transition-all duration-700"></div>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-60 flex justify-center border-t border-white/5">
          <div className="max-w-2xl w-full text-center space-y-20">
            <div className="space-y-6">
              <h2 className="text-6xl md:text-8xl font-display font-light tracking-tighter uppercase italic text-gradient">V3000 Core</h2>
              <p className="text-gray-500 text-sm font-light tracking-widest uppercase italic">Secure your slot for February 2026.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="grid gap-4">
                <input type="text" placeholder="Name" required value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} className="bg-transparent border-b border-white/5 py-6 text-center text-2xl font-light outline-none focus:border-white transition-colors" />
                <input type="text" placeholder="Company" required value={formData.company} onChange={e=>setFormData({...formData, company:e.target.value})} className="bg-transparent border-b border-white/5 py-6 text-center text-2xl font-light outline-none focus:border-white transition-colors" />
                <input type="email" placeholder="Email" required value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})} className="bg-transparent border-b border-white/5 py-6 text-center text-2xl font-light outline-none focus:border-white transition-colors" />
              </div>
              <button className="px-16 py-8 bg-white text-black text-[10px] uppercase tracking-[0.6em] font-bold hover:invert transition-all">{t.cta}</button>
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