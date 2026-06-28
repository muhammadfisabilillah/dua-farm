// src/app/page.tsx
import ProductCard from '../components/ProductCard';
import CartDrawer from '../components/CartDrawer';

// Fungsi ini bertugas memanggil API products yang kamu buat di Langkah 4
async function getProducts() {
  // Catatan: Gunakan URL localhost saat development.
  const res = await fetch('http://localhost:3000/api/products', { 
    cache: 'no-store' // Agar data selalu segar (tidak di-cache) setiap kali di-refresh
  });
  
  if (!res.ok) {
    throw new Error('Gagal mengambil data produk');
  }
  
  return res.json();
}

export default async function Home() {
  // Mengeksekusi fungsi pemanggilan API
  const response = await getProducts();
  const products = response.data;

  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      <CartDrawer />
      
      {/* 1. HERO SECTION (Company Profile) */}
      <section className="bg-green-700 text-white py-24 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Selamat Datang di DUA FARM
        </h1>
        <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-green-100">
          Pusat peternakan unggas terpercaya. Kami menyediakan ayam pedaging, ayam petelur, dan telur segar berkualitas langsung dari kandang untuk memenuhi kebutuhan UMKM dan rumah tangga Anda.
        </p>
        <a 
          href="#katalog" 
          className="bg-white text-green-700 font-bold py-3 px-8 rounded-full hover:bg-green-50 transition-colors shadow-lg"
        >
          Lihat Katalog Produk
        </a>
      </section>

      {/* 2. KATALOG SECTION */}
      <section id="katalog" className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Katalog Produk Tersedia
        </h2>
        
        {/* Grid Card Produk menggunakan Component Interaktif */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
    </main>
  );
}
