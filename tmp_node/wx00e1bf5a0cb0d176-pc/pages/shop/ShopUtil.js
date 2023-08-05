var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, t = (getApp(), {
    addProcuctToCart: function(e, t, o, n, i, s) {
        var a = {
            Action: "Add",
            ProductID: e,
            SkuID: t,
            Num: o || 1,
            type: n
        }, l = this, c = l.getApp(), u = l.getPage();
        c.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=addToCart",
            method: "POST",
            data: a,
            success: function(a) {
                a.success ? i && i(a) : (s && s(a), 1 == a.needLogin ? (u.setData({
                    flag: !1,
                    flag2: !1,
                    flag3: !1,
                    flag4: !1,
                    scrviewFlag: !1,
                    shareMarkFlag: !1
                }), c.login({
                    forcereg: function() {
                        l.showRegUI({
                            onRegOrBindSuccess: function() {
                                u.setData({
                                    showUserReg: !1
                                }), l.addProcuctToCart(e, t, o, n, i);
                            }
                        });
                    },
                    success: function() {
                        l.addProcuctToCart(e, t, o, n, i);
                    }
                })) : (setTimeout(function() {
                    wx.showToast({
                        title: "  " + a.msg,
                        image: "../../images/choose-type_21.png",
                        duration: 1e3
                    });
                }, 500), s && s(a)));
            },
            fail: function(e) {
                c.showModal({
                    title: "提示",
                    content: e
                });
            }
        });
    },
    addToShopCart: function(e, t, o) {
        var n = this, i = n.getApp(), s = n.getPage();
        i.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopCart&a=add",
            method: "POST",
            data: e,
            hideLoading: !0,
            success: function(e) {
                e.success ? t && t(e) : (o && o(e), e.success ? (s.setData({
                    flag: !1,
                    flag2: !1,
                    flag3: !1,
                    flag4: !1,
                    scrviewFlag: !1,
                    shareMarkFlag: !1
                }), i.login({
                    forcereg: function() {
                        n.showRegUI({
                            onRegOrBindSuccess: function() {
                                s.setData({
                                    showUserReg: !1
                                }), n.addToShopCart(productid, skuid, num, type, t);
                            }
                        });
                    },
                    success: function() {
                        n.addToShopCart(productid, skuid, num, type, t);
                    }
                })) : (setTimeout(function() {
                    wx.showToast({
                        title: e.msg,
                        icon: "none",
                        duration: 2e3
                    });
                }, 500), o && o(e)));
            },
            fail: function(e) {
                i.showModal({
                    title: "提示",
                    content: e
                });
            }
        });
    },
    AddCollection: function(e, t) {
        var o = this, n = o.getApp(), i = o.getPage();
        n.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=saveCollPro&collProID=" + e,
            method: "GET",
            success: function(s) {
                s.success ? (wx.showToast({
                    title: "已收藏",
                    image: "../../images/collected.png",
                    duration: 1e3
                }), i.setData({
                    collection: !0
                }), t && t(s)) : 1 == s.needLogin ? n.login({
                    forcereg: function() {
                        o.showRegUI({
                            onRegOrBindSuccess: function() {
                                i.setData({
                                    showUserReg: !1
                                }), o.AddCollection(e);
                            }
                        });
                    }
                }) : n.showModal({
                    title: "提示",
                    content: s.msg
                });
            },
            fail: function(e) {},
            hideLoading: !0
        });
    },
    CancelCollection: function(e, t) {
        var o = this, n = o.getApp(), i = o.getPage();
        n.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=cancelCollPro&collProID=" + e,
            method: "GET",
            success: function(s) {
                s.success ? (wx.showToast({
                    title: "已取消",
                    image: "../../images/cancle.png",
                    duration: 1e3
                }), i.setData({
                    collection: !1
                }), t && t(s)) : 1 == s.needLogin ? n.login({
                    forcereg: function() {
                        o.showRegUI({
                            onRegOrBindSuccess: function() {
                                i.setData({
                                    showUserReg: !1
                                }), o.CancelCollection(e);
                            }
                        });
                    }
                }) : n.showModal({
                    title: "提示",
                    content: s.msg
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
        var o = this, n = o.getApp(), i = o.getPage();
        n.getCoupon(e, function(e) {
            t && t(e);
        }, null, function() {
            o.showRegUI({
                onRegOrBindSuccess: function() {
                    i.setData({
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
            var i = o.detail.value;
            o.detail.value.mobile ? o.detail.value.vcode ? (i.userInfo = n.globalData.userInfo, 
            i.type = "1" == o.detail.value.hasmember ? "bind" : "reg", t.doRegOrBind(i, {
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
        var n = this.getApp(), i = this.getPage(), s = null, a = null;
        "object" == (void 0 === o ? "undefined" : e(o)) ? (s = o.success, a = o.fail) : s = o, 
        n.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=regOrBindUser",
            method: "POST",
            data: t,
            success: function(e) {
                e.success ? (e.WebUserID && (n.globalData.WebUserID = e.WebUserID, wx.setStorageSync("invite", e.WebUserID)), 
                i.setData({
                    showUserReg: !1
                }), s ? s(e) : n.showModal({
                    title: "提示",
                    content: "操作成功"
                })) : a ? a(e) : n.showModal({
                    title: "提示",
                    content: e.msg
                });
            },
            fail: function(e) {
                n.showModal({
                    title: "提示",
                    content: e
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
            url: "/index.php?c=Front/WxApp/BaseApi&a=getCouponListNew",
            method: "GET",
            success: function(i) {
                if (i.success) {
                    if (!e) for (s = 0; s < i.list.length; s++) 0 == i.list[s].CanGet && (n.removeArrayItem(i.list, s), 
                    s--);
                    for (var s = 0; s < i.list.length; s++) {
                        if (i.list[s].beginTime = i.list[s].BeginTime.split(" ")[0].split("-").join(".") + " " + i.list[s].BeginTime.split(" ")[1].split(":")[0] + ":" + i.list[s].BeginTime.split(" ")[1].split(":")[1], 
                        "0" === i.list[s].Type ? i.list[s].Amount = (i.list[s].Amount / 10).toString().replace(/([\.[1-9])0+$/, "$1").replace(/\.$/, "") : i.list[s].Amount = i.list[s].Amount.replace(/([\.[1-9])0+$/, "$1").replace(/\.$/, ""), 
                        "0" === i.list[s].EndTimeType) {
                            var a = i.list[s].TimeLimit.split(" ")[1].split(":")[0] + ":" + i.list[s].TimeLimit.split(" ")[1].split(":")[1];
                            i.list[s].timeLimit = i.list[s].TimeLimit.split(" ")[0].split("-").join(".") + " " + a;
                        } else i.list[s].timeLimit = i.list[s].TimeLimit;
                        var l = i.list[s].Available;
                        parseInt(i.list[s].UserLimit) > 0 && (l = parseInt(i.list[s].UserLimit) - parseInt(i.list[s].UserCount)) > i.list[s].Available && (l = i.list[s].Available), 
                        i.list[s].UserCanGetNum = l;
                    }
                    t && t(i);
                } else 1 == i.needLogin && n.login({
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