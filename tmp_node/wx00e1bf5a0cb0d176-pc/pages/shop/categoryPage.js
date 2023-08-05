var t = getApp();

require("../../components/utils/imgutil.js"), require("../../components/utils/util.js");

Page({
    isloading: !1,
    data: {
        classlist: [],
        classid: "",
        tabHeight: 0,
        baseUrl: t.globalData.siteBaseUrl,
        buttonClicked: !1,
        tabShowFlag: !1,
        onlyOneFlag: !1,
        haveTwoFlag: !1,
        haveThreeFlag: !1,
        scrollTop: 0,
        pullDownRefreshFlag: !0,
        tabScrollTop: 0
    },
    onLoad: function(s) {
        var a = this;
        t.getPageUrl(a, s), t.registerGlobalFunctions(a), a.setData({
            queryparams: s
        }), a.getTabHeight(), a.loadClassList();
    },
    onPullDownRefresh: function() {
        var t = this;
        t.data.pullDownRefreshFlag && (t.setData({
            pullDownRefreshFlag: !1
        }), t.data.pullDownRefreshFlag = !1, t.data.queryparams.refresh = !0, setTimeout(function() {
            t.onLoad(t.data.queryparams), t.setData({
                pullDownRefreshFlag: !0
            }), wx.stopPullDownRefresh();
        }, 1500));
    },
    onFocus: function() {
        wx.navigateTo({
            url: "./searchPage"
        });
    },
    getTabHeight: function() {
        var t = null;
        t = 320 == wx.getSystemInfoSync().windowWidth ? parseInt(wx.getSystemInfoSync().windowWidth - wx.getSystemInfoSync().windowWidth / 750 * 164) - 7 : parseInt(wx.getSystemInfoSync().windowWidth - wx.getSystemInfoSync().windowWidth / 750 * 164) - 10, 
        this.setData({
            tabHeight: wx.getSystemInfoSync().windowHeight - wx.getSystemInfoSync().windowWidth / 750 * 106,
            tabWidth: t
        });
    },
    loadClassList: function() {
        var s = this;
        t.sendRequest({
            url: "/index.php?c=Front/WxApp/JsonApi&a=getProductClassThree",
            method: "GET",
            success: function(t) {
                if (t.success) {
                    if (s.setData({
                        haveThreeFlag: !1,
                        haveTwoFlag: !1,
                        newList: [],
                        classlist: []
                    }), "" != t.list) {
                        if (t.list.forEach(function(t) {
                            null != t.sublist && s.setData({
                                tabShowFlag: !0
                            });
                        }), t.list[0].Name = t.list[0].Name.substring(0, 8), null != t.list[0].sublist) {
                            s.setData({
                                firstClassifyImg: t.list[0].Image
                            });
                            for (var a = !1, e = 0; e < t.list[0].sublist.length; e++) null != t.list[0].sublist[e].sublist && (a = !0);
                            t.list[0].sublist.forEach(function(t) {
                                t.secondName = t.Name.substring(0, 8), t.Name.length > 6 ? t.itemName = t.Name.substring(0, 6) + "..." : t.itemName = t.Name, 
                                null != t.sublist && t.sublist.forEach(function(t) {
                                    t.Name.length > 6 ? t.thirdName = t.Name.substring(0, 6) + "..." : t.thirdName = t.Name;
                                });
                            }), a ? s.setData({
                                firstName: t.list[0].Name,
                                firstID: t.list[0].ClassID,
                                newList: t.list[0].sublist,
                                haveThreeFlag: !0
                            }) : s.setData({
                                firstName: t.list[0].Name,
                                firstID: t.list[0].ClassID,
                                newList: t.list[0].sublist,
                                title: t.list[0].Name,
                                haveTwoFlag: !0
                            });
                        } else t.list.forEach(function(t) {
                            t.Name.length > 6 ? t.itemName = t.Name.substring(0, 6) + "..." : t.itemName = t.Name;
                        }), s.setData({
                            newList: t.list[0],
                            onlyOneFlag: !0
                        });
                        for (var l = t.list[0].ClassID, e = 0; e < t.list.length; e++) if (t.list[e].Name.length > 8) {
                            t.list[e].Name = t.list[e].Name.substring(0, 8);
                            var i = t.list[e].Name.substring(0, 4), n = t.list[e].Name.substring(4, 8);
                            t.list[e].Name = i + n;
                        }
                        s.data.tabShowFlag || t.list.forEach(function(t) {
                            t.Name.length > 6 && (t.Name = t.Name.substring(0, 6) + "...");
                        }), s.setData({
                            classlist: t.list,
                            classid: l
                        });
                    }
                } else console.log("getProductClassList fail：" + t.msg);
            },
            fail: function(t) {
                console.log("getProductClassList fail");
            }
        });
    },
    onClassChange: function(t) {
        var s = this;
        if (s.data.classid != t.currentTarget.dataset.classid) {
            var a = 50 * (t.currentTarget.dataset.idx - 1);
            s.setData({
                scrollTop: 0,
                tabScrollTop: a
            }), s.data.classlist.forEach(function(a) {
                if (a.ClassID == t.currentTarget.dataset.classid) if (null != a.sublist) {
                    s.setData({
                        firstClassifyImg: a.Image
                    });
                    var e = !1;
                    a.sublist.forEach(function(t) {
                        t.secondName = t.Name.substring(0, 8), null != t.sublist && (e = !0), t.Name.length > 6 ? t.itemName = t.Name.substring(0, 6) + "..." : t.itemName = t.Name, 
                        null != t.sublist && t.sublist.forEach(function(t) {
                            t.Name.length > 6 ? t.thirdName = t.Name.substring(0, 6) + "..." : t.thirdName = t.Name;
                        });
                    }), e ? s.setData({
                        firstName: a.Name,
                        firstID: a.ClassID,
                        newList: a.sublist,
                        haveThreeFlag: !0,
                        haveTwoFlag: !1,
                        onlyOneFlag: !1
                    }) : s.setData({
                        firstName: a.Name,
                        firstID: a.ClassID,
                        newList: a.sublist,
                        title: a.Name,
                        haveTwoFlag: !0,
                        onlyOneFlag: !1,
                        haveThreeFlag: !1
                    });
                } else s.setData({
                    newList: a,
                    onlyOneFlag: !0,
                    haveTwoFlag: !1,
                    haveThreeFlag: !1
                });
            }), s.setData({
                classid: t.currentTarget.dataset.classid
            });
        }
    },
    showClassProducts: function(t) {
        var s = t.currentTarget.dataset.classid, a = t.currentTarget.dataset.classname, e = this;
        e.setData({
            buttonClicked: !0
        }), setTimeout(function() {
            e.setData({
                buttonClicked: !1
            });
        }, 500), wx.navigateTo({
            url: "productlist?classid=" + s + "&classname=" + a
        });
    }
});