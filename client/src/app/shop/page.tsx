'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ShoppingBag, SlidersHorizontal } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const { addItem } = useCartStore();

  useEffect(() => {
    fetchProducts();
    api.get('/categories').then(res => setCategories(res.data.data.categories));
  }, [category]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/products', { params: { search, category } });
      setProducts(res.data.data.products);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-beauty-bg pt-40">
      <div className="container-custom">
        <header className="mb-20">
          <h1 className="display-large mb-6">The Collection</h1>
          <p className="text-charcoal/50 max-w-2xl">Browse our complete range of premium beauty products, meticulously crafted for your daily ritual.</p>
        </header>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-8 mb-20 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/20" size={20} />
            <input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchProducts()}
              className="w-full pl-16 pr-8 py-5 rounded-full bg-white border border-charcoal/5 focus:border-gold outline-none transition-all shadow-sm"
              placeholder="Search products..."
            />
          </div>

          <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 no-scrollbar">
            <button 
              onClick={() => setCategory('')}
              className={`px-8 py-4 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all whitespace-nowrap ${!category ? 'bg-charcoal text-white' : 'bg-white text-charcoal hover:bg-gold/10'}`}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button 
                key={cat.id}
                onClick={() => setCategory(cat.slug)}
                className={`px-8 py-4 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all whitespace-nowrap ${category === cat.slug ? 'bg-charcoal text-white' : 'bg-white text-charcoal hover:bg-gold/10'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] bg-warm-gray rounded-[3rem] mb-6" />
                <div className="h-4 bg-warm-gray rounded w-1/3 mb-4" />
                <div className="h-6 bg-warm-gray rounded w-2/3 mb-4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24">
            <AnimatePresence>
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group"
                >
                  <div className="aspect-[4/5] bg-warm-gray rounded-[3rem] overflow-hidden mb-8 relative">
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <button 
                      onClick={() => addItem(product.id)}
                      className="absolute bottom-8 right-8 bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 hover:bg-gold hover:text-white"
                    >
                      <ShoppingBag size={22} strokeWidth={1.5} />
                    </button>
                  </div>
                  <div className="px-4 text-center">
                    <h4 className="font-heading text-2xl mb-2">{product.name}</h4>
                    <p className="text-gold font-bold tracking-widest text-sm uppercase">KSH {product.price}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
