'use client';

import { motion } from 'framer-motion';
import { Leaf, Heart, ShieldCheck, Truck } from 'lucide-react';

const benefits = [
  {
    icon: Leaf,
    title: '100% Organic',
    description: 'Pure, plant-based ingredients sourced responsibly from nature.'
  },
  {
    icon: Heart,
    title: 'Cruelty-Free',
    description: 'We never test on animals and ensure all partners follow suit.'
  },
  {
    icon: ShieldCheck,
    title: 'Dermatologist Approved',
    description: 'Scientifically formulated and tested for all skin types.'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Global express shipping with premium eco-friendly packaging.'
  }
];

const Benefits = () => {
  return (
    <section className="py-32 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group text-center lg:text-left"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#F9E3E3]/30 flex items-center justify-center text-[#D4AF37] mb-8 mx-auto lg:mx-0 group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-500">
                <benefit.icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-heading font-medium text-[#2D2D2D] mb-4 group-hover:text-[#D4AF37] transition-colors">
                {benefit.title}
              </h3>
              <p className="text-sm text-[#2D2D2D]/50 leading-relaxed font-light">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
