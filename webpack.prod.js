const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [new CopyWebpackPlugin([
    { from: 'src/assets', to: 'src/assets' },
    { from: 'src/style.css', to: 'src/style.css' }
  ])]
});
