import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans Variable", ...defaultTheme.fontFamily.sans],
      },
      animation: {
        marquee: "scroll 25s linear infinite",
        draw: "dash 10s linear infinite",
      },
      keyframes: {
        scroll: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - 24px))" },
        },
        dash: {
          from: {
            strokeDashoffset: "0",
          },
          to: {
            strokeDashoffset: "100",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
