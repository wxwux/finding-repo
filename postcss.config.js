module.exports = {
  parser: 'postcss-safe-parser',
  plugins: [
    require("postcss-flexbugs-fixes"),
    require("postcss-normalize"),
    require("autoprefixer")({
      cascade: false,
    }),
  ],
};
