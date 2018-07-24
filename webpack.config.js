exports.default = {
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        }
      }
    ]
  },
  entry: {},
  target: "node",
  output: {
    path: "functions/",
    filename: "[name].js",
    libraryTarget: "commonjs"
  },
  devtool: false
};
