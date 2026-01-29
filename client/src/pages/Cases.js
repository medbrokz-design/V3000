import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const casesDetail = [
  {
    id: "ecom",
    title: { ru: "E-commerce Масштаб", en: "E-commerce Scale" },
    client: "Global Fashion Retailer",
    challenge: { ru: "Создание 500+ креативов в неделю без участия живых моделей.", en: "Creating 500+ creatives per week without live models." },
    solution: { ru: "Внедрение AI Visual Engine для мгновенной примерки коллекций.", en: "Deployment of AI Visual Engine for instant collection try-ons." },
    results: ["↑ 4.2x ROAS", "↓ 38% CPA", "100% Consistency"],
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800"
  },
  {
    id: "saas",
    title: { ru: "B2B SaaS Автоматизация", en: "B2B SaaS Automation" },
    client: "TechScale Germany",
    challenge: { ru: "Генерация экспертного контента на 5 языках одновременно.", en: "Generating expert content in 5 languages simultaneously." },
    solution: { ru: "RAG-система, обученная на технической документации продукта.", en: "RAG system trained on product technical documentation." },
    results: ["↑ 210% Organic", "3x Leads", "0 Hallucinations"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800"
  },
  {
    id: "city",
    title: { ru: "Cyberpunk Aktobe 2026", en: "Cyberpunk Aktobe 2026" },
    client: "City Vision Concept",
    challenge: { ru: "Визуализация футуристичного облика города для инвесторов.", en: "Visualizing the futuristic city look for investors." },
    solution: { ru: "Neural Environment Synthesis с физикой света Arri Alexa.", en: "Neural Environment Synthesis with Arri Alexa light physics." },
    results: ["Viral Reach", "Premium Aesthetic", "Zero Production Cost"],
    img: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=800"
  }
];

const Cases = ({ lang }) => {
  return (
    <div className="min-h-screen bg-black pt-24 md:pt-32 pb-20 px-6">
      <Helmet>
        <title>V3000 | {lang === 'ru' ? 'Архив Реальностей' : 'Reality Archive'}</title>
        <meta name="description" content={lang === 'ru' ? 'Кейсы использования ИИ в маркетинге.' : 'AI marketing case studies.'} />
      </Helmet>
      <div className="max-w-7xl mx-auto space-y-20 md:space-y-40">
        <header className="space-y-6 md:space-y-8 max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-8xl font-display font-light uppercase tracking-tighter italic text-gradient"
          >
            {lang === 'ru' ? 'Архив Реальностей' : 'Reality Archive'}
          </motion.h1>
          <p className="text-base md:text-xl text-gray-500 font-light leading-relaxed">
            {lang === 'ru' ? 'Кейсы, которые доказывают: ИИ — это не будущее, это ваша текущая прибыль.' : 'Case studies that prove: AI is not the future, it is your current profit.'}
          </p>
        </header>

        <div className="space-y-32 md:space-y-60">
          {casesDetail.map((c, i) => (
            <article 
              key={i}
              className={`grid lg:grid-cols-2 gap-10 md:gap-20 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              <Link to={`/cases/${c.id}`} aria-label={`View case study: ${c.title[lang]}`} className="aspect-[4/3] bg-zinc-900 overflow-hidden border border-white/5 group cursor-none">
                <img src={c.img} loading="lazy" className="w-full h-full object-cover opacity-40 group-hover:opacity-80 group-hover:scale-105 transition-all duration-1000" alt={`Visual representation of ${c.title[lang]}`} />
              </Link>
              <div className="space-y-6 md:space-y-10">
                <header className="space-y-4">
                  <div className="font-mono text-[9px] md:text-[10px] text-cyan-500 uppercase tracking-[0.4em]">Project 0{i+1} // {c.client}</div>
                  <h2 className="text-3xl md:text-5xl font-display font-light uppercase italic">
                    <Link to={`/cases/${c.id}`} className="hover:text-cyan-500 transition-colors cursor-none" aria-label={`Read more about ${c.title[lang]}`}>
                      {c.title[lang]}
                    </Link>
                  </h2>
                </header>
                <div className="space-y-4 md:space-y-6 text-gray-400 font-light text-sm md:text-base">
                  <p><strong>{lang==='ru'?'Задача:':'Challenge:'}</strong> {c.challenge[lang]}</p>
                  <p><strong>{lang==='ru'?'Решение:':'Solution:'}</strong> {c.solution[lang]}</p>
                </div>
                <div className="flex flex-wrap gap-3 md:gap-4">
                  {c.results.map(r => (
                    <span key={r} className="px-3 py-1.5 md:px-4 md:py-2 border border-white/10 bg-white/5 rounded-full font-mono text-[8px] md:text-[9px] uppercase tracking-widest text-white">{r}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cases;