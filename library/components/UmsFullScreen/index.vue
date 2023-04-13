<script setup>
  import { useSettingsStore } from '@/store/modules/settings'

  const { isFullscreen, toggle } = useFullscreen()

  const settingsStore = useSettingsStore()
  const { theme } = storeToRefs(settingsStore)

  const fullScreen = () => {
    toggle()
  }
  const changeClassName = () => {
    var appBox = document.querySelector('#app')
    if (isFullscreen.value) {
      //全屏添加类
      if (appBox.className) {
        let oriName = appBox.className
        let newClass = oriName + ' yes-layout-common_full'
        appBox.className = newClass
      } else {
        appBox.className = 'yes-layout-common_full'
      }
    } else {
      //不是全屏去除类
      if (appBox.className) {
        let oriName = appBox.className
        let newClass = oriName
          .replace('yes-layout-common_full', '')
          .replaceAll(' ', '')
        if (newClass == '') {
          appBox.className = undefined
        } else {
          appBox.className = newClass
        }
      }
    }
  }
  watch(
    isFullscreen,
    () => {
      changeClassName()
    },
    { deep: true }
  )
</script>

<template>
  <!-- <yes-icon
    v-if="theme.showFullScreen"
    :icon="isFullscreen ? 'fullscreen-exit-fill' : 'fullscreen-fill'"
    @click="toggle"
  /> -->
  <yes-icon
    v-if="theme.showFullScreen"
    :icon="isFullscreen ? 'fullscreen-exit-fill' : 'fullscreen-fill'"
    @click="fullScreen"
  />
</template>
<style>
  .yes-layout-common_full .yes-layout-common {
    padding-top: 0px !important;
  }
  .yes-layout-common_full .yes-layout-column {
    padding-top: 0px !important;
  }
  .yes-layout-common_full .yes-layout-comprehensive {
    padding-top: 0px !important;
  }
  .yes-layout-common_full .yes-layout-vertical {
    padding-top: 0px !important;
  }
  .yes-layout-common_full .yes-layout-horizontal {
    padding-top: 0px !important;
  }
  .yes-layout-common_full .yes-layout-float {
    padding-top: 0px !important;
  }
  .yes-layout-common_full .yes-layout-comprehensive .yes-side-bar {
    z-index: 0 !important;
  }
  .yes-layout-common_full .yes-layout-float .yes-main {
    margin-left: 0px !important;
    z-index: 2001 !important;
  }

  .yes-layout-common_full .yes-layout-header {
    display: none !important;
  }
  .yes-layout-common_full .yes-main {
    margin-left: 0px !important;
  }
  .yes-layout-common_full .yes-app-main {
    padding: 0px !important;
    height: 100vh !important;
  }
  .yes-layout-common_full .yes-footer {
    display: none !important;
  }
  .yes-layout-common_full .yes-app-main .comprehensive-table-container {
    height: 100vh !important;
  }
</style>
