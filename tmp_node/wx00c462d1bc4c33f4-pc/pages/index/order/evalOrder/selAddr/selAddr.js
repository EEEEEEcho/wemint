var e, s = require("../../../../../utils/util.js"), t = getApp().globalData.httpUrl;

Page({
    data: {
        receivingAddresses: [],
        onshow: !1
    },
    onLoad: function(a) {
        e = this, s.getShareInfos(e, t), s.setCompanyId(e, a), s.setStoreId(e);
        var d = a.addressType;
        console.log("addressType" + d);
        var o = a.selId;
        e.setData({
            addressType: d,
            checkId: o
        }), console.log("checkId ==>" + o), e.getAddressInfo(o);
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
        }), wx.getStorage({
            key: "onshow",
            success: function(s) {
                1 == s.data && (wx.setStorage({
                    key: "onshow",
                    data: !1
                }), console.log("我进来啦啊啊啊"), wx.getStorage({
                    key: "addressType",
                    success: function(s) {
                        wx.getStorage({
                            key: "checkId",
                            success: function(t) {
                                s.data;
                                var a = t.data;
                                console.log("一次还是两次=====>" + a), e.getAddressInfo(a);
                            }
                        });
                    }
                }));
            }
        });
    },
    onUnload: function() {
        s.closeSock();
    },
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
    getAddressInfo: function(s) {
        wx.getStorage({
            key: "userId",
            success: function(a) {
                wx.getStorage({
                    key: "storeId",
                    success: function(d) {
                        wx.request({
                            url: t + "skmembermodel/getAddress",
                            data: {
                                wechatUserAddressWechatUserId: a.data,
                                storeId: d.data,
                                identification: 1
                            },
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success: function(t) {
                                console.log("why=====>" + s), console.log("为啥呢" + t.data[s]), e.setData({
                                    receivingAddresses: t.data[s]
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    tianJaDizhi: function() {
        wx.navigateTo({
            url: "../../../../user/shippingAddress/addAddress/addAddress?type=" + e.data.addressType + "&selId=" + e.data.checkId
        });
    },
    goDetail: function(s) {
        var t = s.currentTarget.dataset.clickIndex, a = e.data.receivingAddresses;
        console.log(t), console.log(a);
        var d = a[t].wechatUserAddressReceiverName, o = a[t].wechatUserAddressReceiverPhoneNum, r = a[t].wechatUserAddressFullAddress, c = a[t].wechatUserAddressAddress, n = a[t].deliveryPrice;
        console.log("地址的省市区======>" + c);
        var i = a[t].wechatUserAddressId;
        wx.setStorage({
            key: "receiverNotes",
            data: {
                wechatUserAddressReceiverName: d,
                wechatUserAddressReceiverPhoneNum: o,
                wechatUserAddressFullAddress: r,
                wechatUserAddressAddress: c,
                addressId: i
            }
        }), wx.setStorage({
            key: "deliveryPrice",
            data: n
        }), wx.navigateBack({});
    }
});