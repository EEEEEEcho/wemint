require("./config"), require("./utils/server"), require("./utils/utils");

App({
    onLaunch: function() {},
    globalData: {
        buyGoodsInfo: [],
        chooseAttrInfo: [],
        isDeleteGoods: !1
    },
    changeZero: function(e) {
        return e = e < 10 ? "0" + e : e;
    },
    moneyFilter: function(e) {
        if ("number" == typeof (e = Number(e))) {
            var o = parseInt((100 * (1 * e).toFixed(2)).toFixed(0)) / 100, t = o.toString();
            return t.length - t.indexOf(".") > 3 ? o.toFixed(2) : o;
        }
        console.log(e + "不是一个数字");
    },
    showAndHideToast: function(e) {
        wx.showToast({
            title: e,
            icon: "none",
            duration: 3e3
        });
    }
});