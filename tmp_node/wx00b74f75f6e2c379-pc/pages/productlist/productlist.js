var app = getApp();

Page({
    data: {
        ProductList: null,
        SortBy: "",
        SortOrder: "asc",
        KeyWord: "",
        PageIndex: 1,
        PageSize: 10,
        Num: 0,
        SortClass: ""
    },
    onLoad: function onLoad(options) {
        // 页面初始化 options为页面跳转所带来的参数
        //var keyword = options.keyword;
        var keyword = options.keyword;
        if (keyword == undefined) keyword = "";
        var that = this;
        that.setData({
            KeyWord: keyword
        });
        that.loadData(that, false);
    },
    onReady: function onReady() {
        // 页面渲染完成
    },
    onShow: function onShow() {
        var keyword = "";
        // 页面显示
                if (this.data.keyword == undefined) keyword = "";
        var that = this;
        that.setData({
            KeyWord: keyword
        });
        that.loadData(that, false);
    },
    onHide: function onHide() {
        // 页面隐藏
    },
    onUnload: function onUnload() {
        // 页面关闭
    },
    onSearch: function onSearch(e) {
        var that = this;
        that.setData({
            PageIndex: 1
        });
        that.loadData(that, false);
    },
    onReachBottom: function onReachBottom() {
        var that = this;
        var pageIndex = that.data.PageIndex + 1;
        that.setData({
            PageIndex: pageIndex
        });
        that.loadData(that, true);
    },
    bindKeyWordInput: function bindKeyWordInput(e) {
        this.setData({
            KeyWord: e.detail.value
        });
    },
    bindBlurInput: function bindBlurInput(e) {
        wx.hideKeyboard();
    },
    gotoKeyWordPage: function gotoKeyWordPage(e) {
        wx.navigateTo({
            url: "../search/search?SourceUrl=productlist"
        });
    },
    onConfirmSearch: function onConfirmSearch(e) {
        var that = this;
        var keyword = e.detail.value;
        that.setData({
            KeyWord: keyword,
            PageIndex: 1
        });
        that.loadData(that, false);
    },
    onSortClick: function onSortClick(e) {
        var that = this;
        var sortby = e.target.dataset.sortby;
        var suoyin = e.currentTarget.dataset.num;
        var sortorder = "asc";
        var classname = "shengxu";
        if (that.data.SortOrder == sortorder) {
            sortorder = "desc";
            classname = "jiangxu";
        }
        that.setData({
            PageIndex: 1,
            SortBy: sortby,
            SortOrder: sortorder,
            Num: suoyin,
            SortClass: classname
        });
        that.loadData(that, false);
    },
    goToProductDetail: function goToProductDetail(e) {
        var productid = e.currentTarget.dataset.productid;
        var activeid = e.currentTarget.dataset.activeid;
        var activetype = e.currentTarget.dataset.activetype;
        var toUrl = "../productdetail/productdetail?id=" + productid;
        if (activetype == 1) toUrl = "../countdowndetail/countdowndetail?id=" + activeid;
        wx.navigateTo({
            url: toUrl
        });
    },
    loadData: function loadData(that, isNextPage) {
        wx.showNavigationBarLoading();
        app.getOpenId(function(openid) {
            wx.request({
                url: app.getUrl("GetProducts"),
                data: {
                    openId: openid,
                    keyword: that.data.KeyWord,
                    pageIndex: that.data.PageIndex,
                    pageSize: that.data.PageSize,
                    sortBy: that.data.SortBy,
                    sortOrder: that.data.SortOrder
                },
                success: function success(result) {
                    if (result.data.Status == "OK") {
                        var r = result.data.Data;
                        if (isNextPage) {
                            var old = that.data.ProductList;
                            old.push.apply(old, r);
                            that.setData({
                                ProductList: old
                            });
                        } else {
                            that.setData({
                                ProductList: r
                            });
                        }
                        wx.hideNavigationBarLoading();
                    } else if (result.data.Message == "NOUser") {
                        wx.navigateTo({
                            url: "../login/login"
                        });
                    } else {
                        wx.showModal({
                            title: "提示",
                            content: result.data.Message,
                            showCancel: false,
                            success: function success(res) {
                                if (res.confirm) {
                                    wx.navigateBack({
                                        delta: 1
                                    });
                                }
                            }
                        });
                    }
                }
            });
        });
    }
});