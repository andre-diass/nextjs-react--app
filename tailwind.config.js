/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.{js,ts,jsx,tsx,mdx}",
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
      colors: {
        primary: "#163020 ", //navbar and behind main
        secondary: "#EEF0E5 ", //main
        third: "#FAFAFA", //tHead
        fourth: "#FFFF", //tbody
        buttonHighlight: "#163020",
        buttonPrimary: "	#D4D4D4",
        detail: "#eae8fb", //higlight on focus on navbar
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
/*
 primary: "#FAFAFA ", //navbar and behind main
        secondary: "#F5F5F5", //main
        third: "#FAFAFA", //tHead
        fourth: "#FFFF", //tbody
        buttonHighlight: "#5542F6",
        buttonPrimary: "	#D4D4D4",
        detail: "#eae8fb", //higlight on focus on navbar

*/

/*
primary: "#163020 ", //navbar and behind main
        secondary: "#EEF0E5 ", //main
        third: "#FAFAFA", //tHead
        fourth: "#FFFF", //tbody
        buttonHighlight: "#163020",
        buttonPrimary: "	#D4D4D4",
        detail: "#eae8fb", //higlight on focus on navbar
*/
