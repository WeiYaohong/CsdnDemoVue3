//import request from '@/utils/request'
//模拟数据

//获取产品列表
export async function getTableList() {
  let result = [
    {
      id: 1,
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      id: 2,
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      id: 3,
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      id: 4,
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ]
  let ctx = {
    code: 200,
    data: result,
    msg: 'ok',
  }
  return ctx
}
