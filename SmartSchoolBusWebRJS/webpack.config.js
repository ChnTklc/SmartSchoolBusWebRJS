var webpack = require("webpack");

var productionPlugins = [new webpack.optimize.UglifyJsPlugin(), new webpack.optimize.OccurrenceOrderPlugin()];
var devPlugins = [new webpack.optimize.UglifyJsPlugin(), new webpack.optimize.OccurrenceOrderPlugin()];
var config = {
    entry: "./src/index.js",
    output:{
        filename: process.env.NODE_ENV == 'production' ? './src/webpack_index_prod.[hash].js' : './src/webpack_index.js'
    },
    module:{
        loaders:[
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.png$/, loader: "file-loader" },
            { test: /\.json$/, loader: "json-loader" }
        ]
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    plugins: [
        process.env.NODE_ENV == 'production' ? productionPlugins : devPlugins
    ]
};
module.exports = config;