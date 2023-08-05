function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

var e = getApp(), a = require("ShopUtil.js"), o = require("../../components/wxb.js");

Page({
    options: {},
    onShareAppMessage: function() {
        return e.shareAppMessage("/pages/shop/index");
    },
    onLoad: function(t) {
        this.options = t, e.getPageUrl(this, t), e.registerGlobalFunctions(this);
        var a = this;
        wx.getSystemInfo({
            success: function(t) {
                var e = t.windowHeight * (750 / t.windowWidth);
                a.setData({
                    productListHeight: e - 98 - 96
                });
            }
        }), this.setData({
            queryparams: t,
            authorization: 1
        });
    },
    onShow: function() {
        this.setData({
            headerFlag: !0
        }), e.globalData.WebUserID ? this.initData(this.data.queryparams) : e.doAfterUserInfoAuth({
            success: this.initData,
            fail: this.initData
        });
    },
    initData: function(t) {
        var o = this;
        o.loadCartInfo(!1), o.setData({
            queryparams: t,
            shopcart: o.options.one ? o.options.one : 0
        }), a.loadCouponList(!0, function(t) {
            t.list.forEach(function(t) {
                t.code = 1;
            }), o.setData({
                couponlist: t.list,
                userID: e.globalData.WebUserID || 0
            });
        });
        var s = getCurrentPages(), i = s[s.length - 1], n = wx.getStorageSync("hasMobile") || 0, r = e.globalData.getMobileNode ? e.globalData.getMobileNode.enterShopCart : 0;
        0 === e.globalData.hasMobile && 0 !== o.data.userID && 0 !== r && 1 === o.data.authorization && 0 === n && 1 !== o.data.phonestatus && (2 === r ? wx.redirectTo({
            url: "/pages/phoneauthorization/index?getMobileNode=" + r + "&pageroute=" + i.route
        }) : 1 === r && o.setData({
            phonelicense: !0,
            authorizationStatus: 1
        })), o.setData({
            authorization: 1
        });
    },
    getPhoneNumber: function(t) {
        var a = this, s = e.globalData.getMobileNode, i = s.enterShopCart;
        if (i = a.data.licensecouponid ? s.getCoupons : s.enterShopCart, t.detail.errMsg.indexOf("getPhoneNumber:ok") > -1) {
            var n = e.globalData.appId, r = e.globalData.session_key, l = new o(n, r).decryptData(t.detail.encryptedData, t.detail.iv);
            e.loadphoneInfo(l.phoneNumber), a.data.licensecouponid && a.couponCollection();
        } else a.setData({
            authorization: 2
        }), 2 === i && a.setData({
            allowspopup: !0
        });
    },
    abolish: function() {
        this.setData({
            allowspopup: !1
        });
    },
    turnOff: function() {
        e.turnOff();
    },
    preventD: function() {},
    fork: function() {
        var t = this;
        t.setData({
            authorizationfailure: !1
        }), t.data.licensecouponid && t.couponCollection();
    },
    onPullDownRefresh: function() {
        this.getPullDownDataRefresh();
    },
    getPullDownDataRefresh: function() {
        var t = this;
        t.data.pullDownRefreshFlag && (t.setData({
            headFlag: !0
        }), t.setData({
            pullDownRefreshFlag: !1
        }), t.data.pullDownRefreshFlag = !1, t.data.queryparams.refresh = !0, setTimeout(function() {
            t.initData(t.data.queryparams), t.setData({
                pullDownRefreshFlag: !0,
                headFlag: !1
            }), wx.stopPullDownRefresh();
        }, 1500));
    },
    data: {
        headFlag: !1,
        productListHeight: 500,
        pullDownRefreshFlag: !0,
        backselectFlag: !1,
        getPageFlag: !0,
        hintText: "",
        invaildGoods: [],
        productHeight: !0,
        noProductSelect: !1,
        shopcartStatus: !1,
        lengthNum: 0,
        flag4: !1,
        scrollYFlag: !0,
        shopcart: 0,
        headerFlag: !0,
        checkedNum: 0,
        allChecked: !1,
        allname: "全选",
        reminder: "授权提示",
        matter: "授权失败，请重新授权",
        abrogate: "暂时先不",
        permission: "允许",
        goodlength: 0,
        authorization: 1,
        ordermoney: "0.00",
        startX: 0,
        startY: 0,
        proNum: 1,
        clickFlag: !0,
        showList: [],
        hasproduct: !0,
        timer: null,
        baseUrl: e.globalData.siteBaseUrl,
        phonelicense: !1,
        fork: !1
    },
    close: function() {
        this.setData({
            flag4: !this.data.flag4
        });
    },
    getCoupon: function(t) {
        var a = this, o = (wx.getStorageSync("hasMobile"), e.globalData.getMobileNode ? e.globalData.getMobileNode.getCoupons : 0);
        a.setData({
            licensecouponid: t.currentTarget.dataset.couponid
        }), 0 === e.globalData.hasMobile && 0 !== o ? a.setData({
            phonelicense: !0
        }) : a.couponCollection();
    },
    couponCollection: function() {
        var t = this;
        a.getCoupon(t.data.licensecouponid, function(e) {
            t.setData({
                statusCode: e.result.Code,
                CouponId: e.result.CouponItem.CouponID
            }), wx.showToast({
                icon: "success",
                title: "领取成功"
            }), t.data.couponlist.forEach(function(e) {
                t.data.CouponId === e.CouponID && (e.code = t.data.statusCode);
            }), t.setData({
                couponlist: t.data.couponlist
            });
        });
    },
    getGoodlength: function() {
        var t = 0, e = 0;
        this.data.showList.forEach(function(a) {
            e += a.pro_list.length, a.pro_list.forEach(function(e) {
                t += Number(e.num) || 0;
            });
        }), this.setData({
            goodlength: t,
            checkedNum: e
        });
    },
    loadCartInfo: function(a, o) {
        var s = this;
        e.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopCart&a=getList",
            method: "GET",
            hideLoading: a || !1,
            success: function(a) {
                if (a.success) {
                    if (delete a.success, delete a.msg, o) return void o(a.data);
                    if (s.data.backselectFlag) return console.log("成功了 不更新数据"), void s.setData({
                        backselectFlag: !1
                    });
                    var i = 0, n = 0, r = a.data;
                    if (r && r.valid && r.valid.length) {
                        r.valid.forEach(function(t) {
                            n += t.pro_list.length, t.show_bar = Number(t.show_bar), t.pro_list.forEach(function(t) {
                                i += Number(t.num) || 0, t.num = Number(t.num), t.stock = Number(t.stock), t.buy_limit > 0 || "0" == t.buy_limit ? (t.buy_limit = Number(t.buy_limit), 
                                t.limtNum = t.buy_limit > t.stock || 0 == t.buy_limit ? t.stock : t.buy_limit) : t.limtNum = t.stock;
                            });
                        }), s.setData({
                            checkedNum: n
                        });
                    }
                    var l = [];
                    r && r.invalid && r.invalid.length && r.invalid.forEach(function(e) {
                        e.pro_list && e.pro_list.length && (l = [].concat(t(l), t(e.pro_list)));
                    }), s.setData({
                        goodlength: i,
                        showList: r.valid || [],
                        allChecked: !1,
                        invaildGoods: l,
                        hasproduct: i,
                        lengthNum: 0,
                        ordermoney: "0.00",
                        phonestatus: 0
                    });
                } else e.showModal({
                    title: "提示",
                    content: a.msg
                });
            },
            fail: function(t) {
                e.showModal({
                    title: "提示",
                    content: t
                });
            }
        });
    },
    doDeleteItem: function(t, a) {
        var o = this, s = {
            data: t
        };
        e.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopCart&a=delete",
            method: "POST",
            data: s,
            success: function(t) {
                if (t.success) {
                    var s = o.data.showList;
                    if (a) {
                        var i = a.item;
                        if (i) {
                            s[i.indexNum].pro_list.splice(i.idxNum, 1), s[i.indexNum].pro_list.length || s.splice(i.indexNum, 1), 
                            i.selectFlag && o.reCalMoney();
                            var n = s[i.indexNum] && s[i.indexNum].act_id;
                            return i.show_bar && s[i.indexNum] && n && o.loadCartInfo(!0, function(t) {
                                o.changeShowListTitle(t.valid, n);
                            }), o.setData({
                                checkedNum: o.data.checkedNum - 1,
                                showList: s,
                                hasproduct: s.length
                            }), o.judgeCheckedNum(), void o.getGoodlength();
                        }
                        return void (a.success && a.success(t));
                    }
                    o.loadCartInfo(!0);
                } else e.showModal({
                    title: "提示",
                    content: t.msg
                });
            },
            fail: function(t) {
                e.showModal({
                    title: "提示",
                    content: t
                });
            }
        });
    },
    delCartItem: function(t) {
        var e = this, a = t.currentTarget.dataset.pkey, o = t.currentTarget.dataset.source, s = t.currentTarget.dataset.index, i = t.currentTarget.dataset.idx, n = this.data.showList[s].pro_list[i];
        n.indexNum = s, n.idxNum = i, n.show_bar = this.data.showList[s].show_bar, wx.showModal({
            title: "提示",
            content: "确定删除吗？",
            success: function(t) {
                t.confirm ? e.doDeleteItem([ {
                    pkey: a,
                    source: o
                } ], {
                    item: n
                }) : t.cancel && console.log("用户点击取消");
            }
        });
    },
    blurManual: function(t) {
        var e = this, a = t.currentTarget.dataset.index, o = t.currentTarget.dataset.idx, s = this.data.showList[a].pro_list[o];
        0 === (Number(t.detail.value) || 0) && (this.data.showList[a].pro_list[o].num = 1, 
        s.num = 1, this.setData({
            showList: this.data.showList
        })), this.changeProductNum({
            pkey: s.pkey,
            num: s.num,
            source: s.source,
            actId: s.extra
        }, function() {
            s.num = e.data.proNum, e.data.showList[a].pro_list[o] = s, e.setData({
                showList: e.data.showList
            }), e.getGoodlength(), e.getComputedMoney(s);
        });
    },
    inputManual: function(t) {
        var e = t.currentTarget.dataset.index, a = t.currentTarget.dataset.idx, o = this.data.showList[e].pro_list[a], s = Number(t.detail.value) || "", i = s > o.limtNum && 0 != o.limtNum ? o.limtNum : s;
        this.data.showList[e].pro_list[a].num = i, this.setData({
            showList: this.data.showList
        }), this.getComputedMoney(o);
    },
    getComputedMoney: function(t) {
        t.selectFlag && this.reCalMoney();
    },
    focusManual: function(t) {
        var e = t.currentTarget.dataset.index, a = t.currentTarget.dataset.idx, o = this.data.showList[e].pro_list[a];
        this.setData({
            proNum: o.num
        });
    },
    changeStatus: function() {
        this.setData({
            headerFlag: !this.data.headerFlag
        });
    },
    changeCartItemNum: function(t) {
        var e = this, a = t.currentTarget.dataset.index, o = t.currentTarget.dataset.idx, s = t.currentTarget.dataset.source, i = t.currentTarget.dataset.pkey, n = t.currentTarget.dataset.type, r = t.currentTarget.dataset.actid, l = this.data.showList[a].pro_list[o];
        if (l.num = Number(l.num) || 1, 1 !== l.num || "1" !== n) if (l.num !== l.limtNum || "2" !== n) {
            this.data.timer ? (clearTimeout(this.data.timer), this.setData({
                timer: null
            })) : this.setData({
                proNum: l.num
            }), "1" === n && l.num > 1 ? l.num -= 1 : "2" === n && l.num < l.limtNum && (l.num += 1), 
            this.data.showList[a].pro_list[o] = l;
            var u = setTimeout(function() {
                e.getGoodlength(), e.changeProductNum({
                    pkey: i,
                    num: l.num,
                    source: s,
                    actId: r,
                    flag: e.data.showList[a].show_bar
                }, function() {
                    l.num = e.data.proNum, e.data.showList[a].pro_list[o] = l, e.setData({
                        showList: e.data.showList
                    }), e.getGoodlength(), e.getComputedMoney(l);
                });
            }, 500);
            this.setData({
                showList: this.data.showList,
                timer: u
            }), this.getComputedMoney(l);
        } else wx.showToast({
            title: "已达到最大购买量",
            icon: "none",
            duration: 1500
        }); else wx.showToast({
            title: "商品已经不能再减了",
            icon: "none",
            duration: 1500
        });
    },
    changeShowListTitle: function(t, e) {
        if (t && t.length) {
            var a = this, o = "";
            t.forEach(function(t) {
                t.act_id === e && (o = t.tips);
            }), a.data.showList.forEach(function(t) {
                t.act_id === e && (t.tips = o);
            }), a.setData({
                showList: a.data.showList
            });
        }
    },
    changeProductNum: function(t, a) {
        var o = {
            pkey: t.pkey,
            num: t.num,
            source: t.source,
            extra: t.actId
        }, s = this;
        e.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopCart&a=edit",
            method: "POST",
            data: o,
            hideLoading: !0,
            success: function(o) {
                o.success ? (t.flag && s.loadCartInfo(!0, function(e) {
                    s.changeShowListTitle(e.valid, t.actId), s.getGoodlength();
                }), s.data.timer && s.setData({
                    timer: null
                })) : (e.showModal({
                    title: "提示",
                    content: o.msg
                }), a && a());
            },
            fail: function(t) {
                e.showModal({
                    title: "提示",
                    content: t
                });
            }
        });
    },
    goSquare: function() {
        var t = this, a = [], o = this.getSelectProduct();
        if (o.forEach(function(t) {
            a.push(t.pkey);
        }), !o.length) return e.showModal({
            title: "提示",
            content: "请至少选择一个产品再进行结算"
        }), !1;
        t.setData({
            buttonClicked: !0
        }), setTimeout(function() {
            t.setData({
                buttonClicked: !1
            });
        }, 500), wx.navigateTo({
            url: "square?pkeys=" + a.join(",")
        });
    },
    onPkeyClick: function(t) {
        var e = this, a = (t.currentTarget.dataset.pkey, t.currentTarget.dataset.index), o = t.currentTarget.dataset.idx, s = t.currentTarget.dataset.check;
        e.data.showList[a].pro_list[o].selectFlag = !s, e.setData({
            showList: e.data.showList
        }), e.judgeCheckedNum(), e.reCalMoney();
    },
    judgeCheckedNum: function() {
        var t = 0;
        this.data.showList.forEach(function(e) {
            e.pro_list.forEach(function(e) {
                e.selectFlag && t++;
            });
        }), this.setData({
            allChecked: t === this.data.checkedNum,
            lengthNum: t
        });
    },
    allCheckedBtn: function(t) {
        var e = this;
        e.data.allChecked = !e.data.allChecked, this.data.showList.forEach(function(t) {
            t.pro_list.forEach(function(t) {
                t.selectFlag = e.data.allChecked;
            });
        }), e.setData({
            showList: this.data.showList,
            lengthNum: e.data.allChecked ? e.data.checkedNum : 0,
            allChecked: e.data.allChecked
        }), e.reCalMoney();
    },
    touchStart: function(t) {
        if (1 == t.touches.length) {
            var e = t.currentTarget.dataset.index, a = t.currentTarget.dataset.idx;
            this.data.showList[e].pro_list[a].delBoxFlag = !0, this.setData({
                startX: t.touches[0].clientX,
                startY: t.touches[0].clientY,
                clickFlag: !0,
                showList: this.data.showList
            });
        }
    },
    touchMove: function(t) {
        var e = this;
        if (1 == t.touches.length) {
            var a = t.touches[0].clientX, o = t.touches[0].clientY, s = e.data, i = s.startX - a, n = s.startY - o, r = t.currentTarget.dataset.index, l = t.currentTarget.dataset.idx;
            if (n < 0 && Math.abs(n) > 280) return void wx.startPullDownRefresh({
                success: function() {
                    e.getPullDownDataRefresh();
                }
            });
            var u = "", c = s.showList[r].pro_list[l].leftNum;
            if (Math.abs(n) > 40) return;
            if (72 === c && i > 0) return;
            if (!c && i < 0) return;
            if (Math.abs(n) > Math.abs(i)) return;
            if (this.setData({
                scrollYFlag: !1
            }), i > 0) u = "left:-" + i + "px", i >= 72 && (u = "left:-72px", i = 72); else if (i < 0) if (c <= 72 && c > 0) {
                var h = c + i;
                u = "left:-" + h + "px", i = h, h <= 0 && (u = "left:0px", i = 0);
            } else i = 0;
            s.showList[r].pro_list[l].txtStyle = u, s.showList[r].pro_list[l].leftNum = i, this.setData({
                showList: s.showList,
                clickFlag: !1
            });
        }
    },
    touchEnd: function(t) {
        var e = this, a = t.currentTarget.dataset.index, o = t.currentTarget.dataset.idx, s = e.data.showList;
        if (this.data.clickFlag) return s[a].pro_list[o].leftNum && "0" != s[a].pro_list[o].leftNum || (s.delBoxFlag = !1), 
        void this.setData({
            clickFlag: !1,
            showList: s,
            scrollYFlag: !0
        });
        if (1 == t.changedTouches.length) {
            var i = t.changedTouches[0].clientX, n = t.changedTouches[0].clientY, r = e.data.startX - i, l = e.data.startY - n;
            if (Math.abs(l) > Math.abs(r)) return;
            var u = r >= 36 ? "left:-72px" : "left:0px";
            r < 36 && (s[a].pro_list[o].delBoxFlag = !1), s[a].pro_list[o].txtStyle = u, e.setData({
                showList: s,
                scrollYFlag: !0
            });
        }
    },
    getSelectProduct: function() {
        var t = [];
        return this.data.showList.forEach(function(e) {
            e.pro_list.forEach(function(e) {
                e.selectFlag && t.push(e);
            });
        }), t;
    },
    AddCollection: function() {
        var t = this, a = [], o = this.getSelectProduct();
        o.length ? (o.forEach(function(t) {
            a.push(t.product_id);
        }), e.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=saveCollPro&collProID=" + a,
            method: "GET",
            success: function(e) {
                t.isloading = !1, e.success && wx.showToast({
                    title: "已收藏",
                    icon: "success",
                    duration: 3e3
                });
            },
            fail: function(e) {
                t.isloading = !1;
            },
            hideLoading: !0
        })) : wx.showToast({
            icon: "none",
            title: "请选择商品"
        });
    },
    reCalMoney: function() {
        var t = this, e = 0;
        this.getSelectProduct().forEach(function(t) {
            var a = Number(t.price);
            e = e.add(a.mul(t.num));
        }), t.setData({
            ordermoney: Math.abs(e).toFixed(2)
        });
    },
    clearInvaildGoods: function() {
        var t = [];
        this.data.invaildGoods.forEach(function(e) {
            t.push({
                pkey: e.pkey,
                source: e.source
            });
        });
        var e = this;
        t.length > 0 && wx.showModal({
            title: "提示",
            content: "确定清空失效商品吗？",
            success: function(a) {
                a.confirm ? e.doDeleteItem(t, {
                    success: function() {
                        e.setData({
                            invaildGoods: []
                        });
                    }
                }) : a.cancel && console.log("用户点击取消");
            }
        });
    },
    goMycoupon: function() {
        wx.navigateTo({
            url: "/pages/company/mycoupon"
        });
    },
    delAll: function() {
        var t = this, e = [], a = this.getSelectProduct();
        a.length ? (a.forEach(function(t) {
            e.push({
                pkey: t.pkey,
                source: t.source
            });
        }), wx.showModal({
            title: "提示",
            content: "确定删除所选产品吗？",
            success: function(a) {
                a.confirm ? e.length > 0 && t.doDeleteItem(e) : a.cancel && console.log("用户点击取消");
            }
        })) : wx.showToast({
            icon: "none",
            title: "请选择商品"
        });
    },
    addTestData: function() {
        a.addToCart(), setTimeout(this.loadCartInfo, 3e3);
    }
});