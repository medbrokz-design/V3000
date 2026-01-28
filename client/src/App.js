import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

const translations = {
  ru: {
    heroTitle: "Совершенство",
    heroSub: "Нейросетевого продакшена",
    heroDesc: "Создаем будущее медиа через призму эссенциализма. Технологии V3000, интегрированные в ваш бренд.",
    cta: "Начать работу",
    compareTitle: "Контроль реальности",
    compareSub: "Обычный продакшн vs Протокол V3000",
    roiTitle: "Эффективность",
    roiLabel: "Месячный бюджет",
    statusSuccess: "ПРИНЯТО.",
    statusError: "ОШИБКА."
  },
  en: {
    heroTitle: "Perfection",
    heroSub: "Of Neural Production",
    heroDesc: "Designing the future of media through the lens of essentialism. V3000 technologies, seamlessly integrated.",
    cta: "Get Started",
    compareTitle: "Reality Control",
    compareSub: "Standard Production vs V3000 Protocol",
    roiTitle: "Efficiency",
    roiLabel: "Monthly Budget",
    statusSuccess: "ACCEPTED.",
    statusError: "ERROR."
  }
};

const BeforeAfter = ({ t }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX || e.touches[0].clientX) - rect.left) / rect.width * 100;
    setSliderPos(Math.max(0, Math.min(100, x)));
  };

  return (
    <div className="my-40 space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-display font-light uppercase tracking-tighter">{t.compareTitle}</h2>
        <p className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.3em]">{t.compareSub}</p>
      </div>
      <div 
        ref={containerRef}
        className="relative aspect-video w-full overflow-hidden bg-zinc-900 cursor-col-resize"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      >
        <div className="absolute inset-0 grayscale">
          <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-40" alt="Before" />
          <div className="absolute top-4 left-4 text-[10px] font-mono text-white/50 uppercase">Standard</div>
        </div>
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="After" />
          <div className="absolute top-4 right-4 text-[10px] font-mono text-cyan-500 uppercase text-right" style={{ width: '1000px' }}>V3000 Neural</div>
        </div>
        <div className="absolute inset-y-0 w-[1px] bg-white z-10" style={{ left: `${sliderPos}%` }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white backdrop-blur-md flex items-center justify-center text-[10px]">↔</div>
        </div>
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
    <motion.div 
      className="fixed top-0 left-0 w-6 h-6 border border-white/20 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
    />
  );
};

function App() {
  const [lang, setLang] = useState('ru');
  const [loading, setLoading] = useState(true);
  const t = translations[lang];
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <div className="bg-black text-white antialiased selection:bg-white selection:text-black cursor-none overflow-x-hidden">
      <AnimatePresence>
        {loading && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center space-y-6"
          >
            <div className="w-12 h-[1px] bg-white/20 relative overflow-hidden">
              <motion.div 
                initial={{ left: "-100%" }} animate={{ left: "100%" }} transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 bg-white"
              />
            </div>
            <div className="font-mono text-[8px] uppercase tracking-[0.5em] opacity-40">Initializing V3000 Core</div>
          </motion.div>
        )}
      </AnimatePresence>

      <CustomCursor />
      
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 md:px-10 py-8 flex justify-between items-center mix-blend-difference">
        <div className="font-display font-bold text-xl tracking-tighter">V3000</div>
        <button onClick={() => setLang(lang==='ru'?'en':'ru')} className="font-mono text-[9px] border border-white/10 px-4 py-1 rounded-full hover:bg-white hover:text-black transition-all uppercase">
          {lang}
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-6">
        <motion.section style={{ opacity: heroOpacity }} className="h-screen flex flex-col justify-center items-center text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <span className="text-[10px] uppercase tracking-[0.6em] opacity-30">{t.heroSub}</span>
            <h1 className="text-[16vw] md:text-[10vw] font-display font-light tracking-tighter leading-none text-gradient">{t.heroTitle}</h1>
            <p className="text-sm md:text-lg font-light text-gray-500 max-w-xl mx-auto leading-relaxed">{t.heroDesc}</p>
            <div className="pt-10">
              <button className="px-10 py-4 border border-white/20 text-[10px] uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all">{t.cta}</button>
            </div>
          </motion.div>
        </motion.section>

        <BeforeAfter t={t} />

        <section id="work" className="py-40 grid md:grid-cols-2 gap-10">
          <div className="space-y-10">
            <div className="aspect-[4/5] bg-zinc-900 overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105" alt="Work" />
            </div>
            <div className="space-y-2">
              <div className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">Case 01 // Digital ID</div>
              <h3 className="text-2xl font-light italic uppercase">LINA V4.0</h3>
            </div>
          </div>
          <div className="space-y-10 md:mt-40">
            <div className="aspect-[4/5] bg-zinc-900 overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=2564&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105" alt="Work" />
            </div>
            <div className="space-y-2">
              <div className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">Case 02 // Environment</div>
              <h3 className="text-2xl font-light italic uppercase">Neon Soul</h3>
            </div>
          </div>
        </section>

        <section className="py-60 flex justify-center">
          <div className="max-w-xl w-full text-center space-y-16">
            <h2 className="text-4xl md:text-6xl font-display font-light tracking-tighter leading-none">
              {lang==='ru'?'Трансформируйте медиа-активы':'Transform your media assets'}
            </h2>
            <form className="space-y-10">
              <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-light outline-none focus:border-white transition-colors text-center" />
              <button className="text-[10px] uppercase tracking-[0.5em] opacity-40 hover:opacity-100 transition-all">{t.cta} —→</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 text-center px-10">
        <p className="text-[8px] font-mono tracking-[1em] opacity-20 uppercase">© 2026 V3000 NEURAL ARCHITECTURES</p>
      </footer>
    </div>
  );
}

export default App;