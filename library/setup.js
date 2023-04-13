// 加载雪碧图
import '@/icon'
// 加载全局样式样式
import './styles/ums.scss'
import './styles/vxetable.scss'
// 加载VabIcon
import { createHead } from '@vueuse/head'

export function setupUms(app) {
  app.use(createHead())

  // 加载背景
  const Themes = require.context('./styles/background', false, /\.scss$/)
  Themes.keys().map(Themes)

  // 加载插件
  const Plugins = require.context('./plugins', true, /\.js$/)
  Plugins.keys().forEach((key) => Plugins(key).setup(app))
}
