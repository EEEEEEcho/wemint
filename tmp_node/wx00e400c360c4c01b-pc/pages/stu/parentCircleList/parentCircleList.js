function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

function t(e, t, a) {
    wx.request({
        url: n.localUrl + "mobileXcx/circleList",
        data: {
            crm_code: n.crm_code,
            account_type: 0,
            account_code: r.globalData.cpc.id,
            currentPage: e,
            rowCountPerPage: t
        },
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            a(e.data);
        }
    });
}

function a(e, t, a) {
    wx.request({
        url: n.localUrl + "mobileXcx/circleLike",
        data: {
            crm_code: n.crm_code,
            account_type: 0,
            account_code: r.globalData.cpc.id,
            circle_id: e,
            isLike: t
        },
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            a(e.data);
        }
    });
}

function c(e, t, a, c) {
    wx.request({
        url: n.localUrl + "mobileXcx/addComment",
        data: {
            crm_code: n.crm_code,
            account_type: 0,
            account_code: r.globalData.cpc.id,
            circle_id: e,
            content: t,
            parent_id: a
        },
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            c(e.data);
        }
    });
}

var i, n = require("../../../utils/main.js"), r = (require("../../../utils/qiniuUploader"), 
getApp());

Page({
    data: (i = {
        bpImage: "http://p7mq9gjza.bkt.clouddn.com/t_me_head.png",
        cpc: [],
        circleList: [],
        content: "",
        searchPageNum: 1,
        callbackcount: 15,
        totalPage: 0,
        searchLoading: !1,
        searchLoadingComplete: !1,
        releaseFocus: !1,
        releaseText: "评论",
        releaseCircle_id: "",
        releaseParent_id: "",
        delCommentId: 0,
        delCirclIndex: "",
        dexCommentIndex: "",
        releaseIndex: "",
        pullDownRefresh: !1,
        actionSheetHidden: !0,
        actionSheetHidden2: !0
    }, e(i, "actionSheetHidden2", !0), e(i, "actionSheetHidden3", !0), e(i, "showModalStatus", !1), 
    i),
    onLoad: function() {
        var e = this;
        n.initQiniu();
        var t = r.globalData.cpc.bp_image;
        null != t && "" != t || (t = "http://p7mq9gjza.bkt.clouddn.com/t_me_head.png"), 
        this.setData({
            cpc: r.globalData.cpc,
            bpImage: t
        }), wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    scrollHeight: t.windowHeight + 700
                });
            }
        }), this.fetchSearchList();
    },
    actionSheetChange: function(e) {
        this.setData({
            actionSheetHidden: !this.data.actionSheetHidden
        });
    },
    actionSheetChange2: function(e) {
        this.setData({
            actionSheetHidden2: !this.data.actionSheetHidden2
        });
    },
    actionSheetChange3: function(e) {
        this.setData({
            actionSheetHidden3: !this.data.actionSheetHidden3
        });
    },
    addContent: function(e) {
        console.log(e.detail.value), this.setData({
            content: e.detail.value
        });
    },
    previewImage: function(e) {
        var t = e.currentTarget.dataset.index, a = e.currentTarget.dataset.src;
        wx.previewImage({
            current: a[t],
            urls: a
        });
    },
    previewVio: function(e) {
        var t = e.currentTarget.dataset.src;
        console.log(t), wx.previewVideo({
            current: 1,
            urls: t
        });
    },
    circle: function() {
        wx.navigateTo({
            url: "../parentCircle/parentCircle"
        });
    },
    circleImg: function() {
        var e = this;
        wx.chooseImage({
            count: 9,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var a = JSON.stringify(t.tempFilePaths);
                wx.navigateTo({
                    url: "../parentCircle/parentCircle?imgmodel=" + a + "&tp=0"
                }), e.actionSheetChange2();
            }
        });
    },
    circleVio: function() {
        var e = this;
        wx.chooseVideo({
            sourceType: [ "album", "camera" ],
            maxDuration: 60,
            camera: "back",
            success: function(t) {
                wx.navigateTo({
                    url: "../parentCircle/parentCircle?vioUrl=" + t.tempFilePath + "&tp=1"
                }), e.actionSheetChange2();
            }
        });
    },
    fetchSearchList: function() {
        var e = this;
        t(e.data.searchPageNum, e.data.callbackcount, function(t) {
            if (console.log(t.dataInfo.dataList), null != t.dataInfo.dataList && 0 != t.dataInfo.dataList.length) {
                var a = [];
                a = e.data.isFromSearch ? t.dataInfo.dataList : e.data.circleList.concat(t.dataInfo.dataList), 
                e.setData({
                    circleList: a,
                    searchLoading: !0
                }), t.dataInfo.totalPage <= e.data.searchPageNum && e.setData({
                    searchLoadingComplete: !0,
                    searchLoading: !1
                });
            } else e.setData({
                searchLoadingComplete: !1,
                searchLoading: !1
            });
        });
    },
    searchScrollLower: function() {
        var e = this;
        e.data.searchLoading && !e.data.searchLoadingComplete && (e.setData({
            searchPageNum: e.data.searchPageNum + 1,
            isFromSearch: !1
        }), e.fetchSearchList());
    },
    onReachBottom: function() {
        this.searchScrollLower();
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.backLoad(), wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
    },
    backLoad: function() {
        this.setData({
            circleList: [],
            searchPageNum: 1,
            callbackcount: 15,
            totalPage: 0,
            searchLoading: !1,
            searchLoadingComplete: !1
        }), this.fetchSearchList();
    },
    selLike: function(e) {
        var t = this, c = this, i = e.currentTarget.dataset.circle_id, n = e.currentTarget.dataset.is_like, r = e.currentTarget.dataset.index;
        a(i, n, function(e) {
            c.data.circleList[r].is_like = e.dataInfo.isLike, c.data.circleList[r].likeNameStr = e.dataInfo.likeNameStr, 
            t.setData({
                circleList: c.data.circleList
            });
        });
    },
    releaseBlur: function() {
        this.setData({
            releaseFocus: !1
        });
    },
    bindReply: function(e) {
        var t = this, a = e.currentTarget.dataset.index, c = e.currentTarget.dataset.cpccIndex, i = e.currentTarget.dataset.circle_id, n = e.currentTarget.dataset.parent_id, r = e.currentTarget.dataset.parent_cid, o = e.currentTarget.dataset.cid, s = e.currentTarget.dataset.parent_name;
        r == t.data.cpc.id ? this.setData({
            actionSheetHidden3: !1,
            delCommentId: o,
            delCirclIndex: a,
            dexCommentIndex: c
        }) : (s = null != s && "" != s ? "回复 " + s : "评论", this.setData({
            releaseFocus: !0,
            releaseIndex: a,
            releaseCircle_id: i,
            releaseParent_id: n,
            releaseText: s
        }));
    },
    addCommentL: function() {
        var e = this, t = this, a = t.data.releaseIndex, i = t.data.releaseCircle_id, n = t.data.releaseParent_id;
        c(i, t.data.content, n, function(c) {
            t.data.circleList[a].cpccList = c.dataInfo.cpccList, e.setData({
                circleList: t.data.circleList,
                releaseFocus: !1
            });
        });
    },
    delCpc: function(e) {
        var t = this, a = (e.currentTarget.dataset.index, e.currentTarget.dataset.id);
        wx.request({
            url: n.localUrl + "mobileXcx/delCpc",
            data: {
                circle_id: a
            },
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                "000" == a.data.succeed && (t.data.circleList.splice(e.currentTarget.dataset.index, 1), 
                t.setData({
                    circleList: t.data.circleList
                }));
            }
        });
    },
    delComment: function(e) {
        var t = this, a = t.data.delCommentId;
        wx.request({
            url: n.localUrl + "mobileXcx/delComment",
            data: {
                cId: a
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                "000" == e.data.succeed && (t.data.circleList[t.data.delCirclIndex].cpccList.splice(t.data.dexCommentIndex, 1), 
                t.setData({
                    circleList: t.data.circleList
                }), t.actionSheetChange3());
            }
        });
    },
    bpImage: function() {
        var e = this;
        n.initQiniu(), wx.chooseImage({
            count: 1,
            sizeType: [ "original" ],
            success: function(t) {
                wx.navigateTo({
                    url: "../../wx-cropper/index?url=" + t.tempFilePaths[0] + "&tp=1"
                }), e.actionSheetChange();
            }
        });
    },
    showModal: function(e) {
        var t = e.currentTarget.dataset.src;
        wx.navigateTo({
            url: "../parentCircleListVio/parentCircleListVio?videoUrl=" + t
        });
    },
    hideModal: function() {
        this.setData({
            videoUrl: ""
        });
        var e = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = e, e.translateY(300).step(), this.setData({
            animationData: e.export()
        }), setTimeout(function() {
            e.translateY(0).step(), this.setData({
                animationData: e.export(),
                showModalStatus: !1
            });
        }.bind(this), 200);
    },
    openMap: function(e) {
        var t = parseFloat(e.currentTarget.dataset.latitude), a = parseFloat(e.currentTarget.dataset.longitude);
        wx.openLocation({
            latitude: t,
            longitude: a,
            scale: 28
        });
    },
    preventD: function() {}
});