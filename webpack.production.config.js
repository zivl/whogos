var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
    entry: path.resolve(__dirname, 'src/app.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'http://localhost:8080/', // This is used to generate URLs to e.g. images
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/,  exclude: [node_modules_dir], loader: 'babel?stage=0' },
            { test: /\.scss$/, loaders: ['style', 'css', 'sass'] },

            // inline base64 URLs for <=8k images, direct URLs for the rest]
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
        ]
    }
};

module.exports = config;