const webpack = require('webpack');
const path = require('path');

const app = {
    entry: [
        path.join(__dirname, 'app/index.js')
    ],
    output: {
        path: __dirname + '/app/public',
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
};

module.exports = app;