var e = getApp(), a = require("../../common.js");

Page({
    isloading: !1,
    url: !1,
    onShareAppMessage: function() {
        return e.shareAppMessage({
            url: this.url,
            title: "预约" + this.data.ProductInfo.Name
        });
    },
    onLoad: function(a) {
        var t = this;
        this.loadStartTime(), t.url = e.getPageUrl(t, a), e.registerGlobalFunctions(t), 
        this.setData({
            queryparams: a,
            enableReserve: e.globalData.baseInfo.EnableReserve
        });
    },
    onShow: function() {
        e.doAfterUserInfoAuth({
            success: this.initData,
            fail: this.initData
        });
    },
    initData: function() {
        a.initCommonModules(), this.loadService();
    },
    data: {
        plugNavFlag: !0
    },
    loadStartTime: function() {
        var e = this, a = new Date(), t = a.getMonth() + 1 < 10 ? "0" + (a.getMonth() + 1) : a.getMonth() + 1, s = a.getDate() < 10 ? "0" + a.getDate() : a.getDate(), i = a.getHours() < 10 ? "0" + a.getHours() : a.getHours(), r = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes();
        e.setData({
            startTime: a.getFullYear() + "-" + t + "-" + s,
            startH: i + ":" + r
        });
    },
    loadService: function() {
        var a = this;
        if (!a.isloading) {
            a.isloading = !0;
            var t = 0;
            a.data.queryparams.serviceid && (t = a.data.queryparams.serviceid), e.sendRequest({
                url: "/index.php?c=Front/WxApp/JsonApi&a=getServiceInfo&id=" + t,
                method: "GET",
                success: function(t) {
                    if (a.isloading = !1, t.success) {
                        wx.setNavigationBarTitle({
                            title: "预约" + t.info.Name
                        });
                        for (var s = t.info.BigImages.split(","), i = 0; i < s.length; i++) /\/product\//.test(s[i]) ? s[i] = e.globalData.siteBaseUrl + s[i] : s[i] = e.globalData.siteBaseUrl + "/comdata/" + t.info.SiteID + "/service/" + s[i];
                        var r = e.globalData.reserveFormData;
                        r.SubmitText = "立即预约", t.info.ProductImgs = s, a.setData({
                            ProductInfo: t.info,
                            reserveFormData: r
                        });
                    } else console.log("getServiceInfo fail：" + t.msg);
                },
                fail: function(e) {
                    a.isloading = !1, console.log("getServiceInfo fail");
                }
            });
        }
    },
    loadPersonList: function() {
        var a = this;
        e.sendRequest({
            url: "/index.php?c=Front/WxApp/ServiceApi&a=getPersonList&pagesize=9999",
            method: "GET",
            success: function(t) {
                if (t.success) {
                    var s = {};
                    s.ValueType = 1, s.Values = [], s.ID = "PersonID", s.Name = "发型师", s.FieldType = 3, 
                    s.IsRequire = 1;
                    for (var i = 0; i < t.personlist.length; i++) s.Values.push({
                        value: t.personlist[i].PersonID,
                        text: t.personlist[i].Name
                    });
                    var r = e.cloneObj(e.globalData.reserveFormData);
                    r.fields.unshift(s), a.setData({
                        reserveFormData: r
                    });
                } else console.log("getPersonList fail：" + t.msg);
            },
            fail: function(e) {
                console.log("getPersonList fail");
            }
        });
    },
    onChooseImg: function(a) {
        var t = this, s = a.currentTarget.dataset.col;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var i = a.tempFilePaths;
                e.uploadRequest({
                    url: "/index.php?c=Front/WxApp/ServiceApi&a=uploadImg",
                    filePath: i[0],
                    name: "makeAnAppointment",
                    success: function(e) {
                        var a = JSON.parse(e), r = {}, o = t.data.customformvalues;
                        o || (o = {}), o[s + "val"] = a.path, o[s + "valimg"] = i[0], r.customformvalues = o, 
                        t.setData(r);
                    },
                    fail: function(e) {},
                    complete: function(e) {
                        wx.hideLoading();
                    }
                }), t.setData({
                    tempFilePaths: a.tempFilePaths
                });
            }
        });
    },
    onCustomFormSubmit: function(a) {
        var t = this, s = t.data.enableReserve, i = t.data.ProductInfo;
        if (e.validateForm(null, a.detail.value)) {
            var r = a.detail.value;
            if (r.colServiceID = t.data.queryparams.serviceid, "0" == s || null == s) e.sendRequest({
                url: "/index.php?c=Front/WxApp/ServiceApi&a=saveReserve",
                method: "POST",
                data: a.detail.value,
                success: function(a) {
                    if (a.success) {
                        var s = wx.getStorageSync("businessCardInfo");
                        if (s && s.admin) {
                            var r = {
                                tbUserID: e.globalData.WebUserID,
                                tbType: "22",
                                tbTypeID: t.data.queryparams.serviceid,
                                tbTypeName: i.Name,
                                tbTypeImg: i.BigImages,
                                tbBusinessCardID: wx.getStorageSync("otherMemberCardId") ? wx.getStorageSync("otherMemberCardId") : 0
                            };
                            e.buried(r, function(e) {});
                        } else {
                            var o = {
                                tbUserID: e.globalData.WebUserID,
                                tbType: "22",
                                tbTypeID: t.data.queryparams.serviceid,
                                tbTypeName: i.Name,
                                tbTypeImg: i.BigImages,
                                tbBusinessCardID: wx.getStorageSync("businessCardId") ? wx.getStorageSync("businessCardId") : 0
                            };
                            e.buried(o, function(e) {});
                        }
                        e.showModal({
                            title: "提示",
                            content: "预约成功，请在 会员中心->我的预约 里查看预约详情",
                            confirmText: "查看详情",
                            confirm: function() {
                                wx.navigateTo({
                                    url: "myreserve"
                                });
                            }
                        });
                        var n = t.data.msgformdata;
                        t.setData({
                            msgformdata: n,
                            customformvalues: null,
                            resetvalues: null
                        });
                    } else e.showModal({
                        title: "提示",
                        content: "预约失败：" + a.msg
                    });
                    t.data.currentRequest = !1;
                },
                fail: function(a) {
                    e.showModal({
                        title: "提示",
                        content: "预约失败：" + a
                    }), t.data.currentRequest = !1;
                }
            }); else if ("1" == s) {
                var o = i.Name, n = i.BigImages;
                wx.navigateTo({
                    url: "reserve-by-paymentpage?data=" + JSON.stringify(r) + "&serviceName=" + o + "&serviceImg=" + n
                });
            }
        }
    },
    navBtnShowAndHide: function() {
        var e = !this.data.plugNavFlag;
        this.setData({
            plugNavFlag: e
        });
    }
});