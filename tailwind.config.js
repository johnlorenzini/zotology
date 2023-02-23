const { sand, sandA } = require("@radix-ui/colors");
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        uciblue: "#0064A4",
        uciyellow: "#FFD200",
        darkblue: "#1B3D6D",
        lightblue: "#0064A4",
        cardtitle: "#1B3D6D",
        red: "#C63E04",
        ...sand,
        ...sandA,
      },
      fontFamily: {
        body: ["var(--font-body)", ...fontFamily.sans],
        title: ["var(--font-title)", ...fontFamily.serif],
      },
      keyframes: {
        in: {
          "0%": { opacity: 0, transform: "translateY(-30px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        appear: {
          "0%": { transform: "translateY(-2px)" },
          "100%": { transform: "translateY(0px)" },
        },
      },
      animation: {
        in: "in 400ms ease-in-out",
        appear: "appear 400ms ease-in-out",
      },
    },
  },
  plugins: [],
};
