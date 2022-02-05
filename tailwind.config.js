module.exports = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        anton: ["'Anton'"],
      },
      maxWidth: {
        "1/2": "50%",
      },
    },
  },
  plugins: [],
};
