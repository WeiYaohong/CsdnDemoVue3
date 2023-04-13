/**
 * @description vue.config.js全局配置
 */
const {
  title,
  devPort,
  assetsDir,
  outputDir,
  lintOnSave,
  publicPath,
  transpileDependencies,
  baseURL,
} = require('./src/config')
const dayjs = require('dayjs')
const { resolve, relative } = require('path')
const { version, author } = require('./package.json')
const { createVuePlugin, createChainWebpack } = require('./library')

const dateTime = dayjs().format('YYYY-M-D HH:mm:ss')
process.env.VUE_APP_TITLE = title
process.env.VUE_APP_AUTHOR = author
process.env.VUE_APP_RANDOM = `${dayjs()}-${process.env.VUE_GITHUB_USER_NAME}`
process.env.VUE_APP_UPDATE_TIME = dateTime
process.env.VUE_APP_VERSION = version
process.env.VUE_APP_GITHUB_USER_NAME = process.env.VUE_GITHUB_USER_NAME

module.exports = {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  devServer: {
    hot: true,
    port: devPort,
    open: true,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true,
    },
    // 注释掉的地方是前端配置代理访问后端的示例
    // baseURL必须为/xxx，而不是后端服务器，请先了解代理逻辑，再设置前端代理
    // ！！！一定要注意！！！
    // 1.这里配置了跨域及代理只针对开发环境生效
    // 2.不建议你在前端配置跨域，建议你后端配置Allow-Origin,Method,Headers，放行token字段，一步到位
    // 3.后端配置了跨域，就不需要前端再配置，会发生Origin冲突
    proxy: {
      [baseURL]: {
        target: `http://127.0.0.1:7001/`,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          ['^' + baseURL]: '',
        },
      },
    },
  },
  pwa: {
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
    themeColor: '#ffffff',
    msTileColor: '#ffffff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      name: 'yes-AdminPlus',
      short_name: 'AdminPlus',
      background_color: '#ffffff',
    },
  },
  configureWebpack() {
    return {
      resolve: {
        alias: {
          '~': resolve(__dirname, '.'),
          '@': resolve(__dirname, 'src'),
          '@lib': resolve(__dirname, 'library'),
          '@gyf': resolve('library/plugins/ums'),
          'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
        },
      },
      plugins: createVuePlugin(),
      performance: {
        hints: false,
      },
    }
  },
  chainWebpack(config) {
    createChainWebpack(process.env.NODE_ENV, config)
  },
  runtimeCompiler: true,
  productionSourceMap: false,
  css: {
    requireModuleExtension: true,
    sourceMap: true,
    loaderOptions: {
      sass: {
        sassOptions: { outputStyle: 'expanded' },
        additionalData(content, { rootContext, resourcePath }) {
          const relativePath = relative(rootContext, resourcePath)
          if (
            relativePath.replace(/\\/g, '/') !==
            'library/styles/variables/variables.scss'
          )
            return (
              '@use "sass:math";@import "~@lib/styles/variables/variables.scss";' +
              content
            )
          return content
        },
      },
    },
  },
}
