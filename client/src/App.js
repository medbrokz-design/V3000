import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const services = [
  {
    title: "Цифровое Бессмертие",
    id: "DNA",
    desc: "Создаем цифровых двойников с 100% консистентностью внешности. Ваш амбассадор не стареет.",
    icon: "🧬",
    color: "from-cyan-500 to-blue-600"
  },
  {
    title: "Бесконечный Контент",
    id: "ICE",
    desc: "Производство визуалов уровня Vogue за секунды. Забудьте о логистике и аренде студий.",
    icon: "⚡",
    color: "from-purple-500 to-pink-600"
  },
  {
    title: "Логика Доминирования",
    id: "MDL",
    desc: "Внедрение ИИ-агентов Dr. Heisenberg в бизнес-процессы вашего маркетинга.",
    icon: "🧠",
    color: "from-amber-500 to-orange-600"
  },
  {
    title: "Гипер-Реальный E-com",
    id: "ECOM",
    desc: "Мгновенная примерка на нейро-моделях. Снижение возвратов и рост конверсии.",
    icon: "🧥",
    color: "from-emerald-500 to-teal-600"
  }
];

const TextScramble = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = '!<>-_/[]{}?#________';
  
  useEffect(() => {
    let frame = 0;
    const timer = setInterval(() => {
      const scrambled = text.split('').map((char) => {
        if (char === ' ') return ' ';
        return Math.random() > 0.8 ? chars[Math.floor(Math.random() * chars.length)] : char;
      }).join('');
      setDisplayText(scrambled);
      frame++;
      if (frame > 10) {
        setDisplayText(text);
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayText}</span>;
};

const Terminal = () => {
  const [logs, setLogs] = useState([]);
  const messages = [
    "[SYSTEM] V3000 Core Init...",
    "[NEURAL] Mapping sensory input...",
    "[GEO] Region: Global CIS identified",
    "[DATA] Injecting Nano Banana v6.2",
    "[AUTH] Session verified",
    "[ROI] Projected efficiency: +850%"
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLogs(prev => [...prev.slice(-4), messages[i % messages.length]]);
      i++;
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass p-4 font-mono text-[10px] text-cyan-400 rounded-sm">
      <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
        <span className="uppercase tracking-tighter opacity-50">Neural Link Active</span>
      </div>
      {logs.map((log, i) => (
        <div key={i} className="mb-1">
          <span className="opacity-30">[{new Date().toLocaleTimeString()}]</span> {log}
        </div>
      ))}
    </div>
  );
};

const ROICalculator = () => {
  const [budget, setBudget] = useState(10000);
  const savings = Math.round(budget * 0.88);
  const speed = (budget / 1000).toFixed(1);

  return (
    <div className="my-32 relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 blur opacity-10"></div>
      <div className="relative glass p-8 md:p-16 rounded-none border border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter mb-4">Экономика Будущего</h2>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Рассчитайте преимущество протокола V3000</p>
          </div>
          <div className="text-right">
            <span className="text-7xl font-display font-black text-cyan-500">88%</span>
            <p className="text-[10px] font-mono text-gray-600 uppercase">Avg. Cost Reduction</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-16 items-center">
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-6">
              <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-gray-400">
                <span>Бюджет на контент</span>
                <span className="text-white">${budget.toLocaleString()} / мес</span>
              </div>
              <input 
                type="range" min="2000" max="100000" step="1000" value={budget}
                onChange={(e) => setBudget(parseInt(e.target.value))}
                className="w-full h-[2px] bg-gray-800 appearance-none cursor-crosshair accent-cyan-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-8 border border-white/5 bg-white/[0.02]">
                <div className="text-[10px] font-mono text-gray-500 uppercase mb-4">Ваша чистая выгода</div>
                <div className="text-3xl font-display font-bold text-white">${savings.toLocaleString()}</div>
              </div>
              <div className="p-8 border border-white/5 bg-white/[0.02]">
                <div className="text-[10px] font-mono text-gray-500 uppercase mb-4">Ускорение циклов</div>
                <div className="text-3xl font-display font-bold text-cyan-500">x{speed}</div>
              </div>
            </div>
          </div>

          <div className="space-y-6 border-l border-white/5 pl-8 hidden lg:block">
            <h4 className="font-display font-bold uppercase tracking-widest text-sm">Почему это работает?</h4>
            <ul className="space-y-4 text-xs text-gray-500 font-light leading-relaxed">
              <li className="flex gap-2"><span>[+]</span> Исключение аренды студий и логистики</li>
              <li className="flex gap-2"><span>[+]</span> Работа с AI-моделями без гонораров</li>
              <li className="flex gap-2"><span>[+]</span> Мгновенная итерация под любой тренд</li>
              <li className="flex gap-2"><span>[+]</span> Бесконечное масштабирование контента</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
    const handleOver = (e) => {
      const target = e.target;
      if (target) {
        const isInteractive = target.closest('button, input, a, select, textarea');
        setHovered(!!isInteractive);
      }
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseover', handleOver);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
    };
  }, []);

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 w-4 h-4 bg-cyan-500 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        animate={{ x: position.x - 8, y: position.y - 8, scale: hovered ? 2.5 : 1 }}
        transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.2 }}
      />
      <motion.div 
        className="fixed top-0 left-0 w-10 h-10 border border-cyan-500/30 rounded-full pointer-events-none z-[9998] hidden md:block"
        animate={{ x: position.x - 20, y: position.y - 20, scale: hovered ? 1.5 : 1 }}
        transition={{ type: "spring", damping: 40, stiffness: 300, mass: 0.5 }}
      />
    </>
  );
};

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
  const [status, setStatus] = useState('');
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('ИНИЦИАЛИЗАЦИЯ...');
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.success) {
            setStatus('ПРОТОКОЛ ПРИНЯТ.');
            setFormData({ name: '', email: '', service: '', message: '' });
        }
    } catch (e) { setStatus('ОШИБКА КАНАЛА.'); }
  };

  return (
    <div className="bg-black text-white font-sans selection:bg-cyan-500 cursor-none" ref={containerRef}>
      <div className="bg-grain"></div>
      <CustomCursor />
      
      <div className="fixed top-8 right-8 z-50 hidden lg:block w-72">
        <Terminal />
      </div>

      <header className="relative min-h-screen flex flex-col justify-center px-6 max-w-7xl mx-auto overflow-hidden">
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 flex items-center justify-center -z-10">
          <div className="w-[800px] h-[800px] bg-cyan-500/5 blur-[150px] rounded-full"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-cyan-500"></div>
            <span className="font-mono text-xs text-cyan-500 tracking-[0.4em] uppercase">Будущее Медиа</span>
          </div>
          
          <h1 className="text-[12vw] lg:text-[10vw] font-display font-black leading-[0.85] tracking-tighter mb-12 uppercase italic">
            <TextScramble text="Neural" /><br/>
            <span className="text-transparent border-t border-b border-white/20 px-2">Production</span>
          </h1>

          <div className="grid md:grid-cols-2 gap-12 items-end">
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-xl">
              Проектируем рекламные реальности, используя стратегическое ядро <strong>Nano Banana</strong>. Мы меняем физику вашего маркетинга.
            </p>
            <div className="flex flex-col items-start gap-8">
              <motion.button 
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-12 py-6 font-display font-bold text-xl uppercase tracking-widest hover:bg-cyan-500 transition-colors"
              >
                ЗАПУСТИТЬ ПРОЕКТ
              </motion.button>
            </div>
          </div>
        </motion.div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-32">
        <section className="py-40">
          <div className="grid md:grid-cols-2 gap-1">
            {services.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative p-12 bg-zinc-950/30 border border-white/5 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-12 text-7xl opacity-5 group-hover:opacity-20 transition-opacity duration-700">{s.icon}</div>
                <h3 className="text-3xl font-display font-bold mb-6 group-hover:text-cyan-400 transition-colors uppercase tracking-tight italic">{s.title}</h3>
                <p className="text-gray-500 text-lg font-light leading-relaxed mb-12 max-w-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <ROICalculator />

        <section className="py-40 border-t border-white/5">
          <div className="max-w-xl mx-auto">
            <h2 className="text-5xl font-display font-bold uppercase tracking-tighter mb-12 italic">Запрос Доступа</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <input 
                type="text" placeholder="Ваше Имя" className="w-full bg-transparent border-b border-white/10 p-4 outline-none focus:border-cyan-500 transition-colors"
                value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required
              />
              <input 
                type="email" placeholder="Email" className="w-full bg-transparent border-b border-white/10 p-4 outline-none focus:border-cyan-500 transition-colors"
                value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required
              />
              <motion.button 
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full py-6 border border-white text-white font-display font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all"
              >
                ОТПРАВИТЬ В ЯДРО
              </motion.button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
