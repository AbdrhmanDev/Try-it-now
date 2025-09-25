// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{html,ts}", "./projects/**/*.{html,ts}"],
//   theme: {
//     extend: {
//       // You can add custom colors, fonts, spacing later
//     },
//   },
//   plugins: [
//     // Example: require('tailwindcss/forms') for better form styling
//   ],
// };
/** @type {import('tailwindcss').config} */
module.exports = {
  darkMode: "class", // or 'media'
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundColor: {
        "gray-800": "#1f2937",
      },
      textColor: {
        "gray-200": "#e5e7eb",
      },
    },
  },
};

module.exports = {
  theme: {
    extend: {
      maxWidth: {
        "8xl": "1600px",
      },
    },
  },
};
