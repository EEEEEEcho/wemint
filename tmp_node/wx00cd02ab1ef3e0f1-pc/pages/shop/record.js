var t = getApp();

Page({
    isloading: !1,
    onShareAppMessage: function() {
        return t.shareAppMessage();
    },
    data: {
        status: 0,
        pagesize: 20,
        recordcount: 1e3,
        List: [],
        buttonClicked: !1,
        allowWithTypes: []
    },
    onLoad: function(a) {
        t.getPageUrl(this, a);
        var e = this;
        t.registerGlobalFunctions(e), this.setData({
            status: e.options.status ? e.options.status : 0
        }), 1 == e.options.status ? this.setData({
            currentTab: 1
        }) : this.setData({
            currentTab: 0
        }), this.getAllowWithdrawType(), this.loadRecord(!0), this.getScrollHeight();
    },
    onShow: function() {},
    navbarTap: function(t) {
        var a = this;
        a.setData({
            buttonClicked: !0
        }), setTimeout(function() {
            a.setData({
                buttonClicked: !1
            });
        }, 500), this.setData({
            currentTab: t.currentTarget.dataset.idx
        }), this.loadRecord(!0);
    },
    getAllowWithdrawType: function() {
        var a = this;
        t.sendRequest({
            url: "/index.php?c=front/WxApp/Withdraw&a=getAllowWithdrawType",
            method: "GET",
            success: function(t) {
                t.success ? (a.setData({
                    allowWithTypes: t.data.allowWithTypes
                }), console.log(a.data.allowWithTypes)) : console.log("fail");
            }
        });
    },
    getScrollHeight: function() {
        2 == this.data.allowWithTypes.length ? this.setData({
            scrollHeight: wx.getSystemInfoSync().windowHeight - wx.getSystemInfoSync().windowWidth / 750 * 96
        }) : this.setData({
            scrollHeight: wx.getSystemInfoSync().windowHeight
        });
    },
    loadRecord: function(a) {
        var e = this;
        if (0 == e.data.currentTab) i = 3; else if (1 == e.data.currentTab) var i = 2;
        if (a || !e.isloading) {
            e.isloading = !0;
            var s = e.data.total;
            a ? (e.data.recordcount = 500, e.data.List = []) : void 0 != s && (e.data.recordcount = s);
            var o = e.data.recordcount, n = e.data.List.length;
            if (o > n) {
                var l = Math.ceil(n / e.data.pagesize) + 1;
                t.sendRequest({
                    url: "/index.php?c=front/WxApp/Withdraw&a=getWithdrawList",
                    method: "GET",
                    data: {
                        type: i,
                        page: l
                    },
                    success: function(t) {
                        if (e.isloading = !1, t.success) {
                            var a = e.data.recordcount;
                            e.setData({
                                total: t.info.total,
                                recordcount: a
                            });
                            for (var i = 0; i < t.info.list.length; i++) e.data.List.push(t.info.list[i]);
                            e.setData({
                                list: e.data.List
                            });
                            for (var s = e.data.list, o = [], n = 0; n < s.length; n++) {
                                var l = s[n], r = new Date(l.Time.replace(/-/g, "/"));
                                if (r.getMonth() + 1 < 10) c = "0" + (r.getMonth() + 1); else var c = r.getMonth() + 1;
                                for (var d = r.getFullYear() + "年" + c, h = null, u = 0; u < o.length; u++) if (o[u].yearMonth == d) {
                                    h = o[u];
                                    break;
                                }
                                h || (h = {
                                    yearMonth: d,
                                    list: []
                                }, o.push(h)), h.list.push(l);
                            }
                            o.sort(function(t, a) {
                                return t.yearMonth - a.yearMonth;
                            });
                            for (var g = 0; g < o.length; g++) for (var p = 0; p < o[g].list.length; p++) {
                                var f = o[g].list[p].Time.split(" ")[0].split("-").slice(1, 3).join("-"), w = o[g].list[p].Time.split(" ")[1].split(":").slice(0, 2).join(":");
                                o[g].list[p].date = f, o[g].list[p].time = w;
                            }
                            e.setData({
                                newList: o
                            });
                        } else console.log("getList fail" + t.msg);
                    },
                    fail: function(t) {
                        e.isloading = !1, console.log("getList fail");
                    }
                });
            }
        }
    },
    onProductListScroll: function(t) {
        this.loadRecord();
    }
});