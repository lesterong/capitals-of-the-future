import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "hsl(210, 100%, 97%)",
          100: "hsl(210, 100%, 93%)",
          200: "hsl(210, 100%, 87%)",
          300: "hsl(210, 100%, 76%)",
          400: "hsl(210, 100%, 68%)",
          500: "hsl(210, 100%, 61%)",
          600: "hsl(210, 100%, 53%)",
          700: "hsl(210, 100%, 44%)",
          800: "hsl(210, 100%, 35%)",
          900: "hsl(210, 100%, 24%)", // NUS Blue
          950: "hsl(210, 100%, 20%)"
        },
        secondary: {
          50: "hsl(31, 100%, 95%)",
          100: "hsl(31, 100%, 91%)",
          200: "hsl(31, 100%, 86%)",
          300: "hsl(31, 100%, 77%)",
          400: "hsl(31, 100%, 69%)",
          500: "hsl(31, 100%, 62%)",
          600: "hsl(31, 100%, 54%)", 
          700: "hsl(31, 100%, 47%)", // NUS Orange
          800: "hsl(31, 100%, 36%)",
          900: "hsl(31, 100%, 30%)",
          950: "hsl(31, 100%, 24%)",
        }
      },
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
