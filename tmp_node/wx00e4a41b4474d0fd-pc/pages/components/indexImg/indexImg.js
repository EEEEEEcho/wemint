Component({
    properties: {
        src: {
            type: String,
            value: ""
        },
        cStyle: {
            type: String,
            value: ""
        },
        mode: {
            type: String,
            value: "aspectFit"
        },
        param: {
            type: Object,
            value: ""
        },
        index: {
            type: Number,
            value: ""
        }
    },
    data: {
        loaded: !1,
        error: !1,
        loading: "../../../image/wepy_pro/loading1.gif",
        errorImg: "../../../image/wepy_pro/errorImg.png",
        startTime: null,
        startLoad: !1,
        loadNum: 1
    },
    externalClasses: [ "cclass" ],
    ready: function() {
        var t = this, e = this.createIntersectionObserver();
        e.relativeToViewport({
            bottom: 50,
            right: 300
        }).observe(".containView", function(a) {
            a.intersectionRect.width > 0 && a.intersectionRect.height > 0 && (t.setData({
                startLoad: !0
            }), e.disconnect());
        }), this.data.startTime = new Date().getTime();
    },
    methods: {
        load: function(t) {
            new Date().getTime();
            this.setData({
                loaded: !0,
                error: !1
            });
        },
        click: function(t) {
            var e = t.currentTarget.dataset.param, a = this.data.index;
            this.triggerEvent("click", {
                param: e,
                index: a
            });
        },
        errorLoad: function(t) {
            if (++this.data.loadNum > 3) return !1;
            console.log(t);
            var e = Math.random();
            this.setData({
                error: !0,
                src: this.data.src + (this.data.src.indexOf("?") > -1 ? "&" + e : "?" + e)
            });
        }
    }
});