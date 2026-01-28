import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

const translations = {
  ru: {
    heroTitle: "Замените продакшн",
    heroSub: "Протокол V3000",
    heroDesc: "Мировой уровень визуального контента без съемок, моделей и студий. В 10 раз быстрее, в 5 раз дешевле.",
    cta: "ЗАПРОСИТЬ АУДИТ",
    capabilitiesTitle: "Возможности",
    comparisonTitle: "Эволюция",
    visionTitle: "Манифест",
    stepTitle: "Путь к результату",
    roiTitle: "Экономика",
    faqTitle: "Вопросы",
    statusSuccess: "ПРИНЯТО.",
    statusError: "ОШИБКА."
  },
  en: {
    heroTitle: "Replace Production",
    heroSub: "V3000 Protocol",
    heroDesc: "World-class visual content without shoots, models, or studios. 10x faster, 5x cheaper.",
    cta: "REQUEST AUDIT",
    capabilitiesTitle: "Capabilities",
    comparisonTitle: "Evolution",
    visionTitle: "Manifesto",
    stepTitle: "The Workflow",
    roiTitle: "Economics",
    faqTitle: "FAQ",
    statusSuccess: "ACCEPTED.",
    statusError: "ERROR."
  }
};

const capabilities = [
  { t: "Virtual Cinematography", d: "Управление физикой света Arri Alexa в цифровой среде." },
  { t: "DNA-Lock Consistency", d: "100% сохранение внешности персонажа во всех кампаниях." },
  { t: "Atmosphere Engine", d: "Генерация любых погодных и архитектурных условий мгновенно." },
  { t: "Rapid Iteration", d: "Смена концепции всей съемки за 15 минут, а не за неделю." }
];

const Comparison = ({ lang }) => (
  <section className="py-40 border-t border-white/5">
    <h2 className="text-5xl font-display font-light uppercase tracking-tighter italic mb-20 text-center">
      {lang === 'ru' ? 'Старый мир vs V3000' : 'Old World vs V3000'}
    </h2>
    <div className="grid md:grid-cols-2 gap-px bg-white/5 border border-white/5">
      <div className="bg-black p-12 space-y-8">
        <h3 className="text-gray-600 uppercase tracking-widest text-xs">Classical Production</h3>
        <ul className="space-y-6 text-sm font-light text-gray-400">
          <li className="flex justify-between border-b border-white/5 pb-2"><span>Сроки</span> <span>2-4 недели</span></li>
          <li className="flex justify-between border-b border-white/5 pb-2"><span>Команда</span> <span>15-20 человек</span></li>
          <li className="flex justify-between border-b border-white/5 pb-2"><span>Логистика</span> <span>Сложно / Дорого</span></li>
          <li className="flex justify-between border-b border-white/5 pb-2"><span>Права</span> <span>Ограничены</span></li>
        </ul>
      </div>
      <div className="bg-zinc-950 p-12 space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 bg-cyan-500 text-black text-[8px] font-bold uppercase tracking-widest">Recommended</div>
        <h3 className="text-cyan-500 uppercase tracking-widest text-xs">V3000 Protocol</h3>
        <ul className="space-y-6 text-sm font-light">
          <li className="flex justify-between border-b border-cyan-500/20 pb-2 text-white"><span>Сроки</span> <span>48 часов</span></li>
          <li className="flex justify-between border-b border-cyan-500/20 pb-2 text-white"><span>Команда</span> <span>ИИ-Архитектор</span></li>
          <li className="flex justify-between border-b border-cyan-500/20 pb-2 text-white"><span>Логистика</span> <span>Zero</span></li>
          <li className="flex justify-between border-b border-cyan-500/20 pb-2 text-white"><span>Права</span> <span>Unlimited</span></li>
        </ul>
      </div>
    </div>
  </section>
);

const Vision = ({ lang }) => (
  <section className="py-60 text-center space-y-12">
    <div className="inline-block px-4 py-1 border border-white/10 rounded-full text-[8px] uppercase tracking-[0.5em] text-gray-500 mb-10">V3000 Vision</div>
    <h2 className="text-4xl md:text-7xl font-display font-light leading-tight tracking-tighter">
      {lang === 'ru' ? (
        <>Мы не предсказываем будущее.<br/>Мы <span className="italic text-gradient">рендерим</span> его.</>
      ) : (
        <>We don't predict the future.<br/>We <span className="italic text-gradient">render</span> it.</>
      )}
    </h2>
    <p className="max-w-2xl mx-auto text-gray-500 font-light text-lg">
      В 2026 году граница между реальностью и синтезом стерта. Те, кто продолжают тратить миллионы на физический продакшн, проигрывают тем, кто владеет кодом эстетики.
    </p>
  </section>
);

const BeforeAfter = ({ t }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const handleMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const x = ((clientX) - rect.left) / rect.width * 100;
    setSliderPos(Math.max(0, Math.min(100, x)));
  };
  return (
    <section className="py-40 space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-display font-light uppercase tracking-tighter italic">{t.compareTitle}</h2>
      </div>
      <div ref={containerRef} className="relative aspect-video w-full overflow-hidden border border-white/5 cursor-col-resize group" onMouseMove={handleMove} onTouchMove={handleMove}>
        <div className="absolute inset-0 grayscale"><img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-40" alt="Before" /></div>
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}><img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="After" /></div>
        <div className="absolute inset-y-0 w-[1px] bg-white z-10 shadow-[0_0_20px_rgba(255,255,255,0.5)]" style={{ left: `${sliderPos}%` }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 backdrop-blur-2xl flex items-center justify-center text-[10px] tracking-tighter uppercase">Compare</div>
        </div>
      </div>
    </section>
  );
};

const ROICalculator = ({ t }) => {
  const [budget, setBudget] = useState(10000);
  return (
    <section className="py-40 border-t border-white/5">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-10">
          <h2 className="text-6xl font-display font-light tracking-tighter uppercase italic">{t.roiTitle}</h2>
          <div className="space-y-6">
            <div className="flex justify-between font-mono text-[10px] text-gray-500 uppercase tracking-widest"><span>{t.roiLabel}</span><span className="text-white">${budget.toLocaleString()}</span></div>
            <input type="range" min="2000" max="100000" step="1000" value={budget} onChange={(e) => setBudget(parseInt(e.target.value))} className="w-full h-[1px] bg-white/10 appearance-none accent-white cursor-crosshair" />
          </div>
        </div>
        <div className="relative p-16 bg-white/[0.02] border border-white/5 backdrop-blur-sm text-center space-y-4">
          <div className="text-8xl font-display font-bold tracking-tighter text-gradient">${(budget * 0.88).toLocaleString()}</div>
          <p className="font-mono text-[9px] text-cyan-500 uppercase tracking-[0.5em]">Annual Net Savings</p>
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
          <span className="uppercase tracking-[0.6em] font-mono text-[10px] text-cyan-500 italic">{t.heroSub}</span>
          <h1 className="text-[14vw] md:text-[11vw] font-display font-light tracking-tighter leading-[0.85] text-gradient">{t.heroTitle}</h1>
          <p className="text-lg md:text-xl font-light text-gray-400 max-w-2xl mx-auto leading-relaxed">{t.heroDesc}</p>
          <button className="px-14 py-6 bg-white text-black text-[10px] uppercase tracking-[0.5em] font-bold hover:invert transition-all rounded-sm">{t.cta}</button>
        </motion.section>

        {/* NEW: CAPABILITIES */}
        <section className="py-40">
          <h2 className="text-5xl font-display font-light uppercase tracking-tighter italic mb-24">{t.capabilitiesTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((c, i) => (
              <div key={i} className="space-y-6 p-8 border border-white/5 bg-zinc-950/50 hover:bg-white/5 transition-colors">
                <div className="text-cyan-500 font-mono text-[10px]">0{i+1}</div>
                <h3 className="text-xl font-light uppercase tracking-tight">{c.t}</h3>
                <p className="text-xs text-gray-500 font-light leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </section>

        <BeforeAfter t={translations[lang]} />

        {/* NEW: COMPARISON */}
        <Comparison lang={lang} />

        {/* WORKFLOW */}
        <section className="py-40 border-t border-white/5">
          <h2 className="text-6xl font-display font-light uppercase tracking-tighter italic text-center mb-32">{t.stepTitle}</h2>
          <div className="grid md:grid-cols-3 gap-px bg-white/5">
            {[t.step1, t.step2, t.step3].map((step, i) => (
              <div key={i} className="p-16 bg-black space-y-8 group hover:bg-zinc-950 transition-colors">
                <div className="text-5xl font-display font-black text-white/5">0{i+1}</div>
                <h3 className="text-xl uppercase tracking-widest italic leading-tight">{step}</h3>
                <div className="h-[1px] w-12 bg-white/20 group-hover:w-full transition-all duration-700"></div>
              </div>
            ))}
          </div>
        </section>

        <ROICalculator t={translations[lang]} />

        {/* NEW: VISION MANIFESTO */}
        <Vision lang={lang} />

        {/* FINAL CTA */}
        <section className="py-60 flex justify-center border-t border-white/5">
          <div className="max-w-2xl w-full text-center space-y-20">
            <div className="space-y-6">
              <h2 className="text-6xl md:text-8xl font-display font-light tracking-tighter uppercase italic text-gradient">V3000 Core</h2>
              <p className="text-gray-500 text-sm font-light tracking-widest uppercase italic">The future is already rendered.</p>
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