function onLoad(options){
    var that = this
    wx.getStorage({
      key: 'film_history',
      success: function(res){
        that.setData({
          film_history: res.data
        })
      }
    })
    wx.getStorage({
      key: 'person_history',
      success: function(res){
        that.setData({
          person_history: res.data
        })
      }
    })
    wx.stopPullDownRefresh()

}
function onPullDownRefresh() {
    this.setData({
      film_history: [],
      person_history: []
    })
		this.onLoad()

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
      nullTip: data.type == 'film_history' ? filmNullTip : personNullTip
    })

}
