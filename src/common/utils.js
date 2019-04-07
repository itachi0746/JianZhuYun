/* eslint-disable */
export default {
  /**
   * 导航到指定页面
   * @param pageName
   * @param defaultUrl
   * @param paramter
   */
  goToPage: function (pageName, defaultUrl, paramter) {
    let theParamterArray = []
    for (let key in paramter) {
      theParamterArray.push(key + '=' + paramter[key])
    }
    location.href = defaultUrl + '?' + theParamterArray.join('&')
  },
  // 获得url中的参数,放在对象中,然后返回这个对象
  getUrlParams: function () {
    let args = {}
    let query = location.search.substring(1) // 获取查询串
    let pairs = query.split('&')// 在逗号处断开
    for (let i = 0; i < pairs.length; i++) {
      let pos = pairs[i].indexOf('=')// 查找name=value
      if (pos === -1) continue// 如果没有找到就跳过
      let argname = pairs[i].substring(0, pos).toLowerCase()// 提取name
      let value = pairs[i].substring(pos + 1)// 提取value
      args[argname] = decodeURIComponent(value)// 存为属性
    }
    return args
  },
  IOSConfig: function () {
    let userAgent = navigator.userAgent
    if (userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('Mac') > -1) {
      console.log('on iphone/mac')
      window.addEventListener('popstate', function (e) {
        // alert("后退");
        console.log('后退')
        self.location.reload()
      }, false)
      let state = {
        title: '',
        url: '#'
      }
      window.history.replaceState(state, '', '#')
    }
  },
  /**
   * 节流函数。
   */
  throttle: function (action, delay) {
    let timeout = null
    let lastRun = 0
    return function () {
      if (timeout) return
      let elapsed = Date.now() - lastRun
      let context = this
      let args = arguments
      let runCallback = function () {
        lastRun = Date.now()
        timeout = false
        action.apply(context, args)
      }
      if (elapsed >= delay) {
        runCallback()
      } else {
        timeout = setTimeout(runCallback, delay)
      }
    }
  },
  /**
   * 判断是否已经过指定的分钟
   * @param timeStamp 上一个时间戳(毫秒)
   * @param interval 时间间隔(分钟)
   */
  canRefresh: function (timeStamp, interval) {
    // debugger
    var curTime = new Date().valueOf()
    interval = interval * 60000
    timeStamp = timeStamp.valueOf()
    var result = curTime - timeStamp
    return result > interval
  },
  getClientHeight: function () {
    let clientHeight = 0
    // if (document.body.clientHeight && document.documentElement.clientHeight) {
    //   clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    // } else {
    //   clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    // }
    if (document.documentElement.clientHeight) {
      clientHeight = document.documentElement.clientHeight
    }
    console.log('窗口高度:', clientHeight)
    return clientHeight
  },
  add0 (m) {
    return m < 10 ? '0' + m : m
  },
  /**
   * 时间戳转为为普通日期格式
   * @param shijianchuo 时间戳
   * @returns {string}
   */
  formatTime: function (shijianchuo) {
    //shijianchuo是整数，否则要parseInt转换
    // var time = new Date(shijianchuo)

    let time = shijianchuo
    let y = time.getFullYear()
    let m = time.getMonth() + 1
    let d = time.getDate()
    // var h = time.getHours()
    // var mm = time.getMinutes()
    // var s = time.getSeconds()
    // return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s)
    return y + '-' + this.add0(m) + '-' + this.add0(d)
  },
  /**
   * json转formdata
   * @param jsonData
   * @returns {*}
   */
  JsonToFormData: function (jsonData) {
    var form = new FormData()
    form.append('param', JSON.stringify(jsonData))
    return form
  },
  /**
   * 把数组里的对象转为formdata
   * @param dataArr
   */
  createFormData: function (dataArr) {
    let form = new FormData()
    for (let obj of dataArr) {
      if (!obj.value) {
        console.log(`${obj.name}不能为空`)
        return false
      }
      form.append(obj.fieldName, obj.value)
    }
    return form
  },
  /**
   * 格式化后台返回的日期字符串, 返回时间抽
   * @param dateStr
   */
  formatDate: function (dateStr) {
    if (!dateStr || typeof dateStr !== 'string') {
      console.log('参数错误:', dateStr)
      return
    }
    let theResult = dateStr
    let theReg = /\/Date\(\d*\)\//g
    let theReg2 = /\/Date\(-?\d*\)\//g
    if (!theReg.test(theResult)) {
      if (theReg2.test(theResult)) { // 带负号的时间, 为空值
        return null
      }
      return theResult
    }
    theResult = 'new ' + theResult.substr(1, theResult.length - 2)
    console.log(theResult)

    theResult = eval(theResult)
    console.log(theResult)

    return theResult
  },
  /**
   * 统一处理时间
   * @param dateStr
   */
  handleTime: function (dateStr) {
    let theResult = this.formatDate(dateStr)
    if (theResult === null) {
      return theResult
    }
    theResult = this.formatTime(theResult)
    return theResult
  },
  /**
   * 判断是空对象
   * @param obj 对象
   * @returns {boolean}
   */
  isEmptyObject: function (obj) {
    for (var key in obj) {
      return false
    }
    return true
  },
  /**
   * 判断是不是空的
   * @param param
   * @returns {boolean}
   */
  isEmpty: function (param) {
    var me = this
    var theType = typeof param
    var empty = false
    switch (theType)
    {
      case 'string':
        if (param === '') {
          console.log('参数为空字符串')
          empty = true
        }
        break
      case 'array':
        if (param.length === 0) {
          console.log('参数为空数组')
          empty = true
        }
        break
      case 'object':
        empty = me.isEmptyObject(param)
        break
    }
    return empty
  }
}
