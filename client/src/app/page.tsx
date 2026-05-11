'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore } from '@/store/useCartStore';
import api from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import CategorySection from '@/components/home/CategorySection';

export default function Home() {
  const { checkAuth } = useAuthStore();
  const { fetchCart, addItem } = useCartStore();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    checkAuth();
    fetchCart();
    api.get('/products?limit=4').then(res => setProducts(res.data.data.products));
  }, []);

  return (
    <div className="min-h-screen bg-beauty-bg">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="h-screen flex items-center relative overflow-hidden bg-cream/30">
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl"
            >
              <span className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-8 block">Elevate Your Ritual</span>
              <h1 className="display-large mb-10 leading-[1.1]">
                Luxury Skincare for the <br />
                <span className="italic text-gold font-light">Modern Soul</span>
              </h1>
              <p className="text-xl text-charcoal/60 mb-16 max-w-xl leading-relaxed">
                Discover our artisanal collection of plant-powered formulas designed to nourish your skin and inspire your spirit.
              </p>
              <div className="flex flex-wrap gap-8">
                <Link href="/shop" className="btn-premium">Explore Collection</Link>
                <Link href="/about" className="btn-outline-premium group">
                  Our Philosophy <ArrowRight size={18} className="inline ml-2 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* Decorative Elements */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 2 }}
            className="absolute -right-20 top-20 w-[40vw] h-[40vw] rounded-full bg-rose-soft blur-[120px] -z-10" 
          />
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 2.5 }}
            className="absolute left-1/4 bottom-10 w-[30vw] h-[30vw] rounded-full bg-gold-light blur-[100px] -z-10" 
          />
        </section>

        {/* Categories Section */}
        <CategorySection />

        {/* Featured Products */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-28">
              <div className="max-w-xl">
                <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-4 block">Curated Selection</span>
                <h2 className="heading-large">Timeless Favorites</h2>
              </div>
              <Link href="/shop" className="btn-outline-premium text-[10px]">View All Products</Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24">
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <div className="aspect-[4/5] bg-warm-gray rounded-[3rem] overflow-hidden mb-8 relative">
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-charcoal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <button 
                      onClick={() => addItem(product.id)}
                      className="absolute bottom-8 right-8 bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 hover:bg-gold hover:text-white"
                    >
                      <ShoppingBag size={22} strokeWidth={1.5} />
                    </button>
                  </div>
                  <div className="px-4">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-gold font-bold mb-2">{product.category.name}</p>
                    <h4 className="font-heading text-2xl mb-2 group-hover:text-gold transition-colors duration-500">{product.name}</h4>
                    <p className="text-charcoal/40 font-medium tracking-widest text-sm">KSH {product.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      {/* Mini Footer */}
      <footer className="py-20 bg-charcoal text-white/40">
        <div className="container-custom text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold">© 2026 PEACHY CHERIE PREMIUM BEAUTY. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}
