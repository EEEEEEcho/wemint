function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../../../../store")), e = t(require("../../../../../utils/create")), i = (require("../../../../../utils/storage"), 
require("../../../../../api/apiInstance.js"), getApp());

(0, e.default)(a.default, {
    properties: {},
    data: {
        cartPage: "手机号码",
        navH: i.globalData.navH,
        status: i.globalData.status,
        userInfo: {},
        isDisabled: !1,
        inputValue: "",
        isShowInput: !1,
        isProfit: !1
    },
    onLoad: function(t) {
        var a = !1, e = "";
        "add" == t.source ? "profit" == t.sort && (a = !0) : "profit" == t.sort ? (a = !0, 
        e = t.ratio) : e = t.mobile, "" == e ? this.setData({
            isProfit: a
        }) : this.setData({
            isProfit: a,
            inputValue: e,
            isShowInput: !0,
            isDisabled: !0
        });
    },
    getBlur: function() {
        this.setData({
            isShowInput: !0
        });
    },
    blurInput: function(t) {
        var a = "", e = t.detail.value;
        this.data.isProfit ? -1 == e.indexOf(".") ? e >= 1 && e <= 100 ? a = e : wx.showToast({
            title: "请填写1~100之间的整数",
            icon: "none",
            duration: 800
        }) : wx.showToast({
            title: "分成比例只能是整数",
            icon: "none",
            duration: 800
        }) : 11 == e.length ? a = e : wx.showToast({
            title: "手机号码格式不正确",
            icon: "none",
            duration: 800
        }), this.setData({
            isShowInput: !1,
            inputValue: a,
            isDisabled: !0
        });
    },
    keepUpdate: function(t) {
        "" != t.detail.value ? this.setData({
            isDisabled: !0,
            inputValue: t.detail.value
        }) : this.setData({
            isDisabled: !1
        });
    },
    confirm: function() {
        var t = this.data.inputValue;
        if (this.data.isProfit) -1 == t.indexOf(".") ? t >= 1 && t <= 100 ? ((e = (a = getCurrentPages())[a.length - 2]).setData({
            inputValue: t
        }), wx.navigateBack({
            delta: 1
        })) : wx.showToast({
            title: "请填写1~100之间的整数",
            icon: "none",
            duration: 800
        }) : wx.showToast({
            title: "分成比例只能是整数",
            icon: "none",
            duration: 800
        }); else if (11 == t.length) {
            var a = getCurrentPages(), e = a[a.length - 2];
            e.setData({
                inputValue: t
            }), wx.navigateBack({
                delta: 1
            });
        } else wx.showToast({
            title: "手机号码格式不正确",
            icon: "none",
            duration: 800
        });
    }
});