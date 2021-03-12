const path = require("path");

module.exports = {
	mode: 'production',
	// mode: 'development',
	entry: {
		index: "./src/index.ts"
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
		libraryTarget: "umd",
		library: "GateBridgeDemo",
		umdNamedDefine: true,
		globalObject: "this"
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"]
	},
	devtool: "source-map",
	devServer: {
		contentBase: './dist',
		inline:true,
		hot: true
	},
	module: {
		rules: [
			{test: /\.tsx?$/,loader: "ts-loader"},
			{test: /\.css$/,loader: "style-loader!css-loader"},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 65535,
							name: "static/media/[name].[hash:8].[ext]"
						}
					}
				]
			}
		]
	}
}