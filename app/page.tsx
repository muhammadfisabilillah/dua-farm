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
      
{/* 1. HERO SECTION (Tampilan Baru) */}
<section className="relative bg-gradient-to-br from-green-700 to-green-900 text-white py-24 px-6 text-center overflow-hidden">
  {/* Dekorasi Latar Belakang */}
  <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
    <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
    <div className="absolute top-1/2 right-0 w-64 h-64 bg-green-400 rounded-full blur-3xl"></div>
  </div>

  <div className="relative z-10 max-w-4xl mx-auto">
    <span className="inline-block py-1 px-3 rounded-full bg-green-600/50 text-green-100 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm border border-green-500/30">
      Kualitas Terbaik dari Kandang
    </span>
    <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
      Hasil Peternakan <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-green-100">
        Terpercaya & Higienis
      </span>
    </h1>
    <p className="text-lg md:text-xl mb-12 text-green-100 max-w-2xl mx-auto">
      2 PUTRA FARM hadir memberikan solusi kebutuhan unggas berkualitas. Dikelola secara profesional, langsung dari kandang untuk UMKM dan keluarga Anda.
    </p>
    
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <a 
        href="#katalog" 
        className="bg-white text-green-800 font-bold py-4 px-10 rounded-2xl hover:scale-105 transition-transform shadow-xl"
      >
        Lihat Katalog
      </a>
      <a 
        href="https://wa.me/6285866070448" 
        target="_blank"
        className="bg-green-600/30 text-white font-bold py-4 px-10 rounded-2xl hover:bg-green-600/50 transition-colors border border-green-500/50"
      >
        Hubungi Admin
      </a>

    </div>
  </div>
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

        {/* SECTION LOKASI KANDANG */}
<section className="py-20 px-6 max-w-7xl mx-auto">
  <div className="grid md:grid-cols-2 gap-12 items-center">
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Lokasi 2 PUTRA FARM</h2>
      <p className="text-gray-600 mb-4">
        Kunjungi kami di Ngraho, Sogo, Kec. Kedungtuban, Kabupaten Blora. Kami terbuka untuk kunjungan yang ingin melihat langsung kualitas peternakan kami.
      </p>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h4 className="font-bold text-gray-900 mb-2">Mengapa Memilih DUA FARM?</h4>
        <ul className="text-gray-600 space-y-2 text-sm">
          <li>✅ Lokasi peternakan yang bersih dan terawat.</li>
          <li>✅ Pengiriman cepat ke area sekitar Blora dan sekitarnya.</li>
          <li>✅ Kualitas ayam dan telur terjamin segar setiap hari.</li>
        </ul>
      </div>
    </div>
    
    {/* Iframe Maps dengan styling responsif */}
    <div className="h-80 w-full rounded-2xl overflow-hidden shadow-lg">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3999.84320340092!2d111.49441777504607!3d-7.171264492833544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7761b4a9ecb9c9%3A0x13bd5a4fb37f5349!2sRICATOK!5e1!3m2!1sid!2ssg!4v1782658468966!5m2!1sid!2ssg" 
        width="100%" 
        height="100%" 
        style={{ border: 0 }} 
        allowFullScreen={true} 
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  </div>
</section>

{/* SECTION TENTANG KAMI & SIKLUS KANDANG */}
<section className="py-20 px-6 max-w-7xl mx-auto">
  <div className="grid md:grid-cols-2 gap-12 items-center">
    
    {/* Info Owner dengan Foto */}
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Tempat Foto Owner */}
        <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border-4 border-white ring-2 ring-green-100">
          <img 
            src="/images/owner.jpg" 
            alt="Muhammad Fisabilillah"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Mengenal DUA FARM</h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            DUA FARM didirikan dengan semangat untuk menyediakan produk unggas berkualitas. Kami berkomitmen pada transparansi dan kualitas, memastikan setiap produk yang sampai ke tangan Anda telah melalui proses yang sehat dan higienis.
          </p>
          <h4 className="font-bold text-gray-900">JOKO MULYONO</h4>
          <p className="text-sm text-green-700 font-medium">Founder DUA FARM</p>
        </div>
      </div>
    </div>

    {/* Siklus Kandang */}
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Siklus Produksi Berkualitas</h3>
      <div className="space-y-4">
        {[
          { title: "Pemilihan Bibit", desc: "Pemilihan bibit unggul dengan sertifikasi kesehatan terbaik." },
          { title: "Pemeliharaan Organik", desc: "Pemberian pakan berkualitas dan lingkungan yang terjaga kebersihannya." },
          { title: "Monitoring Kesehatan", desc: "Pengecekan rutin dan vaksinasi oleh tenaga ahli." },
          { title: "Siap Distribusi", desc: "Produk siap dikirim langsung ke rumah/UMKM Anda." }
        ].map((item, index) => (
          <div key={index} className="flex gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
            <span className="font-bold text-green-600">0{index + 1}</span>
            <div>
              <h4 className="font-bold text-gray-900">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

{/* SECTION FAQ */}
<section className="py-20 px-6 max-w-3xl mx-auto">
  <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Pertanyaan Umum (FAQ)</h2>
  <div className="space-y-4">
    {[
      { q: "Bagaimana cara pembayarannya?", a: "Pembayaran dilakukan via transfer bank setelah pesanan dikonfirmasi oleh admin." },
      { q: "Apakah melayani pengiriman luar kota?", a: "Untuk saat ini kami fokus melayani area Blora dan sekitarnya agar kualitas tetap terjaga." },
      { q: "Apakah ayam dijamin sehat?", a: "Ya, setiap unggas melalui proses monitoring kesehatan dan vaksinasi rutin." }
    ].map((faq, i) => (
      <details key={i} className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <summary className="font-bold cursor-pointer text-gray-900 list-none flex justify-between items-center">
          {faq.q}
          <span className="group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <p className="mt-4 text-gray-600 text-sm">{faq.a}</p>
      </details>
    ))}
  </div>
</section>

      </section>
{/* FLOATING WHATSAPP BUTTON (Posisi Kiri) */}
<a
  href="https://wa.me/628123456789"
  target="_blank"
  className="fixed bottom-6 left-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all z-50 animate-bounce"
>
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.591 5.52 0 10.02-4.5 10.02-10.02 0-5.52-4.5-10.02-10.02-10.02-5.52 0-10.02 4.5-10.02 10.02 0 1.956.566 3.815 1.63 5.442l-1.12 4.116 4.12-1.082z"/>
  </svg>
</a>
    </main>
  );
}
