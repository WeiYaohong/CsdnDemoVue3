<script setup>
  import { translateTitle } from '@/utils/i18n'

  defineProps({
    itemOrMenu: {
      type: Object,
      default() {
        return null
      },
    },
  })
</script>

<template>
  <template v-if="itemOrMenu.meta && itemOrMenu.meta.levelHidden">
    <template v-for="route in itemOrMenu.children" :key="route.path">
      <ums-menu :item="route" />
    </template>
  </template>
  <el-sub-menu v-else :index="itemOrMenu.path" popper-append-to-body>
    <template #title>
      <yes-icon
        v-if="itemOrMenu.meta && itemOrMenu.meta.icon"
        :icon="itemOrMenu.meta.icon"
        :is-custom-svg="itemOrMenu.meta.isCustomSvg"
        :title="translateTitle(itemOrMenu.meta.title)"
      />
      <span :title="translateTitle(itemOrMenu.meta.title)">
        {{ translateTitle(itemOrMenu.meta.title) }}
      </span>
    </template>
    <slot />
  </el-sub-menu>
</template>
