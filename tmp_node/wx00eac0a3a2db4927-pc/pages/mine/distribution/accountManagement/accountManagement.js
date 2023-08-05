function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../../../store")), a = t(require("../../../../utils/create")), i = require("../../../../api/apiInstance.js"), s = (require("../../../../utils/filter.js"), 
getApp());

(0, a.default)(e.default, {
    properties: {},
    data: {
        cartPage: "账号管理",
        navH: s.globalData.navH,
        status: s.globalData.status,
        userInfo: {},
        pageSize: 10,
        pageNum: 1,
        isLoad: !1,
        childrenAccountList: []
    },
    ready: function() {},
    onShow: function() {
        this.getDistributionUserQuery();
    },
    getDistributionUserQuery: function() {
        var t = this, e = {
            accesstoken: this.store.data.userInfo.accesstoken,
            pageSize: this.data.pageSize,
            pageNum: this.data.pageNum,
            sort: "desc"
        };
        (0, i.getDistributionUserQuery)(e, function(e) {
            1 == e.errcode && t.setData({
                childrenAccountList: e.data
            });
        });
    },
    toAdd: function() {
        wx.navigateTo({
            url: "/pages/mine/distribution/accountManagement/addChildAccount/addChildAccount"
        });
    },
    toEdit: function(t) {
        var e = t.currentTarget.dataset.userdisuuid, a = t.currentTarget.dataset.useruuid, i = t.currentTarget.dataset.name, s = t.currentTarget.dataset.mobile, r = t.currentTarget.dataset.moneyratio, u = t.currentTarget.dataset.avatar;
        wx.navigateTo({
            url: "/pages/mine/distribution/accountManagement/editChildAccount/editChildAccount?userDisUuid=" + e + "&userUuid=" + a + "&name=" + i + "&mobile=" + s + "&moneyratio=" + r + "&avatar=" + u
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            pageNum: 1,
            isLoad: !1
        }), this.getDistributionUserQuery();
    },
    onReachBottom: function() {
        var t = this;
        if (!this.data.isLoad) {
            var e = this.data.pageNum + 1;
            this.setData({
                pageNum: e,
                isLoad: !0
            });
            var a = {
                pageSize: this.data.pageSize,
                pageNum: e,
                accesstoken: this.store.data.userInfo.accesstoken,
                sort: "desc"
            };
            (0, i.getDistributionUserQuery)(a, function(a) {
                if (1 === a.errcode) {
                    var i = t.data.childrenAccountList.concat(a.data), s = !0;
                    a.pages > t.data.pageNum && (s = !1), t.setData({
                        isLoad: s,
                        childrenAccountList: i
                    });
                } else t.setData({
                    isLoad: !1,
                    pageNum: e - 1
                });
            });
        }
    }
});