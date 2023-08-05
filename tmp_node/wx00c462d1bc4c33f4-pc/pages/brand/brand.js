var a, n = require("../../utils/util.js"), o = require("../wxParse/wxParse.js"), t = getApp().globalData.httpUrl;

Page({
    data: {
        swiperCurrent: 0,
        httpUrl: t
    },
    onLoad: function(r) {
        a = this, n.getShareInfos(a, t), wx.getStorage({
            key: "storeInfo",
            success: function(n) {
                wx.setNavigationBarTitle({
                    title: n.data.storeInfoName
                }), a.setData({
                    storeInfoName: n.data.storeInfoName,
                    storeInfoAddress: n.data.storeInfoAddress,
                    storeInfoHeadImgUrl: n.data.storeInfoHeadImgUrl
                });
            }
        }), n.setCompanyId(a, r), wx.getStorage({
            key: "storeId",
            success: function(n) {
                a.setData({
                    storeId: n.data
                }), console.log("====wx.getStorage storeId success===="), wx.request({
                    url: t + "skstoremodel/findBrandConfigById",
                    data: {
                        storeId: n.data
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(n) {
                        console.log("====findBrandConfigById success===="), console.log(n.data);
                        var t = [];
                        null != n.data.brandConfigImgUrl1 && "" != n.data.brandConfigImgUrl1 && t.push({
                            imgurl: n.data.brandConfigImgUrl1
                        }), null != n.data.brandConfigImgUrl2 && "" != n.data.brandConfigImgUrl2 && t.push({
                            imgurl: n.data.brandConfigImgUrl2
                        }), null != n.data.brandConfigImgUrl3 && "" != n.data.brandConfigImgUrl3 && t.push({
                            imgurl: n.data.brandConfigImgUrl3
                        }), null != n.data.brandConfigImgUrl4 && "" != n.data.brandConfigImgUrl4 && t.push({
                            imgurl: n.data.brandConfigImgUrl4
                        }), null != n.data.brandConfigImgUrl5 && "" != n.data.brandConfigImgUrl5 && t.push({
                            imgurl: n.data.brandConfigImgUrl5
                        }), null != n.data.brandConfigImgUrl6 && "" != n.data.brandConfigImgUrl6 && t.push({
                            imgurl: n.data.brandConfigImgUrl6
                        }), null != n.data.brandConfigImgUrl7 && "" != n.data.brandConfigImgUrl7 && t.push({
                            imgurl: n.data.brandConfigImgUrl7
                        }), null != n.data.brandConfigImgUrl8 && "" != n.data.brandConfigImgUrl8 && t.push({
                            imgurl: n.data.brandConfigImgUrl8
                        }), null != n.data.brandConfigImgUrl9 && "" != n.data.brandConfigImgUrl9 && t.push({
                            imgurl: n.data.brandConfigImgUrl9
                        }), null != n.data.brandConfigImgUrl10 && "" != n.data.brandConfigImgUrl10 && t.push({
                            imgurl: n.data.brandConfigImgUrl10
                        }), console.log("brandSlideUrls ==> "), console.log(t), console.log("brandSlideUrls ==> "), 
                        a.setData({
                            storeInfoTelephoneNum: n.data.storeInfoTelephoneNum,
                            brandConfigPhoneNum: n.data.brandConfigPhoneNum,
                            brandConfigContact: n.data.brandConfigContact,
                            brandSlideUrls: t
                        }), null == n.data.content && (n.data.content = "");
                        var r = "<div>" + n.data.content + "</div>";
                        console.log("article ==> " + r), o.wxParse("article", "html", r, a, 20);
                    }
                });
            },
            fail: function(a) {
                console.log("====wx.getStorage storeId fail====");
            }
        });
    },
    onReady: function() {},
    closeTk: function() {
        a.setData({
            displa: !1
        });
    },
    onShow: function() {
        a = this, wx.onSocketMessage(function(o) {
            console.log("===========接收到服务器信息=============="), console.log(o.data), n.getTkInfos(a, o);
        }), wx.onSocketClose(function() {
            console.log("=======webSocket已关闭========="), wx.getStorage({
                key: "userId",
                success: function(a) {
                    n.conSocket(a.data);
                }
            });
        });
    },
    onHide: function() {},
    onUnload: function() {
        n.colseSock();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh(), a = this, setTimeout(function() {
            a.onPullDownRefresh();
        }, 500);
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: a.data.shareTitle,
            desc: "",
            imageUrl: a.data.shareImgUrl,
            path: "/pages/index/index?storeId=" + a.data.storeId + "&companyId=" + a.data.companyId,
            success: function(a) {
                console.log("转发成功");
            },
            fail: function(a) {
                console.log("转发失败");
            }
        };
    }
});