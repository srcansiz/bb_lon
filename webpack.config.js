

const path = require('path')
const fs = require("fs");
const appDirectory = fs.realpathSync(process.cwd());

module.exports = {
    mode: "development",
    entry: {
        app: "./src/app.ts"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', 'tsx', '.js']
    },
    devServer: {
        host: "0.0.0.0",
        port: 8181, //port that we're using for local host (localhost:8080)
        static: path.resolve(appDirectory, "dist"), //tells webpack to serve from the public folder
        hot: true,
        devMiddleware: {
            publicPath: "/",
        }
    },
    devtool: 'source-map',
    plugins: [],
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }]
    }
}