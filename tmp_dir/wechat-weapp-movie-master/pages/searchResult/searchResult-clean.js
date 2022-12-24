function onLoad(options) {
		var that = this
		that.setData({
			url: options.url,
			keyword: options.keyword,
			title: options.keyword
		})
		douban.search.call(that, that.data.url, that.data.keyword, that.data.start, config.count, function(data){
			if (data.subjects.length == 0) {
				that.setData({
					isNull: true
				})
			}
		})

}
function onPullDownRefresh() {
		var that = this
		that.setData({
			films: [],
			hasMore: true,
			showLoading: true,
			start: 0
		})
		douban.search.call(that, that.data.url, that.data.keyword, that.data.start, config.count)

}
function onReachBottom() {
		var that = this
		if (!that.data.showLoading) {
			douban.search.call(that, that.data.url, that.data.keyword, that.data.start, config.count)
		}

}
function viewFilmDetail(e) {
		var data = e.currentTarget.dataset;
		wx.redirectTo({
			url: "../filmDetail/filmDetail?id=" + data.id
		})

}
function viewFilmByTag(e) {
		var data = e.currentTarget.dataset
		var keyword = data.tag
		wx.redirectTo({
			url: '../searchResult/searchResult?url=' + encodeURIComponent(config.apiList.search.byTag) + '&keyword=' + keyword
		})

}
