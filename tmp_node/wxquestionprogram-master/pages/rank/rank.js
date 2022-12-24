// pages/rank/rank.js
var utils = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankList: [],
    totalList: [],
    uhide: 1
  },
  onLoad() {
    this.getRankList()
  },
  async getRankList() {
    let department = wx.getStorageSync('userInfo').department
    let response = null
    await utils.showLoading()
    await utils.Http.asyncRequest(
      //'http://127.0.0.1:9005/api/user/rank/',
      'https://www.ngzyq.top/api/user/rank/',
      'GET',
      {
        department: department
      },
      res => {
        response = res
      }
    )
    await utils.hideLoading()
    if (response.data.code == 0) {
      this.setData({
        rankList: response.data.rankList,
        totalList: response.data.totalList
      })
    }
  },
  tigger: function (e) {

    var that = this;

    var toggleBtnVal = that.data.uhide

    var num = e.currentTarget.dataset.num

    if (toggleBtnVal == num) {

      that.setData({

        uhide: 0

      })

    } else {

      that.setData({

        uhide: num

      })

    }

  }
})