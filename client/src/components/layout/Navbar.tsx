'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore } from '@/store/useCartStore';
import { ShoppingBag, User, Search, Menu, X, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Pages with dark hero backgrounds that need light navbar text
const darkHeroPages = ['/our-story'];

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { items } = useCartStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isDarkHero = darkHeroPages.includes(pathname);
  const useLightText = isDarkHero && !isScrolled;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass py-4' : 'bg-transparent py-8'} ${useLightText ? 'text-cream' : ''}`}>
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className={`text-xl sm:text-2xl md:text-3xl font-heading font-bold tracking-tighter group ${useLightText ? 'text-cream' : ''}`}>
          PEACHY CHERIE<span className={`${useLightText ? 'text-gold' : 'text-gold'} group-hover:text-charcoal transition-colors duration-500`}>.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-12">
          {['Shop', 'Categories', 'Our Story', 'Contact'].map((item) => (
            <Link 
              key={item} 
              href={`/${item.toLowerCase().replace(' ', '-')}`}
              className="text-[10px] uppercase tracking-[0.3em] font-bold hover:text-gold transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
          <button className="hover:text-gold transition-colors">
            <Search size={22} strokeWidth={1.5} />
          </button>
          
          <Link href="/cart" className="relative group">
            <ShoppingBag size={22} strokeWidth={1.5} className="group-hover:text-gold transition-colors" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {items.length}
              </span>
            )}
          </Link>

          <div className="hidden md:block">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link href="/orders" className="hover:text-gold transition-colors flex items-center gap-2">
                  <User size={22} strokeWidth={1.5} />
                  <span className="text-[10px] uppercase tracking-widest font-bold">{user?.name?.split(' ')[0]}</span>
                </Link>
                <button onClick={logout} className="hover:text-red-500 transition-colors">
                  <LogOut size={18} strokeWidth={1.5} />
                </button>
              </div>
            ) : (
              <Link href="/login" className="btn-premium px-8 py-3 text-[10px]">Login</Link>
            )}
          </div>

          <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden hover:text-gold transition-colors">
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 glass-dark z-[100] flex flex-col p-12 text-white"
          >
            <button onClick={() => setIsMobileMenuOpen(false)} className="self-end mb-20 hover:rotate-90 transition-transform duration-500">
              <X size={40} strokeWidth={1} />
            </button>
            <div className="flex flex-col gap-10">
              {['Shop', 'Categories', 'Our Story', 'Contact'].map((item) => (
                <Link 
                  key={item} 
                  href={`/${item.toLowerCase().replace(' ', '-')}`}
                  className="text-4xl font-heading font-bold hover:text-gold transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
