/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        // Your existing brand colors
        "red": '#D00000',
        "black": '#2D2D2D',
        "white": '#EEEEEE',
        "gray": '#474747',
        "medium-jungle": '#0F2C25',
        "grey-green": '#5A706C',
        "quick-silver": '#A6AB9F',
        "bright-grey": '#E9E9E9',
        "jasper": '#D23939',
        
        // New burgundy/red palette for gradients and accents
        red: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7C2D3A', // Main burgundy
          950: '#450A0A',
        },
        
        // Full gray scale
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#030712',
        },
      },
      aspectRatio: {
        '4/5': '4 / 5',
        '3/4': '3 / 4'
      },
      fontSize: {
        14: '14px',
      },
      backgroundColor: {
        'main-bg': '#E9E9E9'
      },
      borderWidth: {
        1: '1px',
      },
      borderColor: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      width: {
        400: '400px',
        760: '760px',
        780: '780px',
        800: '800px',
        1000: '1000px',
        1200: '1200px',
        1400: '1400px',
      },
      height: {
        80: '80px',
      },
      minHeight: {
        590: '590px',
      },
      backgroundImage: {
        'hero-pattern':
          "url('https://demos.wrappixel.com/premium-admin-templates/react/flexy-react/main/static/media/welcome-bg-2x-svg.25338f53.svg')",
      },
    },
  },
  plugins: [],
}