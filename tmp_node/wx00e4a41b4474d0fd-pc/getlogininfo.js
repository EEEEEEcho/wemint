function e(e) {
    console.log("获取IM登录信息成功");
    var n = {};
    switch (n.userSig = l.globalData.userSig, n.userID = l.globalData.identifier, n.loginid = l.globalData.loginid, 
    n.userSplitID = l.globalData.single && l.globalData.single.id ? l.globalData.single.id : "", 
    n.sdkAppID = t.sdkAppID, n.accType = t.accType, n.serverDomain = t.roomServiceUrl + "/weapp/" + e.type + "/", 
    n.userName = e.userName, n.userAvatar = e.head, n.gender = e.sex, n.selToID = e.opt.id + "_" + t.houseId, 
    n.opt = e.opt, e.type) {
      case "multi_room":
      case "double_room":
        a.login({
            data: n,
            success: e.success,
            fail: e.fail
        });
        break;

      case "live_room":
        o.login({
            data: ret.data,
            success: e.success,
            fail: e.fail
        });
    }
}

var a = require("./utils/rtcroom.js"), o = require("./utils/liveroom.js"), t = require("./config.js"), n = require("./utils/util.js"), l = getApp();

module.exports = {
    getLoginInfo: function(a) {
        l.globalData.userInfo || (l.globalData.userInfo = wx.getStorageSync("userInfo")), 
        a.userName = l.globalData.userInfo.nickName || l.globalData.loginid || l.globalData.identifier, 
        a.gender = l.globalData.userInfo.gender, a.userAvatar = l.globalData.userInfo.avatarUrl, 
        a.code = l.globalData.code, a.openId = l.globalData.openid, e(a);
    },
    getUserInfo: function(e, a) {
        var o = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], i = this;
        if (l.globalData.isUserInfo = !0, wx.setStorageSync("ISauthorizeInfo", !0), console.log(e.detail, "***getUserInfo***"), 
        this.setData({
            showInfoModel: !1
        }), o && (l.globalData.globalUserInfoFlagForShare = !0), !e.detail.encryptedData || e.detail.errMsg.includes("deny")) "function" == typeof i.data.infoFailFun && i.data.infoFailFun(), 
        "function" == typeof a && a(!1); else {
            if (l.modifyUserInfo(e.detail.userInfo), !l.globalData.single || !l.globalData.single.id) {
                wx.reportMonitor && wx.reportMonitor("single", 1);
                var s = {
                    type: "mini-program-Error",
                    pvPageStayTime: new Date().getTime() / 1e3,
                    adviserId: "",
                    imTalkId: "",
                    imTalkType: "",
                    pvCurPageName: "getUserinfo.js-getUserInfo",
                    clkDesPage: "",
                    clkName: "",
                    clkId: "",
                    expand: JSON.stringify(l.globalData) + ";houseId=" + t.houseId
                };
                n.trackRequest(s);
            }
            l.globalData.userInfo = e.detail.userInfo, wx.setStorageSync("userInfo", e.detail.userInfo), 
            console.log("function" == typeof a), "function" == typeof i.data.infoFun && i.data.infoFun(), 
            "function" == typeof a && a(!0);
        }
    },
    authorizeInfo: function(e, a) {
        var o = this;
        l.globalData.userInfo = wx.getStorageSync("userInfo"), wx.getSetting({
            success: function(t) {
                console.log("getSetting", t), console.log(t.authSetting["scope.userInfo"], 0x126221562774bd00), 
                console.log(l.globalData.userInfo, 0x126221562774bd00), t.authSetting["scope.userInfo"] || l.globalData.isUserInfo ? (o.setData({
                    showInfoModel: !1
                }), "function" == typeof e && e()) : o.setData({
                    showInfoModel: !0,
                    infoFun: e,
                    infoFailFun: a || null
                });
            },
            fail: function() {
                wx.showToast({
                    title: "系统提示:网络错误",
                    icon: "warn",
                    duration: 1500
                });
            }
        });
    }
};