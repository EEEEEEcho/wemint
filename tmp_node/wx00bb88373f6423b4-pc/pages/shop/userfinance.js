var a = getApp();

Page({
    isloading: !1,
    onShareAppMessage: function() {
        return a.shareAppMessage();
    },
    onLoad: function(t) {
        var i = this;
        a.getPageUrl(this, t), a.registerGlobalFunctions(this), wx.getSystemInfo({
            success: function(a) {
                i.setData({
                    imgWidth: (a.windowWidth - 39) / 2,
                    scrollHeight: a.windowHeight - 40 - 48
                });
            }
        }), this.setData({
            queryparams: t
        }), this.loadOrder(!0);
    },
    onShow: function() {
        var a = this;
        this.setData({
            shopcart: a.options.statu ? a.options.statu : 0
        });
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
        shopcart: 0,
        baseUrl: a.globalData.cdnBaseUrl,
        animationData: {},
        plugNavFlag: !0,
        scrollHeight: a.windowHeight * a.pixelRatio - 47 * a.pixelRatio - 40 * a.pixelRatio,
        imgWidth: 0,
        status: 0
    },
    loadOrder: function(t) {
        var i = this;
        if (!i.isloading) {
            i.isloading = !0, t && (i.data.recordcount = 99, i.data.orderlist = []);
            var e = i.data.recordcount, n = i.data.orderlist.length;
            if (e > n && this.data.falgAjax) {
                this.setData({
                    falgAjax: !1
                });
                var s = Math.ceil(n / i.data.pagesize) + 1;
                i.data.queryparams.keyword && i.data.queryparams.keyword;
                i.data.sortcol && "&sortcol=" + i.data.sortcol + "&sort=" + i.data.sort, a.sendRequest({
                    url: "/index.php?c=Front/WxApp/JsonApi&a=getFinance&page=" + s + "&pagesize=" + i.data.pagesize,
                    method: "GET",
                    success: function(a) {
                        if (i.isloading = !1, a.success) {
                            for (var t = 0; t < a.finance.FinanceList.yearmonth.length; t++) for (var e = 0; e < a.finance.FinanceList.yearmonth[t].list.length; e++) {
                                var n = a.finance.FinanceList.yearmonth[t].list[e].CrTime.split(" ")[0].split("-").slice(1, 3).join("-"), s = a.finance.FinanceList.yearmonth[t].list[e].CrTime.split(" ")[1].split(":").slice(0, 2).join(":");
                                a.finance.FinanceList.yearmonth[t].list[e].date = n, a.finance.FinanceList.yearmonth[t].list[e].time = s;
                            }
                            i.setData({
                                financelist: a.finance,
                                recordcount: a.recordcount,
                                FinanceList: a.finance.FinanceList.yearmonth,
                                hasfinance: a.finance.FinanceList.length > 0,
                                falgAjax: !0
                            });
                        } else console.log("getProductList fail：" + a.msg);
                    },
                    fail: function(a) {
                        i.isloading = !1, console.log("getProductList fail");
                    }
                });
            }
        }
    }
});