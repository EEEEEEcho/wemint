function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var a = e(require("../../../../store")), s = e(require("../../../../utils/create")), i = require("../../../../api/apiInstance.js"), n = getApp();

(0, s.default)(a.default, {
    properties: {},
    data: {
        cartPage: "修改地址",
        navH: n.globalData.navH,
        status: n.globalData.status,
        address: {},
        region: [ "浙江省", "嘉兴市", "南湖区" ],
        customItem: "全部",
        isShowNameInput: !1,
        isShowTelInput: !1,
        isShowDetailInput: !1
    },
    onLoad: function(e) {
        var t = JSON.parse(e.address), a = [];
        a.push(t.province), a.push(t.city), a.push(t.area), this.setData({
            address: t,
            region: a
        });
    },
    blurInput: function(e) {
        var t = e.currentTarget.dataset.type, a = (this.data.placeholder, this.data.isShowNameInput), s = this.data.isShowTelInput, i = this.data.isShowDetailInput;
        "name" == t ? a = !1 : "tel" == t ? s = !1 : "detail" == t && (i = !1), this.setData({
            isShowNameInput: a,
            isShowTelInput: s,
            isShowDetailInput: i
        });
    },
    getFocus: function(e) {
        var t = e.currentTarget.dataset.type, a = (this.data.placeholder, this.data.isShowNameInput), s = this.data.isShowTelInput, i = this.data.isShowDetailInput;
        "name" == t ? a = !0 : "tel" == t ? s = !0 : "detail" == t && (i = !0), this.setData({
            isShowNameInput: a,
            isShowTelInput: s,
            isShowDetailInput: i
        });
    },
    bindRegionChange: function(e) {
        var a;
        this.data.address;
        this.setData((a = {}, t(a, "address.province", e.detail.value[0]), t(a, "address.city", e.detail.value[1]), 
        t(a, "address.area", e.detail.value[2]), t(a, "region", e.detail.value), a));
    },
    bindGetName: function(e) {
        this.setData(t({}, "address.name", e.detail.value));
    },
    bindGetTel: function(e) {
        this.setData(t({}, "address.mobile", e.detail.value));
    },
    bindGetDetail: function(e) {
        this.setData(t({}, "address.addressDetail", e.detail.value));
    },
    deleteAddress: function() {
        var e = {
            addressUuid: this.data.address.addressUuid,
            accesstoken: this.store.data.userInfo.accesstoken
        };
        (0, i.deleteAddress)(e, function(e) {
            1 == e.errcode && wx.navigateBack({
                delta: 1
            });
        });
    },
    editAddress: function() {
        var e = this.data.address, t = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        if (0 == e.mobile.length) return wx.showToast({
            title: "输入的手机号为空",
            icon: "none",
            duration: 1500
        }), !1;
        if (e.mobile.length < 11) return wx.showToast({
            title: "手机号有误！",
            icon: "none",
            duration: 1500
        }), !1;
        if (!t.test(e.mobile)) return wx.showToast({
            title: "手机号有误！",
            icon: "none",
            duration: 1500
        }), !1;
        if ("" == e.name || "" == e.province || "" == e.addressDetail) return wx.showToast({
            title: "信息不完整",
            icon: "none",
            duration: 1e3
        }), !1;
        var a = {
            accesstoken: this.store.data.userInfo.accesstoken,
            addressUuid: e.addressUuid,
            name: e.name,
            mobile: e.mobile,
            province: e.province,
            city: e.city,
            area: e.area,
            addressDetail: e.addressDetail
        };
        (0, i.editAddress)(a, function(e) {
            1 == e.errcode ? (wx.showToast({
                title: "修改成功",
                duration: 1e3,
                icon: "none"
            }), wx.navigateBack({
                delta: 1
            })) : wx.showToast({
                title: e.errmsg,
                duration: 1e3,
                icon: "none"
            });
        });
    }
});