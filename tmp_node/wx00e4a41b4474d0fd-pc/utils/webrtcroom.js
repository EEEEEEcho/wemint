var e = {
    serverDomain: require("../config.js").webrtcServerUrl,
    requestNum: 0,
    heart: "",
    heartBeatReq: null,
    requestSeq: 0,
    requestTask: [],
    request: function(e) {
        var t = this;
        t.requestNum++;
        var r = wx.request({
            url: t.serverDomain + e.url,
            data: e.data || {},
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                if (t.data.code) return console.error("服务器请求失败, url=" + e.url + ", params = " + (e.data ? JSON.stringify(e.data) : "") + ", 错误信息=" + JSON.stringify(t)), 
                void (e.fail && e.fail({
                    errCode: t.data.code,
                    errMsg: t.data.message
                }));
                e.success && e.success(t);
            },
            fail: function(t) {
                console.error("请求失败, url=" + e.url + ", 错误信息=" + JSON.stringify(t)), e.fail && e.fail(t);
            },
            complete: e.complete || function() {
                t.requestNum--;
            }
        });
        return t.requestTask[t.requestSeq++] = r, r;
    },
    clearRequest: function() {
        for (var e = this, t = 0; t < e.requestSeq; t++) e.requestTask[t].abort();
        e.requestTask = [], e.requestSeq = 0;
    },
    getLoginInfo: function(e, t, r) {
        var a = this, s = {};
        e && (s.userID = e), a.request({
            url: "/get_login_info",
            data: s,
            success: t,
            fail: r
        });
    },
    getRoomList: function(e, t, r, a) {
        this.request({
            url: "/get_room_list",
            data: {
                index: e,
                count: t
            },
            success: r,
            fail: a
        });
    },
    createRoom: function(e, t, r, a) {
        this.request({
            url: "/create_room",
            data: {
                userID: e,
                roomInfo: t
            },
            success: function(e) {
                r && r(e);
            },
            fail: a
        });
    },
    enterRoom: function(e, t, r, a) {
        this.request({
            url: "/enter_room",
            data: {
                userID: e,
                roomID: t
            },
            success: function(e) {
                r && r(e);
            },
            fail: a
        });
    },
    quitRoom: function(e, t, r, a) {
        var s = this;
        s.request({
            url: "/quit_room",
            data: {
                userID: e,
                roomID: t
            },
            success: r,
            fail: a
        }), s.stopHeartBeat();
    },
    startHeartBeat: function(e, t, r, a) {
        var s = this;
        s.heart = "1", s.heartBeat(e, t, r, a);
    },
    stopHeartBeat: function() {
        var e = this;
        e.heart = "", e.heartBeatReq && (e.heartBeatReq.abort(), e.heartBeatReq = null);
    },
    heartBeat: function(e, t, r, a) {
        var s = this;
        s.heart ? s.heartBeatReq = s.request({
            url: "/heartbeat",
            data: {
                userID: e,
                roomID: t
            },
            success: function(u) {
                s.heart && (console.log("心跳成功"), r && r(u), setTimeout(function() {
                    s.heartBeat(e, t, r, a);
                }, 7e3));
            },
            fail: function(u) {
                a && a(u), s.heart && setTimeout(function() {
                    s.heartBeat(e, t, r, a);
                }, 7e3);
            }
        }) : s.clearRequest();
    }
};

module.exports = e;