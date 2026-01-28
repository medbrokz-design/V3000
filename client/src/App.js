import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const translations = {
  ru: {
    heroTag: "Будущее Медиа",
    heroTitle: "Neural",
    heroTitleSub: "Production",
    heroDesc: "Проектируем рекламные реальности, используя стратегическое ядро Nano Banana. Мы меняем физику вашего маркетинга.",
    heroBtn: "ЗАПУСТИТЬ ПРОЕКТ",
    slots: "2 Слота свободны",
    servicesTitle: "Инструменты",
    servicesSub: "Operational Modules",
    roiTitle: "Экономика Будущего",
    roiSub: "Рассчитайте преимущество протокола V3000",
    roiLabel: "Бюджет на контент",
    roiSavings: "Ваша чистая выгода",
    roiSpeed: "Ускорение циклов",
    portfolioTitle: "Архив Реальностей",
    contactTitle: "Запрос Доступа",
    contactBtn: "ОТПРАВИТЬ В ЯДРО",
    formName: "Ваше Имя",
    formEmail: "Email",
    formMsg: "Neural Directives",
    statusSuccess: "ПРОТОКОЛ ПРИНЯТ.",
    statusError: "ОШИБКА КАНАЛА."
  },
  en: {
    heroTag: "The Future of Media",
    heroTitle: "Neural",
    heroTitleSub: "Production",
    heroDesc: "Designing advertising realities using Nano Banana strategic core. We change the physics of your marketing.",
    heroBtn: "START PROJECT",
    slots: "2 Slots available",
    servicesTitle: "Modules",
    servicesSub: "Operational Modules",
    roiTitle: "Future Economics",
    roiSub: "Calculate V3000 Protocol Advantage",
    roiLabel: "Content Budget",
    roiSavings: "Your Net Benefit",
    roiSpeed: "Cycle Acceleration",
    portfolioTitle: "Reality Archive",
    contactTitle: "Request Access",
    contactBtn: "SEND TO CORE",
    formName: "Your Name",
    formEmail: "Email",
    formMsg: "Neural Directives",
    statusSuccess: "PROTOCOL ACCEPTED.",
    statusError: "CHANNEL ERROR."
  }
};

const services = [
  {
    ru: { title: "Цифровое Бессмертие", desc: "Создаем цифровых двойников с 100% консистентностью. Ваш амбассадор не стареет." },
    en: { title: "Brand Immortality", desc: "Digital twins with 100% consistency. Your ambassador never ages." },
    id: "DNA", icon: "🧬"
  },
  {
    ru: { title: "Бесконечный Контент", desc: "Производство визуалов уровня Vogue за секунды. Без логистики и аренды студий." },
    en: { title: "Infinite Content", desc: "Vogue-level visuals in seconds. No logistics or studio rent." },
    id: "ICE", icon: "⚡"
  },
  {
    ru: { title: "Логика Доминирования", desc: "Внедрение ИИ-агентов Dr. Heisenberg в бизнес-процессы вашего маркетинга." },
    en: { title: "Market Disruption", desc: "Injecting Dr. Heisenberg AI agents into your business processes." },
    id: "MDL", icon: "🧠"
  },
  {
    ru: { title: "Гипер-Реальный E-com", desc: "Мгновенная примерка на нейро-моделях. Снижение возвратов и рост конверсии." },
    en: { title: "Hyper-Real E-com", desc: "Instant AI try-on. Reduced returns and increased conversion." },
    id: "ECOM", icon: "🧥"
  }
];

const portfolio = [
  { t: "LINA V4.0", d: "Digital Human for Luxury Brand", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80" },
  { t: "ACTOBE 2026", d: "Cyberpunk Atmosphere Concept", img: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=800&q=80" },
  { t: "WATCH CORE", d: "Hyper-realistic Product Visuals", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80" }
];

const TextScramble = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  useEffect(() => {
    let frame = 0;
    const timer = setInterval(() => {
      const scrambled = text.split('').map(char => char === ' ' ? ' ' : '!<>-_/[]{}?#________'[Math.floor(Math.random() * 10)]).join('');
      setDisplayText(scrambled);
      if (frame++ > 5) { setDisplayText(text); clearInterval(timer); }
    }, 80);
    return () => clearInterval(timer);
  }, [text]);
  return <span>{displayText}</span>;
};

const Terminal = () => {
  const [logs, setLogs] = useState([]);
  const messages = ["[SYSTEM] V3000 Init...", "[NEURAL] Sensory Link...", "[GEO] Region: Global", "[DATA] Nano Banana v6.2", "[AUTH] Verified"];
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLogs(prev => [...prev.slice(-3), messages[i % messages.length]]);
      i++;
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="glass p-3 font-mono text-[9px] text-cyan-400 rounded-sm opacity-50">
      {logs.map((log, i) => <div key={i} className="mb-1">[{new Date().toLocaleTimeString()}] {log}</div>)}
    </div>
  );
};

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [h, setH] = useState(false);
  useEffect(() => {
    const m = (e) => setPos({ x: e.clientX, y: e.clientY });
    const o = (e) => setH(!!e.target.closest('button, input, a, select, textarea'));
    window.addEventListener('mousemove', m);
    window.addEventListener('mouseover', o);
    return () => { window.removeEventListener('mousemove', m); window.removeEventListener('mouseover', o); };
  }, []);
  return (
    <>
      <motion.div className="fixed top-0 left-0 w-4 h-4 bg-cyan-500 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block" animate={{ x: pos.x-8, y: pos.y-8, scale: h?2.5:1 }} transition={{ type:"spring", damping:30, stiffness:400, mass:0.2 }} />
      <motion.div className="fixed top-0 left-0 w-10 h-10 border border-cyan-500/30 rounded-full pointer-events-none z-[9998] hidden md:block" animate={{ x: pos.x-20, y: pos.y-20, scale: h?1.5:1 }} transition={{ type:"spring", damping:40, stiffness:300, mass:0.5 }} />
    </>
  );
};

function App() {
  const [lang, setLang] = useState('ru');
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
  const [status, setStatus] = useState('');
  const t = translations[lang];
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('...');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      const data = await res.json();
      if (data.success) { setStatus(t.statusSuccess); setFormData({ name: '', email: '', service: '', message: '' }); }
    } catch (e) { setStatus(t.statusError); }
  };

  return (
    <div className="bg-black text-white font-sans selection:bg-cyan-500 cursor-none" ref={containerRef}>
      <CustomCursor />
      
      {/* Top Bar / Lang Switch */}
      <div className="fixed top-8 left-8 z-[100] flex gap-4">
        <button onClick={() => setLang('ru')} className={`font-mono text-[10px] tracking-widest ${lang==='ru'?'text-cyan-500':'text-gray-600'}`}>RU</button>
        <button onClick={() => setLang('en')} className={`font-mono text-[10px] tracking-widest ${lang==='en'?'text-cyan-500':'text-gray-600'}`}>EN</button>
      </div>

      <div className="fixed top-8 right-8 z-50 hidden lg:block w-64">
        <Terminal />
      </div>

      <header className="relative min-h-screen flex flex-col justify-center px-6 max-w-7xl mx-auto">
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 flex items-center justify-center -z-10">
          <div className="w-[600px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full"></div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-cyan-500"></div>
            <span className="font-mono text-[10px] text-cyan-500 tracking-[0.4em] uppercase">{t.heroTag}</span>
          </div>
          <h1 className="text-[14vw] lg:text-[10vw] font-display font-black leading-[0.8] tracking-tighter mb-12 uppercase italic">
            <TextScramble text={t.heroTitle} /><br/>
            <span className="text-transparent stroke-text px-2">{t.heroTitleSub}</span>
          </h1>
          <div className="grid md:grid-cols-2 gap-12 items-end">
            <p className="text-xl text-gray-400 font-light leading-relaxed max-w-md">{t.heroDesc}</p>
            <div className="flex flex-col items-start gap-6">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white text-black px-10 py-5 font-display font-bold uppercase tracking-widest hover:bg-cyan-500 transition-colors">
                {t.heroBtn}
              </motion.button>
              <span className="font-mono text-[9px] text-gray-600 uppercase tracking-widest">[+] {t.slots}</span>
            </div>
          </div>
        </motion.div>
      </header>

      <main className="max-w-7xl mx-auto px-6">
        {/* Portfolio Gallery */}
        <section className="py-40 border-t border-white/5">
          <h2 className="text-5xl font-display font-bold uppercase tracking-tighter italic mb-20">{t.portfolioTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {portfolio.map((p, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="group relative aspect-[3/4] overflow-hidden bg-zinc-900 border border-white/5">
                <img src={p.img} alt={p.t} className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-all duration-700 grayscale group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                <div className="absolute bottom-8 left-8">
                  <div className="text-[10px] font-mono text-cyan-500 mb-2">Project 0{i+1}</div>
                  <h4 className="text-xl font-bold uppercase italic tracking-tighter">{p.t}</h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">{p.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="py-40">
          <div className="grid md:grid-cols-2 gap-1">
            {services.map((s, i) => (
              <div key={i} className="group p-12 bg-zinc-950/30 border border-white/5 hover:border-cyan-500/50 transition-all duration-500">
                <div className="text-5xl mb-8 opacity-20 group-hover:opacity-100 transition-opacity">{s.icon}</div>
                <h3 className="text-3xl font-display font-bold mb-4 uppercase italic">{s[lang].title}</h3>
                <p className="text-gray-500 text-lg font-light leading-relaxed">{s[lang].desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="py-40 border-t border-white/5 max-w-2xl">
          <h2 className="text-5xl font-display font-bold uppercase tracking-tighter italic mb-16">{t.contactTitle}</h2>
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid md:grid-cols-2 gap-10">
              <input type="text" placeholder={t.formName} className="w-full bg-transparent border-b border-white/10 p-2 outline-none focus:border-cyan-500 transition-colors" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              <input type="email" placeholder={t.formEmail} className="w-full bg-transparent border-b border-white/10 p-2 outline-none focus:border-cyan-500 transition-colors" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
            </div>
            <textarea placeholder={t.formMsg} className="w-full bg-transparent border-b border-white/10 p-2 outline-none focus:border-cyan-500 transition-colors h-32 resize-none" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-6 border border-white font-display font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all">
              {t.contactBtn}
            </motion.button>
            <AnimatePresence>{status && <motion.p initial={{opacity:0}} animate={{opacity:1}} className="text-center font-mono text-[10px] text-cyan-500 animate-pulse">{status}</motion.p>}</AnimatePresence>
          </form>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 text-center opacity-30 font-mono text-[8px] tracking-[1em] uppercase">
        © 2026 V3000 // SECURED BY BRAIN AI
      </footer>

      <style>{`
        .stroke-text { -webkit-text-stroke: 1px rgba(255,255,255,0.2); }
        .group:hover .stroke-text { -webkit-text-stroke: 1px #06b6d4; }
      `}</style>
    </div>
  );
}

export default App;