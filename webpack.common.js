/* Configure HTMLWebpack plugin */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/src/index.html',
  filename: 'index.html',
  inject: 'body'
});

/* Export configuration */
module.exports = {
  entry: ['./src/index.ts'],
  output: {
    path: __dirname + '/dist',
    filename: 'index.js'
  },

  plugins: [HTMLWebpackPluginConfig, new CopyWebpackPlugin([{ from: 'src/assets', to: 'assets' }])]
};
