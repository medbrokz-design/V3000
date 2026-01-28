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
    faqTitle: "Вопросы и ответы",
    faq1Q: "Это выглядит реалистично?",
    faq1A: "Да, наш софт управляет физикой света и текстурой кожи на уровне 8K.",
    faq2Q: "Кому принадлежат права?",
    faq2A: "Все права на контент полностью переходят вам по договору.",
    statusSuccess: "ПРИНЯТО. ОЖИДАЙТЕ ЗВОНКА.",
    statusError: "ОШИБКА СЕТИ."
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
      const res = await fetch('/api/contact', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(formData) 
      });
      const data = await res.json();
      if (data.success) { 
        setStatus(t.statusSuccess); 
        setFormData({ name: '', email: '', company: '' }); 
      }
    } catch (e) { setStatus(t.statusError); }
  };

  return (
    <div className="bg-black text-white antialiased selection:bg-white selection:text-black font-sans">
      <AnimatePresence>{loading && (
        <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center">
          <div className="w-12 h-[1px] bg-white/20 relative overflow-hidden">
            <motion.div animate={{ left: ["-100%", "100%"] }} transition={{ duration: 1, repeat: Infinity }} className="absolute inset-0 bg-white" />
          </div>
        </motion.div>
      )}</AnimatePresence>

      <nav className="fixed top-0 left-0 w-full z-[100] px-10 py-10 flex justify-between items-center mix-blend-difference">
        <div className="font-display font-bold text-xl tracking-tighter italic">V3000</div>
        <button onClick={() => setLang(lang==='ru'?'en':'ru')} className="font-mono text-[9px] border border-white/10 px-4 py-1 rounded-full uppercase hover:bg-white hover:text-black transition-all">{lang}</button>
      </nav>

      <main className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <motion.section style={{ opacity: heroOpacity }} className="h-screen flex flex-col justify-center items-center text-center space-y-10">
          <span className="uppercase tracking-[0.6em] font-mono text-[10px] text-cyan-500">{t.heroSub}</span>
          <h1 className="text-[12vw] font-display font-light tracking-tighter leading-[0.9] text-gradient">{t.heroTitle}</h1>
          <p className="text-lg font-light text-gray-400 max-w-xl mx-auto leading-relaxed">{t.heroDesc}</p>
          <button className="px-12 py-6 bg-white text-black text-[10px] uppercase tracking-[0.4em] font-bold hover:invert transition-all">{t.cta}</button>
        </motion.section>

        {/* Partners Bar */}
        <div className="py-20 border-y border-white/5 flex justify-between items-center opacity-30 grayscale filter">
          {partners.map(p => <span key={p} className="font-display font-bold text-xs tracking-widest">{p}</span>)}
        </div>

        {/* Workflow */}
        <section className="py-40 space-y-32">
          <h2 className="text-5xl font-display font-light uppercase tracking-tighter italic text-center">{t.stepTitle}</h2>
          <div className="grid md:grid-cols-3 gap-20">
            {[t.step1, t.step2, t.step3].map((step, i) => (
              <div key={i} className="space-y-6">
                <div className="text-6xl font-display font-black text-white/5">0{i+1}</div>
                <h3 className="text-xl uppercase tracking-widest italic">{step}</h3>
                <div className="h-[1px] w-12 bg-cyan-500"></div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-40 border-t border-white/5 grid md:grid-cols-2 gap-20">
          <h2 className="text-5xl font-display font-light uppercase tracking-tighter italic">{t.faqTitle}</h2>
          <div className="space-y-12">
            {[
              { q: t.faq1Q, a: t.faq1A },
              { q: t.faq2Q, a: t.faq2A }
            ].map((f, i) => (
              <div key={i} className="space-y-4">
                <h4 className="text-lg font-medium text-white">{f.q}</h4>
                <p className="text-sm text-gray-500 font-light leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final Conversion Form */}
        <section className="py-60 flex justify-center border-t border-white/5">
          <div className="max-w-xl w-full text-center space-y-20">
            <div className="space-y-6">
              <h2 className="text-5xl font-display font-light tracking-tighter uppercase italic">{lang==='ru'?'Запросить Аудит':'Request Audit'}</h2>
              <p className="text-gray-500 text-sm font-light">Получите расчет выгоды для вашего бренда за 24 часа.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid gap-6">
                <input type="text" placeholder="Name" required value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} className="bg-transparent border-b border-white/10 py-4 text-center outline-none focus:border-white transition-colors" />
                <input type="text" placeholder="Company" required value={formData.company} onChange={e=>setFormData({...formData, company:e.target.value})} className="bg-transparent border-b border-white/10 py-4 text-center outline-none focus:border-white transition-colors" />
                <input type="email" placeholder="Work Email" required value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})} className="bg-transparent border-b border-white/10 py-4 text-center outline-none focus:border-white transition-colors" />
              </div>
              <button className="px-12 py-6 border border-white/20 text-[10px] uppercase tracking-[0.6em] hover:bg-white hover:text-black transition-all">{t.cta}</button>
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