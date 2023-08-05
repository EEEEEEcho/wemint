var t = getApp();

module.exports = new function() {
    this.handlers = {}, this.listenList = {}, this.socketTask = {}, this.status = !0, 
    this.host = t.globalData.socket_config.SOCKET_URL, this.on = function(t, o) {
        "function" == typeof o && (this.handlers[t] = o);
    }, this.listen = function(t, o) {
        "function" == typeof o && (this.listenList[t] = o);
    }, this.emit = function(t, o) {
        t in this.handlers && this.handlers[t].call(this, o);
    }, this.off = function(t, o) {
        var s = this.handlers[t], n = 0;
        if (s) for (var e = (n = s.length) - 1; e >= 0; e--) s[e] === o && s.splice(e, 1);
        return this;
    }, this.close = function() {
        this.status && this.socketTask.close();
    }, this.remove = function(t) {
        console.log("移除了自定义监听事件" + t);
        var o = this.listenList;
        console.log(o);
        var s = this;
        void 0 !== o[t] && (delete o[t], console.log(o), s.listenList = o), console.log(s.listenList);
    }, this.run = function() {
        var o = this;
        console.log(t.globalData.socket_config), console.log(o.handlers);
        var s = {
            user: t.globalData.socket_config.SOCKET_USERNAME,
            passwd: t.globalData.socket_config.SOCKET_PASSWD
        };
        console.log(s);
        var n = wx.connectSocket({
            url: t.globalData.socket_config.SOCKET_URL,
            method: "GET",
            header: s,
            success: function(t) {
                o.handlers.connectSocket && o.emit("connectSocket", t);
            }
        });
        return n.onOpen(function(t) {
            o.handlers.onSocketOpen && o.emit("onSocketOpen", t);
        }), n.onMessage(function(t) {
            var s = JSON.parse(t.data), n = s.data;
            console.log(n), console.log(s);
            var e = s.event;
            "" == e && (e = n.event), e in o.listenList && o.listenList[e].call(o, "SYS" == s.type ? n : n.data);
        }), n.onClose(function(t) {
            o.handlers.onSocketClose && o.emit("onSocketClose", t);
        }), n.onError(function(t) {
            o.handlers.onSocketError ? o.emit("onSocketError", t) : this.status = !1;
        }), this.socketTask = n, this;
    };
}();