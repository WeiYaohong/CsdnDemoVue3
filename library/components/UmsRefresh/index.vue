<script setup>
  import { useSettingsStore } from '@/store/modules/settings'

  const $pub = inject('$pub')

  const settingsStore = useSettingsStore()
  const { theme } = storeToRefs(settingsStore)

  const refreshRoute = () => {
    $pub('reload-router-view')
  }
</script>

<template>
  <yes-icon
    v-if="theme.showRefresh"
    icon="refresh-line"
    @click="refreshRoute"
  />
</template>
