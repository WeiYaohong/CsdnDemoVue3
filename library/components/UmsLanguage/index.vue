<script setup>
  import { useSettingsStore } from '@/store/modules/settings'
  import getPageTitle from '@/utils/pageTitle'
  import i18n from '@/i18n'

  const route = useRoute()

  const settingsStore = useSettingsStore()
  const { theme } = storeToRefs(settingsStore)
  const { changeLanguage } = settingsStore

  const handleCommand = (language) => {
    changeLanguage(language)
    i18n.global.locale = language
    document.title = getPageTitle(route.meta.title)
  }
</script>

<template>
  <el-dropdown v-if="theme.showLanguage" @command="handleCommand">
    <yes-icon icon="translate" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh">中文简体</el-dropdown-item>
        <el-dropdown-item command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
