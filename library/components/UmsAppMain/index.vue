<script setup>
  import { useRoutesStore } from '@/store/modules/routes'
  import { handleActivePath } from '@/utils/routes'

  const route = useRoute()

  const routesStore = useRoutesStore()
  const { tab, activeMenu } = storeToRefs(routesStore)

  watch(
    route,
    () => {
      if (tab.value.data !== route.matched[0].name)
        tab.value.data = route.matched[0].name
      activeMenu.value.data = handleActivePath(route)
    },
    { immediate: true }
  )
</script>

<template>
  <div class="yes-app-main">
    <section>
      <UmsRouterView />
    </section>
    <ums-footer />
  </div>
</template>
