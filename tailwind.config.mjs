import defaultTheme from "tailwindcss/defaultTheme";
import { transform } from "typescript";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans Variable", ...defaultTheme.fontFamily.sans],
      },
      animation: {
        'marquee': 'scroll 25s linear infinite',
      },
      keyframes: {
        scroll: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - 8px))" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
