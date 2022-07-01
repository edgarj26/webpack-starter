//const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpack = require ('html-webpack-plugin')
const MiniCssExtract = require('mini-css-extract-plugin')
const CopyPlugin = require("copy-webpack-plugin");
const Cssminimizer =require("css-minimizer-webpack-plugin");
const terser = require("terser-webpack-plugin");

module.exports = {
    mode: 'production',

    output: {
        clean: true,
        filename: 'main.[contenthash].js'
    },
module : {
    rules: [
        {
            test: /\.html$/,
            loader: 'html-loader',
            options: {
                sources: false // para que no mueva archivos, recursos
            },
                            
        },
        {
            test: /\.css$/,
            exclude:/styles.css$/,
            use: ['style-loader', 'css-loader']
        },
        

            {
                test: /styles.css$/,
                use: [MiniCssExtract.loader, 'css-loader']

            },

            {

                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader'
            }
    ]

    },    


    optimization: {
        minimize: true,
        minimizer:[
            new Cssminimizer(),
            new terser(),
        ]


    },



    plugins: [
        new HtmlWebpack( {
            title: ' Mi webpack app',
            // filename: 'index.html'
            template: './src/index.html'
        }),

        new MiniCssExtract({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
            }),

            new CopyPlugin({
                patterns: [
                {from: 'src/assets/', 
                to: 'assets/'}
                ]
        
            })
        
    ],

}
