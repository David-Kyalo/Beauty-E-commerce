'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
  {
    title: 'Eyes',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop',
    href: '/shop?category=eyes'
  },
  {
    title: 'Face',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=800&auto=format&fit=crop',
    href: '/shop?category=face'
  },
  {
    title: 'Lips',
    image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?q=80&w=800&auto=format&fit=crop',
    href: '/shop?category=lips'
  },
  {
    title: 'Skin Care',
    image: 'https://images.unsplash.com/photo-1570172234560-969c379bc360?q=80&w=800&auto=format&fit=crop',
    href: '/shop?category=skincare'
  }
];

export default function CategorySection() {
  return (
    <section className="section-padding bg-beauty-bg">
      <div className="container-custom">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading mb-6"
          >
            Our Beauty Products
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-charcoal/60 text-lg md:text-xl leading-relaxed"
          >
            Discover the world of beauty with our carefully crafted products designed to enhance your natural beauty and elevate your skincare and makeup routine.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative group aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer"
            >
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/40 transition-colors duration-500" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                <h3 className="text-3xl md:text-4xl font-heading mb-4 tracking-wide group-hover:scale-105 transition-transform duration-500">
                  {cat.title}
                </h3>
                <Link 
                  href={cat.href}
                  className="relative text-xs uppercase tracking-[0.3em] font-bold py-2 group/link"
                >
                  Shop Now
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform origin-left transition-transform duration-500 group-hover/link:scale-x-110" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
