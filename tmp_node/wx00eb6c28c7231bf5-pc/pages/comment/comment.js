var e = getApp(), a = require("../../utils/config.js");

Page({
    data: {
        OrderId: "",
        ProductList: [],
        UserCredentials: [ "../../images/return-img_12.jpg" ],
        UploadCredentials: [],
        ScoreGrade: [],
        Remark: [],
        TxtareaName: [],
        TotalImg: 0,
        UploadNum: 0
    },
    onLoad: function(t) {
        var r = this, s = t.id;
        e.getOpenId(function(t) {
            var n = {
                openId: t,
                orderId: s
            };
            a.httpGet(e.getUrl(e.globalData.loadOrderProduct), n, r.getProductData);
        }), r.setData({
            OrderId: s
        });
    },
    getProductData: function(e) {
        var a = this;
        if ("NOUser" == e.Message) wx.redirectTo({
            url: "../login/login"
        }); else if ("OK" == e.Status) {
            var t = [], r = [], s = [];
            e.Data.forEach(function(e, a, n) {
                var o = {
                    skuId: e.SkuId,
                    skucontent: e.SkuContent,
                    grade: parseInt(5),
                    remark: ""
                }, d = {
                    img1: "../../images/return-img_03.jpg",
                    img2: "../../images/return-img_03.jpg",
                    img3: "../../images/return-img_03.jpg",
                    ImgSize: 0,
                    skuId: e.SkuId
                };
                t.push(o), r.push(d), s.push("txt_" + e.SkuId);
            }), a.setData({
                ProductList: e.Data,
                ScoreGrade: t,
                UserCredentials: r,
                TxtareaName: s
            });
        } else wx.showModal({
            title: "提示",
            content: result.data.Message,
            showCancel: !1,
            success: function(e) {
                e.confirm && wx.navigateBack({
                    delta: 1
                });
            }
        });
    },
    ScoreGrade: function(e) {
        var a = e.currentTarget.dataset.grade, t = e.currentTarget.dataset.index, r = this.data.ScoreGrade;
        r[t].grade = parseInt(a), this.setData({
            ScoreGrade: r
        });
    },
    ChooseImg: function(e) {
        var a = this, t = a.data.UserCredentials, r = e.currentTarget.dataset.index, s = e.currentTarget.dataset.coloum;
        wx.chooseImage({
            success: function(e) {
                var n = e.tempFilePaths[0];
                1 == s ? t[r].img1 = n : 2 == s ? t[r].img2 = n : t[r].img3 = n;
                var o = parseInt(t[r].ImgSize);
                o = o >= 2 ? 2 : parseInt(o + 1), t[r].ImgSize = o, a.setData({
                    UserCredentials: t
                });
            }
        });
    },
    formSubmit: function(e) {
        var a = this, t = (e.detail.formId, a.data.ScoreGrade), r = a.data.TxtareaName;
        if (r.length <= 0) return wx.showModal({
            title: "提示",
            content: "文本框不存在",
            showCancel: !1
        }), !1;
        var s = !1;
        if (r.forEach(function(r, n, o) {
            a.ToTrim(e.detail.value[r]).length <= 0 ? s = !0 : t[n].remark = a.ToTrim(e.detail.value[r]);
        }), s) return wx.showModal({
            title: "提示",
            content: "请输入评价内容",
            showCancel: !1
        }), !1;
        a.setData({
            UploadCredentials: [],
            ScoreGrade: t
        });
        var n = [], o = 0;
        a.data.UserCredentials.forEach(function(e, a, t) {
            var r = [];
            "../../images/return-img_03.jpg" != e.img1 && r.push(e.img1), "../../images/return-img_03.jpg" != e.img2 && r.push(e.img2), 
            "../../images/return-img_03.jpg" != e.img3 && r.push(e.img3);
            var s = {
                skuId: e.skuId,
                imgarry: r
            };
            r.length > 0 && (o = parseInt(r.length) + parseInt(o)), n.push(s);
        }), a.setData({
            TotalImg: o,
            UploadNum: 0,
            UploadGredentials: {}
        });
        for (var d = 0; d < n.length; d++) a.UploadImages(a, n[d].imgarry, n[d].skuId);
    },
    UploadImages: function(a, t, r) {
        var s = t.shift();
        void 0 != s && e.getOpenId(function(n) {
            wx.uploadFile({
                url: e.getUrl("UploadAppletImage"),
                filePath: s,
                name: "file",
                formData: {
                    openId: n
                },
                success: function(e) {
                    var t = JSON.parse(e.data);
                    if ("OK" == t.Status) {
                        var s = a.data.UploadGredentials, n = s[r];
                        (void 0 == n || "" == n || n.length <= 0) && (n = []), n.push(t.Data[0].ImageUrl), 
                        s[r] = n;
                        var o = parseInt(a.data.UploadNum) + 1;
                        a.setData({
                            UploadGredentials: s,
                            UploadNum: o
                        });
                    } else "NOUser" == t.Message ? wx.redirectTo({
                        url: "../login/login"
                    }) : wx.showModal({
                        title: "提示",
                        content: t.ErrorResponse.ErrorMsg,
                        showCancel: !1,
                        success: function(e) {
                            e.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                },
                complete: function() {
                    t.length > 0 ? a.UploadImages(a, t) : a.data.UploadNum == a.data.TotalImg && a.AddComments();
                }
            });
        });
    },
    ToTrim: function(e) {
        return e.replace(/(^\s*)|(\s*$)/g, "");
    },
    AddComments: function() {
        var a = this, t = a.data.ScoreGrade, r = [], s = a.data.UploadGredentials;
        t.forEach(function(e, t, n) {
            var o = {
                ProductId: a.data.ProductId,
                OrderId: a.data.OrderId,
                SkuId: e.skuId,
                ReviewText: e.remark,
                SkuContent: e.skucontent,
                Score: e.grade,
                ImageUrl1: ""
            }, d = e.skuId;
            void 0 != s[d] && (o.ImageUrl1 = s[d].join(",")), r.push(o);
        }), e.getOpenId(function(t) {
            wx.request({
                url: e.getUrl("AddProductReview"),
                data: {
                    openId: t,
                    DataJson: r,
                    formId: a.data.formId
                },
                success: function(e) {
                    "OK" == e.data.Status ? wx.showModal({
                        title: "提示",
                        content: e.data.Message,
                        showCancel: !1,
                        success: function(e) {
                            e.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    }) : "NOUser" == e.data.Message ? wx.redirectTo({
                        url: "../login/login"
                    }) : wx.showModal({
                        title: "提示",
                        content: e.data.Message,
                        showCancel: !1,
                        success: function(e) {
                            e.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                },
                complete: function() {}
            });
        });
    }
});