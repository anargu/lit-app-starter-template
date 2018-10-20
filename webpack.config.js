const path = require('path')
const resolve = require('path').resolve
const join = require('path').join
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const merge = require('webpack-merge')
const postcssPresetEnv = require('postcss-preset-env')

const ENV = process.argv.find(arg => arg.includes('production'))
  ? 'production'
  : 'development';
const INDEX_TEMPLATE = path.resolve(__dirname, 'src/index.html')
const OUTPUT_PATH = ENV === 'production' ? resolve('dist') : resolve('src'); // resolve('dist')


const webcomponentsjs = './node_modules/@webcomponents/webcomponentsjs';
// const webanimationjs = './node_modules/web-animations-js';
const polyfills = [
    {
        from: resolve(`${webcomponentsjs}/webcomponents-*.js`),
        to: join(OUTPUT_PATH, 'vendor'),
        flatten: true
    },
    {
        from: resolve(`${webcomponentsjs}/bundles/*.js`),
        to: join(OUTPUT_PATH, 'vendor', 'bundles'),
        flatten: true
    },
    {
        from: resolve(`${webcomponentsjs}/custom-elements-es5-adapter.js`),
        to: join(OUTPUT_PATH, 'vendor'),
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
        from: resolve('./src/assets/*.*'),
        to: resolve('dist/assets/'),
        flatten: true
    }
]
  
const productionConfig = merge([
    {
        devtool: 'nosources-source-map',
        plugins: [
            // new CleanWebpackPlugin([OUTPUT_PATH], { verbose: true }),
            new CopyWebpackPlugin([...polyfills, ...assets]), // ...assets
            new HtmlWebpackPlugin({
                template: INDEX_TEMPLATE,
                // minify: {
                //     collapseWhitespace: true,
                //     removeComments: true,
                //     minifyCSS: true,
                //     minifyJS: true
                // }
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
            rules: [
                {
                  test: /\.css$/,
                  use: ['css-to-string-loader', 'css-loader', 
                    { loader: 'postcss-loader', options: {
                        ident: 'postcss',
                        plugins: () => [
                          postcssPresetEnv()
                        ]
                      } 
                    }
                  ]
                },
                {
                    test: /\.styl$/,
                    use: [
                        'css-to-string-loader',
                        'css-loader',
                        'stylus-loader'
                    ]
                },
                {
                    test: /\.js$/,
                    // exclude: /(node_modules|bower_components)/,
                    use: [
                      {
                        loader: 'babel-loader',
                        options: {
                          babelrc: true,
                          extends: join(__dirname + '/.babelrc'),
                          cacheDirectory: true,
                          envName: ENV
                        }
                      }
                    ]
                }
            ]
        }
    }
])

module.exports = mode => {
    if (mode === 'production')
        return merge(commonConfig, productionConfig, { mode })
    return merge(commonConfig, developmentConfig, { mode })
}