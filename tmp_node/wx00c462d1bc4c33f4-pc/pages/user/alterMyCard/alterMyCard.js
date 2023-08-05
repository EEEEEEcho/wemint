var e, t = require("../../../utils/util.js"), a = getApp().globalData.httpUrl;

Page({
    data: {
        chengedColor: "#666",
        items: [ {
            name: "man",
            value: "男",
            checked: "true"
        }, {
            name: "woman",
            value: "女"
        } ],
        cardName: "",
        httpUrl: a,
        cardNumber: "",
        date: "",
        time: "",
        userName: "",
        tele: "",
        age: 0
    },
    bindDateChange: function(a) {
        console.log("picker发送选择改变，携带值为", a.detail.value);
        var o = Date.parse(t.formatTime(new Date()));
        this.setData({
            date: a.detail.value,
            time: o
        });
        var s = Date.parse(a.detail.value);
        e.setData({
            age: Math.floor((o - s) / 31104e6)
        });
    },
    bindKeyInput: function(t) {
        e.setData({
            userName: t.detail.value
        }), console.log(e.data.userName);
    },
    bindKeyInput1: function(t) {
        e.setData({
            tele: t.detail.value
        }), console.log(e.data.tele);
    },
    waitReceipt: function(t) {
        console.log("===waitReceipt start===");
        var o = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/, s = /[0-9_-]/, r = e.data.tele, n = e.data.date, c = e.data.sex, d = e.data.userName, l = e.data.age;
        return null == r || "" == r ? (e.setData({
            popErrorMsg: "联系电话不能为空"
        }), void e.ohShitfadeOut()) : o.test(r) ? "" == d || null == d ? (e.setData({
            popErrorMsg: "用户名不能为空"
        }), void e.ohShitfadeOut()) : s.test(d) ? (e.setData({
            popErrorMsg: "用户名不能为数字下划线等字符"
        }), void e.ohShitfadeOut()) : "" == c || null == c ? (e.setData({
            popErrorMsg: "请选择性别"
        }), void e.ohShitfadeOut()) : "请选择您的生日" == n ? (e.setData({
            popErrorMsg: "请选择出生日期"
        }), void e.ohShitfadeOut()) : l < 0 ? (e.setData({
            popErrorMsg: "请选择正确出生日期"
        }), void e.ohShitfadeOut()) : void wx.getStorage({
            key: "userId",
            success: function(t) {
                wx.request({
                    url: a + "skmembermodel/updateWechatUser",
                    data: {
                        wechatUserId: t.data,
                        wechatUserName: e.data.userName,
                        wechatUserAge: e.data.age,
                        wechatUserPhoneNum: e.data.tele,
                        wechatUserBirthday: e.data.date,
                        wechatUserSex: e.data.sex
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(e) {
                        wx.showToast({
                            title: "修改成功",
                            success: function() {
                                wx.switchTab({
                                    url: "../../user/user"
                                });
                            }
                        });
                    }
                });
            },
            fail: function(e) {
                wx.showToast({
                    title: "获取信息失败"
                });
            }
        }) : (e.setData({
            popErrorMsg: "电话号码错误"
        }), void e.ohShitfadeOut());
    },
    ohShitfadeOut: function() {
        var t = setTimeout(function() {
            e.setData({
                popErrorMsg: ""
            }), clearTimeout(t);
        }, 3e3);
    },
    radioChange: function(t) {
        console.log("radio发生change事件，携带value值为：", t.detail.value), console.log("e.detail.value：", t.detail.value), 
        e.setData({
            sex: t.detail.value
        });
    },
    onLoad: function(o) {
        e = this, t.getShareInfos(e, a), t.setCompanyId(e, o), t.setStoreId(e), t.setStoreInfo(e);
        var s = t.formatDate(new Date());
        e.setData({
            zuijiao: s
        }), wx.getStorage({
            key: "userId",
            success: function(t) {
                wx.getStorage({
                    key: "storeId",
                    success: function(o) {
                        wx.request({
                            url: a + "skmembermodel/findWechatUserById",
                            data: {
                                wechatUserId: t.data,
                                wechatUserStoreStoreInfoStoreId: o.data
                            },
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success: function(t) {
                                var a = e.data.items;
                                console.log(t.data.wechatUserSex);
                                for (var o in a) console.log(a[o].value), console.log(t.data.wechatUserSex), a[o].value == t.data.wechatUserSex ? a[o].checked = !0 : a[o].checked = !1;
                                console.log(a), e.setData({
                                    cardInfo: t.data,
                                    items: a,
                                    age: t.data.wechatUserAge,
                                    date: t.data.wechatUserBirthday,
                                    tele: t.data.wechatUserPhoneNum,
                                    userName: t.data.wechatUserName,
                                    sex: t.data.wechatUserSex
                                }), e.data.isVip ? e.setData({
                                    vipColor: "#ffbf20"
                                }) : e.setData({
                                    vipColor: "#ccc"
                                });
                            }
                        });
                    }
                });
            }
        }), wx.getStorage({
            key: "companyId",
            success: function(t) {
                t.data;
                wx.getStorage({
                    key: "userId",
                    success: function(t) {
                        var o = t.data;
                        wx.getStorage({
                            key: "cardId",
                            success: function(t) {
                                wx.request({
                                    url: a + "skmembermodel/findVipCardById",
                                    data: {
                                        cardId: t.data,
                                        userId: o
                                    },
                                    method: "POST",
                                    header: {
                                        "content-type": "application/x-www-form-urlencoded"
                                    },
                                    success: function(t) {
                                        var a = t.data.color;
                                        e.chengeColor(a), e.setData({
                                            cardInfos: t.data
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    onReady: function() {},
    closeTk: function() {
        e.setData({
            displa: !1
        });
    },
    onShow: function() {
        e = this, wx.onSocketMessage(function(a) {
            console.log("===========接收到服务器信息=============="), console.log(a.data), t.getTkInfos(e, a);
        }), wx.onSocketClose(function() {
            console.log("=======webSocket已关闭========="), wx.getStorage({
                key: "userId",
                success: function(e) {
                    t.conSocket(e.data);
                }
            });
        });
    },
    onHide: function() {},
    onUnload: function() {
        t.closeSock();
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
    chengeColor: function(t) {
        "Color010" == t && e.setData({
            chengedColor: "#63b359"
        }), "Color020" == t && e.setData({
            chengedColor: "#2c9f67"
        }), "Color030" == t && e.setData({
            chengedColor: "#509fc9"
        }), "Color040" == t && e.setData({
            chengedColor: "#5885cf"
        }), "Color050" == t && e.setData({
            chengedColor: "#9062c0"
        }), "Color060" == t && e.setData({
            chengedColor: "#d09a45"
        }), "Color070" == t && e.setData({
            chengedColor: "#e4b138"
        }), "Color080" == t && e.setData({
            chengedColor: "#ee903c"
        }), "Color081" == t && e.setData({
            chengedColor: "#f08500"
        }), "Color082" == t && e.setData({
            chengedColor: "#a9d92d"
        }), "Color090" == t && e.setData({
            chengedColor: "#dd6549"
        }), "Color100" == t && e.setData({
            chengedColor: "#cc463d"
        }), "Color101" == t && e.setData({
            chengedColor: "#cf3e36"
        }), "Color102" == t && e.setData({
            chengedColor: "#5E6671"
        });
    }
});