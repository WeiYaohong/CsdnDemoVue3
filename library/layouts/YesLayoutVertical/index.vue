<!-- 纵向布局 -->
<script setup>
  import { useSettingsStore } from '@/store/modules/settings'

  defineProps({
    collapse: {
      type: Boolean,
      default() {
        return false
      },
    },
    fixedHeader: {
      type: Boolean,
      default() {
        return true
      },
    },
    showTabs: {
      type: Boolean,
      default() {
        return true
      },
    },
    device: {
      type: String,
      default() {
        return 'desktop'
      },
    },
  })

  const settingsStore = useSettingsStore()
  const { foldSideBar } = settingsStore
</script>

<template>
  <div
    class="yes-layout-vertical"
    :class="{
      fixed: fixedHeader,
      'no-tabs-bar': !showTabs,
    }"
  >
    <ums-side-bar />
    <div
      v-if="device === 'mobile' && !collapse"
      class="v-modal"
      @click="foldSideBar"
    />
    <div
      class="yes-main"
      :class="{
        'is-collapse-main': collapse,
      }"
    >
      <div
        class="yes-layout-header"
        :class="{
          'fixed-header': fixedHeader,
        }"
      >
        <ums-nav />
        <ums-tabs v-show="showTabs" />
      </div>
      <ums-app-main />
    </div>
  </div>
</template>
