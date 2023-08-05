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
        },
        head: {
            type: Boolean,
            value: !0
        },
        height: {
            type: Number,
            value: 0
        }
    },
    data: {
        contentHeight: 600,
        mainHeight: 400,
        modalShow: !1,
        animaFlag: !1
    },
    ready: function() {
        this._changeContentHeight(this.data.height);
    },
    methods: {
        _changeContentHeight: function() {
            var e = this.data, a = this.data.height, o = t.getRpxNum({
                rpx: 0
            }), i = 0;
            i += e.foot ? 128 : 0, i += e.head ? 100 : 0, o *= .85, a && (o = a);
            var n = o - i;
            this.setData({
                contentHeight: o,
                mainHeight: n
            });
        },
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