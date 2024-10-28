/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: { colors: {
			'background-1': 'var(--background-1)',
			'background-2': 'var(--background-2)',
			'button-1': 'var(--button-1)',
			'button-2': 'var(--button-2)',
			'input-1': 'var(--input-1)',
			'color-1': 'var(--color-1)',
			'color-2': 'var(--color-2)',
			'color-3': 'var(--color-3)',
			'color-4': 'var(--color-4)',
		  }}
	},
	plugins: [],
}
