function onLoad() {
		var that = this
		douban.fetchFilms.call(that, config.apiList.coming, that.data.start)

}
function onPullDownRefresh() {
		var that = this
		that.setData({
			films: [],
			hasMore: true,
			showLoading: true,
			start: 0
		})
		douban.fetchFilms.call(that, config.apiList.coming, that.data.start)

}
function onReachBottom() {
		var that = this
		if (!that.data.showLoading) {
			douban.fetchFilms.call(that, config.apiList.coming, that.data.start)
		}

}
function viewFilmDetail(e) {
		var data = e.currentTarget.dataset;
		wx.navigateTo({
			url: "../filmDetail/filmDetail?id=" + data.id
		})

}
function viewFilmByTag(e) {
		var data = e.currentTarget.dataset
		var keyword = data.tag
		wx.navigateTo({
			url: '../searchResult/searchResult?url=' + encodeURIComponent(config.apiList.search.byTag) + '&keyword=' + keyword
		})

}
