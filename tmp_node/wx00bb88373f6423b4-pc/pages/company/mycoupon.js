var t = getApp();

Page({
    pageurl: "",
    onLoad: function(a) {
        this.pageurl = t.getPageUrl(this, a), t.registerGlobalFunctions(this), this.setData({
            queryparams: a
        }), this.loadMyList(!0);
    },
    data: {
        mypagesize: 9999,
        myrecordcount: 99,
        mylist: [],
        baseUrl: t.globalData.siteBaseUrl,
        list: [],
        currentTab: "1",
        sortcol: "",
        sort: "",
        scrollHeight: t.windowHeight * t.pixelRatio - 40 * t.pixelRatio,
        plugNavFlag: !0,
        use: ""
    },
    getCoupon: function(a) {
        var s = this;
        t.getCoupon(a.currentTarget.dataset.couponid, function() {
            s.loadMyList(!0);
        });
    },
    loadMyList: function(a) {
        var s = this;
        a && (s.data.myrecordcount = 99, s.data.mylist = []);
        var e = s.data.myrecordcount, i = s.data.mylist.length;
        if (e > i) {
            var o = Math.ceil(i / s.data.mypagesize) + 1, l = "";
            s.data.sortcol && (l = "&sortcol=" + s.data.sortcol + "&sort=" + s.data.sort), s.data.queryparams.use && (s.data.use = s.data.queryparams.use), 
            t.sendRequest({
                url: "/index.php?c=Front/WxApp/ServiceApi&a=getUserCouponList&page=" + o + "&pagesize=" + s.data.mypagesize + l,
                method: "GET",
                success: function(a) {
                    if (a.success) {
                        for (var e = 0; e < a.list.length; e++) if (0 == a.list[e].Status && 0 == a.list[e].Expired && 0 == s.data.use ? s.data.mylist.push(a.list[e]) : 1 == a.list[e].Status && 0 == a.list[e].Expired && 1 == s.data.use ? s.data.mylist.push(a.list[e]) : 1 == a.list[e].Expired && 2 == s.data.use && s.data.mylist.push(a.list[e]), 
                        0 == a.list[e].Type) {
                            var i = a.list[e].Amount.split("").join(".");
                            a.list[e].Amount = i;
                        } else a.list[e].Amount = a.list[e].Amount;
                        s.setData({
                            mylist: s.data.mylist,
                            myrecordcount: a.myrecordcount
                        }), s.data.queryparams.use = null;
                    } else console.log("getUserCouponList fail：" + a.msg), 1 == a.needLogin && t.login(function() {
                        wx.reLaunch({
                            url: "/" + s.pageurl
                        });
                    });
                },
                fail: function(t) {
                    console.log("getUserCouponList fail");
                }
            });
        }
    },
    switchNavbar: function(t) {
        this.setData({
            currentTab: t.currentTarget.dataset.idx,
            use: t.currentTarget.dataset.use,
            mylist: []
        }), this.loadMyList(!0);
    },
    navBtnShowAndHide: function() {
        var t = !this.data.plugNavFlag;
        this.setData({
            plugNavFlag: t
        });
    }
});