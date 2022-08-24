const webpack = require("webpack");
module.exports = {
    publicPath: '/provinceVisual',
    outputDir: 'provinceVisual',
    // assetsDir: './',
    productionSourceMap: false,
    devServer: {
        host: '0.0.0.0',
        port: 6750,
        open: false,
        proxy: {
            '/bd': {
                target: 'http://127.0.0.1',
                changeOrigin: true,
                pathRewrite: {
                    '^/bd': ''
                }
            },
            '/api': {
                target: 'https://ssp.nsoas.org.cn',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/tdt': {
                target: 'https://ssp.nsoas.org.cn/tdt',
                changeOrigin: true,
                pathRewrite: {
                    '^/tdt': ''
                }
            },
            '/geoserver': {
                //target: 'https://ssp.nsoas.org.cn',//卫星中心
                 target: 'http://localhost:8080',//本地
                changeOrigin: true
            },
            '/provincialImage': {
                // target: 'http://127.0.0.1/nginxData/coverage',
                target: 'https://ssp.nsoas.org.cn/provincialImage',//卫星中心
                changeOrigin: true,
                pathRewrite: {
                    '^/provincialImage': ''
                }
            },
        }
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ]
    }
};