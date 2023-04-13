<!--综合布局 -->
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
    class="yes-layout-comprehensive"
    :class="{
      fixed: fixedHeader,
      'no-tabs-bar': !showTabs,
    }"
  >
    <ums-side-bar layout="comprehensive" />
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
        <ums-nav layout="comprehensive" />
        <ums-tabs v-show="showTabs" />
      </div>
      <ums-app-main />
    </div>
  </div>
</template>
