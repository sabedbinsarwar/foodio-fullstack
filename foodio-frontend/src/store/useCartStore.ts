import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create()(
  persist(
    (set, get: any) => ({
      items: [],
      addItem: (product: any) => set((state: any) => {
        const existing = state.items.find((i: any) => i.id === product.id);
        if (existing) {
          return { items: state.items.map((i: any) => 
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          )};
        }
        return { items: [...state.items, { ...product, quantity: 1 }] };
      }),
      removeItem: (id: number) => set((state: any) => ({
        items: state.items.filter((i: any) => i.id !== id)
      })),
      clearCart: () => set({ items: [] }),
      getTotal: () => get().items.reduce((acc: number, i: any) => acc + (i.price * i.quantity), 0)
    }),
    { name: 'foodio-cart' }
  )
);