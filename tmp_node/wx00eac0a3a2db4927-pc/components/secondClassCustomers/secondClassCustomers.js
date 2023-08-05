var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/create")), e = require("../../api/apiInstance.js");

require("../../utils/filter.js"), getApp();

(0, t.default)({
    properties: {
        keywords: String,
        userUuidFromAccount: String
    },
    data: {
        customerList: [],
        pageSize: 10,
        pageNum: 1,
        isLoad: !1,
        keywords: "",
        type: [ 3 ],
        total: 0
    },
    ready: function() {
        this.getBindingUserInfo();
    },
    methods: {
        getBindingUserInfo: function() {
            var t = this, a = {
                accesstoken: this.store.data.userInfo.accesstoken,
                type: JSON.stringify(this.data.type),
                pageSize: this.data.pageSize,
                pageNum: this.data.pageNum,
                keywords: this.data.keywords
            };
            void 0 !== this.properties.userUuidFromAccount && (a.parentUserUuid = this.properties.userUuidFromAccount), 
            (0, e.getBindingUserInfo)(a, function(e) {
                if (wx.stopPullDownRefresh(), 1 == e.errcode) {
                    var a = !0;
                    e.data.pages > t.data.pageNum && (a = !1), t.setData({
                        customerList: e.data.records,
                        keywords: "",
                        isLoad: a,
                        total: e.data.total
                    }), t.triggerEvent("getSecondTotalNumber", e.data.total);
                }
            });
        },
        onRefresh: function(t) {
            this.setData({
                pageNum: 1,
                keywords: t
            }), this.getBindingUserInfo();
        },
        onMore: function(t) {
            var a = this;
            if (!this.data.isLoad) {
                var s = this.data.pageNum + 1;
                this.setData({
                    pageNum: s,
                    keywords: t
                });
                var i = {
                    accesstoken: this.store.data.userInfo.accesstoken,
                    type: JSON.stringify(this.data.type),
                    pageSize: this.data.pageSize,
                    pageNum: this.data.pageNum,
                    keywords: this.data.keywords
                };
                void 0 !== this.properties.userUuidFromAccount && (i.parentUserUuid = this.properties.userUuidFromAccount), 
                (0, e.getBindingUserInfo)(i, function(t) {
                    if (1 === t.errcode) {
                        var e = a.data.customerList.concat(t.data.records), i = !0;
                        t.data.concatpages > a.data.pageNum && (i = !1), a.setData({
                            customerList: e,
                            isLoad: i
                        });
                    } else a.setData({
                        isLoad: !1,
                        pageNum: s - 1
                    });
                });
            }
        }
    }
});