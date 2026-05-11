'use client';

import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { useOrderStore } from '@/store/useOrderStore';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function OrdersPage() {
  const { orders, loading, fetchOrders } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID': return 'text-green-600 bg-green-50';
      case 'PENDING': return 'text-amber-600 bg-amber-50';
      case 'FAILED': return 'text-red-600 bg-red-50';
      case 'DELIVERED': return 'text-blue-600 bg-blue-50';
      default: return 'text-charcoal/40 bg-warm-gray';
    }
  };

  return (
    <div className="min-h-screen bg-beauty-bg pt-40">
      <Navbar />

      <div className="container-custom">
        <header className="mb-20">
          <h1 className="display-large mb-6">My Orders</h1>
          <p className="text-charcoal/50">Track your beauty essentials from our door to yours.</p>
        </header>

        {loading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-white rounded-[2rem] animate-pulse" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="glass p-20 text-center rounded-[3rem]">
            <Package size={60} className="text-charcoal/10 mx-auto mb-6" />
            <h3 className="text-2xl font-heading font-bold mb-4">No orders yet</h3>
            <p className="text-charcoal/50 mb-10">Start your journey with us today.</p>
            <Link href="/shop" className="btn-premium">Start Shopping</Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 md:p-12 rounded-[3rem] border border-charcoal/5 shadow-sm group hover:shadow-xl transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-warm-gray flex items-center justify-center">
                      <Package size={28} className="text-charcoal/30" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-charcoal/30 mb-1">Order ID: #{order.id.slice(-6)}</p>
                      <h4 className="font-heading text-xl">KSH {Number(order.totalAmount)}</h4>
                      <p className="text-xs text-charcoal/50 mt-1">{new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 w-full md:w-auto justify-between">
                    <span className={`px-6 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <Link href={`/orders/${order.id}`} className="w-12 h-12 rounded-full border border-charcoal/5 flex items-center justify-center hover:bg-gold hover:text-white transition-all">
                      <ChevronRight size={20} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
