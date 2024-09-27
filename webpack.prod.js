const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');
const path = require('path');  // Importa el módulo 'path'

module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'build'),  // Resuelve correctamente el directorio de salida
        filename: 'bundle.js',
    },
    plugins: [
        new Dotenv({
            safe: true,
            systemvars: true
        })
    ]
});
