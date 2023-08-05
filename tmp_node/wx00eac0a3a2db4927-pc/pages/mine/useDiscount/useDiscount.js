function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function a(t, a, s) {
    return a in t ? Object.defineProperty(t, a, {
        value: s,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = s, t;
}

var s = t(require("../../../store")), e = t(require("../../../utils/create")), d = require("../../../api/apiInstance"), r = getApp();

(0, e.default)(s.default, {
    data: {
        cartPage: "选择优惠卡",
        navH: r.globalData.navH,
        status: r.globalData.status,
        cardList: [],
        cardCodes: [],
        couponCodes: [],
        couponIsIntercept: !1,
        cardIsIntercept: !1,
        goodsInfo: "",
        isUseCard: !0
    },
    onLoad: function(t) {
        this.setData({
            goodsInfo: t.goodsInfo
        });
    },
    onReady: function() {
        this.getUseCard();
    },
    onUnload: function() {
        this.data.isUseCard && this.resultData();
    },
    onNotUse: function() {
        this.store.data.cardCodes = [], this.store.data.cardIsIntercept = !1, this.update(), 
        this.setData({
            isUseCard: !1
        }), wx.navigateBack({
            delta: 1
        });
    },
    resultData: function() {
        var t = !1;
        this.store.data.cardCodes = [];
        for (var a = 0; a < this.data.cardList.length; a++) {
            var s = this.data.cardList[a];
            if (s.isSelect && (this.store.data.cardCodes.push(s.code), 0 == s.franchise.is_overlay)) {
                t = !0;
                break;
            }
        }
        this.store.data.cardIsIntercept = t, this.store.data.cardCodes.length > 0 && (this.store.data.couponIsIntercept || t) && (this.store.data.couponIsIntercept = !1, 
        this.store.data.couponCodes = []), this.update();
    },
    onSelect: function(t) {
        var s = t.currentTarget.dataset.index, e = this.data.cardList[s], d = !1;
        if (d = !e.isSelect, this.data.cardList[s].isSelect = d, 0 == e.franchise.is_overlay) {
            for (var r = 0; r < this.data.cardList.length; r++) r != s ? (this.data.cardList[r].isSelect = !1, 
            this.data.cardList[r].isMark = !!d) : this.data.cardList[r].isMark = !1;
            this.setData({
                cardList: this.data.cardList
            });
        } else {
            var i = "cardList[" + s + "].isSelect";
            this.setData(a({}, i, d));
        }
    },
    getUseCard: function() {
        var t = this, a = {
            accesstoken: this.store.data.userInfo.accesstoken,
            goodsInfo: this.data.goodsInfo,
            type: 1
        };
        (0, d.getUseCouponCard)(a, function(a) {
            if (1 === a.errcode) {
                void 0 !== a.data.card && (t.data.cardList = a.data.card);
                for (var s = 0; s < t.data.cardList.length; s++) if (t.store.data.cardCodes.length > 0) {
                    var e = t.store.data.cardCodes.indexOf(t.data.cardList[s].code);
                    t.store.data.cardIsIntercept ? -1 != e ? (t.data.cardList[s].isSelect = !0, t.data.cardList[s].isMark = !1) : (t.data.cardList[s].isSelect = !1, 
                    t.data.cardList[s].isMark = !0) : -1 != e ? (t.data.cardList[s].isSelect = !0, t.data.cardList[s].isMark = !1) : (t.data.cardList[s].isSelect = !1, 
                    t.data.cardList[s].isMark = !1);
                } else t.data.cardList[s].isSelect = !1, t.data.cardList[s].isMark = !1;
                t.setData({
                    cardList: t.data.cardList
                });
            }
        });
    }
});