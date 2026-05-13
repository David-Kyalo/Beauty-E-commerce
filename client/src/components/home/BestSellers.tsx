'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Eye } from 'lucide-react';
import api from '@/lib/api';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';

const BestSellers = () => {
  const [products, setProducts] = useState<any[]>([]);
  const { addItem } = useCartStore();

  useEffect(() => {
    api.get('/products?limit=3').then(res => setProducts(res.data.data.products));
  }, []);

  return (
    <section className="py-24 md:py-40 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12 mb-16 md:mb-32">
          <div className="max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-4 block">Most Loved</span>
            <h2 className="heading-large mb-6 md:mb-8 text-3xl sm:text-4xl md:text-5xl">The Best Sellers</h2>
            <p className="text-charcoal/60 font-light leading-relaxed">
              Our community's favorites, chosen for their transformative results and luxurious textures.
            </p>
          </div>
          <Link href="/shop" className="btn-outline-premium group text-[10px] px-8 py-3 md:px-10 md:py-4">
            View All Products <span className="inline-block group-hover:translate-x-2 transition-transform ml-2">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              <div className="relative aspect-[3/4] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden bg-warm-gray mb-6 md:mb-10 shadow-premium">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-charcoal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Actions */}
                <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex gap-3 md:gap-4 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                  <button 
                    onClick={() => addItem(product.id)}
                    className="flex-1 bg-white text-charcoal py-4 md:py-5 rounded-2xl md:rounded-3xl text-[9px] md:text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 md:gap-3 hover:bg-gold hover:text-white transition-all shadow-2xl"
                  >
                    <ShoppingBag size={16} /> Add To Cart
                  </button>
                  <Link 
                    href={`/shop/${product.slug}`}
                    className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-md rounded-2xl md:rounded-3xl flex items-center justify-center text-white hover:bg-white hover:text-charcoal transition-all shadow-2xl"
                  >
                    <Eye size={20} />
                  </Link>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-10 right-10 glass px-4 py-2 rounded-full flex items-center gap-2">
                  <Star size={12} className="fill-gold text-gold" />
                  <span className="text-[10px] font-bold text-charcoal">4.9</span>
                </div>
              </div>

              <Link href={`/shop/${product.slug}`} className="text-center block">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-4">{product.category.name}</p>
                <h3 className="text-2xl font-heading mb-4 group-hover:text-gold transition-colors duration-500">{product.name}</h3>
                <p className="text-charcoal/40 font-medium tracking-[0.1em] text-lg">KSH {product.price.toLocaleString()}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
