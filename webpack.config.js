exports.default = {
  mode: 'production',
  target: 'node',
  entry: {
    slack: './src/slack.js'
  },
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
  target: "node",
  optimization: {
    // TODO: Minimize a code.
    minimize: false
  },
  output: {
    path: __dirname + "/functions/",
    filename: "[name].js",
    libraryTarget: "commonjs"
  },
  devtool: false
};
