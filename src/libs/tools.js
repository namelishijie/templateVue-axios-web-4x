// 去除前后空格
const trim = str => str.replace(/(^\s*)|(\s*$)/g, "")

// 去除所有空格
const trimAll = str => str.replace(/\s/g,"")

// 手机号中间 4 位数 * 号
const privacyPhone = value => String(value).replace(/^(\d{3})\d*(\d{4})$/,'$1****$2')

// 判空
const isFalse = value => {
  if (value == '' || value == undefined || value == null || value == 'null' || value == 'undefined' || value == 0 || value == false || value == NaN) return true
  return false
}

// 并集( 合并数组 )
const union = (A, B) => [...new Set([...A, ...B])]

// 交集( 返回同数据数组 )
const intersect = (A, B) => [...new Set([...A].filter(v => new Set(B).has(v)))]

// 差集( 返回不同数据数组 )
const difference = (A, B) => [...new Set([...A].filter(v => !new Set(B).has(v)))]



/**
 * @export arrayQueryExists  判断值是否存在 A 数组里面， 并返回存在的值
 * @param {array} A 要查询的数组
 * @param {array} B 要查询字段的值
 * @param {String} C 要查询的字段
 * 
 *  let arr = [{id:1, name: 'a'}, {id: 2, name: 'b'}, {id:3, name: 'c'}, {id:4, name: 'd'}]
 *  let returnArr = arrayQueryExists(arr, [4,3], 'id')
 *  consoel.log(returnArr) //  return ->  [{id: 3, name: "c"}, {id: 4, name: "d"}]
 */
const arrayQueryExists = (A, B, C) => A.filter(item => new Set(B).has(item[C]))


/**
 * @export deepCloneObject  合并对象
 * @param {Object} A 对象1
 * @param {Object} B 对象2
 * @param {String} C 是否深合并
 * 
 *  键名相同  对象2会覆盖对象1 的值
 */
const deepCloneObject = (A, B, C) => {
  let newObject = Object.assign({}, A, B)
  if(C) {
    for(var key in A) {
      if(typeof A[key] ===  "object") {
        newObject[key] = deepCloneObject(A[key], B[key], true)
      }
    }
  }
  return newObject
}


/**
 * @export removeArrElement  删除数组元素
 * @param {array} A 对象1
 * @param {array} B 删除参数名
 * @param {Boolean} 数组深删除
 * 
 */
const removeArrElement = (A, B, C) => {
  let arr = new Set(A)
  let newArr = new Set()
  B.forEach(item => {
    arr.delete(item)
  })
  if(C) {
    arr.forEach(item => {
      if(Array.isArray(item)) {
        newArr.add(removeArrElement(item, B, C))
      }else {
        newArr.add(item)
      }
    })
  }else {
    return [...arr]
  }
  return [...newArr]
}




export default {
  install(Vue) {
    // Vue.prototype.$trim = trim
    // Vue.prototype.$trimAll = trimAll
    // Vue.prototype.$privacyPhone = privacyPhone
  }
}
