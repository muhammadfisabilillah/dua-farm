"use client";

import { useState } from "react";
import { useCartStore } from "../store/cartStore"; // Memanggil otak Zustand

export default function ProductCard({ product }: { product: any }) {
  const [isAdded, setIsAdded] = useState(false);
  
  // Mengambil fungsi addItem dari Zustand
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    // Mengeksekusi fungsi Zustand untuk menyimpan data ke global state!
    addItem(product);
    
    setIsAdded(true);
    
    // Efek visual tombol
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
      
      <div className="h-56 w-full relative bg-gray-200 flex items-center justify-center overflow-hidden">
        <span className="text-gray-400 text-sm">Tempat Foto Nanti</span>
        {!product.isReady && (
          <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            Stok Habis
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="text-xs font-extrabold text-green-600 mb-2 uppercase tracking-wider">
          {product.category?.name || 'Kategori'}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-6 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <span className="text-2xl font-black text-gray-900">
            Rp {product.price.toLocaleString('id-ID')}
          </span>
          <button 
            onClick={handleAddToCart}
            disabled={!product.isReady || isAdded}
            className={`py-2 px-5 rounded-lg font-bold transition-colors duration-300 ${
              isAdded ? 'bg-gray-800 text-white scale-95' :
              product.isReady 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isAdded ? 'Masuk ✓' : 'Pesan'}
          </button>
        </div>
      </div>

    </div>
  );
}
