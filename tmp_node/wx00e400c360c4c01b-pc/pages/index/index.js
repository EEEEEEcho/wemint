var a = require("../../utils/main.js"), t = require("../../wxParse/wxParse.js"), o = getApp();

Page({
    data: {
        openid: "666666",
        isbangding: !1,
        home_01: "../../image/login_student@2x.png",
        home_01_old: "../../image/login_student@2x.png",
        home_01_btn: "../../image/stuloginCheck.png",
        home_02: "../../image/login_teather@2x.png",
        phone: "",
        posterList: [],
        stuloginCheck: !1
    },
    onLoad: function() {
        var e = this;
        wx.request({
            url: a.localUrl + "mobileXcx/initialization",
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                for (var n = a.data.dataInfo.menuList, s = "", i = "", d = "", l = "", h = 0; h < n.length; h++) "home_01" == n[h][0] && (s = n[h][1], 
                i = n[h][1]), "home_02" == n[h][0] && (d = n[h][1]), "home_01_btn" == n[h][0] && (l = n[h][1]);
                e.setData({
                    home_01: s,
                    home_01_old: i,
                    home_01_btn: l,
                    home_02: d,
                    phone: a.data.dataInfo.phone,
                    posterList: a.data.dataInfo.posterList
                }), o.globalData.menuList = a.data.dataInfo.menuList, o.globalData.posterList = a.data.dataInfo.posterList, 
                o.globalData.qrcode = a.data.dataInfo.qrcode, o.globalData.mobile = a.data.dataInfo.phone, 
                t.wxParse("aboutus", "html", a.data.dataInfo.aboutus, e, 5);
            }
        });
    },
    onShow: function() {
        var e = this;
        wx.request({
            url: a.localUrl + "mobileXcx/initialization",
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                for (var n = a.data.dataInfo.menuList, s = "", i = "", d = "", l = "", h = 0; h < n.length; h++) "home_01" == n[h][0] && (s = n[h][1], 
                i = n[h][1]), "home_02" == n[h][0] && (d = n[h][1]), "home_01_btn" == n[h][0] && (l = n[h][1]);
                e.setData({
                    home_01: s,
                    home_01_old: i,
                    home_01_btn: l,
                    home_02: d,
                    phone: a.data.dataInfo.phone,
                    posterList: a.data.dataInfo.posterList
                }), o.globalData.menuList = a.data.dataInfo.menuList, o.globalData.posterList = a.data.dataInfo.posterList, 
                o.globalData.qrcode = a.data.dataInfo.qrcode, o.globalData.mobile = a.data.dataInfo.phone, 
                t.wxParse("aboutus", "html", a.data.dataInfo.aboutus, e, 5);
            }
        });
    },
    mytouchstart: function(a) {
        this.setData({
            home_01: this.data.home_01_btn
        });
    },
    telPhone: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.phone
        });
    },
    onGotUserInfo: function(a) {
        a.detail.userInfo;
        o.globalData.userInfo = a.detail.userInfo;
    },
    shouquan: function(a) {}
});