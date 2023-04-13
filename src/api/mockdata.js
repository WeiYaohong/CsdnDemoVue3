//import request from '@/utils/request'
//模拟数据

//获取产品列表
export async function getProductList() {
  let result = ['PIX12', 'WSG']
  let ctx = {
    code: 200,
    data: result,
    msg: 'ok',
  }
  return ctx
}
