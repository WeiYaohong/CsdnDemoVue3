/**
 * @description 所有全局配置的状态管理，如无必要请勿修改
 */
import { isJson } from '@/utils/validate'
import {
  background,
  columnStyle,
  fixedHeader,
  foldSidebar,
  i18n,
  layout,
  logo as _logo,
  showFullScreen,
  showLanguage,
  showLock,
  showNotice,
  showPageTransition,
  showProgressBar,
  showRefresh,
  showSearch,
  showTabs,
  showTabsIcon,
  showTheme,
  showThemeSetting,
  tabsBarStyle,
  themeName,
  title as _title,
} from '@/config'

const defaultTheme = {
  layout,
  themeName,
  background,
  columnStyle,
  fixedHeader,
  showProgressBar,
  showTabs,
  tabsBarStyle,
  showTabsIcon,
  showLanguage,
  showRefresh,
  showSearch,
  showTheme,
  showNotice,
  showFullScreen,
  showThemeSetting,
  foldSidebar,
  showPageTransition,
  showLock,
}
const getLocalStorage = (key) => {
  const value = localStorage.getItem(key)
  if (isJson(value)) {
    return JSON.parse(value)
  } else {
    return false
  }
}

const theme = getLocalStorage('theme') || { ...defaultTheme }
const { collapse = foldSidebar } = getLocalStorage('collapse')
const { language = i18n } = getLocalStorage('language')
const { lock = false } = getLocalStorage('lock')
const { logo = _logo } = getLocalStorage('logo')
const { title = _title } = getLocalStorage('title')

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    theme,
    device: 'desktop',
    collapse,
    language,
    lock,
    logo,
    title,
    echartsGraphic1: ['#3ED572', '#399efd'],
    echartsGraphic2: ['#399efd', '#8cc8ff'],
  }),
  getters: {
    getTheme: (state) => state.theme,
    getDevice: (state) => state.device,
    getCollapse: (state) => state.collapse,
    getLanguage: (state) => state.language,
    getLock: (state) => state.lock,
    getLogo: (state) => state.logo,
    getTitle: (state) => state.title,
  },
  actions: {
    updateState(obj) {
      Object.keys(obj).forEach((key) => {
        this[key] = obj[key]
        localStorage.setItem(
          key,
          typeof obj[key] == 'string'
            ? `{"${key}":"${obj[key]}"}`
            : `{"${key}":${obj[key]}}`
        )
      })
    },
    saveTheme() {
      localStorage.setItem('theme', JSON.stringify(this.theme))
    },
    resetTheme() {
      this.theme = { ...defaultTheme }
      localStorage.removeItem('theme')
      this.updateTheme()
    },
    updateTheme() {
      const index = this.theme.themeName.indexOf('-')
      const themeName = this.theme.themeName.substring(0, index) || 'blue'

      const variables = require(`@lib/styles/variables/yes-${themeName}-variables.scss`)
      Object.keys(variables).forEach((key) => {
        if (key.startsWith('yes-')) {
          useCssVar(key.replace('yes-', '--el-'), ref(null)).value =
            variables[key]
        }
      })

      this.echartsGraphic1 = [
        variables['yes-color-transition'],
        variables['yes-color-primary'],
      ]

      this.echartsGraphic2 = [
        variables['yes-color-primary-light-5'],
        variables['yes-color-primary'],
      ]

      const menuBackground =
        this.theme.themeName.split('-')[1] || this.theme.themeName
      document.getElementsByTagName(
        'body'
      )[0].className = `yes-theme-${menuBackground}`

      if (this.theme.background !== 'none') {
        document
          .getElementsByTagName('body')[0]
          .classList.add(this.theme.background)
      }
    },
    toggleCollapse() {
      this.collapse = !this.collapse
      localStorage.setItem('collapse', `{"collapse":${this.collapse}}`)
    },
    toggleDevice(device) {
      this.updateState({ device })
    },
    openSideBar() {
      this.updateState({ collapse: false })
    },
    foldSideBar() {
      this.updateState({ collapse: true })
    },
    changeLanguage(language) {
      this.updateState({ language })
    },
    handleLock() {
      this.updateState({ lock: true })
    },
    handleUnLock() {
      this.updateState({ lock: false })
    },
    changeLogo(logo) {
      this.updateState({ logo })
    },
    changeTitle(title) {
      this.updateState({ title })
    },
  },
})
