var e = require("../../../utils/rtcroom.js"), t = require("../../../utils/webim_wx.js"), a = require("../../../utils/report.js"), s = getApp();

Component({
    properties: {
        roomID: {
            type: String,
            value: ""
        },
        roomInfo: {
            type: String,
            value: ""
        },
        template: {
            type: String,
            value: "",
            observer: function(e, t) {
                this.init(e);
            }
        },
        beauty: {
            type: String,
            value: 5
        },
        aspect: {
            type: String,
            value: "3:4"
        },
        minBitrate: {
            type: Number,
            value: 200
        },
        maxBitrate: {
            type: Number,
            value: 400
        },
        muted: {
            type: Boolean,
            value: !1
        },
        debug: {
            type: Boolean,
            value: !1
        },
        assistant: {
            type: Object,
            value: null
        },
        hideBg: {
            type: Boolean,
            value: !1
        },
        houseBgImg: {
            type: String,
            value: "http://skyforest.static.elab-plus.com/wepy_pro/mini-wait.jpg"
        },
        flag: {
            type: Boolean,
            value: !1
        },
        flagStatus: {
            type: Number,
            value: 1
        },
        startTime: {
            type: String,
            value: ""
        }
    },
    data: {
        pusherContext: "",
        tipsWord: "通话中",
        hasPushStarted: !1,
        pushURL: "",
        members: [ {}, {}, {} ],
        maxMembers: 3,
        self: {},
        hasExitRoom: !0,
        push_stream_start: 0,
        push_stream_tap: 0,
        push_info: "",
        play_stream_start: 0,
        play_stream_end: 0,
        play_stream_tap: 0,
        play_info: "",
        ERROR_GET_PUSH_URL: -1,
        ERROR_CREATE_ROOM: -2,
        ERROR_ENTER_ROOM: -3,
        ERROR_OPEN_CAMERA: -4,
        ERROR_OPEN_MIC: -5,
        ERROR_PUSH_DISCONNECT: -6,
        ERROR_CAMERA_MIC_PERMISSION: -7,
        ERROR_REACH_MAX_MEMBERS: -8
    },
    ready: function() {
        this.data.pusherContext || (this.data.pusherContext = wx.createLivePusherContext("rtcpusher")), 
        self = this, console.log("***ready***", self.data.assistant);
    },
    detached: function() {
        console.log("组件 detached"), self.exitRoom();
    },
    onUnload: function() {
        self.data.pusherContext && self.data.pusherContext.stop(), self.data.playerContext && self.data.playerContext.stop();
    },
    methods: {
        init: function(e) {
            switch (self = this, e) {
              case "1v3":
                this.setData({
                    maxMembers: 3,
                    members: [ {}, {}, {} ],
                    template: e
                });
                break;

              case "1v1":
                this.setData({
                    maxMembers: 1,
                    members: [ {} ],
                    template: e
                });
            }
        },
        start: function(t) {
            self = this, self.data.hasExitRoom = !1, e.setListener({
                onPusherJoin: self.onPusherJoin,
                onPusherQuit: self.onPusherQuit,
                onRoomClose: self.onRoomClose,
                onPush: self.onPush,
                onRecvRoomTextMsg: self.onRecvRoomTextMsg
            }), self.createRoom(t);
        },
        stop: function() {
            self.data.hasExitRoom = !0, console.log("组件停止"), self.exitRoom();
        },
        pause: function() {
            self.data.pusherContext || (self.data.pusherContext = wx.createLivePusherContext("rtcpusher")), 
            self.data.pusherContext && self.data.pusherContext.pause(), self.data.members.forEach(function(e) {
                e.playerContext && e.playerContext.pause();
            });
        },
        resume: function() {
            self.data.pusherContext || (self.data.pusherContext = wx.createLivePusherContext("rtcpusher")), 
            self.data.pusherContext && self.data.pusherContext.resume(), self.data.members.forEach(function(e) {
                e.playerContext && e.playerContext.resume();
            });
        },
        switchCamera: function() {
            self.data.pusherContext || (self.data.pusherContext = wx.createLivePusherContext("rtcpusher")), 
            self.data.pusherContext && self.data.pusherContext.switchCamera({});
        },
        sendTextMsg: function(a, s) {
            a && (3 == s.flag ? e.sendRoomTextMsg({
                data: {
                    text: "ceshi2",
                    msg: a,
                    ext: a
                },
                typedata: {
                    TYPE: t.SESSION_TYPE.C2C,
                    myselToID: s.myselToID || "",
                    flag: s.flag
                }
            }) : e.sendRoomTextMsg({
                data: {
                    text: "ceshi2",
                    data: a,
                    ext: a
                },
                typedata: {
                    TYPE: t.SESSION_TYPE.C2C,
                    myselToID: s.myselToID || "",
                    flag: s.flag
                }
            }));
        },
        getAccountInfo: function() {
            var t = e.getAccountInfo();
            return {
                userID: t.userID,
                userName: t.userName,
                userAvatar: t.userAvatar,
                userSig: t.userSig,
                sdkAppID: t.sdkAppID,
                accountType: t.accountType,
                accountMode: t.accountMode,
                token: t.token
            };
        },
        getRoomInfo: function() {
            var t = e.getRoomInfo();
            return {
                roomID: t.roomID,
                roomCreator: t.roomCreator,
                roomInfo: t.roomInfo,
                mixedPlayURL: t.mixedPlayURL,
                pushers: t.pushers,
                isDestory: t.isDestory
            };
        },
        createRoom: function(t) {
            var a = {
                roomID: self.data.roomID,
                roomName: self.data.roomInfo
            };
            console.log("********creatroom********", a), e.createRoom({
                data: {
                    roomInfo: a
                },
                success: function(e) {
                    self.data.roomID = e.roomID, console.log("创建房间成功，房间号：", e.roomID, self.data.roomID), 
                    self.getPushURLAndStartPush(self.data.roomID, t);
                },
                fail: function(e) {
                    console.error("创建房间失败:", e), self.exitRoom(), self.postErrorEvent(self.data.ERROR_CREATE_ROOM, "创建房间失败[" + e.errMsg + "(" + e.errCode + ")]");
                }
            });
        },
        enterRoom: function() {
            e.enterRoom({
                data: {
                    roomID: self.data.roomID,
                    pushURL: self.data.pushURL,
                    roomInfo: self.data.roomInfo
                },
                success: function(e) {
                    console.log("进房成功");
                },
                fail: function(e) {
                    console.error("进房失败:", e), self.exitRoom(), self.postErrorEvent(self.data.ERROR_ENTER_ROOM, "进入房间失败[" + e.errMsg + "(" + e.errCode + ")]");
                }
            });
        },
        exitRoom: function(t) {
            self.data.pusherContext || (self.data.pusherContext = wx.createLivePusherContext("rtcpusher")), 
            self.data.pusherContext && self.data.pusherContext.stop && self.data.pusherContext.stop(), 
            self.data.members.forEach(function(e) {
                e.playerContext && e.playerContext.stop();
            });
            for (var a = 0; a < self.data.maxMembers; a++) self.data.members[a] = {};
            self.setData({
                members: self.data.members
            }), e.exitRoom({
                roomID: self.data.roomID
            }), t && self.postEvent("roomClosed", 0, "");
        },
        postErrorEvent: function(e, t) {
            self.postEvent("error", e, t);
        },
        postEvent: function(e, t, a) {
            self.triggerEvent("onRoomEvent", {
                tag: e,
                code: t,
                detail: a
            }, {});
        },
        getPushURLAndStartPush: function(t, a) {
            var s = {};
            t && (s.roomID = t), e.getPushURL({
                data: s,
                success: function(e) {
                    console.log("==========###getPushURLAndStartPush###", e), self.data.hasExitRoom || (self.data.hasPushStarted = !1, 
                    self.setData({
                        push_stream_start: +new Date(),
                        push_stream_tap: +new Date(),
                        pushURL: e.pushURL
                    })), "function" == typeof a && a(t);
                },
                fail: function(e) {
                    console.error("获取推流地址失败:", JSON.stringify(e)), self.postErrorEvent(self.data.ERROR_GET_PUSH_URL, "获取推流地址失败[" + e.errMsg + "(" + e.errCode + ")]");
                }
            });
        },
        onPusherJoin: function(e) {
            self.data.play_stream_start || (self.data.play_stream_start = +new Date(), self.data.play_stream_tap = +new Date()), 
            console.log("####***拉流开始时间戳***###", self.data.play_stream_start), e.pushers.forEach(function(e) {
                for (var t = -1, a = !1, s = 0; self.data.members && s < self.data.members.length; s++) self.data.members[s].userID && self.data.members[s].userID == e.userID ? a = !0 : self.data.members[s].userID || -1 != t || (t = s);
                a || -1 == t || (e.loading = !1, e.playerContext = wx.createLivePlayerContext(e.userID), 
                self.data.members[t] = e);
            }), self.setData({
                members: self.data.members
            });
        },
        onPusherQuit: function(e) {
            e.pushers.forEach(function(e) {
                for (var t = 0; t < self.data.maxMembers; t++) self.data.members[t].userID == e.userID && (self.data.members[t] = {});
            }), self.setData({
                members: self.data.members
            });
        },
        onRoomClose: function() {
            console.log("房间解散"), self.exitRoom(!0);
        },
        onRecvRoomTextMsg: function(e) {
            if (console.log("***111***", e), e.textMsg && e.textMsg.startsWith("{")) try {
                var t = JSON.parse(e.textMsg);
                console.log("=====textMsg=====", t), t && t.type && (300 == t.type || "300" == t.type) && (self.data.tipsWord = "正在转接请稍后", 
                self.setData({
                    tipsWord: self.data.tipsWord
                }), console.log("=====setData1=====", self.data.tipsWord)), t && t.type && (301 == t.type || "301" == t.type) && (self.data.tipsWord = "通话中", 
                self.setData({
                    tipsWord: self.data.tipsWord
                }), console.log("=====setData2=====", self.data.tipsWord)), t && t.type && (302 == t.type || "302" == t.type) && (self.data.tipsWord = "通话中", 
                self.setData({
                    tipsWord: self.data.tipsWord
                }), console.log("=====setData2=====", self.data.tipsWord));
            } catch (e) {
                e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                console.log("***onRecvRoomTextMsg-try-Error***", e);
            }
            self.postEvent("recvTextMsg", 0, JSON.stringify(e));
        },
        onPush: function(e) {
            self.data.pusherContext || (self.data.pusherContext = wx.createLivePusherContext("rtcpusher"));
            var t;
            t = e.detail ? e.detail.code : e, console.log("推流情况：", t), s.globalData.pushLog += JSON.stringify(e), 
            s.globalData.pushLog.length > 1500 && self.triggerEvent("trigVideo", {}, {}), -1 != self.data.push_stream_tap && (self.data.push_stream_tap = +new Date() - self.data.push_stream_tap, 
            self.data.push_info += "[" + t + ":" + self.data.push_stream_tap + "]", self.data.push_stream_tap = +new Date());
            switch (t) {
              case 1001:
                "7.0.5" == s.systemInfo.version && "android" == s.systemInfo.platform && (console.log("***onPush-code-1001-7.0.5.***", s.systemInfo.platform, "-enterRoom"), 
                setTimeout(function() {
                    self.enterRoom();
                }, 1e3));
                break;

              case 1002:
                self.data.hasPushStarted || (self.data.hasPushStarted = !0, self.enterRoom(), self.data.push_stream_tap = -1, 
                a.setReportData({
                    int64_tc_push_stream: +new Date() - self.data.push_stream_start,
                    str_push_info: self.data.push_info
                }));
                break;

              case -1301:
                console.error("打开摄像头失败: ", t), self.postErrorEvent(self.data.ERROR_OPEN_CAMERA, "打开摄像头失败"), 
                self.exitRoom();
                break;

              case -1302:
                console.error("打开麦克风失败: ", t), self.postErrorEvent(self.data.ERROR_OPEN_MIC, "打开麦克风失败"), 
                self.exitRoom();
                break;

              case -1307:
                console.error("推流连接断开: ", t), self.postErrorEvent(self.data.ERROR_PUSH_DISCONNECT, "推流连接断开"), 
                self.exitRoom();
                break;

              case 5e3:
                console.log("收到5000: ", t), self.exitRoom();
            }
        },
        onError: function(e) {
            console.log("推流错误：", e), 10001 == e.detail.errCode && (e.detail.errMsg = "未获取到摄像头功能权限，请删除小程序后重新打开"), 
            10002 == e.detail.errCode && (e.detail.errMsg = "未获取到录音功能权限，请删除小程序后重新打开"), self.postErrorEvent(self.data.ERROR_CAMERA_MIC_PERMISSION, e.detail.errMsg || "未获取到摄像头、录音功能权限，请删除小程序后重新打开");
        },
        decline: function() {
            self.stop(), console.log("***rtc-room***triggerEvent***decline***"), self.triggerEvent("decline", {}, {});
        },
        changeMute: function() {
            console.log("******muted******", this.muted), this.muted = !this.muted, this.setData({
                muted: this.muted
            });
        },
        onPlay: function(e) {
            console.log("***live-player-onPlay***", e), s.globalData.pullLog += JSON.stringify(e), 
            self.triggerEvent("onliveplay", {}, {}), s.globalData.pullLog.length > 1500 && self.triggerEvent("trigVideo", {}, {}), 
            -1 != self.data.play_stream_tap && (self.data.play_stream_tap = +new Date() - self.data.play_stream_tap, 
            self.data.play_info += "[" + e.detail.code + ":" + self.data.play_stream_tap + "]", 
            console.log("####***拉流间隔耗时戳***###", self.data.play_info), self.data.play_stream_tap = +new Date()), 
            self.data.members.forEach(function(t) {
                if (e.currentTarget.id == t.userID) switch (e.detail.code) {
                  case 2007:
                    console.log("视频播放loading: ", e), t.loading = !0;
                    break;

                  case 2004:
                    console.log("视频播放开始: ", e), t.loading = !1, self.data.play_stream_end || (self.data.play_stream_end = +new Date(), 
                    self.data.play_stream_tap = -1, console.warn("int64_tc_play_stream" + self.data.play_stream_start + ", " + self.data.play_stream_end), 
                    a.setReportData({
                        int64_tc_play_stream: self.data.play_stream_end - self.data.play_stream_start,
                        int64_ts_play_stream: self.data.play_stream_end,
                        str_play_info: self.data.play_info
                    }));
                    break;

                  default:
                    console.log("拉流情况：", e, t);
                }
            }), self.setData({
                members: self.data.members
            });
        }
    }
});