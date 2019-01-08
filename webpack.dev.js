const merge = require('webpack-merge');
const common = require('./webpack.common.js');

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
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'awesome-typescript-loader'
      },
      {
        test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },

      {
        test: /\.css$/,
        exclude: /[\/\\]src[\/\\]/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.css$/,
        exclude: /[\/\\](node_modules|bower_components|public)[\/\\]/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
            }
          }
        ]
      }
    ]
  },
  resolve: { extensions: ['.web.ts', '.web.js', '.ts', '.js'] },
  plugins: [BrowserSyncPluginConfig, ProgressBarPluginConfig]
});
