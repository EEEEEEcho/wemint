var s = getApp(), t = (require("../../components/utils/imgutil.js"), require("../../components/utils/util.js"));

Page({
    isloading: !1,
    onShareAppMessage: function() {
        return s.shareAppMessage("/pages/shop/newslist");
    },
    onLoad: function(t) {
        s.getPageUrl(this, t), s.registerGlobalFunctions(this), this.setData({
            queryparams: t,
            classid: t.classid || 0
        }), this.loadClassList(), this.loadNewsList(!0), wx.setNavigationBarTitle({
            title: s.globalData.TitleName ? s.globalData.TitleName[0].TitleName : "企业资讯"
        });
    },
    data: {
        pagesize: 10,
        recordcount: 99,
        newslist: [],
        sortcol: "",
        sort: "",
        hasproduct: !0,
        baseUrl: s.globalData.siteBaseUrl,
        animationData: {},
        plugNavFlag: !0,
        scrollHeight: s.windowHeight * s.pixelRatio - 40
    },
    loadNewsList: function(t) {
        var a = this;
        if (!a.isloading) {
            a.isloading = !0, t && (a.data.recordcount = 99, a.data.newslist = []);
            var e = a.data.recordcount, i = a.data.newslist.length;
            if (e > i) {
                var l = Math.ceil(i / a.data.pagesize) + 1, n = a.data.queryparams.keyword ? a.data.queryparams.keyword : "", o = "";
                a.data.sortcol && (o = "&sortcol=" + a.data.sortcol + "&sort=" + a.data.sort), s.sendRequest({
                    url: "/index.php?c=Front/WxApp/JsonApi&a=getnewslist&keyword=" + n + "&page=" + l + "&pagesize=" + a.data.pagesize + o + "&classid=" + a.data.classid,
                    method: "GET",
                    success: function(s) {
                        if (a.isloading = !1, s.success) {
                            for (var t = 0; t < s.newslist.length; t++) s.newslist[t].PublishTime = s.newslist[t].PublishTime.split(" ")[0], 
                            s.newslist[t].PublishYear = s.newslist[t].PublishTime.split("-")[0], s.newslist[t].PublishDate = s.newslist[t].PublishTime.split("-")[1] + "/" + s.newslist[t].PublishTime.split("-")[2], 
                            a.data.newslist.push(s.newslist[t]);
                            a.data.newslist.forEach(function(s, t) {
                                var e = s.PublishTime.split("-");
                                a.data.newslist[t].dateYearAndMOnth = e[0] + "-" + e[1], a.data.newslist[t].day = e[2];
                            }), a.setData({
                                newslist: a.data.newslist,
                                recordcount: s.recordcount,
                                hasnews: a.data.newslist.length > 0
                            });
                        } else console.log("loadNewsList fail：" + s.msg);
                    },
                    fail: function(s) {
                        a.isloading = !1, console.log("loadNewsList fail");
                    }
                });
            }
        }
    },
    loadClassList: function() {
        var t = this;
        s.sendRequest({
            url: "/index.php?c=Front/WxApp/JsonApi&a=getNewsClassList",
            method: "GET",
            success: function(s) {
                s.success ? (null == s.list ? t.setData({
                    showClassNav: !1
                }) : t.setData({
                    showClassNav: !0
                }), s.list.unshift({
                    ClassID: 0,
                    Name: "全部分类"
                }), s.list.forEach(function(s) {
                    if (s.ClassID == t.data.classid && s.ClassID > 0) return !1;
                }), t.setData({
                    classlist: s.list
                })) : console.log("getNewsClassList fail：" + s.msg);
            },
            fail: function(s) {
                console.log("getNewsClassList fail");
            }
        });
    },
    onClassChange: function(s) {
        if (this.data.classid == s.currentTarget.dataset.classid) return !1;
        this.setData({
            classid: s.currentTarget.dataset.classid
        }), this.isloading = !1, this.loadNewsList(!0);
    },
    onSearchSubmit: function(a) {
        var e = t.trim(a.detail.value.keyword);
        e ? wx.redirectTo({
            url: "newslist?keyword=" + e
        }) : s.showModal({
            title: "提示",
            content: "请输入关键词"
        });
    },
    onKeywordChange: function(a) {
        var e = t.trim(a.detail.value);
        e ? e && wx.redirectTo({
            url: "newslist?keyword=" + e
        }) : s.showModal({
            title: "提示",
            content: "请输入关键词"
        });
    },
    goNewsDetail: function(s) {
        var t = s.currentTarget.dataset.newsid;
        wx.navigateTo({
            url: "newsdetail?id=" + t
        });
    },
    onNewsListScroll: function(s) {
        this.loadNewsList();
    },
    navBtnShowAndHide: function() {
        var s = !this.data.plugNavFlag;
        this.setData({
            plugNavFlag: s
        });
    }
});