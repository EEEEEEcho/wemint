var e, s = require("../../../utils/util.js"), t = getApp().globalData.httpUrl;

Page({
    data: {
        addresses: [],
        cartArr1: [ {
            name: "mrdz",
            value: "默认地址",
            checked: "false"
        } ],
        cartArr2: [ {
            name: "mrdz",
            value: "默认地址",
            checked: "false"
        } ],
        cartArr3: [ {
            name: "mrdz",
            value: "默认地址",
            checked: "false"
        } ],
        cartArr4: [ {
            name: "mrdz",
            value: "默认地址",
            checked: "false"
        } ],
        mraddresses1: [],
        ptaddresses1: [],
        mraddresses2: [],
        ptaddresses2: [],
        isFold: !0,
        isFolds: !0
    },
    checkboxChange: function(s) {
        var a = s.detail.value.length;
        wx.getStorage({
            key: "userId",
            success: function(d) {
                wx.request({
                    url: t + "skmembermodel/updateAddressIsDefault",
                    data: {
                        wechatUserAddressWechatUserId: d.data,
                        wechatUserAddressIsDefault: a,
                        wechatUserAddressId: s.currentTarget.dataset.addressId,
                        addressType: s.currentTarget.dataset.type
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(s) {
                        e.onLoad();
                    }
                });
            }
        });
    },
    showAll: function(e) {
        this.setData({
            isFold: !this.data.isFold
        });
    },
    showAlls: function(e) {
        this.setData({
            isFolds: !this.data.isFolds
        });
    },
    onLoad: function(a) {
        e = this, s.getShareInfos(e, t), s.setCompanyId(e, a), s.setStoreId(e), s.setStoreInfo(e), 
        wx.getStorage({
            key: "userId",
            success: function(s) {
                wx.request({
                    url: t + "skmembermodel/getAddress",
                    data: {
                        wechatUserAddressWechatUserId: s.data
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(s) {
                        var t = s.data[0], a = s.data[1], d = [], o = [], r = [], n = [], c = void 0, l = void 0;
                        for (c in t) if (1 == t[c].wechatUserAddressIsDefault) {
                            var u = [ {
                                name: "mrdz",
                                value: "默认地址",
                                checked: !0
                            } ];
                            t[c].checklist = u, d[0] = t[c];
                        } else {
                            var i = [ {
                                name: "mrdz",
                                value: "默认地址",
                                checked: !1
                            } ];
                            t[c].checklist = i, r.push(t[c]);
                        }
                        for (l in a) if (1 == a[l].wechatUserAddressIsDefault) {
                            var h = [ {
                                name: "mrdz",
                                value: "默认地址",
                                checked: !0
                            } ];
                            a[l].checklist = h, o[0] = a[l];
                        } else {
                            var f = [ {
                                name: "mrdz",
                                value: "默认地址",
                                checked: !1
                            } ];
                            a[l].checklist = f, n.push(a[l]);
                        }
                        e.setData({
                            mraddresses1: d,
                            mraddresses2: o,
                            ptaddresses1: r,
                            ptaddresses2: n
                        });
                    }
                });
            }
        });
    },
    onReady: function() {
        console.log("===onReady===");
    },
    closeTk: function() {
        e.setData({
            displa: !1
        });
    },
    onShow: function() {
        e = this, wx.onSocketMessage(function(t) {
            console.log("===========接收到服务器信息=============="), console.log(t.data), s.getTkInfos(e, t);
        }), wx.onSocketClose(function() {
            console.log("=======webSocket已关闭========="), wx.getStorage({
                key: "userId",
                success: function(e) {
                    s.conSocket(e.data);
                }
            });
        }), console.log("===onShow==="), e.onLoad();
    },
    onHide: function() {
        console.log("===onHide===");
    },
    onUnload: function() {
        console.log("===onUnload==="), s.closeSock();
    },
    onPullDownRefresh: function() {
        console.log("===onPullDownRefresh==="), wx.stopPullDownRefresh(), e = this, setTimeout(function() {
            e.onPullDownRefresh();
        }, 500);
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: e.data.shareTitle,
            desc: "",
            imageUrl: e.data.shareImgUrl,
            path: "/pages/index/index?storeId=" + e.data.storeId + "&companyId=" + e.data.companyId,
            success: function(e) {
                console.log("转发成功");
            },
            fail: function(e) {
                console.log("转发失败");
            }
        };
    },
    addAddress: function(e) {
        wx.navigateTo({
            url: "addAddress/addAddress?type=" + e.currentTarget.dataset.type
        });
    },
    deleteAddress: function(s) {
        wx.showModal({
            title: "删除地址",
            content: "确定要删除选中地址么？",
            success: function(a) {
                a.confirm ? (console.log("用户点击确定"), wx.request({
                    url: t + "skmembermodel/updateAddress",
                    data: {
                        wechatUserAddressId: s.currentTarget.dataset.addressId,
                        wechatUserAddressDeflg: 1
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(s) {
                        e.onLoad();
                    }
                })) : a.cancel && console.log("用户点击取消");
            }
        });
    },
    editAddress: function(e) {
        wx.navigateTo({
            url: "addAddress/addAddress?address=" + e.currentTarget.dataset.addressId + "&type=" + e.currentTarget.dataset.type
        });
    }
});