// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: ['bg-background', 'text-foreground', 'font-sans'],
  darkMode: 'class', // enables dark mode using a class
  theme: {
    extend: {
      colors: {
        background: '#00eeff',   // Default bg (black)
        foreground: '#f9fafb',   // Default text (light)
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['Fira Code', 'ui-monospace', 'SFMono-Regular'],
      },
    },
  },
  plugins: [],
}
