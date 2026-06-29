import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, items, totalAmount } = body;

    // 1. Format daftar produk menjadi satu teks yang rapi
    const productDetails = items
      .map((item: any) => `${item.name} (${item.quantity}x)`)
      .join(', ');

    // 2. Konfigurasi Kredensial Google Service Account
    // Kita tambahkan pembersihan teks agar otomatis menghapus tanda kutip yang nyangkut
    const formattedPrivateKey = (process.env.GOOGLE_PRIVATE_KEY || '')
      .replace(/\\n/g, '\n')
      .replace(/"/g, ''); 

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: formattedPrivateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // PENTING: Inisialisasi Google Sheets Client menggunakan auth di atas
    const sheets = google.sheets({ version: 'v4', auth });

    // 3. Masukkan data ke baris paling bawah di Google Sheets
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
      range: 'Sheet1!A:D', // Sesuai kolom: Tanggal, Nama, Produk, Total
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }), // Kolom A: Tanggal & Waktu
            customerName || 'Pelanggan DUA FARM',                             // Kolom B: Nama Klien/Pembeli
            productDetails,                                                  // Kolom C: Detail Produk & Jumlah
            totalAmount                                                      // Kolom D: Total Harga
          ]
        ],
      },
    });

    return NextResponse.json({ success: true, data: response.data });
  } catch (error: any) {
    console.error('Google Sheets Sync Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}