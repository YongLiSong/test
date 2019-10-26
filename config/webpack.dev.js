const path = require("path");

module.exports = {
	//入口：有且可以有多个
	entry: {
		main: ["babel-polyfill", "./src/main.js"]
	},
	//打包环境：开发&生产
	mode: "development",
	//出口：有且只能有一个
	output: {
		//出口文件：filename:"bundle.js" 写成固定名字或
		filename: "[name]-build.js",
		//路径 使用node提供的path模块，需要在上面引入
		path: path.resolve(__dirname, "../dist"),
		//添加公开路径
		publicPath: "/"
	},
	//配置本地服务器
	devServer: {
		//本地服务启动后，要加载哪个文件夹中的HTML
		contentBase: "dist",
		//该属性是让报错信息显示在页面中
		overlay: true
	},
	//添加loader的配置
	module: {
		rules: [
			//里面的每一个对象配置一种文件类型，要加载的loader;
			//JS loader
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"]
					}
				}
			},
			//css loader
			{
				test: /\.css$/,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader"
					}
				]
			},
			//html loader
			{
				test: /\.html$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].html"
						}
					},
					{
						//用于分割出口JS文件
						loader: "extract-loader"
					},
					{
						loader: "html-loader",
						options: {
							attrs: ["img:src"]
						}
					}
				]
			},
			//image loader
			{
				test: /\.(jpg|gif|png)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "images/[name].[ext]"
							// name:"images/[name]-[hash:10].[ext]" 添加hash值
						}
					}
				]
			}
		]
	}
};
