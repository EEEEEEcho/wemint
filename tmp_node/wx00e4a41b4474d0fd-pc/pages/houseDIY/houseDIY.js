function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function a(e) {
    return function() {
        var a = e.apply(this, arguments);
        return new Promise(function(e, t) {
            function i(s, n) {
                try {
                    var r = a[s](n), o = r.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void t(e);
                }
                if (!r.done) return Promise.resolve(o).then(function(e) {
                    i("next", e);
                }, function(e) {
                    i("throw", e);
                });
                e(o);
            }
            return i("next");
        });
    };
}

var t, i = e(require("../../lib/runtime")), s = e(require("../../lib/requestConfig")), n = require("../../config.js"), r = require("../../getlogininfo.js").getUserInfo, o = require("../../utils/util.js"), l = getApp(), u = "";

Page({
    data: {
        rooms: [ "2", "3", "4" ],
        index: "",
        halls: [ "1", "2" ],
        hallIndex: "",
        current: 0,
        isShare: !1,
        houseType: "",
        houseTypeId: "",
        list: [],
        defaultShowSelect: !0,
        currentShareIndex: 0,
        imageLikes: [],
        imageLikesNew: [],
        orientation: "",
        dx: 0
    },
    getCurrentPageParam: function() {
        return u;
    },
    onLoad: function(e) {
        var a = this;
        l.decrypt(e), t = new Date().getTime(), u = JSON.stringify(e);
        var i = e.houseType, s = e.houseTypeId, n = e.from;
        i && this.setData({
            houseType: decodeURI(i)
        }), s && this.setData({
            houseTypeId: s
        });
        var r = e.rooms, d = e.halls;
        n && "share" == n && (r && this.setData({
            index: r
        }), d && this.setData({
            hallIndex: d
        }), l.login(function() {
            d && r && a.queryHouseImageList();
        }));
        var c = {
            pvId: "P_2cMINA_70",
            type: "PV",
            clkParams: {
                houseType: this.data.houseType || "",
                houseTypeId: this.data.houseTypeId
            },
            pvCurPageParams: u,
            pvCurPageName: "huxingDIYye",
            pvLastPageName: n,
            pvPageLoadTime: new Date().getTime() - t
        };
        o.trackRequest(c);
    },
    onReady: function() {},
    onShow: function() {},
    queryHouseImageList: function() {
        var e = this;
        return a(i.default.mark(function a() {
            var t, r, d, c, g;
            return i.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    if ("" != e.data.index && "" != e.data.hallIndex) {
                        a.next = 3;
                        break;
                    }
                    return wx.showToast({
                        title: "请选择户型条件后，再玩转户型！",
                        icon: "none",
                        duration: 3e3
                    }), a.abrupt("return");

                  case 3:
                    return e.myLoading = e.selectComponent("#myLoading"), e.myLoading && e.myLoading.showLoading(), 
                    t = {
                        houseId: n.houseId,
                        environment: "3",
                        bedrooms: e.data.rooms[e.data.index],
                        halls: e.data.halls[e.data.hallIndex],
                        houseType: e.data.houseTypeId,
                        uid: "",
                        userId: l.globalData.single && l.globalData.single.id ? l.globalData.single.id : ""
                    }, r = {
                        clkId: "clk_2cmina_188",
                        clkName: "kaishiwanzhuanwodehuxinganniu",
                        clkDesPage: "",
                        type: "CLK",
                        clkParams: {
                            houseId: n.houseId,
                            environment: "3",
                            bedrooms: e.data.rooms[e.data.index],
                            halls: e.data.halls[e.data.hallIndex],
                            houseType: e.data.houseTypeId,
                            uid: "",
                            userId: l.globalData.single && l.globalData.single.id ? l.globalData.single.id : ""
                        },
                        pvCurPageName: "huxingDIYye",
                        pvCurPageParams: u
                    }, o.trackRequest(r), e.setData({
                        current: 0
                    }), a.next = 11, (0, s.default)("queryHouseImageList", t);

                  case 11:
                    if ((d = a.sent) && d.success) if (e.setData({
                        defaultShowSelect: !1
                    }), e.myLoading && e.myLoading.hideLoading(), d.list && d.list.length > 0) {
                        for (e.setData({
                            list: d.list
                        }), c = {
                            type: "EXP",
                            pvCurPageName: "huxingDIYye",
                            pvCurPageParams: u,
                            eventId: "exp_2cmina_9",
                            eventName: "DIYhuxingtupuguang",
                            eventModuleDes: e.data.list[e.data.current].imageUrl
                        }, o.trackRequest(c, l), e.data.imageLikes = [], g = 0; g < d.list.length; g++) e.data.imageLikes.push(1 == d.list[g].status);
                        console.log(e.data.imageLikes), e.setData({
                            imageLikesNew: e.data.imageLikes
                        });
                    } else e.setData({
                        imageLikesNew: [],
                        list: [],
                        defaultShowSelect: !1
                    }), console.log("数据", e.data.imageLikesNew); else e.myLoading && e.myLoading.hideLoading(), 
                    e.setData({
                        defaultShowSelect: !1
                    });
                    e.data.lastPosition = 0;

                  case 14:
                  case "end":
                    return a.stop();
                }
            }, a, e);
        }))();
    },
    statusChange: function(e) {
        this.data.dx - e.detail.dx > 0 ? (console.log("向左"), this.data.orientation = "left") : (console.log("向右"), 
        this.data.orientation = "right"), this.data.dx = e.detail.dx;
    },
    change: function(e) {
        console.log(e.detail.current);
        var a = e.detail.current + 1;
        if ("left" == this.data.orientation) {
            t = {
                clkId: "clk_2cmina_194",
                clkName: "tuodongjieguotu",
                clkDesPage: "",
                type: "CLK",
                clkParams: {
                    from: a + 1,
                    to: a
                },
                pvCurPageName: "huxingDIYye",
                pvCurPageParams: u
            };
            o.trackRequest(t);
        } else if ("right" == this.data.orientation) {
            var t = {
                clkId: "clk_2cmina_194",
                clkName: "tuodongjieguotu",
                clkDesPage: "",
                type: "CLK",
                clkParams: {
                    from: a - 1,
                    to: a
                },
                pvCurPageName: "huxingDIYye",
                pvCurPageParams: u
            };
            o.trackRequest(t);
        }
        this.data.lastPosition = e.detail.current;
        var i = {
            type: "EXP",
            pvCurPageName: "huxingDIYye",
            pvCurPageParams: u,
            eventId: "exp_2cmina_9",
            eventName: "DIYhuxingtupuguang",
            eventModuleDes: this.data.list[e.detail.current].imageUrl
        };
        o.trackRequest(i, l);
    },
    bindRoomPickerChange: function(e) {
        var a = {
            clkId: "clk_2cmina_186",
            clkName: "fangjianshuxuanze",
            clkDesPage: "",
            type: "CLK",
            clkParams: {
                room: e.detail.value
            },
            pvCurPageName: "huxingDIYye",
            pvCurPageParams: u
        };
        o.trackRequest(a), this.setData({
            index: e.detail.value
        });
    },
    bindHallPickerChange: function(e) {
        var a = {
            clkId: "clk_2cmina_187",
            clkName: "datingshuxuanze",
            clkDesPage: "",
            type: "CLK",
            clkParams: {
                hall: e.detail.value
            },
            pvCurPageName: "huxingDIYye",
            pvCurPageParams: u
        };
        o.trackRequest(a), this.setData({
            hallIndex: e.detail.value
        });
    },
    clickView: function(e) {
        var a = this.data.list[e.currentTarget.dataset.index].imageUrl, t = this.data.list.map(function(e) {
            return e.imageUrl;
        });
        console.log(t);
        var i = {
            clkId: "clk_2cmina_193",
            clkName: "dianjijieguotu",
            clkDesPage: "",
            type: "CLK",
            clkParams: {
                current: a,
                imageId: this.data.list[e.currentTarget.dataset.index].id
            },
            pvCurPageName: "huxingDIYye",
            pvCurPageParams: u
        };
        o.trackRequest(i), wx.previewImage({
            current: a,
            urls: t
        });
    },
    priviewPic: function(e) {
        console.log("当前点击", e.currentTarget.dataset.index);
        var a = this.data.list[e.currentTarget.dataset.index].imageUrl, t = this.data.list.map(function(e) {
            return e.imageUrl;
        });
        console.log(t);
        var i = {
            clkId: "clk_2cmina_191",
            clkName: "fangdajing",
            clkDesPage: "",
            type: "CLK",
            clkParams: {
                current: a,
                imageId: this.data.list[e.currentTarget.dataset.index].id
            },
            pvCurPageName: "huxingDIYye",
            pvCurPageParams: u
        };
        o.trackRequest(i), wx.previewImage({
            current: a,
            urls: t
        });
    },
    like: function(e) {
        console.log(e.currentTarget.dataset.index), this.data.imageLikes[e.currentTarget.dataset.index] || this.setData({
            isShare: !0
        }), this.setData({
            currentShareIndex: e.currentTarget.dataset.index
        }), this.likeImage(this.data.currentShareIndex);
    },
    downLoad: function(e) {
        var a = this;
        console.log(e.currentTarget.dataset.index);
        var t = e.currentTarget.dataset.index;
        wx.getSetting({
            success: function(e) {
                e.authSetting["scope.writePhotosAlbum"] ? a.savePhoto(t) : wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function() {
                        a.savePhoto(t);
                    },
                    fail: function() {
                        wx.showModal({
                            title: "警告",
                            content: "您点击了拒绝授权,将无法正常保存图片,点击确定重新获取授权。",
                            success: function(e) {
                                e.confirm && wx.openSetting({
                                    success: function(e) {
                                        console.log("授权成功"), wx.authorize({
                                            scope: "scope.writePhotosAlbum",
                                            success: function() {
                                                a.savePhoto(t);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    savePhoto: function(e) {
        wx.showToast({
            icon: "loading",
            title: "正在保存图片",
            duration: 1e3
        });
        var a = {
            clkId: "clk_2cmina_189",
            clkName: "baocunDIYhuxing",
            clkDesPage: "",
            type: "CLK",
            clkParams: {
                url: this.data.list[e].imageUrl
            },
            pvCurPageName: "huxingDIYye",
            pvCurPageParams: u
        };
        o.trackRequest(a), wx.downloadFile({
            url: this.data.list[e].imageUrl,
            success: function(e) {
                wx.saveImageToPhotosAlbum({
                    filePath: e.tempFilePath,
                    success: function(e) {
                        wx.showToast({
                            title: "保存成功",
                            icon: "success",
                            duration: 3e3
                        });
                    },
                    fail: function(e) {
                        console.log("保存图片：fail"), console.log(e);
                    }
                });
            },
            fail: function(e) {
                console.log("下载文件：fail"), console.log(e);
            }
        });
    },
    huXingXuanZe: function() {
        var e = {
            clkId: "clk_2cmina_185",
            clkName: "huxingxuanze",
            clkDesPage: "",
            type: "CLK",
            clkParams: {
                houseType: this.data.houseTypeId
            },
            pvCurPageName: "huxingDIYye",
            pvCurPageParams: u
        };
        o.trackRequest(e);
    },
    cancelShare: function() {
        this.setData({
            isShare: !1
        });
    },
    getUserInfo: function(e) {
        var a = this;
        this.setData({
            isShare: !1
        }), r.call(this, e, function(e) {
            a.myLoading && a.myLoading.hideLoading();
            var t = a.data.list[a.data.currentShareIndex].id;
            l.createXcxQrCode({
                signData: {
                    type: a.data.type,
                    imageId: t,
                    btnColor: a.data.btnColor,
                    lineColor: a.data.lineColor,
                    textColor: a.data.textColor
                },
                subtype: "layout"
            }, function(t) {
                if (t) {
                    var i = [];
                    i.push(l.globalData.projectName);
                    var s = "[原创户型]" + a.data.rooms[a.data.index] + "室" + a.data.halls[a.data.hallIndex] + "厅";
                    i.push(s);
                    var n = {
                        type: 3,
                        bottomTitle: i,
                        bottomText: a.data.bottomText || "扫描二维码，立即进入线上售楼处",
                        shareWord: "这个项目可以diy户型，快一起来看看",
                        imgUrl: a.data.list[a.data.currentShareIndex].imageUrl || "",
                        qcode: t,
                        hasUserInfo: e,
                        pvCurPageName: "huxingDIYfenxaingye",
                        pvId: "p_2cmina_71",
                        pvCurPageParams: u
                    }, r = {
                        clkId: "clk_2cmina_192",
                        clkName: "fenxianganniu",
                        clkDesPage: "",
                        type: "CLK",
                        clkParams: {
                            type: 3,
                            bottomTitle: i,
                            bottomText: a.data.bottomText || "扫描二维码，立即进入线上售楼处",
                            shareWord: "这个项目可以diy户型，快一起来看看",
                            imgUrl: a.data.list[a.data.currentShareIndex].imageUrl || "",
                            qcode: t,
                            hasUserInfo: e
                        },
                        pvCurPageName: "huxingDIYye",
                        pvCurPageParams: u
                    };
                    o.trackRequest(r), l.globalData.shareCardData = JSON.stringify(n), wx.navigateTo({
                        url: "../shareCard/shareCard"
                    }), a.setData({
                        currentShareIndex: 0
                    });
                }
            }, function() {}, "/pages/index/index");
        });
    },
    getHouseListInfo: function() {
        var e = this;
        return a(i.default.mark(function a() {
            var t, r, o;
            return i.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return t = {
                        houseId: n.houseId,
                        environment: "3",
                        bedrooms: e.data.rooms[e.data.index],
                        halls: e.data.halls[e.data.hallIndex],
                        houseType: e.data.houseTypeId,
                        uid: "",
                        userId: l.globalData.single && l.globalData.single.id ? l.globalData.single.id : ""
                    }, a.next = 3, (0, s.default)("queryHouseImageList", t);

                  case 3:
                    if ((r = a.sent) && r.success) if (r.list && r.list.length > 0) {
                        for (e.setData({
                            list: r.list
                        }), e.data.imageLikes = [], o = 0; o < r.list.length; o++) e.data.imageLikes.push(1 == r.list[o].status);
                        console.log(e.data.imageLikes), e.setData({
                            imageLikesNew: e.data.imageLikes
                        });
                    } else e.setData({
                        imageLikesNew: [],
                        list: []
                    }), console.log("数据", e.data.imageLikesNew);

                  case 5:
                  case "end":
                    return a.stop();
                }
            }, a, e);
        }))();
    },
    likeImage: function(e) {
        var t = this;
        return a(i.default.mark(function a() {
            var n, r, d;
            return i.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return n = {
                        imageId: t.data.list[e].id,
                        likeId: t.data.imageLikes[e] ? t.data.list[e].id2 : "",
                        tag: t.data.imageLikes[e] ? -1 : 1,
                        uid: "",
                        userId: l.globalData.single && l.globalData.single.id ? l.globalData.single.id : ""
                    }, r = {
                        clkId: "clk_2cmina_190",
                        clkName: "dinazanDIYhuxing",
                        clkDesPage: "",
                        type: "CLK",
                        clkParams: {
                            imageId: t.data.list[e].id,
                            likeId: t.data.imageLikes[e] ? t.data.list[e].id2 : "",
                            tag: t.data.imageLikes[e] ? -1 : 1,
                            uid: "",
                            userId: l.globalData.single && l.globalData.single.id ? l.globalData.single.id : ""
                        },
                        pvCurPageName: "huxingDIYye",
                        pvCurPageParams: u
                    }, o.trackRequest(r), a.next = 5, (0, s.default)("likeImage", n);

                  case 5:
                    (d = a.sent).success && t.getHouseListInfo();

                  case 7:
                  case "end":
                    return a.stop();
                }
            }, a, t);
        }))();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            path: "/pages/houseDIY/houseDIY?shareToken=" + l.globalData.shareToken + "&houseType=" + this.data.houseType + "&houseTypeId=" + this.data.houseTypeId + "&from=share&rooms=" + this.data.index + "&halls=" + this.data.hallIndex
        };
    }
});