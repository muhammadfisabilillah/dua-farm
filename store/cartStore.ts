import { create } from 'zustand';

// Mendefinisikan bentuk data barang di keranjang
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Mendefinisikan fungsi-fungsi yang bisa dilakukan keranjang
interface CartStore {
  items: CartItem[];
  addItem: (product: any) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

// Membuat "otak" Zustand
export const useCartStore = create<CartStore>((set) => ({
  items: [], // Keranjang dimulai dalam keadaan kosong
  
  addItem: (product) => set((state) => {
    // Mengecek apakah ayam/telur ini sudah ada di keranjang
    const existingItem = state.items.find((item) => item.id === product.id);
    
    if (existingItem) {
      // Jika sudah ada, tambah jumlah kuantitasnya saja
      return {
        items: state.items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }
    // Jika belum ada, masukkan sebagai barang baru
    return { 
      items: [...state.items, { id: product.id, name: product.name, price: product.price, quantity: 1 }] 
    };
  }),

  removeItem: (productId) => set((state) => ({
    items: state.items.filter((item) => item.id !== productId),
  })),

  clearCart: () => set({ items: [] }),
}));