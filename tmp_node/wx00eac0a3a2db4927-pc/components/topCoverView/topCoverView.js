var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/create")), e = getApp();

(0, t.default)({
    properties: {
        isShowCate: Boolean,
        categories: Object
    },
    data: {
        fatherIndex: 0,
        childIndex: 0,
        isSingle: !1,
        navH: e.globalData.navH,
        status: e.globalData.status,
        options: !1
    },
    observers: {
        isShowCate: function(t) {
            t && this.setData({
                options: this.properties.isShowCate
            });
        },
        categories: function(t) {
            "" != t && 0 != t.length && (null != t[0].childs ? this.setData({
                fatherIndex: 0,
                childIndex: 0
            }) : this.setData({
                childIndex: 0,
                isSingle: !0
            }));
        }
    },
    methods: {
        onClassifyClose: function() {
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
            var e = t.currentTarget.dataset.childIndex;
            if (this.data.isSingle) this.setData({
                childIndex: e
            }); else {
                var a = t.currentTarget.dataset.fatherIndex;
                this.setData({
                    fatherIndex: a,
                    childIndex: e
                });
            }
        },
        onClassifySure: function() {
            var t = this;
            if (this.setData({
                options: !1
            }), setTimeout(function() {
                t.setData({
                    isShowCate: !1
                });
            }, 450), this.data.isSingle) {
                e = this.data.categories[this.data.childIndex];
                this.triggerEvent("onClassifySure", e);
            } else {
                var e = this.data.categories[this.data.fatherIndex].childs[this.data.childIndex];
                this.triggerEvent("onClassifySure", e);
            }
        },
        preventTouchMove: function(t) {},
        onNothingClick: function() {}
    }
});