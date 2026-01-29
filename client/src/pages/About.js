import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const About = ({ lang }) => {
  return (
    <div className="min-h-screen bg-black pt-24 md:pt-32 pb-20 px-6">
      <Helmet>
        <title>V3000 | {lang === 'ru' ? 'Манифест' : 'Manifesto'}</title>
        <meta name="description" content={lang === 'ru' ? 'Наша философия и технологический стек.' : 'Our philosophy and tech stack.'} />
      </Helmet>
      <div className="max-w-7xl mx-auto space-y-20 md:space-y-40">
        <header className="space-y-6 md:space-y-8 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-9xl font-display font-light uppercase tracking-tighter italic text-gradient leading-tight"
          >
            {lang === 'ru' ? 'Манифест' : 'Manifesto'}
          </motion.h1>
          <p className="text-xl md:text-3xl text-gray-400 font-light leading-tight">
            {lang === 'ru' 
              ? 'V3000 — это не агентство. Это протокол перехода от ручного труда к системному интеллекту.'
              : 'V3000 is not an agency. It is a protocol for the transition from manual labor to systemic intelligence.'}
          </p>
        </header>

        <section className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start">
          <div className="space-y-8 md:space-y-12">
            <h2 className="text-2xl md:text-3xl font-display font-light uppercase italic border-b border-white/10 pb-4 md:pb-6">
              {lang === 'ru' ? 'Наша Философия' : 'Our Philosophy'}
            </h2>
            <div className="space-y-6 md:space-y-8 text-gray-500 font-light text-base md:text-lg leading-relaxed">
              <p>
                {lang === 'ru' 
                  ? 'Мы верим, что в 2026 году контент больше не должен быть ограничен возможностями человека.'
                  : 'We believe that in 2026, content should no longer be limited by human capabilities.'}
              </p>
              <p>
                {lang === 'ru' 
                  ? 'Используя ядро Nano Banana, мы создаем системы, которые масштабируют креатив на уровне ДНК бизнеса.'
                  : 'Using the Nano Banana core, we create systems that scale creativity at the DNA level of the business.'}
              </p>
            </div>
          </div>
          <div className="bg-zinc-950 p-8 md:p-12 border border-white/5 space-y-8 md:space-y-10">
            <h2 className="text-2xl md:text-3xl font-display font-light uppercase italic">The Stack</h2>
            <div className="grid grid-cols-2 gap-6 md:gap-10">
              <div className="space-y-1">
                <h3 className="text-cyan-500 font-mono text-[8px] md:text-[10px] uppercase">Compute</h3>
                <p className="text-white text-xs md:text-sm">H100 Cluster</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-cyan-500 font-mono text-[8px] md:text-[10px] uppercase">Architecture</h3>
                <p className="text-white text-xs md:text-sm">RAG / LoRA</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-cyan-500 font-mono text-[8px] md:text-[10px] uppercase">Latency</h3>
                <p className="text-white text-xs md:text-sm">Zero-Delay</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-cyan-500 font-mono text-[8px] md:text-[10px] uppercase">Resolution</h3>
                <p className="text-white text-xs md:text-sm">8K Native</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-20 md:py-40 text-center space-y-8">
          <div className="text-3xl md:text-4xl font-display font-light uppercase tracking-widest opacity-20">V3000 // 2026</div>
          <p className="text-[8px] md:text-[10px] font-mono text-gray-700 uppercase tracking-[0.5em] md:tracking-[1em]">Secure. Private. Neural.</p>
        </footer>
      </div>
    </div>
  );
};

export default About;
