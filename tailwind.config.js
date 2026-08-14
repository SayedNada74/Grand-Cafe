/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cafe: {
          espresso: '#120D0A',
          dark: '#1A130E',
          'surface-dark': '#241C15',
          'card-dark': '#2E231B',
          cream: '#FAF6F0',
          warm: '#F3EBE1',
          'surface-light': '#FFFFFF',
          'card-light': '#FAF7F3',
          amber: '#C68B59',
          gold: '#D4AF37',
          bronze: '#8B5E3C',
          mocha: '#4A3525',
          'muted-light': '#7A6E65',
          'muted-dark': '#B5A79E',
          border: 'rgba(198, 139, 89, 0.15)',
        }
      },
      fontFamily: {
        en: ['Outfit', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
        ar: ['Cairo', 'Alexandria', 'Tajawal', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 10px rgba(74, 53, 37, 0.06)',
        'warm-md': '0 8px 30px rgba(74, 53, 37, 0.12)',
        'warm-lg': '0 20px 40px rgba(18, 13, 10, 0.25)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.2)',
      },
      backgroundImage: {
        'gradient-espresso': 'linear-gradient(180deg, rgba(18,13,10,0.85) 0%, rgba(18,13,10,0.98) 100%)',
        'gradient-cream': 'linear-gradient(180deg, rgba(250,246,240,0.9) 0%, rgba(243,235,225,1) 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #C68B59 100%)',
      }
    },
  },
  plugins: [],
}
