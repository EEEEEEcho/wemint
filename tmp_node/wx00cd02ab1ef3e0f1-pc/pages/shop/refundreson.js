var e = getApp();

require("../../components/utils/imgutil.js");

Page({
    isloading: !1,
    bannerLoaded: !1,
    url: !1,
    onShareAppMessage: function() {
        return e.shareAppMessage({
            url: this.url,
            title: this.data.productInfo.Name
        });
    },
    onLoad: function(a) {
        var o = this;
        o.url = e.getPageUrl(o, a), e.registerGlobalFunctions(o), this.setData({
            queryparams: a
        }), a.showView, this.loadrefundsreson();
    },
    changeRadioData: function(e) {
        this.setData({
            radioFlag: "1" === e.currentTarget.dataset.index
        });
    },
    getRadioData: function(e) {
        this.setData({
            radioFlag: "0" == e.detail.value
        }), console.log("checkbox发生change事件，携带value值为：", e.detail.value);
    },
    data: {
        radioFlag: !0,
        currentTab: 0,
        buttonClicked: !1,
        baseUrl: e.globalData.cdnBaseUrl,
        flag: !0,
        showView: !1,
        upload_picture_list: []
    },
    uploadpic: function(e) {
        var a = this, o = a.data.upload_picture_list;
        wx.chooseImage({
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var s = t.tempFilePaths;
                console.log(e), console.log(s);
                for (var i = 0; i < s.length; i++) {
                    if (o >= 9) return a.setData({
                        upload_picture_list: o
                    }), !1;
                    o.push(s[i]);
                }
                console.log(o), a.setData({
                    upload_picture_list: o
                });
            }
        });
    },
    closepic: function(e) {
        var a = this, o = a.data.upload_picture_list;
        console.log(e), console.log(o);
        for (var t = 0; t < o.length; t++) e.target.dataset.item == o[t] && o.splice(t, 1);
        a.setData({
            upload_picture_list: o
        });
    },
    loadrefundsreson: function() {
        var a = this;
        if (!a.isloading) {
            a.isloading = !0;
            var o = 0, t = 0;
            a.data.queryparams.orderid && (o = a.data.queryparams.orderid), a.data.queryparams.pkey && (t = a.data.queryparams.pkey), 
            e.sendRequest({
                url: "/index.php?c=Front/WxApp/ShopApi&a=refundreason&orderid=" + o + "&pkey=" + t,
                method: "GET",
                success: function(o) {
                    a.isloading = !1, o.success ? a.setData({
                        refundsinfo: o.data,
                        siteID: e.globalData.baseInfo.SiteID
                    }) : console.log("getProductInfo fail：" + o.msg);
                },
                fail: function(e) {
                    a.isloading = !1, console.log("getProductInfo fail");
                }
            });
        }
    },
    fromsubmit: function(a) {
        var o = this;
        o.data.queryparams.orderid && o.data.queryparams.orderid;
        var t = a.detail.value.refundsOrderID, s = a.detail.value.refundsPKey, i = a.detail.value.refundsReason, l = a.detail.value.DeliveryGood, n = a.detail.value.refundsEdit, r = "", d = a.detail.formId;
        return console.log(d), 0 == i.length ? (wx.showModal({
            title: "提示",
            content: "退货/款原因不得为空!",
            showCancel: !1
        }), !1) : 0 == o.data.showView && (o.setData({
            showView: !0
        }), void (o.data.upload_picture_list.length <= 0 ? e.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=Apply&refundsOrderID=" + t + "&refundsPKey=" + s + "&refundsReason=" + i + "&DeliveryGood=" + l + "&edit=" + n + "&formid=" + d,
            method: "GET",
            success: function(e) {
                console.log(e), o.isloading = !1, e.success ? wx.navigateBack() : console.log("getProductInfo fail：" + e.msg);
            },
            fail: function(e) {
                o.isloading = !1, console.log("getProductInfo fail");
            }
        }) : (r = o.data.upload_picture_list[0], e.uploadRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=Apply",
            filePath: r,
            name: "refundsimg",
            formData: {
                refundsOrderID: t,
                refundsPKey: s,
                refundsReason: i,
                DeliveryGood: l,
                edit: n,
                formid: d
            },
            success: function(a) {
                o.setData({
                    refundsinfo: a.data,
                    siteID: e.globalData.baseInfo.SiteID,
                    showView: !o.data.showView
                });
            },
            fail: function(e) {
                console.log(e.refunds);
            },
            complete: function(e) {
                if (console.log(e), o.data.upload_picture_list.length <= 1) o.setData({
                    showView: !o.data.showView
                }), wx.navigateBack(); else {
                    var a = JSON.parse(e);
                    o.gosavepic(a.refunds, 1);
                }
            }
        }))));
    },
    gosavepic: function(a, o) {
        var t = this;
        console.log(o), console.log(t.data.upload_picture_list[o]), e.uploadRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=gosavepic",
            filePath: t.data.upload_picture_list[o],
            name: "refundsimg",
            formData: {
                refunds: a
            },
            success: function(e) {
                console.log(e);
            },
            fail: function(e) {
                console.log(e);
            },
            complete: function(e) {
                if (o == t.data.upload_picture_list.length - 1) console.log(4444), wx.navigateBack(); else {
                    console.log(e), t.setData({
                        showView: !t.data.showView
                    }), o++;
                    var a = JSON.parse(e);
                    t.gosavepic(a.refunds, o);
                }
            }
        });
    },
    navbarTap: function(e) {
        this.setData({
            currentTab: e.currentTarget.dataset.idx
        });
    }
});