const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/gamelogic.js",
  devtool: "inline-source-map",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  watch: true,
};
