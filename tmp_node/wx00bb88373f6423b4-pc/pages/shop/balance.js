var a = getApp();

Page({
    isloading: !1,
    onShareAppMessage: function() {
        return a.shareAppMessage();
    },
    onLoad: function(t) {
        var e = this;
        a.getPageUrl(this, t), a.registerGlobalFunctions(this), wx.getSystemInfo({
            success: function(a) {
                e.setData({
                    imgWidth: (a.windowWidth - 39) / 2,
                    scrollHeight: a.windowHeight - 40 - 48
                });
            }
        }), this.setData({
            queryparams: t
        });
    },
    onShow: function() {
        this.loadOrder(!0);
    },
    data: {
        scrollCurrent: 0,
        falgAjax: !0,
        classid: 0,
        pagesize: 10,
        recordcount: 99,
        financelist: [],
        sortcol: "",
        sort: "",
        baseUrl: a.globalData.cdnBaseUrl,
        animationData: {},
        plugNavFlag: !0,
        scrollHeight: a.windowHeight * a.pixelRatio - 47 * a.pixelRatio - 40 * a.pixelRatio,
        imgWidth: 0,
        status: 0,
        buttonClicked: !1
    },
    loadOrder: function(t) {
        var e = this;
        if (!e.isloading) {
            e.isloading = !0, t && (e.data.recordcount = 99, e.data.orderlist = []);
            var i = e.data.recordcount, o = e.data.orderlist.length;
            if (i > o && this.data.falgAjax) {
                this.setData({
                    falgAjax: !1
                });
                var s = Math.ceil(o / e.data.pagesize) + 1;
                e.data.queryparams.keyword && e.data.queryparams.keyword;
                e.data.sortcol && "&sortcol=" + e.data.sortcol + "&sort=" + e.data.sort, a.sendRequest({
                    url: "/index.php?c=Front/WxApp/ShopApi&a=getFinance&page=" + s + "&pagesize=" + e.data.pagesize,
                    method: "GET",
                    success: function(a) {
                        e.isloading = !1, a.success ? e.setData({
                            financelist: a.finance,
                            recordcount: a.recordcount,
                            hasfinance: a.finance.FinanceList.length > 0,
                            falgAjax: !0,
                            canWithdraw: a.finance.balance_withdraw
                        }) : console.log("getProductList fail：" + a.msg);
                    },
                    fail: function(a) {
                        e.isloading = !1, console.log("getProductList fail");
                    }
                });
            }
        }
    },
    buttonClicked: function() {
        var a = this;
        a.setData({
            buttonClicked: !0
        }), setTimeout(function() {
            a.setData({
                buttonClicked: !1
            });
        }, 500);
    }
});