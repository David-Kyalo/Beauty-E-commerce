'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const carouselProducts = [
  {
    name: 'Glow Radiance Serum',
    badge: "Editor's Choice",
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1000',
    color: '#F4E8C1'
  },
  {
    name: 'Botanical Body Lotion',
    badge: "New Arrival",
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1000',
    color: '#F9E3E3'
  },
  {
    name: 'Essential Facial Oil',
    badge: "Best Seller",
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=1000',
    color: '#E8B4B8'
  }
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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

        {/* Product Image Carousel */}
        <div className="relative flex flex-col items-center lg:items-end">
          <div className="relative w-full max-w-md aspect-[4/5]">
            {/* Abstract background shape */}
            <motion.div 
              animate={{ 
                rotate: [0, 5, 0],
                scale: [1, 1.05, 1],
                backgroundColor: carouselProducts[currentIndex].color + '40'
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-[4rem] -rotate-6 scale-95 transition-colors duration-1000" 
            />
            
            <div className="relative h-full w-full rounded-[4rem] overflow-hidden shadow-premium">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentIndex}
                  src={carouselProducts[currentIndex].image} 
                  alt={carouselProducts[currentIndex].name} 
                  initial={{ opacity: 0, x: 20, scale: 1.1 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.9 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D2D]/20 to-transparent pointer-events-none" />
            </div>

            {/* Floating Info Badge */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentIndex}
                initial={{ opacity: 0, y: 20, x: -10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: -20, x: 10 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute -bottom-8 -left-8 glass p-6 rounded-3xl shadow-premium max-w-[220px] z-20"
              >
                <p className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold mb-2">
                  {carouselProducts[currentIndex].badge}
                </p>
                <p className="text-sm font-heading font-medium text-[#2D2D2D]">
                  {carouselProducts[currentIndex].name}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="flex gap-3 mt-16 mr-8">
            {carouselProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1 transition-all duration-500 rounded-full ${currentIndex === index ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-[#D4AF37]/20'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

