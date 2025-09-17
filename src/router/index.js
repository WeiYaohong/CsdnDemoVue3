/**
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，pro版只支持remixIcon图标，具体配置请查看vip群文档
 */
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import Layout from '@lib/layouts'
import { setupPermissions } from './permissions'
import { authentication, isHashRouterMode, publicPath } from '@/config'

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/403'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    meta: {
      hidden: true,
    },
  },
]

export const asyncRoutes = [
  {
    path: '/',
    name: 'Root',
    component: Layout,
    meta: {
      title: '首页',
      icon: 'home-2-line',
      breadcrumbHidden: true,
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index'),
        meta: {
          title: '首页',
          icon: 'home-2-line',
          noClosable: true,
        },
      },
    ],
  },
  {
    path: '/elementplus',
    name: 'elementplus',
    component: Layout,
    meta: {
      title: 'Ele',
      icon: 'layout-line',
      breadcrumbHidden: true,
    },
    children: [
      {
        path: 'sortable',
        name: 'sortable',
        component: () => import('@/views/ele/sortable'),
        meta: {
          title: '表格拖拽排序',
          icon: 'table-line',
        },
      },
      {
        path: 'regularcheck',
        name: 'regularcheck',
        component: () => import('@/views/ele/regularCheck'),
        meta: {
          title: '正则校验',
          icon: 'survey-line',
        },
      },
      {
        path: 'fullscreen',
        name: 'fullscreen',
        component: () => import('@/views/ele/fullscreen'),
        meta: {
          title: '全屏封装',
          icon: 'survey-line',
        },
      },
    ],
  },
  {
    path: '/echart',
    name: 'echart',
    component: Layout,
    meta: {
      title: 'Echart',
      icon: 'layout-line',
      breadcrumbHidden: true,
    },
    children: [
      {
        path: 'echart_pie',
        name: 'echart_pie',
        component: () => import('@/views/echart/pie'),
        meta: {
          title: '饼图',
          icon: 'table-line',
        },
      },
    ],
  },

  {
    path: '/semcon',
    name: 'semcon',
    component: Layout,
    meta: {
      title: 'Semcon+',
      icon: 'layout-line',
      breadcrumbHidden: true,
    },
    children: [
      {
        path: 'workload',
        name: 'workload',
        component: () => import('@/views/semcon/WorkLoadMonthReport'),
        meta: {
          title: 'workload',
          icon: 'table-line',
        },
      },
      {
        path: 'workload_tender',
        name: 'workload_tender',
        component: () => import('@/views/semcon/WorkLoadMonthTenderReport'),
        meta: {
          title: 'workload_tender',
          icon: 'table-line',
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'NotFound',
    meta: {
      hidden: true,
    },
  },
]

const router = createRouter({
  history: isHashRouterMode
    ? createWebHashHistory(publicPath)
    : createWebHistory(publicPath),
  routes: constantRoutes,
})

function fatteningRoutes(routes) {
  return routes.flatMap((route) => {
    return route.children ? fatteningRoutes(route.children) : route
  })
}

function addRouter(routes) {
  routes.forEach((route) => {
    if (!router.hasRoute(route.name)) router.addRoute(route)
    if (route.children) addRouter(route.children)
  })
}

export function resetRouter(routes = constantRoutes) {
  routes.map((route) => {
    if (route.children) {
      route.children = fatteningRoutes(route.children)
    }
  })
  router.getRoutes().forEach((route) => {
    const routeName = route.name
    router.hasRoute(routeName) && router.removeRoute(routeName)
  })
  addRouter(routes)
}

export function setupRouter(app) {
  if (authentication === 'intelligence') addRouter(asyncRoutes)
  setupPermissions(router)
  app.use(router)
  return router
}

export default router
