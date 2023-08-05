var e = require("utils/WXBizDataCrypt.js");

require("utils/wxapp.js"), require("utils/wxcomm.js"), require("utils/util.js");

App({
    onLaunch: function(e) {
        var t = this, a = wx.getStorageSync("logs") || [];
        a.unshift(Date.now()), wx.setStorageSync("logs", a), wx.login({
            success: function(e) {
                t.globalData.code = e.code;
            }
        }), wx.getSetting({
            success: function(e) {
                e.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(e) {
                        t.globalData.userInfo = e.userInfo, wx.setStorageSync("userInfo", e.userInfo), console.log(t.globalData.userInfo), 
                        t.userInfoReadyCallback && t.userInfoReadyCallback(e);
                    }
                });
            }
        });
    },
    editTabBar: function() {
        console.log("底部菜单1");
        var e = getCurrentPages(), t = e[e.length - 1], a = t.__route__;
        0 != a.indexOf("/") && (a = "/" + a);
        for (var i = this.globalData.tabBar, n = 0; n < i.list.length; n++) i.list[n].active = !1, 
        i.list[n].pagePath == a && (i.list[n].active = !0);
        t.setData({
            tabBar: i
        });
    },
    editTabBar2: function() {
        var e = getCurrentPages(), t = e[e.length - 1], a = t.__route__;
        0 != a.indexOf("/") && (a = "/" + a);
        for (var i = this.globalData.tabBar2, n = 0; n < i.list.length; n++) i.list[n].active = !1, 
        i.list[n].pagePath == a && (i.list[n].active = !0);
        t.setData({
            tabBar: i
        });
    },
    onShow: function(e) {
        1035 !== e.scene && "pages/share/share" !== e.path && "pages/index/index" !== e.path && "pages/position/position" !== e.path && "pages/circle/circle" !== e.path && "pages/find/find" !== e.path && "pages/my/my" !== e.path && (console.log("重启小程序"), 
        wx.reLaunch({
            url: "/pages/index/index"
        }));
    },
    globalData: {
        userInfo: null,
        code: "",
        merchantConfigId: "",
        tabBar: {
            color: "#9E9E9E",
            selectedColor: "#feb669",
            borderStyle: "white",
            list: [ {
                pagePath: "/pages/index/index",
                text: "首页",
                iconPath: "/utils/imgs/index.png",
                selectedIconPath: "/utils/imgs/indexs.png",
                clas: "menu-item",
                active: !0
            }, {
                pagePath: "/pages/find/find",
                text: "发现",
                iconPath: "/utils/imgs/find.png",
                selectedIconPath: "/utils/imgs/finds.png",
                clas: "menu-item",
                active: !1
            }, {
                pagePath: "/pages/monthCard/monthCard",
                text: "月卡",
                iconPath: "/utils/imgs/vip.png",
                selectedIconPath: "/utils/imgs/vip.png",
                clas: "menu-item",
                active: !1
            }, {
                pagePath: "/pages/circle/circle",
                text: "惠圈",
                iconPath: "/utils/imgs/cricle.png",
                selectedIconPath: "/utils/imgs/cricles.png",
                clas: "menu-item",
                active: !1
            }, {
                pagePath: "/pages/my/my",
                text: "我的",
                iconPath: "/utils/imgs/myico.png",
                selectedIconPath: "/utils/imgs/myicos.png",
                clas: "menu-item",
                active: !1
            } ],
            position: "bottom"
        },
        tabBar2: {
            color: "#9E9E9E",
            selectedColor: "#f00",
            backgroundColor: "#fff",
            borderStyle: "#ccc",
            list: [ {
                pagePath: "/pages/index/index",
                text: "首页",
                iconPath: "/img/home.png",
                selectedIconPath: "/img/home.png",
                clas: "menu-item2",
                active: !0
            }, {
                pagePath: "/pages/logs/logs",
                text: "日志",
                iconPath: "/img/note.png",
                selectedIconPath: "/img/note.png",
                clas: "menu-item2",
                active: !1
            }, {
                pagePath: "/pages/cont/index",
                text: "指南",
                iconPath: "/img/note.png",
                selectedIconPath: "/img/home.png",
                clas: "menu-item2",
                active: !1
            }, {
                pagePath: "/pages/detail/index",
                text: "内容",
                iconPath: "/img/safari.png",
                clas: "menu-item2",
                active: !1
            } ],
            position: "bottom"
        }
    },
    WXBizDataCrypt: function(t, a, i, n) {
        return new e(t, a).decryptData(i, n);
    }
});

var t = wx.getUpdateManager();

t.onCheckForUpdate(function(e) {
    console.log(e.hasUpdate);
}), t.onUpdateReady(function() {
    wx.showModal({
        title: "更新提示",
        content: "新版本已经准备好，是否重启应用？",
        success: function(e) {
            t.applyUpdate();
        }
    });
}), t.onUpdateFailed(function() {
    t.onCheckForUpdate(function(e) {
        console.log(e.hasUpdate);
    });
});