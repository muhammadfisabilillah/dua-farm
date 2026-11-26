import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Fungsi GET untuk mengambil semua data produk
export async function GET() {
  try {
    // Prisma dibuat di dalam handler agar build tidak membutuhkan env var database
    const prisma = new PrismaClient();

    const products = await prisma.product.findMany({
      include: {
        category: true, // Perintah ini akan menarik data nama kategori sekaligus
      },
      orderBy: {
        createdAt: 'desc', // Mengurutkan dari produk yang paling baru ditambahkan
      },
    });

    return NextResponse.json({ 
      success: true, 
      data: products 
    });
    
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data produk dari server' }, 
      { status: 500 }
    );
  }
}