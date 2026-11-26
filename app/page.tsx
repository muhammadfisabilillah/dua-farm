// src/app/page.tsx
import ProductCard from '../components/ProductCard';
import CartDrawer from '../components/CartDrawer';
import { headers } from 'next/headers';

// Fungsi ini bertugas memanggil API products yang kamu buat di Langkah 4
async function getProducts() {
  // Gunakan URL absolut karena fetch di Server Component (Node.js) tidak mendukung relative URL
  const headersList = headers();
  const host = headersList.get('host');
  const protocol = host?.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;
  const res = await fetch(`${baseUrl}/api/products`, {
    cache: 'no-store', // Agar data selalu segar (tidak di-cache) setiap kali di-refresh
  });

  if (!res.ok) {
    throw new Error('Gagal mengambil data produk');
  }

  return res.json();
}

// Tautan WhatsApp resmi DUA FARM (format QR, bukan nomor telepon)
const WHATSAPP_URL = 'https://wa.me/qr/7XQ6HCW3OFHDK1';

const ADDRESS = 'Ngraho, Sogo, Kec. Kedungtuban, Kabupaten Blora';

const CARE_STEPS = [
  {
    title: 'Bibit dipilih dulu',
    desc: 'Kami mulai dari bibit yang sehat dan jelas asal-usulnya.',
  },
  {
    title: 'Pakan dan air dijaga',
    desc: 'Pakan terukur, air bersih, dan kandang dibersihkan rutin.',
  },
  {
    title: 'Kesehatan dicek tiap hari',
    desc: 'Vaksinasi dan pemeriksaan berjalan sesuai usia unggas.',
  },
];

export default async function Home() {
  const response = await getProducts();
  const products = response.data ?? [];

  return (
    <main className="min-h-screen bg-farm-cream text-farm-ink">
      <CartDrawer />

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-farm-surface/95 backdrop-blur-sm border-b border-farm-line">
        <div className="max-w-6xl mx-auto px-6 md:px-8 h-16 md:h-20 flex items-center justify-between gap-6">
          <a href="/" className="flex items-center gap-3 shrink-0" aria-label="DUA FARM">
            <span className="w-11 h-11 rounded-xl bg-farm-ink flex items-center justify-center shadow-sm">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8.5z" />
                <path d="M9 21v-6h6v6" />
                <path d="M12 5V3" />
              </svg>
            </span>
            <span className="leading-tight">
              <span className="block font-display font-bold text-lg md:text-xl text-farm-ink">DUA FARM</span>
              <span className="block text-[10px] md:text-[11px] font-semibold tracking-[0.18em] uppercase text-farm-accent">
                Peternakan Unggas
              </span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-farm-muted" aria-label="Navigasi utama">
            <a href="#katalog" className="hover:text-farm-accent transition-colors">Katalog</a>
            <a href="#kandang" className="hover:text-farm-accent transition-colors">Kandang</a>
            <a href="#lokasi" className="hover:text-farm-accent transition-colors">Lokasi</a>
            <a href="#faq" className="hover:text-farm-accent transition-colors">FAQ</a>
          </nav>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 shrink-0 bg-farm-accent text-white font-semibold py-2.5 px-4 md:px-6 rounded-full hover:bg-farm-accentHover transition-colors shadow-md text-sm md:text-base"
            aria-label="Pesan via WhatsApp"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M.057 24l1.687-6.163a11.9 11.9 0 0 1-1.588-5.946c.003-6.556 5.339-11.89 11.894-11.89a11.88 11.88 0 0 1 8.413 3.487 11.88 11.88 0 0 1 3.48 8.415c-.003 6.556-5.338 11.891-11.893 11.891a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.59 5.392 1.59 5.52 0 10.02-4.5 10.02-10.02 0-5.52-4.5-10.02-10.02-10.02-5.52 0-10.02 4.5-10.02 10.02 0 1.956.566 3.815 1.63 5.442l-1.12 4.116 4.12-1.082z" />
            </svg>
            <span>Pesan Sekarang</span>
          </a>
        </div>
      </header>

      {/* HERO — foto banner sebagai latar halaman pertama */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundImage: 'url(/images/banner.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-[#101610]/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#101610]/80 via-[#101610]/30 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-6 md:px-8 pt-24 pb-16 md:pt-36 md:pb-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/60 mb-6">
              DUA FARM · Kedungtuban, Blora
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-[4rem] font-bold leading-[1.02] text-white mb-6">
              Ayam dan telur dari kandang kami, sampai ke dapur Anda.
            </h1>
            <p className="text-base md:text-lg text-white/75 max-w-lg leading-relaxed mb-10">
              Kami rawat unggas mulai dari bibit, pakan, sampai pemeriksaan kesehatan. Pesan lewat WhatsApp, kami siapkan dan kirim ke sekitar Blora.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#katalog"
                className="text-center bg-white text-farm-ink font-semibold py-3.5 px-8 rounded-xl hover:bg-white/90 transition-colors"
              >
                Lihat Katalog
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="text-center border border-white/40 text-white font-semibold py-3.5 px-8 rounded-xl hover:bg-white/10 transition-colors"
              >
                Pesan via WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/15">
          <div className="max-w-6xl mx-auto px-6 md:px-8 py-5 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 text-white/70 text-sm">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 shrink-0 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="M12 21s7-8.5 7-14a7 7 0 1 0-14 0c0 5.5 7 14 7 14z" /><circle cx="12" cy="7" r="2.5" />
              </svg>
              Ngraho, Sogo · Kedungtuban
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 shrink-0 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
              </svg>
              Pesanan disiapkan setiap hari
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 shrink-0 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="M4 7h16v10H4z" /><path d="m4 8 8 6 8-6" />
              </svg>
              Balasan cepat lewat WhatsApp
            </div>
          </div>
        </div>
      </section>

      {/* KATALOG */}
      <section id="katalog" className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-12">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-farm-accent mb-3">Katalog</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight">Yang tersedia dari kandang kami</h2>
          </div>
          <p className="text-sm text-farm-muted max-w-sm leading-relaxed">
            Stok berubah mengikuti siklus panen. Silahkan tanya lewat WhatsApp untuk ketersediaan terbaru.
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-sm text-farm-muted">
            Data produk belum tersedia, silahkan cek lagi sebentar ya.
          </p>
        )}
      </section>

      {/* KANDANG & PERAWATAN */}
      <section id="kandang" className="bg-farm-ink text-white">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="relative h-72 md:h-[420px] overflow-hidden rounded-2xl">
            <img src="/images/ayam%20jantan.jpg" alt="Ayam dari kandang DUA FARM" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E8A47F] mb-4">Kandang kami</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-6">
              Kualitasnya kami jaga sendiri, dari hari pertama sampai dikirim.
            </h2>
            <p className="text-sm md:text-base text-white/65 leading-relaxed mb-10 max-w-md">
              Peternakan kami jalankan langsung di Ngraho. Kandang dibersihkan rutin, unggas diperiksa setiap hari, dan pesanan disiapkan setelah kondisi siap kirim.
            </p>
            <div className="divide-y divide-white/10 border-t border-white/10">
              {CARE_STEPS.map((step, i) => (
                <div key={i} className="py-5 flex gap-5">
                  <span className="text-sm font-semibold text-[#E8A47F] tabular-nums">0{i + 1}</span>
                  <div>
                    <h3 className="font-semibold text-base mb-1">{step.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TENTANG PENDIRI */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
          <div className="md:col-span-2">
            <figure>
              <div className="w-full h-72 md:h-80 overflow-hidden rounded-2xl">
                <img src="/images/owner.jpeg" alt="Joko Mulyono, pendiri DUA FARM" className="w-full h-full object-cover" />
              </div>
              <figcaption className="mt-3 text-xs font-semibold tracking-[0.1em] uppercase text-farm-muted">
                Joko Mulyono — pendiri DUA FARM
              </figcaption>
            </figure>
          </div>
          <div className="md:col-span-3">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-farm-accent mb-4">Tentang kami</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-6">
              DUA FARM dijalankan langsung oleh Joko Mulyono.
            </h2>
            <p className="text-sm md:text-base text-farm-muted leading-relaxed mb-6 max-w-xl">
              Mulai dari sekala rumahan, kami fokus pada hal yang bisa kami jaga: bibit yang sehat, pakan yang terukur, dan pengiriman yang jelas. Bila ada yang ingin ditanyakan, langsung saja hubungi kami.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-farm-accent hover:gap-3 transition-all"
            >
              Tanya stok hari ini
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* LOKASI */}
      <section id="lokasi" className="bg-farm-surface border-y border-farm-line">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-farm-accent mb-4">Lokasi</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-10">Datang langsung ke kandang kami</h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-stretch">
            <div className="flex flex-col justify-between gap-8 p-6 md:p-8 bg-farm-cream rounded-2xl border border-farm-line">
              <div>
                <svg className="w-7 h-7 text-farm-accent mb-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <path d="M12 21s7-8.5 7-14a7 7 0 1 0-14 0c0 5.5 7 14 7 14z" /><circle cx="12" cy="7" r="2.5" />
                </svg>
                <p className="font-semibold text-lg md:text-xl text-farm-ink leading-snug mb-2">{ADDRESS}</p>
                <p className="text-sm text-farm-muted leading-relaxed">
                  Kami terima kunjungan setiap hari. Hubungi dulu supaya kami siap menyambut Anda.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-center bg-farm-ink text-white font-semibold py-3.5 px-4 rounded-xl hover:bg-[#2B3642] transition-colors text-sm"
                >
                  Hubungi Kami
                </a>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Blora"
                  target="_blank"
                  rel="noreferrer"
                  className="text-center border border-farm-line text-farm-ink font-semibold py-3.5 px-4 rounded-xl hover:border-farm-accent hover:text-farm-accent transition-colors text-sm"
                >
                  Buka Peta
                </a>
              </div>
            </div>

            <div className="relative min-h-72 md:min-h-full overflow-hidden rounded-2xl border border-farm-line">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3999.84!2d111.49!3d-7.17!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7761b4a9ecb9c9%3A0x13bd5a4fb37f5349!2sDUA%20FARM!5e0!3m2!1sid!2sid!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '100%' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Maps lokasi DUA FARM"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-farm-accent mb-4">Informasi</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-10">Pertanyaan yang sering ditanyakan</h2>
        <div className="border-t border-farm-line">
          {[
            {
              q: 'Apakah DUA FARM melayani luar kota?',
              a: 'Untuk saat ini pengiriman kami fokus di Blora dan sekitarnya, supaya kondisi unggas tetap terjaga sampai tujuan.',
            },
            {
              q: 'Bagaimana cara memesan?',
              a: 'Pilih produk di katalog, lalu kirim pesanan lewat WhatsApp. Admin akan membalas untuk konfirmasi stok, total, dan pengiriman.',
            },
            {
              q: 'Apakah produk dijamin segar?',
              a: 'Setiap unggas dan telur berasal dari kandang kami sendiri, dengan pemeriksaan kesehatan dan kebersihan yang rutin.',
            },
          ].map((faq, i) => (
            <details key={i} className="group border-b border-farm-line">
              <summary className="cursor-pointer list-none py-5 flex justify-between items-center gap-4 font-semibold text-farm-ink">
                <span className="text-sm md:text-base leading-snug">{faq.q}</span>
                <span className="text-xl text-farm-accent group-open:rotate-45 transition-transform leading-none">+</span>
              </summary>
              <p className="pb-5 text-sm text-farm-muted leading-relaxed max-w-xl">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-farm-ink text-white/70">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            <div>
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8.5z" /><path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <p className="font-display text-2xl font-bold text-white mb-2">DUA FARM</p>
              <p className="text-sm leading-relaxed max-w-xs">
                Peternakan unggas sekala rumahan di Kedungtuban, Blora. Dijalankan langsung, dari bibit sampai pengiriman.
              </p>
            </div>

            <div>
              <h3 className="text-xs font-semibold tracking-[0.18em] uppercase text-white/40 mb-4">Menu</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#katalog" className="hover:text-white transition-colors">Katalog produk</a></li>
                <li><a href="#kandang" className="hover:text-white transition-colors">Kandang kami</a></li>
                <li><a href="#lokasi" className="hover:text-white transition-colors">Lokasi</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">Pertanyaan umum</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold tracking-[0.18em] uppercase text-white/40 mb-4">Hubungi</h3>
              <ul className="space-y-3 text-sm">
                <li>{ADDRESS}</li>
                <li>
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    Pesan via WhatsApp →
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-white/40">
            <span>© {new Date().getFullYear()} DUA FARM. Semua hak dilindungi.</span>
            <span>Kedungtuban, Blora · Jawa Tengah</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
