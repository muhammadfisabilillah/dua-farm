"use client";

import { useCartStore } from "../store/cartStore";

export default function CartDrawer() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Ubah fungsi ini menjadi async agar bisa menunggu proses fetch API
  const handleWhatsAppCheckout = async () => {
    const message = items
      .map((item) => `- ${item.name} (x${item.quantity}): Rp ${(item.price * item.quantity).toLocaleString('id-ID')}`)
      .join('\n');
    
    const totalText = `Total Belanja: *Rp ${total.toLocaleString('id-ID')}*`;
    
    // Template pesan dengan panduan isi data diri untuk pelanggan
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

    // --- BAGIAN TAMBAHAN UNTUK INTEGRASI GOOGLE SHEETS ---
    const orderData = {
      // Karena nama detailnya diisi manual oleh user di WA, kita beri penanda default
      customerName: "Pelanggan Web (Data Detail di WA)", 
      items: items, 
      totalAmount: `Rp ${total.toLocaleString('id-ID')}`
    };

    try {
      // Menjalankan sinkronisasi ke Google Sheets di balik layar
      await fetch('/api/sync-sheets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      console.log("Pembukuan otomatis berhasil dicatat.");
    } catch (error) {
      console.error("Gagal mencatat pembukuan otomatis:", error);
    }
    // --------------------------------------------------------
    
    // Ganti nomor di bawah ini dengan nomor WhatsApp admin DUA FARM (format internasional tanpa +)
    const phoneNumber = "6285866070448"; 
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    
    // Setelah data dikirim ke Sheets, arahkan user ke WhatsApp
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 w-80 z-50">
      <h3 className="font-bold text-lg mb-4 text-gray-900">Keranjang Belanja</h3>
      
      {items.length === 0 ? (
        <p className="text-gray-500 text-sm">Keranjang kosong.</p>
      ) : (
        <>
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
          
          <div className="border-t pt-4 font-bold text-lg text-gray-900 mb-4">
            Total: Rp {total.toLocaleString('id-ID')}
          </div>
          
          <button 
            onClick={handleWhatsAppCheckout}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-all shadow-md"
          >
            Pesan via WhatsApp
          </button>
        </>
      )}
    </div>
  );
}
