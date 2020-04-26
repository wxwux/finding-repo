const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

module.exports = () => {
  const esLint = {
    enforce: "pre",
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "eslint-loader",
  };

  return {
    module: {
      rules: [esLint],
    },
    plugins: [new CaseSensitivePathsPlugin()],
    devServer: {
      historyApiFallback: true,
      noInfo: false,
      overlay: true,
    },
    devtool: "#eval-source-map",
  };
};
