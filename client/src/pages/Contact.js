import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const Contact = ({ lang }) => {
  const [status, setStatus] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('...');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      const data = await res.json();
      if (data.success) {
        setStatus(lang === 'ru' ? 'ПРИНЯТО.' : 'ACCEPTED.');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (e) { setStatus('ERROR.'); }
  };

  return (
    <div className="min-h-screen bg-black pt-24 md:pt-32 pb-20 px-6 flex items-center justify-center">
      <Helmet>
        <title>V3000 | {lang === 'ru' ? 'Связь' : 'Connect'}</title>
        <meta name="description" content={lang === 'ru' ? 'Свяжитесь с ядром V3000.' : 'Connect with the V3000 core.'} />
      </Helmet>
      
      <div className="max-w-2xl w-full space-y-12 md:space-y-20">
        <header className="text-center space-y-4 md:space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-display font-light uppercase tracking-tighter italic text-gradient"
          >
            {lang === 'ru' ? 'Связь' : 'Connect'}
          </motion.h1>
          <p className="text-gray-500 font-mono text-[8px] md:text-[9px] uppercase tracking-[0.3em] md:tracking-[0.5em]">Direct Channel to V3000 Core</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12">
          <div className="space-y-6 md:space-y-8">
            <label htmlFor="contact-name" className="sr-only">Name</label>
            <input 
              id="contact-name" type="text" placeholder={lang === 'ru' ? "Имя" : "Name"} required
              aria-label="Your Name"
              value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-transparent border-b border-white/5 py-4 md:py-6 text-center text-xl md:text-2xl font-light outline-none focus:border-white transition-colors"
            />
            
            <label htmlFor="contact-email" className="sr-only">Email</label>
            <input 
              id="contact-email" type="email" placeholder="Email" required
              aria-label="Your Email"
              value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-transparent border-b border-white/5 py-4 md:py-6 text-center text-xl md:text-2xl font-light outline-none focus:border-white transition-colors"
            />
            
            <label htmlFor="contact-message" className="sr-only">Message</label>
            <textarea 
              id="contact-message" placeholder={lang === 'ru' ? "Ваша задача" : "Your Mission"}
              aria-label="Project details"
              value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-transparent border-b border-white/5 py-4 md:py-6 text-center text-base md:text-lg font-light outline-none focus:border-white transition-colors h-32 resize-none"
            />
          </div>
          <div className="flex flex-col items-center gap-8 md:gap-10">
            <motion.button 
              type="submit"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              aria-label={lang === 'ru' ? 'Отправить форму' : 'Execute Transmission'}
              className="px-12 py-6 md:px-16 md:py-8 bg-white text-black text-[10px] uppercase tracking-[0.6em] font-black hover:invert transition-all rounded-sm"
            >
              {lang === 'ru' ? 'ОТПРАВИТЬ' : 'EXECUTE'}
            </motion.button>
            <AnimatePresence>
              {status && <motion.p initial={{opacity:0}} animate={{opacity:1}} className="font-mono text-[9px] tracking-widest text-cyan-500 uppercase animate-pulse">{status}</motion.p>}
            </AnimatePresence>
          </div>
        </form>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 pt-12 md:pt-20 border-t border-white/5 opacity-30 text-center">
          <div className="space-y-1 md:space-y-2">
            <div className="text-[7px] md:text-[8px] font-mono uppercase tracking-widest">Telegram</div>
            <a href="https://t.me/medbrokz" className="text-[9px] md:text-[10px] font-bold hover:text-white transition-colors">@medbrokz</a>
          </div>
          <div className="space-y-1 md:space-y-2">
            <div className="text-[7px] md:text-[8px] font-mono uppercase tracking-widest">Region</div>
            <div className="text-[9px] md:text-[10px] font-bold">Global</div>
          </div>
          <div className="space-y-1 md:space-y-2">
            <div className="text-[7px] md:text-[8px] font-mono uppercase tracking-widest">Status</div>
            <div className="text-[9px] md:text-[10px] font-bold text-green-500">Online</div>
          </div>
          <div className="space-y-1 md:space-y-2">
            <div className="text-[7px] md:text-[8px] font-mono uppercase tracking-widest">Response</div>
            <div className="text-[9px] md:text-[10px] font-bold">~24h</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
