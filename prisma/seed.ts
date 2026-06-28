import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Memulai proses seeding data DUA FARM...')

  // 1. Bersihkan data lama jika ada (mencegah error duplikasi)
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  // 2. Buat Kategori Utama
  const katPedaging = await prisma.category.create({
    data: { name: 'Ayam Pedaging', description: 'Ayam berkualitas untuk kebutuhan konsumsi daging' },
  })

  const katPetelur = await prisma.category.create({
    data: { name: 'Ayam Petelur', description: 'Bibit ayam petelur produktif' },
  })

  const katTelur = await prisma.category.create({
    data: { name: 'Telur Segar', description: 'Telur ayam segar langsung dari kandang' },
  })

  console.log('✓ Kategori berhasil dibuat')

  // 3. Buat Produk Ayam dan Telur Dummy
  await prisma.product.createMany({
    data: [
      {
        categoryId: katPedaging.id,
        name: 'Ayam Broiler Super',
        description: 'Ayam broiler sehat, pakan organik, siap potong, daging tebal.',
        price: 35000,
        stock: 150,
        isReady: true,
        breed: 'Broiler',
        age: '35 Hari',
        weight: '1.5 kg - 1.8 kg',
        gender: 'MIXED',
        imageUrl: 'https://images.unsplash.com/photo-1548550387-7476dbcf73b9?q=80&w=600', // Foto placeholder realistis
      },
      {
        categoryId: katPedaging.id,
        name: 'Ayam Joper Jantan',
        description: 'Ayam Jawa Super (Joper) kualitas unggul, pertumbuhan cepat, daging padat seperti ayam kampung asli.',
        price: 65000,
        stock: 80,
        isReady: true,
        breed: 'Joper',
        age: '2 Bulan',
        weight: '0.9 kg - 1.1 kg',
        gender: 'JANTAN',
        imageUrl: 'https://images.unsplash.com/photo-1614950853503-4c919a7ee1d8?q=80&w=600',
      },
      {
        categoryId: katPetelur.id,
        name: 'Pullet Ayam Isa Brown',
        description: 'Siap bertelur, sudah mendapatkan vaksinasi lengkap sesuai usia.',
        price: 85000,
        stock: 50,
        isReady: true,
        breed: 'Isa Brown',
        age: '16 Minggu',
        weight: '1.2 kg',
        gender: 'BETINA',
        imageUrl: 'https://images.unsplash.com/photo-1569254994521-ddb5a7078b66?q=80&w=600',
      },
      {
        categoryId: katTelur.id,
        name: 'Telur Ayam Negeri (Per Kg)',
        description: 'Telur segar pilihan, diambil langsung dari kandang setiap pagi. Isi sekitar 16-17 butir per kg.',
        price: 26000,
        stock: 200,
        isReady: true,
        breed: null,
        age: null,
        weight: '1 kg',
        gender: null,
        imageUrl: 'https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?q=80&w=600',
      },
    ],
  })

  console.log('✓ Produk awal DUA FARM berhasil disuntikkan')
  console.log('Proses seeding selesai dengan sukses!')
}

main()
  .catch((e) => {
    console.error('Terjadi error saat seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })