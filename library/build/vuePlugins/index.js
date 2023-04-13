const { createUnPlugin } = require('./unplugin')
const { createProvidePlugin } = require('./providePlugin')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  createVuePlugin: () => [
    ...createUnPlugin(),
    ...createProvidePlugin(),
    new MonacoWebpackPlugin(),
  ],
}
