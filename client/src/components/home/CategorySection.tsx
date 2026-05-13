'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const categories = [
  {
    name: 'Skincare',
    slug: 'skincare',
    description: 'Nourish and revitalize with nature\'s finest.',
    image: 'https://images.unsplash.com/photo-1590156221122-c4462101aa04?auto=format&fit=crop&q=80&w=800',
    gridClass: 'lg:col-span-2'
  },
  {
    name: 'Makeup',
    slug: 'makeup',
    description: 'Enhance your beauty with elegant formulas.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=800',
    gridClass: 'lg:col-span-1'
  },
  {
    name: 'Fragrance',
    slug: 'fragrance',
    description: 'Captivate the senses with timeless scents.',
    image: 'https://images.unsplash.com/photo-1583467875263-d50dec37a88c?auto=format&fit=crop&q=80&w=800',
    gridClass: 'lg:col-span-1'
  },
  {
    name: 'Haircare',
    slug: 'haircare',
    description: 'Luxurious care for radiant, healthy hair.',
    image: 'https://images.unsplash.com/photo-1527799822340-30b0e5131976?auto=format&fit=crop&q=80&w=800',
    gridClass: 'lg:col-span-2'
  }
];

const CategorySection = () => {
  return (
    <section className="section-padding bg-beauty-bg">
      <div className="container-custom">
        <div className="max-w-xl mb-24">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-4 block">The Collections</span>
          <h2 className="heading-large mb-8">Curated for Every Ritual</h2>
          <p className="text-charcoal/60 font-light leading-relaxed">
            Explore our meticulously crafted collections, each designed to address your unique needs with the purity of botanical science.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((category, i) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className={`group relative overflow-hidden rounded-[3rem] aspect-[4/3] lg:aspect-auto ${category.gridClass} h-[400px] md:h-[500px] shadow-premium`}
            >
              <img 
                src={category.image} 
                alt={category.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-3xl font-heading text-white mb-4">{category.name}</h3>
                  <p className="text-white/70 text-sm font-light max-w-xs mb-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    {category.description}
                  </p>
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
      </div>
    </section>
  );
};

export default CategorySection;
