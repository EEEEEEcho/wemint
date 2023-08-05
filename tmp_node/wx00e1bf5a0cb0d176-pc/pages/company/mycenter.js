var e = getApp(), a = require("../../components/picker_datetime.js"), t = require("../shop/ShopUtil.js"), i = require("../../common.js"), o = require("../../components/wxb.js");

Page({
    isloading: !1,
    pageurl: "",
    onLoad: function(t) {
        "WXSHOPAPPPLUS" == e.globalData.baseInfo.WxAppVersion && this.setData({
            serviceFlag: !0
        });
        var o = this;
        "WXSHOPAPPPLUS" == e.globalData.baseInfo.WxAppVersion && this.setData({
            serviceFlag: !0
        }), e.registerGlobalFunctions(o), 1 == t.fromTempMsg && i.checkToReLaunchTabBarPage(), 
        i.initCommonModules(), o.pageurl = e.getPageUrl(o, t), o.setData({
            optionsObj: t,
            language: e.globalData.language,
            enableWxShare: "1" === e.globalData.baseInfo.EnableWxShare,
            authorization: 1
        }), o.datetimePicker = new a.pickerDatetime({
            page: o,
            animation: "slide",
            duration: 200
        }), o.data.serviceFlag && o.data.enableWxShare ? o.setData({
            showLastBox: !1
        }) : (o.data.serviceFlag && !o.data.enableWxShare || !o.data.serviceFlag && o.data.enableWxShare) && o.setData({
            showLastBox: !0
        });
    },
    onPullDownRefresh: function() {
        var e = this;
        e.data.pullDownRefreshFlag && (e.setData({
            pullDownRefreshFlag: !1
        }), e.data.pullDownRefreshFlag = !1, e.data.optionsObj && (e.data.optionsObj.refresh = !0), 
        setTimeout(function() {
            e.initData(e.data.optionsObj), e.setData({
                pullDownRefreshFlag: !0
            }), wx.stopPullDownRefresh();
        }, 1500));
    },
    onShow: function() {
        e.doAfterUserInfoAuth({
            success: this.initData,
            fail: this.initData
        }), (this.data.backselectFlag || wx.getStorageSync("editCardSuccessOnMycenter")) && this.loadData(), 
        wx.removeStorageSync("editCardSuccessOnMycenter");
    },
    initData: function(a) {
        var t = this;
        t.setData({
            userID: e.globalData.WebUserID || 0,
            optionsObj: a
        });
        var i = wx.getStorageSync("hasMobile") || 0;
        e.globalData.getMobileNode && (0 !== i ? t.setData({
            failure: !0
        }) : t.setData({
            failure: !1
        }));
        var o = e.globalData.getMobileNode ? e.globalData.getMobileNode.enterMemberCenter : 0, n = getCurrentPages(), s = n[n.length - 1];
        0 === e.globalData.hasMobile && 0 === i && 0 !== o && 1 === t.data.authorization && 0 !== t.data.userID && 1 !== t.data.phonestatus && (2 === o ? wx.redirectTo({
            url: "/pages/phoneauthorization/index?getMobileNode=" + o + "&pageroute=" + s.route
        }) : t.setData({
            phonelicense: !0,
            authorizationStatus: 1
        })), t.setData({
            authorization: 1
        }), t.loadData(), t.getUserInfo();
    },
    onPageScroll: function() {},
    data: {
        pullDownRefreshFlag: !0,
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
        levelName: "",
        cityWideData: {},
        authorization: 1,
        cityWideDataFlag: !1,
        infoUserID: "",
        reminder: "授权提示",
        matter: "授权失败，请重新授权",
        abrogate: "暂时先不",
        permission: "允许",
        baseUrl: e.globalData.siteBaseUrl,
        failure: !0
    },
    loadData: function() {
        var a = this;
        a.isloading || (a.isloading = !0, e.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=getMyCenterData",
            method: "GET",
            success: function(i) {
                if (a.isloading = !1, i.success) {
                    var o = i.CityDistributionData, n = o && (o.Finish > 0 || o.In_Delivery > 0 || o.No_Pay > 0 || o.Wait_Accrpt > 0);
                    i.businessCrdInfo.UserName && i.businessCrdInfo.Position && i.businessCrdInfo.UserName.length + i.businessCrdInfo.Position.length >= 12 && a.setData({
                        wrap: !0
                    }), a.setData({
                        backselectFlag: !1,
                        allInfo: i,
                        mycenterdata: i.info,
                        phonestatus: 0,
                        Count: i.orderdata,
                        Name: i.info.NickName,
                        HeadImg: i.info.HeadImgUrl,
                        cityWideDataFlag: i.CityDistributionInfo && i.CityDistributionInfo.ShowCityDistributionOrderBar || n,
                        cityWideData: i.CityDistributionData
                    });
                } else console.log("getMyCenterData fail：" + i.msg), 1 == i.needLogin ? e.login({
                    success: function() {
                        a.setData({
                            showUserReg: !1
                        }), a.loadData();
                    },
                    forcereg: function() {
                        t.showRegUI({
                            onRegOrBindSuccess: function() {
                                a.setData({
                                    showUserReg: !1
                                }), a.loadData();
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
                    content: i.msg
                });
            },
            fail: function(e) {
                a.isloading = !1, console.log("getMyCenterData fail");
            },
            hideLoading: !0
        }));
    },
    getPhoneNumber: function(a) {
        var t = this;
        a.currentTarget.dataset.failure && t.setData({
            authorizationStatus: 3
        });
        var i = e.globalData.getMobileNode ? e.globalData.getMobileNode.enterDistributionCenter : 0;
        e.globalData.getMobileNode && e.globalData.getMobileNode.enterMemberCenter;
        if (a.detail.errMsg.indexOf("getPhoneNumber:ok") > -1) {
            var n = e.globalData.appId, s = e.globalData.session_key, r = new o(n, s).decryptData(a.detail.encryptedData, a.detail.iv);
            if (e.loadphoneInfo(r.phoneNumber), 2 === t.data.authorizationStatus) {
                var l = t.data.userType;
                1 === l ? wx.navigateTo({
                    url: "/pages/distributioncenter/withdraw/index"
                }) : 0 === l && wx.navigateTo({
                    url: "/pages/distributioncenter/withdraw/index"
                });
            }
            t.setData({
                failure: !0
            });
        } else t.setData({
            authorization: 2
        }), 2 === i && 2 === t.data.authorizationStatus ? t.setData({
            allowspopup: !0
        }) : 2 === t.data.authorizationStatus && (1 === (l = t.data.userType) ? wx.navigateTo({
            url: "/pages/distributioncenter/withdraw/index"
        }) : 0 === l && wx.navigateTo({
            url: "/pages/distributioncenter/withdraw/index"
        }));
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
    navBtnShowAndHide: function() {
        var e = !this.data.plugNavFlag;
        this.setData({
            plugNavFlag: e
        });
    },
    phoneConfirm: function(e) {
        var a = this, t = "";
        a.setData({
            phoneNumber: e.detail.value
        }), t = e.detail.value, /^1\d{10}$/.test(t) ? a.setData({
            tips: ""
        }) : a.setData({
            tips: "请输入正确的手机号码!"
        });
    },
    isLogin: function() {
        setTimeout(function() {
            e.globalData.WebUserID || t.showRegUI();
        }, 2e3);
    },
    getUserInfo: function() {
        var a = this, t = {
            url: "/index.php?c=Front/WxApp/BaseApi&a=getUserInfo",
            success: function(e) {
                if (e.success) {
                    var t = parseInt(e.info.UserType);
                    a.setData({
                        userType: t,
                        levelName: e.info.UserLevel,
                        infoUserID: e.info.UserID
                    }), a.getUserFenXiaoInfo();
                }
            }
        };
        e.sendRequest(t);
    },
    getUserFenXiaoInfo: function() {
        var a = this, t = {
            url: "/index.php?c=Front/WxApp/ShopApi&a=getUserFenXiaoInfo",
            success: function(t) {
                if (!t.success) return t.enableFenXiao ? void e.showModal({
                    title: "提示",
                    content: t.msg
                }) : void a.setData({
                    enableFenXiao: t.enableFenXiao
                });
                a.setData({
                    count: parseInt(t.info.count),
                    total: t.info.notAuditedTotal,
                    enableFenXiao: t.enableFenXiao
                });
            }
        };
        e.sendRequest(t);
    },
    goDistribution: function() {
        var a = this, t = wx.getStorageSync("hasMobile") || 0, i = e.globalData.getMobileNode ? e.globalData.getMobileNode.enterDistributionCenter : 0;
        if (0 === e.globalData.hasMobile && 0 === t && 0 !== i) a.setData({
            phonelicense: !0,
            authorizationStatus: 2
        }); else {
            var o = a.data.userType;
            1 === o ? wx.navigateTo({
                url: "/pages/distributioncenter/withdraw/index"
            }) : 0 === o && wx.navigateTo({
                url: "/pages/distributioncenter/withdraw/index"
            });
        }
        a.setData({
            buttonClicked: !0
        }), setTimeout(function() {
            a.setData({
                buttonClicked: !1
            });
        }, 500);
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
    },
    toEditPage: function() {
        var a = this;
        if (!a.data.buttonClicked) {
            this.buttonClicked();
            var t = e.globalData.businessCardInfo.businessCardID ? e.globalData.businessCardInfo.businessCardID : a.data.allInfo.businessCrdInfo.ID;
            wx.navigateTo({
                url: "/pages/businesscard/editcard/index?ID=" + t + "&checkComplete=" + (e.globalData.businessCardInfo.checkComplete ? "1" : "0")
            });
        }
    },
    toCardDetail: function() {
        var a = this;
        a.data.buttonClicked || (this.buttonClicked(), wx.navigateTo({
            url: "/pages/businesscard/workbench/index?BusinessCardID=" + a.data.allInfo.businessCrdInfo.BusinessCardID + "&SiteID=" + e.globalData.baseInfo.SiteID
        }));
    }
});