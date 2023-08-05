var t = getApp();

Page({
    onShareAppMessage: function() {
        return t.shareAppMessage("/pages/shop/index");
    },
    data: {
        count: 0,
        allTotal: 0,
        applyTotal: 0,
        canApplyTotal: 0,
        auditedTotal: 0,
        notAuditedTotal: 0,
        userID: ""
    },
    onLoad: function(t) {},
    onShow: function() {
        this.getUserFenXiaoInfo(), this.setData({
            userID: t.globalData.WebUserID
        });
    },
    getUserFenXiaoInfo: function() {
        var a = this, o = {
            url: "/index.php?c=Front/WxApp/ShopApi&a=getUserFenXiaoInfo",
            success: function(o) {
                o.success ? a.setData({
                    count: o.info.count,
                    allTotal: o.info.allTotal,
                    applyTotal: o.info.applyTotal,
                    canApplyTotal: o.info.canApplyTotal,
                    auditedTotal: o.info.auditedTotal,
                    notAuditedTotal: o.info.notAuditedTotal
                }) : t.showModal({
                    title: "提示",
                    content: o.msg
                });
            }
        };
        t.sendRequest(o);
    }
});