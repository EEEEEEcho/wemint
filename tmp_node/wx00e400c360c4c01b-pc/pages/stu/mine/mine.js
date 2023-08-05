var t = getApp();

Page({
    data: {
        title: "我的",
        actionSheetHidden: !0,
        bpImage: "http://p7mq9gjza.bkt.clouddn.com/t_me_head.png"
    },
    onLoad: function() {
        var a = t.globalData.cpc.bp_image;
        null != a && "" != a || (a = "http://p7mq9gjza.bkt.clouddn.com/t_me_head.png"), 
        this.setData({
            cpc: t.globalData.cpc,
            bpImage: a
        });
    },
    onShow: function() {
        this.setData({
            userInfo: t.globalData.userInfo
        });
    },
    spareTime: function() {
        wx.navigateTo({
            url: "../spareTime/spareTime"
        });
    },
    score: function() {
        wx.navigateTo({
            url: "../score/score"
        });
    },
    order: function() {
        wx.navigateTo({
            url: "../order/order"
        });
    },
    activity: function() {
        wx.navigateTo({
            url: "../myActivity/myActivity"
        });
    },
    switchAccount: function() {
        wx.navigateTo({
            url: "../switchAccount/switchAccount"
        });
    },
    myIndex: function() {
        wx.navigateTo({
            url: "../myIndex/myIndex"
        });
    },
    actionSheetChange: function(t) {
        this.setData({
            actionSheetHidden: !this.data.actionSheetHidden
        });
    },
    mailbox: function(t) {
        wx.navigateTo({
            url: "../mailbox/mailbox"
        });
    },
    bpImage: function() {
        var t = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original" ],
            success: function(a) {
                wx.navigateTo({
                    url: "../../wx-cropper/index?url=" + a.tempFilePaths[0] + "&tp=0"
                }), t.actionSheetChange();
            }
        });
    }
});