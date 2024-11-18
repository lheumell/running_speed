import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        run: {
          "50": "#fffbeb",
          "100": "#fef3c7",
          "200": "#fde58a",
          "300": "#fbd24e",
          "400": "#fabe25",
          "500": "#f49d0c",
          "600": "#d87607",
          "700": "#bc560a",
          "800": "#923f0e",
          "900": "#78340f",
          "950": "#451a03",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
