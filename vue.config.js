"use strict"
const path = require('path')
const defaultSetting = require('./src/setting.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}
const name = defaultSetting.title
const ssoHost = defaultSetting.ssoHost;
const port = process.env.port || process.env.npm_config_port || 9529;

module.exports = {
  //发布路径
  publicPath: '/',
  //输出路径
  outputDir: 'dist',
  //静态资源目录
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  //生成的index.html
  indexPath: 'index.html',
  //文件名哈希
  filenameHashing: true,
  //用于配置多页应用
  // pages : {
  //   index : {
  //     //page的入口文件
  //     entry : 'src/index/main.js',
  //     //模板文件
  //     template : 'public/index.html',
  //     //dist输出的文件
  //     filename : 'index.html',
  //     //标题
  //     title : 'IndexPage',
  //     //页面包含的块
  //     chunks : ['chunks-vendors','chunks-common','index']
  //   },
  //   subpage : {
  //     //除了entry字段，其他为可选字段
  //     /* 模板默认public/subpage.html，如果没有subpage页面，就会回退到index页面，名字默认为subpage*/
  //     entry : 'src/subpage/main.js'
  //   }
  // }
  //是否使用浏览器内编译器，会额外增加应用负担
  runtimeCompiler: false,
  //影响打包速度,必须置为false
  productionSourceMap: false,
  devServer: {
    open: true, //控制应用启动时自动打开浏览器
    host: defaultSetting.viewHost,
    port: port,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/express': {
        target: 'http://' + defaultSetting.sysHost + ':8007',
        changeOrigin: true,
        pathRewrite: {
          '^/express': ''
        }
      }
    }
  },
  configureWebpack: {
    name: name,
    devtool: 'source-map',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'api': path.resolve(__dirname, 'src/api'),
        'assets': path.resolve(__dirname, 'src/assets'),
        'components': path.resolve(__dirname, 'src/components'),
        'plugins': path.resolve(__dirname, 'src/plugins'),
        'router': path.resolve(__dirname, 'src/router'),
        'store': path.resolve(__dirname, 'src/store'),
        'styles': path.resolve(__dirname, 'src/styles'),
        'utils': path.resolve(__dirname, 'src/utils'),
        'views': path.resolve(__dirname, 'src/views')
      }
    }
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    // config.plugins.delete('preload')

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementPlus: {
                  name: 'chunk-elementPlus', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-plus(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
  // css: {
  // 	loaderOptions: {
  // 		postcss: {
  // 			plugins: [
  // 				require('postcss-px2rem')({
  // 					remUnit: 192
  // 				})
  // 			]
  // 		}
  // 	},
  // }
}
