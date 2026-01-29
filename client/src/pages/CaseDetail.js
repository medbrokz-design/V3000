import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const casesData = {
  "ecom": {
    title: { ru: "E-commerce Масштаб", en: "E-commerce Scale" },
    client: "Global Fashion Retailer",
    challenge: { ru: "Создание 500+ рекламных креативов в неделю без съемок.", en: "Creating 500+ ad creatives per week without photoshoots." },
    solution: { ru: "Разработка кастомной нейросети для генерации лиц и одежды.", en: "Developing a custom neural network for generating faces and clothing." },
    results: ["↑ 4.2x ROAS", "↓ 38% CPA", "-90% Production Time"],
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2070",
    content: {
      ru: "Мы внедрили систему, которая позволяет бренду тестировать сотни гипотез в день. Теперь запуск новой коллекции занимает 48 часов вместо месяца.",
      en: "We implemented a system that allows the brand to test hundreds of hypotheses daily. Now, a new collection launch takes 48 hours instead of a month."
    }
  },
  "saas": {
    title: { ru: "B2B SaaS Автоматизация", en: "B2B SaaS Automation" },
    client: "TechScale Germany",
    challenge: { ru: "Генерация технического контента на 5 языках одновременно.", en: "Generating technical content in 5 languages simultaneously." },
    solution: { ru: "RAG-система на базе документации продукта.", en: "RAG system based on product documentation." },
    results: ["↑ 210% Organic", "3x Qualified Leads", "0 Errors"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026",
    content: {
      ru: "ИИ-агент анализирует тикеты поддержки и документацию, автоматически создавая статьи в блог, которые отвечают на реальные боли клиентов.",
      en: "The AI agent analyzes support tickets and documentation, automatically creating blog posts that address real customer pain points."
    }
  },
  "city": {
    title: { ru: "Cyberpunk Aktobe 2026", en: "Cyberpunk Aktobe 2026" },
    client: "City Vision Concept",
    challenge: { ru: "Создание концепта города будущего для выставки EXPO.", en: "Creating a future city concept for the EXPO exhibition." },
    solution: { ru: "Neural Environment Synthesis.", en: "Neural Environment Synthesis." },
    results: ["1M+ Views", "Premium Positioning", "Zero CG Costs"],
    img: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=2564",
    content: {
      ru: "Мы объединили архитектурные планы с эстетикой киберпанка, создав иммерсивный ролик, который принес проекту инвестиции.",
      en: "We merged architectural plans with cyberpunk aesthetics, creating an immersive video that secured project investment."
    }
  }
};

const CaseDetail = ({ lang }) => {
  const { id } = useParams();
  const c = casesData[id];

  if (!c) return <div className="h-screen flex items-center justify-center font-mono">404 // DATA_CORRUPTED</div>;

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6">
      <Helmet>
        <title>{c.title[lang]} | V3000 Case Study</title>
      </Helmet>
      
      <div className="max-w-5xl mx-auto space-y-20">
        <Link to="/cases" className="text-[10px] font-mono uppercase tracking-[0.4em] text-gray-600 hover:text-cyan-500 transition-colors">← Back to Archive</Link>
        
        <header className="space-y-10">
          <div className="space-y-4">
            <div className="font-mono text-xs text-cyan-500 uppercase tracking-widest">{c.client}</div>
            <h1 className="text-5xl md:text-8xl font-display font-light uppercase tracking-tighter italic text-gradient">{c.title[lang]}</h1>
          </div>
          <div className="flex flex-wrap gap-4">
            {c.results.map(r => (
              <span key={r} className="px-6 py-3 border border-white/10 bg-white/5 rounded-none font-mono text-xs uppercase text-white">{r}</span>
            ))}
          </div>
        </header>

        <div className="aspect-[21/9] bg-zinc-900 border border-white/5 overflow-hidden">
          <img src={c.img} className="w-full h-full object-cover" alt="Case detail" />
        </div>

        <div className="grid md:grid-cols-2 gap-20">
          <div className="space-y-12 text-gray-400 font-light text-xl leading-relaxed">
            <p>{c.content[lang]}</p>
          </div>
          <div className="space-y-10 bg-zinc-950 p-12 border border-white/5">
            <div className="space-y-4">
              <h4 className="text-white uppercase font-display font-bold text-sm tracking-widest italic">Challenge</h4>
              <p className="text-gray-500 text-sm">{c.challenge[lang]}</p>
            </div>
            <div className="space-y-4 pt-10 border-t border-white/5">
              <h4 className="text-white uppercase font-display font-bold text-sm tracking-widest italic">Solution</h4>
              <p className="text-gray-500 text-sm">{c.solution[lang]}</p>
            </div>
          </div>
        </div>

        <div className="pt-20 text-center">
          <Link to="/contact" className="px-16 py-8 bg-white text-black text-[10px] uppercase tracking-[0.6em] font-black hover:invert transition-all">Start similar project</Link>
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;
