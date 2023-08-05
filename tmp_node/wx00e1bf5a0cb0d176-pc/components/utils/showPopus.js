var s = {
    showPopus: function(s) {
        var t = getCurrentPages()[getCurrentPages().length - 1];
        t.setData({
            is_popus_hidden: !1,
            is_loading: s.loading || !1,
            is_popus_msg: s.content || "",
            is_popus_text: s.text || "",
            is_popus_prizeImg: s.prizeImg || "",
            is_popus_status: s.popusStatus || ""
        }, function() {
            t.setData({
                is_dialog_show: !0
            });
        }), t.is_popus_pay = s.confirm, t.is_popus_close = s.close, t.is_popus_pay = s.payJifen, 
        t.is_popus_share = s.share, t.is_popus_look = s.look;
    },
    hidePopus: function(s) {
        var t = getCurrentPages()[getCurrentPages().length - 1];
        t.setData({
            is_dialog_show: !1
        }, function() {
            setTimeout(function() {
                t.setData({
                    is_popus_hidden: !0
                }), s && s(!0);
            }, 300);
        });
    }
};

module.exports = s;