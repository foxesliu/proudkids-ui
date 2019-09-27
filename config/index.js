// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 9000,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/auth': {
        //target: 'http://192.168.1.82:9999',
        target: 'http://192.168.1.80:9999',
        changeOrigin: true,
        pathRewrite: {
          '^/auth': '/auth'
        }
      },
      '/admin': {
        //target: 'http://192.168.1.82:9999',
        target: 'http://192.168.1.80:9999',
        changeOrigin: true,
        pathRewrite: {
          '^/admin': '/admin'
        }
      },
      '/sales': {
        target: 'http://192.168.1.80:9999',
        changeOrigin: true,
        pathRewrite: {
          '^/sales': '/sales'
        }
      },
      '/thirdparty': {
        target: 'http://192.168.1.80:9999',
        changeOrigin: true,
        pathRewrite: {
          '^/thirdparty': '/thirdparty'
        }
      },
      '/ruser': {
        //target: 'http://192.168.1.82:31999',
        target: 'http://192.168.1.80:9999',
        changeOrigin: true,
        pathRewrite: {
          '^/ruser': '/ruser'
        }
      },
      '/aom': {
        target: 'http://192.168.1.80:9999',
        changeOrigin: true,
        pathRewrite: {
          '^/aom': '/aom'
        }
      },
      '/zuul': {
        target: 'http://192.168.1.80:9999',
        changeOrigin: true,
        pathRewrite: {
          '^/zuul': '/zuul'
        }
      },
      '/bills': {
        target: 'http://192.168.1.80:9999',
        changeOrigin: true,
        pathRewrite: {
          '^/bills': '/bills'
        }
      },
      '/pay': {
        target: 'http://192.168.1.80:9999',
        changeOrigin: true,
        pathRewrite: {
          '^/pay': '/pay'
        }
      },
      '/mms': {
        target: 'http://192.168.1.80:9999',
        changeOrigin: true,
        pathRewrite: {
          '^/mms': '/mms'
        }
      },
      '/apps': {
        target: 'http://192.168.1.80:9999',
        changeOrigin: true,
        pathRewrite: {
          '^/apps': '/apps'
        }
      },
      '/mms': {
        target: 'http://192.168.1.80:9999',
        changeOrigin: true,
        pathRewrite: {
          '^/mms': '/mms'
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
