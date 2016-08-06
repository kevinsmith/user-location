module.exports = {
  output: {
    library: "user-location",
    libraryTarget: "umd",
    filename: "user-location.js"
  },
  devtool: "#inline-source-map",
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          compact: false
        }
      }
    ]
  }
};
