module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'white': '#ffffff',
        'blueTheme': '#2C88D9',
        'blueDarkTheme': '#137bd6',
        'blueDarkerTheme': '#006ac6',
        'violetTheme': '#6558F5',
        'lightGray': '#CFD8E0',
        'fontDisabled': "#bbc2c9",
        'darkGray': '#788896',
        'fontGray': '#293845',
        'fontDarkGray': '#3B4955',
        'persDataFontGrey': '#4B5C6B',
        'bankDataFont' : '#2D3C49',
        'lightViolet': '#a7a2e8',
        'grayHover': '#eaeaea',
      },
      display: ['group-focus'],
      height: {
        '18': '4.5rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
