var a = wx.getSystemInfoSync().windowWidth;

Component({
    properties: {
        width: {
            type: Number,
            value: 750,
            observer: function(a, e, t) {
                a != this.data.width && this._refresh();
            }
        },
        height: {
            type: Number,
            value: 100
        },
        blockSize: {
            type: Number,
            value: 50,
            observer: function(a, e, t) {
                a != this.data.blockSize && this._refresh();
            }
        },
        barHeight: {
            type: Number,
            value: 4
        },
        backgroundColor: {
            type: String,
            value: "#e9e9e9"
        },
        activeColor: {
            type: String,
            value: "#5EC4C2"
        },
        min: {
            type: Number,
            value: 0,
            observer: function(a, e, t) {
                var r = this;
                a != r.data.min && r._refresh();
            }
        },
        max: {
            type: Number,
            value: 100,
            observer: function(a, e, t) {
                var r = this;
                a != r.data.max && r._refresh();
            }
        },
        values: {
            type: Object,
            value: [ 0, 100 ],
            observer: function(a, e, t) {
                var r = this, i = e;
                if (r._isValuesValid(a) && r._isValuesValid(i) && (a[0] != i[0] || a[1] != i[1])) {
                    r._refresh();
                    var s = {
                        minValue: a[0],
                        maxValue: a[1],
                        fromUser: !0
                    }, l = {};
                    r.triggerEvent("rangechange", s, l);
                }
            }
        }
    },
    ready: function() {
        this.setData({
            markedMinLeft: this.data.values[0],
            markedMaxLeft: this.data.values[1]
        }), this._refresh();
    },
    options: {
        multipleSlots: !0
    },
    data: {
        MAX_LENGTH: 666,
        minBlockLeft: 0,
        maxBlockLeft: 666,
        progressBarLeft: 0,
        progressBarWidth: 666,
        markedMinLeft: 0,
        markedMaxLeft: 0
    },
    methods: {
        _pxToRpx: function(e) {
            return 750 * e / a;
        },
        _onBlockTouchStart: function(a) {
            this._blockDownX = a.changedTouches[0].pageX, this._blockLeft = a.target.dataset.left, 
            this._curBlock = a.target.dataset.tag;
        },
        _onBlockTouchMove: function(a) {
            var e = this, t = e._calculateValues(a);
            e._refreshProgressBar(t[2], t[3]), e._refreshBlock(t[2], t[3]);
            var r = {
                minValue: t[0],
                maxValue: t[1],
                fromUser: !0
            }, i = {};
            e.triggerEvent("rangechange", r, i);
        },
        _onBlockTouchEnd: function(a) {
            var e = {};
            "blockRight" == a.target.id ? (e.rightSlideClk = !0, e.leftSlideClk = !1) : (e.rightSlideClk = !1, 
            e.leftSlideClk = !0);
            var t = this, r = t._calculateValues(a);
            t._refreshProgressBar(r[2], r[3]), t._refreshBlock(r[2], r[3]), this.setData({
                markedMinLeft: r[2],
                markedMaxLeft: r[3]
            });
            var i = {
                minValue: r[0],
                maxValue: r[1],
                fromUser: !0,
                slideClk: e
            }, s = {};
            t.triggerEvent("rangechangeEnd", i, s);
        },
        _isValuesValid: function(a) {
            return null != a && void 0 != a && 2 == a.length;
        },
        _calculateValues: function(a) {
            var e = this, t = a.changedTouches[0].pageX - e._blockDownX, r = e._blockLeft + e._pxToRpx(t);
            r = Math.max(0, r), r = Math.min(r, e.data.MAX_LENGTH), r = "minBlock" == e._curBlock ? Math.min(r, e.data.markedMaxLeft - e.data.blockSize / 2) : Math.max(r, e.data.markedMinLeft + e.data.blockSize / 2);
            var i = e.data.minBlockLeft, s = e.data.maxBlockLeft;
            "minBlock" == e._curBlock ? i = r : s = r;
            var l = e.data.max - e.data.min, o = Math.min(i, s), n = Math.max(i, s);
            return [ o / e.data.MAX_LENGTH * l + e.data.min, n / e.data.MAX_LENGTH * l + e.data.min, o, n ];
        },
        _calculateBlockLeft: function(a, e) {
            var t = this, r = (t.data.blockSize, t.data.max - t.data.min);
            return [ (a - t.data.min) / r * t.data.MAX_LENGTH, (e - t.data.min) / r * t.data.MAX_LENGTH ];
        },
        _refreshProgressBar: function(a, e) {
            var t = this, r = t.data.blockSize;
            t.setData({
                progressBarLeft: a + r / 2,
                progressBarWidth: Math.abs(e - a)
            });
        },
        _refreshBlock: function(a, e) {
            this.setData({
                minBlockLeft: a,
                maxBlockLeft: e
            });
        },
        _refresh: function() {
            var a = this, e = a.data.width - a.data.blockSize;
            a.setData({
                MAX_LENGTH: e,
                maxBlockLeft: e,
                progressBarWidth: e
            });
            var t = a.data.values;
            if (a._isValuesValid(t)) {
                t[0] = Math.max(a.data.min, t[0]), t[0] = Math.min(t[0], a.data.max), t[1] = Math.max(a.data.min, t[1]), 
                t[1] = Math.min(t[1], a.data.max);
                var r = a._calculateBlockLeft(t[0], t[1]);
                a._refreshProgressBar(r[0], r[1]), a._refreshBlock(r[0], r[1]), this.setData({
                    markedMinLeft: r[0],
                    markedMaxLeft: r[1]
                });
            }
        }
    }
});