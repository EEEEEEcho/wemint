// index.js
// 获取应用实例
const app = getApp()
var utils = require('../../utils/util.js')
Page({
  data: {
    // imgList: []  //轮播图
  },

  onLoad() {
    // //0.清除选了是刷题还是考试
    // wx.removeStorageSync('choose')
    // //1.请求轮播图 图片
    // wx.request({
    //   url: 'http://127.0.0.1:8080/image/getAll',
    //   //url: 'http://121.36.64.201:9005/image/getAll',
    //   success: res => {
    //     let urls = []
    //     for (const image of res.data) {
    //       urls.push(image.url)
    //     }
    //     //console.log(urls)
    //     this.setData({
    //       imgList: urls
    //     })
    //   },
    //   fail: err => {
    //     console.log("轮播图初始化失败，请检查网络情况")
    //     console.log(err)
    //   }
    // })
  },
  gotoExercise(event) {
    //存一下选的是答题
    wx.setStorageSync('choose', 'exercise')

    let userInfo = wx.getStorageSync('userInfo')
    let workType = userInfo['workType']
    if (workType == '未选择') {
      //没选择过工种，就跳转到工种
      wx.navigateTo({
        url: '/pages/worktype/worktype',
      })
    }
    else {
      //选择过工种，跳到相应工种题目页面
      wx.navigateTo({
        url: '/pages/questionlist/questionlist',
      })
    }
  },
  gotoExam(event) {
    wx.setStorageSync('choose', 'exam')

    let userInfo = wx.getStorageSync('userInfo')
    let workType = userInfo['workType']
    if (workType == '未选择') {
      //没选择过工种，就跳转到工种
      wx.navigateTo({
        url: '/pages/worktype/worktype',
      })
    }
    else {
      //选择过工种，跳到相应工种题目页面
      wx.navigateTo({
        url: '/pages/questionlist/questionlist',
      })
    }
  },
  gotoRank(event) {
    wx.navigateTo({
      url: '/pages/rank/rank',
    })
  },
  goCompetitionOne(){
    wx.navigateTo({
      url: '/pages/random/random?question=competition1'
    })
  },
  goCompetitionTwo(){
    wx.navigateTo({
      url: '/pages/random/random?question=competetion2'
    })
  }

})
