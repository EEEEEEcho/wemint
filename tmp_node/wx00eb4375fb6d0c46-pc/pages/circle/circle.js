function e(e) {
    if (Array.isArray(e)) {
        for (var t = 0, a = Array(e.length); t < e.length; t++) a[t] = e[t];
        return a;
    }
    return Array.from(e);
}

getApp();

var t = require("../../utils/wxapp.js"), a = require("../../utils/wxcomm.js"), i = require("../../utils/util.js");

Page({
    data: {
        shareMode: 0,
        circleList: [],
        showUnderLine: !1,
        showDelete: "",
        isLoading: !0,
        isAuthor: !0,
        showTip: !1,
        noCircle: !1,
        pageNumber: 1,
        commentValue: "",
        selfHeaderImg: "",
        selfNickName: "",
        latitude: 0,
        longitude: 0
    },
    onLoad: function(e) {
        if (this.setData({
            showTip: !0
        }), wx.getStorageSync("userInfo")) {
            this.setData({
                selfHeaderImg: wx.getStorageSync("userInfo").avatarUrl,
                selfNickName: wx.getStorageSync("userInfo").nickName
            });
            var t = this;
            wx.getSetting({
                success: function(e) {
                    if (0 == e.authSetting["scope.userLocation"]) t.setData({
                        isAuthor: !1
                    }); else {
                        wx.showNavigationBarLoading();
                        var a = wx.getStorageSync("adressMsg");
                        a ? t.setData({
                            longitude: a.longitude,
                            latitude: a.latitude
                        }) : t.setData({
                            latitude: wx.getStorageSync("adress").latitude,
                            longitude: wx.getStorageSync("adress").longitude
                        }), t.setData({
                            pageNumber: 1,
                            shareMode: 0,
                            showUnderLine: !1,
                            showDelete: "",
                            isLoading: !0,
                            noCircle: !1,
                            circleList: []
                        }), t.getBenefitCircle();
                    }
                }
            });
        } else wx.reLaunch({
            url: "/pages/login/login"
        });
    },
    toActivity: function(e) {
        wx.navigateTo({
            url: "/pages/share/share?shareUrl=" + e.currentTarget.dataset.shareurl
        });
    },
    previewImage: function(e) {
        wx.previewImage({
            current: e.target.dataset.src,
            urls: e.target.dataset.imglist
        });
    },
    getBenefitCircle: function() {
        var r = this;
        a.reqGet(t.projectUrl + "/product/coupons/miniProgram/benefitCircle?smallOpenId=" + wx.getStorageSync("user").openId + "&longitude=" + this.data.longitude + "&latitude=" + this.data.latitude + "&shareMode=" + this.data.shareMode + "&pageNumber=" + this.data.pageNumber + "&pageSize=5").then(function(t) {
            if (console.log(t), wx.hideNavigationBarLoading(), wx.stopPullDownRefresh(), r.setData({
                isLoading: !1
            }), t.data.success) if (t.data.rows.length > 0) {
                var a = !0, n = !1, o = void 0;
                try {
                    for (var s, c = t.data.rows[Symbol.iterator](); !(a = (s = c.next()).done); a = !0) {
                        var l = s.value;
                        null !== l.img && (l.img.indexOf(";") > 0 ? l.img = l.img.split(";").slice(0, 3) : l.img = [].concat(e(l.img))), 
                        l.createTime = i.formatTime(l.createTime), l.text = "<span class='item-type'>" + l.tag + "</span>" + l.text;
                    }
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    n = !0, o = e;
                } finally {
                    try {
                        !a && c.return && c.return();
                    } finally {
                        if (n) throw o;
                    }
                }
                var d = r.data.circleList.concat(t.data.rows);
                r.setData({
                    circleList: d
                });
            } else 1 == r.data.pageNumber ? r.setData({
                noCircle: !0
            }) : r.setData({
                showUnderLine: !0
            }); else r.setData({
                noCircle: !0
            });
        });
    },
    hideTipFunc: function() {
        this.setData({
            showTip: !1
        });
    },
    showComment: function(e) {
        1 == e.currentTarget.dataset.deletable ? this.setData({
            showDelete: e.currentTarget.dataset.deletenum
        }) : this.setData({
            showDelete: ""
        });
    },
    hideDelete: function() {
        this.setData({
            showDelete: ""
        });
    },
    deleteComment: function(e) {
        var i = this;
        a.reqGet(t.projectUrl + "/product/coupons/miniProgram/comment/delete?commentId=" + e.currentTarget.dataset.deletenum + "&smallOpenId=" + wx.getStorageSync("user").openId).then(function(t) {
            if (t.data.success) {
                wx.showToast({
                    icon: "success",
                    title: "删除成功"
                });
                var a = !0, r = !1, n = void 0;
                try {
                    for (var o, s = i.data.circleList[Symbol.iterator](); !(a = (o = s.next()).done); a = !0) {
                        var c = o.value;
                        for (var l in c.commentList) e.currentTarget.dataset.deletenum == c.commentList[l].commentId && (c.commentList.splice(l, 1), 
                        c.commentNum--);
                    }
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    r = !0, n = e;
                } finally {
                    try {
                        !a && s.return && s.return();
                    } finally {
                        if (r) throw n;
                    }
                }
                i.setData({
                    circleList: i.data.circleList
                });
            } else wx.showToast({
                icon: "none",
                title: t.data.msg
            });
        });
    },
    menuClick: function(e) {
        this.setData({
            shareMode: e.currentTarget.dataset.check,
            circleList: [],
            pageNumber: 1,
            showDelete: "",
            noCircle: !1,
            isLoading: !0,
            showUnderLine: !1
        }), this.getBenefitCircle();
    },
    giveLike: function(e) {
        var i = this, r = t.projectUrl + "/product/coupons/miniProgram/edit/good", n = {
            benefitCircleId: e.currentTarget.dataset.benefitcircleid,
            state: 1,
            smallOpenId: wx.getStorageSync("user").openId
        };
        a.reqPost(r, n, "application/x-www-form-urlencoded").then(function(t) {
            if (t.data.success) {
                var a = !0, r = !1, n = void 0;
                try {
                    for (var o, s = i.data.circleList[Symbol.iterator](); !(a = (o = s.next()).done); a = !0) {
                        var c = o.value;
                        e.currentTarget.dataset.benefitcircleid == c.benefitCircleId && (c.goodNum++, c.isGood = 1);
                    }
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    r = !0, n = e;
                } finally {
                    try {
                        !a && s.return && s.return();
                    } finally {
                        if (r) throw n;
                    }
                }
                i.setData({
                    circleList: i.data.circleList
                });
            } else wx.showToast({
                icon: "none",
                title: t.data.msg
            });
        });
    },
    submitComment: function(e) {
        var i = this, r = t.projectUrl + "/product/coupons/miniProgram/comment/submit", n = {
            benefitCircleId: e.currentTarget.dataset.benefitcircleid,
            comment: e.detail.value,
            commentId: "",
            smallOpenId: wx.getStorageSync("user").openId
        };
        a.reqPost(r, n, "application/x-www-form-urlencoded").then(function(t) {
            if (t.data.success) {
                wx.showToast({
                    icon: "success",
                    title: "评论成功"
                });
                var a = {
                    benefitCircleId: t.data.extParams.benefitcircleid,
                    commentId: t.data.extParams.commentId,
                    createTime: t.data.extParams.createTime,
                    level: t.data.extParams.level,
                    replyCommentId: t.data.extParams.replyCommentId,
                    replyNickname: t.data.extParams.replyNickname,
                    smallOpenId: t.data.extParams.smallOpenId,
                    state: t.data.extParams.state,
                    deletable: 1,
                    nickname: i.data.selfNickName,
                    comment: t.data.extParams.comment
                }, r = !0, n = !1, o = void 0;
                try {
                    for (var s, c = i.data.circleList[Symbol.iterator](); !(r = (s = c.next()).done); r = !0) {
                        var l = s.value;
                        e.currentTarget.dataset.benefitcircleid == l.benefitCircleId && (l.commentList.push(a), 
                        l.commentNum++);
                    }
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    n = !0, o = e;
                } finally {
                    try {
                        !r && c.return && c.return();
                    } finally {
                        if (n) throw o;
                    }
                }
                i.setData({
                    commentValue: "",
                    circleList: i.data.circleList
                });
            }
        });
    },
    getMyBenefitCircle: function() {
        var r = this;
        this.setData({
            shareMode: 1,
            circleList: [],
            pageNumber: 1,
            showDelete: "",
            noCircle: !1,
            isLoading: !0,
            showUnderLine: !1
        }), a.reqGet(t.projectUrl + "/product/coupons/miniProgram/myBenefitCircle?smallOpenId=" + wx.getStorageSync("user").openId + "&longitude=" + this.data.longitude + "&latitude=" + this.data.latitude + "&pageNumber=" + this.data.pageNumber + "&pageSize=5").then(function(t) {
            if (wx.hideNavigationBarLoading(), wx.stopPullDownRefresh(), r.setData({
                isLoading: !1
            }), t.data.success) if (t.data.rows.length > 0) {
                var a = !0, n = !1, o = void 0;
                try {
                    for (var s, c = t.data.rows[Symbol.iterator](); !(a = (s = c.next()).done); a = !0) {
                        var l = s.value;
                        null !== l.img && (l.img.indexOf(";") > 0 ? l.img = l.img.split(";").slice(0, 3) : l.img = [].concat(e(l.img))), 
                        l.createTime = i.formatTime(l.createTime), l.text = "<span class='item-type'>" + l.tag + "</span>" + l.text;
                    }
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    n = !0, o = e;
                } finally {
                    try {
                        !a && c.return && c.return();
                    } finally {
                        if (n) throw o;
                    }
                }
                var d = r.data.circleList.concat(t.data.rows);
                r.setData({
                    circleList: d
                });
            } else 1 == r.data.pageNumber ? r.setData({
                noCircle: !0
            }) : r.setData({
                showUnderLine: !0
            }); else wx.showToast({
                title: t.data.msg,
                icon: "none"
            }), r.setData({
                noCircle: !0
            });
        });
    },
    issue: function() {
        a.reqGet(t.projectUrl + "/product/coupons/miniProgram/myCoupons?smallOpenId=" + wx.getStorageSync("user").openId + "&pageNumber=1&pageSize=100").then(function(e) {
            e.data.rows.length > 0 ? wx.navigateTo({
                url: "/pages/issue/issue"
            }) : wx.showToast({
                title: "您没有优惠券可发布!",
                icon: "none"
            });
        });
    },
    choseAdress: function() {
        wx.openSetting({
            success: function(e) {
                console.log(e);
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        console.log(wx.getStorageSync("from")), "issuePush" == wx.getStorageSync("from") && (console.log("aaa"), 
        this.getMyBenefitCircle(), wx.setStorageSync("from", ""), console.log(wx.getStorageSync("from")));
        var e = this;
        wx.getSetting({
            success: function(t) {
                1 == t.authSetting["scope.userLocation"] ? e.setData({
                    isAuthor: !0
                }) : (e.setData({
                    isAuthor: !1
                }), e.getBenefitCircle());
            }
        }), wx.getStorageSync("adressMsg") && 1 != this.data.shareMode && (this.setData({
            pageNumber: 1,
            showUnderLine: !1,
            showDelete: "",
            isLoading: !0,
            noCircle: !1,
            circleList: []
        }), this.setData({
            longitude: wx.getStorageSync("adressMsg").longitude,
            latitude: wx.getStorageSync("adressMsg").latitude
        }), this.getBenefitCircle());
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.setData({
            pageNumber: 1,
            showUnderLine: !1,
            noCircle: !1,
            showDelete: "",
            circleList: []
        }), 1 == this.data.shareMode ? this.getMyBenefitCircle() : this.getBenefitCircle();
    },
    onReachBottom: function() {
        var r = this;
        wx.showNavigationBarLoading(), this.setData({
            pageNumber: this.data.pageNumber + 1
        }), 1 == this.data.shareMode ? a.reqGet(t.projectUrl + "/product/coupons/miniProgram/myBenefitCircle?smallOpenId=" + wx.getStorageSync("user").openId + "&longitude=" + this.data.longitude + "&latitude=" + this.data.latitude + "&pageNumber=" + this.data.pageNumber + "&pageSize=5").then(function(t) {
            if (wx.hideNavigationBarLoading(), wx.stopPullDownRefresh(), r.setData({
                isLoading: !1
            }), t.data.success) if (t.data.rows.length > 0) {
                var a = !0, n = !1, o = void 0;
                try {
                    for (var s, c = t.data.rows[Symbol.iterator](); !(a = (s = c.next()).done); a = !0) {
                        var l = s.value;
                        null !== l.img && (l.img.indexOf(";") > 0 ? l.img = l.img.split(";").slice(0, 3) : l.img = [].concat(e(l.img))), 
                        l.createTime = i.formatTime(l.createTime);
                    }
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    n = !0, o = e;
                } finally {
                    try {
                        !a && c.return && c.return();
                    } finally {
                        if (n) throw o;
                    }
                }
                var d = r.data.circleList.concat(t.data.rows);
                r.setData({
                    circleList: d
                });
            } else 1 == r.data.pageNumber ? r.setData({
                noCircle: !0
            }) : r.setData({
                showUnderLine: !0
            }); else wx.showToast({
                title: t.data.msg,
                icon: "none"
            }), r.setData({
                noCircle: !0
            });
        }) : this.getBenefitCircle();
    },
    shareCoupon: function(e) {
        a.reqGet(t.projectUrl + "/product/coupons/secondCoupons/transfer/couponsUrl?couponsId=" + e.currentTarget.dataset.couponsid).then(function(t) {
            var a = t.data.extParams, i = [ a.title, a.imagUrl, a.url ], r = i[0], n = i[1], o = i[2];
            wx.navigateTo({
                url: "/pages/test/test?title=" + r + "&imgUrl=" + n + "&url=" + o + "&notice=" + e.currentTarget.dataset.notice + "&shareMode=" + e.currentTarget.dataset.shareMode
            });
        });
    },
    onShareAppMessage: function() {
        return {
            title: "探索身边优惠",
            imageUrl: "https://imgs.52wxr.com/upload/image/201901/20190122/1548146339888061576.jpg",
            path: "/page/index/index"
        };
    }
});