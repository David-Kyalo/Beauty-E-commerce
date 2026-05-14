'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, Leaf, Sparkles, Shield, ArrowRight } from 'lucide-react';

const values = [
  {
    icon: Leaf,
    title: 'Clean Beauty',
    description: 'Every product we curate is free from harmful chemicals. We believe in the power of nature to transform your skin.',
  },
  {
    icon: Heart,
    title: 'Self-Care First',
    description: 'Beauty is not just about appearance — it\'s a ritual of self-love. We help you create moments of daily tranquility.',
  },
  {
    icon: Sparkles,
    title: 'Curated Quality',
    description: 'We handpick only the finest formulations from trusted brands, so every product you receive exceeds expectations.',
  },
  {
    icon: Shield,
    title: 'Trusted & Safe',
    description: 'All products are dermatologically tested and ethically sourced. Your skin deserves nothing less than the best.',
  },
];

const timeline = [
  {
    year: '2023',
    title: 'The Spark',
    description: 'Peachy Cherie was born from a simple frustration — finding high-quality, affordable beauty products in Kenya shouldn\'t be this hard.',
  },
  {
    year: '2024',
    title: 'Building the Dream',
    description: 'We partnered with trusted global brands and built our platform to bring premium beauty directly to your doorstep.',
  },
  {
    year: '2025',
    title: 'Growing Together',
    description: 'Launching our full e-commerce experience with M-Pesa integration, nationwide delivery, and a community of beauty enthusiasts.',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
};

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-beauty-bg">

      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=1600"
            alt="Our Story"
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/40 to-charcoal/10" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-2xl"
          >
            <span className="text-[11px] uppercase tracking-[0.5em] text-gold font-medium mb-6 block drop-shadow-lg">
              Our Story
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-heading font-light leading-[1.1] mb-6 md:mb-8 drop-shadow-xl" style={{ color: '#FFFFFF', textShadow: '0 2px 30px rgba(0,0,0,0.5)' }}>
              Beauty with <br />
              <span className="italic text-gold">Purpose</span>
            </h1>
            <p className="text-base md:text-lg leading-relaxed max-w-lg font-light" style={{ color: 'rgba(255,255,255,0.95)', textShadow: '0 1px 10px rgba(0,0,0,0.4)' }}>
              We believe every woman deserves access to premium beauty products
              that celebrate her unique glow. That belief is the heart of Peachy Cherie.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 md:py-40 bg-beauty-bg">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
            <motion.div {...fadeUp}>
              <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-4 block">
                Our Mission
              </span>
              <h2 className="text-3xl md:text-5xl font-heading font-light mb-8">
                Bringing Premium Beauty to Every Doorstep
              </h2>
              <p className="text-charcoal/70 leading-relaxed mb-6 text-[15px]">
                Peachy Cherie was founded with a clear vision: to make high-quality, dermatologically
                tested beauty products accessible to every woman in Kenya. We noticed a gap — premium
                beauty was either out of reach or difficult to find locally.
              </p>
              <p className="text-charcoal/70 leading-relaxed mb-10 text-[15px]">
                So we built a bridge. By partnering directly with trusted global and local brands,
                we curate only the finest skincare, makeup, haircare, and fragrance products and
                deliver them straight to you — with the convenience of M-Pesa and the care of a
                brand that truly understands beauty.
              </p>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-4xl font-heading font-light text-gold">500+</p>
                  <p className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold mt-2">Products</p>
                </div>
                <div className="w-px h-16 bg-charcoal/10" />
                <div className="text-center">
                  <p className="text-4xl font-heading font-light text-gold">2K+</p>
                  <p className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold mt-2">Happy Clients</p>
                </div>
                <div className="w-px h-16 bg-charcoal/10" />
                <div className="text-center">
                  <p className="text-4xl font-heading font-light text-gold">47</p>
                  <p className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold mt-2">Counties</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-premium">
                <img
                  src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=800"
                  alt="Our Mission"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <div className="absolute -bottom-8 -left-8 glass p-8 rounded-3xl shadow-premium max-w-[260px]">
                <p className="text-[9px] uppercase tracking-widest text-gold font-bold mb-2">Since 2023</p>
                <p className="text-sm font-heading font-medium">Trusted by beauty enthusiasts across Kenya</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-40 bg-beauty-bg">
        <div className="container-custom">
          <motion.div {...fadeUp} className="max-w-xl mb-24">
            <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-4 block">
              What We Stand For
            </span>
            <h2 className="heading-large mb-8 font-light">Our Values</h2>
            <p className="text-charcoal/60 font-light leading-relaxed">
              Every decision we make is guided by these principles — because beauty should never compromise on integrity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="bg-white rounded-[2.5rem] p-10 border border-charcoal/5 hover:shadow-premium transition-shadow duration-500 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mb-8 group-hover:bg-gold/20 transition-colors">
                  <value.icon size={28} className="text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-heading font-normal mb-4">{value.title}</h3>
                <p className="text-charcoal/50 text-sm leading-relaxed font-light">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / Journey */}
      <section className="py-24 md:py-40 bg-beauty-bg">
        <div className="container-custom">
          <motion.div {...fadeUp} className="max-w-xl mb-24">
            <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-4 block">
              Our Journey
            </span>
            <h2 className="heading-large font-light">How We Got Here</h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-gold/10" />

            <div className="space-y-24">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.8 }}
                  className={`relative flex flex-col md:flex-row items-start gap-12 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Year Dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold border-4 border-white shadow-lg z-10" />

                  {/* Content */}
                  <div className={`ml-20 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-24 md:text-right' : 'md:pl-24'}`}>
                    <span className="text-5xl font-heading font-light text-gold/20 block mb-4">{item.year}</span>
                    <h3 className="text-2xl font-heading font-normal mb-4">{item.title}</h3>
                    <p className="text-charcoal/50 leading-relaxed font-light">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 bg-charcoal text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gold rounded-full blur-[150px]" />
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-gold rounded-full blur-[100px]" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.div {...fadeUp}>
            <span className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-6 block">
              Join the Community
            </span>
            <h2 className="text-5xl md:text-7xl font-heading leading-tight mb-8 max-w-3xl mx-auto">
              Ready to Discover Your <span className="italic font-light text-gold">Perfect Glow</span>?
            </h2>
            <p className="text-white/50 max-w-xl mx-auto mb-14 text-lg leading-relaxed">
              Explore our curated collections and start your journey towards radiant, healthy beauty today.
            </p>
            <Link
              href="/shop"
              className="btn-premium inline-flex items-center gap-3 px-14 py-6 text-sm"
            >
              Shop the Collection
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
