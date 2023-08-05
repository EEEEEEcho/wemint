function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function o(t, o, a) {
    return o in t ? Object.defineProperty(t, o, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[o] = a, t;
}

var a = t(require("../../../store")), s = t(require("../../../utils/create")), e = require("../../../api/apiInstance"), i = getApp();

(0, s.default)(a.default, {
    properties: {},
    data: {
        cartPage: "使用优惠券",
        navH: i.globalData.navH,
        status: i.globalData.status,
        couponList: [],
        goodsInfo: "",
        cardCodes: [],
        couponCodes: [],
        couponIsIntercept: !1,
        cardIsIntercept: !1,
        isCoupon: !0
    },
    onLoad: function(t) {
        this.setData({
            goodsInfo: t.goodsInfo
        });
    },
    onReady: function() {
        this.getUseCoupon();
    },
    onUnload: function() {
        this.data.isCoupon && this.resultData();
    },
    resultData: function() {
        var t = !1;
        this.store.data.couponCodes = [];
        for (var o = 0; o < this.data.couponList.length; o++) {
            var a = this.data.couponList[o];
            if (a.isSelect && (this.store.data.couponCodes.push(a.code), 0 == a.isOverlay)) {
                t = !0;
                break;
            }
        }
        this.store.data.couponIsIntercept = t, this.store.data.couponCodes.length > 0 && (this.store.data.cardIsIntercept || t) && (this.store.data.cardIsIntercept = !1, 
        this.store.data.cardCodes = []), this.update();
    },
    onNotUse: function() {
        this.store.data.couponCodes = [], this.store.data.couponIsIntercept = !1, this.update(), 
        this.setData({
            isCoupon: !1
        }), wx.navigateBack({
            delta: 1
        });
    },
    onSelect: function(t) {
        var a = t.currentTarget.dataset.index, s = this.data.couponList[a], e = !1;
        if (e = !s.isSelect, this.data.couponList[a].isSelect = e, 0 == s.isOverlay) {
            for (var i = 0; i < this.data.couponList.length; i++) i != a ? (this.data.couponList[i].isSelect = !1, 
            this.data.couponList[i].isMark = !!e) : this.data.couponList[i].isMark = !1;
            this.setData({
                couponList: this.data.couponList
            });
        } else {
            var n = "couponList[" + a + "].isSelect";
            this.setData(o({}, n, e));
        }
    },
    getUseCoupon: function() {
        var t = this, o = {
            accesstoken: this.store.data.userInfo.accesstoken,
            goodsInfo: this.data.goodsInfo,
            type: 2
        };
        (0, e.getUseCouponCard)(o, function(o) {
            if (1 === o.errcode) {
                void 0 !== o.data.coupon && (t.data.couponList = o.data.coupon);
                for (var a = 0; a < t.data.couponList.length; a++) if (t.store.data.couponCodes.length > 0) {
                    var s = t.store.data.couponCodes.indexOf(t.data.couponList[a].code);
                    t.store.data.couponIsIntercept ? -1 != s ? (t.data.couponList[a].isSelect = !0, 
                    t.data.couponList[a].isMark = !1) : (t.data.couponList[a].isSelect = !1, t.data.couponList[a].isMark = !0) : -1 != s ? (t.data.couponList[a].isSelect = !0, 
                    t.data.couponList[a].isMark = !1) : (t.data.couponList[a].isSelect = !1, t.data.couponList[a].isMark = !1);
                } else t.data.couponList[a].isSelect = !1, t.data.couponList[a].isMark = !1;
                t.setData({
                    couponList: t.data.couponList
                });
            }
        });
    }
});