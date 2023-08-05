var t = getApp();

Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        title: {
            type: String,
            value: "提示"
        },
        foot: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        contentHeight: 600,
        mainHeight: 400,
        modalShow: !1,
        animaFlag: !1
    },
    attached: function() {
        var a = t.getRpxNum({
            rpx: 0
        }), o = (a *= .7) - (this.data.foot ? 228 : 100);
        this.setData({
            contentHeight: a,
            mainHeight: o
        });
    },
    methods: {
        onCloseModal: function() {
            var t = this;
            t.setData({
                animaFlag: !1
            }), setTimeout(function() {
                t.setData({
                    modalShow: !1
                }), t.triggerEvent("close", {});
            }, 300);
        },
        onShowModal: function() {
            var t = this;
            t.setData({
                modalShow: !0
            }), setTimeout(function() {
                t.setData({
                    animaFlag: !0
                });
            }, 100);
        }
    }
});