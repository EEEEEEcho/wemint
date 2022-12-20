const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const levelDict = {
  "青铜": 100, "白银": 300, "黄金": 600, "铂金": 1000, "钻石": 1500
}

const makeScoreToLevel = (score) => {
  if (score >= 0 && score < 100) {
    return "青铜"
  }
  else if (score >= 100 && score < 300) {
    return "白银"
  }
  else if (score >= 300 && score < 600) {
    return "黄金"
  }
  else if (score >= 600 && score < 1000) {
    return "铂金"
  }
  else if (score >= 1000) {
    return "钻石"
  }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const judgeLogin = () => {
  //判断是否有登录信息
  if (wx.getStorageSync('loginInfo') == null || wx.getStorageSync('loginInfo').length == 0) {
    return false
  }
  //否则证明缓存中有用户信息，
  return true
}

const judgeUserInfo = () => {
  if (wx.getStorageSync('userInfo') == null || wx.getStorageSync('userInfo').length == 0) {
    return false
  }
  return true
}


const judgeWorkType = () => {
  if (wx.getStorageSync('worktype') == null || wx.getStorageSync('worktype').length == 0) {
    return false;
  }
  return true;
}

const showLoading = () => {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中...',
      mask: true,
      success(res) {
        //console.log('显示loading')
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

const hideLoading = () => {
  return new Promise((resolve) => {
    wx.hideLoading()
    //console.log('隐藏loading')
    resolve()
  })
}

const promisic = function (func) {
  return function (params = {}) {
    return new Promise((resolve, reject) => {
      const args = Object.assign(params, {
        success: (res) => {
          resolve(res);
        },
        fail: (error) => {
          reject(error);
        }
      })
      func(args)
    })
  }
}

class Http {
  //同步Http请求
  static async asyncRequest(url, method, data, backMethod) {
    let res = await promisic(wx.request)({
      url: url,
      method: method,
      data: data
    })
    backMethod(res)
  }

  static async asyncWXLogin(backMethond) {
    let res = await promisic(wx.login)({

    })
    backMethond(res)
  }
}

const timeFormat = function(time){
  let minute = 0;
  let hour = 0;
  if(time > 60){
    minute = parseInt(time / 60)
    time = parseInt(time % 60)
    if(minute > 60){
      hour = parseInt(minute / 60)
      minute = parseInt(minute % 60)
    }
  }
  let result = "" + parseInt(time) + "秒"
  if(minute > 0){
    result = "" + parseInt(minute) + "分" + result;
  }
  if(hour > 0){
    result = "" + parseInt(hour) + "小时" + result;
  }
  return result;
}

module.exports = {
  formatTime,
  judgeLogin,
  judgeWorkType,
  judgeUserInfo,
  showLoading,
  hideLoading,
  Http,
  makeScoreToLevel,
  levelDict,
  timeFormat
}
