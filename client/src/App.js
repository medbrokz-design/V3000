import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { HelmetProvider, Helmet } from 'react-helmet-async';

// Lazy loading pages for better initial load speed
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Cases = lazy(() => import('./pages/Cases'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const CaseDetail = lazy(() => import('./pages/CaseDetail'));

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

const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-black">
    <div className="w-8 h-[1px] bg-white/20 relative overflow-hidden">
      <motion.div animate={{ left: ["-100%", "100%"] }} transition={{ duration: 1, repeat: Infinity }} className="absolute inset-0 bg-white" />
    </div>
  </div>
);

const Navbar = ({ lang, setLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  useEffect(() => { setIsOpen(false); }, [location]);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-6 md:px-10 py-6 md:py-10 flex justify-between items-center mix-blend-difference">
      <Link to="/" className="font-display font-bold text-xl tracking-tighter italic">V3000</Link>
      
      <div className="flex items-center gap-6 md:gap-10">
        <div className="hidden md:flex gap-8 text-[9px] uppercase tracking-widest opacity-60">
          <Link to="/cases" className="hover:opacity-100 transition-opacity">Cases</Link>
          <Link to="/services" className="hover:opacity-100 transition-opacity">Services</Link>
          <Link to="/about" className="hover:opacity-100 transition-opacity">Manifesto</Link>
          <Link to="/contact" className="hover:opacity-100 transition-opacity">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => setLang(lang==='ru'?'en':'ru')} className="font-mono text-[9px] border border-white/10 px-3 py-1 rounded-full uppercase hover:bg-white hover:text-black transition-all">{lang}</button>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden flex flex-col gap-1.5 p-2">
            <motion.div animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="w-6 h-[1px] bg-white origin-center" />
            <motion.div animate={isOpen ? { opacity: 0 } : { opacity: 1 }} className="w-6 h-[1px] bg-white" />
            <motion.div animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="w-6 h-[1px] bg-white origin-center" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 bg-black flex flex-col items-center justify-center gap-10 p-10 md:hidden"
          >
            <Link to="/cases" className="text-3xl font-display font-light uppercase tracking-tighter italic">Cases</Link>
            <Link to="/services" className="text-3xl font-display font-light uppercase tracking-tighter italic">Services</Link>
            <Link to="/about" className="text-3xl font-display font-light uppercase tracking-tighter italic">Manifesto</Link>
            <Link to="/contact" className="text-3xl font-display font-light uppercase tracking-tighter italic">Contact</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

function App() {
  const [lang, setLang] = useState('ru');
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    // Faster preloader
    const timer = setTimeout(() => setLoading(false), 800); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <AnimatePresence>
          <Helmet>
            <html lang={lang} />
          </Helmet>
        </AnimatePresence>
        <div className="bg-black text-white antialiased selection:bg-white selection:text-black font-sans cursor-default md:cursor-none overflow-x-hidden">
          <AnimatePresence>{loading && (
            <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black flex items-center justify-center">
              <div className="w-12 h-[1px] bg-white/20 relative overflow-hidden"><motion.div animate={{ left: ["-100%", "100%"] }} transition={{ duration: 1, repeat: Infinity }} className="absolute inset-0 bg-white" /></div>
            </motion.div>
          )}</AnimatePresence>

          <CustomCursor />
          <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,_#111_0%,_#000_100%)]"></div>
          <Navbar lang={lang} setLang={setLang} />

          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home lang={lang} />} />
              <Route path="/services" element={<Services lang={lang} />} />
              <Route path="/cases" element={<Cases lang={lang} />} />
              <Route path="/cases/:id" element={<CaseDetail lang={lang} />} />
              <Route path="/about" element={<About lang={lang} />} />
              <Route path="/contact" element={<Contact lang={lang} />} />
            </Routes>
          </Suspense>

          <footer className="py-20 border-t border-white/5 text-center opacity-20 font-mono text-[7px] tracking-[1em]">© 2026 V3000 NEURAL ARCHITECTURES</footer>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
