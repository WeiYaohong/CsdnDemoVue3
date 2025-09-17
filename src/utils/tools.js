const Base64 = require('js-base64').Base64
/**
 * 判断是否空值
 * @param {*} data
 * @returns
 */
export function isEmptyOrNull(data) {
  if (
    data === undefined ||
    data === null ||
    data === '' ||
    JSON.stringify(data) === '{}' ||
    JSON.stringify(data) === '[]'
  ) {
    return true
  } else {
    return false
  }
}

/**
 * Base64加密
 * @param {*} data
 * @returns
 */
export function base64Encode(data) {
  return Base64.encode(data)
}
/**
 * Base64解密
 * @param {*} data
 * @returns
 */
export function base64Decode(data) {
  return Base64.decode(data)
}

/**
 * 计算字符串长度 中文字符+2，英文字符+1
 * @param {*} str
 * @returns
 */
export function realLength(str) {
  var realLength = 0,
    charCode = -1
  if (!isEmptyOrNull(str)) {
    for (var i = 0; i < str.length; i++) {
      charCode = str.charCodeAt(i)
      if (charCode >= 0 && charCode <= 128) realLength += 1
      else realLength += 2
    }
  }
  return realLength
}

export function formatDate(value, args) {
  if (value == undefined || value == null || value == '') {
    return ''
  }
  var dt = new Date(value)
  if (args == 'yyyy-M-d') {
    let year = dt.getFullYear()
    let month = dt.getMonth() + 1
    let date = dt.getDate()
    return `${year}-${month}-${date}`
  } else if (args == 'yyyy-M-d H:m:s') {
    let year = dt.getFullYear()
    let month = dt.getMonth() + 1
    let date = dt.getDate()
    let hour = dt.getHours()
    let minute = dt.getMinutes()
    let second = dt.getSeconds()
    return `${year}-${month}-${date} ${hour}:${minute}:${second}`
  } else if (args == 'yyyy-MM-dd') {
    let year = dt.getFullYear()
    let month = (dt.getMonth() + 1).toString().padStart(2, '0')
    let date = dt.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${date}`
  } else if (args == 'yyyy-MM') {
    let year = dt.getFullYear()
    let month = (dt.getMonth() + 1).toString().padStart(2, '0')
    return `${year}-${month}`
  } else {
    let year = dt.getFullYear()
    let month = (dt.getMonth() + 1).toString().padStart(2, '0')
    let date = dt.getDate().toString().padStart(2, '0')
    let hour = dt.getHours().toString().padStart(2, '0')
    let minute = dt.getMinutes().toString().padStart(2, '0')
    let second = dt.getSeconds().toString().padStart(2, '0')
    return `${year}-${month}-${date} ${hour}:${minute}:${second}`
  }
}

export function getWeekDate(date) {
  var now = new Date(date)
  var day = now.getDay()
  var weeks = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六')
  var week = weeks[day]
  return week
}

export function getNextWorkDay_SP(date) {
  var now = new Date(date)
  var day = now.getDay()
  if (day == 5) {
    return 3
  } else if (day == 6) {
    return 2
  } else {
    return 1
  }
}
export function getNextWorkDay() {
  var currDate = Date.now()
  return getWorkDay(currDate, getNextWorkDay_SP(currDate))
}

export function getWorkDay(val, sp) {
  var dateTime = new Date(val)
  dateTime = dateTime.setDate(dateTime.getDate() + sp)
  dateTime = new Date(dateTime)
  return dateTime
}
//
export function cloneByJson(val) {
  try {
    return JSON.parse(JSON.stringify(val))
  } catch (e) {
    console.log('CloneByJson.error', e)
  }
}

export function switchDictData(dictdata, val) {
  let vStr = '-'
  if (val === null || val === undefined || val === '') {
    vStr = ''
    return
  }
  if (dictdata)
    dictdata.forEach((item) => {
      if (item.value === val || item.value == val) {
        vStr = item.label
        return
      }
    })
  return vStr
}

export function isNullOrEmpty(val) {
  let bRts = false
  if (val == null || val == undefined || val == '') {
    bRts = true
  }
  return bRts
}

export function isNotNullOrEmpty(val) {
  let bRts = true
  if (isNullOrEmpty(val)) {
    bRts = false
  }
  return bRts
}
//打开EAS窗口
export function OpenWindowJumpToEAS(data, setting) {
  let _url =
    `${setting.easUrl}?projectid=${data.projectid}` +
    `&sys=${data.sys}&status=${data.status}&action=${data.action}` +
    `&quotationid=${data.quotationid}` +
    `&oppidsemcon1=${data.oppidsemcon1}&oppidsemcon2=${data.oppidsemcon2}` +
    `&product=${data.product}&tenderno=${data.tenderno}`
  window.open(_url)

  //   let _url =
  //   `http://10.177.186.130:1803/login?projectid=${data.projectid}` +
  //   `&sys=${data.sys}&status=${data.status}&action=${data.action}` +
  //   `&quotationid=${data.quotationid}` +
  //   `&oppidsemcon1=${data.oppidsemcon1}&oppidsemcon2=${data.oppidsemcon2}` +
  //   `&product=${data.product}&tenderno=${data.tenderno}`
  // window.open(_url)
}

//结构化闭锁规则内数据
export function changeDataStruct(list) {
  let opdata = {}
  list.forEach((item) => {
    opdata[item.id] = item.v
  })
  return opdata
}
//拼接闭锁校验规则
//rules内item.t 为true 拼接的是 ==-1 表示选项不等于
export function createLockedFunc(list) {
  let str = ''
  list.forEach((item, index) => {
    if (index > 0) {
      str += ' && '
    }
    if (item.id.includes('show')) {
      str +=
        (item.t == true ? ' !' : '') +
        '_d.' +
        item.id +
        '.some(w=>d.' +
        item.id +
        '.includes(w))'
    } else {
      str +=
        '_d.' +
        item.id +
        '.indexOf(d.' +
        item.id +
        ')' +
        (item.t == true ? '==' : '>') +
        '-1'
    }
  })
  return str
}
//原版-未与弹窗显示值闭锁
// export function createLockedFunc(list) {
//   let str = ''
//   list.forEach((item, index) => {
//     if (index > 0) {
//       str += '&&'
//     }
//     str +=
//       '_d.' +
//       item.id +
//       '.indexOf(d.' +
//       item.id +
//       ')' +
//       (item.t == true ? '==' : '>') +
//       '-1'
//   })
//   return str
// }

//计算对象的属性个数
export function objAttributeCount(obj) {
  return Object.getOwnPropertyNames(obj).length
}
export function formatAmount(amount) {
  if (!amount) {
    return '-'
  }
  //强制保留两位小数
  let f = parseFloat(amount)
  if (isNaN(f)) return false
  f = Math.round(amount * 100) / 100
  let s = f.toString()
  let rs = s.indexOf('.')
  if (rs < 0) {
    rs = s.length
    s += '.'
  }
  while (s.length < rs + 1 + 2) {
    s += '0'
  }
  //每三位用一个逗号隔开
  let leftNum = s.split('.')[0]
  let rightNum = '.' + s.split('.')[1]
  let result
  //定义数组记录截取后的价格
  let resultArray = new Array()
  if (leftNum.length > 3) {
    let i = true
    while (i) {
      resultArray.push(leftNum.slice(-3))
      leftNum = leftNum.slice(0, leftNum.length - 3)
      if (leftNum.length < 4) {
        i = false
      }
    }
    //由于从后向前截取，所以从最后一个开始遍历并存到一个新的数组，顺序调换
    let sortArray = new Array()
    for (let i = resultArray.length - 1; i >= 0; i--) {
      sortArray.push(resultArray[i])
    }
    result = leftNum + ',' + sortArray.join(',') + rightNum
  } else {
    result = s
  }
  if (result && result.indexOf('-,') >= 0) {
    result = result.replace('-,', '-')
  }
  return result
}
/**
 * 对源数据截取decimals位小数，不进行四舍五入
 * @param {*} num 源数据
 * @param {*} decimals 保留的小数位数
 */
export function formatDecimal(num, decimals = 2) {
  if (isNaN(num) || (!num && num !== 0)) {
    return '-'
  }

  function toNonExponential(_num) {
    var m = Number(_num)
      .toExponential()
      .match(/\d(?:\.(\d*))?e([+-]\d+)/)
    return Number(_num).toFixed(Math.max(0, (m[1] || '').length - m[2]))
  }

  // 为了兼容科学计数法的数字
  num = toNonExponential(num)
  // 获取小数点的位置 + 1（不存在小数点的indexOf值为-1）
  const pointIndex = String(num).indexOf('.') + 1
  // 获取小数点后的个数(需要保证有小数位)
  const pointCount = pointIndex ? String(num).length - pointIndex : 0

  // 补零函数
  function zeroFill(zeroNum, num) {
    for (let index = 0; index < zeroNum; index++) {
      num = `${num}0`
    }
    return num
  }

  // 源数据为"整数"或者小数点后面小于decimals位的作补零处理
  if (pointIndex === 0 || pointCount <= decimals) {
    let tempNumA = num
    // 区分"整数"和"小数"的补零
    if (pointIndex === 0) {
      tempNumA = `${tempNumA}.`
      tempNumA = zeroFill(decimals - pointCount, tempNumA)
    } else {
      tempNumA = zeroFill(decimals - pointCount, tempNumA)
    }
    return String(tempNumA)
  }

  // 截取当前数据到小数点后decimals位
  const Int = String(num).split('.')[0]
  const Decimal = String(num).split('.')[1].substring(0, decimals)
  const tempNumB = `${Int}.${Decimal}`

  // 需求：数据为0时，需要显示为0，而不是0.00...
  return Number(tempNumB) === 0 ? 0 : tempNumB
}
export function formatName(name) {
  let newStr
  if (!name) {
    return '-'
  }
  if (name.length === 2) {
    newStr = name.substr(0, 1) + '*'
  } else if (name.length > 2) {
    let char = ''
    let _lg = name.length - 2
    for (let i = 0; i < _lg; i++) {
      char += '*'
    }
    newStr = name.substr(0, 1) + char + name.substr(name.length - 1, 1)
    // console.log(
    //   name,
    //   name.length,
    //   name.substr(0, 1),
    //   char,
    //   name.length,
    //   name.substr(name.length - 2, 1)
    // )
  } else {
    newStr = name
  }
  return newStr
}

//将对象转为key-value对象数组
/**
 * 输入{name:'张三',age:'18'}
 * 输出[{key:'name',value:'张三'},{key:'age',value:'18'}]
 * @param {*} obj
 */
export function objTokvList(obj) {
  var list = []
  for (let i in obj) {
    list.push({
      key: i,
      value: obj[i],
    })
  }
  return list
}
//将对象转为字符串数组
/**
 * 输入{name:'张三',age:'18'}
 * 输出['张三','18']
 * @param {*} obj
 */
export function objToArray(obj) {
  return Object.values(obj)
}
//特殊处理变电站闭锁数据
/**
 *
 * @param {*} data
 * 输入{gma:["","",""]}
 * 输出{gma:[{},{},{}]}
 */
export function ruleStrToList(data) {
  var result = []
  for (let i in data) {
    let rule = []
    data[i].forEach((x) => {
      rule.push(JSON.parse(x.replaceAll("'", '"')))
    })
    result[i] = rule
  }
  return result
}
/**
 * 字符串数组按照特定的数组顺序排序
 * @param {*} sortArr 要排序的字符串数组
 * @param {*} standardArr 排序模板 字符串数组
 */
export function sortArrayWithStandard(sortArr, standardArr) {
  if (isEmptyOrNull(sortArr)) {
    sortArr = []
  }
  if (isEmptyOrNull(standardArr)) {
    standardArr = []
  }
  let newArr = JSON.parse(JSON.stringify(sortArr))
  newArr.sort(function (a, b) {
    return standardArr.indexOf(a) - standardArr.indexOf(b)
  })
  return newArr
}
/**
 * 对象数组按照特定的数组顺序排序
 * @param {*} sortArr 要排序的对象数组
 * @param {*} standardArr 排序模板 字符串数组
 * @param {*} sortField 排序字段
 * @returns
 */
export function sortObjArrayWithStandard(sortArr, standardArr, sortField) {
  if (isEmptyOrNull(sortArr)) {
    sortArr = []
    return newArr
  }
  if (isEmptyOrNull(standardArr)) {
    standardArr = []
    return sortArr
  }
  let newArr = JSON.parse(JSON.stringify(sortArr))
  newArr.sort(function (a, b) {
    return standardArr.indexOf(a[sortField]) - standardArr.indexOf(b[sortField])
  })
  return newArr
}
/**
 * 字符串数组去重
 * @param {*} arr
 */
export function uniqArr(arr) {
  var newArr = []
  for (var i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) == -1) {
      newArr.push(arr[i])
    }
  }
  return newArr
}
