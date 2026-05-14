'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag, Loader2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { items, fetchCart, updateQuantity, removeItem, totalAmount, loading } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const [updating, setUpdating] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, fetchCart]);

  const handleUpdateQuantity = async (itemId: string, newQty: number) => {
    if (newQty < 1) return;
    setUpdating(itemId);
    try {
      await updateQuantity(itemId, newQty);
    } finally {
      setUpdating(null);
    }
  };

  const handleRemove = async (itemId: string) => {
    try {
      await removeItem(itemId);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
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

  if (loading && items.length === 0) {
    return (
      <div className="min-h-screen bg-beauty-bg pt-40 flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-gold" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-beauty-bg pt-40 flex flex-col items-center justify-center container-custom">
        <div className="w-24 h-24 rounded-full bg-warm-gray flex items-center justify-center mb-8">
          <ShoppingBag size={40} className="text-charcoal/20" />
        </div>
        <h1 className="text-3xl font-heading font-bold mb-4">Your cart is empty</h1>
        <p className="text-charcoal/50 mb-10 text-center max-w-md">
          Looks like you haven't added anything to your cart yet. Explore our collections and find something you'll love.
        </p>
        <Link href="/shop" className="btn-premium px-12">
          Start Shopping
        </Link>
      </div>
    );
  }

  const subtotal = totalAmount();
  const shipping = 300; // Flat rate as per reference image
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-beauty-bg pt-24 md:pt-32 pb-20">
      <div className="container-custom">
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-10 md:mb-16 text-center lg:text-left">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16 items-start">
          
          {/* Cart Table Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-charcoal/5 text-[10px] uppercase tracking-widest font-bold text-charcoal/40">
                    <th className="pb-6">Product</th>
                    <th className="pb-6 text-center">Price</th>
                    <th className="pb-6 text-center">Quantity</th>
                    <th className="pb-6 text-center">Subtotal</th>
                    <th className="pb-6 text-right">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {items.filter(item => item.product).map((item) => {
                      const images = parseImages(item.product.images);
                      return (
                        <motion.tr 
                          key={item.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="border-b border-charcoal/5 group"
                        >
                          {/* Product Info */}
                          <td className="py-8">
                            <Link href={`/shop/${item.product.slug}`} className="flex items-center gap-6 group/item">
                              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white border border-charcoal/5 flex-shrink-0">
                                <img src={images[0]} alt={item.product.name} className="w-full h-full object-cover transition-transform group-hover/item:scale-110" />
                              </div>
                              <span className="font-heading font-bold text-sm leading-tight hover:text-gold transition-colors">
                                {item.product.name}
                              </span>
                            </Link>
                          </td>

                          {/* Price */}
                          <td className="py-8 text-center text-sm font-medium text-charcoal/60">
                            KSH {Number(item.product.price).toLocaleString()}
                          </td>

                          {/* Quantity */}
                          <td className="py-8">
                            <div className="flex items-center justify-center">
                              <div className="flex items-center border border-charcoal/10 rounded-xl overflow-hidden bg-white">
                                <button
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                  className="w-10 h-10 flex items-center justify-center hover:bg-warm-gray transition-colors disabled:opacity-30"
                                  disabled={updating === item.id}
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="w-10 h-10 flex items-center justify-center text-sm font-bold border-x border-charcoal/10">
                                  {updating === item.id ? <Loader2 size={14} className="animate-spin text-gold" /> : item.quantity}
                                </span>
                                <button
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                  className="w-10 h-10 flex items-center justify-center hover:bg-warm-gray transition-colors disabled:opacity-30"
                                  disabled={updating === item.id}
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                            </div>
                          </td>

                          {/* Subtotal */}
                          <td className="py-8 text-center text-sm font-bold text-charcoal">
                            KSH {((Number(item.product.price) || 0) * (Number(item.quantity) || 0)).toLocaleString()}
                          </td>

                          {/* Remove */}
                          <td className="py-8 text-right">
                            <button 
                              onClick={() => handleRemove(item.id)}
                              className="w-10 h-10 rounded-xl bg-warm-gray flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all text-charcoal/30"
                            >
                              <X size={16} />
                            </button>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Coupon & Update Actions */}
            <div className="flex flex-col md:flex-row gap-6 justify-between pt-4">
              <div className="flex gap-4 max-w-md w-full">
                <input 
                  type="text" 
                  placeholder="Coupon code" 
                  className="flex-1 px-6 py-4 rounded-2xl border border-charcoal/10 bg-white text-sm focus:border-gold outline-none transition-colors"
                />
                <button className="bg-warm-gray px-8 py-4 rounded-2xl text-[10px] uppercase tracking-widest font-bold hover:bg-charcoal hover:text-white transition-all whitespace-nowrap">
                  Apply Coupon
                </button>
              </div>
              <button 
                onClick={() => fetchCart()}
                className="bg-white border border-charcoal/10 px-10 py-4 rounded-2xl text-[10px] uppercase tracking-widest font-bold hover:bg-warm-gray transition-all"
              >
                Update Cart
              </button>
            </div>
          </div>

          {/* Cart Totals Sidebar */}
          <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 border border-charcoal/5 shadow-premium">
            <h2 className="text-xl font-heading font-bold mb-8 pb-4 border-b border-charcoal/5">Cart Totals</h2>
            
            <div className="space-y-6 mb-10">
              <div className="flex justify-between text-sm">
                <span className="text-charcoal/40 font-bold uppercase tracking-widest text-[10px]">Subtotal</span>
                <span className="font-bold">KSH {subtotal.toLocaleString()}</span>
              </div>
              
              <div className="space-y-4 border-t border-charcoal/5 pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal/40 font-bold uppercase tracking-widest text-[10px]">Shipping</span>
                  <div className="text-right">
                    <p className="font-bold text-sm mb-1">Flat rate: KSH {shipping}</p>
                    <p className="text-xs text-charcoal/50">Shipping to <span className="font-bold text-charcoal">Nairobi County</span>.</p>
                    <button className="text-[10px] uppercase tracking-widest font-bold text-gold mt-2 hover:underline">Change address</button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-end pt-6 border-t border-charcoal/5">
                <span className="text-charcoal/40 font-bold uppercase tracking-widest text-[10px] mb-2">Total</span>
                <span className="text-3xl font-heading font-bold text-charcoal">
                  KSH {total.toLocaleString()}
                </span>
              </div>
            </div>

            <button 
              onClick={() => router.push('/checkout')}
              className="w-full btn-premium py-6 flex items-center justify-center gap-3"
            >
              Proceed to Checkout
              <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
