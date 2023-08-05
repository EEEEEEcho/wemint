var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, t = (getApp(), {
    addProcuctToCart: function(e, t, o, n, s, i) {
        var a = {
            Action: "Add",
            ProductID: e,
            SkuID: t,
            Num: o || 1,
            type: n
        }, l = this, u = l.getApp(), c = l.getPage();
        u.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=addToCart",
            method: "POST",
            data: a,
            success: function(a) {
                a.success ? s && s(a) : 1 == a.needLogin ? u.login({
                    forcereg: function() {
                        l.showRegUI({
                            onRegOrBindSuccess: function() {
                                c.setData({
                                    showUserReg: !1
                                }), l.addProcuctToCart(e, t, o, n, s);
                            }
                        });
                    },
                    success: function() {
                        l.addProcuctToCart(e, t, o, n, s);
                    }
                }) : (setTimeout(function() {
                    wx.showToast({
                        title: "  " + a.msg,
                        image: "../../images/choose-type_21.png",
                        duration: 1e3
                    });
                }, 500), i && i(a));
            },
            fail: function(e) {
                u.showModal({
                    title: "提示",
                    content: e
                });
            }
        });
    },
    AddCollection: function(e, t) {
        var o = this, n = o.getApp(), s = o.getPage();
        n.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=saveCollPro&collProID=" + e,
            method: "GET",
            success: function(i) {
                i.success ? (wx.showToast({
                    title: "已收藏",
                    image: "../../images/collected.png",
                    duration: 1e3
                }), s.setData({
                    collection: !0
                }), t && t(i)) : 1 == i.needLogin ? n.login({
                    forcereg: function() {
                        o.showRegUI({
                            onRegOrBindSuccess: function() {
                                s.setData({
                                    showUserReg: !1
                                }), o.AddCollection(e);
                            }
                        });
                    }
                }) : n.showModal({
                    title: "提示",
                    content: "操作失败：" + i.msg
                });
            },
            fail: function(e) {},
            hideLoading: !0
        });
    },
    CancelCollection: function(e, t) {
        var o = this, n = o.getApp(), s = o.getPage();
        n.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=cancelCollPro&collProID=" + e,
            method: "GET",
            success: function(i) {
                i.success ? (wx.showToast({
                    title: "已取消",
                    image: "../../images/cancle.png",
                    duration: 1e3
                }), s.setData({
                    collection: !1
                }), t && t(i)) : 1 == i.needLogin ? n.login({
                    forcereg: function() {
                        o.showRegUI({
                            onRegOrBindSuccess: function() {
                                s.setData({
                                    showUserReg: !1
                                }), o.CancelCollection(e);
                            }
                        });
                    }
                }) : n.showModal({
                    title: "提示",
                    content: "操作失败：" + i.msg
                });
            },
            fail: function(e) {},
            hideLoading: !0
        });
    },
    getInputValue: function(e, t) {
        wx.createSelectorQuery().select(e).fields({
            properties: [ "value" ]
        }, function(e) {
            t(e);
        }).exec();
    },
    getCoupon: function(e, t) {
        var o = this, n = o.getApp(), s = o.getPage();
        n.getCoupon(e, function(e) {
            t && t(e);
        }, null, function() {
            o.showRegUI({
                onRegOrBindSuccess: function() {
                    s.setData({
                        showUserReg: !1
                    }), o.getCoupon(e, t);
                }
            });
        });
    },
    showRegUI: function(e) {
        var t = this, o = t.getPage(), n = t.getApp();
        o.setData({
            showUserReg: !0,
            hasMember: !1,
            VCodeCountDown: 0
        }), o.hideRegUI || (o.hideRegUI = function() {
            o.setData({
                showUserReg: !1
            }), e.onClose && e.onClose();
        }), o.getUserRegVCode || (o.getUserRegVCode = function(e) {
            t.getInputValue("#userreg-mobile", function(e) {
                if (!e.value || !/^1[0-9]{10}$/.test(e.value)) return n.showModal({
                    title: "提示",
                    content: "请输入正确的手机号"
                }), !1;
                o.setData({
                    VCodeCountDown: 45
                }), n.getVerifyCode(e.value, "", function() {
                    var e = setInterval(function() {
                        o.setData({
                            VCodeCountDown: o.data.VCodeCountDown - 1
                        }), o.data.VCodeCountDown <= 0 && clearInterval(e);
                    }, 1e3);
                }, function() {
                    o.setData({
                        VCodeCountDown: 0
                    });
                });
            });
        }), o.changeUserRegType || (o.changeUserRegType = function(e) {
            var t = e.currentTarget.dataset.hasmember;
            o.setData({
                hasMember: "1" == t
            });
        }), o.onRegFormSubmit = null, o.onRegFormSubmit || (o.onRegFormSubmit = function(o) {
            var s = o.detail.value;
            o.detail.value.mobile ? o.detail.value.vcode ? (s.userInfo = n.globalData.userInfo, 
            s.type = "1" == o.detail.value.hasmember ? "bind" : "reg", t.doRegOrBind(s, {
                success: e ? e.onRegOrBindSuccess : null
            })) : n.showModal({
                title: "提示",
                content: "请输入验证码"
            }) : n.showModal({
                title: "提示",
                content: "请输入正确的手机号"
            });
        });
    },
    doRegOrBind: function(t, o) {
        var n = this.getApp(), s = this.getPage(), i = null, a = null;
        "object" == (void 0 === o ? "undefined" : e(o)) ? (i = o.success, a = o.fail) : i = o, 
        n.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=regOrBindUser",
            method: "POST",
            data: t,
            success: function(e) {
                e.success ? (e.WebUserID && (n.globalData.WebUserID = e.WebUserID, wx.setStorageSync("invite", e.WebUserID)), 
                s.setData({
                    showUserReg: !1
                }), i ? i(e) : n.showModal({
                    title: "提示",
                    content: "操作成功"
                })) : a ? a(e) : n.showModal({
                    title: "提示",
                    content: "操作失败：" + e.msg
                });
            },
            fail: function(e) {
                n.showModal({
                    title: "提示",
                    content: "操作失败：" + e
                });
            }
        });
    },
    getApp: function(e) {
        function t() {
            return e.apply(this, arguments);
        }
        return t.toString = function() {
            return e.toString();
        }, t;
    }(function() {
        return getApp();
    }),
    getPage: function() {
        return getCurrentPages()[getCurrentPages().length - 1];
    },
    loadCouponList: function(e, t) {
        var o = this, n = getApp();
        n.sendRequest({
            url: "/index.php?c=Front/WxApp/ServiceApi&a=getCouponListWithUserNum",
            method: "GET",
            success: function(s) {
                if (s.success) {
                    if (!e) for (i = 0; i < s.list.length; i++) 0 == s.list[i].CanGet && (n.removeArrayItem(s.list, i), 
                    i--);
                    for (var i = 0; i < s.list.length; i++) {
                        var a = s.list[i].BeginTime.split(" ")[0].split("-").join(".");
                        if (0 == s.list[i].Type) {
                            var l = s.list[i].Amount.split("").join(".");
                            s.list[i].amount = l;
                        } else s.list[i].amount = s.list[i].Amount;
                        s.list[i].Amount >= 1e4 && (s.list[i].amount = s.list[i].Amount / 1e4 + ""), s.list[i].beginTime = a;
                        var u = s.list[i].TimeLimit.split(" ")[0].split("-").join(".");
                        s.list[i].timeLimit = u;
                        var c = s.list[i].Available;
                        parseInt(s.list[i].UserLimit) > 0 && (c = parseInt(s.list[i].UserLimit) - parseInt(s.list[i].UserCount)) > s.list[i].Available && (c = s.list[i].Available), 
                        s.list[i].UserCanGetNum = c;
                    }
                    t && t(s);
                } else 1 == s.needLogin && n.login({
                    forcereg: function() {
                        o.showRegUI({
                            onRegOrBindSuccess: function() {
                                page.setData({
                                    showUserReg: !1
                                }), o.loadCouponList(e, t);
                            }
                        });
                    }
                });
            },
            fail: function(e) {
                console.log("getCouponListWithUserNum fail");
            }
        });
    }
});

module.exports = t;