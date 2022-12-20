// pages/update/update.js
var utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    realName: '',
    phoneNumber: '',
    workType: '',
    workTypeList: [],
    selected: -1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.init()
    let userInfo = wx.getStorageSync('userInfo')
    this.setData({
      realName: userInfo['realName'],
      phoneNumber: userInfo['phoneNumber'],
      workType: userInfo['workType']
    })
  },

  async init() {
    let that = this
    await utils.showLoading()
    await utils.Http.asyncRequest(
      //'http://127.0.0.1:9005/api/worktype/getAllName',
      'https://www.ngzyq.top/api/worktype/getAllName',
      'GET',
      {
      },
      res => {
        that.setData({
          workTypeList: res.data
        })
      }
    )
    await utils.hideLoading()
  },
  radioChange: function (e) {

    var items = this.data.workTypeList;
    var selected = 0;
    for (var i = 0; i < items.length; ++i) {
      items[i].checked = items[i].worktype_name == e.detail.value
      if (items[i].checked) {
        selected = i
      }
    }
    this.setData({
      workTypeList: items,
      selected: selected
    });
  },
  async formSubmit(e) {
    let realName = e.detail.value['realName']
    let phoneNumber = e.detail.value['phoneNumber']
    let password = e.detail.value['password']
    let repassword = e.detail.value['repassword']
    let workType = this.data.workTypeList[this.data.selected]

    // console.log("realName:" + realName + "\n" + "phoneNumber:" + phoneNumber + "\n")
    // console.log("password:" + password + "\n" + "repassword:" + repassword + "\n")
    //console.log("workType:" + workType['worktype_name'])

    if (realName == "" || realName.length == 0) {
      wx.showToast({
        title: '请填写用户名',
        icon: 'error',
        duration: 1000
      })
      return
    }
    const regu = /^1\d{10}$/;
    if (!regu.test(phoneNumber)) {
      wx.showToast({
        title: '手机号格式非法',
        icon: 'error',
        duration: 1000
      })
      return
    }

    if (password.length < 8) {
      wx.showToast({
        title: '密码至少8位',
        icon: 'error',
        duration: 1000
      })
      return
    }
    if (repassword != password) {
      wx.showToast({
        title: '两次密码不一致',
        icon: 'error',
        duration: 1000
      })
      return
    }

    if (workType == "" || workType == undefined) {
      wx.showToast({
        title: '请选择工种',
        icon: 'error',
        duration: 1000
      })
      return
    }
    //先在缓存中更新
    let userInfo = wx.getStorageSync('userInfo')
    let openId = userInfo['openId']
    //去后端更新
    let response = null;
    await utils.showLoading()
    await utils.Http.asyncRequest(
      //'http://127.0.0.1:9005/api/user/update',
      'https://www.ngzyq.top/api/user/update',
      'POST',
      {
        openId: openId,
        realName: realName,
        phoneNumber: phoneNumber,
        password: password,
        workType: workType['worktype_name']
      },
      res => {
        response = res
      }
    )
    //console.log(response)
    await utils.hideLoading()
    if(response != null && response['data']['code'] == 0){
      //保持一致，更新缓存中的值
      userInfo.realName = realName
      userInfo.phoneNumber = phoneNumber
      userInfo.workType = workType['worktype_name']
      wx.setStorageSync('userInfo', userInfo)
      wx.showToast({
        title: '修改成功',
        icon:'success',
        duration:1000
      })
      setTimeout(()=>{
        wx.switchTab({
          url: '/pages/mine/mine',
        })
      },1000);
    }
    else{
      //不更新缓存中的值
      wx.showToast({
        title: '修改失败',
        icon:'error',
        duration:1000
      })
    }
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})