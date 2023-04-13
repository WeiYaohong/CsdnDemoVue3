import App from './App.vue'
import { setupUms } from '@lib/setup'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'
import ElementUI from 'element-plus/es/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

const app = createApp(App)
/**
 * @description 生产环境启用组件初始化，编译，渲染和补丁性能跟踪。仅在开发模式和支持 Performance.mark API的浏览器中工作。
 */
if (process.env.NODE_ENV === 'development') {
  app.config.performance = true
}
/**
 * 引入ElementPlus icon
 */
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementUI)
app.use(VXETable)

setupUms(app)
setupStore(app)
setupRouter(app)
  .isReady()
  .then(() => app.mount('#app'))
