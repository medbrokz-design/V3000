import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

const translations = {
  ru: {
    heroTitle: "Замените продакшн",
    heroSub: "Протокол V3000",
    heroDesc: "Забудьте о гонорарах моделям, аренде студий и месяцах ретуши. Создаем рекламный контент мирового уровня за 48 часов с помощью ИИ.",
    cta: "ЗАПРОСИТЬ ДОСТУП",
    trustGen: "140M+ Генераций",
    trustCost: "-90% Расходов",
    trustSpeed: "x10 Скорость",
    problemTitle: "Почему старый метод умирает?",
    problemDesc: "Классический продакшн — это медленно, дорого и непредсказуемо. V3000 дает вам полный контроль над реальностью.",
    compareTitle: "Контроль результата",
    roiTitle: "Ваша экономия",
    roiLabel: "Текущий бюджет на контент",
    statusSuccess: "ПРОТОКОЛ ПРИНЯТ. ОЖИДАЙТЕ.",
    statusError: "ОШИБКА СВЯЗИ."
  },
  en: {
    heroTitle: "Replace Production",
    heroSub: "V3000 Protocol",
    heroDesc: "Forget model fees, studio rentals, and months of retouching. Create world-class advertising content in 48 hours using AI.",
    cta: "REQUEST ACCESS",
    trustGen: "140M+ Generations",
    trustCost: "-90% Costs",
    trustSpeed: "x10 Speed",
    problemTitle: "Why the old way is dying?",
    problemDesc: "Classic production is slow, expensive, and unpredictable. V3000 gives you total control over reality.",
    compareTitle: "Result Control",
    roiTitle: "Your Savings",
    roiLabel: "Current Content Budget",
    statusSuccess: "PROTOCOL ACCEPTED.",
    statusError: "LINK ERROR."
  }
};

const services = [
  { id: "01", t: { ru: "Brand Immortality", en: "Brand Immortality" }, d: { ru: "Цифровые двойники, которые не стареют и всегда доступны.", en: "Digital twins that never age and are always available." } },
  { id: "02", t: { ru: "Light Synthesis", en: "Light Synthesis" }, d: { ru: "Сложные визуальные миры без выезда на локацию.", en: "Complex visual worlds without location scouting." } },
  { id: "03", t: { ru: "Neural E-com", en: "Neural E-com" }, d: { ru: "Примерка коллекций на нейро-моделях за 0.5 сек.", en: "Instant collection fitting on neural models." } }
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
    <div className="my-40 space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-display font-light uppercase tracking-tighter italic">{t.compareTitle}</h2>
      </div>
      <div ref={containerRef} className="relative aspect-video w-full overflow-hidden border border-white/5 cursor-col-resize" onMouseMove={handleMove} onTouchMove={handleMove}>
        <div className="absolute inset-0 grayscale"><img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-40" alt="Standard" /></div>
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}><img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="V3000" /></div>
        <div className="absolute inset-y-0 w-[1px] bg-white z-10" style={{ left: `${sliderPos}%` }}><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 backdrop-blur-xl flex items-center justify-center text-[10px]">SCAN</div></div>
      </div>
    </div>
  );
};

const ROICalculator = ({ t }) => {
  const [budget, setBudget] = useState(10000);
  return (
    <div className="py-40 border-t border-white/5">
      <div className="grid md:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <h2 className="text-5xl font-display font-light tracking-tighter uppercase italic">{t.roiTitle}</h2>
          <div className="space-y-4">
            <div className="flex justify-between font-mono text-[10px] text-gray-500 uppercase tracking-widest"><span>{t.roiLabel}</span><span>${budget.toLocaleString()}</span></div>
            <input type="range" min="2000" max="100000" step="1000" value={budget} onChange={(e) => setBudget(parseInt(e.target.value))} className="w-full h-[1px] bg-white/10 appearance-none accent-white" />
          </div>
        </div>
        <div className="p-12 bg-white/[0.02] border border-white/5 rounded-sm text-center space-y-4">
          <div className="text-7xl font-display font-bold tracking-tighter text-gradient">${(budget * 0.9).toLocaleString()}</div>
          <p className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.4em]">Ваша выгода за год</p>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [lang, setLang] = useState('ru');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '' });
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
      if (data.success) { setStatus(t.statusSuccess); setFormData({ name: '', email: '' }); }
    } catch (e) { setStatus(t.statusError); }
  };

  return (
    <div className="bg-black text-white antialiased selection:bg-white selection:text-black font-sans">
      <AnimatePresence>{loading && (
        <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center space-y-4">
          <div className="w-8 h-[1px] bg-white/20 relative overflow-hidden"><motion.div animate={{ left: ["-100%", "100%"] }} transition={{ duration: 1, repeat: Infinity }} className="absolute inset-0 bg-white" /></div>
          <div className="font-mono text-[7px] uppercase tracking-[0.8em] opacity-30">Neural Core Initializing</div>
        </motion.div>
      )}</AnimatePresence>

      <nav className="fixed top-0 left-0 w-full z-[100] px-10 py-10 flex justify-between items-center mix-blend-difference">
        <div className="font-display font-bold text-xl tracking-tighter">V3000</div>
        <button onClick={() => setLang(lang==='ru'?'en':'ru')} className="font-mono text-[9px] border border-white/10 px-4 py-1 rounded-full uppercase hover:bg-white hover:text-black transition-all">{lang}</button>
      </nav>

      <main className="max-w-7xl mx-auto px-6">
        <motion.section style={{ opacity: heroOpacity }} className="h-screen flex flex-col justify-center items-center text-center space-y-10">
          <div className="space-y-4 uppercase tracking-[0.5em] font-mono text-[10px] text-gray-500"><span>{t.heroSub}</span></div>
          <h1 className="text-[12vw] font-display font-light tracking-tighter leading-none text-gradient">{t.heroTitle}</h1>
          <p className="text-lg font-light text-gray-400 max-w-xl mx-auto leading-relaxed">{t.heroDesc}</p>
          <div className="pt-10 flex flex-col items-center gap-6">
            <button className="px-12 py-6 bg-white text-black text-[10px] uppercase tracking-[0.4em] font-bold hover:invert transition-all">{t.cta}</button>
            <div className="grid grid-cols-3 gap-10 font-mono text-[8px] text-gray-600 uppercase tracking-widest pt-10 border-t border-white/5">
              <div>{t.trustGen}</div><div>{t.trustCost}</div><div>{t.trustSpeed}</div>
            </div>
          </div>
        </motion.section>

        <BeforeAfter t={t} />

        <section className="py-40 grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <h2 className="text-5xl font-display font-light uppercase italic tracking-tighter">{t.problemTitle}</h2>
            <p className="text-xl text-gray-500 font-light leading-relaxed">{t.problemDesc}</p>
          </div>
          <div className="aspect-square bg-zinc-900 border border-white/5 relative overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80" className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-all duration-[2s]" alt="Neural" />
          </div>
        </section>

        <div className="grid md:grid-cols-3 gap-1">
          {services.map(s => (
            <div key={s.id} className="p-12 border border-white/5 bg-zinc-950/20 space-y-6 hover:bg-zinc-900/40 transition-colors">
              <div className="text-3xl font-display font-extralight opacity-20">{s.id}</div>
              <h3 className="text-xl uppercase tracking-widest">{s.t[lang]}</h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">{s.d[lang]}</p>
            </div>
          ))}
        </div>

        <ROICalculator t={t} />

        <section className="py-60 flex justify-center border-t border-white/5">
          <div className="max-w-xl w-full text-center space-y-20">
            <h2 className="text-5xl font-display font-light tracking-tighter uppercase italic">{lang==='ru'?'Стать Лидером':'Become a Leader'}</h2>
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="grid gap-8">
                <input type="text" placeholder="Name" required value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} className="bg-transparent border-b border-white/10 py-4 text-center outline-none focus:border-white transition-colors" />
                <input type="email" placeholder="Email" required value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})} className="bg-transparent border-b border-white/10 py-4 text-center outline-none focus:border-white transition-colors" />
              </div>
              <button className="text-[10px] uppercase tracking-[0.6em] opacity-40 hover:opacity-100 transition-all">{t.cta} —→</button>
              <AnimatePresence>{status && <motion.p initial={{opacity:0}} animate={{opacity:1}} className="font-mono text-[8px] tracking-widest text-cyan-500 uppercase animate-pulse">{status}</motion.p>}</AnimatePresence>
            </form>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 text-center opacity-20 font-mono text-[7px] tracking-[1em]">© 2026 V3000 NEURAL ARCHITECTURES</footer>
    </div>
  );
}

export default App;
