exports.default = {
  mode: 'production',
  target: 'node',
  entry: {
    slack: './src/slack.ts'
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
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
