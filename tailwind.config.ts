import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "spin-slow": "spin 4s linear infinite", // Adjust the duration (4s) as needed
      },
      fontFamily: {
        poppins: [
          "Poppins",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        playfair: [
          "Playfair Display",
          "ui-serif",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "Times",
          "serif",
        ],
      },
      colors: {
        customblue: "#2FBFDE",
        customgray: "#f1f5f8",
        customgreen: "#4ABD4E",
        matteblack: "#28282B",
        reactblue: "#61dafb",
        textgray: "#273240",
        icongray: "#A6ABC8",
        bggray: "#edf0f5",
      },
    },
  },
  plugins: [],
};
export default config;
