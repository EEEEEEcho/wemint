var e = getApp();

Page({
    data: {
        address: [],
        id: 0,
        url: e.page.url,
        flag: 0,
        userid: "",
        type: ""
    },
    onLoad: function(e) {
        console.log(e.type);
        e.type && this.setData({
            type: e.type
        });
    },
    getAddress: function() {
        var t = this;
        console.log(t.data.userid), wx.request({
            url: e.page.url + "/wx/member.php?act=address",
            method: "post",
            data: {
                userid: t.data.userid
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                console.log(e.data), t.setData({
                    address: e.data
                });
            }
        });
    },
    listenerRadioGroup: function(e) {
        console.log(e.detail.value);
    },
    getyun: function(t) {
        var a = this;
        console.log(t.currentTarget.dataset.id), console.log(t.currentTarget.dataset.flag), 
        console.log(t.currentTarget.dataset.index);
        for (var s = t.currentTarget.dataset.index, o = a.data.address, n = 0; n < o.length; n++) o[n].is_first = n == s ? 1 : 0;
        a.setData({
            flag: t.currentTarget.dataset.flag,
            id: t.currentTarget.dataset.id,
            address: o
        }), wx.request({
            url: e.page.url + "/wx/member.php?act=is_first",
            method: "post",
            data: {
                userid: a.data.userid,
                address_id: a.data.id
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                console.log(e.data), "" == a.data.type ? wx.navigateBack({}) : a.getAddress();
            }
        });
    },
    addressDel: function(t) {
        console.log(t.currentTarget.dataset.id);
        var a = this;
        this.setData({
            id: t.currentTarget.dataset.id
        }), wx.showModal({
            title: "提示",
            content: "你确认删除吗",
            success: function(t) {
                t.confirm && wx.request({
                    url: e.page.url + "/wx/member.php?act=address_delete",
                    method: "post",
                    data: {
                        id: a.data.id
                    },
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(e) {
                        a.getAddress();
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
        var t = this;
        wx.setNavigationBarTitle({
            title: e.globalData.title
        }), wx.getStorage({
            key: "userid",
            success: function(e) {
                console.log(e), t.setData({
                    userid: e.data
                }), t.getAddress();
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});