var t = getApp(), a = t.globalData.rootPath;

Page({
    data: {
        path: a
    },
    onLoad: function(t) {},
    detail: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/cars/detail?id=" + a
        });
    },
    onReady: function() {},
    onShow: function() {
        var e = this;
        wx.request({
            url: a + "/admin/xcx/user",
            data: {
                openid: t.globalData.openid
            },
            method: "POST",
            success: function(t) {
                console.log(t);
                var o = t.data.id;
                wx.request({
                    url: a + "/admin/xcx/yuyuelist",
                    data: {
                        uid: o
                    },
                    method: "POST",
                    success: function(t) {
                        console.log(t);
                        var a = t.data.list;
                        setInterval(function() {
                            for (var t = e.forea(a), o = 0; o < a.length; o++) 1 == a[o].rank ? a[o].clock = t[o] : a[o].clock = -1;
                            e.setData({
                                list: a
                            });
                        }, 1e3);
                    }
                });
            }
        });
    },
    cancel: function(t) {
        var e = this, o = t.currentTarget.dataset.id;
        wx.request({
            url: a + "/admin/xcx/yycancel",
            data: {
                id: o
            },
            method: "POST",
            success: function(t) {
                console.log(t), wx.showToast({
                    title: "取消预约成功",
                    icon: "success",
                    duration: 2e3,
                    mask: !0,
                    complete: function(t) {
                        e.onShow();
                    }
                });
            }
        });
    },
    forea: function(t) {
        for (var e = this, o = [], n = Date.parse(new Date()) / 1e3, r = 0; r < t.length; r++) {
            var c = t[r].start - n;
            if (t[r].update_time - n > 0) i = "未开始"; else if (c < 0) {
                i = "已结束";
                wx.request({
                    url: a + "/admin/xcx/yycancel",
                    data: {
                        id: t[r].id
                    },
                    method: "POST",
                    success: function(t) {
                        console.log(t), e.onShow();
                    }
                });
            } else var i = e.dateformat(c);
            o.push(i);
        }
        return o;
    },
    dateformat: function(t) {
        var a = t, e = Math.floor(a / 3600 / 24).toString();
        1 == e.length && (e = "0" + e);
        var o = Math.floor(a / 3600).toString();
        1 == o.length && (o = "0" + o);
        var n = Math.floor(a / 60 % 60).toString();
        1 == n.length && (n = "0" + n);
        var r = Math.floor(a % 60).toString();
        return 1 == r.length && (r = "0" + r), o + ":" + n + ":" + r;
    }
});