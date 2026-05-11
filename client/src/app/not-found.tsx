'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center">
      <Navbar />
      
      <main className="container-custom flex flex-col items-center text-center mt-20">
        <div className="relative flex items-center justify-center mb-12">
          {/* Large 404 with Orange */}
          <span className="text-[25vw] md:text-[18vw] font-bold text-[#6D4C41] leading-none select-none">
            4
          </span>
          <div className="w-[22vw] md:w-[15vw] mx-[-2vw] relative z-10">
            <img 
              src="/orange.png" 
              alt="0" 
              className="w-full h-auto rounded-full"
            />
            {/* Reflection */}
            <div className="absolute top-[100%] left-0 w-full opacity-[0.05] blur-[2px] scale-y-[-0.8] grayscale origin-top">
              <img src="/orange.png" alt="" className="w-full h-auto rounded-full" />
            </div>
          </div>
          <span className="text-[25vw] md:text-[18vw] font-bold text-[#6D4C41] leading-none select-none">
            4
          </span>
        </div>

        <p className="text-charcoal/50 text-sm md:text-base max-w-md mb-12 leading-relaxed">
          The page you're looking for doesn't exist, was moved, or never existed in the first place.
        </p>

        <Link 
          href="/" 
          className="bg-[#1A1A1A] text-white px-12 py-5 text-sm font-bold tracking-widest uppercase flex items-center gap-3 hover:bg-gold transition-colors duration-500 group"
        >
          Return Home <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>
      </main>

      <footer className="mt-auto py-12 text-[#6D4C41]/30 text-[10px] uppercase tracking-[0.4em] font-bold">
        © 2026 PEACHY CHERIE PREMIUM BEAUTY.
      </footer>
    </div>
  );
}
