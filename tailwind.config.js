/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palet desain: peternakan sekala rumahan (netral krem dengan aksen meranti)
        farm: {
          cream: '#F9F7F4',
          surface: '#FFFFFF',
          ink: '#1F2937',
          muted: '#6B7786',
          line: '#E8DFD3',
          accent: '#C9521E',
          accentHover: '#A54218',
          accentSoft: '#F7E8DE',
        },
      },
    },
  },
  plugins: [],
};
