<!-- 横向布局 -->
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
    class="yes-layout-horizontal"
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
      <ums-header layout="horizontal" />
      <div
        v-show="showTabs"
        :class="{
          'yes-tabs-horizontal': showTabs,
        }"
      >
        <div class="yes-main">
          <ums-tabs />
        </div>
      </div>
    </div>
    <div class="yes-main main-padding">
      <ums-app-main />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .yes-layout-horizontal {
    :deep() {
      .yes-main {
        width: 100% !important;
        margin: auto !important;
      }
    }

    .yes-tabs-horizontal {
      background: var(--el-color-white);
      box-shadow: $base-box-shadow;
    }

    .yes-nav {
      .fold-unfold {
        display: none;
      }
    }
  }
</style>
