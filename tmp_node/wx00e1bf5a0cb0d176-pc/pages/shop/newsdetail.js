var e = getApp(), t = (require("../../components/utils/imgutil.js"), require("../../common.js")), a = require("../../components/wxb.js");

Page({
    isloading: !1,
    bannerLoaded: !1,
    url: !1,
    onShareAppMessage: function() {
        var t = this, a = t.data.newsInfo.ArticleID;
        return t.addTranspond(a), e.shareAppMessage({
            url: this.url,
            title: this.data.newsInfo.Title
        });
    },
    onLoad: function(a) {
        var s = this;
        if (a.scene) {
            var i = {};
            decodeURIComponent(a.scene).split("&").map(function(e, t) {
                if (-1 !== e.indexOf("=")) {
                    var a = e.split("=");
                    i[a[0]] = a[1];
                }
            }), a = i;
        }
        a.businessid && s.loadData(a.businessid), (!a.businessid && e.globalData.businessCardInfo || !a.businessid && wx.getStorageSync("businessCardId")) && (a.businessid = e.globalData.businessCardInfo.businessCardID ? e.globalData.businessCardInfo.businessCardID : wx.getStorageSync("businessCardId")), 
        s.url = e.getPageUrl(s, a), e.registerGlobalFunctions(s), this.setData({
            userID: e.globalData.WebUserID,
            queryparams: a,
            authorization: 1
        }), a.SiteID && "" != a.SiteID ? s.setData({
            cardsiteID: a.SiteID
        }) : e.globalData.baseInfo.SiteID ? s.setData({
            cardsiteID: e.globalData.baseInfo.SiteID
        }) : s.getSiteId(), this.loadNews(), t.setPopupFromShare(), s.getUserWhetherLike(a);
        var n = wx.getStorageSync("hasMobile") || 0, o = e.globalData.getMobileNode ? e.globalData.getMobileNode.readArticles : 0, r = 0, d = getCurrentPages(), l = d[d.length - 1];
        s.data.queryparams.id && (r = s.data.queryparams.id), 0 === e.globalData.hasMobile && 0 === n && "1" === s.data.queryparams.fromShare && 0 !== o && (this.setData({
            phonestatus: 1
        }), 2 === o ? wx.redirectTo({
            url: "/pages/phoneauthorization/index?getMobileNode=" + o + "&pageroute=" + l.route + "&id=" + r
        }) : this.setData({
            phonelicense: !0
        })), s.setData({
            authorization: 1
        }), wx.getSystemInfo({
            success: function(e) {
                "iOS" === e.system.split(" ")[0] ? s.setData({
                    modelType: !0
                }) : "Android" === e.system.split(" ")[0] && s.setData({
                    modelType: !1
                });
            }
        });
    },
    data: {
        baseUrl: e.globalData.siteBaseUrl,
        hasLike: !1,
        isBlank: !1,
        showCardFlag: !1,
        commentcontent: "",
        authorization: 1,
        canhold: !0,
        loseEfficacy: !1,
        modelType: !0,
        phonelicense: !1,
        fork: !1,
        reminder: "授权提示",
        matter: "授权失败，请重新授权",
        abrogate: "暂时先不",
        permission: "允许",
        layout: 1,
        proList: []
    },
    loadNews: function() {
        var t = this;
        if (!t.isloading) {
            t.isloading = !0;
            var a = 0;
            t.data.queryparams.id && (a = t.data.queryparams.id), e.sendRequest({
                url: "/index.php?c=Front/WxApp/JsonApi&a=getNewsInfo&id=" + a + "&prevnext=1&updateHits=1",
                method: "GET",
                success: function(s) {
                    if (t.isloading = !1, s.success) if (s.info.Content) {
                        if (e.globalData.WebUserID) if (wx.getStorageSync("businessCardInfo").admin) if (wx.getStorageSync("otherMemberCardId")) {
                            var i = {
                                tbUserID: e.globalData.WebUserID,
                                tbType: "12",
                                tbTypeID: a,
                                tbTypeName: s.info.Title,
                                tbTypeImg: s.info.ImgBig,
                                tbBusinessCardID: wx.getStorageSync("otherMemberCardId")
                            };
                            e.buried(i, function(e) {});
                        } else {
                            var n = {
                                tbUserID: e.globalData.WebUserID,
                                tbType: "12",
                                tbTypeID: a,
                                tbTypeName: s.info.Title,
                                tbTypeImg: s.info.ImgBig,
                                tbBusinessCardID: 0
                            };
                            e.buried(n, function(e) {});
                        } else {
                            var o = {
                                tbUserID: e.globalData.WebUserID,
                                tbType: "12",
                                tbTypeID: a,
                                tbTypeName: s.info.Title,
                                tbTypeImg: s.info.ImgBig,
                                tbBusinessCardID: t.data.showCardFlag ? t.data.queryparams.businessid : wx.getStorageSync("businessCardId") ? wx.getStorageSync("businessCardId") : 0
                            };
                            e.buried(o, function(e) {});
                        }
                        wx.setNavigationBarTitle({
                            title: s.info.Title
                        }), s.info.PublishTime = s.info.PublishTime.split(" ")[0], e.WxParse.wxParse("DetailInfo", "html", s.info.Content, t, 5), 
                        "" == s.info.CommentList && t.setData({
                            isBlank: !0
                        }), s.articleProductDataList && s.articleProductDataList.length > 0 && s.articleProductDataList.forEach(function(e) {
                            "" !== e.images && null !== e.images && (e.BigImages = e.images.split(",")[0]);
                        }), t.setData({
                            newsInfo: s.info,
                            layout: s.showStyle,
                            proList: s.articleProductDataList
                        });
                    } else t.setData({
                        loseEfficacy: !0
                    }); else console.log("getNewsInfo fail：" + s.msg);
                },
                fail: function(e) {
                    t.isloading = !1, console.log("getNewsInfo fail");
                }
            });
        }
    },
    sharetoFriend: function() {},
    getUserWhetherLike: function(t) {
        var a = this, s = t.id, i = e.globalData.WebUserID ? e.globalData.WebUserID : 0;
        e.sendRequest({
            url: "/index.php?c=Front/WxApp/Dynamic/Dynamic&a=getUserWhetherLike&ArticleID=" + s + "&UserID=" + i,
            method: "GET",
            success: function(e) {
                e.success ? a.setData({
                    hasLike: 1 == e.IsLike
                }) : console.log("getUserWhetherLike fail" + e.msg);
            },
            fail: function(e) {}
        });
    },
    addLike: function() {
        var t = this;
        if (t.data.hasLike) wx.showToast({
            title: "已为您标记为喜欢",
            icon: "none",
            mask: !0
        }); else {
            var a = t.data.newsInfo.ArticleID, s = e.globalData.WebUserID ? e.globalData.WebUserID : 0;
            e.sendRequest({
                url: "/index.php?c=Front/WxApp/Dynamic/Dynamic&a=addLike",
                method: "POST",
                data: {
                    ArticleID: a,
                    UserID: s
                },
                success: function(i) {
                    if (i.success) {
                        var n = t.data.newsInfo;
                        if (0 != s) if (wx.getStorageSync("businessCardInfo").admin) if (wx.getStorageSync("otherMemberCardId")) {
                            var o = {
                                tbUserID: s,
                                tbType: "13",
                                tbTypeID: a,
                                tbTypeName: n.Title,
                                tbTypeImg: n.ImgBig,
                                tbBusinessCardID: wx.getStorageSync("otherMemberCardId")
                            };
                            e.buried(o, function(e) {});
                        } else {
                            var r = {
                                tbUserID: s,
                                tbType: "13",
                                tbTypeID: a,
                                tbTypeName: n.Title,
                                tbTypeImg: n.ImgBig,
                                tbBusinessCardID: 0
                            };
                            e.buried(r, function(e) {});
                        } else {
                            var d = {
                                tbUserID: s,
                                tbType: "13",
                                tbTypeID: a,
                                tbTypeName: n.Title,
                                tbTypeImg: n.ImgBig,
                                tbBusinessCardID: t.data.showCardFlag ? t.data.queryparams.businessid : wx.getStorageSync("businessCardId") ? wx.getStorageSync("businessCardId") : 0
                            };
                            e.buried(d, function(e) {});
                        }
                        n.LikeCount = Number(n.LikeCount) + 1, t.setData({
                            newsInfo: n,
                            hasLike: !0
                        });
                    } else e.showToast({
                        title: i.msg,
                        icon: "none"
                    });
                },
                fail: function(e) {}
            });
        }
    },
    toComment: function(t) {
        var a = this;
        this.setData({
            articleuserid: e.globalData.WebUserID ? e.globalData.WebUserID : 0,
            articlesid: t.currentTarget.dataset.articleid
        });
        var s = wx.getStorageSync("hasMobile") || 0, i = e.globalData.getMobileNode ? e.globalData.getMobileNode.commentArticles : 0;
        0 === e.globalData.hasMobile && 0 === s && 0 !== i ? this.setData({
            phonelicense: !0,
            phonestatus: 2
        }) : a.evaluate();
    },
    evaluate: function() {
        var t = this;
        e.sendRequest({
            url: "/index.php?c=Front/WxApp/Dynamic/Dynamic&a=getUserCommentCount&ArticleID=" + t.data.articlesid + "&UserID=" + t.data.articleuserid,
            method: "GET",
            success: function(a) {
                a.success ? 0 == a.IsComment ? t.setData({
                    showForm: !0
                }) : e.showToast({
                    title: "文章评论不能超过10条",
                    icon: "none"
                }) : e.showToast({
                    title: a.msg,
                    icon: "none"
                });
            },
            fail: function(e) {}
        });
    },
    getSiteId: function() {
        var t = this;
        e.sendRequest({
            url: "/index.php?c=front/WxApp/BusinessCard/BusinessCard&a=getSiteID",
            method: "GET",
            success: function(e) {
                t.setData({
                    cardsiteID: e.siteID
                });
            }
        });
    },
    loadData: function(t) {
        var a = this;
        e.sendRequest({
            url: "/index.php?c=front/WxApp/BusinessCard/BusinessCard&a=getBusinessCardInfoByCardID_Simple&BusinessCardID=" + t,
            method: "GET",
            success: function(e) {
                if (e.success) {
                    var t = e.info;
                    t.PersonImg && t.UserName && t.Position && a.setData({
                        cardInfo: e.info,
                        showCardFlag: !0
                    });
                } else ;
            },
            fail: function(e) {
                console.log("getMyCenterData fail");
            },
            hideLoading: !0
        });
    },
    toCardDetail: function() {
        var t = this, a = t.data.queryparams.businessid, s = e.globalData.siteId, i = t.data.queryparams.userid;
        wx.navigateTo({
            url: "/pages/company/businessCard/cardDetails?BusinessCardID=" + a + "&SiteID=" + s + "&userid=" + i
        });
    },
    sendComment: function(e) {
        var t = e.detail.value.commentcontent;
        "" != t && this.addComment(t);
    },
    inputComment: function(e) {
        this.setData({
            commentcontent: e.detail.value
        });
    },
    sendclose: function(e) {
        var t = this, a = e.detail.value;
        "" == a ? t.setData({
            canhold: !0
        }) : (t.setData({
            canhold: !1
        }), t.addComment(a));
    },
    addComment: function(t) {
        var a = this, s = a.data.newsInfo, i = s.ArticleID, n = e.globalData.WebUserID ? e.globalData.WebUserID : 0;
        e.sendRequest({
            url: "/index.php?c=Front/WxApp/Dynamic/Dynamic&a=getArticleconfig",
            method: "GET",
            success: function(o) {
                o.success && e.sendRequest({
                    url: "/index.php?c=Front/WxApp/Dynamic/Dynamic&a=addComment",
                    method: "POST",
                    data: {
                        ArticleID: i,
                        UserID: n,
                        Content: t
                    },
                    success: function(r) {
                        if (r.success) {
                            if (0 != n) if (wx.getStorageSync("businessCardInfo").admin) if (wx.getStorageSync("otherMemberCardId")) {
                                var d = {
                                    tbUserID: n,
                                    tbType: "14",
                                    tbTypeID: i,
                                    tbTypeName: s.Title,
                                    tbTypeImg: s.ImgBig,
                                    tbBusinessCardID: wx.getStorageSync("otherMemberCardId")
                                };
                                e.buried(d, function(e) {});
                            } else {
                                var l = {
                                    tbUserID: n,
                                    tbType: "14",
                                    tbTypeID: i,
                                    tbTypeName: s.Title,
                                    tbTypeImg: s.ImgBig,
                                    tbBusinessCardID: 0
                                };
                                e.buried(l, function(e) {});
                            } else {
                                var u = {
                                    tbUserID: n,
                                    tbType: "14",
                                    tbTypeID: i,
                                    tbTypeName: s.Title,
                                    tbTypeImg: s.ImgBig,
                                    tbBusinessCardID: a.data.showCardFlag ? a.data.queryparams.businessid : wx.getStorageSync("businessCardId") ? wx.getStorageSync("businessCardId") : 0
                                };
                                e.buried(u, function(e) {});
                            }
                            if (1 == o.info.EnableCommentReviewMobile) {
                                if (0 != n) {
                                    var c = e.globalData.userInfo.nickName, g = e.globalData.userInfo.avatarUrl;
                                    s.CommentList.push({
                                        nickname: c,
                                        comment: t,
                                        headurl: g
                                    });
                                } else s.CommentList.push({
                                    nickname: "游客",
                                    comment: t,
                                    headurl: ""
                                });
                                a.setData({
                                    isBlank: !1,
                                    newsInfo: s,
                                    showForm: !1,
                                    commentcontent: ""
                                });
                            } else e.showToast({
                                title: "审核通过后显示",
                                icon: "none"
                            }), a.setData({
                                showForm: !1,
                                commentcontent: ""
                            });
                        } else ;
                    },
                    fail: function(e) {}
                });
            },
            fail: function(e) {}
        });
    },
    touchstart: function(e) {
        var t = this;
        "" == e.target.id ? t.setData({
            showForm: !1,
            commentcontent: ""
        }) : t.setData({
            showForm: !0
        });
    },
    addTranspond: function(t) {
        var a = this;
        e.sendRequest({
            url: "/index.php?c=Front/WxApp/Dynamic/Dynamic&a=addTranspond",
            method: "POST",
            data: {
                ArticleID: t
            },
            success: function(e) {
                var t = a.data.newsInfo;
                t.Transpond = Number(t.Transpond) + 1, a.setData({
                    newsInfo: t
                });
            },
            fail: function(e) {}
        });
    },
    getPhoneNumber: function(t) {
        var s = this, i = 1;
        e.globalData.getMobileNode.readArticles;
        if (i = 1 === s.data.phonestatus ? e.globalData.getMobileNode.readArticles : e.globalData.getMobileNode.commentArticles, 
        t.detail.errMsg.indexOf("getPhoneNumber:ok") > -1) {
            var n = e.globalData.appId, o = e.globalData.session_key, r = new a(n, o).decryptData(t.detail.encryptedData, t.detail.iv);
            e.loadphoneInfo(r.phoneNumber), s.data.articlesid && s.evaluate();
        } else s.setData({
            authorization: 2
        }), 2 === i ? s.setData({
            allowspopup: !0
        }) : s.data.articlesid && s.evaluate();
    },
    abolish: function() {
        this.setData({
            allowspopup: !1
        });
    },
    turnOff: function() {
        e.turnOff();
    },
    preventD: function() {},
    toProductDetail: function(e) {
        var t = e.currentTarget.dataset.productid;
        wx.navigateTo({
            url: "/pages/shop/productdetail?id=" + t
        });
    },
    errImg: function(e) {
        var t = this.data.proList, a = e.currentTarget.dataset.errImg;
        t[e.currentTarget.dataset.errIndex].BigImages = a, this.setData({
            proList: t
        });
    }
});