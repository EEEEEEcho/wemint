function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var t = a(require("../../../../store")), e = a(require("../../../../utils/create")), s = require("../../../../api/apiInstance.js"), i = (require("../../../../utils/filter.js"), 
getApp());

(0, e.default)(t.default, {
    properties: {},
    data: {
        cartPage: "明细",
        navH: i.globalData.navH,
        status: i.globalData.status,
        userInfo: {},
        pageSize: 10,
        pageNum: 1,
        billList: [],
        isLoad: !1
    },
    ready: function() {},
    onLoad: function() {
        this.getDefinite();
    },
    getDefinite: function() {
        var a = this, t = {
            accesstoken: this.store.data.userInfo.accesstoken,
            pageSize: this.data.pageSize,
            pageNum: this.data.pageNum,
            sort: ""
        };
        (0, s.getWalletLogInfo)(t, function(t) {
            wx.stopPullDownRefresh(), console.log(t), 1 == t.errcode && a.setData({
                billList: t.data
            });
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            pageNum: 1,
            isLoad: !1
        }), this.getDefinite();
    },
    onReachBottom: function() {
        var a = this;
        if (!this.data.isLoad) {
            var t = this.data.pageNum + 1;
            this.setData({
                pageNum: t,
                isLoad: !0
            });
            var e = {
                pageSize: this.data.pageSize,
                pageNum: t,
                accesstoken: this.store.data.userInfo.accesstoken,
                sort: ""
            };
            (0, s.getWalletLogInfo)(e, function(e) {
                if (1 === e.errcode) {
                    var s = a.data.billList.concat(e.data), i = !0;
                    e.pages > a.data.pageNum && (i = !1), a.setData({
                        isLoad: i,
                        billList: s
                    });
                } else a.setData({
                    isLoad: !1,
                    pageNum: t - 1
                });
            });
        }
    }
});