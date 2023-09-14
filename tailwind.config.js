// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.ts',
    './src/**/*.tsx',
    './public/index.html',
    "./node_modules/tw-elements-react/dist/js/**/*.js",
  ],
  plugins: [require("tw-elements-react/dist/plugin.cjs")],
  theme: {
    extend: {
    },
  },
};
