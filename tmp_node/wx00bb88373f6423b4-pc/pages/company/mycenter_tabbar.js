var e = getApp(), t = require("../../components/picker_datetime.js"), a = require("../../pages/shop/AddrManage.js"), n = require("../../components/city-picker.js"), i = require("../shop/ShopUtil.js"), o = require("../../common.js");

Page({
    isloading: !1,
    pageurl: "",
    onLoad: function(i) {
        1 == i.fromTempMsg && o.checkToReLaunchTabBarPage();
        var s = this;
        e.registerGlobalFunctions(s), o.initCommonModules(), this.setData({
            optionsObj: i
        }), this.pageurl = e.getPageUrl(this, i), this.datetimePicker = new t.pickerDatetime({
            page: this,
            animation: "slide",
            duration: 200
        }), this.cityPicker = new n(), this.addrManage = new a({
            page: this,
            onSelected: this.onAddrManageClick
        }), this.isLogin();
    },
    onShow: function() {
        this.loadData(), this.getUserInfo();
    },
    onPageScroll: function() {},
    data: {
        optionsObj: {},
        plugNavFlag: !0,
        showUserReg: !1,
        phoneNumber: "",
        hasReceived: !1,
        received: !1,
        userType: 0,
        count: 0,
        total: 0,
        buttonClicked: !1,
        enableFenXiao: !1,
        levelName: ""
    },
    loadData: function() {
        var t = this;
        t.isloading || (t.isloading = !0, e.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=getMyCenterData",
            method: "GET",
            success: function(a) {
                t.isloading = !1, a.success ? t.setData({
                    mycenterdata: a.info,
                    Count: a.orderdata,
                    Name: a.info.nickName,
                    HeadImg: a.info.HeadImgUrl
                }) : (console.log("getMyCenterData fail：" + a.msg), 1 == a.needLogin ? e.login({
                    forcereg: function() {
                        i.showRegUI({
                            onRegOrBindSuccess: function() {
                                page.setData({
                                    showUserReg: !1
                                }), t.loadData();
                            },
                            onClose: function() {
                                wx.reLaunch({
                                    url: "../shop/index"
                                });
                            }
                        });
                    }
                }) : e.showModal({
                    title: "提示",
                    content: "操作失败：" + a.msg
                }));
            },
            fail: function(e) {
                t.isloading = !1, console.log("getMyCenterData fail");
            },
            hideLoading: !0
        }));
    },
    showAddrManage: function() {
        this.setData({
            showAddrManage: !0
        }), this.addrManage.loadUserAddrList();
    },
    hideAddrManage: function() {
        this.setData({
            showAddrManage: !1
        });
    },
    navBtnShowAndHide: function() {
        var e = !this.data.plugNavFlag;
        this.setData({
            plugNavFlag: e
        });
    },
    phoneConfirm: function(e) {
        var t = this, a = "";
        t.setData({
            phoneNumber: e.detail.value
        }), a = e.detail.value, /^1\d{10}$/.test(a) ? t.setData({
            tips: ""
        }) : t.setData({
            tips: "请输入正确的手机号码!"
        });
    },
    isLogin: function() {
        setTimeout(function() {
            e.globalData.WebUserID || i.showRegUI();
        }, 2e3);
    },
    getUserInfo: function() {
        var t = this, a = {
            url: "/index.php?c=Front/WxApp/BaseApi&a=getUserInfo",
            success: function(e) {
                if (e.success) {
                    var a = parseInt(e.info.UserType);
                    t.setData({
                        userType: a,
                        levelName: e.info.UserLevel
                    }), t.getUserFenXiaoInfo();
                }
            }
        };
        e.sendRequest(a);
    },
    getUserFenXiaoInfo: function() {
        var t = this, a = {
            url: "/index.php?c=Front/WxApp/ShopApi&a=getUserFenXiaoInfo",
            success: function(a) {
                if (!a.success) return a.enableFenXiao ? void e.showModal({
                    title: "提示",
                    content: a.msg
                }) : void t.setData({
                    enableFenXiao: a.enableFenXiao
                });
                t.setData({
                    count: parseInt(a.info.count),
                    total: a.info.notAuditedTotal,
                    enableFenXiao: a.enableFenXiao
                });
            }
        };
        e.sendRequest(a);
    },
    goDistribution: function() {
        var e = this;
        e.setData({
            buttonClicked: !0
        }), setTimeout(function() {
            e.setData({
                buttonClicked: !1
            });
        }, 500);
        var t = e.data.userType;
        1 === t ? wx.navigateTo({
            url: "/pages/shop/distribution"
        }) : 0 === t && wx.navigateTo({
            url: "/pages/shop/beDistribution"
        });
    },
    buttonClicked: function() {
        var e = this;
        e.setData({
            buttonClicked: !0
        }), setTimeout(function() {
            e.setData({
                buttonClicked: !1
            });
        }, 500);
    }
});