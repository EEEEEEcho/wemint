var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/create")), t = require("../../api/apiInstance.js");

getApp();

(0, e.default)({
    properties: {
        isShow: Boolean,
        isShare: Boolean,
        groupUuid: String
    },
    data: {
        interval: null,
        groupInfo: {},
        isFirst: !0,
        exemptionTime: ""
    },
    observers: {
        groupUuid: function(e) {
            "" != e && this.data.isFirst && (this.data.isFirst = !1, this.getGroupInfo());
        }
    },
    detached: function() {
        null != this.data.interval && clearInterval(this.data.interval);
    },
    methods: {
        joinFree: function(e) {
            var t = e.currentTarget.dataset.groupUuid;
            this.triggerEvent("onJoinFree", t);
        },
        onRefreshGroup: function() {
            "" != this.data.groupUuid && this.getGroupInfo();
        },
        onClosePop: function(e) {
            this.setData({
                isShow: !1
            });
        },
        getGroupInfo: function() {
            var e = this, a = {
                groupUuid: this.data.groupUuid
            };
            (0, t.getGroupInfo)(a, function(t) {
                1 == t.errcode && (e.setData({
                    groupInfo: t.data
                }), null == e.data.interval && (e.data.interval = setInterval(function() {
                    e.setFreeDay(e.data.groupInfo.expirationTime);
                }, 1e3), e.setFreeDay(e.data.groupInfo.expirationTime)));
            });
        },
        setFreeDay: function(e) {
            var t = e - new Date().getTime();
            t < 0 && null == this.data.interval && clearInterval(this.data.interval);
            var a, r, i, n = t / 864e5, o = t % 864e5 / 36e5, s = t % 864e5 % 36e5 / 6e4, u = t % 864e5 % 36e5 % 6e4 / 1e3;
            a = o < 10 ? "0" + parseInt(o) : "" + parseInt(o), r = s < 10 ? "0" + parseInt(s) : "" + parseInt(s), 
            i = u < 10 ? "0" + parseInt(u) : "" + parseInt(u), this.setData({
                exemptionTime: "剩" + parseInt(n) + "天 " + a + ":" + r + ":" + i
            });
        }
    }
});