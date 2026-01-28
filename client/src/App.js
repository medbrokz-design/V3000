import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    title: "Brand Immortality (DNA-Lock)",
    desc: "Ваш амбассадор не стареет, не требует гонораров и работает 24/7. Создаем цифровых двойников с 100% консистентностью.",
    icon: "🧬"
  },
  {
    title: "Infinite Content Engine",
    desc: "Производство визуалов уровня Vogue за копейки. Больше никаких съемок, моделей и аренды студий. Только чистая конверсия.",
    icon: "⚡"
  },
  {
    title: "Market Disruption Logic",
    desc: "Внедрение кастомных ИИ-агентов (Dr. Heisenberg) в ваш отдел маркетинга. Автоматизируем креатив на уровне ДНК бизнеса.",
    icon: "🧠"
  },
  {
    title: "Hyper-Realistic E-com",
    desc: "Лукбуки и каталоги любой сложности. Примерка одежды на нейро-моделях за 0.5 секунды. Продажи растут, возвраты падают.",
    icon: "🧥"
  }
];

const Terminal = () => {
  const [logs, setLogs] = useState([]);
  const messages = [
    "[INIT] V3000 Core Engine...",
    "[OK] Neural Network Layer 42 Active",
    "[SCAN] Analyzing market trends 2026...",
    "[ALERT] Competitor inefficiency detected: 84%",
    "[ACTION] Optimizing ROI parameters...",
    "[AUTH] Dr. Heisenberg session verified",
    "[DATA] Injecting Nano Banana protocols..."
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLogs(prev => [...prev.slice(-5), messages[i % messages.length]]);
      i++;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/80 border border-cyan-900 p-4 font-mono text-[10px] text-cyan-500 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.1)]">
      {logs.map((log, i) => (
        <div key={i} className="mb-1 animate-pulse">
          <span className="opacity-50">[{new Date().toLocaleTimeString()}]</span> {log}
        </div>
      ))}
      <div className="w-2 h-4 bg-cyan-500 inline-block animate-bounce ml-1"></div>
    </div>
  );
};

const ROICalculator = () => {
  const [budget, setBudget] = useState(5000);
  const savings = Math.round(budget * 0.85);

  return (
    <div className="bg-zinc-950 border border-cyan-900/30 p-8 md:p-12 my-20">
      <h3 className="text-3xl font-black mb-8 uppercase italic">Прогноз экономии (ROI)</h3>
      <div className="space-y-12">
        <div>
          <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">
            Ваш текущий бюджет на контент / мес: ${budget}
          </label>
          <input 
            type="range" 
            min="1000" 
            max="50000" 
            step="1000"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full h-1 bg-gray-800 appearance-none cursor-pointer accent-cyan-500"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-cyan-600/10 border border-cyan-500/20">
            <div className="text-xs font-mono text-cyan-500 uppercase mb-2">Экономия с V3000</div>
            <div className="text-4xl font-black">${savings}</div>
          </div>
          <div className="p-6 bg-white/5 border border-white/10">
            <div className="text-xs font-mono text-gray-500 uppercase mb-2">Доп. охват за тот же бюджет</div>
            <div className="text-4xl font-black">x6.5</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
    const handleOver = (e) => {
      const target = e.target;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer' || target.tagName === 'BUTTON' || target.tagName === 'INPUT');
    };
    
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseover', handleOver);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
    };
  }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 w-8 h-8 border border-cyan-500 rounded-full pointer-events-none z-[9999] hidden md:block"
      animate={{ 
        x: position.x - 16, 
        y: position.y - 16,
        scale: isPointer ? 1.5 : 1,
        backgroundColor: isPointer ? "rgba(6, 182, 212, 0.2)" : "rgba(6, 182, 212, 0)"
      }}
      transition={{ type: "spring", damping: 20, stiffness: 250, mass: 0.5 }}
    />
  );
};

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Инициализация протокола отправки...');
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.success) {
            setStatus('СИСТЕМА: Заявка принята. Анализируем ваш кейс...');
            setFormData({ name: '', email: '', service: '', message: '' });
        } else {
            setStatus('ОШИБКА: Сбой канала связи.');
        }
    } catch (error) {
        setStatus('ОШИБКА: Сервер не отвечает.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 overflow-x-hidden cursor-none">
      <CustomCursor />
      <div className="fixed top-10 right-10 z-50 hidden lg:block w-64">
        <Terminal />
      </div>

      <div className="bg-cyan-600 text-black text-[10px] py-1 text-center font-bold tracking-[0.3em] uppercase">
        Доступно только 2 слота на февраль 2026. Протокол V3000 активен.
      </div>

      <header className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto text-center" role="banner">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-cyan-400 font-mono text-sm tracking-[0.5em] mb-4 block animate-pulse">SYSTEM STATUS: OPERATIONAL // GEO: GLOBAL_CIS</span>
          <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-tight">
            УБЕЙТЕ <span className="text-gray-600">КОНКУРЕНТОВ</span> <br/>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent italic">НЕЙРОСЕТЯМИ</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed">
            V3000 — ведущее агентство <strong>нейросетевого маркетинга</strong>. Мы проектируем рекламные реальности, внедряем <strong>ИИ-агентов</strong> и создаем <strong>цифровых двойников</strong> для лидеров рынка.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full md:w-auto bg-white text-black px-12 py-5 rounded-none font-black hover:bg-cyan-400 transition-all duration-300 uppercase tracking-widest text-lg"
            >
              ЗАХВАТИТЬ РЫНОК
            </motion.button>
            <div className="text-left font-mono text-xs text-gray-500 border-l border-gray-800 pl-4">
              [+] Лидеры рынка СНГ <br/>
              [+] Глобальный охват <br/>
              [+] GEO-Targeting 2026
            </div>
          </div>
        </motion.div>
      </header>

      {/* GEO / Locations Section (SEO Boost) */}
      <section className="bg-zinc-950/30 py-10 border-b border-gray-900 overflow-hidden whitespace-nowrap">
        <div className="flex space-x-20 text-gray-800 font-bold uppercase tracking-[0.5em] text-sm opacity-50">
          <span>Targeting: London</span>
          <span>Targeting: Aktobe</span>
          <span>Targeting: Dubai</span>
          <span>Targeting: Moscow</span>
          <span>Targeting: Almaty</span>
          <span>Targeting: New York</span>
        </div>
      </section>

      {/* Stats Section with Scroll Animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-y border-gray-900 bg-zinc-950/50 py-8"
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["140M+", "Генераций"],
            ["4.2x", "Рост CTR"],
            ["-85%", "Production Cost"],
            ["24/7", "Uptime"]
          ].map(([val, label], i) => (
            <div key={i}>
              <div className="text-2xl font-bold">{val}</div>
              <div className="text-xs text-gray-600 uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Services Section with Reveal */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl font-black mb-4 uppercase italic">Наши инструменты доминирования</h2>
          <div className="h-1 w-24 bg-cyan-500"></div>
        </div>
        
        <ROICalculator />

        <div className="grid md:grid-cols-2 gap-12">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group p-10 bg-zinc-950 border border-gray-900 hover:border-cyan-500/50 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 text-5xl opacity-10 group-hover:opacity-100 transition-opacity duration-500">{s.icon}</div>
              <h3 className="text-2xl font-bold mb-6 text-white group-hover:text-cyan-400 transition-colors">{s.title}</h3>
              <p className="text-gray-500 leading-relaxed text-lg mb-8">{s.desc}</p>
              <div className="flex items-center text-xs font-mono text-cyan-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                Узнать детали <span className="ml-2">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Method Section - Dark Immersive */}
      <section className="py-32 bg-cyan-600 text-black">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-5xl font-black mb-8 uppercase leading-tight">Почему вы все еще используете людей?</h2>
            <p className="text-xl font-medium mb-10 opacity-90 leading-relaxed">
              Человек ошибается. Человек болеет. Человек медленный. <br/><br/>
              Протокол V3000 базируется на ядре Nano Banana, которое анализирует 40,000 психологических триггеров в секунду.
            </p>
            <div className="bg-black text-white p-6 font-mono text-sm inline-block shadow-2xl">
              > node run market_disruption.js --force
            </div>
          </motion.div>
          <div className="relative group">
            <div className="absolute inset-0 bg-black blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="border-[20px] border-black/10 aspect-square flex items-center justify-center text-8xl grayscale hover:grayscale-0 transition-all duration-700 cursor-none relative z-10 bg-cyan-500/20 backdrop-blur-sm">
              👁️
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form with Success State */}
      <section className="py-32 px-6 max-w-2xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4 uppercase">Запросить доступ к системе</h2>
          <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">Мы работаем не со всеми. Только с теми, кто готов к масштабу.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Имя / Компания" 
              className="w-full p-5 bg-zinc-950 border border-gray-900 rounded-none focus:border-cyan-500 outline-none transition-colors"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            <input 
              type="email" 
              placeholder="Корпоративный Email" 
              className="w-full p-5 bg-zinc-950 border border-gray-900 rounded-none focus:border-cyan-500 outline-none transition-colors"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <select 
            className="w-full p-5 bg-zinc-950 border border-gray-900 rounded-none focus:border-cyan-500 outline-none transition-colors appearance-none"
            value={formData.service}
            onChange={(e) => setFormData({...formData, service: e.target.value})}
          >
            <option value="">Цель обращения</option>
            {services.map((s, i) => <option key={i} value={s.title}>{s.title}</option>)}
          </select>
          <textarea 
            placeholder="Ваши амбиции на 2026 год" 
            className="w-full p-5 bg-zinc-950 border border-gray-900 rounded-none h-40 focus:border-cyan-500 outline-none transition-colors"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          ></textarea>
          <motion.button 
            whileHover={{ scale: 1.02, backgroundColor: "#06b6d4" }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white text-black py-6 font-black transition-all duration-300 uppercase tracking-[0.2em] text-lg"
          >
            ОТПРАВИТЬ НА РАССМОТРЕНИЕ
          </motion.button>
          <AnimatePresence>
            {status && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center font-mono text-cyan-400 mt-6 text-xs animate-pulse uppercase tracking-widest"
              >
                {status}
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </section>

      <footer className="py-20 border-t border-gray-950 text-center">
        <div className="text-[10px] text-gray-700 font-mono tracking-[1em] uppercase">
          V3000 // NEURAL ARCHITECTURES // EST. 2026 <br/>
          POWERED BY BRAIN AI & NANO BANANO SYSTEM
        </div>
      </footer>
    </div>
  );
}

export default App;
