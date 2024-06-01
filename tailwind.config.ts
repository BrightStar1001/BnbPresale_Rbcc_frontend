import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
    fontFamily: {
      "jolly-lodger": ["Jolly Lodger", "system-ui"],
      "finger-paint": ["Finger Paint", "sans-serif"],
      inter: ["Mona Sans", "sans-serif"],
    },
  },
  plugins: [],
};
export default config;
