const path = require('path');

module.exports = {
  entry: './servers.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'), // Specify the directory where your index.html file is located
    hot: true,
  },
};
