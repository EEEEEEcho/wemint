var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/create")), t = require("../../utils/stringUtil"), i = require("../../utils/storage"), s = require("../../api/apiInstance.js"), a = require("../../utils/jumpTo.js");

(0, e.default)({
    properties: {},
    data: {
        imgUrls: [],
        isShow: !1,
        currentIndex: 0,
        userInfo: {}
    },
    ready: function() {
        var e = this, a = (0, i.getDeviceId)();
        "" == a && (a = (0, t.getUuid)(), (0, i.setDeviceId)(a));
        var r = {
            type: 8,
            deviceId: a
        };
        "" != this.store.data.userInfo.accesstoken && (r.accesstoken = this.store.data.userInfo.accesstoken), 
        (0, s.getAdPlan)(r, function(t) {
            1 === t.errcode && t.data.length > 0 && e.setData({
                isShow: !0,
                imgUrls: t.data
            });
        });
    },
    methods: {
        onClosePop: function(e) {
            this.setData({
                isShow: !1
            });
        },
        onBindChange: function(e) {
            this.setData({
                currentIndex: e.detail.current
            });
        },
        onDetail: function(e) {
            var t = this.data.imgUrls[this.data.currentIndex], i = (0, a.jumpToWeb)(t.urlSchema, t.url);
            "" != i && ("isShowContactService" == i ? this.setData({
                isShowContactService: !0
            }) : wx.navigateTo({
                url: i
            }));
        }
    }
});