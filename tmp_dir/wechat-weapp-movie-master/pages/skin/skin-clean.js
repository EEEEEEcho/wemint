function onLoad(options){
    var that = this
    wx.getStorage({
      key: 'skin',
      success: function(res){
        if (res.data == "") {
          that.setData({
            nowSkin: config.skinList[0].imgUrl
          })
        } else {
          that.setData({
            nowSkin: res.data
          })
        }
      }
    })

}
function chooseSkin(e) {
    var url = e.currentTarget.dataset.url
    wx.setStorage({
      key: 'skin',
      data: url,
      success: function(res){
        wx.navigateBack({
          delta: 1,
          success: function(res){
            console.log('success')
          }
        })
      }
    })

}
