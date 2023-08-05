var e = getApp();

Page({
    data: {
        allTotal: "0.00",
        list: [],
        page: 0,
        hasMore: !0,
        canScroll: !0,
        scrollHeight: e.windowHeight * e.pixelRatio,
        startDate: "开始时间",
        endDate: "截止时间",
        chooseType: "0",
        chooseTypeText: "全部",
        forceRefresh: !0
    },
    onLoad: function(e) {
        this.getUserFenXiaoInfo();
    },
    onShow: function() {
        var e = wx.getStorageSync("forceRefresh");
        "" === e || !0 === e ? this.setData({
            forceRefresh: !0
        }) : this.setData({
            forceRefresh: !1
        }), this.setData({
            startDate: wx.getStorageSync("startDate") || this.data.startDate,
            endDate: wx.getStorageSync("endDate") || this.data.endDate,
            chooseType: wx.getStorageSync("chooseType") || this.data.chooseType,
            chooseTypeText: wx.getStorageSync("chooseTypeText") || this.data.chooseTypeText,
            page: 0,
            hasMore: !0,
            canScroll: !0,
            forceRefresh: this.data.forceRefresh
        }), this.loadMore();
        var t = wx.getStorageSync("isOk");
        this.setData({
            isOkk: t
        }), wx.removeStorageSync("isOk");
    },
    onUnload: function() {
        this.clearMyStorage();
    },
    onHide: function() {
        this.clearMyStorage();
    },
    clearMyStorage: function() {
        wx.removeStorageSync("startDate"), wx.removeStorageSync("endDate"), wx.removeStorageSync("chooseType"), 
        wx.removeStorageSync("chooseTypeText");
    },
    loadMore: function() {
        var e = wx.getStorageSync("startDate"), t = wx.getStorageSync("endDate"), a = wx.getStorageSync("chooseType");
        if (this.data.canScroll && this.data.hasMore) {
            this.data.forceRefresh && this.setData({
                list: [],
                forceRefresh: !1
            });
            this.data.canScroll = !this.data.canScroll;
            var o = {
                startDate: e,
                endDate: t,
                chooseType: a,
                page: ++this.data.page
            };
            this.getCommissionRecord(o);
        }
    },
    getCommissionRecord: function(t) {
        var a = this, o = {
            url: "/index.php?c=Front/WxApp/FenXiao&a=getCommissionRecord",
            data: t,
            success: function(e) {
                a.data.canScroll = !this.data.canScroll;
                var t = a.data.list, o = e.info.data, s = t.length, r = parseInt(e.info.total);
                a.data.hasMore = 5 === r;
                var n = [];
                0 !== r && (0 !== s && t[s - 1].date === o[0].date ? (t[s - 1].list = t[s - 1].list.concat(o[0].list), 
                n = t.concat(o.filter(function(e, t) {
                    return !!t;
                }))) : n = t.concat(o), a.setData({
                    list: n
                }));
            }
        };
        e.sendRequest(o);
    },
    getUserFenXiaoInfo: function() {
        var t = this, a = {
            url: "/index.php?c=Front/WxApp/ShopApi&a=getUserFenXiaoInfo",
            success: function(a) {
                a.success ? t.setData({
                    allTotal: a.info.allTotal
                }) : e.showModal({
                    title: "提示",
                    content: a.msg
                });
            }
        };
        e.sendRequest(a);
    }
});