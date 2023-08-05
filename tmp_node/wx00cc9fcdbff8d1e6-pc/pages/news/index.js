var t = getApp();

require("../../utils/util.js");

Page({
    data: {
        list: [],
        duration: 2e3,
        indicatorDots: !0,
        autoplay: !0,
        interval: 3e3,
        loading: !1,
        plain: !1
    },
    bindViewTap: function(t) {
        wx.navigateTo({
            url: "../detail/detail?id=" + t.target.dataset.id
        });
    },
    loadMore: function(e) {
        if (0 !== this.data.list.length) {
            this.getNextDate();
            var a = this, i = a.data.page;
            a.setData({
                loading: !0
            }), wx.request({
                url: t.d.ceshiUrl + "/Api/News/getlist",
                data: {
                    page: i
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    a.setData({
                        loading: !1,
                        page: i + 1,
                        list: a.data.list.concat([ {
                            header: "活动资讯"
                        } ]).concat(t.data.list)
                    });
                }
            });
        }
    },
    getNextDate: function() {
        var t = new Date();
        return t.setDate(t.getDate() - this.index++), t;
    },
    onLoad: function() {
        var e = this;
        wx.request({
            url: t.d.ceshiUrl + "/Api/News/index",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                e.setData({
                    banner: t.data.top_stories,
                    list: [ {
                        header: "活动资讯"
                    } ].concat(t.data.list)
                });
            }
        }), this.index = 1;
    }
});