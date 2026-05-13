'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import api from '@/lib/api';

// Fallback images for categories that don't have one in the DB
const categoryImages: Record<string, string> = {
  skincare: 'https://images.unsplash.com/photo-1590156221122-c4462101aa04?auto=format&fit=crop&q=80&w=800',
  makeup: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=800',
  fragrance: 'https://images.unsplash.com/photo-1583467875263-d50dec37a88c?auto=format&fit=crop&q=80&w=800',
  haircare: 'https://images.unsplash.com/photo-1527799822340-30b0e5131976?auto=format&fit=crop&q=80&w=800',
  bodycare: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800',
};

const defaultImage = 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/categories')
      .then(res => setCategories(res.data.data.categories))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-beauty-bg pt-40 flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-gold" />
      </div>
    );
  }

  // Alternate grid layouts for visual interest
  const getGridClass = (index: number) => {
    const pattern = [
      'lg:col-span-2', // wide
      'lg:col-span-1', // normal
      'lg:col-span-1', // normal
      'lg:col-span-2', // wide
    ];
    return pattern[index % pattern.length];
  };

  return (
    <div className="min-h-screen bg-beauty-bg pt-32 pb-20">
      <div className="container-custom">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mb-24"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-4 block">
            Browse Collections
          </span>
          <h1 className="heading-large mb-8">Our Categories</h1>
          <p className="text-charcoal/60 font-light leading-relaxed text-lg">
            Explore our meticulously crafted collections, each designed to address your unique beauty needs with the purity of botanical science.
          </p>
        </motion.div>

        {/* Categories Grid */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {categories.map((category, i) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className={`group relative overflow-hidden rounded-[3rem] ${getGridClass(i)} h-[500px] shadow-premium`}
              >
                <img
                  src={category.image || categoryImages[category.slug] || defaultImage}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                <div className="absolute inset-0 p-12 flex flex-col justify-end">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <h3 className="text-3xl font-heading text-white mb-4">{category.name}</h3>
                    {category.description && (
                      <p className="text-white/70 text-sm font-light max-w-xs mb-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                        {category.description}
                      </p>
                    )}
                    <Link
                      href={`/shop?category=${category.slug}`}
                      className="inline-flex items-center gap-3 text-white text-[10px] uppercase tracking-[0.3em] font-bold group/link"
                    >
                      Explore <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover/link:bg-white group-hover/link:text-charcoal transition-all duration-500">
                        <ArrowUpRight size={14} />
                      </div>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <p className="text-charcoal/40 text-lg">No categories found.</p>
            <Link href="/shop" className="btn-premium mt-8 inline-block">Browse All Products</Link>
          </div>
        )}
      </div>
    </div>
  );
}
