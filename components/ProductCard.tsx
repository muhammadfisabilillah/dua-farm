"use client";

import { useState } from "react";
import { useCartStore } from "../store/cartStore";

// Peta nama produk → gambar utama yang ada di public/images
const LOCAL_IMAGE_MAP: Record<string, string> = {
  "Ayam Broiler Super": "/images/boiler.jpg",
  "Ayam Joper Jantan": "/images/ayam%20jantan.jpg",
  "Pullet Ayam Isa Brown": "/images/pullet.jpg",
  "Telur Ayam Negeri (Per Kg)": "/images/telur.jpg",
};

function ProductImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 grid place-items-center bg-[#EFEAE1]">
        <svg className="w-10 h-10 text-[#B8A893]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
          <path d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8.5z" />
          <path d="M9 21v-6h6v6" />
        </svg>
        <span className="sr-only">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      onError={() => setFailed(true)}
    />
  );
}

export default function ProductCard({ product }: { product: any }) {
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const imageUrl =
    LOCAL_IMAGE_MAP[product.name] || product.imageUrl || "/images/boiler.jpg";

  const handleAddToCart = () => {
    addItem(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Detail dari data produk, hanya ditampilkan kalau tersedia
  const details = [
    product.breed && { label: 'Ras', value: product.breed },
    product.age && { label: 'Umur', value: product.age },
    product.weight && { label: 'Berat', value: product.weight },
    product.gender && { label: 'Jenis', value: product.gender },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="group flex flex-col bg-farm-surface border border-farm-line">
      <div className="relative h-56 w-full overflow-hidden bg-[#EFEAE1]">
        <ProductImage src={imageUrl} alt={product.name} />
        {!product.isReady && (
          <span className="absolute top-3 right-3 bg-[#8C2F1C] text-white text-[11px] font-semibold px-3 py-1">
            Stok habis
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-farm-accent mb-2">
          {product.category?.name || 'Produk'}
        </span>
        <h3 className="font-display text-xl font-bold text-farm-ink leading-snug mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-farm-muted leading-relaxed mb-4">
          {product.description}
        </p>

        {details.length > 0 && (
          <div className="flex flex-wrap gap-x-5 gap-y-1 border-y border-farm-line py-3 mb-4">
            {details.map((detail, i) => (
              <span key={i} className="text-xs text-farm-muted">
                <span className="font-semibold text-farm-ink/70">{detail.label}:</span> {detail.value}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-end justify-between gap-4 mt-auto pt-2">
          <div>
            <div className="text-[11px] text-farm-muted mb-0.5">Harga per satuan</div>
            <div className="text-xl md:text-2xl font-bold text-farm-ink whitespace-nowrap">
              Rp {product.price.toLocaleString('id-ID')}
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!product.isReady || isAdded}
            className={`px-5 py-3 text-sm font-semibold transition-colors shrink-0 ${
              isAdded
                ? 'bg-farm-ink text-white cursor-default'
                : product.isReady
                  ? 'bg-farm-accent text-white hover:bg-farm-accentHover'
                  : 'bg-[#E8E2D8] text-[#8A8378] cursor-not-allowed'
            }`}
          >
            {isAdded ? 'Masuk ✓' : 'Pesan'}
          </button>
        </div>
      </div>
    </div>
  );
}
