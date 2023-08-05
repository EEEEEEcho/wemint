var a = require("../../../utils/main.js"), n = getApp();

Page({
    data: {
        cardCode: ""
    },
    onLoad: function(a) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    inputCardCode: function(a) {
        this.setData({
            cardCode: a.detail.value
        });
    },
    binding: function() {
        var o = n.globalData.openId, t = this;
        0 == this.data.cardCode.length ? this.setData({
            focus1: !0
        }) : wx.request({
            url: a.localUrl + "mobileXcx/bindingOpenId",
            data: {
                crm_code: a.crm_code,
                openId: o,
                type: 1,
                card_code: t.data.cardCode
            },
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                if ("000" != a.data.succeed) wx.showToast({
                    title: a.data.sucInfo,
                    icon: "none",
                    duration: 2e3
                }); else {
                    null != a.data.dataInfo.cpc && (n.globalData.cpc = a.data.dataInfo.cpc, n.globalData.csc = a.data.dataInfo.csc);
                    var o = getCurrentPages();
                    o[o.length - 3].onLoad(), wx.navigateTo({
                        url: "../home/home",
                        success: function(a) {
                            var n = getCurrentPages().pop();
                            void 0 != n && null != n && n.onLoad();
                        }
                    });
                }
            }
        });
    }
});