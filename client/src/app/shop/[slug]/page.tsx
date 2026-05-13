'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { useCartStore } from '@/store/useCartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Heart, Share2, ChevronRight, Star, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { addItem } = useCartStore();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/products/${slug}`);
      setProduct(res.data.data);
    } catch (error) {
      console.error('Failed to fetch product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    setAddingToCart(true);
    try {
      for (let i = 0; i < quantity; i++) {
        await addItem(product.id);
      }
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      // handled by interceptor
    } finally {
      setAddingToCart(false);
    }
  };

  const parseImages = (images: any): string[] => {
    if (Array.isArray(images)) return images;
    try {
      return JSON.parse(images);
    } catch {
      return [images];
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-beauty-bg pt-40 flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-gold" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-beauty-bg pt-40">
        <div className="container-custom text-center py-32">
          <h1 className="text-4xl font-heading font-bold mb-6">Product Not Found</h1>
          <p className="text-charcoal/50 mb-10">The product you're looking for doesn't exist or has been removed.</p>
          <Link href="/shop" className="btn-premium">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const images = parseImages(product.images);
  const inStock = product.stock > 0;

  return (
    <div className="min-h-screen bg-beauty-bg pt-32 pb-20">
      <div className="container-custom">

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-charcoal/40 mb-16">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-gold transition-colors">Shop</Link>
          <ChevronRight size={12} />
          {product.category && (
            <>
              <Link href={`/shop?category=${product.category.slug}`} className="hover:text-gold transition-colors">
                {product.category.name}
              </Link>
              <ChevronRight size={12} />
            </>
          )}
          <span className="text-charcoal/70">{product.name}</span>
        </nav>

        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left: Image Gallery */}
          <div className="space-y-6">
            {/* Main Image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square bg-white rounded-[3rem] overflow-hidden border border-charcoal/5 shadow-sm"
            >
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex gap-4">
                {images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx 
                        ? 'border-gold shadow-lg scale-105' 
                        : 'border-charcoal/5 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="space-y-8">
            {/* Title */}
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold leading-tight mb-6">
                {product.name}
              </h1>

              {/* Price & Stock */}
              <div className="flex items-center gap-6">
                <span className="text-3xl font-heading font-bold text-charcoal">
                  KSH {Number(product.price).toLocaleString()}
                </span>
                <span className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                  inStock 
                    ? 'border-green-300 text-green-700 bg-green-50' 
                    : 'border-red-300 text-red-700 bg-red-50'
                }`}>
                  {inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-charcoal/5" />

            {/* Description */}
            <div className="space-y-4">
              <p className="text-charcoal/70 leading-relaxed text-[15px]">
                {product.description}
              </p>
            </div>

            {/* Key Benefits */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-charcoal/80">
                Key Benefits:
              </h3>
              <ul className="space-y-2">
                {[
                  'Controls oil and shine for a matte finish',
                  'Blurs pores for a smooth, refined look',
                  'Lightweight, non-cakey formula',
                  'Medium, buildable coverage',
                  'Can be worn alone or used to set foundation',
                  'Ideal for normal to oily skin types',
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-charcoal/60 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Ingredients Section */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-charcoal/80">
                Ingredients (Key Highlights):
              </h3>
              <ul className="space-y-2">
                {[
                  { name: 'Niacinamide', highlight: 'Helps visibly minimize enlarged pores' },
                  { name: 'Squalane', highlight: 'Provides weightless hydration' },
                  { name: 'Vitamin E', highlight: 'Antioxidant protection' },
                  { name: 'Silica', highlight: 'Absorbs excess oil for a matte finish' },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-charcoal/60 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                    <span>
                      <strong className="text-charcoal/80">{item.name}</strong> — {item.highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Divider */}
            <div className="h-px bg-charcoal/5" />

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-6">
              {/* Quantity Selector */}
              <div className="flex items-center border border-charcoal/10 rounded-full overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-14 h-14 flex items-center justify-center hover:bg-warm-gray transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="w-14 h-14 flex items-center justify-center text-lg font-bold border-x border-charcoal/10">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-14 h-14 flex items-center justify-center hover:bg-warm-gray transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!inStock || addingToCart}
                className="flex-1 btn-premium py-5 text-sm flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addingToCart ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <ShoppingBag size={18} />
                )}
                {addingToCart ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>

            {/* Category & Actions */}
            <div className="space-y-6 pt-4">
              {product.category && (
                <p className="text-sm text-charcoal/50">
                  <span className="font-bold text-charcoal/70">Category:</span>{' '}
                  <Link href={`/shop?category=${product.category.slug}`} className="text-gold hover:underline">
                    {product.category.name}
                  </Link>
                </p>
              )}

              {/* Wishlist & Share */}
              <div className="flex items-center gap-8 pt-4 border-t border-charcoal/5">
                <button className="flex items-center gap-2 text-sm text-charcoal/60 hover:text-gold transition-colors group">
                  <Heart size={18} className="group-hover:fill-gold" />
                  Add to Wishlist
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success('Link copied!');
                  }}
                  className="flex items-center gap-2 text-sm text-charcoal/60 hover:text-gold transition-colors"
                >
                  <Share2 size={18} />
                  Share Product
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {product.reviews && product.reviews.length > 0 && (
          <section className="mt-32">
            <h2 className="text-3xl font-heading font-bold mb-12">Customer Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {product.reviews.map((review: any) => (
                <div key={review.id} className="bg-white p-8 rounded-[2rem] border border-charcoal/5">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold text-sm">
                      {review.user?.name?.charAt(0) || '?'}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{review.user?.name || 'Anonymous'}</p>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < review.rating ? 'text-gold fill-gold' : 'text-charcoal/10'}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  {review.comment && (
                    <p className="text-charcoal/60 text-sm leading-relaxed">{review.comment}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
