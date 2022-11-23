// const merge = require('webpack-merge');
// const common = require('./webpack.config.js');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
// const BrowserSyncPluginConfig = new BrowserSyncPlugin(
//   {
//     host: '127.0.0.1',
//     port: 3000,
//     proxy: 'http://127.0.0.1:8080/',
//   },
//   (config = {
//     reload: false,
//   })
// );

// const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// const ProgressBarPluginConfig = new ProgressBarPlugin();

// module.exports = merge(common, {
//   mode: 'development',
//   target: 'web',
//   devtool: 'source-map',
//   devServer: {
//     static: {
//       directory: path.join(__dirname, 'dist'),
//     },
//     compress: true,
//     port: 9000,
//   },
//   plugins: [
//     BrowserSyncPluginConfig,
//     ProgressBarPluginConfig,
//     new CopyWebpackPlugin([{ from: 'src/assets', to: 'assets' }]),
//   ],
// });
