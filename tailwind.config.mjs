/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin"
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				onyx: {
					50: "#F7F7F7",
					100: "#C0C7DE",
					200: "#A0A7BE",
					300: "#8289A0",
					400: "#8289A0",
					500: "#1C212E",
					600: "#181D2A",
					700: "#121521",
					800: "#0E111B",
					900: "#0c0f19",
					950: "#060913",
				},
		  },
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		plugin(function astroComponentsPlugin({ addComponents }) {
			addComponents({
				".container": {
					"@apply max-w-[1024px] mx-auto px-5 md:px-10 lg:px-16 xl:max-w-[87.5rem]": {},
				},
				".boxShadow": {
					"@apply shadow-[0_0_7px_2px_rgba(69,107,12,42)]": {},
				},
				".dotHover": {
					"@apply group-hover:w-[2px] group-hover:h-[2px] group-hover:bg-lime-400 transition-all ease-linear duration-500 delay-0 rounded-full group-hover:boxShadow": {},
				},
				".flexJustifyCenter" :{
					"@apply flex items-center justify-center": {},
				},
				".buttonLink" :{
					"@apply flex items-center gap-2 bg-zinc-900 group-hover:bg-zinc-800 rounded-md border border-zinc-800 group-hover:border-zinc-700 px-3 py-1": {},
				},
				".buttonUtils" :{
					"@apply border flex items-center justify-center gap-3 px-4 py-3 rounded-md transition-colors ease-linear duration-150": {},
				},
				".componentStyle": {
					"@apply bg-zinc-950 hover:bg-zinc-950 border border-zinc-900 hover:border-zinc-50 transition-all duration-150 ease-in-out":{},
				},
				".transitionAll": {
					"@apply transition-all duration-150 ease-in-out":{},
				},
				".navbar": {
					"max-sm:flex-col max-sm:items-start max-sm:absolute max-sm:left-0 max-sm:top-0 max-sm:w-full max-sm:z-50":{}
				},
			})
		}),
	],
}