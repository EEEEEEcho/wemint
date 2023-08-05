var n = !1, e = require("../../config.js"), o = getApp();

Page({
    data: {
        username: ""
    },
    onLoad: function(n) {
        this.myLoading = this.selectComponent("#myLoading"), this.myLoading && this.myLoading.hideLoading();
        var e = "mylogin" + this.uuid(2, 16);
        console.log("currentName:" + e), this.setData({
            username: e
        }), this.websocketListener();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    websocketListener: function() {
        wx.onSocketMessage(function(n) {
            console.log("websocketListener" + JSON.stringify(n));
        });
    },
    singleMsgSend: function(e) {
        console.log("singleMsgSend：" + JSON.stringify(e));
        var o = e.detail.value, t = [ "SEND\ndestination:/user/" + o.usernameInput + '/topic/greetings\n\n{"username":"' + this.data.username + '","content":"' + o.userContentInput + '"}\0' ];
        n && wx.sendSocketMessage({
            data: JSON.stringify(t)
        });
    },
    globleMsgSend: function(n) {
        console.log("globleMsgSend" + JSON.stringify(n));
        n.detail.value.globleContentInput;
    },
    wsConnect: function() {
        console.log("wsConnect");
        var t = this.data.username, s = this, a = (o.globalData.userInfo && o.globalData.userInfo.nickName, 
        e.houseId, o.globalData.single.id, [ "CONNECT\nlogin:" + t + "\npasscode:mypasscode\nid:" + t + "\naccept-version:1.1,1.0\nheart-beat:10000,10000\n\n\0" ]), i = e.websocketUrl + "gs-guide-websocket/" + s.getRandomNum() + "/" + s.uuid(8, 60) + "/websocket";
        wx.connectSocket({
            url: i,
            data: a,
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                console.log("wsConnect success" + JSON.stringify(e)), wx.onSocketOpen(function(e) {
                    n = !0, console.log("websocketListener");
                });
            },
            fail: function(n) {
                console.log("wsConnect fail");
            }
        }), s.wsSendOrder();
    },
    wsSendOrder: function() {
        var n = this.data.username, t = [ "SUBSCRIBE\nid:sub-0\ndestination:/topic/userList\n\n\0" ], s = [ "SUBSCRIBE\nid:sub-1\ndestination:/topic/greetings\n\n\0" ], a = [ "SUBSCRIBE\nid:sub-2\ndestination:/user/topic/greetings\n\n\0" ], i = [ "CONNECT\nname:" + (o.globalData.userInfo ? o.globalData.userInfo.nickName : "") + "\nlogin:" + n + "\nhouseId:" + e.houseId + "\nsource:\nuserId:" + o.globalData.single.id + "\naccept-version:1.1,1.0\nheart-beat:10000,10000\n\n\0" ];
        console.log("wsSendOrder"), wx.sendSocketMessage({
            data: JSON.stringify(i)
        }), wx.sendSocketMessage({
            data: JSON.stringify(t)
        }), wx.sendSocketMessage({
            data: JSON.stringify(s)
        }), wx.sendSocketMessage({
            data: JSON.stringify(a)
        });
    },
    wsDisConnect: function() {
        console.log("wsDisConnect");
    },
    uuid: function(n, e) {
        var o, t = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), s = [];
        if (e = e || t.length, n) for (o = 0; o < n; o++) s[o] = t[0 | Math.random() * e]; else {
            var a;
            for (s[8] = s[13] = s[18] = s[23] = "-", s[14] = "4", o = 0; o < 36; o++) s[o] || (a = 0 | 16 * Math.random(), 
            s[o] = t[19 == o ? 3 & a | 8 : a]);
        }
        return s.join("");
    },
    getRandomNum: function() {
        return "" + parseInt(10 * Math.random()) + parseInt(10 * Math.random()) + parseInt(10 * Math.random());
    }
});