/** @type {import('tailwindcss').Config} */

const { keyframes } = require('@emotion/react');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xxs: "0.5rem",
        xxxs: "0.3rem",
      },
      boxShadow: {
        custom01: "1px 2px 4px rgba(0, 0, 0, 0.5)",
      },
      colors: {
        mint01: "#dffff9",
        mint02: "#D6FCF5",
        mint03: "#7FDAD7", 
        mint04: "#22B1AC",
        warn01: "#F2D0BE",
        warn02: "#E8A1A0",
      },
      textShadow: {
        default: "0 2px 4px rgba(0, 0, 0, 0.10)",
        md: "0 4px 6px rgba(0, 0, 0, 0.10)",
        lg: "0 6px 8px rgba(0, 0, 0, 0.10)",
        custom01: "1px 2px 4px rgba(0, 0, 0, 0.50)",
        custom02: "1px 2px 4px rgba(0, 0, 0, 0.40)",
        custom03: "1px 2px 4px rgba(0, 0, 0, 0.20)"
      },
      dropShadow: {
        // 드롭 쉐도우 추가
        custom: "1px 2px 4px rgba(0, 0, 0, 0.40)",
        custom2: "1px 2px 4px rgba(0, 0, 0, 0.20)"
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(-100%)' },
          '60%': { transform: 'translateY(15%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateY(0)', opacity: 1 },
          '100%': { transform: 'translateY(-100%)', opacity: 0 },
        },
        shrinkOut: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '30%': { transform: 'scale(1.2)', opacity: 1 },
          '100%': { transform: 'scale(0)', opacity: 0 },
        },
      },
      animation: {
        slideIn: 'slideIn 0.5s ease-out forwards',
        slideOut: 'slideOut 0.5s ease-out forwards',
        shrinkOut: 'shrinkOut 0.5s ease-out forwards',
      },
    },
  },
  variants: {
    dropShadow: ["responsive"], // 반응형 드롭 쉐도우 사용
    extend: {
      backgroundColor: ['hover'], // hover 상태에서의 배경색 변경을 활성화
      opacity: ['hover']          // hover 상태에서의 투명도 변경을 활성화
    }
  },
  plugins: [
    require("tailwindcss-textshadow"),
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': {
          /* Chrome, Safari, Opera*/
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          /* Firefox */
          'scrollbar-width': 'none',
          /* IE and Edge */
          '-ms-overflow-style': 'none',
        }
      };
      addUtilities(newUtilities, ['responsive']);
    })
  ],
};
