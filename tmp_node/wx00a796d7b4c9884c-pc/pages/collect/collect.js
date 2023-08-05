var t = getApp();

Page({
    data: {
        url: t.page.url,
        userid: "",
        collect: [],
        id: ""
    },
    getCollect: function() {
        var e = this;
        wx.request({
            url: t.page.url + "/wx/member.php?act=collect",
            method: "post",
            data: {
                userid: e.data.userid
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.log(t.data), e.setData({
                    collect: t.data
                });
            }
        });
    },
    onLoad: function(t) {
        var e = this;
        wx.getStorage({
            key: "userid",
            success: function(t) {
                console.log(t), e.setData({
                    userid: t.data
                }), e.getCollect();
            }
        });
    },
    collectDel: function(e) {
        console.log(e.currentTarget.dataset.id);
        var o = this;
        this.setData({
            id: e.currentTarget.dataset.id
        }), wx.showModal({
            title: "提示",
            content: "你确认删除吗",
            success: function(e) {
                e.confirm && wx.request({
                    url: t.page.url + "/wx/member.php?act=membergoods_delete",
                    method: "post",
                    data: {
                        goodsid: o.data.id,
                        userid: o.data.userid
                    },
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(t) {
                        o.getCollect();
                    }
                });
            },
            fail: function() {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3,
                    icon: "none"
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        var e = this;
        wx.setNavigationBarTitle({
            title: t.globalData.title
        }), wx.getStorage({
            key: "userid",
            success: function(t) {
                console.log(t), e.setData({
                    userid: t.data
                }), e.getCollect();
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});