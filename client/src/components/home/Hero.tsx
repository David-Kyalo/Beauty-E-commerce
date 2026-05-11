'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden bg-[#FDFBF9]">
      {/* Background Gradient / Textures */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#F9E3E3]/30 to-transparent" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] font-bold mb-6 block"
          >
            Artisanal Beauty Rituals
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-8xl font-heading leading-[1.1] mb-8 text-[#2D2D2D]"
          >
            Elevate Your <br />
            <span className="italic font-light text-[#D4AF37]">Natural Glow</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-[#2D2D2D]/60 max-w-lg mb-12 leading-relaxed"
          >
            Discover our curated collection of botanical-infused formulas designed to nourish your skin and inspire a moment of daily tranquility.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-8"
          >
            <Link href="/shop" className="btn-premium">
              Shop Now
            </Link>
            <Link href="/about" className="text-[10px] uppercase tracking-widest font-bold text-[#2D2D2D] hover:text-[#D4AF37] transition-colors flex items-center gap-2 group">
              Our Story <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-md aspect-[4/5]">
            {/* Abstract background shape */}
            <motion.div 
              animate={{ 
                rotate: [0, 5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-[#F4E8C1]/40 rounded-[4rem] -rotate-6 scale-95" 
            />
            
            <div className="relative h-full w-full rounded-[4rem] overflow-hidden shadow-premium">
              <img 
                src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1000" 
                alt="Premium Serum" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D2D]/20 to-transparent" />
            </div>

            {/* Floating Info Badge */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-8 -left-8 glass p-6 rounded-3xl shadow-premium max-w-[200px]"
            >
              <p className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold mb-2">Editor's Choice</p>
              <p className="text-sm font-heading font-medium text-[#2D2D2D]">Glow Radiance Serum</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
