function e(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = i, e;
}

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/create")), i = require("../../api/apiInstance.js");

(0, t.default)({
    properties: {
        goodsUuid: String
    },
    data: {
        exemptionListData: [],
        exemptionTime: [],
        interval: null,
        isFirst: !0,
        isFreeGroupList: !1,
        userTotal: 0
    },
    observers: {
        goodsUuid: function(e) {
            "" != e && this.data.isFirst && (this.data.isFirst = !1, this.getExemptionList(), 
            this.getUserTotal());
        }
    },
    ready: function() {},
    detached: function() {
        null != this.data.interval && clearInterval(this.data.interval);
    },
    methods: {
        onRefreshGroup: function() {
            "" != this.data.goodsUuid && (this.getExemptionList(), this.getUserTotal(), this.selectComponent("#freeGroupList").onRefresh());
        },
        onFreeGroupList: function() {
            this.setData({
                isFreeGroupList: !0
            });
        },
        joinFree: function(e) {
            var t = e.currentTarget.dataset.groupUuid;
            this.triggerEvent("onJoinFree", t);
        },
        onJoinFree: function(e) {
            this.triggerEvent("onJoinFree", e.detail);
        },
        getUserTotal: function() {
            var e = this;
            this.data.userTotal = 0;
            var t = {
                goodsUuid: this.data.goodsUuid,
                pageNum: 1,
                pageSize: 100,
                sort: "desc"
            };
            (0, i.getExemptionList)(t, function(t) {
                if (1 == t.errcode) for (var i = 0; i < t.data.length; i++) {
                    var a = t.data[i].users.length;
                    e.data.userTotal = e.data.userTotal + a, e.setData({
                        userTotal: e.data.userTotal
                    });
                }
            });
        },
        getExemptionList: function() {
            var e = this, t = {
                goodsUuid: this.data.goodsUuid,
                pageNum: 1,
                pageSize: 3,
                sort: "desc"
            };
            (0, i.getExemptionList)(t, function(t) {
                if (1 == t.errcode) {
                    for (a = 0; a < t.data.length; a++) {
                        var i = {};
                        i.freeDay = "0", i.freeHour = "00", i.freeMinute = "00", i.freeSecond = "00", e.data.exemptionTime.push(i);
                    }
                    if (e.setData({
                        exemptionListData: t,
                        exemptionTime: e.data.exemptionTime
                    }), t.data.length > 0) {
                        null == e.data.interval && (e.data.interval = setInterval(function() {
                            for (var i = 0; i < t.data.length; i++) e.setFreeDay(t.data[i].expirationTime, i);
                        }, 1e3));
                        for (var a = 0; a < t.data.length; a++) e.setFreeDay(t.data[a].expirationTime, a);
                    }
                }
            });
        },
        setFreeDay: function(t, i) {
            var a, r = t - new Date().getTime();
            r < 0 && null == this.data.interval && clearInterval(this.data.interval);
            var n, o, s, d = r / 864e5, u = r % 864e5 / 36e5, p = r % 864e5 % 36e5 / 6e4, m = r % 864e5 % 36e5 % 6e4 / 1e3;
            n = u < 10 ? "0" + parseInt(u) : "" + parseInt(u), o = p < 10 ? "0" + parseInt(p) : "" + parseInt(p), 
            s = m < 10 ? "0" + parseInt(m) : "" + parseInt(m), this.data.exemptionTime[i].freeDay = parseInt(d), 
            this.data.exemptionTime[i].freeHour = n, this.data.exemptionTime[i].freeMinute = o, 
            this.data.exemptionTime[i].freeSecond = s;
            var f = "exemptionTime[" + i + "].freeDay", l = "exemptionTime[" + i + "].freeHour", h = "exemptionTime[" + i + "].freeMinute", g = "exemptionTime[" + i + "].freeSecond";
            this.setData((a = {}, e(a, f, this.data.exemptionTime[i].freeDay), e(a, l, this.data.exemptionTime[i].freeHour), 
            e(a, h, this.data.exemptionTime[i].freeMinute), e(a, g, this.data.exemptionTime[i].freeSecond), 
            a));
        }
    }
});