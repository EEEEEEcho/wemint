function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/create")), a = require("../../api/apiInstance.js");

getApp();

(0, t.default)({
    properties: {
        isShow: Boolean,
        goodsUuid: String
    },
    data: {
        userList: [],
        exemptionTime: [],
        interval: null,
        pageSize: 10,
        pageNum: 1,
        isFirst: !0,
        isLoad: !1,
        isLoadMore: !1
    },
    observers: {
        goodsUuid: function(e) {
            "" != e && this.data.isFirst && (this.data.isFirst = !1, this.getExemptionList());
        }
    },
    detached: function() {
        null != this.data.interval && clearInterval(this.data.interval);
    },
    methods: {
        onClosePop: function(e) {
            this.setData({
                isShow: !1
            });
        },
        onRefresh: function() {
            "" != this.data.goodsUuid && (this.data.pageNum = 1, this.getExemptionList());
        },
        onMore: function(e) {
            var t = this;
            if (!this.data.isLoad) {
                this.data.isLoad = !0, this.data.pageNum = this.data.pageNum + 1, this.setData({
                    isLoadMore: !0
                });
                var i = {
                    goodsUuid: this.data.goodsUuid,
                    pageNum: this.data.pageNum,
                    pageSize: this.data.pageSize,
                    sort: "desc"
                };
                (0, a.getExemptionList)(i, function(e) {
                    if (1 == e.errcode) {
                        for (s = 0; s < e.data.length; s++) {
                            var a = {};
                            a.freeDay = "0", a.freeHour = "00", a.freeMinute = "00", a.freeSecond = "00", t.data.exemptionTime.push(a);
                        }
                        var i = t.data.userList.concat(e.data), r = !0;
                        if (e.pages > t.data.pageNum && (r = !1), t.data.isLoad = r, t.setData({
                            userList: i,
                            isLoadMore: !1,
                            exemptionTime: t.data.exemptionTime
                        }), e.data.length > 0) for (var s = 0; s < e.data.length; s++) t.setFreeDay(e.data[s].expirationTime, s);
                    } else t.data.pageNum = t.data.pageNum - 1, t.data.isLoad = !1, t.setData({
                        isLoadMore: !1
                    });
                });
            }
        },
        preventTouchMove: function(e) {},
        onJoinFree: function(e) {
            var t = e.currentTarget.dataset.groupUuid;
            this.triggerEvent("onJoinFree", t);
        },
        getExemptionList: function() {
            var e = this, t = {
                goodsUuid: this.data.goodsUuid,
                pageNum: this.data.pageNum,
                pageSize: this.data.pageSize,
                sort: "desc"
            };
            (0, a.getExemptionList)(t, function(t) {
                if (1 == t.errcode) {
                    for (i = 0; i < t.data.length; i++) {
                        var a = {};
                        a.freeDay = "0", a.freeHour = "00", a.freeMinute = "00", a.freeSecond = "00", e.data.exemptionTime.push(a);
                    }
                    if (e.setData({
                        userList: t.data,
                        exemptionTime: e.data.exemptionTime
                    }), t.data.length > 0) {
                        null == e.data.interval && (e.data.interval = setInterval(function() {
                            for (var t = 0; t < e.data.userList.length; t++) e.setFreeDay(e.data.userList[t].expirationTime, t);
                        }, 1e3));
                        for (var i = 0; i < e.data.userList.length; i++) e.setFreeDay(e.data.userList[i].expirationTime, i);
                    }
                }
            });
        },
        setFreeDay: function(t, a) {
            var i, r = t - new Date().getTime();
            r < 0 && null == this.data.interval && clearInterval(this.data.interval);
            var s, n, o, d = r / 864e5, u = r % 864e5 / 36e5, p = r % 864e5 % 36e5 / 6e4, m = r % 864e5 % 36e5 % 6e4 / 1e3;
            s = u < 10 ? "0" + parseInt(u) : "" + parseInt(u), n = p < 10 ? "0" + parseInt(p) : "" + parseInt(p), 
            o = m < 10 ? "0" + parseInt(m) : "" + parseInt(m), this.data.exemptionTime[a].freeDay = parseInt(d), 
            this.data.exemptionTime[a].freeHour = s, this.data.exemptionTime[a].freeMinute = n, 
            this.data.exemptionTime[a].freeSecond = o;
            var f = "exemptionTime[" + a + "].freeDay", h = "exemptionTime[" + a + "].freeHour", g = "exemptionTime[" + a + "].freeMinute", l = "exemptionTime[" + a + "].freeSecond";
            this.setData((i = {}, e(i, f, this.data.exemptionTime[a].freeDay), e(i, h, this.data.exemptionTime[a].freeHour), 
            e(i, g, this.data.exemptionTime[a].freeMinute), e(i, l, this.data.exemptionTime[a].freeSecond), 
            i));
        }
    }
});