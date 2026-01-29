import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import Home from './pages/Home';
import Services from './pages/Services';
import Cases from './pages/Cases';
import About from './pages/About';
import Contact from './pages/Contact';

const CustomCursor = () => {
  const mouseX = useSpring(0, { damping: 25, stiffness: 250 });
  const mouseY = useSpring(0, { damping: 25, stiffness: 250 });
  useEffect(() => {
    const m = (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener('mousemove', m);
    return () => window.removeEventListener('mousemove', m);
  }, [mouseX, mouseY]);
  return (
    <motion.div className="fixed top-0 left-0 w-6 h-6 border border-white/20 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block" style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }} />
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

function App() {
  const [lang, setLang] = useState('ru');
  const [loading, setLoading] = useState(true);

  useEffect(() => { setTimeout(() => setLoading(false), 1000); }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="bg-black text-white antialiased selection:bg-white selection:text-black font-sans cursor-none overflow-x-hidden">
        <AnimatePresence>{loading && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black flex items-center justify-center">
            <div className="w-12 h-[1px] bg-white/20 relative overflow-hidden"><motion.div animate={{ left: ["-100%", "100%"] }} transition={{ duration: 1, repeat: Infinity }} className="absolute inset-0 bg-white" /></div>
          </motion.div>
        )}</AnimatePresence>

        <CustomCursor />
        
        <nav className="fixed top-0 left-0 w-full z-[100] px-6 md:px-10 py-10 flex justify-between items-center mix-blend-difference">
          <Link to="/" className="font-display font-bold text-xl tracking-tighter italic">V3000</Link>
          <div className="flex items-center gap-4 md:gap-10">
            <div className="hidden md:flex gap-8 text-[9px] uppercase tracking-widest opacity-60">
              <Link to="/cases" className="hover:opacity-100 transition-opacity">Cases</Link>
              <Link to="/services" className="hover:opacity-100 transition-opacity">Services</Link>
              <Link to="/about" className="hover:opacity-100 transition-opacity">Manifesto</Link>
              <Link to="/contact" className="hover:opacity-100 transition-opacity">Contact</Link>
            </div>
            <button onClick={() => setLang(lang==='ru'?'en':'ru')} className="font-mono text-[9px] border border-white/10 px-4 py-1 rounded-full uppercase hover:bg-white hover:text-black transition-all">{lang}</button>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/services" element={<Services lang={lang} />} />
          <Route path="/cases" element={<Cases lang={lang} />} />
          <Route path="/about" element={<About lang={lang} />} />
          <Route path="/contact" element={<Contact lang={lang} />} />
        </Routes>

        <footer className="py-20 border-t border-white/5 text-center opacity-20 font-mono text-[7px] tracking-[1em]">© 2026 V3000 NEURAL ARCHITECTURES</footer>
      </div>
    </Router>
  );
}

export default App;