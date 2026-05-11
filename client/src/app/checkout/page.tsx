'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore } from '@/store/useCartStore';
import { useOrderStore } from '@/store/useOrderStore';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { Loader2, Phone, MapPin, CreditCard, CheckCircle2, XCircle } from 'lucide-react';

const checkoutSchema = z.object({
  phoneNumber: z.string().regex(/^(254|0)(7|1)\d{8}$/, 'Invalid Kenyan phone number (e.g. 0712345678)'),
  street: z.string().min(3, 'Street is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { user, isAuthenticated } = useAuthStore();
  const { items, totalAmount, clearCart } = useCartStore();
  const { createOrder } = useOrderStore();
  const router = useRouter();
  
  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'success' | 'failed'>('details');
  const [orderId, setOrderId] = useState<string | null>(null);
  const [polling, setPolling] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      phoneNumber: '',
    }
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/checkout');
    }
    if (items.length === 0 && step === 'details') {
      router.push('/shop');
    }
  }, [isAuthenticated, items]);

  const onInitiateOrder = async (data: CheckoutForm) => {
    try {
      setStep('payment');
      // 1. Create the order
      const order = await createOrder({
        street: data.street,
        city: data.city,
        state: data.state,
        country: 'Kenya'
      });
      setOrderId(order.id);
      
      // 2. Initiate STK Push
      await api.post('/payments/mpesa/stkpush', {
        orderId: order.id,
        phoneNumber: data.phoneNumber,
        amount: totalAmount()
      });
      
      setStep('processing');
      startPolling(order.id);
    } catch (error) {
      setStep('details');
    }
  };

  const startPolling = async (id: string) => {
    setPolling(true);
    let attempts = 0;
    const maxAttempts = 20; // Poll for ~60 seconds

    const interval = setInterval(async () => {
      try {
        const res = await api.get(`/orders/${id}`);
        const status = res.data.data.order.status;

        if (status === 'PAID') {
          clearInterval(interval);
          setPolling(false);
          setStep('success');
          clearCart();
        } else if (status === 'FAILED' || attempts >= maxAttempts) {
          clearInterval(interval);
          setPolling(false);
          setStep('failed');
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
      attempts++;
    }, 3000);
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-beauty-bg px-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass max-w-md w-full p-12 text-center rounded-[3rem]">
          <CheckCircle2 size={80} className="text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-heading font-bold mb-4">Payment Successful!</h1>
          <p className="text-charcoal/60 mb-8">Thank you for your purchase. Your order is being prepared.</p>
          <button onClick={() => router.push('/orders')} className="btn-premium w-full">View My Orders</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beauty-bg py-32">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Form Side */}
          <div>
            <h1 className="text-4xl font-heading font-bold mb-12">Checkout</h1>
            
            <AnimatePresence mode="wait">
              {step === 'details' || step === 'payment' ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleSubmit(onInitiateOrder)} 
                  className="space-y-8"
                >
                  <div className="bg-white p-8 rounded-[2rem] border border-charcoal/5 shadow-sm">
                    <h3 className="flex items-center gap-3 text-lg font-bold mb-6">
                      <MapPin size={20} className="text-gold" /> Shipping Address
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 ml-4">Street Address</label>
                        <input {...register('street')} className="w-full px-6 py-4 rounded-full bg-warm-gray/30 border-none outline-none focus:ring-2 ring-gold/20" placeholder="e.g. 123 Ngong Road" />
                        {errors.street && <p className="text-red-500 text-[10px] mt-1 ml-4">{errors.street.message}</p>}
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 ml-4">City</label>
                        <input {...register('city')} className="w-full px-6 py-4 rounded-full bg-warm-gray/30 border-none outline-none focus:ring-2 ring-gold/20" placeholder="Nairobi" />
                        {errors.city && <p className="text-red-500 text-[10px] mt-1 ml-4">{errors.city.message}</p>}
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 ml-4">State / County</label>
                        <input {...register('state')} className="w-full px-6 py-4 rounded-full bg-warm-gray/30 border-none outline-none focus:ring-2 ring-gold/20" placeholder="Nairobi" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-[2rem] border border-charcoal/5 shadow-sm">
                    <h3 className="flex items-center gap-3 text-lg font-bold mb-6">
                      <Phone size={20} className="text-gold" /> M-Pesa Payment
                    </h3>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 ml-4">M-Pesa Phone Number</label>
                      <input {...register('phoneNumber')} className="w-full px-6 py-4 rounded-full bg-warm-gray/30 border-none outline-none focus:ring-2 ring-gold/20" placeholder="07XXXXXXXX" />
                      {errors.phoneNumber && <p className="text-red-500 text-[10px] mt-1 ml-4">{errors.phoneNumber.message}</p>}
                      <p className="text-[10px] text-charcoal/40 mt-3 ml-4 italic">You will receive an STK Push on this phone to enter your PIN.</p>
                    </div>
                  </div>

                  <button type="submit" className="btn-premium w-full py-5 text-base">
                    {step === 'payment' ? 'Confirming Order...' : 'Pay with M-Pesa'}
                  </button>
                </motion.form>
              ) : step === 'processing' ? (
                <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass p-12 text-center rounded-[3rem]">
                  <Loader2 size={48} className="animate-spin text-gold mx-auto mb-6" />
                  <h3 className="text-2xl font-heading font-bold mb-4">Awaiting Payment...</h3>
                  <p className="text-charcoal/60 mb-8">Please check your phone and enter your M-Pesa PIN to complete the transaction.</p>
                  <div className="w-full bg-warm-gray h-2 rounded-full overflow-hidden">
                    <motion.div className="bg-gold h-full" animate={{ x: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }} />
                  </div>
                </motion.div>
              ) : (
                <motion.div key="failed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass p-12 text-center rounded-[3rem]">
                  <XCircle size={60} className="text-red-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-heading font-bold mb-4">Payment Failed</h3>
                  <p className="text-charcoal/60 mb-8">We couldn't confirm your payment. Please try again or use a different number.</p>
                  <button onClick={() => setStep('details')} className="btn-premium w-full">Try Again</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Summary Side */}
          <div className="lg:sticky lg:top-32 h-fit">
            <div className="glass p-10 rounded-[3rem]">
              <h3 className="text-2xl font-heading font-bold mb-8">Order Summary</h3>
              <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-warm-gray rounded-2xl overflow-hidden flex-shrink-0">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold line-clamp-1">{item.product.name}</h4>
                      <p className="text-[10px] text-charcoal/40 uppercase tracking-widest mt-1">Qty: {item.quantity}</p>
                      <p className="text-sm font-bold text-gold mt-1">KSH {Number(item.product.price) * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4 pt-8 border-t border-charcoal/5">
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal/60">Subtotal</span>
                  <span className="font-bold">KSH {totalAmount()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal/60">Shipping</span>
                  <span className="font-bold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-xl font-heading font-bold pt-4">
                  <span>Total</span>
                  <span className="text-gold">KSH {totalAmount()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
