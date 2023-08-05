require("../../../util/qqmap-wx-jssdk.js");

var e, a = require("../../../../utils/util.js"), t = getApp().globalData.httpUrl;

Page({
    data: {
        cartArr: [ {
            name: "男",
            value: "男",
            checked: !0
        }, {
            name: "女",
            value: "女",
            checked: !1
        } ],
        sex: "",
        name: "",
        telphone: "",
        address: "",
        countryIndex: 6,
        region: [ "辽宁省", "沈阳市", "和平区" ],
        savedAddress: !1
    },
    sexChange: function(a) {
        e.setData({
            sex: a.detail.value
        });
    },
    changeRegin: function(a) {
        e.setData({
            region: a.detail.value
        });
    },
    bindNameInput: function(a) {
        e.setData({
            name: a.detail.value
        });
    },
    bindTelInput: function(a) {
        e.setData({
            telphone: a.detail.value
        });
    },
    bindAddressInput: function(a) {
        e.setData({
            address: a.detail.value
        });
    },
    onLoad: function(s) {
        e = this, a.getShareInfos(e, t), a.setCompanyId(e, s), a.setStoreId(e), a.setStoreInfo(e);
        var d = s.type, o = s.selId;
        console.log(d), e.setData({
            addressType: d,
            checkId: o
        }), console.log(s), console.log("options.type ==> " + s.type);
        var r = s.address;
        r ? (e.setData({
            addressId: r
        }), wx.request({
            url: t + "skmembermodel/selAddressByid",
            data: {
                wechatUserAddressId: r
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(a) {
                console.log("res.data ==> "), console.log(a.data);
                var t = e.data.region;
                t = a.data.wechatUserAddressAddress.split(",");
                var s = e.data.cartArr, o = a.data.wechatUserAddressReceiverName, r = a.data.wechatUserAddressReceiverPhoneNum, n = a.data.wechatUserAddressFullAddress;
                for (var c in s) s[c].value == a.data.wechatUserAddressSex ? s[c].checked = !0 : s[c].checked = !1;
                e.setData({
                    addressInfo: a.data,
                    addressType: d,
                    title: "修改地址",
                    region: t,
                    cartArr: s,
                    name: o,
                    telphone: r,
                    address: n
                });
            }
        })) : e.setData({
            addressType: d,
            title: "新增地址"
        });
    },
    onReady: function() {},
    closeTk: function() {
        e.setData({
            displa: !1
        });
    },
    onShow: function() {
        e = this, wx.onSocketMessage(function(t) {
            console.log("===========接收到服务器信息=============="), console.log(t.data), a.getTkInfos(e, t);
        }), wx.onSocketClose(function() {
            console.log("=======webSocket已关闭========="), wx.getStorage({
                key: "userId",
                success: function(e) {
                    a.conSocket(e.data);
                }
            });
        });
    },
    onHide: function() {},
    onUnload: function() {
        a.closeSock();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh(), e = this, setTimeout(function() {
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
    saveAddress: function() {
        var a = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
        if (null == e.data.name || "" == e.data.name) return e.setData({
            popErrorMsg: "姓名不能为空"
        }), void e.ohShitfadeOut();
        if (!e.data.savedAddress) {
            if (null == e.data.telphone || "" == e.data.telphone) return e.setData({
                popErrorMsg: "手机号不能为空"
            }), void e.ohShitfadeOut();
            if (!a.test(e.data.telphone)) return e.setData({
                popErrorMsg: "手机号码格式错误"
            }), void e.ohShitfadeOut();
            if (null == e.data.address || "" == e.data.address) return e.setData({
                popErrorMsg: "详细地址不能为空"
            }), void e.ohShitfadeOut();
            e.setData({
                savedAddress: !0
            }), wx.getStorage({
                key: "userId",
                success: function(a) {
                    var s = void 0;
                    s = "新增地址" == e.data.title ? t + "skmembermodel/insertAddress" : t + "skmembermodel/updateAddress", 
                    wx.request({
                        url: s,
                        data: {
                            wechatUserAddressId: e.data.addressId,
                            wechatUserAddressWechatUserId: a.data,
                            wechatUserAddressFullAddress: e.data.address,
                            wechatUserAddressIsDefault: "0",
                            wechatUserAddressReceiverName: e.data.name,
                            wechatUserAddressReceiverPhoneNum: e.data.telphone,
                            wechatUserAddressAddress: e.data.region,
                            wechatUserAddressSex: e.data.sex,
                            addressType: e.data.addressType
                        },
                        method: "POST",
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        success: function(a) {
                            wx.setStorage({
                                key: "checkId",
                                data: e.data.checkId
                            }), wx.setStorage({
                                key: "addressType",
                                data: e.data.addressType
                            }), wx.setStorage({
                                key: "onshow",
                                data: !0
                            }), wx.navigateBack();
                        }
                    });
                }
            });
        }
    },
    ohShitfadeOut: function() {
        var a = setTimeout(function() {
            e.setData({
                popErrorMsg: ""
            }), clearTimeout(a);
        }, 3e3);
    }
});