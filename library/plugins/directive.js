import { hasPermission } from '@/utils/permission'

export function setup(app) {
  /**
   * @description 自定义指令v-permissions
   */
  app.directive('permissions', {
    mounted(el, binding) {
      const { value } = binding
      if (value)
        if (!hasPermission(value))
          el.parentNode && el.parentNode.removeChild(el)
    },
  })
}
