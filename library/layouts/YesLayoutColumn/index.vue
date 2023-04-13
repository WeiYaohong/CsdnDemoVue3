<!--分栏布局 -->
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
  })

  const settingsStore = useSettingsStore()
  const { theme } = storeToRefs(settingsStore)
</script>

<template>
  <div
    class="yes-layout-column"
    :class="{
      fixed: fixedHeader,
      'no-tabs-bar': !showTabs,
    }"
  >
    <ums-column-bar />
    <div
      class="yes-main"
      :class="{
        ['yes-main-' + theme.columnStyle]: true,
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

<style lang="scss" scoped>
  .yes-layout-column {
    .yes-main {
      &.is-collapse-main {
        &.yes-main-horizontal {
          margin-left: $base-left-menu-width-min * 1.3;

          :deep() {
            .fixed-header {
              width: calc(100% - #{$base-left-menu-width-min} * 1.3);
            }
          }
        }
      }
    }
  }
</style>
