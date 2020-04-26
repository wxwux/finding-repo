const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = () => {
  const css = {
    test: /\.css$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          esModule: true,
        },
      },
      "css-loader",
      "postcss-loader",
    ],
  };
  return {
    output: {
      publicPath: "/finding-repo",
    },
    module: {
      rules: [css],
    },
    plugins: [
      new CleanWebpackPlugin({
        verbose: true
      }),
      new MiniCssExtractPlugin({
        filename: "[hash:8].css",
        chunkFilename: "[id].css",
      }),
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(),
    ],
    devtool: "none",
  };
};
