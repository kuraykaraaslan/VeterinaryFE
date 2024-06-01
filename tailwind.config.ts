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
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms"), require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#7100ff",

          secondary: "#007e9b",

          accent: "#005bef",

          neutral: "#0b0200",

          "base-100": "#ffffd8",

          "base-200": "#f3f3f3",

          "base-300": "#e9e9e9",

          "base-400": "#dfdfdf",

          "base-500": "#cfcfcf",

          info: "#00d6ff",

          success: "#00ff7c",

          warning: "#fb6d00",

          error: "#ff5365",
        },
        black: {
          primary: "#ffffff",

          secondary: "#ffffff",

          accent: "#00ae79",

          neutral: "#311e1d",

          "base-100": "#000000",

          "base-200": "#111111",

          "base-300": "#222222",

          "base-400": "#000000",

          "base-500": "#000000",

          info: "#00b1d2",

          success: "#33f16a",

          warning: "#d52d00",

          error: "#fd0e3d",
        },
      },
    ],
  },
};
export default config;
