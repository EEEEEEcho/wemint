function o(o) {
    if (o && o.errCode) return console.log("***IM登录失败-init:", o), void (o.fail && o.fail({
        errCode: -2,
        errMsg: "IM登录失败，如果你是在配置线上环境，请将IM域名[https://webim.tim.qq.com]配置到小程序request合法域名"
    }));
    console.log("***IM登录成功-IM-init-afterLoginIM***", o);
    var n = e.MsgStore.sessMap();
    console.log(n), i.globalData.globalWebimhandler = t, o && o.callback && o.callback.success && o.callback.success(), 
    u.onLoginSuccess && u.onLoginSuccess();
}

var n, e = require("webim_wx.js"), t = require("webim_handler.js"), i = getApp(), s = require("../config.js"), c = {
    sdkappid: s.sdkAppID,
    accountType: s.accType,
    accountMode: 0
}, u = {
    onGetPusherList: function() {},
    onPusherJoin: function() {},
    onPusherQuit: function() {},
    onRoomClose: function() {},
    onRecvRoomTextMsg: function() {},
    onMsgNotify: function() {},
    onDestoryGroupNotify: function() {},
    onCustomGroupNotify: function() {},
    onLoginSuccess: function() {},
    onBigGroupMsgNotify: function() {}
};

module.exports = {
    loginIM: function(a) {
        i = getApp(), n = a.adviserId;
        var r = {
            sdkAppID: c.sdkappid,
            appIDAt3rd: c.sdkappid,
            accountType: c.accountType,
            identifier: i.globalData.identifier,
            identifierNick: i.globalData.single.nickname || "小程序用户",
            userSig: i.globalData.userSig
        }, l = {
            5: function(o) {
                u.onDestoryGroupNotify();
            },
            11: t.onRevokeGroupNotify,
            255: function(o) {
                console.error("***IM-init***收到系统通知：", o.UserDefinedField), u.onCustomGroupNotify(o);
            }
        }, g = {
            isAccessFormalEnv: !0,
            isLogOn: !1
        };
        if (console.log("***1IM-init-loginInfo***", r, a), i.globalData.globalWebimhandler) i.globalData.globalWebimhandler.init({
            accountMode: c.accountMode,
            accountType: c.accType,
            sdkAppID: c.sdkAppID,
            avChatRoomId: a.roomID || 0,
            selType: a.type && 1 == a.type ? e.SESSION_TYPE.GROUP : e.SESSION_TYPE.C2C,
            selToID: a.adviserId || 0,
            selSess: null
        }), a && a.callback && a.callback.success && a.callback.success(), u.onLoginSuccess && u.onLoginSuccess(); else {
            t.init({
                accountMode: c.accountMode,
                accountType: c.accType,
                sdkAppID: c.sdkAppID,
                avChatRoomId: a.roomID || 0,
                selType: a.type && 1 == a.type ? e.SESSION_TYPE.GROUP : e.SESSION_TYPE.C2C,
                selToID: a.adviserId || 0,
                selSess: null
            });
            var f = {
                onConnNotify: function(o) {
                    switch (o.ErrorCode) {
                      case e.CONNECTION_STATUS.ON:
                        break;

                      case e.CONNECTION_STATUS.OFF:
                        e.Log.warn("连接已断开，无法收到新消息，请检查下你的网络是否正常");
                        break;

                      default:
                        e.Log.error("未知连接状态,status=" + o.ErrorCode);
                    }
                },
                onBigGroupMsgNotify: function(o) {
                    u.onBigGroupMsgNotify(o);
                },
                onMsgNotify: function(o) {
                    if (o[0].fromAccountNick === i.globalData.single.id + "_" + s.houseId) return !1;
                    console.log("***IM_init-onMsgNotify-by-zjs***", o), t.onMsgNotify(o, function(o) {
                        console.log("***IM_init-onMsgNotify-by-zjs2***", o);
                        var n = wx.getStorageSync("unReadMsgs") || {};
                        n.total = n.total ? n.total : 0, n.total++;
                        var e = getCurrentPages();
                        n[o.fromAccountNick] ? (n[o.fromAccountNick]++, console.log(n[o.fromAccountNick], "今天你增加了吗")) : n[o.fromAccountNick] = 1, 
                        console.log("未读计数增加", n), wx.setStorageSync("unReadMsgs", n), e.forEach(function(o, e) {
                            if (o.data.unReadMsgNumber || 0 === o.data.unReadMsgNumber) {
                                var t = n.total;
                                console.log("首页增加", n), t > 99 && (t = "99+"), o.setData({
                                    unReadMsgNumber: t || 1
                                });
                            }
                            o.refreshNumber && "function" == typeof o.refreshNumber && (console.log("户型图集增加", n), 
                            o.refreshNumber());
                        }), u.onMsgNotify(o);
                    });
                },
                onGroupSystemNotifys: l,
                onGroupInfoChangeNotify: t.onGroupInfoChangeNotify
            };
            a.callback ? (console.log("###loginIM IM_init.js 121行###537048168 is web im sdk 版本 APPID options.callback"), 
            t.sdkLogin(r, f, g, o, a)) : (console.log("###loginIM IM_init.js 121行###537048168 is web im sdk 版本 APPID"), 
            t.sdkLogin(r, f, g, o));
        }
    },
    logout: function() {
        t.logout(), i.globalData.globalWebimhandler = null;
    },
    setListener: function(o) {
        o ? (u.onGetPusherList = o.onGetPusherList || function() {}, u.onPusherJoin = o.onPusherJoin || function() {}, 
        u.onPusherQuit = o.onPusherQuit || function() {}, u.onRoomClose = o.onRoomClose || function() {}, 
        u.onRecvRoomTextMsg = o.onRecvRoomTextMsg || function() {}, u.onMsgNotify = o.onMsgNotify || function() {}, 
        u.onDestoryGroupNotify = o.onDestoryGroupNotify || function() {}, u.onCustomGroupNotify = o.onCustomGroupNotify || function() {}, 
        u.onLoginSuccess = o.onLoginSuccess || function() {}, u.onBigGroupMsgNotify = o.onBigGroupMsgNotify || function() {}) : console.log("setListener参数错误", o);
    }
};