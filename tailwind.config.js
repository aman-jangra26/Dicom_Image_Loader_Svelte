/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  content: ['./src/**/*.{html,svelte,js,ts}'],
  theme: {
    screens: {
      'sm'	:'640px',
      'md'	:'768px',	
      'lg'	:'1024px',	
      'xl'	:'1280px'	,
      '2xl'	:'1536px'
    }
  },
  plugins: [],
  plugins: [require('daisyui')],
 }