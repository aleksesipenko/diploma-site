/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // LinguaMetrics premium palette
        bg: '#FDFCFB',
        surface: '#FFFFFF',
        'text-primary': '#111827',
        'text-secondary': '#6B7280',
        border: '#E5E7EB',
        accent: '#2563EB', // A deep, academic blue
        'accent-light': '#EFF6FF',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        // Model colors
        gemini: '#3B82F6',
        gigachat: '#10B981',
        claude: '#F59E0B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['Fira Code', 'IBM Plex Mono', 'monospace'],
      },
      borderRadius: {
        'lg': '12px',
        'xl': '20px',
        '2xl': '28px',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0,0,0,0.04)',
        'medium': '0 10px 40px rgba(0,0,0,0.08)',
        'glow': '0 0 20px rgba(37, 99, 235, 0.15)', // Blue glow
      },
      keyframes: {
        slideDown: {
          from: { height: '0', opacity: '0' },
          to: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
        },
        slideUp: {
          from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
          to: { height: '0', opacity: '0' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        slideDown: 'slideDown 0.3s cubic-bezier(0.87, 0, 0.13, 1)',
        slideUp: 'slideUp 0.3s cubic-bezier(0.87, 0, 0.13, 1)',
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
        shimmer: 'shimmer 2s infinite',
      },
    },
  },
  plugins: [],
}
