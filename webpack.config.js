var path=require('path');
module.exports = {
    entry: {
        router: './frontend/router.js',
       // register: './frontend/js/register.js'
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
            jquery: 'jquery/src/jquery.js'
        }
    },
    output: {
        path: path.resolve('.')+'/public/js/',
        filename: '[name]_bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    // vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
