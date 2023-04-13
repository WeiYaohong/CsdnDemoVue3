<!--常规布局 -->
<script setup>
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
</script>

<template>
  <div
    class="yes-layout-common"
    :class="{
      fixed: fixedHeader,
      'no-tabs-bar': !showTabs,
    }"
  >
    <div
      class="yes-layout-header"
      :class="{
        'fixed-header': fixedHeader,
      }"
    >
      <ums-header layout="common" />
      <div>
        <ums-side-bar layout="common" />
        <div
          v-show="showTabs"
          class="yes-main"
          :class="{
            'is-collapse-main': collapse,
          }"
        >
          <ums-tabs layout="common" />
        </div>
      </div>
    </div>
    <div
      class="yes-main main-padding"
      :class="{
        'is-collapse-main': collapse,
      }"
    >
      <ums-app-main />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .yes-layout-common {
    :deep() {
      .yes-tabs-content {
        width: calc(
          100% - 60px - #{$base-font-size-default} - #{$base-padding} - 2px
        ) !important;
      }

      .yes-header {
        .yes-main {
          width: 100%;
          margin: auto $base-margin;
        }
      }
    }
  }
</style>
