const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const merge = require('webpack-merge')

const utils = require('./webpack.utils')

const ENV = utils.ENV
const INDEX_TEMPLATE = path.resolve(__dirname, 'src/index.html')
const OUTPUT_PATH = ENV === 'production' ? path.resolve('dist') : path.resolve('src') // resolve('dist')

const webcomponentsjs = './node_modules/@webcomponents/webcomponentsjs'


const polyfills = [
    {
        from: path.resolve(`${webcomponentsjs}/webcomponents-*.js`),
        to: path.join(OUTPUT_PATH, 'vendor'),
        flatten: true
    },
    {
        from: path.resolve(`${webcomponentsjs}/bundles/*.js`),
        to: path.join(OUTPUT_PATH, 'vendor', 'bundles'),
        flatten: true
    },
    {
        from: path.resolve(`${webcomponentsjs}/custom-elements-es5-adapter.js`),
        to: path.join(OUTPUT_PATH, 'vendor'),
        flatten: true
    },
    // {
    //     from: resolve(`${webanimationjs}/web-animations-next.min.js`),
    //     to: join(OUTPUT_PATH, 'vendor'),
    //     flatten: true
    // }
    // {
    //     from: resolve('./node_modules/whatwg-fetch/fetch.js'),
    //     to: join(OUTPUT_PATH, 'vendor')
    // },
    // {
    //     from: resolve('./node_modules/promise-polyfill/dist/polyfill.min.js'),
    //     to: join(OUTPUT_PATH, 'vendor')
    // }
]

const assets = [
    {
        from: path.resolve('./src/assets/*.*'),
        to: path.resolve('dist/assets/'),
        flatten: true
    }
]
  
const productionConfig = merge([
    {
        devtool: 'nosources-source-map',
        plugins: [
            new CleanWebpackPlugin([OUTPUT_PATH], { verbose: true }),
            new CopyWebpackPlugin([...polyfills, ...assets]),
            new HtmlWebpackPlugin({
                template: INDEX_TEMPLATE,
                minify: {
                    collapseWhitespace: true,
                    removeComments: true,
                    minifyCSS: true,
                    minifyJS: true
                }
            })
        ]
    }
])

const developmentConfig = merge([
    {
        devtool: 'cheap-module-source-map',
        plugins: [
            new CopyWebpackPlugin([...polyfills]), // ...assets
            new HtmlWebpackPlugin({
                template: INDEX_TEMPLATE
            })
        ],

        devServer: {
            contentBase: OUTPUT_PATH,
            compress: true,
            overlay: true,
            port: 8000,
            historyApiFallback: true,
            host: 'localhost'
        }
        }
])

const commonConfig = merge([
    {
        entry: path.resolve(__dirname, 'src/lit-app.js'),
        output: {
            path: path.resolve(__dirname, OUTPUT_PATH),
            filename: 'bundled.js'
        },
        module: {
            rules: [...utils.rules]
        }
    }
])

module.exports = mode => {
    if (mode === 'production')
        return merge(commonConfig, productionConfig, { mode })
    return merge(commonConfig, developmentConfig, { mode })
}