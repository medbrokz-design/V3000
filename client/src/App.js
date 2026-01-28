import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

const translations = {
  ru: {
    heroTitle: "Совершенство",
    heroSub: "Нейросетевого продакшена",
    heroDesc: "Создаем будущее медиа через призму эссенциализма. Технологии V3000, интегрированные в ваш бренд.",
    cta: "Начать работу",
    navWork: "Работы",
    navServices: "Модули",
    navContact: "Связь",
    footer: "Разработано с вниманием к каждой детали."
  },
  en: {
    heroTitle: "Perfection",
    heroSub: "Of Neural Production",
    heroDesc: "Designing the future of media through the lens of essentialism. V3000 technologies, seamlessly integrated.",
    cta: "Get Started",
    navWork: "Work",
    navServices: "Modules",
    navContact: "Contact",
    footer: "Designed with obsession over every detail."
  }
};

const services = [
  { id: "01", t: { ru: "Цифровой ДНК", en: "Digital DNA" }, d: { ru: "Абсолютная консистентность лиц и стилей.", en: "Absolute consistency of faces and styles." } },
  { id: "02", t: { ru: "Синтез Света", en: "Light Synthesis" }, d: { ru: "Кинематографичный рендеринг без камер.", en: "Cinematic rendering without cameras." } },
  { id: "03", t: { ru: "Интеллект", en: "Intelligence" }, d: { ru: "Автономные системы управления контентом.", en: "Autonomous content management systems." } }
];

const Navbar = ({ lang, setLang, t }) => (
  <motion.nav 
    initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
    className="fixed top-0 left-0 w-full z-[100] px-10 py-8 flex justify-between items-center mix-blend-difference"
  >
    <div className="font-display font-bold text-xl tracking-tighter">V3000</div>
    <div className="flex gap-12 text-[10px] uppercase tracking-[0.2em] font-medium opacity-60">
      <a href="#work" className="hover:opacity-100 transition-opacity cursor-pointer">{t.navWork}</a>
      <a href="#services" className="hover:opacity-100 transition-opacity cursor-pointer">{t.navServices}</a>
      <a href="#contact" className="hover:opacity-100 transition-opacity cursor-pointer">{t.navContact}</a>
    </div>
    <button 
      onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
      className="font-mono text-[9px] border border-white/20 px-3 py-1 rounded-full hover:bg-white hover:text-black transition-all"
    >
      {lang.toUpperCase()}
    </button>
  </motion.nav>
);

const CustomCursor = () => {
  const mouseX = useSpring(0, { damping: 20, stiffness: 200 });
  const mouseY = useSpring(0, { damping: 20, stiffness: 200 });

  useEffect(() => {
    const m = (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener('mousemove', m);
    return () => window.removeEventListener('mousemove', m);
  }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 w-6 h-6 border border-white/30 rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
    />
  );
};

function App() {
  const [lang, setLang] = useState('ru');
  const t = translations[lang];
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="bg-black text-white antialiased selection:bg-white selection:text-black cursor-none">
      <CustomCursor />
      <Navbar lang={lang} setLang={setLang} t={t} />

      {/* Hero: Minimalist Grandeur */}
      <motion.section 
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative h-screen flex flex-col items-center justify-center text-center px-6"
      >
        <div className="max-w-5xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[0.5em] opacity-40 mb-4"
          >
            {t.heroSub}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-9xl font-display font-light tracking-tight text-gradient"
          >
            {t.heroTitle}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 0.5 }}
            className="text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed tracking-wide"
          >
            {t.heroDesc}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="pt-10">
            <button className="px-12 py-5 bg-white text-black text-xs uppercase tracking-[0.3em] font-bold hover:bg-zinc-200 transition-all rounded-sm">
              {t.cta}
            </button>
          </motion.div>
        </div>
        
        {/* Ambient background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black"></div>
        </div>
      </motion.section>

      {/* Portfolio Grid: Art Gallery Style */}
      <section id="work" className="py-40 px-10 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="relative aspect-[4/5] overflow-hidden bg-zinc-900 group"
          >
            <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 animate-slow-pan" alt="V3000 Art" />
            <div className="absolute bottom-10 left-10 space-y-2">
              <div className="text-[10px] uppercase tracking-widest opacity-50">Identity</div>
              <h3 className="text-3xl font-light italic">LINA V4.0</h3>
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="relative aspect-[4/5] overflow-hidden bg-zinc-900 group md:mt-40"
          >
            <img src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=2564&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 animate-slow-pan" alt="V3000 Art" />
            <div className="absolute bottom-10 left-10 space-y-2">
              <div className="text-[10px] uppercase tracking-widest opacity-50">Atmosphere</div>
              <h3 className="text-3xl font-light italic">NEON SOUL</h3>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services: The Modules */}
      <section id="services" className="py-60 border-t border-white/5 bg-zinc-950/20">
        <div className="max-w-7xl mx-auto px-10">
          <div className="grid md:grid-cols-3 gap-24">
            {services.map((s) => (
              <motion.div 
                key={s.id} 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="text-4xl font-display font-extralight opacity-20">{s.id}</div>
                <h3 className="text-2xl font-light uppercase tracking-widest">{s.t[lang]}</h3>
                <p className="text-sm font-light text-gray-500 leading-relaxed tracking-wide">{s.d[lang]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact: Pure Focus */}
      <section id="contact" className="py-60 px-10 flex justify-center">
        <div className="max-w-xl w-full text-center space-y-20">
          <h2 className="text-5xl md:text-7xl font-display font-light tracking-tighter">
            {lang === 'ru' ? 'Готовы к трансформации?' : 'Ready for transformation?'}
          </h2>
          <form className="space-y-12">
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full bg-transparent border-b border-white/10 py-4 text-2xl font-light outline-none focus:border-white transition-colors text-center"
            />
            <motion.button 
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="text-[10px] uppercase tracking-[0.5em] opacity-50 hover:opacity-100 transition-opacity"
            >
              {t.cta} —→
            </motion.button>
          </form>
        </div>
      </section>

      <footer className="py-20 border-t border-white/5 text-center px-10 space-y-10">
        <div className="text-[10px] font-display font-bold tracking-tighter">V3000</div>
        <p className="text-[9px] uppercase tracking-[0.4em] opacity-20 max-w-xs mx-auto leading-loose">
          {t.footer} <br/> © 2026 NEURAL ARCHITECTURES.
        </p>
      </footer>
    </div>
  );
}

export default App;
