var a = require("../../utils/server"), e = require("../../config.js");

require("../../utils/utils.js");

Page({
    data: {},
    onLoad: function(t) {
        var r = {
            authorization: wx.getStorageSync("authorization")
        }, i = this, n = i.getImgName(t);
        a.getApiJSON("/api/mini/getMiniPageData", {
            token: e.resToken
        }, function(a) {
            if (1e3 == a.data.code) {
                var e = a.data.data;
                for (var r in e) r.split("_")[1] - 1 == t.num && (0 == e[r].length ? i.setData({
                    isEmpty: !0,
                    sortArr: []
                }) : i.setData({
                    isEmpty: !1,
                    sortArr: e[r],
                    imgName: n
                }));
            }
        }, r);
    },
    callItemShop: function(a) {
        wx.makePhoneCall({
            phoneNumber: a.target.dataset.tel
        });
    },
    getImgName: function(a) {
        var e = "../../images/elseImages/";
        switch (+a.num) {
          case 0:
            e += "distribution.png";
            break;

          case 1:
            e += "reservation.png";
            break;

          case 2:
            e += "Education.png";
            break;

          case 3:
            e += "loacl.png";
            break;

          case 4:
            e += "water.png";
            break;

          case 5:
            e += "food.png";
            break;

          case 6:
            e += "mall.png";
            break;

          case 7:
            e += "moving.png";
        }
        return e;
    }
});