var a = getApp();

require("../../components/utils/imgutil.js");

Page({
    isloading: !1,
    bannerLoaded: !1,
    url: !1,
    onShareAppMessage: function() {
        return a.shareAppMessage({
            url: this.url,
            title: this.data.productInfo.Name
        });
    },
    onLoad: function(e) {
        var t = this;
        t.url = a.getPageUrl(t, e), a.registerGlobalFunctions(t), this.setData({
            queryparams: e
        }), e.showView, this.loadrefundsreson();
    },
    changeRadioData: function(a) {
        this.setData({
            radioFlag: "1" === a.currentTarget.dataset.index
        });
    },
    getRadioData: function(a) {
        this.setData({
            radioFlag: "0" == a.detail.value
        }), console.log("checkbox发生change事件，携带value值为：", a.detail.value);
    },
    data: {
        radioFlag: !0,
        currentTab: 0,
        buttonClicked: !1,
        baseUrl: a.globalData.cdnBaseUrl,
        flag: !0,
        showView: !1,
        upload_picture_list: []
    },
    uploadpic: function(a) {
        var e = this, t = e.data.upload_picture_list;
        wx.chooseImage({
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                for (var i = a.tempFilePaths, s = 0; s < i.length; s++) {
                    if (t >= 9) return e.setData({
                        upload_picture_list: t
                    }), !1;
                    t.push(i[s]);
                }
                e.setData({
                    upload_picture_list: t
                });
            }
        });
    },
    closepic: function(a) {
        for (var e = this, t = e.data.upload_picture_list, i = 0; i < t.length; i++) a.target.dataset.item == t[i] && t.splice(i, 1);
        e.setData({
            upload_picture_list: t
        });
    },
    loadrefundsreson: function() {
        var e = this;
        if (!e.isloading) {
            e.isloading = !0;
            var t = 0, i = 0;
            e.data.queryparams.orderid && (t = e.data.queryparams.orderid), e.data.queryparams.pkey && (i = e.data.queryparams.pkey), 
            a.sendRequest({
                url: "/index.php?c=Front/WxApp/ShopApi&a=refundreason&orderid=" + t + "&pkey=" + i,
                method: "GET",
                success: function(t) {
                    e.isloading = !1, t.success ? e.setData({
                        refundsinfo: t.data,
                        siteID: a.globalData.baseInfo.SiteID
                    }) : console.log("getProductInfo fail：" + t.msg);
                },
                fail: function(a) {
                    e.isloading = !1, console.log("getProductInfo fail");
                }
            });
        }
    },
    fromsubmit: function(e) {
        var t = this;
        t.data.queryparams.orderid && t.data.queryparams.orderid;
        var i = e.detail.value.refundsOrderID, s = e.detail.value.refundsPKey, o = e.detail.value.refundsReason, r = e.detail.value.DeliveryGood, n = e.detail.value.refundsEdit, d = "", l = e.detail.formId;
        return 0 == o.length ? (wx.showModal({
            title: "提示",
            content: "退货/款原因不得为空!",
            showCancel: !1
        }), !1) : 0 == t.data.showView && (t.setData({
            showView: !0
        }), void (t.data.upload_picture_list.length <= 0 ? a.sendRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=Apply&refundsOrderID=" + i + "&refundsPKey=" + s + "&refundsReason=" + o + "&DeliveryGood=" + r + "&edit=" + n + "&formid=" + l,
            method: "GET",
            success: function(a) {
                console.log(a), t.isloading = !1, a.success ? wx.navigateBack() : console.log("getProductInfo fail：" + a.msg);
            },
            fail: function(a) {
                t.isloading = !1, console.log("getProductInfo fail");
            }
        }) : (d = t.data.upload_picture_list[0], a.uploadRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=Apply",
            filePath: d,
            name: "refundsimg",
            formData: {
                refundsOrderID: i,
                refundsPKey: s,
                refundsReason: o,
                DeliveryGood: r,
                edit: n,
                formid: l
            },
            success: function(e) {
                t.setData({
                    refundsinfo: e.data,
                    siteID: a.globalData.baseInfo.SiteID,
                    showView: !t.data.showView
                });
            },
            fail: function(a) {
                console.log(a.refunds);
            },
            complete: function(a) {
                if (t.data.upload_picture_list.length <= 1) t.setData({
                    showView: !t.data.showView
                }), wx.navigateBack(); else {
                    var e = JSON.parse(a);
                    t.gosavepic(e.refunds, 1);
                }
            }
        }))));
    },
    gosavepic: function(e, t) {
        var i = this;
        a.uploadRequest({
            url: "/index.php?c=Front/WxApp/ShopApi&a=gosavepic",
            filePath: i.data.upload_picture_list[t],
            name: "refundsimg",
            formData: {
                refunds: e
            },
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {
                if (t == i.data.upload_picture_list.length - 1) wx.navigateBack(); else {
                    i.setData({
                        showView: !i.data.showView
                    }), t++;
                    var e = JSON.parse(a);
                    i.gosavepic(e.refunds, t);
                }
            }
        });
    },
    navbarTap: function(a) {
        this.setData({
            currentTab: a.currentTarget.dataset.idx
        });
    }
});