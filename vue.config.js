const path = require('path')
const port = 8090
console.info(port)
module.exports = {
  configureWebpack : {
    resolve : {
      alias : {
        '@' : path.resolve(__dirname,'src'),
        'api' : path.resolve(__dirname,'src/api'),
        'assets' : path.resolve(__dirname,'src/assets'),
        'components' : path.resolve(__dirname,'src/components'),
        'directive' : path.resolve(__dirname,'src/directive'),
        'filters' : path.resolve(__dirname,'src/filters'),
        'router' : path.resolve(__dirname,'src/router'),
        'store' : path.resolve(__dirname,'src/store'),
        'styles' : path.resolve(__dirname,'src/styles'),
        'utils' : path.resolve(__dirname,'src/utils')
      }
    }
  },
  //发布路径
  publicPath : './',
  //输出路径
  outputDir : 'dist',
  //静态资源目录
  assetsDir : 'static',
  //生成的index.html
  indexPath : 'index.html',
  //文件名哈希
  filenameHashing : true,
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
  //是否在保存时检查语法错误，error出现错误触发编译错误
  lintOnSave : true,
  //是否使用浏览器内编译器，会额外增加应用负担
  runtimeCompiler : false,
  //生产环境的productionSourceMap
  productionSourceMap : true,
  devServer : {
    open : false,//控制应用启动时自动打开浏览器
    host : '127.0.0.1',
    port : port,
    proxy : {
      '/api' : {
        target : 'http://localhost:8080',
        changeOrigin:true,
        pathRewrite : {
          '^/api' : ''
        }
      }
    }
  },
  css : {
    loaderOptions : {
      postcss : {
        plugins : {
          require('postcss-px2rem')({
            remUnit : 102
          })
        }
      }
    }
  }
}
