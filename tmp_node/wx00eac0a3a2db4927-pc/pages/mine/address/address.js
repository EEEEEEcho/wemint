function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var s = e(require("../../../store")), a = e(require("../../../utils/create")), t = require("../../../api/apiInstance.js"), d = getApp();

(0, a.default)(s.default, {
    properties: {},
    data: {
        isSelect: !1,
        active: 0,
        cartPage: "收货地址",
        navH: d.globalData.navH,
        status: d.globalData.status,
        addressList: [],
        selectAddress: {},
        isLoad: !1,
        pageSize: 10,
        pageNum: 1
    },
    onLoad: function(e) {
        void 0 !== e.isSelect && "1" === e.isSelect && (this.data.isSelect = !0);
    },
    onPullDownRefresh: function() {
        this.setData({
            pageNum: 1,
            isLoad: !1
        });
        var e = {
            pageSize: this.data.pageSize,
            pageNum: this.data.pageNum,
            accesstoken: this.store.data.userInfo.accesstoken,
            sort: ""
        };
        this.selectAllAddress(e);
    },
    onReachBottom: function() {
        var e = this;
        if (!this.data.isLoad) {
            var s = this.data.pageNum + 1;
            this.setData({
                pageNum: s,
                isLoad: !0
            });
            var a = {
                pageSize: this.data.pageSize,
                pageNum: s,
                accesstoken: this.store.data.userInfo.accesstoken,
                sort: ""
            };
            (0, t.selectAllAddress)(a, function(a) {
                if (1 === a.errcode) {
                    var t = e.data.addressList.concat(a.data), d = !0;
                    a.pages > e.data.pageNum && (d = !1), e.setData({
                        isLoad: d,
                        addressList: t
                    });
                } else e.setData({
                    isLoad: !1,
                    pageNum: s - 1
                });
            });
        }
    },
    selectAllAddress: function(e) {
        var s = this;
        (0, t.selectAllAddress)(e, function(e) {
            wx.stopPullDownRefresh(), 1 == e.errcode && s.setData({
                addressList: e.data
            });
        });
    },
    onShow: function() {
        var e = {
            accesstoken: this.store.data.userInfo.accesstoken,
            sort: "",
            pageSize: 10,
            pageNum: 1
        };
        this.selectAllAddress(e);
    },
    toChange: function(e) {
        for (var s = this, a = this.data.addressList, d = e.currentTarget.dataset.addressid, i = e.currentTarget.dataset.addressuuid, r = 0; r < a.length; r++) {
            r == d ? 0 == a[d].isDefault ? a[d].isDefault = 1 : a[d].isDefault = 0 : a[r].isDefault = 0;
            var o = {
                accesstoken: this.store.data.userInfo.accesstoken,
                addressUuid: i,
                isDefault: a[r].isDefault
            };
            (0, t.editAddress)(o, function(e) {
                1 == e.errcode && s.setData({
                    addressList: a
                });
            });
        }
    },
    onSelectAddress: function(e) {
        if (this.data.isSelect) {
            var s = e.currentTarget.dataset.index;
            this.store.data.selectAddress = this.data.addressList[s], this.update(), wx.navigateBack({
                delta: 1
            });
        }
    },
    toAddNewAddress: function(e) {
        wx.navigateTo({
            url: "/pages/mine/address/addNew/addNew"
        });
    },
    toEditNewAddress: function(e) {
        var s = this.data.addressList, a = e.currentTarget.dataset.addressid, t = JSON.stringify(s[a]);
        wx.navigateTo({
            url: "/pages/mine/address/editAddress/editAddress?address=" + t
        });
    }
});