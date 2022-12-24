function changeSearchType() {
    var types = ['默认', '类型'];
    var searchType = ['keyword', 'tag']
    var that = this
    wx.showActionSheet({
      itemList: types,
      success: function(res) {
        console.log(res)
        if (!res.cancel) {
          that.setData({
            searchType: searchType[res.tapIndex]
          })
        }
      }
    })

}
function search(e) {
    var that = this
    var keyword = e.detail.value.keyword
    if (keyword == '') {
      message.show.call(that,{
        content: '请输入内容',
        icon: 'null',
        duration: 1500
      })
      return false
    } else {
      var searchUrl = that.data.searchType == 'keyword' ? config.apiList.search.byKeyword : config.apiList.search.byTag
      wx.redirectTo({
        url: '../searchResult/searchResult?url=' + encodeURIComponent(searchUrl) + '&keyword=' + keyword
      })
    }

}
function searchByKeyword(e) {
    var that = this
    var keyword = e.currentTarget.dataset.keyword
    wx.redirectTo({
      url: '../searchResult/searchResult?url=' + encodeURIComponent(config.apiList.search.byKeyword) + '&keyword=' + keyword
    })

}
function searchByTag(e) {
    var that = this
    var keyword = e.currentTarget.dataset.keyword
    wx.redirectTo({
      url: '../searchResult/searchResult?url=' + encodeURIComponent(config.apiList.search.byTag) + '&keyword=' + keyword
    })

}
