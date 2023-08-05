function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var a = e(require("../../../store")), t = e(require("../../../utils/create")), i = require("../../../utils/qiniuImage"), s = require("../../../api/apiInstance.js"), n = getApp();

(0, t.default)(a.default, {
    properties: {},
    data: {
        isShowCauseModel: !1,
        navH: n.globalData.navH,
        status: n.globalData.status,
        cartPage: "退款",
        detailInfo: {},
        activeIndex: 0,
        amountReason: "",
        price: 0,
        caption: "",
        userInfo: {},
        uploadImage: [],
        imagesString: "",
        reasons: [ {
            title: "买错了/不想要",
            isChecked: !0
        }, {
            title: "未按约定事件发货",
            isChecked: !1
        }, {
            title: "其他",
            isChecked: !1
        } ]
    },
    onLoad: function(e) {
        this.initDetail(e.orderUuid);
    },
    initDetail: function(e) {
        var a = this, t = {
            accesstoken: this.store.data.userInfo.accesstoken,
            orderUuid: e
        };
        (0, s.getOrderDetail)(t, function(e) {
            1 === e.errcode && (a.setData({
                detailInfo: e.data
            }), a.setDataUi());
        });
    },
    setDataUi: function() {
        if (3 == this.data.detailInfo.order.status) {
            e = this.data.detailInfo.order.transactionFee / 100;
            this.setData({
                price: e,
                amountReason: "最多退" + e + "元,含发货邮费0.00元"
            });
        } else {
            var e = (this.data.detailInfo.order.transactionFee - this.data.detailInfo.order.deliverFee) / 100;
            this.setData({
                price: e,
                amountReason: "最多退" + e + "元,含发货邮费-" + this.data.detailInfo.order.deliverFee / 100 + "元"
            });
        }
    },
    chooseImage: function() {
        var e = this, a = 9 - this.data.uploadImage.length;
        wx.chooseImage({
            count: a,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                for (var t = a.tempFilePaths, i = 0; i < t.length; i++) e.data.uploadImage.push(t[i]);
                e.setData({
                    uploadImage: e.data.uploadImage
                });
            }
        });
    },
    deleteImage: function(e) {
        var a = e.currentTarget.dataset.index;
        this.data.uploadImage.splice(a, 1), this.setData({
            uploadImage: this.data.uploadImage
        });
    },
    showCauseModel: function() {
        this.setData({
            isShowCauseModel: !0
        });
    },
    closeCauseModel: function() {
        this.setData({
            isShowCauseModel: !1
        });
    },
    bindInput: function(e) {
        this.setData({
            caption: e.detail.value
        });
    },
    submitData: function() {
        0 == this.data.uploadImage.length ? this.onRefund() : (this.setData({
            imagesString: ""
        }), this.uploadImages(0));
    },
    onRefund: function() {
        var e = this, a = {
            accesstoken: this.store.data.userInfo.accesstoken,
            orderUuid: this.data.detailInfo.order.orderSubUuid,
            reasonType: this.data.activeIndex + 1
        };
        3 == this.data.detailInfo.order.status ? a.refundType = 1 : a.refundType = 2, "" != this.data.caption && (a.reason = this.data.caption), 
        0 != this.data.uploadImage.length && (a.images = this.data.imagesString), (0, s.getPayRefund)(a, function(a) {
            if (1 === a.errcode) {
                var t = getCurrentPages(), i = t[t.length - 2];
                i.nextRefresh(), "订单详情" == i.data.cartPage && t[t.length - 3].nextRefresh(), wx.redirectTo({
                    url: "/pages/order/refundDetail/refundDetail?orderUuid=" + e.data.detailInfo.order.orderSubUuid
                });
            }
        });
    },
    uploadImages: function(e) {
        var a = this, t = {
            accesstoken: this.store.data.userInfo.accesstoken
        };
        (0, s.getImageToken)(t, function(t) {
            1 === t.errcode && (0, i.upTokenImage)(a.data.uploadImage[e], t.data.token, function(t) {
                0 == e && (a.data.imagesString = "["), e < a.data.uploadImage.length - 1 ? (a.data.imagesString = a.data.imagesString + "'" + t + "',", 
                a.uploadImages(e + 1)) : (a.data.imagesString = a.data.imagesString + "'" + t + "']", 
                a.setData({
                    imagesString: a.data.imagesString
                }), a.onRefund());
            }, function() {});
        });
    },
    checkedThisCause: function(e) {
        for (var a = e.currentTarget.dataset.checkedindex, t = this.data.reasons, i = 0; i < t.length; i++) i == a ? t[a].isChecked = !0 : t[i].isChecked = !1;
        this.setData({
            reasons: t,
            activeIndex: a
        });
    }
});