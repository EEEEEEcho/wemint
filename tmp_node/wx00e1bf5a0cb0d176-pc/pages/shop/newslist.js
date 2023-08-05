var a = getApp(), s = (require("../../components/utils/imgutil.js"), require("../../components/utils/util.js")), t = require("../../common.js"), e = require("../../components/wxb.js");

Page({
    isloading: !1,
    onShareAppMessage: function() {
        return a.shareAppMessage("/pages/shop/newslist");
    },
    onLoad: function(s) {
        a.getPageUrl(this, s), a.registerGlobalFunctions(this), this.setData({
            queryparams: s,
            classid: s.classid || 0,
            readArticles: a.globalData.getMobileNode ? a.globalData.getMobileNode.readArticles : 0
        }), this.loadClassList(), this.loadNewsList(!0), wx.setNavigationBarTitle({
            title: a.globalData.TitleName ? a.globalData.TitleName[0].TitleName : "企业资讯"
        }), t.setPopupFromShare();
    },
    onPullDownRefresh: function() {
        var a = this;
        a.data.pullDownRefreshFlag && (a.setData({
            pullDownRefreshFlag: !1
        }), a.data.pullDownRefreshFlag = !1, a.data.queryparams.refresh = !0, setTimeout(function() {
            a.onLoad(a.data.queryparams), a.setData({
                pullDownRefreshFlag: !0
            }), wx.stopPullDownRefresh();
        }, 1500));
    },
    data: {
        pagesize: 10,
        recordcount: 99,
        newslist: [],
        sortcol: "",
        sort: "",
        hasproduct: !0,
        pullDownRefreshFlag: !0,
        baseUrl: a.globalData.siteBaseUrl,
        animationData: {},
        reminder: "授权提示",
        matter: "授权失败，请重新授权",
        abrogate: "暂时先不",
        permission: "允许",
        plugNavFlag: !0,
        scrollHeight: a.windowHeight * a.pixelRatio - 40
    },
    loadNewsList: function(s) {
        var t = this;
        if (!t.isloading) {
            t.isloading = !0, s && (t.data.recordcount = 99, t.data.newslist = []);
            var e = t.data.recordcount, i = t.data.newslist.length;
            if (e > i) {
                var l = Math.ceil(i / t.data.pagesize) + 1, o = t.data.queryparams.keyword ? t.data.queryparams.keyword : "", n = "";
                t.data.sortcol && (n = "&sortcol=" + t.data.sortcol + "&sort=" + t.data.sort), a.sendRequest({
                    url: "/index.php?c=Front/WxApp/JsonApi&a=getnewslist&keyword=" + o + "&page=" + l + "&pagesize=" + t.data.pagesize + n + "&classid=" + t.data.classid,
                    method: "GET",
                    success: function(a) {
                        if (t.isloading = !1, a.success) {
                            for (var s = 0; s < a.newslist.length; s++) a.newslist[s].PublishTime = a.newslist[s].PublishTime.split(" ")[0], 
                            a.newslist[s].PublishYear = a.newslist[s].PublishTime.split("-")[0], a.newslist[s].PublishDate = a.newslist[s].PublishTime.split("-")[1] + "/" + a.newslist[s].PublishTime.split("-")[2], 
                            t.data.newslist.push(a.newslist[s]);
                            t.data.newslist.forEach(function(a, s) {
                                var e = a.PublishTime.split("-");
                                t.data.newslist[s].dateYearAndMOnth = e[0] + "-" + e[1], t.data.newslist[s].day = e[2];
                            }), t.setData({
                                newslist: t.data.newslist,
                                recordcount: a.recordcount,
                                hasnews: !(t.data.newslist.length > 0)
                            });
                        } else console.log("loadNewsList fail：" + a.msg);
                    },
                    fail: function(a) {
                        t.isloading = !1, console.log("loadNewsList fail");
                    }
                });
            }
        }
    },
    loadClassList: function() {
        var s = this;
        a.sendRequest({
            url: "/index.php?c=Front/WxApp/JsonApi&a=getNewsClassList",
            method: "GET",
            success: function(a) {
                a.success ? (null == a.list ? s.setData({
                    showClassNav: !1
                }) : s.setData({
                    showClassNav: !0
                }), a.list.unshift({
                    ClassID: 0,
                    Name: "全部分类"
                }), a.list.forEach(function(a) {
                    if (a.ClassID == s.data.classid && a.ClassID > 0) return !1;
                }), s.setData({
                    classlist: a.list
                })) : console.log("getNewsClassList fail：" + a.msg);
            },
            fail: function(a) {
                console.log("getNewsClassList fail");
            }
        });
    },
    onClassChange: function(a) {
        if (this.data.classid == a.currentTarget.dataset.classid) return !1;
        this.setData({
            classid: a.currentTarget.dataset.classid
        }), this.isloading = !1, this.loadNewsList(!0);
    },
    onSearchSubmit: function(t) {
        var e = s.trim(t.detail.value.keyword);
        e ? wx.redirectTo({
            url: "newslist?keyword=" + e
        }) : a.showModal({
            title: "提示",
            content: "请输入关键词"
        });
    },
    onKeywordChange: function(t) {
        var e = s.trim(t.detail.value);
        e ? e && wx.redirectTo({
            url: "newslist?keyword=" + e
        }) : a.showModal({
            title: "提示",
            content: "请输入关键词"
        });
    },
    goNewsDetail: function(s) {
        var t = this;
        this.setData({
            newsid: s.currentTarget.dataset.newsid
        });
        var e = wx.getStorageSync("hasMobile") || 0, i = a.globalData.getMobileNode ? a.globalData.getMobileNode.readArticles : 0;
        0 === a.globalData.hasMobile && 0 === e && 0 !== i ? this.setData({
            phonelicense: !0
        }) : wx.navigateTo({
            url: "newsdetail?id=" + t.data.newsid
        });
    },
    getPhoneNumber: function(s) {
        var t = this, i = a.globalData.getMobileNode ? a.globalData.getMobileNode.readArticles : 0;
        if (s.detail.errMsg.indexOf("getPhoneNumber:ok") > -1) {
            var l = a.globalData.appId, o = a.globalData.session_key, n = new e(l, o).decryptData(s.detail.encryptedData, s.detail.iv);
            a.loadphoneInfo(n.phoneNumber), wx.navigateTo({
                url: "newsdetail?id=" + t.data.newsid
            });
        } else 2 == i ? t.setData({
            allowspopup: !0
        }) : wx.navigateTo({
            url: "newsdetail?id=" + t.data.newsid
        });
    },
    abolish: function() {
        this.setData({
            allowspopup: !1
        });
    },
    turnOff: function() {
        a.turnOff();
    },
    onNewsListScroll: function(a) {
        this.loadNewsList();
    },
    onReachBottom: function() {
        this.loadNewsList();
    },
    navBtnShowAndHide: function() {
        var a = !this.data.plugNavFlag;
        this.setData({
            plugNavFlag: a
        });
    }
});