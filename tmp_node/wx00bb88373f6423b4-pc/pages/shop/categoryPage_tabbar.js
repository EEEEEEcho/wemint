var s = getApp();

require("../../components/utils/imgutil.js"), require("../../components/utils/util.js");

Page({
    isloading: !1,
    data: {
        classlist: [],
        classid: 0,
        tabHeight: 0,
        pagesize: 13,
        recordcount: 99,
        productlist: [],
        hasproduct: !1,
        baseUrl: s.globalData.siteBaseUrl,
        falgAjax: !0,
        buttonClicked: !1,
        resList: [],
        noSublist: [],
        nosubOne: {},
        showClassNameList: [],
        showClassNameTop: {
            isShow: !1,
            name: ""
        }
    },
    onLoad: function(t) {
        var a = this;
        s.getPageUrl(a, t), s.registerGlobalFunctions(a), a.setData({
            queryparams: t
        }), a.getTabHeight(), a.loadClassList();
    },
    onFocus: function() {
        wx.navigateTo({
            url: "./searchPage"
        });
    },
    getTabHeight: function() {
        this.setData({
            tabHeight: wx.getSystemInfoSync().windowHeight - wx.getSystemInfoSync().windowWidth / 750 * 110
        });
    },
    loadClassList: function() {
        var t = this;
        s.sendRequest({
            url: "/index.php?c=Front/WxApp/JsonApi&a=getProductClassThree",
            method: "GET",
            success: function(s) {
                if (s.success) {
                    t.setData({
                        resList: s.list
                    });
                    var a = [];
                    s.list.forEach(function(s) {
                        if (s.ClassID == t.data.classid) return t.setData({
                            productTitleText: s.Name
                        }), !1;
                        null == s.sublist && a.push(s);
                    });
                    var e = s.list[0].ClassID;
                    if (null != s.list[0].sublist) l = s.list[0].sublist; else {
                        var i = [];
                        i.push(s.list[0]);
                        var l = i;
                    }
                    s.list[0].Name.length > 8 && t.setData({
                        showClassNameTop: {
                            isShow: !0,
                            name: s.list[0].Name
                        }
                    }), t.setData({
                        showClassNameList: s.list
                    });
                    for (var n = 0; n < s.list.length; n++) if (s.list[n].Name.length > 8) {
                        s.list[n].Name = s.list[n].Name.substring(0, 8);
                        var o = s.list[n].Name.substring(0, 4), r = s.list[n].Name.substring(4, 8);
                        s.list[n].Name = o + r;
                    }
                    t.setData({
                        classlist: s.list,
                        sublist: l,
                        noSublist: a,
                        classid: e
                    });
                } else console.log("getProductClassList fail：" + s.msg);
            },
            fail: function(s) {
                console.log("getProductClassList fail");
            }
        });
    },
    onClassChange: function(s) {
        var t = this;
        if (t.data.classid == s.currentTarget.dataset.classid) return !1;
        for (var a = 0; a < t.data.showClassNameList.length; a++) t.data.showClassNameList[a].ClassID == s.currentTarget.dataset.classid && (t.data.showClassNameList[a].Name.length >= 8 ? t.setData({
            showClassNameTop: {
                isShow: !0,
                name: t.data.showClassNameList[a].Name
            }
        }) : t.setData({
            showClassNameTop: {
                isShow: !1,
                name: t.data.showClassNameList[a].Name
            }
        }));
        if (t.setData({
            classid: s.currentTarget.dataset.classid
        }), 0 == t.data.classid) {
            t.data.sublist = [];
            for (var e = t.data.sublist, i = 1; i < t.data.resList.length; i++) null !== t.data.resList[i].sublist && (e = e.concat(t.data.resList[i].sublist));
            t.setData({
                sublist: e
            });
        } else for (i = 0; i < this.data.classlist.length; i++) this.data.classid == this.data.classlist[i].ClassID && this.setData({
            sublist: this.data.classlist[i].sublist
        });
        var l = s.currentTarget.dataset.classid;
        if (null == e) for (i = 0; i < t.data.noSublist.length; i++) {
            var n = t.data.noSublist[i];
            if (n.ClassID == l) return void t.setData({
                nosubOne: n
            });
        }
    },
    showClassProducts: function(s) {
        var t = s.currentTarget.dataset.classid, a = s.currentTarget.dataset.classname, e = this;
        e.setData({
            buttonClicked: !0
        }), setTimeout(function() {
            e.setData({
                buttonClicked: !1
            });
        }, 500), wx.navigateTo({
            url: "productlist?classid=" + t + "&classname=" + a
        });
    }
});