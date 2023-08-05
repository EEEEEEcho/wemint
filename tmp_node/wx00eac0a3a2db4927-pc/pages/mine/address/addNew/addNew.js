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

var a = e(require("../../../../store")), i = e(require("../../../../utils/create")), n = require("../../../../api/apiInstance.js"), s = getApp();

(0, i.default)(a.default, {
    properties: {},
    data: {
        cartPage: "添加地址",
        navH: s.globalData.navH,
        status: s.globalData.status,
        addressList: [],
        region: [ "浙江省", "嘉兴市", "南湖区" ],
        customItem: "全部",
        address: {},
        placeholder: {
            name: "收货人",
            tel: "手机号码",
            detail: "详细地址：如道路、门牌号、楼栋号、单元室等"
        },
        isShowNameInput: !1,
        isShowTelInput: !1,
        isShowDetailInput: !1
    },
    onLoad: function(e) {
        this.setData(t({}, "address.region", this.data.region));
    },
    getFocus: function(e) {
        var t = e.currentTarget.dataset.type, a = this.data.placeholder, i = this.data.isShowNameInput, n = this.data.isShowTelInput, s = this.data.isShowDetailInput;
        "name" == t ? (a.name = "", i = !0) : "tel" == t ? (a.tel = "", n = !0) : "detail" == t && (a.detail = "", 
        s = !0), this.setData({
            placeholder: a,
            isShowNameInput: i,
            isShowTelInput: n,
            isShowDetailInput: s
        });
    },
    bindRegionChange: function(e) {
        var a;
        this.data.address;
        this.setData((a = {}, t(a, "address.region", e.detail.value), t(a, "region", e.detail.value), 
        a));
    },
    bindGetName: function(e) {
        var a;
        this.setData((a = {}, t(a, "address.name", e.detail.value), t(a, "placeholder.name", e.detail.value), 
        t(a, "isShowNameInput", !1), a));
    },
    bindGetTel: function(e) {
        var a = e.detail.value, i = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        if (0 == a.length) return wx.showToast({
            title: "输入的手机号为空",
            icon: "none",
            duration: 1500
        }), !1;
        if (a.length < 11) return wx.showToast({
            title: "手机号有误！",
            icon: "none",
            duration: 1500
        }), !1;
        if (!i.test(a)) return wx.showToast({
            title: "手机号有误！",
            icon: "none",
            duration: 1500
        }), !1;
        var n;
        this.setData((n = {}, t(n, "address.tel", a), t(n, "placeholder.tel", a), t(n, "isShowTelInput", !1), 
        n));
    },
    bindGetDetail: function(e) {
        var a;
        this.setData((a = {}, t(a, "address.detail", e.detail.value), t(a, "placeholder.detail", e.detail.value), 
        t(a, "isShowDetailInput", !1), a));
    },
    addAddress: function() {
        var e = this.data.address;
        if (4 != Object.keys(e).length) return wx.showToast({
            title: "信息不完整",
            icon: "none",
            duration: 1e3
        }), !1;
        var t = {
            accesstoken: this.store.data.userInfo.accesstoken,
            name: e.name,
            mobile: e.tel,
            province: e.region[0],
            city: e.region[1],
            area: e.region[2],
            addressDetail: e.detail,
            isDefault: 0
        };
        (0, n.addNewAddress)(t, function(e) {
            1 == e.errcode ? (wx.showToast({
                title: "创建成功",
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