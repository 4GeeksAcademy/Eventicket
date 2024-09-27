const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');
module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'build'),  // Este es el directorio de salida
        filename: 'bundle.js',
    },
    plugins: [
        new Dotenv({
            safe: true,
            systemvars: true
        })
    ]
});
