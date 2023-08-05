var t = require("../../utils/config.js"), a = getApp();

Page({
    data: {
        pageIndex: 1,
        pageSize: 10,
        isDataEnd: !1,
        choiceProducts: [],
        refreshSuccess: !0,
        keyword: "",
        TopicUrl: "",
        VersionNumber: "",
        TopicData: null,
        RequestUrl: a.getRequestUrl
    },
    onLoad: function(e) {
        var o = this;
        a.getOpenId(function(e) {
            var n = {
                openId: e
            };
            wx.showNavigationBarLoading(), t.httpGet(a.getUrl(a.globalData.getIndexData), n, o.getHomeData);
        });
    },
    ClickSwiper: function(t) {
        var a = this, e = t.currentTarget.dataset.link, o = t.currentTarget.dataset.showtype;
        a.JumpUrlByType(o, e);
    },
    JumpUrlByType: function(t, a) {
        switch (t) {
          case 1:
            wx.navigateTo({
                url: a
            });
            break;

          case 13:
            wx.navigateTo({
                url: a
            });
        }
    },
    onShareAppMessage: function() {
        return {
            title: "首页",
            path: "",
            success: function(t) {},
            fail: function(t) {}
        };
    },
    getHomeData: function(t) {
        var a = this;
        "NOUser" != t.Message ? ("OK" == t.Status ? (a.getHomeProductData(a.data.pageIndex, !0), 
        a.setData({
            refreshSuccess: !0,
            imageList: t.Data.ImgList,
            countDownList: t.Data.CountDownList,
            TopicUrl: t.Data.HomeTopicPath,
            VersionNumber: t.Data.Vid
        }), a.CheckVersionNumber(a)) : wx.showToast({
            title: "系统数据异常"
        }), wx.hideNavigationBarLoading()) : wx.redirectTo({
            url: "../login/login"
        });
    },
    getHomeProductData: function(e, o) {
        var n = this;
        void 0 == o && (o = !1), e < 1 && (e = 1), n.data.isDataEnd || a.getOpenId(function(i) {
            var r = {
                openId: i,
                pageIndex: e,
                pageSize: n.data.pageSize
            };
            wx.showLoading({
                title: "商品信息加载中..."
            }), t.httpGet(a.getUrl(a.globalData.GetIndexProductData), r, function(t) {
                if ("OK" == t.Status) {
                    var a = n.data.choiceProducts;
                    if (t.Data.ChoiceProducts.length > 0) {
                        for (var i in t.Data.ChoiceProducts) {
                            var r = t.Data.ChoiceProducts[i];
                            a.push(r);
                        }
                        var c = {
                            choiceProducts: a
                        };
                        (!t.Data.ChoiceProducts || t.Data.ChoiceProducts.length < n.data.pageSize) && (c.isDataEnd = !0), 
                        o && (c.pageIndex = e + 1), n.setData(c);
                    }
                }
                wx.hideLoading();
            });
        });
    },
    CheckVersionNumber: function(t) {
        var a = wx.getStorageSync("versionnumber");
        null == a || "" == a || "undefined" == a || parseInt(a) < parseInt(t.data.VersionNumber) ? (wx.setStorageSync("versionnumber", t.data.VersionNumber), 
        t.DownloadTopcis(t)) : t.HomeTopicData(t);
    },
    DownloadTopcis: function(t) {
        wx.request({
            url: t.data.TopicUrl,
            dataType: "json",
            success: function(t) {
                wx.setStorage({
                    key: "topiclist",
                    data: t.data.LModules
                });
            },
            complete: function() {
                t.HomeTopicData(t);
            }
        });
    },
    HomeTopicData: function(t) {
        wx.getStorage({
            key: "topiclist",
            success: function(a) {
                t.setData({
                    TopicData: a.data
                });
            },
            complete: function() {
                console.log(t.data.TopicData);
            }
        });
    },
    bindSearchInput: function(t) {
        var a = t.detail.value;
        a.length > 0 && this.setData({
            keyword: a
        });
    },
    bindConfirmSearchInput: function(t) {
        var a = t.detail.value;
        a.length > 0 && (wx.setStorage({
            key: "keyword",
            data: a
        }), wx.switchTab({
            url: "../searchresult/searchresult",
            success: function(t) {
                wx.hideKeyboard();
            }
        }));
    },
    bindBlurInput: function(t) {
        wx.hideKeyboard();
    },
    bindSearchAction: function(t) {
        var a = this.data.keyword;
        a.length > 0 && (wx.setStorage({
            key: "keyword",
            data: a
        }), wx.switchTab({
            url: "../searchresult/searchresult",
            success: function(t) {
                wx.hideKeyboard();
            }
        }));
    },
    gotoKeyWordPage: function(t) {
        wx.navigateTo({
            url: "../search/search"
        });
    },
    bindCountDownTap: function(t) {
        var a = t.currentTarget.dataset.countdownid;
        wx.navigateTo({
            url: "../countdowndetail/countdowndetail?id=" + a
        });
    },
    bindGoodsTap: function(t) {
        var a = t.currentTarget.dataset.productid, e = t.currentTarget.dataset.activeid;
        t.currentTarget.dataset.activetype, wx.navigateTo({
            url: "../productdetail/productdetail?id=" + a
        });
    },
    onReachBottom: function() {
        var t = this;
        if (1 == t.data.refreshSuccess) {
            var a = t.data.pageIndex;
            t.getHomeProductData(a, !0);
        }
    }
});