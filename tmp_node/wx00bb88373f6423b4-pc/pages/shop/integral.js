var t = getApp();

Page({
    isloading: !1,
    url: !1,
    onShareAppMessage: function() {
        return t.shareAppMessage("/pages/shop/index");
    },
    data: {
        baseUrl: t.globalData.siteBaseUrl,
        pagesize: 10,
        recordcount: 1e3,
        integralInfo: [],
        total: 0
    },
    onLoad: function(e) {
        var a = this;
        a.url = t.getPageUrl(a, e), t.registerGlobalFunctions(a), this.setData({
            queryparams: e
        }), this.loadIntegral(!0), this.loadPersonpoint(), this.getScrollHeight();
    },
    getScrollHeight: function() {
        this.setData({
            scrollHeight: wx.getSystemInfoSync().windowHeight
        });
    },
    loadIntegral: function(e) {
        var a = this, o = new Date();
        if (this.setData({
            stattime: o
        }), e || !a.isloading) {
            a.isloading = !0;
            var n = a.data.total;
            e ? (a.data.recordcount = 500, a.data.integralInfo = []) : void 0 != n && (a.data.recordcount = n);
            var i = a.data.recordcount, s = a.data.integralInfo.length;
            if (i > s) {
                var r = Math.ceil(s / a.data.pagesize) + 1;
                t.sendRequest({
                    url: "/index.php?c=front/WxApp/ShopApi&a=getUserPointLogs&page=" + r,
                    method: "GET",
                    success: function(t) {
                        if (a.isloading = !1, t.success) {
                            var e = a.data.recordcount;
                            a.setData({
                                total: t.info.total,
                                recordcount: e
                            });
                            for (var o = new Date().getTime(), n = (a.data.stattime.getTime(), t.info.list), i = 0; i < n.length; i++) {
                                var s = n[i].CrDate.split(" ")[0];
                                n[i].newTime = s;
                            }
                            for (var r = 0; r < n.length; r++) a.data.integralInfo.push(t.info.list[r]);
                            a.setData({
                                integralInfo: a.data.integralInfo,
                                recordcount: t.info.total,
                                pagesize: t.info.pageSize
                            });
                        } else console.log("getIntegral fail：" + t.msg);
                    }
                });
            }
        }
    },
    loadPersonpoint: function() {
        var e = this;
        t.sendRequest({
            url: "/index.php?c=front/WxApp/ShopApi&a=getUserPoint",
            method: "GET",
            success: function(t) {
                t.success ? e.setData({
                    presonPointInfo: t.Point
                }) : console.log("getIntegral fail：" + t.msg);
            }
        });
    },
    onProductListScroll: function(t) {
        this.loadIntegral();
    }
});