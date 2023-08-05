function o(o) {
    if (!N) return console.log("请求服务器域名为空，请将wxlite/config里面的url配置成你的服务器域名"), void (o.fail && o.fail({
        errCode: -9,
        errMsg: "请求服务器域名为空，请将wxlite/config里面的url配置成你的服务器域名"
    }));
    L++;
    var r = N + o.url + (o.params ? "?" + e(o.params) + "&" : "?") + "userID=" + T.userID + (T.token ? "&token=" + T.token : "");
    "pusher_heartbeat" != o.url && console.log("请求url：", r), k[b++] = wx.request({
        url: N + o.url + (o.params ? "?" + e(o.params) + "&" : "?") + "userID=" + T.userID + (T.token ? "&token=" + T.token : ""),
        data: o.data || {},
        method: "POST",
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            if (o.success && o.success(e), e.data.code) {
                var t = -Math.abs(e.data.code);
                switch (o.url) {
                  case "get_push_url":
                    S.globalData.dataJson += JSON.stringify({
                        get_pushers: t,
                        url: r
                    }), C.setReportData({
                        int64_tc_get_pushers: t
                    });
                    break;

                  case "add_pusher":
                    S.globalData.dataJson += JSON.stringify({
                        add_pusher: t,
                        url: r
                    }), C.setReportData({
                        int64_tc_add_pusher: t
                    });
                }
                -1 == j.indexOf(o.url) && (console.error("逻辑失败上报：", o.url), C.report());
            }
        },
        fail: function(e) {
            o.fail && o.fail(e), -1 == j.indexOf(o.url) && (S.globalData.dataJson += JSON.stringify({
                "请求失败上报：url": r
            }), console.error("请求失败上报：", o.url), C.report());
        },
        complete: o.complete || function() {
            L--;
        }
    });
}

function e(o) {
    var e = [];
    for (var r in o) e.push(encodeURIComponent(r) + "=" + encodeURIComponent(o[r]));
    return e.join("&");
}

function r(o) {
    x.isDestory = !0, w.onRoomClose({});
}

function t(o) {
    console.error("***rtcroom-Group-收到系统通知：", o.UserDefinedField);
    var e = JSON.parse(o.UserDefinedField);
    !x.isDestory && e && "notifyPusherChange" == e.cmd && l();
}

function s(o) {
    console.log("***rtcroom-onBigGroupMsgNotify-by-zjs***"), v.onBigGroupMsgNotify(o, function(o) {
        u(o);
    });
}

function a(o) {
    R.setListener({
        onDestoryGroupNotify: r,
        onCustomGroupNotify: t,
        onBigGroupMsgNotify: s,
        onLoginSuccess: n
    }), R.loginIM({
        type: 1,
        adviserId: T.selToID,
        callback: o
    }), console.log("###loginIM rtcroom.js 321行### websdkappid=537048168 is web im sdk 版本 APPID", T);
}

function n(o) {
    console.log("***3rtcroom.jsIM登录成功", o), S.globalData.notifyUnReadMsgs = !0;
}

function i(o) {
    if (o.errCode) {
        console.log("IM进群失败: ", o), o.callback.fail && o.callback.fail({
            errCode: -2,
            errMsg: "IM进群失败"
        });
        var e = -Math.abs(o.errCode);
        return C.setReportData({
            int64_tc_join_group: e
        }), void C.report();
    }
    console.log("进入IM房间成功: ", x.roomID), o.callback.success && o.callback.success({}), 
    C.setReportData({
        int64_tc_join_group: +new Date() - A.join_group_srart
    });
}

function u(o) {
    if (o.content) {
        if (console.log("IM消息: ", o), "@TIM#SYSTEM" == o.fromAccountNick) o.fromAccountNick = "", 
        o.content = o.content.split(";"), o.content = o.content[0], o.time = ""; else {
            var e = new Date(), r = e.getHours() + "", t = e.getMinutes() + "", s = e.getSeconds() + "";
            1 == r.length && (r = "0" + r), 1 == t.length && (t = "0" + t), 1 == s.length && (s = "0" + s), 
            e = r + ":" + t + ":" + s, o.time = e;
            var a, n;
            if (n = o.content.split("}}"), "CustomTextMsg" == (a = JSON.parse(n[0] + "}}")).cmd) {
                o.nickName = a.data.nickName, o.headPic = a.data.headPic;
                for (var i = "", u = 1; u < n.length; u++) u == n.length - 1 ? i += n[u] : i += n[u] + "}}";
                o.content = i;
            }
        }
        w.onRecvRoomTextMsg({
            roomID: x.roomID,
            userID: o.fromAccountNick,
            nickName: o.nickName,
            headPic: o.headPic,
            textMsg: o.content,
            time: o.time
        });
    }
}

function c(o) {
    if (!o) return console.log("sendRoomTextMsg参数错误", o), void (o.fail && o.fail({
        errCode: -9,
        errMsg: "sendRoomTextMsg参数错误"
    }));
    "1" == o.typedata.flag ? v.sendCustomMsg(o.data, o.typedata, "", function() {
        o.success && o.success();
    }) : "3" == o.typedata.flag ? v.onSendMsg(o.data.msg, o.typedata, function() {
        o.success && o.success();
    }) : v.sendCustomMsg({
        data: '{"cmd":"CustomTextMsg","data":{"nickName":"' + T.userName + '","headPic":"' + T.userAvatar + '"}}',
        text: o.data.msg
    }, function() {
        o.success && o.success();
    });
}

function l() {
    A.get_pushers_start = +new Date(), m({
        data: {
            roomID: x.roomID
        },
        success: function(o) {
            var e = [], r = [], t = 0;
            console.log("去重操作"), console.log("旧", x.pushers), console.log("新", o.pushers), o.pushers.forEach(function(o) {
                t = 0, x.pushers.forEach(function(e) {
                    o.userID == e.userID && (t = 1);
                }), t || e.push(o), t = 0;
            }), x.pushers.forEach(function(e) {
                t = 0, o.pushers.forEach(function(o) {
                    e.userID == o.userID && (t = 1);
                }), t || r.push(e), t = 0;
            }), x.roomID = o.roomID, x.roomInfo = o.roomInfo, x.roomCreator = o.roomCreator, 
            x.pushers = o.pushers, e.length && (console.log("进房:", JSON.stringify(e)), w.onPusherJoin({
                pushers: e
            })), r.length && (console.log("退房:", JSON.stringify(r), "有人房间"), w.onPusherQuit({
                pushers: r
            })), A.get_pushers_end = +new Date(), C.setReportData({
                str_room_creator: x.roomCreator,
                int64_tc_get_pushers: +new Date() - A.get_pushers_start
            });
        },
        fail: function(o) {
            C.setReportData({
                int64_tc_get_pushers: -Math.abs(o.errCode)
            }), C.report();
        }
    });
}

function d(o) {
    o && setTimeout(function() {
        f();
    }, 3e3), P && setTimeout(function() {
        f(), d();
    }, 7e3);
}

function f() {
    o({
        url: "pusher_heartbeat",
        data: {
            roomID: x.roomID,
            userID: T.userID
        },
        success: function(o) {
            o.data.code && console.log("心跳失败：", o);
        },
        fail: function(o) {
            console.log("心跳失败：", o);
        }
    });
}

function g() {
    P = !1;
}

function m(e) {
    if (!e) return console.log("getPushers参数错误", e), void (e.fail && e.fail({
        errCode: -9,
        errMsg: "getPushers参数错误"
    }));
    console.log("******", e), o({
        url: "get_pushers",
        data: {
            roomID: e.data.roomID
        },
        success: function(o) {
            if (o.data.code) return console.log("拉取所有主播信息失败: ", o), void (e.fail && e.fail({
                errCode: o.data.code,
                errMsg: o.data.message + "[" + o.data.code + "]"
            }));
            var r = [], t = 0;
            console.log("拉取所有主播信息成功", o.data, M(o.data.pushersMap));
            for (var s in o.data.pushersMap) {
                var a = o.data.pushersMap[s];
                a.userID != T.userID ? r.push(a) : t = 1;
            }
            console.log("拉取所有主播信息成功", r), !e.type || t ? e.success && e.success({
                roomID: o.data.roomID,
                roomInfo: o.data.roomInfo,
                roomCreator: o.data.roomCreator,
                mixedPlayURL: o.data.mixedPlayURL,
                pushers: r
            }) : e.fail && e.fail({
                errCode: -1,
                errMsg: "你已退出"
            });
        },
        fail: function(o) {
            if ("request:fail timeout" == o.errMsg) var r = -1, t = "网络请求超时，请检查网络状态";
            e.fail && e.fail({
                errCode: r || -1,
                errMsg: t || "获取主播信息失败"
            });
        }
    });
}

function p(e) {
    console.log(e), o({
        url: "create_room",
        data: {
            userID: T.userID,
            roomID: x.roomID,
            roomInfo: x.roomInfo
        },
        success: function(o) {
            return e.data.roomID = x.roomID, o.data.code ? (console.log("创建房间失败:", o), void (e.fail && e.fail({
                errCode: o.data.code,
                errMsg: o.data.message + "[" + o.data.code + "]"
            }))) : (x.roomID = o.data.roomID, x.roomCreator = T.userID, console.log("&&&&&&&proto_createRoom创建房间成功&&&&&", x.roomID, o), 
            x.isDestory ? (console.log("***======roomInfo.isDestory by proto_createRoom rtcroom.js***"), 
            void _({})) : void (e.success && e.success({
                roomID: x.roomID
            })));
        },
        fail: function(o) {
            if (console.log("创建后台房间失败:", o), "request:fail timeout" == o.errMsg) var r = -1, t = "网络请求超时，请检查网络状态";
            e.fail && e.fail({
                errCode: r || -3,
                errMsg: t || "创建房间失败"
            });
        }
    });
}

function D(o) {
    if (!o || !o.data.roomID || !o.data.pushURL) return console.log("joinPusher参数错误", o), 
    void (o.fail && o.fail({
        errCode: -9,
        errMsg: "joinPusher参数错误"
    }));
    x.roomID = o.data.roomID, x.roomInfo = o.data.roomInfo, I(o);
}

function I(e) {
    A.join_group_srart = +new Date(), A.add_pusher_start = +new Date(), o({
        url: "add_pusher",
        data: {
            roomID: x.roomID,
            roomInfo: x.roomInfo,
            userID: T.userID,
            userName: T.userName,
            userAvatar: T.userAvatar,
            pushURL: e.data.pushURL
        },
        success: function(o) {
            if (o.data.code) return console.log("进入房间失败:", o), void (e.fail && e.fail({
                errCode: o.data.code,
                errMsg: o.data.message + "[" + o.data.code + "]"
            }));
            console.log("加入推流成功"), C.setReportData({
                int64_tc_add_pusher: +new Date() - A.add_pusher_start,
                int64_ts_add_pusher: +new Date()
            }), P = !0, d(1), console.log("*****proto_joinPusher 928 rtcroom.js ****", x), h(), 
            v.applyJoinBigGroup(x.roomID, i, {
                success: function() {
                    x.isPush = !0, e.success && e.success({});
                },
                fail: function() {
                    e.fail;
                }
            }), l();
        },
        fail: function(o) {
            if (console.log("进入房间失败:", o), "request:fail timeout" == o.errMsg) var r = -1, t = "网络请求超时，请检查网络状态";
            e.fail && e.fail({
                errCode: r || -4,
                errMsg: t || "进入房间失败"
            });
        }
    });
}

function h() {
    var o = "";
    "string" == typeof S.globalData.phone ? o = S.globalData.phone : "object" === M(S.globalData.phone) && S.globalData.phone && S.globalData.phone.phone && (o = S.globalData.phone.phone);
    var e = {
        csyzwfelab20180425hhhdfq: "secretkey",
        param: {
            consultantName: T.opt.name || T.opt.username,
            currentTime: Date.now(),
            roomNum: x.roomID,
            customerId: T.userSplitID,
            customerGender: T.gender,
            customerLoginId: T.loginid,
            customerMobile: o,
            customerNickname: T.userName,
            customerAvatar: T.userAvatar
        },
        type: 512,
        typedesc: "发起视频看房请求"
    };
    console.log("*****callVideo-sendComment*****", JSON.stringify(e), T.selToID);
    var r = {
        flag: "1",
        myselToID: T.selToID
    };
    c({
        data: {
            text: "客户" + T.userName + "发起视频看房请求",
            ext: JSON.stringify(e),
            msg: JSON.stringify(e),
            data: ""
        },
        typedata: {
            TYPE: y.SESSION_TYPE.C2C,
            myselToID: r.myselToID || "",
            flag: r.flag
        }
    });
}

function _(e) {
    if (g(), !x.isDestory) {
        x.isDestory = !0;
        x.roomCreator;
        console.log(x), x.roomID && o({
            url: "delete_pusher",
            data: {
                roomID: x.roomID,
                userID: T.userID
            },
            success: function(o) {
                if (o.data.code) return console.error("退出房间失败:", o), console.error("退房信息: roomID:" + x.roomID + ", userID:" + T.userID), 
                void (e.fail && e.fail({
                    errCode: o.data.code,
                    errMsg: o.data.message + "[" + o.data.code + "]"
                }));
                console.log("退出推流成功"), e.success && e.success({});
            },
            fail: function(o) {
                console.log("退出房间失败:", o);
                var r = o.errCode || -1, t = o.errMsg || "退出房间失败";
                "request:fail timeout" == o.errMsg && (r = -1, t = "网络请求超时，请检查网络状态"), e.fail && e.fail({
                    errCode: r,
                    errMsg: t
                });
            }
        }), console.log("***webimhandler.quitBigGroup***", e), v.quitBigGroup(e.roomID), 
        v.destroyGroup(e.roomID), x.roomID = "", x.pushers = [], x.mixedPlayURL = "", x.roomInfo = "", 
        T.pushURL = "", T.isCreator = !1;
    }
}

var M = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
}, y = require("webim_wx.js"), v = require("webim_handler.js"), R = require("IM_init.js"), C = (require("tls.js"), 
require("encrypt.js"), require("report.js")), S = getApp(), N = (require("./util.js"), 
require("../config.js"), ""), P = "", b = 0, k = [], T = {
    userID: "",
    userName: "",
    userAvatar: "",
    userSig: "",
    sdkAppID: "",
    accountType: "",
    accountMode: 0,
    token: ""
}, x = {
    roomID: "",
    roomCreator: "",
    roomInfo: "",
    mixedPlayURL: "",
    pushers: [],
    isDestory: !1,
    isPush: !1
}, w = {
    onGetPusherList: function() {},
    onPusherJoin: function() {},
    onPusherQuit: function() {},
    onRoomClose: function() {},
    onRecvRoomTextMsg: function() {}
}, L = 0, j = [ "pusher_heartbeat", "get_room_list", "create_room", "delete_pusher", "get_pushers", "" ], A = {
    join_group_srart: 0,
    get_pushers_start: 0,
    get_pushers_end: 0,
    get_pushurl_start: 0,
    add_pusher_start: 0
};

module.exports = {
    login: function(e) {
        if (x.isPush = !1, !e || !e.data.serverDomain) return console.log("init参数错误", e), 
        void (e.fail && e.fail({
            errCode: -9,
            errMsg: "init参数错误"
        }));
        N = e.data.serverDomain, T.userID = e.data.userID, T.loginid = e.data.loginid, T.userSplitID = e.data.userSplitID, 
        T.userSig = e.data.userSig, T.sdkAppID = e.data.sdkAppID, T.accountType = e.data.accType, 
        T.userName = e.data.userName, T.userAvatar = e.data.userAvatar || "123", T.gender = e.data.gender || "1", 
        T.selToID = e.data.selToID, T.opt = e.data.opt, e.data.userSig || (console.log("***userSig***", e.data.userSig), 
        wx.navigateTo({
            url: "../../index/index"
        })), o({
            url: "login",
            params: {
                accountType: T.accountType,
                sdkAppID: T.sdkAppID,
                userSig: T.userSig
            },
            method: "POST",
            data: {},
            success: function(o) {
                if (console.log("####login###", o), console.log("####login###", T), o.data.code || 0 == o.data.success) return console.error("登录到RoomService后台失败:", JSON.stringify(o)), 
                void (e.fail && e.fail({
                    errCode: o.data.code || o.data.errorCode,
                    errMsg: o.data.message
                }));
                T.token = o.data.token, T.userID = o.data.userID, a({
                    success: function(o) {
                        console.log("####IM###", o), e.success && e.success({
                            userID: T.userID,
                            userAvatar: T.userAvatar,
                            userName: T.userName
                        });
                    },
                    fail: function(o) {
                        wx.showModal({
                            title: "IM登录失败",
                            content: o.errMsg,
                            showCancel: !1
                        }), console.error("IM登录失败:", JSON.stringify(o)), e.fail && e.fail({
                            errCode: -999,
                            errMsg: "IM登录失败"
                        });
                    }
                });
            },
            fail: function(o) {
                wx.showModal({
                    title: "1登录到RoomService后台失败1",
                    content: o.errMsg,
                    showCancel: !1
                }), console.error("登录到RoomService后台失败:", JSON.stringify(o)), e.fail && e.fail(o);
            }
        });
    },
    loginIM: a,
    logout: function() {
        o({
            url: "logout",
            success: function(o) {},
            fail: function(o) {}
        }), N = "", T.userID = "", T.userSig = "", T.sdkAppID = "", T.accountType = "", 
        T.userName = "", T.userAvatar = "", T.token = "", v.logout();
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
                if (console.log("获取房间列表失败: ", o), "request:fail timeout" == o.errMsg) var r = -1, t = "网络请求超时，请检查网络状态";
                e.fail && e.fail({
                    errCode: r || -1,
                    errMsg: t || "获取房间列表失败"
                });
            }
        });
    },
    getPushURL: function(e) {
        if (!e) return console.log("getPushURL参数错误", e), void (e.fail && e.fail({
            errCode: -9,
            errMsg: "getPushURL参数错误"
        }));
        C.setReportData({
            int64_ts_enter_room: +new Date()
        }), A.get_pushurl_start = +new Date();
        var r = {};
        e.data.roomID ? (r.roomID = e.data.roomID, r.userID = T.userID) : r.userID = T.userID, 
        o({
            url: "get_push_url",
            data: r,
            success: function(o) {
                if (o.data.code) return console.log("获取推流地址失败: ", o), void (e.fail && e.fail({
                    errCode: o.data.code,
                    errMsg: o.data.message + "[" + o.data.code + "]"
                }));
                C.setReportData({
                    int64_tc_get_pushurl: +new Date() - A.get_pushurl_start
                }), console.log("获取推流地址成功：", o.data.pushURL), e.success && e.success({
                    pushURL: o.data.pushURL
                });
            },
            fail: function(o) {
                if ("request:fail timeout" == o.errMsg) var r = -1, t = "网络请求超时，请检查网络状态";
                e.fail && e.fail({
                    errCode: r || -3,
                    errMsg: t || "获取推流地址失败"
                });
            }
        });
    },
    createRoom: function(o) {
        if (x.isDestory = !1, !o) return console.log("createRoom参数错误", o), void (o.fail && o.fail({
            errCode: -9,
            errMsg: "createRoom参数错误"
        }));
        x.roomInfo = o.data.roomInfo.roomName || "", x.roomID = o.data.roomInfo.roomID || "", 
        x.pushers = [], p(o);
    },
    getPushers: m,
    enterRoom: function(o) {
        console.log("***enterRoom***", x.isPush), x.isDestory = !1, C.setReportData({
            str_roomid: o.data.roomID,
            str_userid: T.userID
        }), D(o);
    },
    exitRoom: _,
    sendRoomTextMsg: c,
    setListener: function(o) {
        o ? (w.onGetPusherList = o.onGetPusherList || function() {}, w.onPusherJoin = o.onPusherJoin || function() {}, 
        w.onPusherQuit = o.onPusherQuit || function() {}, w.onRoomClose = o.onRoomClose || function() {}, 
        w.onRecvRoomTextMsg = o.onRecvRoomTextMsg || function() {}) : console.log("setListener参数错误", o);
    },
    getAccountInfo: function() {
        return T;
    },
    getRoomInfo: function() {
        return x;
    }
};