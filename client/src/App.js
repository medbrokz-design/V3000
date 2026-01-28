import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

const translations = {
  ru: {
    heroTitle: "Замените продакшн",
    heroSub: "Протокол V3000",
    heroDesc: "Мировой уровень визуального контента без съемок, моделей и студий. В 10 раз быстрее, в 5 раз дешевле.",
    cta: "ЗАПРОСИТЬ АУДИТ",
    capabilitiesTitle: "Технологии",
    engineTitle: "Вычислительное Ядро",
    stepTitle: "Алгоритм внедрения",
    roiTitle: "Экономика",
    legalTitle: "Юридическая чистота",
    statusSuccess: "ПРИНЯТО.",
    statusError: "ОШИБКА."
  },
  en: {
    heroTitle: "Replace Production",
    heroSub: "V3000 Protocol",
    heroDesc: "World-class visual content without shoots, models, or studios. 10x faster, 5x cheaper.",
    cta: "REQUEST AUDIT",
    capabilitiesTitle: "Capabilities",
    engineTitle: "Compute Engine",
    stepTitle: "The Algorithm",
    roiTitle: "Economics",
    legalTitle: "AI Ethics & Legal",
    statusSuccess: "ACCEPTED.",
    statusError: "ERROR."
  }
};

const engineTech = [
  { t: "Cluster H100", d: "Пиковая мощность для рендеринга 8K видео." },
  { t: "Custom LoRA", d: "Уникальные веса под ваш брендбук." },
  { t: "Nano Banana Core", d: "Собственная архитектура управления промптами." },
  { t: "Zero-Latency API", d: "Мгновенная интеграция в ваш софт." }
];

const LegalBlock = ({ lang }) => (
  <section className="py-40 border-t border-white/5 opacity-40 hover:opacity-100 transition-opacity duration-700">
    <div className="grid md:grid-cols-3 gap-10 text-[9px] font-mono uppercase tracking-[0.3em]">
      <div className="space-y-4">
        <h4 className="text-white font-bold">Ownership</h4>
        <p>{lang === 'ru' ? '100% прав на контент принадлежат заказчику' : '100% IP rights transferred to client'}</p>
      </div>
      <div className="space-y-4">
        <h4 className="text-white font-bold">Safety</h4>
        <p>{lang === 'ru' ? 'Защита от дипфейков и несанкционированного доступа' : 'Deepfake protection and secure access'}</p>
      </div>
      <div className="space-y-4">
        <h4 className="text-white font-bold">Ethics</h4>
        <p>{lang === 'ru' ? 'Использование этичных наборов данных' : 'Trained on ethical datasets only'}</p>
      </div>
    </div>
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
      <div ref={containerRef} className="relative aspect-[21/9] w-full overflow-hidden border border-white/5 cursor-col-resize group">
        <div className="absolute inset-0 grayscale"><img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-40" alt="B" /></div>
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}><img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="A" /></div>
        <div className="absolute inset-y-0 w-[1px] bg-cyan-500 z-10" style={{ left: `${sliderPos}%` }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-cyan-500/20 backdrop-blur-3xl flex items-center justify-center text-[8px] text-cyan-500 tracking-tighter">RENDER</div>
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
          <div className="w-8 h-[1px] bg-white/20 relative overflow-hidden"><motion.div animate={{ left: ["-100%", "100%"] }} transition={{ duration: 1, repeat: Infinity }} className="absolute inset-0 bg-white" /></div>
        </motion.div>
      )}</AnimatePresence>

      <nav className="fixed top-0 left-0 w-full z-[100] px-10 py-10 flex justify-between items-start mix-blend-difference">
        <div className="font-display font-bold text-xl tracking-tighter italic">V3000</div>
        <button onClick={() => setLang(lang==='ru'?'en':'ru')} className="font-mono text-[9px] border border-white/10 px-4 py-1 rounded-full uppercase hover:bg-white hover:text-black transition-all">{lang}</button>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-20">
        {/* HERO */}
        <motion.section style={{ opacity: heroOpacity }} className="h-screen flex flex-col justify-center items-center text-center space-y-12">
          <span className="uppercase tracking-[0.6em] font-mono text-[9px] text-cyan-500 italic">{t.heroSub}</span>
          <h1 className="text-[14vw] md:text-[11vw] font-display font-light tracking-tighter leading-[0.85] text-gradient">{t.heroTitle}</h1>
          <p className="text-lg md:text-xl font-light text-gray-400 max-w-xl mx-auto leading-relaxed">{t.heroDesc}</p>
          <button className="px-14 py-6 bg-white text-black text-[9px] uppercase tracking-[0.5em] font-bold hover:invert transition-all rounded-sm">{t.cta}</button>
        </motion.section>

        {/* ENGINE TECH */}
        <section className="py-40 border-t border-white/5">
          <h2 className="text-5xl font-display font-light uppercase tracking-tighter italic mb-24 text-center">{t.engineTitle}</h2>
          <div className="grid md:grid-cols-4 gap-1">
            {engineTech.map((tech, i) => (
              <div key={i} className="p-10 border border-white/5 bg-zinc-950/20 group hover:bg-white/5 transition-colors">
                <div className="text-gray-600 font-mono text-[8px] mb-6 uppercase tracking-widest">Core Module // 0{i+1}</div>
                <h3 className="text-lg font-bold uppercase italic mb-4 group-hover:text-cyan-500 transition-colors">{tech.t}</h3>
                <p className="text-[10px] text-gray-500 font-light leading-relaxed">{tech.d}</p>
              </div>
            ))}
          </div>
        </section>

        <BeforeAfter t={t} />

        {/* WORKFLOW */}
        <section className="py-40 border-t border-white/5">
          <h2 className="text-6xl font-display font-light uppercase tracking-tighter italic text-center mb-32">{t.stepTitle}</h2>
          <div className="grid md:grid-cols-3 gap-px bg-white/5">
            {["Audit", "Neural Synthesis", "Delivery"].map((step, i) => (
              <div key={i} className="p-16 bg-black space-y-8 group hover:bg-zinc-950 transition-colors">
                <div className="text-5xl font-display font-black text-white/5">0{i+1}</div>
                <h3 className="text-xl uppercase tracking-widest italic leading-tight">{step}</h3>
                <p className="text-[10px] text-gray-600 font-light uppercase tracking-widest">Phase Operational</p>
              </div>
            ))}
          </div>
        </section>

        <LegalBlock lang={lang} />

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
              <button className="px-16 py-8 bg-white text-black text-[9px] uppercase tracking-[0.6em] font-bold hover:invert transition-all">{t.cta}</button>
              <AnimatePresence>{status && <motion.p initial={{opacity:0}} animate={{opacity:1}} className="font-mono text-[9px] tracking-widest text-cyan-500 uppercase animate-pulse pt-4">{status}</motion.p>}</AnimatePresence>
            </form>
          </div>
        </section>
      </main>

      <div className="py-10 border-t border-white/5 overflow-hidden whitespace-nowrap opacity-10">
        <div className="flex gap-20 animate-marquee font-mono text-[8px] uppercase tracking-[1em]">
          <span>Artificial Intelligence</span> <span>Neural Production</span> <span>V3000 Engine</span> <span>Nano Banana Protocol</span> <span>Dr. Heisenberg Logic</span>
        </div>
      </div>

      <footer className="py-20 border-t border-white/5 text-center opacity-20 font-mono text-[7px] tracking-[1em]">© 2026 V3000 NEURAL ARCHITECTURES</footer>
    </div>
  );
}

export default App;
