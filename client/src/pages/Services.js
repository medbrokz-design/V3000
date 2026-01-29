import React from 'react';
import { motion } from 'framer-motion';

const servicesDetail = [
  {
    title: "Generative Content Studio",
    ru: "Контент на автомате",
    desc: "SEO blogs, email sequences, ad copy — at scale, on-brand.",
    ruDesc: "Тексты для блога, email, рекламы — быстро, в стиле бренда.",
    icon: "📝"
  },
  {
    title: "AI Visual Design Engine",
    ru: "Дизайн за 5 минут",
    desc: "Social posts, banners, product mockups — generated in seconds.",
    ruDesc: "Посты, баннеры, карточки товаров — генерируем по описанию.",
    icon: "🎨"
  },
  {
    title: "Automated Video Production",
    ru: "Автоматическое видео",
    desc: "Scale Meta & TikTok ads without hiring a creative team.",
    ruDesc: "Создание видео-кампаний и рекламы через нейро-рендеринг.",
    icon: "🎥"
  },
  {
    title: "Smart Ad & Campaign Automation",
    ru: "Умная автоматизация рекламы",
    desc: "AI-generated 500+ ad variants/week + auto A/B testing.",
    ruDesc: "Масштабирование рекламных креативов под тысячи сегментов.",
    icon: "📊"
  },
  {
    title: "Custom AI Agents for Marketing",
    ru: "ИИ-агенты для маркетинга",
    desc: "Your 24/7 marketing assistant for ideation, research, and support.",
    ruDesc: "Автономные ИИ-сотрудники в вашем маркетинге.",
    icon: "🤖"
  },
  {
    title: "RAG-Powered Brand Knowledge Systems",
    ru: "База знаний на ИИ",
    desc: "Accurate, hallucination-free AI trained on your data.",
    ruDesc: "ИИ на ваших данных без галлюцинаций.",
    icon: "🔗"
  }
];

const Services = ({ lang }) => {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-20">
        <header className="space-y-8 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-light uppercase tracking-tighter italic text-gradient"
          >
            {lang === 'ru' ? 'Маркетинг на ИИ, который масштабируется' : 'AI-Powered Marketing That Scales'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 font-light leading-relaxed"
          >
            {lang === 'ru' 
              ? 'Мы не просто используем ИИ — мы создаём кастомные генеративные системы, которые автоматизируют ваш контент, персонализируют коммуникации и ускоряют рост.'
              : 'We don’t just use AI — we build custom generative systems that automate your content, personalize your messaging, and accelerate growth.'}
          </motion.p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {servicesDetail.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-12 bg-black space-y-8 group hover:bg-zinc-950 transition-colors"
            >
              <div className="text-4xl opacity-20 group-hover:opacity-100 transition-opacity">{s.icon}</div>
              <h3 className="text-xl font-display font-light uppercase tracking-widest leading-tight">
                {lang === 'ru' ? s.ru : s.title}
              </h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                {lang === 'ru' ? s.ruDesc : s.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center pt-20">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-16 py-8 bg-white text-black text-[10px] uppercase tracking-[0.6em] font-black hover:invert transition-all"
          >
            {lang === 'ru' ? 'Забронировать стратегическую сессию —→' : 'Book a Strategy Session —→'}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Services;
