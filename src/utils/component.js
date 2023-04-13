import axios from 'axios'
/**
 * @description 获取指定路径json文件
 * @param path
 * @returns {*}
 */
export async function getJsonData(path) {
  let value = await axios.get(`.${path}.json`, {}).then((response) => {
    return response.data
  })
  return value
}

/**
 * @description 获取路由
 *
 */
export function getRouteData(route) {
  console.log(route)
}
