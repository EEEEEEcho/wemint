function a(a, e, o, n) {
    wx.request({
        url: t.localUrl + "mobileXcx/stuActivityList",
        data: {
            crm_code: t.crm_code,
            tourist: "tourist",
            is_pay: o,
            currentPage: a,
            rowCountPerPage: e
        },
        header: {
            "content-type": "application/json"
        },
        success: function(a) {
            n(a.data);
        }
    });
}

var t = require("../../../utils/main.js"), e = (require("../../../utils/util.js"), 
getApp());

Page({
    data: {
        activityList: [],
        movies: [ {
            url: "http://p7mq9gjza.bkt.clouddn.com/tmp/wx22a96a8600887d94.o6zAJs06o19VUQ965086eUdcvhAk.KlhJUjf2yGkVa71797eedd9b38ad06e2efe8d5a0ffbd.png"
        }, {
            url: "http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg"
        }, {
            url: "http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg"
        }, {
            url: "http://img02.tooopen.com/images/20141231/sy_78327074576.jpg"
        } ],
        activityList2: [],
        searchPageNum: 1,
        callbackcount: 4,
        mobile: "0531—87969509"
    },
    onLoad: function(o) {
        var n = this;
        wx.request({
            url: t.localUrl + "mobileXcx/initialization",
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                e.globalData.menuList = a.data.dataInfo.menuList, e.globalData.posterList = a.data.dataInfo.posterList, 
                e.globalData.qrcode = a.data.dataInfo.qrcode, e.globalData.mobile = a.data.dataInfo.phone, 
                e.globalData.acList = a.data.dataInfo.acList, console.log(e.globalData.acList);
            }
        }), this.setData({
            userInfo: e.globalData.userInfo,
            mobile: e.globalData.mobile
        });
        for (var i = "http://p7mq9gjza.bkt.clouddn.com/ca01.png", c = "http://p7mq9gjza.bkt.clouddn.com/ca02.png", d = "http://p7mq9gjza.bkt.clouddn.com/ca03.png", l = "http://p7mq9gjza.bkt.clouddn.com/ca04.png", s = "http://p7mq9gjza.bkt.clouddn.com/ca05.png", u = "http://p7mq9gjza.bkt.clouddn.com/ca06.png", g = "http://p7mq9gjza.bkt.clouddn.com/ca07.png", m = "http://p7mq9gjza.bkt.clouddn.com/ca08.png", r = e.globalData.menuList, p = 0; p < r.length; p++) "ac_menu_01" == r[p][0] && (i = r[p][1]), 
        "ac_menu_02" == r[p][0] && (c = r[p][1]), "ac_menu_03" == r[p][0] && (d = r[p][1]), 
        "ac_menu_04" == r[p][0] && (l = r[p][1]), "ac_menu_05" == r[p][0] && (s = r[p][1]), 
        "ac_menu_06" == r[p][0] && (u = r[p][1]), "ac_menu_07" == r[p][0] && (g = r[p][1]), 
        "ac_menu_08" == r[p][0] && (m = r[p][1]);
        n.setData({
            ac_menu_01: i,
            ac_menu_02: c,
            ac_menu_03: d,
            ac_menu_04: l,
            ac_menu_05: s,
            ac_menu_06: u,
            ac_menu_07: g,
            ac_menu_08: m
        }), a(n.data.searchPageNum, n.data.callbackcount, 1, function(a) {
            console.log(a.dataInfo.dataList.length);
            var t = [], e = [], o = [];
            a.dataInfo.dataList.length > 0 && (t = a.dataInfo.dataList[0]), a.dataInfo.dataList.length > 1 && (e = a.dataInfo.dataList[1]), 
            a.dataInfo.dataList.length > 2 && (o = a.dataInfo.dataList[2]), n.setData({
                activityList: a.dataInfo.dataList,
                ac1: t,
                ac2: e,
                ac3: o
            });
        }), a(n.data.searchPageNum, n.data.callbackcount, 0, function(a) {
            console.log(a.dataInfo.dataList.length);
            var t = [], e = [], o = [];
            a.dataInfo.dataList.length > 0 && (t = a.dataInfo.dataList[0]), a.dataInfo.dataList.length > 1 && (e = a.dataInfo.dataList[1]), 
            a.dataInfo.dataList.length > 2 && (o = a.dataInfo.dataList[2]), n.setData({
                activityList2: a.dataInfo.dataList,
                ac4: t,
                ac5: e,
                ac6: o
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    imageLoad: function(a) {
        var t = 230 / (a.detail.width / a.detail.height);
        this.setData({
            imgwidth: 230,
            imgheight: t
        });
    },
    tourist: function(a) {
        a.detail.userInfo;
        e.globalData.userInfo = a.detail.userInfo, this.setData({
            userInfo: e.globalData.userInfo
        }), wx.login({
            success: function(a) {
                a.code && (wx.showLoading({
                    mask: !0
                }), wx.request({
                    url: t.localUrl + "mobileXcx/getOpenId",
                    data: {
                        code: a.code
                    },
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(a) {
                        console.log(a), wx.hideLoading(), null != a.data.openid & void 0 != a.data.openid && (console.info("登录成功返回的openId：" + a.data.openid), 
                        e.globalData.openId = a.data.openid, wx.navigateTo({
                            url: "../mine/mine"
                        }));
                    }
                }));
            }
        });
    },
    gengduo: function(a) {
        var t = a.currentTarget.dataset.is_pay;
        wx.navigateTo({
            url: "../home/home?is_pay=" + t
        });
    },
    view: function(a) {
        t.collectFomrId(a.detail.formId, parseInt(new Date().getTime() / 1e3) + 604800);
        var e = a.detail.target.dataset.id;
        wx.navigateTo({
            url: "../activityView/activityView?id=" + e + "&isPay=0"
        });
    },
    topImgView: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../activityView/activityView?id=" + t + "&isPay=0"
        });
    },
    acList: function(a) {
        t.collectFomrId(a.detail.formId, parseInt(new Date().getTime() / 1e3) + 604800);
        var e = a.detail.target.dataset.is_pay;
        wx.navigateTo({
            url: "../home/home?is_pay=" + e
        });
    },
    acUe: function(a) {
        t.collectFomrId(a.detail.formId, parseInt(new Date().getTime() / 1e3) + 604800);
        var e = a.detail.target.dataset.alias;
        wx.navigateTo({
            url: "../acUe/acUe?alias=" + e
        });
    },
    album: function(a) {
        t.collectFomrId(a.detail.formId, parseInt(new Date().getTime() / 1e3) + 604800), 
        wx.navigateTo({
            url: "../album/album"
        });
    }
});