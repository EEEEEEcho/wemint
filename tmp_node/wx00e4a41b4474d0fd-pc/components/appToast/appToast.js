var t = {
    "_toast_.isHide": !1,
    "_toast_.content": ""
}, s = {
    show: function(t) {
        var s = this;
        this.setData({
            "_toast_.isHide": !0,
            "_toast_.content": t
        }), setTimeout(function() {
            s.setData({
                "_toast_.isHide": !1
            });
        }, 2e3);
    }
};

module.exports = {
    ToastPannel: function() {
        var e = getCurrentPages(), a = e[e.length - 1];
        return this.__page = a, Object.assign(a, s), a.toastPannel = this, a.setData(t), 
        this;
    }
};