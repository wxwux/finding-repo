const HtmlWebPackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const path = require("path");

module.exports = (env, argv) => {
  process.env.BABEL_ENV = argv.mode;
  const config = {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "./dist"),
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
        },
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
            },
          ],
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
      ],
    },
    plugins: [
      new CaseSensitivePathsPlugin(),
      new HtmlWebPackPlugin({
        template: "./public/index.html",
      }),
    ],
    devServer: {
      historyApiFallback: true,
      noInfo: false,
      overlay: true,
    },
    devtool: "#eval-source-map",
  };

  return config;
};
