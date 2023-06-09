<script setup>
  import { useHead } from '@vueuse/head'
  import { useTabsStore } from '@/store/modules/tabs'
  import { useSettingsStore } from '@/store/modules/settings'
  import { handleActivePath } from '@/utils/routes'
  import { keepAliveMaxNum } from '@/config'
  import UmsProgress from 'nprogress'

  const route = useRoute()

  const $sub = inject('$sub')
  const $unsub = inject('$unsub')

  const settingsStore = useSettingsStore()
  const { theme } = storeToRefs(settingsStore)
  const tabsStore = useTabsStore()
  const { getVisitedRoutes: visitedRoutes } = storeToRefs(tabsStore)

  const componentRef = ref()
  const routerKey = ref()
  const keepAliveNameList = ref()

  const siteData = reactive({
    description: '',
  })
  useHead({
    meta: [
      {
        name: `description`,
        content: computed(() => siteData.description),
      },
    ],
  })

  const updateKeepAliveNameList = (refreshRouteName = null) => {
    keepAliveNameList.value = visitedRoutes.value
      .filter(
        (item) => !item.meta.noKeepAlive && item.name !== refreshRouteName
      )
      .flatMap((item) => item.name)
  }

  // 更新KeepAlive缓存页面
  watchEffect(() => {
    routerKey.value = handleActivePath(route, true)
    updateKeepAliveNameList()
    siteData.description = `vue3.0`
  })

  $sub('reload-router-view', (refreshRouteName = route.name) => {
    if (theme.value.showProgressBar) UmsProgress.start()
    const cacheActivePath = routerKey.value
    routerKey.value = null
    updateKeepAliveNameList(refreshRouteName)
    nextTick(() => {
      routerKey.value = cacheActivePath
      updateKeepAliveNameList()
    })
    setTimeout(() => {
      if (theme.value.showProgressBar) UmsProgress.done()
    }, 200)
  })

  onUnmounted(() => {
    $unsub('reload-router-view')
  })
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition
      mode="out-in"
      :name="theme.showPageTransition ? 'fade-transform' : 'no-transform'"
    >
      <keep-alive :include="keepAliveNameList" :max="keepAliveMaxNum">
        <component :is="Component" :key="routerKey" ref="componentRef" />
      </keep-alive>
    </transition>
  </router-view>
</template>
