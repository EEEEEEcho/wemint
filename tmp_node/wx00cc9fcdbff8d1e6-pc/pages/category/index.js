var e = getApp();

Page({
    data: function(e, t, a) {
        return t in e ? Object.defineProperty(e, t, {
            value: a,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = a, e;
    }({
        typeTree: {},
        currType: 0,
        types: []
    }, "typeTree", []),
    onLoad: function(t) {
        var a = this;
        wx.request({
            url: e.d.ceshiUrl + "/Api/Category/index",
            method: "post",
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                if (1 == e.data.status) {
                    var t = e.data.list, r = e.data.catList;
                    a.setData({
                        types: t,
                        typeTree: r
                    });
                } else wx.showToast({
                    title: e.data.err,
                    duration: 2e3
                });
                a.setData({
                    currType: 2
                });
            },
            error: function(e) {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3
                });
            }
        });
    },
    tapType: function(t) {
        var a = this, r = t.currentTarget.dataset.typeId;
        a.setData({
            currType: r
        }), wx.request({
            url: e.d.ceshiUrl + "/Api/Category/getcat",
            method: "post",
            data: {
                cat_id: r
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                if (1 == e.data.status) {
                    var t = e.data.catList;
                    a.setData({
                        typeTree: t
                    });
                } else wx.showToast({
                    title: e.data.err,
                    duration: 2e3
                });
            },
            error: function(e) {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3
                });
            }
        });
    },
    getTypeTree: function(e) {
        var t = this, a = t.data;
        a.typeTree[e] || request({
            url: ApiList.goodsTypeTree,
            data: {
                typeId: +e
            },
            success: function(r) {
                a.typeTree[e] = r.data.data, t.setData({
                    typeTree: a.typeTree
                });
            }
        });
    }
});