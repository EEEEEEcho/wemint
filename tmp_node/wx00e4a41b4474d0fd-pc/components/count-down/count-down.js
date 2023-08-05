function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, r) {
            function n(i, a) {
                try {
                    var o = t[i](a), u = o.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void r(e);
                }
                if (!o.done) return Promise.resolve(u).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(u);
            }
            return n("next");
        });
    };
}

var r = e(require("../../lib/endpoint")), n = e(require("../../lib/runtime"));

Component({
    properties: {
        houseId: {
            type: Number,
            value: 83
        },
        class: {
            type: String,
            value: ""
        }
    },
    data: {
        day: 30,
        hour: 12,
        min: 59
    },
    methods: {
        updateTime: function() {
            var e = this.data.endtime, t = Date.now(), r = parseInt((e - t) / 1e3), n = void 0, i = void 0, a = void 0, o = void 0;
            r <= 0 ? (n = 0, i = 0, a = 0, o = 0) : (n = Math.floor(r / 86400), i = Math.floor(r / 3600 % 24), 
            a = Math.floor(r / 60 % 60), o = parseInt(r % 60)), a = this.addZero(a), this.setData({
                day: n,
                hour: i,
                min: a,
                sec: o,
                endtime: e
            });
        },
        addZero: function(e) {
            return e < 10 ? "0" + e : e;
        },
        clearTimer: function() {
            this.timer && clearInterval(this.timer);
        }
    },
    attached: function() {
        var e = this;
        return t(n.default.mark(function t() {
            var i, a, o;
            return n.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (i = e.properties.houseId, console.log("houseId", i), i) {
                        t.next = 4;
                        break;
                    }
                    return t.abrupt("return");

                  case 4:
                    return t.next = 6, (0, r.default)("restTime", i);

                  case 6:
                    a = t.sent, o = a.single.endTime, e.setData({
                        endtime: o
                    }), e.updateTime(), e.timer && e.clearTimer(), e.timer = setInterval(function() {
                        e.updateTime();
                    }, 1e3);

                  case 12:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    detached: function() {
        this.clearTimer();
    },
    externalClasses: [ "grey" ]
});