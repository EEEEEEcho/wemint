function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var a = e(require("../../../store")), s = e(require("../../../utils/create")), t = getApp();

(0, s.default)(a.default, {
    properties: {},
    data: {
        cartPage: "消息中心",
        navH: t.globalData.navH,
        status: t.globalData.status,
        num: 9
    },
    ready: function() {},
    onShow: function() {},
    toPage: function(e) {
        var a = "";
        switch (e.currentTarget.dataset.type) {
          case "通知消息":
            a = "/pages/mine/messages/noticeMessage/noticeMessage";
            break;

          case "物流消息":
            a = "/pages/mine/messages/serviceMessage/serviceMessage";
            break;

          case "平台客服":
          case "客服一号":
            a = "";
        }
        wx.navigateTo({
            url: a
        });
    }
});