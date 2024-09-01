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
        draw: "dash 25s linear forwards",
      },
      keyframes: {
        scroll: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - 24px))" },
        },
        dash: {
          to: {
            strokeDashoffset: "0",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
