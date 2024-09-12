/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Poppins', 'sans-serif'],
      },
      colors: {
        'primary-background': 'rgb(var(--primary-background) / <alpha-value>)',
        'secondary-background': 'rgb(var(--secondary-background) / <alpha-value>)',
        'primary-text': 'rgb(var(--primary-text) / <alpha-value>)',
        'secondary-text': 'rgb(var(--secondary-text) / <alpha-value>)',
        'accent-text': 'rgb(var(--accent-text) / <alpha-value>)',
        'accent-background': 'rgb(var(--accent-background) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
