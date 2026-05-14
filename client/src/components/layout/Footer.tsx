'use client';

import Link from 'next/link';
import { Facebook, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="w-full">
      {/* Top Section: Newsletter */}
      <div className="bg-footer-top text-white py-16 md:py-24">
        <div className="container-custom text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading mb-6"
          >
            Subscribe for <span className="italic font-light opacity-90">Beauty Tips & Offers</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-sm md:text-base max-w-2xl mx-auto mb-12 font-light tracking-wide"
          >
            Join our inner circle and receive curated skincare rituals, early access to new collections, and exclusive beauty insights.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-xl mx-auto flex items-center p-1 border border-white/20 rounded-full group focus-within:border-white/40 transition-all"
          >
            <input 
              type="email" 
              placeholder="Your Email" 
              className="bg-transparent border-none outline-none flex-1 px-8 py-4 text-sm placeholder:text-white/40"
            />
            <button className="bg-white text-footer-top px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-footer-gold hover:text-white transition-all">
              Subscribe <ArrowUpRight size={14} />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom Section: Links */}
      <div className="bg-footer-bottom text-white/70 py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 lg:gap-8">
            {/* Brand Column */}
            <div className="space-y-6 md:space-y-8">
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white tracking-tighter">
                Peachy Cherie<span className="text-footer-gold">.</span>
              </h3>
              <p className="text-sm leading-relaxed font-light max-w-xs">
                Powered by nature, backed by science. Gentle on your skin, fierce on results.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-footer-gold hover:text-white transition-all">
                  <Facebook size={18} />
                </Link>
                <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-footer-gold hover:text-white transition-all">
                  <Linkedin size={18} />
                </Link>
                <Link href="https://www.instagram.com/peachycherie.ke/" target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-footer-gold hover:text-white transition-all">
                  <Instagram size={18} />
                </Link>
              </div>
            </div>

            {/* Navigation Column */}
            <div className="space-y-6 md:space-y-8">
              <h4 className="text-lg md:text-xl font-heading text-white font-medium">Navigation</h4>
              <ul className="space-y-3 md:space-y-4 text-sm font-light">
                <li><Link href="/" className="hover:text-footer-gold transition-colors">Home</Link></li>
                <li><Link href="/pages" className="hover:text-footer-gold transition-colors">Pages</Link></li>
                <li><Link href="/about" className="hover:text-footer-gold transition-colors">About Us</Link></li>
                <li><Link href="/services" className="hover:text-footer-gold transition-colors">Services</Link></li>
                <li><Link href="/404" className="hover:text-footer-gold transition-colors">404</Link></li>
              </ul>
            </div>

            {/* Quick Links Column */}
            <div className="space-y-6 md:space-y-8">
              <h4 className="text-lg md:text-xl font-heading text-white font-medium">Quick Links</h4>
              <ul className="space-y-3 md:space-y-4 text-sm font-light">
                <li><Link href="/contact" className="hover:text-footer-gold transition-colors">Contact Us</Link></li>
                <li><Link href="/faq" className="hover:text-footer-gold transition-colors">FAQ</Link></li>
                <li><Link href="/blog" className="hover:text-footer-gold transition-colors">Blog</Link></li>
                <li><Link href="/gallery" className="hover:text-footer-gold transition-colors">Gallery</Link></li>
                <li><Link href="/pricing" className="hover:text-footer-gold transition-colors">Pricing</Link></li>
              </ul>
            </div>

            {/* Information Column */}
            <div className="space-y-6 md:space-y-8">
              <h4 className="text-lg md:text-xl font-heading text-white font-medium">Information</h4>
              <ul className="space-y-4 md:space-y-6 text-sm font-light">
                <li className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Call Us</span>
                  <Link href="tel:+1051152920" className="text-white hover:text-footer-gold transition-colors">(105) 115-2920</Link>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Location</span>
                  <span className="text-white">Mombasa, Kenya</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Email</span>
                  <Link href="mailto:hello@peachycherie.com" className="text-white hover:text-footer-gold transition-colors">hello@peachycherie.com</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-white/5 text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/20">
              © 2026 PEACHY CHERIE PREMIUM BEAUTY. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
