const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CompressionPlugin = require('compression-webpack-plugin')
const path = require('path');

switch(process.env.VUE_APP_CURRENTMODE) {
  case 'dev':
    Version = '1.0.1'// 测试环境
    break
  case 'prod':
    Version = '1.0'// 正式环境
}


module.exports = {
  // publicPath: './',
  devServer: {
    // host: "localhost",
    // port: 8080
  },
  // css: {
  //   loaderOptions: {
  //     css: {
  //       importLoaders: 1
  //     },
  //     less: {
  //       importLoaders: 1
  //     }
  //   }
  // },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/assets/common.less')
      ]
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // config.plugins = [
      //   ...config.plugins,
      //   new CompressionPlugin({
      //     test: /\.js$|\.html$|\.css/,
      //     threshold: 10240,
      //     deleteOriginalAssets: true
      //   })
      // ]
      // config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      return {
        output: {
          filename: 'js/[name].js?ver=' + Version,
          chunkFilename: 'js/[name].js?ver=' + Version
        },
        plugins: [
          new MiniCssExtractPlugin({
            filename: 'css/[name].css?ver=' + Version,
            chunkFilename: 'css/[name].css?ver=' + Version
          })
        ]
      }
    }
  },
  // chainWebpack: config => {
  //   config.module
  //     .rule("images")
  //     .use("url-loader")
  //     .tap(options => {
  //       options.name = 'img/[name].[ext]?v=' + Version;
  //       options.fallback = {
  //         loader: "file-loader",
  //         options: {
  //           name: 'img/[name].[ext]?v=' + Version
  //         }
  //       };
  //       return options;
  //     });
  // }
};
