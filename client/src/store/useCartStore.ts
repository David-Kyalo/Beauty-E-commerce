import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/lib/api';
import { useAuthStore } from './useAuthStore';

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    images: any;
    slug: string;
  };
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  fetchCart: () => Promise<void>;
  addItem: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  totalAmount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      loading: false,

      fetchCart: async () => {
        const { isAuthenticated } = useAuthStore.getState();
        if (!isAuthenticated) return;

        set({ loading: true });
        try {
          const res = await api.get('/cart');
          set({ items: res.data.data.cart.items });
        } catch (error) {
          console.error('Failed to fetch cart:', error);
        } finally {
          set({ loading: false });
        }
      },

      addItem: async (productId, quantity = 1) => {
        const { isAuthenticated } = useAuthStore.getState();
        if (isAuthenticated) {
          await api.post('/cart/items', { productId, quantity });
          await get().fetchCart();
        } else {
          // Local cart logic for guests (optional enhancement)
        }
      },

      updateQuantity: async (itemId, quantity) => {
        const { isAuthenticated } = useAuthStore.getState();
        if (isAuthenticated) {
          await api.put(`/cart/items/${itemId}`, { quantity });
          await get().fetchCart();
        }
      },

      removeItem: async (itemId) => {
        const { isAuthenticated } = useAuthStore.getState();
        if (isAuthenticated) {
          await api.delete(`/cart/items/${itemId}`);
          await get().fetchCart();
        }
      },

      clearCart: async () => {
        const { isAuthenticated } = useAuthStore.getState();
        if (isAuthenticated) {
          await api.delete('/cart');
          set({ items: [] });
        }
      },

      totalAmount: () => {
        return get().items.reduce((total, item) => total + Number(item.product.price) * item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
