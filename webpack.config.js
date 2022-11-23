// /* Configure HTMLWebpack plugin */
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
//   template: __dirname + '/src/index.html',
//   filename: 'index.html',
//   inject: 'body'
// });

// /* Export configuration */
// module.exports = {
//   entry: ['./src/index.ts'],
//   output: {
//     path: __dirname + '/dist',
//     filename: 'index.js'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.ts$/,
//         use: 'awesome-typescript-loader'
//       },
//       {
//         test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
//         use: [
//           {
//             loader: 'file-loader',
//             options: {}
//           }
//         ]
//       },

//       {
//         test: /\.css$/,
//         exclude: /[\/\\]src[\/\\]/,
//         use: [
//           {
//             loader: 'style-loader',
//             options: {
//               sourceMap: true
//             }
//           },
//           { loader: 'css-loader' }
//         ]
//       },
//       {
//         test: /\.css$/,
//         exclude: /[\/\\](node_modules|bower_components|public)[\/\\]/,
//         use: [
//           {
//             loader: 'style-loader',
//             options: {
//               sourceMap: true
//             }
//           },
//           {
//             loader: 'css-loader',
//             options: {
//               modules: true,
//               importLoaders: 1,
//               localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
//             }
//           }
//         ]
//       }
//     ]
//   },
//   resolve: { extensions: ['.web.ts', '.web.js', '.ts', '.js'] },

//   plugins: [HTMLWebpackPluginConfig]
// };

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/styles/style.css", to: "style.css" },
        { from: 'src/assets', to: 'assets' }
      ],
    }),

    // new CopyPlugin({
    //   patterns: [
    //     { from: "src/index.html", to: "index.html" },
    //     { from: "src/styles/style.css", to: "style.css" },
    //     { from: "src/assets", to: "assets" },
    //   ],
    // }),
  ],
};
