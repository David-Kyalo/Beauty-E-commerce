import { create } from 'zustand';
import api from '@/lib/api';

interface Order {
  id: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  orderItems: any[];
  payment?: {
    status: string;
    checkoutRequestId?: string;
  };
}

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  fetchOrders: () => Promise<void>;
  createOrder: (shippingAddress: any) => Promise<Order>;
  fetchOrderById: (id: string) => Promise<void>;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  currentOrder: null,
  loading: false,

  fetchOrders: async () => {
    set({ loading: true });
    try {
      const res = await api.get('/orders/me');
      set({ orders: res.data.data.orders });
    } finally {
      set({ loading: false });
    }
  },

  createOrder: async (shippingAddress) => {
    set({ loading: true });
    try {
      const res = await api.post('/orders', { shippingAddress });
      const order = res.data.data.order;
      set((state) => ({ orders: [order, ...state.orders], currentOrder: order }));
      return order;
    } finally {
      set({ loading: false });
    }
  },

  fetchOrderById: async (id) => {
    set({ loading: true });
    try {
      const res = await api.get(`/orders/${id}`);
      set({ currentOrder: res.data.data.order });
    } finally {
      set({ loading: false });
    }
  },
}));
