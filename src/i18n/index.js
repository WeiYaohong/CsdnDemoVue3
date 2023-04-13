import pinia from '@/store'
import { useSettingsStore } from '@/store/modules/settings'
//import en from './en/en'
//import zh from './zh/zh'
import { createI18n } from 'vue-i18n'
import enLocale from 'element-plus/lib/locale/lang/en'
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'

const modules = (modulesFiles) => {
  return modulesFiles.keys().reduce((modules, modulePath) => {
    const value = modulesFiles(modulePath)
    modules['umsI18n'] = Object.assign(modules['umsI18n'] || {}, {
      ...value.default,
    })
    return modules
  }, {})
}

const en = require.context('./en', true, /\.js$/)
const zh = require.context('./zh', true, /\.js$/)

const messages = {
  en: {
    ...modules(en),
    ...enLocale,
  },
  zh: {
    ...modules(zh),
    ...zhLocale,
  },
}

function getLanguage() {
  const { getLanguage } = useSettingsStore(pinia)
  return getLanguage || 'zh'
}

const i18n = createI18n({
  locale: getLanguage(),
  messages,
})

export default i18n
