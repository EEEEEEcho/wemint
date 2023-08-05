var t = getApp();

Page({
    data: {
        list: [],
        page: 0,
        hasMore: !0,
        canScroll: !0,
        scrollHeight: t.windowHeight * t.pixelRatio,
        baseUrl: t.globalData.siteBaseUrl
    },
    onLoad: function(t) {
        this.loadMore();
    },
    loadMore: function() {
        if (this.data.canScroll && this.data.hasMore) {
            this.data.canScroll = !1;
            var t = {
                page: ++this.data.page
            };
            this.getCommissionRecord(t);
        }
    },
    getCommissionRecord: function(a) {
        var s = this, e = {
            url: "/index.php?c=Front/WxApp/User&a=browseRecord",
            data: a,
            success: function(t) {
                s.data.canScroll = !0;
                var a = s.data.list, e = t.info.data, o = a.length, i = parseInt(t.info.total);
                s.data.hasMore = 5 === i;
                var n = [];
                0 !== i && (0 !== o && a[o - 1].date === e[0].date ? (a[o - 1].list = a[o - 1].list.concat(e[0].list), 
                n = a.concat(e.filter(function(t, a) {
                    return !!a;
                }))) : n = a.concat(e), s.setData({
                    list: n
                }));
            }
        };
        t.sendRequest(e);
    },
    delRecord: function() {
        var a = this, s = {
            url: "/index.php?c=Front/WxApp/User&a=delBrowseRecord",
            method: "post",
            success: function(s) {
                s.success ? (t.showToast({
                    title: s.info,
                    icon: "success"
                }), a.setData({
                    list: []
                })) : wx.showToast({
                    title: s.info,
                    image: "../../images/error.png"
                });
            }
        };
        wx.showModal({
            title: "提示",
            content: "是否删除全部浏览记录？",
            success: function(a) {
                a.confirm && t.sendRequest(s);
            }
        });
    }
});