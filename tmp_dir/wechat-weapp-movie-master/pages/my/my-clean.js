function onLoad(cb){
    var that = this
    console.log(app.globalData.userInfo)
    // 检测是否存在用户信息
    if (app.globalData.userInfo != null) {
      that.setData({
          userInfo: app.globalData.userInfo
      })
    } else {
      app.getUserInfo()
    }
    typeof cb == 'function' && cb()

}
function onShow(){
    var that = this
    wx.getStorage({
      key: 'skin',
      success: function(res){
        if (res.data == "") {
          that.setData({
            skin: config.skinList[0].imgUrl
          })
        } else {
          that.setData({
            skin: res.data
          })
        }
      }
    })

}
function onPullDownRefresh() {
    this.onLoad(function(){
      wx.stopPullDownRefresh()
    })

}
function viewGridDetail(e) {
    var data = e.currentTarget.dataset
		wx.navigateTo({
			url: "../" + data.url + '/' + data.url
		})

}
function viewSkin() {
		wx.navigateTo({
			url: "../skin/skin"
		})

}
