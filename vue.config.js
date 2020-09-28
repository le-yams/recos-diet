const webpack = require('webpack');
const fs = require('fs')
const packageJson = fs.readFileSync('./package.json').toString()
const version = JSON.parse(packageJson).version || 0
const outputfilePath = "./public/version.json";

fs.writeFile(
    outputfilePath,
    JSON.stringify({version: version}),
    function (err) {
        if (err) {
            return console.error(err);
        }
    });

module.exports = {
    pages: {
        index: {
            // entry for the page
            entry: 'src/main.js',
            // the source template
            template: 'public/index.html',
            // output as dist/index.html
            filename: 'index.html',
            // when using title option,
            // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Recos diététique',
            // chunks to include on this page, by default includes
            // extracted common chunks and vendor chunks.
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
    },
    configureWebpack: {
        output: {
            filename: '[name].[hash:8].js'
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    PACKAGE_VERSION: '"' + version + '"'
                }
            })
        ]
    },
}
