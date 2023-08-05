var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/create")), e = require("../../api/apiInstance.js"), i = getApp();

(0, t.default)({
    pure: !0,
    properties: {
        isShowCate: Boolean,
        styleCategoryUuid: String,
        keywords: String
    },
    observers: {
        isShowCate: function(t) {
            t && this.setData({
                options: this.properties.isShowCate
            });
        },
        styleCategoryUuid: function(t) {
            "" != t && (this.setData({
                childIndex: 0
            }), this.getStyle());
        }
    },
    data: {
        childIndex: 0,
        styleList: {},
        navH: i.globalData.navH,
        status: i.globalData.status,
        options: !1
    },
    ready: function() {
        this.getStyle();
    },
    methods: {
        getStyle: function() {
            var t = this, i = {
                keywords: this.data.keywords
            };
            "" != this.data.styleCategoryUuid && (i.categoryUuid = this.data.styleCategoryUuid), 
            (0, e.getConditionsStyle)(i, function(e) {
                if (1 === e.errcode) {
                    var i = !1;
                    "" != e.data && "{}" != JSON.stringify(e.data) && (i = !0), t.triggerEvent("isStyleShow", i), 
                    t.setData({
                        styleList: e.data
                    });
                }
            });
        },
        onStyleClose: function() {
            var t = this;
            this.setData({
                options: !1
            }), setTimeout(function() {
                t.setData({
                    isShowCate: !1
                });
            }, 450);
        },
        onChoose: function(t) {
            var e = t.currentTarget.dataset.index;
            this.setData({
                childIndex: e
            });
        },
        onStyleSure: function() {
            var t = this;
            this.setData({
                options: !1
            }), setTimeout(function() {
                t.setData({
                    isShowCate: !1
                });
            }, 450);
            var e = this.data.styleList.value[this.data.childIndex], i = [], a = {}, s = [];
            s.push(e), a.propertyUuid = this.data.styleList.propertyUuid, a.values = s, i.push(a);
            var o = {
                properties: i,
                minSalesPrice: 0,
                maxSalesPrice: 0
            };
            this.triggerEvent("onStyleSure", o);
        },
        preventTouchMove: function(t) {},
        onNothingClick: function() {}
    }
});