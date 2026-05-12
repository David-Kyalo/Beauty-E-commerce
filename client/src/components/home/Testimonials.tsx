'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    text: "The Radiance Serum has completely transformed my evening ritual. My skin feels deeply nourished and has a natural glow I haven't seen in years.",
    author: "Elena R.",
    role: "Verified Ritualist"
  },
  {
    text: "Minimalist, effective, and beautifully packaged. It's rare to find a brand that balances botanical purity with such high-performance results.",
    author: "Sophia M.",
    role: "Skincare Connoisseur"
  },
  {
    text: "The attention to detail in the formulas is unparalleled. Every product feels like a spa experience in the comfort of my own home.",
    author: "Isabella K.",
    role: "Daily Glow Member"
  }
];

const Testimonials = () => {
  return (
    <section className="py-40 bg-[#FDFBF9] overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-32">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-6 block">Community Voices</span>
          <h2 className="heading-large">Words of Ritual</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="relative p-12 rounded-[3rem] bg-white border border-charcoal/5 shadow-premium group hover:-translate-y-2 transition-all duration-500"
            >
              <div className="text-gold/20 absolute top-8 right-12 group-hover:text-gold transition-colors duration-500">
                <Quote size={48} />
              </div>
              
              <div className="relative z-10">
                <p className="text-xl font-heading leading-relaxed text-charcoal/80 mb-12 italic">
                  "{testimonial.text}"
                </p>
                <div className="h-[1px] w-12 bg-gold/30 mb-6" />
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-charcoal">{testimonial.author}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-charcoal/30 font-bold mt-1">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
