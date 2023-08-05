function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, r) {
            function n(a, o) {
                try {
                    var u = e[a](o), d = u.value;
                } catch (t) {
                    t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                    return void r(t);
                }
                if (!u.done) return Promise.resolve(d).then(function(t) {
                    n("next", t);
                }, function(t) {
                    n("throw", t);
                });
                t(d);
            }
            return n("next");
        });
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = t(require("./request")), n = t(require("./runtime")), a = t(require("../config")), o = {
    customList: function(t) {
        return {
            path: "/customized/layout/list",
            data: {
                houseId: t
            },
            method: "POST"
        };
    },
    customState: function(t) {
        return {
            path: "/process/getProcessStatus",
            data: {
                customerId: t.customerId,
                houseId: t.houseId
            },
            method: "POST"
        };
    },
    customDetail: function(t) {
        return {
            path: "/customized/programme/detailAndSave",
            data: t,
            method: "POST"
        };
    },
    customizedDetail: function(t, e) {
        return {
            path: "/customer/programme/detailById",
            data: {
                id: t,
                customerId: e
            },
            method: "POST"
        };
    },
    spaceList: function(t) {
        return {
            path: "/customized/SpaceTypeType/listByLayoutIdWithSpaceList",
            data: t,
            method: "POST"
        };
    },
    saveCustom: function(t) {
        return {
            path: "/customer/programme/save",
            data: t,
            method: "POST"
        };
    },
    addComment: function(t) {
        return {
            path: "/customer/comment/insert",
            data: t,
            method: "POST"
        };
    },
    updateComment: function(t) {
        return {
            path: "/customer/comment/update",
            data: t,
            method: "POST"
        };
    },
    saveCustomInfo: function(t) {
        return {
            path: "/customer/supplement/insert",
            data: t,
            method: "POST"
        };
    },
    buyCard: function(t) {
        return {
            path: "/wxpay/generateOrder",
            data: t,
            method: "POST"
        };
    },
    customizedList: function(t) {
        return {
            path: "/customer/programme/list",
            data: t,
            method: "POST"
        };
    },
    rankList: function(t) {
        return {
            path: "/customer/programme/rankPageList",
            data: t,
            method: "POST"
        };
    },
    ticket: function(t) {
        return {
            path: "/ticket/queryTicketInfo",
            data: t,
            method: "POST"
        };
    },
    refund: function(t) {
        return {
            path: "/wxpay/refundOrder",
            data: t,
            method: "POST"
        };
    },
    restTime: function(t) {
        return {
            path: "/process/getProcessDuration",
            data: {
                houseId: t
            },
            method: "POST"
        };
    },
    designerRecommend: function(t) {
        return {
            path: "/customized/programme/designerRecommend",
            data: {
                houseId: t
            },
            method: "POST"
        };
    },
    saveDesignerRecommend: function(t) {
        return {
            path: "/customized/programme/saveDesignerRecommend",
            data: t,
            method: "POST"
        };
    },
    copy: function(t) {
        return {
            path: "/customer/programme/copy",
            data: t,
            method: "POST"
        };
    },
    customStatus: function(t) {
        return {
            path: "/process/getProcess",
            data: t,
            method: "POST"
        };
    },
    poster: function(t) {
        return {
            path: "/image/create",
            data: t,
            method: "POST"
        };
    },
    getUploadToken: function(t) {
        return {
            isQiniu: !0,
            path: "/upload/getUploadToken",
            data: t,
            method: "POST"
        };
    },
    like: function(t) {
        return {
            path: "/customer/programme/thumbsup",
            data: t,
            method: "POST"
        };
    },
    delCustom: function(t) {
        return {
            path: "/customer/programme/update",
            data: t,
            method: "POST"
        };
    },
    addShare: function(t) {
        return {
            path: "/ticket/addTicketInvite",
            data: t,
            method: "POST"
        };
    },
    existNick: function(t) {
        return {
            path: "/customer/supplement/isNickNameExist",
            data: t,
            method: "POST"
        };
    },
    theme: function(t) {
        return {
            path: "/decorationStyle/listLayoutDecorationStyle",
            data: t,
            method: "POST"
        };
    }
}, u = function(t) {
    var e = a.default.newUrl;
    return t.isQiniu ? e + "elab-marketing-file" : e + "elab-wuxi-project";
};

exports.default = function() {
    var t = e(n.default.mark(function t(e) {
        for (var a = arguments.length, d = Array(a > 1 ? a - 1 : 0), i = 1; i < a; i++) d[i - 1] = arguments[i];
        var c, s;
        return n.default.wrap(function(t) {
            for (;;) switch (t.prev = t.next) {
              case 0:
                if (o.hasOwnProperty(e)) {
                    t.next = 3;
                    break;
                }
                return console.error("no such endpoint: " + e), t.abrupt("return");

              case 3:
                return c = o[e].apply(null, d), c.url = u(c) + c.path, t.next = 7, (0, r.default)(c);

              case 7:
                return s = t.sent, console.log({
                    url: c.url,
                    req: c,
                    res: s
                }), t.abrupt("return", s);

              case 10:
              case "end":
                return t.stop();
            }
        }, t, void 0);
    }));
    return function(e) {
        return t.apply(this, arguments);
    };
}();