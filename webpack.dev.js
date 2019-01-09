const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/* Configure BrowserSync */
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const BrowserSyncPluginConfig = new BrowserSyncPlugin(
  {
    host: '127.0.0.1',
    port: 3000,
    proxy: 'http://127.0.0.1:8080/'
  },
  (config = {
    reload: false
  })
);

/* Configure ProgressBar */
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ProgressBarPluginConfig = new ProgressBarPlugin();

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    BrowserSyncPluginConfig,
    ProgressBarPluginConfig,
    new CopyWebpackPlugin([{ from: 'src/assets', to: 'assets' }])
  ]
});
