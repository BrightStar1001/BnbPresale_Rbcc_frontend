module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],

  theme: {
    container: {
      padding: '2rem',
    },
    fontFamily: {
      ps2: 'PressStart2P',
      digit: 'Digitizer',
      pixel: "PixelCaps"
    },
  },

  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",

    themes: [
      {
        mytheme: {
          primary: "#6900ff",
          secondary: "#ffffff",
          accent: "#000",
          neutral: "#000",
        },
      },
    ],
  },
};
