import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

const translations = {
  ru: {
    heroTitle: "Замените продакшн",
    heroSub: "Протокол V3000",
    heroDesc: "Мировой уровень визуального контента без съемок, моделей и студий. В 10 раз быстрее, в 5 раз дешевле.",
    cta: "ЗАПРОСИТЬ АУДИТ",
    stepTitle: "Путь к результату",
    step1: "Анализ ДНК бренда",
    step2: "Нейро-синтез",
    step3: "Масштабирование",
    compareTitle: "Контроль реальности",
    compareSub: "Обычный метод vs Протокол V3000",
    roiTitle: "Экономика",
    roiLabel: "Бюджет на контент",
    roiSavings: "Чистая экономия",
    faqTitle: "Вопросы и ответы",
    faq1Q: "Это выглядит реалистично?",
    faq1A: "Да, наш софт управляет физикой света и текстурой кожи на уровне 8K.",
    faq2Q: "Кому принадлежат права?",
    faq2A: "Все права на контент полностью переходят вам по договору.",
    statusSuccess: "ПРИНЯТО. ОЖИДАЙТЕ.",
    statusError: "ОШИБКА КАНАЛА."
  },
  en: {
    heroTitle: "Replace Production",
    heroSub: "V3000 Protocol",
    heroDesc: "World-class visual content without shoots, models, or studios. 10x faster, 5x cheaper.",
    cta: "REQUEST AUDIT",
    stepTitle: "The Workflow",
    step1: "Brand DNA Audit",
    step2: "Neural Synthesis",
    step3: "Mass Scaling",
    compareTitle: "Reality Control",
    compareSub: "Standard Method vs V3000 Protocol",
    roiTitle: "Economics",
    roiLabel: "Content Budget",
    roiSavings: "Net Savings",
    faqTitle: "Common Questions",
    faq1Q: "Is it realistic?",
    faq1A: "Yes, our engine controls light physics and skin texture at 8K resolution.",
    faq2Q: "Who owns the rights?",
    faq2A: "Full commercial rights are transferred to you legally.",
    statusSuccess: "ACCEPTED. STAND BY.",
    statusError: "LINK ERROR."
  }
};

const partners = ["FORBES", "VOGUE", "TECHCRUNCH", "WIRED", "BLOOMBERG"];

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
    <section className="py-40 space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-display font-light uppercase tracking-tighter italic">{t.compareTitle}</h2>
        <p className="font-mono text-[10px] text-gray-600 uppercase tracking-[0.3em]">{t.compareSub}</p>
      </div>
      <div ref={containerRef} className="relative aspect-video w-full overflow-hidden border border-white/5 cursor-col-resize group" onMouseMove={handleMove} onTouchMove={handleMove}>
        <div className="absolute inset-0 grayscale"><img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-40" alt="Before" /></div>
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}><img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="After" /></div>
        <div className="absolute inset-y-0 w-[1px] bg-white z-10 shadow-[0_0_20px_rgba(255,255,255,0.5)]" style={{ left: `${sliderPos}%` }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 backdrop-blur-2xl flex items-center justify-center text-[10px] tracking-tighter">SCAN</div>
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
        <div className="relative group">
          <div className="absolute -inset-4 bg-cyan-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative p-16 bg-white/[0.02] border border-white/5 backdrop-blur-sm text-center space-y-4">
            <div className="text-8xl font-display font-bold tracking-tighter text-gradient">${(budget * 0.88).toLocaleString()}</div>
            <p className="font-mono text-[9px] text-cyan-500 uppercase tracking-[0.5em]">{t.roiSavings} / Year</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Terminal = () => {
  const [logs, setLogs] = useState([]);
  const messages = ["[SYSTEM] V3000 Active", "[NEURAL] Mapping DNA", "[DATA] Nano Banana 6.2", "[AUTH] Verified"];
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLogs(prev => [...prev.slice(-2), messages[i % messages.length]]);
      i++;
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="glass p-4 font-mono text-[8px] text-gray-500 rounded-sm uppercase tracking-widest">
      {logs.map((log, i) => <div key={i} className="mb-1">[{new Date().toLocaleTimeString([], {hour12:false})}] {log}</div>)}
    </div>
  );
};

const CustomCursor = () => {
  const mouseX = useSpring(0, { damping: 30, stiffness: 300 });
  const mouseY = useSpring(0, { damping: 30, stiffness: 300 });
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
    <div className="bg-black text-white antialiased selection:bg-white selection:text-black font-sans cursor-none">
      <AnimatePresence>{loading && (
        <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black flex items-center justify-center">
          <div className="w-12 h-[1px] bg-white/20 relative overflow-hidden"><motion.div animate={{ left: ["-100%", "100%"] }} transition={{ duration: 1, repeat: Infinity }} className="absolute inset-0 bg-white" /></div>
        </motion.div>
      )}</AnimatePresence>

      <CustomCursor />
      
      <nav className="fixed top-0 left-0 w-full z-[100] px-10 py-10 flex justify-between items-start mix-blend-difference">
        <div className="font-display font-bold text-xl tracking-tighter italic">V3000</div>
        <div className="flex flex-col items-end gap-4">
          <button onClick={() => setLang(lang==='ru'?'en':'ru')} className="font-mono text-[9px] border border-white/10 px-4 py-1 rounded-full uppercase hover:bg-white hover:text-black transition-all">{lang}</button>
          <div className="hidden lg:block w-48"><Terminal /></div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6">
        {/* HERO */}
        <motion.section style={{ opacity: heroOpacity }} className="h-screen flex flex-col justify-center items-center text-center space-y-12">
          <div className="space-y-4 uppercase tracking-[0.6em] font-mono text-[10px] text-gray-500 italic"><span>{t.heroSub}</span></div>
          <h1 className="text-[14vw] md:text-[11vw] font-display font-light tracking-tighter leading-[0.85] text-gradient">{t.heroTitle}</h1>
          <p className="text-lg md:text-xl font-light text-gray-400 max-w-2xl mx-auto leading-relaxed">{t.heroDesc}</p>
          <div className="pt-10 space-y-8">
            <button className="px-14 py-6 bg-white text-black text-[10px] uppercase tracking-[0.5em] font-bold hover:invert transition-all rounded-sm">{t.cta}</button>
            <div className="flex justify-center gap-12 opacity-20 grayscale filter brightness-200">
              {partners.slice(0,3).map(p => <span key={p} className="font-display font-bold text-[10px] tracking-widest">{p}</span>)}
            </div>
          </div>
        </motion.section>

        {/* PROOF */}
        <BeforeAfter t={t} />

        {/* WORKFLOW */}
        <section className="py-40 border-t border-white/5">
          <h2 className="text-6xl font-display font-light uppercase tracking-tighter italic text-center mb-32">{t.stepTitle}</h2>
          <div className="grid md:grid-cols-3 gap-1">
            {[t.step1, t.step2, t.step3].map((step, i) => (
              <div key={i} className="p-16 border border-white/5 bg-zinc-950/20 space-y-8 group hover:bg-white/5 transition-colors">
                <div className="text-5xl font-display font-black text-white/5 group-hover:text-cyan-500/20 transition-colors">0{i+1}</div>
                <h3 className="text-xl uppercase tracking-widest italic leading-tight">{step}</h3>
                <div className="h-[1px] w-12 bg-white/20 group-hover:w-full transition-all duration-700"></div>
              </div>
            ))}
          </div>
        </section>

        {/* ECONOMICS */}
        <ROICalculator t={t} />

        {/* FAQ */}
        <section className="py-40 border-t border-white/5 grid lg:grid-cols-2 gap-20">
          <h2 className="text-5xl font-display font-light uppercase tracking-tighter italic">{t.faqTitle}</h2>
          <div className="space-y-16">
            {[
              { q: t.faq1Q, a: t.faq1A },
              { q: t.faq2Q, a: t.faq2A }
            ].map((f, i) => (
              <div key={i} className="space-y-4">
                <h4 className="text-xl font-light text-white italic">{f.q}</h4>
                <p className="text-gray-500 font-light leading-relaxed max-w-md">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-60 flex justify-center border-t border-white/5">
          <div className="max-w-2xl w-full text-center space-y-20">
            <div className="space-y-6">
              <h2 className="text-6xl md:text-8xl font-display font-light tracking-tighter uppercase italic text-gradient">V3000 Core</h2>
              <p className="text-gray-500 text-sm font-light tracking-widest uppercase">Зарезервируйте слот на февраль 2026</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="grid gap-4">
                <input type="text" placeholder="Name" required value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} className="bg-transparent border-b border-white/5 py-6 text-center text-2xl font-light outline-none focus:border-white transition-colors" />
                <input type="text" placeholder="Company" required value={formData.company} onChange={e=>setFormData({...formData, company:e.target.value})} className="bg-transparent border-b border-white/5 py-6 text-center text-2xl font-light outline-none focus:border-white transition-colors" />
                <input type="email" placeholder="Email" required value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})} className="bg-transparent border-b border-white/5 py-6 text-center text-2xl font-light outline-none focus:border-white transition-colors" />
              </div>
              <button className="px-16 py-8 bg-white text-black text-[10px] uppercase tracking-[0.6em] font-bold hover:invert transition-all">{t.cta}</button>
              <AnimatePresence>{status && <motion.p initial={{opacity:0}} animate={{opacity:1}} className="font-mono text-[9px] tracking-widest text-cyan-500 uppercase animate-pulse">{status}</motion.p>}</AnimatePresence>
            </form>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 text-center opacity-20 font-mono text-[7px] tracking-[1em]">© 2026 V3000 NEURAL ARCHITECTURES</footer>
    </div>
  );
}

export default App;
