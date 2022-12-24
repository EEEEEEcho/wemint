function onLoad(options){}
function viewPersonInfo(){
		wx.redirectTo({
			url: "../personInfo/personInfo"
		})

}
function viewSystemInfo(){
		wx.redirectTo({
			url: "../systemInfo/systemInfo"
		})

}
function viewLocation(){
		wx.redirectTo({
			url: "../location/location"
		})

}
function clearStorage() {
    wx.showModal({
      title: '确认要清除',
      content: '清除缓存会删除浏览历史和收藏及个人资料',
      success: function(res) {
        if (res.confirm) {
          wx.clearStorage()
          app.initStorage()
          wx.showToast({
            title: '清除成功',
            icon: 'success',
            duration: 1500
          })
        }
      }
    })

}
function viewAbount() {
		wx.redirectTo({
			url: "../about/about"
		})

}
