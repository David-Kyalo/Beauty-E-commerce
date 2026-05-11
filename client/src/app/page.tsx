'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore } from '@/store/useCartStore';
import Hero from '@/components/home/Hero';
import Benefits from '@/components/home/Benefits';
import CategorySection from '@/components/home/CategorySection';
import BestSellers from '@/components/home/BestSellers';
import Testimonials from '@/components/home/Testimonials';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function Home() {
  const { checkAuth } = useAuthStore();
  const { fetchCart } = useCartStore();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    checkAuth();
    fetchCart();
  }, []);

  return (
    <div className="min-h-screen bg-beauty-bg overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gold z-[100] origin-left"
        style={{ scaleX }}
      />

      <main>
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Benefits Section */}
        <Benefits />

        {/* 3. Categories Section */}
        <CategorySection />

        {/* 4. Best Sellers Section */}
        <BestSellers />

        {/* 5. Testimonials Section */}
        <Testimonials />
      </main>
    </div>
  );
}
