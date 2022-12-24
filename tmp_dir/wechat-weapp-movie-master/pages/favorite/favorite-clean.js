function onLoad(options){
    var that = this
    wx.getStorage({
      key: 'film_favorite',
      success: function(res){
        that.setData({
          film_favorite: res.data
        })
      }
    })
    wx.getStorage({
      key: 'person_favorite',
      success: function(res){
        that.setData({
          person_favorite: res.data
        })
      }
    })
    wx.stopPullDownRefresh()

}
function viewFilmDetail(e) {
		var data = e.currentTarget.dataset
		wx.redirectTo({
			url: "../filmDetail/filmDetail?id=" + data.id
		})

}
function viewPersonDetail(e) {
		var data = e.currentTarget.dataset
		wx.redirectTo({
			url: "../personDetail/personDetail?id=" + data.id
		})

}
function changeViewType(e) {
    var data = e.currentTarget.dataset
    this.setData({
      show: data.type,
      nullTip: data.type == 'film_favorite' ? filmNullTip : personNullTip
    })

}
