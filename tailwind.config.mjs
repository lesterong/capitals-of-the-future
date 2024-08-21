import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontWeight: {
			...defaultTheme.fontWeight,
			normal: '325',
			bold: '625',
		},
		extend: {
			fontFamily: {
        sans: ['Plus Jakarta Sans Variable', ...defaultTheme.fontFamily.sans],
      },
		},
	},
	plugins: [],
}
