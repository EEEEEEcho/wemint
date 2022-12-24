function onLoad() {
		var that = this
		wx.showNavigationBarLoading()
		app.getCity(function(){
			wx.hideNavigationBarLoading()
			wx.setNavigationBarTitle({
				title: '正在热映 - ' + config.city
			})
			douban.fetchFilms.call(that, config.apiList.popular, that.data.start)
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
		this.onLoad()

}
function onReachBottom() {
		var that = this
		if (!that.data.showLoading) {
			douban.fetchFilms.call(that, config.apiList.popular, that.data.start)
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
function viewBannerDetail(e) {
		var data = e.currentTarget.dataset
		if (data.type == 'film') {
			wx.navigateTo({
				url: "../filmDetail/filmDetail?id=" + data.id
			})
		} else if (data.type == 'person') {
			wx.navigateTo({
				url: '../personDetail/personDetail?id=' + data.id
			})
		} else if (data.type == 'search') {
			// stype(searchType) 0:关键词, 1:类型标签
			var searchUrl = stype == 'keyword' ? config.search.byKeyword : config.search.byTag
			wx.navigateTo({
				url: '../searchResult/searchResult?url=' + encodeURIComponent(searchUrl) + '&keyword=' + keyword
			})
		}

}
function viewSearch() {
		wx.navigateTo({
			url: '../search/search'
		})

}
