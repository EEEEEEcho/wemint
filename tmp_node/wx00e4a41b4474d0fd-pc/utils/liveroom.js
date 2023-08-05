function o(o) {
    if (!P) return console.log("请求服务器域名为空，请将wxlite/config里面的url配置成你的服务器域名"), void (o.fail && o.fail({
        errCode: -9,
        errMsg: "请求服务器域名为空，请将wxlite/config里面的url配置成你的服务器域名"
    }));
    U++, console.log("requestNum: ", U), O[A++] = wx.request({
        url: P + o.url + (o.params ? "?" + e(o.params) + "&" : "?") + "userID=" + x.userID + (x.token ? "&token=" + x.token : ""),
        data: o.data || {},
        method: "POST",
        header: {
            "content-type": "application/json"
        },
        success: o.success || function() {},
        fail: o.fail || function() {},
        complete: o.complete || function() {
            U--;
        }
    });
}

function e(o) {
    var e = [];
    for (var r in o) e.push(encodeURIComponent(r) + "=" + encodeURIComponent(o[r]));
    return e.join("&");
}

function r(o) {
    J.init({
        accountMode: x.accountMode,
        accountType: x.accountType,
        sdkAppID: x.sdkAppID,
        avChatRoomId: o.roomID || 0,
        selType: S.SESSION_TYPE.GROUP,
        selToID: o.roomID || 0,
        selSess: null
    });
    var e = {
        sdkAppID: x.sdkAppID,
        appIDAt3rd: x.sdkAppID,
        accountType: x.accountType,
        identifier: x.userID,
        identifierNick: x.userID,
        userSig: x.userSig
    }, r = {
        5: function(o) {
            T.isDestory = !0, L.onRoomClose();
        },
        11: J.onRevokeGroupNotify,
        255: function(o) {
            var e = JSON.parse(o.UserDefinedField);
            e && "notifyPusherChange" == e.cmd && (L.onPushersChange && L.onPushersChange(), 
            u());
        }
    }, a = {
        onConnNotify: J.onConnNotify,
        onBigGroupMsgNotify: function(o) {
            J.onBigGroupMsgNotify(o, function(o) {
                n(o);
            }, function(o) {
                console.log("LiveRoom callback --\x3e 收到白板数据"), t(o);
            });
        },
        onMsgNotify: function(o) {
            J.onMsgNotify(o, function(o) {
                i(o);
            });
        },
        onGroupSystemNotifys: r,
        onGroupInfoChangeNotify: J.onGroupInfoChangeNotify
    }, c = {
        isAccessFormalEnv: !0,
        isLogOn: !1
    };
    x.accountMode, J.sdkLogin(e, a, c, 0, s, o);
}

function s(o) {
    if (o.errCode) return console.log("webim登录失败:", o), void (o.callback.fail && o.callback.fail({
        errCode: -2,
        errMsg: "IM登录失败，如果你是在配置线上环境，请将IM域名[https://webim.tim.qq.com]配置到小程序request合法域名"
    }));
    console.log("webim登录成功"), T.isLoginIM = !0, o.callback.success && o.callback.success({
        userName: x.userName
    });
}

function a(o) {
    if (o.errCode) return console.log("webim进群失败: ", o), void (o.callback.fail && o.callback.fail({
        errCode: -2,
        errMsg: "IM进群失败"
    }));
    T.isJoinGroup = !0, console.log("进入IM房间成功: ", T.roomID), o.callback.success && o.callback.success({});
}

function t(o) {
    L.onSketchpadData(o);
}

function n(o) {
    if (o.content) {
        console.log("IM消息: ", JSON.stringify(o));
        var e = new Date(), r = e.getHours() + "", s = e.getMinutes() + "", a = e.getSeconds() + "";
        if (1 == r.length && (r = "0" + r), 1 == s.length && (s = "0" + s), 1 == a.length && (a = "0" + a), 
        e = r + ":" + s + ":" + a, o.time = e, "@TIM#SYSTEM" == o.fromAccountNick) o.fromAccountNick = "", 
        o.content = o.content.split(";"), o.content = o.content[0], L.onRecvRoomTextMsg && L.onRecvRoomTextMsg({
            roomID: T.roomID,
            userID: o.fromAccountNick,
            userName: o.userName,
            userAvatar: o.userAvatar,
            message: o.content,
            time: o.time
        }); else {
            var t, n;
            if (n = o.content.split("}}"), "CustomTextMsg" == (t = JSON.parse(n[0] + "}}")).cmd) {
                o.userName = t.data.nickName, o.userAvatar = t.data.headPic;
                for (var i = "", u = 1; u < n.length; u++) u == n.length - 1 ? i += n[u] : i += n[u] + "}}";
                o.content = i, L.onRecvRoomTextMsg && L.onRecvRoomTextMsg({
                    roomID: T.roomID,
                    userID: o.fromAccountNick,
                    userName: o.userName,
                    userAvatar: o.userAvatar,
                    message: o.content,
                    time: o.time
                });
            } else if ("CustomCmdMsg" == t.cmd) {
                o.userName = t.data.nickName, o.userAvatar = t.data.headPic, o.cmd = t.data.cmd;
                for (var i = "", u = 1; u < n.length; u++) u == n.length - 1 ? i += n[u] : i += n[u] + "}}";
                o.content = i, L.onRecvRoomCustomMsg && L.onRecvRoomCustomMsg({
                    roomID: T.roomID,
                    userID: o.fromAccountNick,
                    userName: o.userName,
                    userAvatar: o.userAvatar,
                    cmd: o.cmd,
                    message: o.content,
                    time: o.time
                });
            }
        }
    }
}

function i(o) {
    console.log("收到C2C消息:", JSON.stringify(o));
    var e = JSON.parse(o.content);
    e && "linkmic" == e.cmd && (e.data.type && "request" == e.data.type ? L.onRecvJoinPusherRequest({
        userID: o.fromAccountNick,
        userName: e.data.userName,
        userAvatar: e.data.userAvatar
    }) : e.data.type && "response" == e.data.type ? "accept" == e.data.result ? G && G({
        errCode: 0,
        errMsg: ""
    }) : "reject" == e.data.result && G && G({
        errCode: -999,
        errMsg: "主播拒绝了你的请求"
    }) : e.data.type && "kickout" == e.data.type && L.onKickOut && L.onKickOut({
        roomID: e.data.roomID
    }));
}

function u() {
    T.hasJoinPusher && c({
        data: {
            roomID: T.roomID
        },
        success: function(o) {
            o = o.data;
            var e = [], r = [], s = 0;
            console.log("去重操作"), console.log("旧", JSON.stringify(T.pushers)), console.log("新", JSON.stringify(o.pushers)), 
            console.log("用户信息:", JSON.stringify(x)), o.pushers && o.pushers.forEach(function(o) {
                s = 0, T.pushers && T.pushers.forEach(function(e) {
                    o.userID == e.userID && (s = 1);
                }), s || o.userID == x.userID || e.push(o), s = 0;
            }), T.pushers && T.pushers.forEach(function(e) {
                s = 0, o.pushers && o.pushers.forEach(function(o) {
                    e.userID == o.userID && (s = 1);
                }), s || r.push(e), s = 0;
            }), T.pushers = o.pushers, e.length && (console.log("进房:", JSON.stringify(e)), L.onPusherJoin && L.onPusherJoin({
                pushers: e
            }), v(1)), r.length && (console.log("退房:", JSON.stringify(r)), L.onPusherQuit && L.onPusherQuit({
                pushers: r
            }), v(1));
        },
        fail: function(o) {}
    });
}

function c(e) {
    var r = {};
    if (e.data && e.data.roomID) r.roomID = e.data.roomID; else {
        if (!T.roomID) return void (e.fail && e.fail({
            errCode: -999,
            errMsg: "无roomID"
        }));
        r.roomID = T.roomID;
    }
    o({
        url: "get_pushers",
        data: r,
        success: function(o) {
            if (o.data.code) return console.log("请求CGI:get_pushers失败", o), void (e.fail && e.fail({
                errCode: o.data.code,
                errMsg: "请求CGI:get_pushers失败:" + o.data.message + NaN + o.data.code + "]"
            }));
            console.log("房间信息：", JSON.stringify(o)), e.success && e.success(o);
        },
        fail: e.fail
    });
}

function l(o) {
    o && setTimeout(function() {
        d();
    }, 3e3), _ && setTimeout(function() {
        d(), l();
    }, 7e3);
}

function d() {
    console.log("心跳请求"), o({
        url: "pusher_heartbeat",
        data: {
            roomID: T.roomID,
            userID: x.userID
        },
        success: function(o) {
            o.data.code ? console.log("心跳失败：", o) : console.log("心跳成功", o);
        },
        fail: function(o) {
            console.log("心跳失败：", o);
        }
    });
}

function f() {
    _ = !1;
}

function m(e) {
    o({
        url: "create_room",
        data: {
            userID: x.userID,
            roomInfo: T.roomInfo
        },
        success: function(o) {
            return o.data.code ? (console.log("创建房间失败:", o), void (e.fail && e.fail({
                errCode: o.data.code,
                errMsg: o.data.message + "[" + o.data.code + "]"
            }))) : (console.log("---\x3e创建房间成功:", o), T.roomID = o.data.roomID, T.roomCreator = x.userID, 
            T.isDestory ? (T.isDestory = !1, void h({})) : (e.data.roomID = o.data.roomID, void J.applyJoinBigGroup(T.roomID, a, {
                success: function() {
                    g(e);
                },
                fail: e.fail
            })));
        },
        fail: function(o) {
            if (console.log("创建后台房间失败:", o), "request:fail timeout" == o.errMsg) var r = -1, s = "网络请求超时，请检查网络状态";
            e.fail && e.fail({
                errCode: r || -3,
                errMsg: s || "创建房间失败"
            });
        }
    });
}

function g(o) {
    if (!o || !o.data.roomID || !o.data.pushURL) return console.log("joinPusher参数错误", o), 
    void (o.fail && o.fail({
        errCode: -9,
        errMsg: "joinPusher参数错误"
    }));
    T.roomID = o.data.roomID, T.isDestory = !1, I(o);
}

function I(e) {
    o({
        url: "add_pusher",
        data: {
            roomID: T.roomID,
            userID: x.userID,
            userName: x.userName,
            userAvatar: x.userAvatar,
            pushURL: e.data.pushURL
        },
        success: function(o) {
            if (o.data.code) return console.log("进入房间失败:", o), void (e.fail && e.fail({
                errCode: o.data.code,
                errMsg: o.data.message + "[" + o.data.code + "]"
            }));
            T.hasJoinPusher = !0, u(), console.log("加入推流成功"), _ = !0, l(1), e.success && e.success({
                roomID: T.roomID
            });
        },
        fail: function(o) {
            if (console.log("进入房间失败:", o), "request:fail timeout" == o.errMsg) var r = -1, s = "网络请求超时，请检查网络状态";
            e.fail && e.fail({
                errCode: r || -4,
                errMsg: s || "进入房间失败"
            });
        }
    });
}

function D(o) {
    console.log("开始IM: ", T.roomID), J.applyJoinBigGroup(T.roomID, a, {
        success: function(e) {
            c({
                data: {
                    roomID: T.roomID
                },
                success: function(e) {
                    T.roomID = e.data.roomID, T.roomInfo = e.data.roomInfo, T.roomCreator = e.data.roomCreator, 
                    T.mixedPlayURL = e.data.mixedPlayURL, o.success && o.success({
                        roomID: T.roomID,
                        roomCreator: T.roomCreator,
                        mixedPlayURL: T.mixedPlayURL,
                        pushers: e.data.pushers
                    });
                },
                fail: function(e) {
                    o.fail && o.fail({
                        errCode: e.errCode,
                        errMsg: e.errMsg || "拉取主播信息失败"
                    });
                }
            });
        },
        fail: o.fail
    });
}

function p(e) {
    f(), T.isJoinGroup && J.quitBigGroup(), o({
        url: "delete_pusher",
        data: {
            roomID: T.roomID,
            userID: x.userID
        },
        success: function(o) {
            if (o.data.code) return console.log("退出推流失败:", o), console.error("退房信息: roomID:" + T.roomID + ", userID:" + x.userID), 
            void (e.fail && e.fail({
                errCode: o.data.code,
                errMsg: o.data.message + "[" + o.data.code + "]"
            }));
            console.log("退出推流成功"), T.roomID = "", e.success && e.success({});
        },
        fail: function(o) {
            console.log("退出推流失败:", o);
            var r = o.errCode || -1, s = o.errMsg || "退出房间失败";
            "request:fail timeout" == o.errMsg && (r = -1, s = "网络请求超时，请检查网络状态"), e.fail && e.fail({
                errCode: r,
                errMsg: s
            });
        }
    }), k({
        data: {
            userID: x.userID,
            roomID: T.roomID
        }
    });
}

function h(e) {
    f(), T.isJoinGroup && J.quitBigGroup(), T.isDestory || o({
        url: "destroy_room",
        data: {
            roomID: T.roomID,
            userID: x.userID
        },
        success: function(o) {
            if (o.data.code) return console.log("关闭房间失败:", o), console.error("关闭房间失败: roomID:" + T.roomID + ", userID:" + x.userID), 
            void (e.fail && e.fail({
                errCode: o.data.code,
                errMsg: o.data.message + "[" + o.data.code + "]"
            }));
            console.log("关闭房间成功"), T.roomID = "", e.success && e.success({});
        },
        fail: function(o) {
            console.log("关闭房间失败:", o);
            var r = o.errCode || -1, s = o.errMsg || "关闭房间失败";
            "request:fail timeout" == o.errMsg && (r = -1, s = "网络请求超时，请检查网络状态"), e.fail && e.fail({
                errCode: r,
                errMsg: s
            });
        }
    });
}

function v(o) {
    if (x.userID == T.roomCreator) {
        var e = [];
        T.pushers && T.pushers.length > 0 && T.pushers.forEach(function(o) {
            if (o.userID != T.roomCreator) {
                var r = C(o.accelerateURL);
                r && e.push({
                    userID: o.userID,
                    streamID: r,
                    width: o.width,
                    height: o.height
                });
            } else b = C(o.accelerateURL);
        }), console.log("混流信息:", JSON.stringify(e)), M(o, e);
    }
}

function C(o) {
    if (!o) return null;
    var e = o, r = e.indexOf("?");
    return r >= 0 && (e = e.substring(0, r)), e ? ((r = e.lastIndexOf("/")) >= 0 && (e = e.substring(r + 1)), 
    e ? ((r = e.indexOf(".")) >= 0 && (e = e.substring(0, r)), e || null) : null) : null;
}

function M(o, e) {
    if (!(o < 0)) {
        var r = N(e);
        console.log("混流信息:", JSON.stringify(r)), y(r, function(r) {
            r ? console.log("混流成功") : (console.log("混流失败"), setTimeout(function() {
                M(--o, e);
            }, 2e3));
        });
    }
}

function y(e, r) {
    o({
        url: "merge_stream",
        data: {
            userID: x.userID,
            roomID: T.roomID,
            mergeParams: JSON.stringify(e)
        },
        success: function(o) {
            if (o.data.code || o.data.result.code) return console.error("混流失败:", JSON.stringify(o)), 
            void r(!1);
            r(!0);
        },
        fail: function(o) {
            r(!1);
        }
    });
}

function N(o) {
    console.log("混流原始信息:", JSON.stringify(o));
    var e = 160, r = 240, s = 90;
    (w < 540 || j < 960) && (e = 120, r = 180, s = 60);
    var a = [];
    if (o && o.length > 0) {
        u = {
            input_stream_id: b || "",
            layout_params: {
                image_layer: 1
            }
        };
        a.push(u);
        var t = w - e, n = j - r - s;
        if (o && o.length > 0) {
            var i = 0;
            o.forEach(function(o) {
                var s = {
                    input_stream_id: o.streamID,
                    layout_params: {
                        image_layer: i + 2,
                        image_width: e,
                        image_height: r,
                        location_x: t,
                        location_y: n - i * r
                    }
                };
                a.push(s), i++;
            });
        }
    } else {
        var u = {
            input_stream_id: b || "",
            layout_params: {
                image_layer: 1
            }
        };
        a.push(u);
    }
    var c = {
        interfaceName: "Mix_StreamV2",
        para: {
            app_id: x.sdkAppID.toString(),
            interface: "mix_streamv2.start_mix_stream_advanced",
            mix_stream_session_id: b,
            output_stream_id: b,
            input_stream_list: a
        }
    };
    return {
        timestamp: Math.round(Date.now() / 1e3),
        eventId: Math.round(Date.now() / 1e3),
        interface: c
    };
}

function R(e) {
    o({
        url: "add_audience",
        data: {
            userID: x.userID,
            roomID: e.data.roomID,
            userInfo: e.data.userInfo
        },
        success: function(o) {
            if (o.data.code) return console.log("增加观众请求失败", o), void (e.fail && e.fail({
                errCode: o.data.code,
                errMsg: "增加观众请求失败:" + o.data.message + NaN + o.data.code + "]"
            }));
            e.success && e.success(o);
        },
        fail: e.fail
    });
}

function k(e) {
    o({
        url: "delete_audience",
        data: {
            userID: e.data.userID,
            roomID: e.data.roomID
        },
        success: function(o) {
            if (o.data.code) return console.log("减少观众请求失败", o), void (e.fail && e.fail({
                errCode: o.data.code,
                errMsg: "减少观众请求失败:" + o.data.message + NaN + o.data.code + "]"
            }));
            e.success && e.success(o);
        },
        fail: e.fail
    });
}

var S = require("webim_wx.js"), J = require("webim_handler.js"), P = (require("tls.js"), 
require("encrypt.js"), ""), _ = "", A = 0, O = [], x = {
    userID: "",
    userName: "",
    userAvatar: "",
    userSig: "",
    sdkAppID: "",
    accountType: "",
    accountMode: 0,
    token: ""
}, T = {
    roomID: "",
    roomInfo: "",
    mixedPlayURL: "",
    isCreator: !1,
    pushers: [],
    isLoginIM: !1,
    isJoinGroup: !1,
    isDestory: !1,
    hasJoinPusher: !1
}, L = {
    onGetPusherList: function() {},
    onPusherJoin: function() {},
    onPusherQuit: function() {},
    onRoomClose: function() {},
    onRecvRoomTextMsg: function() {},
    onRecvJoinPusherRequest: function() {},
    onKickOut: function() {},
    onRecvRoomCustomMsg: function() {},
    onSketchpadData: function() {},
    onPushersChange: function() {}
}, q = [ "林静晓", "陆杨", "江辰", "付小司", "陈小希", "吴柏松", "肖奈", "芦苇微微", "一笑奈何", "立夏" ], U = 0, G = null, b = "", w = 360, j = 640, E = null;

module.exports = {
    login: function(e) {
        if (!e || !e.data.serverDomain) return console.log("init参数错误", e), void (e.fail && e.fail({
            errCode: -9,
            errMsg: "init参数错误"
        }));
        P = e.data.serverDomain, x.userID = e.data.userID, x.userSig = e.data.userSig, x.sdkAppID = e.data.sdkAppID, 
        x.accountType = e.data.accType, x.userName = e.data.userName || q[Math.floor(10 * Math.random())] || x.userID, 
        x.userAvatar = e.data.userAvatar || "123", o({
            url: "login",
            params: {
                accountType: x.accountType,
                sdkAppID: x.sdkAppID,
                userSig: x.userSig
            },
            data: {},
            success: function(o) {
                if (o.data.code) return console.error("登录到RoomService后台失败:", JSON.stringify(o)), 
                void (e.fail && e.fail({
                    errCode: o.data.code,
                    errMsg: o.data.message
                }));
                x.token = o.data.token, x.userID = o.data.userID, r({
                    success: function(o) {
                        e.success && e.success({
                            userID: x.userID,
                            userName: x.userName
                        });
                    },
                    fail: function(o) {
                        console.error("IM登录失败:", JSON.stringify(o)), e.fail && e.fail({
                            errCode: -999,
                            errMsg: "IM登录失败"
                        });
                    }
                });
            },
            fail: function(o) {
                console.error("登录到RoomService后台失败:", JSON.stringify(o)), e.fail && e.fail(o);
            }
        });
    },
    logout: function() {
        o({
            url: "logout",
            success: function(o) {},
            fail: function(o) {}
        }), P = "", x.userID = "", x.userSig = "", x.sdkAppID = "", x.accountType = "", 
        x.userName = "", x.userAvatar = "", x.token = "", J.logout();
    },
    getRoomList: function(e) {
        if (!e) return console.log("getRoomList参数错误", e), void (e.fail && e.fail({
            errCode: -9,
            errMsg: "getRoomList参数错误"
        }));
        o({
            url: "get_room_list",
            data: {
                index: e.data.index || 0,
                cnt: e.data.cnt || 20
            },
            success: function(o) {
                if (o.data.code) return console.error("获取房间列表失败: ", o), void (e.fail && e.fail({
                    errCode: o.data.code,
                    errMsg: o.data.message + "[" + o.data.code + "]"
                }));
                console.log("房间列表信息:", o), e.success && e.success({
                    rooms: o.data.rooms
                });
            },
            fail: function(o) {
                if (console.log("获取房间列表失败: ", o), "request:fail timeout" == o.errMsg) var r = -1, s = "网络请求超时，请检查网络状态";
                e.fail && e.fail({
                    errCode: r || -1,
                    errMsg: s || "获取房间列表失败"
                });
            }
        });
    },
    getPushURL: function(e) {
        if (!e) return console.log("getPushURL参数错误", e), void (e.fail && e.fail({
            errCode: -9,
            errMsg: "getPushURL参数错误"
        }));
        o({
            url: "get_push_url",
            data: {
                userID: x.userID
            },
            success: function(o) {
                if (o.data.code) return console.log("获取推流地址失败: ", o), void (e.fail && e.fail({
                    errCode: o.data.code,
                    errMsg: o.data.message + "[" + o.data.code + "]"
                }));
                console.log("获取推流地址成功：", o.data.pushURL), e.success && e.success({
                    pushURL: o.data.pushURL
                });
            },
            fail: function(o) {
                if ("request:fail timeout" == o.errMsg) var r = -1, s = "网络请求超时，请检查网络状态";
                e.fail && e.fail({
                    errCode: r || -1,
                    errMsg: s || "获取推流地址失败"
                });
            }
        });
    },
    createRoom: function(o) {
        if (T.isCreator = !0, T.isDestory = !1, T.isJoinGroup = !1, !o || !o.data.roomInfo || !o.data.pushURL) return console.log("createRoom参数错误", o), 
        void (o.fail && o.fail({
            errCode: -9,
            errMsg: "createRoom参数错误"
        }));
        T.roomInfo = o.data.roomInfo, m(o);
    },
    enterRoom: function(o) {
        if (T.isCreator = !1, T.isJoinGroup = !1, !o || !o.data.roomID) return console.log("enterRoom参数错误", o), 
        void (o.fail && o.fail({
            errCode: -9,
            errMsg: "enterRoom参数错误"
        }));
        T.roomID = o.data.roomID, D({
            success: function(e) {
                o.success && o.success(e);
                var r = {
                    userName: x.userName,
                    userAvatar: x.userAvatar
                };
                R({
                    data: {
                        roomID: o.data.roomID,
                        userID: x.userID,
                        userInfo: JSON.stringify(r)
                    }
                });
            },
            fail: o.fail
        });
    },
    exitRoom: function(o) {
        T.isCreator ? h(o) : p(o), T.isDestory = !0, T.roomID = "", T.pushers = [], T.mixedPlayURL = "", 
        T.roomInfo = "", x.pushURL = "", x.isCreator = !1;
    },
    sendRoomTextMsg: function(o) {
        if (!o || !o.data.msg || !o.data.msg.replace(/^\s*|\s*$/g, "")) return console.log("sendRoomTextMsg参数错误", o), 
        void (o.fail && o.fail({
            errCode: -9,
            errMsg: "sendRoomTextMsg参数错误"
        }));
        J.sendCustomMsg({
            data: '{"cmd":"CustomTextMsg","data":{"nickName":"' + x.userName + '","headPic":"' + x.userAvatar + '"}}',
            text: o.data.msg
        }, function() {
            o.success && o.success();
        });
    },
    setListener: function(o) {
        o ? (L.onGetPusherList = o.onGetPusherList || function() {}, L.onPusherJoin = o.onPusherJoin || function() {}, 
        L.onPusherQuit = o.onPusherQuit || function() {}, L.onRoomClose = o.onRoomClose || function() {}, 
        L.onRecvRoomTextMsg = o.onRecvRoomTextMsg || function() {}, L.onRecvJoinPusherRequest = o.onRecvJoinPusherRequest || function() {}, 
        L.onKickOut = o.onKickOut || function() {}, L.onRecvRoomCustomMsg = o.onRecvRoomCustomMsg || function() {}, 
        L.onSketchpadData = o.onSketchpadData || function() {}, L.onPushersChange = o.onPushersChange || function() {}) : console.log("setListener参数错误", o);
    },
    joinPusher: g,
    quitPusher: function(e) {
        f(), o({
            url: "delete_pusher",
            data: {
                roomID: T.roomID,
                userID: x.userID
            },
            success: function(o) {
                if (o.data.code) return console.log("退出推流失败:", o), void (e.fail && e.fail({
                    errCode: o.data.code,
                    errMsg: o.data.message + "[" + o.data.code + "]"
                }));
                console.log("退出推流成功"), T.roomID = "", T.pushers = [], e.success && e.success({});
            },
            fail: function(o) {
                if (console.log("退出推流失败:", o), "request:fail timeout" == o.errMsg) var r = -1, s = "网络请求超时，请检查网络状态";
                e.fail && e.fail({
                    errCode: r || -1,
                    errMsg: s || "退出房间失败"
                });
            }
        }), T.hasJoinPusher = !1;
    },
    requestJoinPusher: function(o) {
        var e = {
            cmd: "linkmic",
            data: {
                type: "request",
                roomID: T.roomID,
                userID: x.userID,
                userName: x.userName,
                userAvatar: x.userAvatar
            }
        };
        G = function(e) {
            E && (clearTimeout(E), E = null), e.errCode ? o.fail && o.fail(e) : o.success && o.success(e);
        };
        var r = !1;
        E = setTimeout(function() {
            E = null, console.error("申请连麦超时:", JSON.stringify(o.data)), r = !0, G && G({
                errCode: -999,
                errMsg: "申请加入连麦超时"
            });
        }, o.data && o.data.timeout ? o.data.timeout : 3e4);
        var s = {
            data: JSON.stringify(e)
        };
        J.sendC2CCustomMsg(T.roomCreator, s, function(o) {
            if (!r) return o && o.errCode ? (console.log("请求连麦失败:", JSON.stringify(o)), void (G && G(o))) : void 0;
        });
    },
    acceptJoinPusher: function(o) {
        var e = {
            cmd: "linkmic",
            data: {
                type: "response",
                result: "accept",
                message: "",
                roomID: T.roomID
            }
        }, r = {
            data: JSON.stringify(e)
        };
        J.sendC2CCustomMsg(o.data.userID, r, function(o) {});
    },
    rejectJoinPusher: function(o) {
        var e = {
            cmd: "linkmic",
            data: {
                type: "response",
                result: "reject",
                message: o.data.reason || "",
                roomID: T.roomID
            }
        }, r = {
            data: JSON.stringify(e)
        };
        J.sendC2CCustomMsg(o.data.userID, r, function(o) {});
    },
    kickoutSubPusher: function(o) {
        var e = {
            cmd: "linkmic",
            data: {
                type: "kickout",
                roomID: T.roomID
            }
        }, r = {
            data: JSON.stringify(e)
        };
        J.sendC2CCustomMsg(o.data.userID, r, function(e) {
            e && 0 == e.errCode ? o.success && o.success(e) : o.fail && o.fail(e);
        });
    },
    getAccountInfo: function() {
        return x;
    },
    setVideoRatio: function(o) {
        1 == o ? (w = 360, j = 640) : (w = 480, j = 640);
    },
    sendC2CCustomMsg: function(o) {
        var e = {
            cmd: o.cmd,
            data: {
                userID: x.userID,
                userName: x.userName,
                userAvatar: x.userAvatar,
                msg: o.msg || ""
            }
        }, r = {
            data: JSON.stringify(e)
        };
        J.sendC2CCustomMsg(o.toUserID ? o.toUserID : T.roomCreator, r, function(e) {
            if (e && e.errCode) return console.log("请求连麦失败:", JSON.stringify(e)), void (o.fail && o.fail(e));
            o.success && o.success({});
        });
    },
    getPushers: c
};