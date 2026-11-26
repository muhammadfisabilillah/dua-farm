"use client";

import { useCartStore } from "../store/cartStore";
import { useEffect, useState } from "react";

export default function CartDrawer() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleWhatsAppCheckout = async () => {
    const message = items
      .map((item) => `- ${item.name} (x${item.quantity}): Rp ${(item.price * item.quantity).toLocaleString('id-ID')}`)
      .join('\n');

    const totalText = `Total Belanja: *Rp ${total.toLocaleString('id-ID')}*`;

    const text = `Halo DUA FARM, saya ingin melakukan pemesanan.
Berikut detail pesanan saya:
${message}

${totalText}

Mohon diproses dengan data berikut:
*Nama Penerima:* 
*Alamat Lengkap:* 
*Nomor WhatsApp:* 
*Catatan Tambahan:* 

Terima kasih!`;

    const orderData = {
      customerName: "Pelanggan Web (Data Detail di WA)",
      items: items,
      totalAmount: `Rp ${total.toLocaleString('id-ID')}`
    };

    try {
      await fetch('/api/sync-sheets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      console.log("Pembukuan otomatis berhasil dicatat.");
    } catch (error) {
      console.error("Gagal mencatat pembukuan otomatis:", error);
    }

    // Tautan WhatsApp resmi DUA FARM (format QR)
    const url = `https://wa.me/qr/7XQ6HCW3OFHDK1?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const cartContent = (
    <>
      <div className="flex justify-between items-center pb-4 border-b border-farm-line mb-4">
        <h3 className="font-display font-bold text-lg text-farm-ink">Keranjang Belanja</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 text-farm-muted hover:text-farm-ink transition-colors rounded-full hover:bg-farm-cream"
          aria-label="Tutup keranjang"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-farm-muted text-center py-8">Keranjang masih kosong.</p>
      ) : (
        <>
          <ul className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between items-center text-sm gap-4">
                <span className="text-farm-ink leading-snug">
                  {item.name} <span className="text-farm-muted">x{item.quantity}</span>
                </span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 font-bold text-xs shrink-0"
                >
                  Hapus
                </button>
              </li>
            ))}
          </ul>

          <div className="border-t border-farm-line pt-4 mt-5 mb-4 flex justify-between text-lg font-bold text-farm-ink">
            <span>Total</span>
            <span>Rp {total.toLocaleString('id-ID')}</span>
          </div>

          <div className="grid gap-2">
            <button
              onClick={handleWhatsAppCheckout}
              className="w-full bg-farm-accent hover:bg-farm-accentHover text-white font-bold py-3.5 rounded-xl transition-colors"
            >
              Pesan via WhatsApp
            </button>
            <button
              onClick={() => clearCart()}
              className="w-full border border-farm-line text-farm-muted font-bold py-3 rounded-xl hover:text-farm-ink hover:border-farm-accent transition-colors"
            >
              Kosongkan Keranjang
            </button>
          </div>
        </>
      )}
    </>
  );

  return (
    <>
      {/* Tombol keranjang hanya muncul saat ada item */}
      {items.length > 0 && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-farm-ink text-farm-cream font-bold py-3.5 px-5 rounded-full shadow-lg hover:bg-[#2B3642] transition-colors"
          aria-label={`Buka keranjang, ${items.length} produk`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l3.6 11.6A2 2 0 0 0 10.5 16H18a2 2 0 0 0 1.9-1.4L22 7H6" />
            <circle cx="10" cy="20" r="1.5" fill="currentColor" />
            <circle cx="18" cy="20" r="1.5" fill="currentColor" />
          </svg>
          <span>Keranjang ({items.length})</span>
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-[60]" onClick={() => setIsOpen(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className={`absolute bg-farm-surface shadow-2xl border border-farm-line p-6 ${
              isMobile
                ? 'bottom-0 left-0 right-0 rounded-t-3xl max-h-[85vh] overflow-y-auto'
                : 'top-1/2 right-6 -translate-y-1/2 w-[360px] rounded-2xl'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {cartContent}
          </div>
        </div>
      )}
    </>
  );
}
