"use client";

import { useCartStore } from "../store/cartStore";

export default function CartDrawer() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="fixed bottom-6 right-6 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 w-80 z-50">
      <h3 className="font-bold text-lg mb-4 text-gray-900">Keranjang Belanja</h3>
      {items.length === 0 ? (
        <p className="text-gray-500 text-sm">Keranjang kosong.</p>
      ) : (
<>
          {/* Tambahkan class text-gray-900 agar warna lebih gelap/terbaca */}
          <ul className="space-y-3 mb-4 text-gray-900">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between items-center text-sm">
                <span className="font-medium">{item.name} x{item.quantity}</span>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 font-bold ml-2"
                >
                  Hapus
                </button>
              </li>
            ))}
          </ul>
          {/* Ubah text-gray-500 menjadi text-gray-900 untuk total */}
          <div className="border-t pt-4 font-bold text-lg text-gray-900">
            Total: Rp {total.toLocaleString('id-ID')}
          </div>
        </>
      )}
    </div>
  );
}
