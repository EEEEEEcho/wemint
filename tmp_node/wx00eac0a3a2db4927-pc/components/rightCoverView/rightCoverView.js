function t(t, i, a) {
    return i in t ? Object.defineProperty(t, i, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[i] = a, t;
}

var i = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/create")), a = require("../../api/apiInstance"), e = getApp();

(0, i.default)({
    properties: {
        isShowRight: Boolean,
        styleUuid: String,
        spaceUuid: String,
        foreCategoryUuid: String,
        childCategoryUuid: String
    },
    data: {
        filterList: [],
        navH: e.globalData.navH,
        status: e.globalData.status,
        isIphoneX: e.globalData.isIphoneX,
        minSalesPrice: 0,
        maxSalesPrice: 0,
        firstInit: !1,
        options: !1,
        animationDatas: [],
        animationData: {}
    },
    onHide: function() {
        clearTimeout();
    },
    onUnload: function() {
        clearTimeout();
    },
    observers: {
        isShowRight: function(t) {
            t && this.setData({
                options: !0
            });
        },
        spaceUuid: function(t) {
            this.getConditions();
        },
        styleUuid: function(t) {
            this.getConditions();
        },
        foreCategoryUuid: function(t) {
            this.getConditions();
        },
        childCategoryUuid: function(t) {
            this.data.firstInit && "" != t && this.getConditions(), this.data.firstInit = !0;
        }
    },
    methods: {
        closeRight: function(t) {
            var i = this;
            this.setData({
                options: !1
            }), setTimeout(function() {
                i.setData({
                    isShowRight: !1
                });
            }, 450);
        },
        getConditions: function() {
            var t = this, i = {
                accesstoken: ""
            };
            "" != this.data.styleUuid && (i.styleUuid = this.data.styleUuid), "" != this.data.spaceUuid && (i.spaceUuid = this.data.spaceUuid), 
            "" != this.data.foreCategoryUuid && (i.foreCategoryUuid = this.data.foreCategoryUuid), 
            "" != this.data.childCategoryUuid && (i.categoryUuid = this.data.childCategoryUuid), 
            (0, a.getGoodsConditions)(i, function(i) {
                if (1 === i.errcode) {
                    for (var a = i.data, e = 0; e < a.length; e++) {
                        a[e].stretch = !1;
                        for (var s = [], n = 0; n < a[e].value.length; n++) s.push(!1);
                        a[e].checks = s;
                    }
                    t.setData({
                        filterList: a
                    });
                }
            });
        },
        onStretch: function(i) {
            var a = i.currentTarget.dataset.index, e = "filterList[" + a + "].stretch";
            this.data.filterList[a].stretch ? this.setData(t({}, e, !1)) : this.setData(t({}, e, !0));
        },
        onClickTab: function(i) {
            var a = i.currentTarget.dataset.index, e = i.currentTarget.dataset.valueIndex, s = "filterList[" + a + "].checks[" + e + "]";
            this.data.filterList[a].checks[e] ? this.setData(t({}, s, !1)) : this.setData(t({}, s, !0));
        },
        onCancel: function() {
            var t = this;
            this.setData({
                options: !1
            }), setTimeout(function() {
                t.setData({
                    isShowRight: !1
                });
            }, 450);
        },
        onSure: function() {
            var t = this;
            if (0 != this.data.filterList.length) {
                for (var i = [], a = 0; a < this.data.filterList.length; a++) {
                    for (var e = !1, s = [], n = 0; n < this.data.filterList[a].checks.length; n++) this.data.filterList[a].checks[n] && (e = !0, 
                    s.push(this.data.filterList[a].value[n]));
                    if (e) {
                        var r = {};
                        r.propertyUuid = this.data.filterList[a].propertyUuid, r.values = s, i.push(r);
                    }
                }
                var o = {
                    properties: i,
                    minSalesPrice: this.data.minSalesPrice,
                    maxSalesPrice: this.data.maxSalesPrice
                };
                this.triggerEvent("onPropertySure", o), this.setData({
                    options: !1
                }), setTimeout(function() {
                    t.setData({
                        isShowRight: !1
                    });
                }, 450);
            }
        },
        catchClick: function() {},
        onMinSalesPrice: function(t) {
            this.data.minSalesPrice = 100 * parseInt(t.detail.value);
        },
        onMaxSalesPrice: function(t) {
            this.data.maxSalesPrice = 100 * parseInt(t.detail.value);
        }
    }
});