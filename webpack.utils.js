
const path = require('path')
const postcssPresetEnv = require('postcss-preset-env')
const ENV = process.argv.find(arg => arg.includes('production'))  ? 'production'  : 'development'

module.exports = {

    ENV: ENV,

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
            include: [
                path.resolve(__dirname, "src"),
                path.resolve(__dirname, "node_modules/\@polymer")
            ],
            use: [
                {
                loader: 'babel-loader',
                options: {
                    babelrc: true,
                    extends: path.join(__dirname + '/.babelrc'),
                    cacheDirectory: true,
                    envName: ENV
                }
                }
            ]
        },
        {
            test: /\.svg$/,
            loader: 'svg-inline-loader'
        },
    ]
}