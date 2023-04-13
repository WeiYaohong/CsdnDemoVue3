<script setup>
  import { useSettingsStore } from '@/store/modules/settings'

  const $pub = inject('$pub')

  const settingsStore = useSettingsStore()
  const { theme } = storeToRefs(settingsStore)

  const handleOpenTheme = () => {
    $pub('theme')
  }
</script>

<template>
  <span v-if="theme.showTheme">
    <yes-icon icon="brush-2-line" @click="handleOpenTheme" />
  </span>
</template>
