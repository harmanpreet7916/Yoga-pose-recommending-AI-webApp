/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      screens:{
        'md':'825px',
        'lg':'1095px',
        'xl':'1365px',
      },
    },
    fontFamily:{
      normal:["Roboto"],
      heading:["Lato"],
      open:["Open Sans"]
    }

  },
  plugins: [],
}

