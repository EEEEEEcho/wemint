function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../../store")), i = t(require("../../../utils/create")), e = require("../../../api/apiInstance.js"), n = getApp();

(0, i.default)(a.default, {
    properties: {},
    data: {
        navH: n.globalData.navH,
        status: n.globalData.status,
        cartPage: "尚免·图纸",
        styleList: [],
        firstActive: 0,
        secondActive: 0,
        isShowLoad: !1,
        activityUuid: "",
        packageUuid: ""
    },
    chooseFirst: function(t) {
        var a = t.currentTarget.dataset.index;
        this.setData({
            firstActive: a,
            secondActive: 0,
            packageUuid: this.data.styleList[a].packages[0].packageUuid
        });
    },
    chooseSecond: function(t) {
        this.setData({
            secondActive: t.currentTarget.dataset.index,
            packageUuid: t.currentTarget.dataset.packageuuid
        });
    },
    toPage: function(t) {
        var a = "";
        a = "servicesPlan" == t.currentTarget.dataset.type ? this.store.data.isLogin ? "/pages/drawing/servicesPlan/servicesPlan?activityUuid=" + this.data.activityUuid : "/pages/login/loginFast/loginFast" : "/pages/drawing/overlying/overlying?activityUuid=" + this.data.activityUuid + "&packageUuid=" + this.data.packageUuid, 
        wx.navigateTo({
            url: a
        });
    },
    onLoad: function(t) {
        this.setData({
            isShowLoad: !0,
            activityUuid: t.activityUuid
        });
        var a = t.apartmentUuid, i = t.activityUuid;
        this.getMarketingBuildingApartmentInfo(i, a);
    },
    previewImages: function(t) {
        var a = t.currentTarget.dataset.viewindex;
        wx.previewImage({
            urls: this.data.drawContent[a].images,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    toView: function(t) {
        t.currentTarget.dataset.url;
    },
    getMarketingBuildingApartmentInfo: function(t, a) {
        var i = this, n = {
            activityUuid: t,
            apartmentUuid: a
        };
        (0, e.getMarketingBuildingApartmentInfo)(n, function(t) {
            if (1 == t.errcode) {
                i.setData({
                    styleList: t.data,
                    packageUuid: t.data[0].packages[0].packageUuid
                });
                var a = {
                    drawingUuid: t.data[0].packages[0].drawingUuid
                };
                (0, e.getDrawingContentQuery)(a, function(t) {
                    1 == t.errcode && i.setData({
                        drawContent: t.data,
                        isShowLoad: !1
                    });
                });
            }
        });
    }
});