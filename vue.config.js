const path = require('path')
const port = 8090
console.info(port)
const app = require("http").createServer()
const io = require("socket.io")(app)
app.listen(8080)
io.on("connection", (socket) => {
	socket.emit("news", hello: "world")
	socket.on("my other event", (data) => {
		console.info(data)
	})
})
module.exports = {
	//发布路径
	publicPath: './',
	//输出路径
	outputDir: 'dist',
	//静态资源目录
	assetsDir: 'static',
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
	//是否在保存时检查语法错误，error出现错误触发编译错误
	lintOnSave: true,
	//是否使用浏览器内编译器，会额外增加应用负担
	runtimeCompiler: false,
	//影响打包速度,必须置为false
	productionSourceMap: false,
	devServer: {
		open: false, //控制应用启动时自动打开浏览器
		host: '127.0.0.1',
		port: port,
		proxy: {
			'/api': {
				target: 'http://localhost:8080',
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	},
	configureWebpack: {
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
				'api': path.resolve(__dirname, 'src/api'),
				'assets': path.resolve(__dirname, 'src/assets'),
				'components': path.resolve(__dirname, 'src/components'),
				'directive': path.resolve(__dirname, 'src/directive'),
				'filters': path.resolve(__dirname, 'src/filters'),
				'plugins': path.resolve(__dirname, 'src/plugins'),
				'router': path.resolve(__dirname, 'src/router'),
				'store': path.resolve(__dirname, 'src/store'),
				'styles': path.resolve(__dirname, 'src/styles'),
				'utils': path.resolve(__dirname, 'src/utils')
			}
		}
	},
	//使用chainWebpack将prefetch和preload关闭
	chainWebpack: config => {
		//删除prefetch和preload
		config.plugins.delete('prefetch')
		config.plugins.delete('preload')
	},
	css: {
		loaderOptions: {
			postcss: {
				plugins: [
					require('postcss-px2rem')({
						remUnit: 192
					})
				]
			}
		},
	}
}
