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
    onPullDownRefresh: function() {
        console.log("onPullDownRefresh");
    },
    onReachBottom: function() {
        console.log("onReachBottom");
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
    getCommissionRecord: function(o) {
        var e = this, a = {
            url: "/index.php?c=Front/WxApp/User&a=browseRecord",
            data: o,
            success: function(t) {
                e.data.canScroll = !0;
                var o = e.data.list, a = t.info.data, s = o.length, n = parseInt(t.info.total);
                e.data.hasMore = 5 === n;
                var i = [];
                0 !== n && (0 !== s && o[s - 1].date === a[0].date ? (o[s - 1].list = o[s - 1].list.concat(a[0].list), 
                i = o.concat(a.filter(function(t, o) {
                    return !!o;
                }))) : i = o.concat(a), e.setData({
                    list: i
                }));
            }
        };
        t.sendRequest(a);
    },
    delRecord: function() {
        var o = this, e = {
            url: "/index.php?c=Front/WxApp/User&a=delBrowseRecord",
            method: "post",
            success: function(e) {
                e.success ? (t.showToast({
                    title: e.info,
                    icon: "success"
                }), o.setData({
                    list: []
                })) : wx.showToast({
                    title: e.info,
                    image: "../../images/error.png"
                });
            }
        };
        wx.showModal({
            title: "提示",
            content: "是否删除全部浏览记录？",
            success: function(o) {
                o.confirm && t.sendRequest(e);
            }
        });
    }
});