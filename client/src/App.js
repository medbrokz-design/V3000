import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const services = [
  {
    title: "Brand Immortality",
    id: "DNA",
    desc: "Создаем цифровых двойников с 100% консистентностью. Ваш бренд-амбассадор не стареет и не требует гонораров.",
    icon: "🧬",
    color: "from-cyan-500 to-blue-600"
  },
  {
    title: "Infinite Content Engine",
    id: "ICE",
    desc: "Производство визуалов уровня Vogue за секунды. Полная замена классических фотосессий и логистики.",
    icon: "⚡",
    color: "from-purple-500 to-pink-600"
  },
  {
    title: "Market Disruption Logic",
    id: "MDL",
    desc: "Внедрение ИИ-агентов Dr. Heisenberg в бизнес-процессы. Автоматизация креатива на уровне ядра.",
    icon: "🧠",
    color: "from-amber-500 to-orange-600"
  },
  {
    title: "Hyper-Realistic E-com",
    id: "ECOM",
    desc: "Мгновенная примерка одежды на нейро-моделях. Снижение возвратов и взрывной рост конверсии в корзину.",
    icon: "🧥",
    color: "from-emerald-500 to-teal-600"
  }
];

const TextScramble = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  
  useEffect(() => {
    let frame = 0;
    const timer = setInterval(() => {
      const scrambled = text.split('').map((char, i) => {
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
    "[AUTH] Dr. Heisenberg authenticated",
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
          <span className="opacity-30">[{new Date().toLocaleTimeString([], {hour12:false})}]</span> {log}
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
      const isInteractive = e.target.closest('button, input, a, select, textarea');
      setHovered(!!isInteractive);
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
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

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
            setStatus('ПРОТОКОЛ ПРИНЯТ. ОЖИДАЙТЕ СВЯЗИ.');
            setFormData({ name: '', email: '', service: '', message: '' });
        }
    } catch (e) { setStatus('ОШИБКА КАНАЛА.'); }
  };

  return (
    <div className="bg-black text-white font-sans selection:bg-cyan-500 cursor-none" ref={containerRef}>
      <div className="bg-grain"></div>
      <CustomCursor />
      
      {/* HUD Elements */}
      <div className="fixed top-8 right-8 z-50 hidden lg:block w-72">
        <Terminal />
      </div>
      <div className="fixed bottom-8 left-8 z-50 hidden lg:block font-mono text-[8px] text-gray-700 tracking-[0.5em] vertical-text uppercase">
        V3000 // Neural Architectures // v6.2.0
      </div>

      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col justify-center px-6 max-w-7xl mx-auto overflow-hidden">
        <motion.div style={{ opacity }} className="absolute inset-0 flex items-center justify-center -z-10">
          <div className="w-[800px] h-[800px] bg-cyan-500/5 blur-[150px] rounded-full"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-cyan-500"></div>
            <span className="font-mono text-xs text-cyan-500 tracking-[0.4em] uppercase">The Future of Media</span>
          </div>
          
          <h1 className="text-[12vw] lg:text-[10vw] font-display font-black leading-[0.85] tracking-tighter mb-12 uppercase italic">
            <TextScramble text="Neural" /><br/>
            <span className="text-transparent border-t border-b border-white/20 px-2">Production</span>
          </h1>

          <div className="grid md:grid-cols-2 gap-12 items-end">
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-xl">
              Проектируем рекламные реальности, используя стратегическое ядро <strong>Nano Banana</strong>. Мы не просто создаем контент — мы меняем физику вашего маркетинга.
            </p>
            <div className="flex flex-col items-start gap-8">
              <motion.button 
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-12 py-6 font-display font-bold text-xl uppercase tracking-widest hover:bg-cyan-500 transition-colors"
              >
                Начать захват
              </motion.button>
              <div className="flex gap-10 font-mono text-[10px] text-gray-600 uppercase tracking-widest">
                <div>[+] 2 Слота свободны</div>
                <div>[+] Global CIS / EU / UAE</div>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Marquee GEO Section */}
      <div className="py-12 border-y border-white/5 bg-zinc-950/50">
        <div className="animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-20 px-10 text-[10px] font-mono text-gray-800 uppercase tracking-[0.6em]">
              <span>Dubai // UAE</span> <span>London // UK</span> <span>Aktobe // KZ</span> <span>New York // USA</span> <span>Almaty // KZ</span> <span>Singapore // SG</span>
            </div>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 pb-32">
        {/* Services Overhaul */}
        <section className="py-40">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div>
              <h2 className="text-6xl font-display font-bold uppercase tracking-tighter italic">Инструменты</h2>
              <p className="text-cyan-500 font-mono text-xs uppercase tracking-widest">Operational Modules</p>
            </div>
            <div className="text-right max-w-xs text-xs text-gray-500 font-light leading-relaxed">
              Каждый модуль интегрируется в вашу экосистему за 48 часов, сокращая издержки на производство визуального контента до 90%.
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-1">
            {services.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative p-12 bg-zinc-950/30 border border-white/5 hover:border-cyan-500/50 transition-all duration-700 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-12 text-7xl opacity-5 group-hover:opacity-20 transition-opacity duration-700">{s.icon}</div>
                <div className="font-mono text-[10px] text-gray-600 mb-8 uppercase tracking-widest">Module 0{i+1} // {s.id}</div>
                <h3 className="text-3xl font-display font-bold mb-6 group-hover:text-cyan-500 transition-colors uppercase tracking-tight italic">{s.title}</h3>
                <p className="text-gray-500 text-lg font-light leading-relaxed mb-12 max-w-sm">{s.desc}</p>
                <div className="h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-cyan-500 to-transparent transition-all duration-1000"></div>
              </motion.div>
            ))}
          </div>
        </section>

        <ROICalculator />

        {/* Process Section */}
        <section className="py-40 border-t border-white/5">
          <div className="grid lg:grid-cols-2 gap-24">
            <div className="sticky top-40 h-fit">
              <h2 className="text-6xl font-display font-bold uppercase tracking-tighter italic mb-8">Метод<br/>V3000</h2>
              <div className="p-8 border border-cyan-500/20 bg-cyan-500/5 rounded-sm italic text-gray-400 text-xl font-light">
                "Мы не используем фильтры. Мы управляем психологией внимания через математически выверенную эстетику."
              </div>
            </div>
            <div className="space-y-32">
              {[ 
                { t: "Анализ ДНК", d: "Глубокое погружение в ценности вашего бренда и определение уникальных триггеров аудитории." },
                { t: "Нейро-архитектура", d: "Создание кастомных моделей и окружений, недоступных в классическом продакшене." },
                { t: "Запуск Протокола", d: "Генерация бесконечного потока контента с нулевой стоимостью за каждую последующую единицу." }
              ].map((step, i) => (
                <div key={i} className="space-y-6">
                  <div className="text-7xl font-display font-black text-white/5 tracking-tighter">0{i+1}</div>
                  <h4 className="text-2xl font-bold uppercase italic tracking-tight">{step.t}</h4>
                  <p className="text-gray-500 text-lg font-light leading-relaxed">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Overhaul */}
        <section className="py-40 glass p-12 md:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[100px] -z-10"></div>
          <div className="max-w-xl">
            <h2 className="text-5xl font-display font-bold uppercase tracking-tighter mb-12 italic">Запрос Доступа</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Name / ID</label>
                  <input 
                    type="text" className="w-full bg-transparent border-b border-white/10 p-2 outline-none focus:border-cyan-500 transition-colors font-light"
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Digital Address</label>
                  <input 
                    type="email" className="w-full bg-transparent border-b border-white/10 p-2 outline-none focus:border-cyan-500 transition-colors font-light"
                    value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Project Scope</label>
                <select 
                  className="w-full bg-transparent border-b border-white/10 p-2 outline-none focus:border-cyan-500 transition-colors font-light appearance-none"
                  value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})}
                >
                  <option value="" className="bg-black">Select Objective</option>
                  {services.map(s => <option key={s.id} value={s.id} className="bg-black">{s.title}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Neural Directives</label>
                <textarea 
                  className="w-full bg-transparent border-b border-white/10 p-2 outline-none focus:border-cyan-500 transition-colors font-light h-32 resize-none"
                  value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full py-6 border border-white text-white font-display font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all"
              >
                Отправить в ядро
              </motion.button>
              <AnimatePresence>
                {status && (
                  <motion.p initial={{opacity:0}} animate={{opacity:1}} className="text-center font-mono text-[10px] text-cyan-500 animate-pulse tracking-widest">
                    {status}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 text-center px-6">
        <div className="flex flex-col items-center gap-8 opacity-30">
          <div className="flex gap-10 text-[10px] font-mono uppercase tracking-[0.4em]">
            <span>Instagram</span> <span>LinkedIn</span> <span>Twitter</span>
          </div>
          <p className="text-[8px] font-mono tracking-[1em] uppercase">
            © 2026 V3000 NEURAL ARCHITECTURES | SECURED BY BRAIN AI
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;