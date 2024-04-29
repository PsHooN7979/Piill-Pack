/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
      extend: {
        fontSize: {
          xxs: "0.5rem",
          xxxs: "0.3rem"
        },
        boxShadow: {
          'custom01': '1px 2px 4px rgba(0, 0, 0, 0.5)'
        },
        colors: {
          "mint01": "#D6FCF5",
          "mint02": "#7FDAD7",
          "mint03": "#22B1AC",
          "warn01": "#F2D0BE",
          "warn02": "#E8A1A0"
        },
        textShadow: {
          'default': '0 2px 4px rgba(0, 0, 0, 0.10)',
          'md': '0 4px 6px rgba(0, 0, 0, 0.10)',
          'lg': '0 6px 8px rgba(0, 0, 0, 0.10)',
          'custom01': '1px 2px 4px rgba(0, 0, 0, 0.5)'
        }
      },
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
};
