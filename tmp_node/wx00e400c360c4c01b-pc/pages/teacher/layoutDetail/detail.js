function t(t, a, e, s) {
    wx.request({
        url: i.localUrl + "mobileXcx/cpclList",
        data: {
            crm_code: i.crm_code,
            ccm_id: t,
            keyword: a,
            noIds: e
        },
        header: {
            "content-type": "application/json"
        },
        success: function(t) {
            s(t.data.dataInfo.dataList);
        }
    });
}

function a(t, a, e) {
    wx.request({
        url: i.localUrl + "mobileXcx/cpcAuditionlList",
        data: {
            crm_code: i.crm_code,
            ccm_id: t,
            class_time: a
        },
        header: {
            "content-type": "application/json"
        },
        success: function(t) {
            e(t.data.dataInfo.dataList);
        }
    });
}

function e(t, a) {
    wx.request({
        url: i.localUrl + "mobileXcx/findTheme",
        data: {
            crm_code: i.crm_code,
            top: t
        },
        header: {
            "content-type": "application/json"
        },
        success: function(t) {
            a(t.data.dataInfo.str);
        }
    });
}

var i = require("../../../utils/main.js"), s = require("wxSearch/wxSearch.js"), c = require("../../../utils/qiniuUploader"), n = getApp();

Page({
    data: {
        ccm_id: "",
        class_time: "",
        isAllSelect: !1,
        carts: [],
        showModalType: !1,
        showModalStatus: !1,
        theme_name: "",
        curriculum_form: "",
        content: "",
        imgs: [],
        roomname: "",
        latitude: "",
        longitude: "",
        isCheckF: !0,
        isCheckF2: !0,
        isCheckF3: !0,
        sercherStorage: [],
        inputValue: "",
        StorageFlag: !0,
        scrollHeight: 0
    },
    onLoad: function(t) {
        i.initQiniu();
        var a = this, e = t.ccm_id, s = t.class_time;
        console.log(s + "-----"), this.setData({
            ccm_id: e,
            class_time: s
        }), this.lodeTheme(), wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    scrollHeight: t.windowHeight + 400
                });
            }
        }), this.thisClassCpc();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    switchSelect: function(t) {
        var a = 0, e = (t.target.dataset.id, parseInt(t.target.dataset.index));
        this.data.carts[e].isSelect = !this.data.carts[e].isSelect;
        var i = !0;
        for (a = 0; a < this.data.carts.length; a++) this.data.carts[a].isSelect || (i = !1);
        this.setData({
            carts: this.data.carts,
            isAllSelect: i
        });
    },
    allSelect: function(t) {
        var a = 0;
        if (this.data.isAllSelect) for (a = 0; a < this.data.carts.length; a++) this.data.carts[a].isSelect = !1; else for (a = 0; a < this.data.carts.length; a++) this.data.carts[a].isSelect = !0;
        this.setData({
            carts: this.data.carts,
            isAllSelect: !this.data.isAllSelect
        });
    },
    claSelect: function(t) {
        this.setData({
            isCheckF: !this.data.isCheckF
        });
    },
    claSelect2: function(t) {
        this.setData({
            isCheckF2: !this.data.isCheckF2
        });
    },
    claSelect3: function(t) {
        this.setData({
            isCheckF3: !this.data.isCheckF3
        });
    },
    bindMinus: function(t) {
        var a = t.currentTarget.dataset.componentid, e = this.data.carts, i = e[a].count;
        if (i > 1) {
            var s = --i <= 1 ? "disabled" : "normal";
            e[a].count = i, e[a].minusStatus = s, this.setData({
                carts: e
            });
        }
    },
    bindPlus: function(t) {
        var a = t.currentTarget.dataset.componentid, e = this.data.carts, i = e[a].count, s = ++i < 1 ? "disabled" : "normal";
        e[a].count = i, e[a].minusStatus = s, this.setData({
            carts: e
        });
    },
    bindManual: function(t) {
        var a = t.detail.value, e = t.currentTarget.dataset.componentid, i = this.data.carts;
        if (a > 1) {
            var s = a < 1 ? "disabled" : "normal";
            i[e].count = a, i[e].minusStatus = s, this.setData({
                carts: i
            });
        }
    },
    showModal: function(t) {
        i.collectFomrId(t.detail.formId, parseInt(new Date().getTime() / 1e3) + 604800);
        var a = this;
        if (0 == this.data.theme_name.length) this.setData({
            searchKeyword: !0
        }); else {
            for (var e = [], s = 0; s < a.data.carts.length; s++) a.data.carts[s].isSelect && (a.data.carts[s].cscState = 0, 
            e.push(a.data.carts[s]));
            if (0 == e.length) return void wx.showToast({
                title: "请选择学员",
                icon: "loading",
                duration: 2e3
            });
            this.getAddress();
            var c = wx.createAnimation({
                duration: 200,
                timingFunction: "linear",
                delay: 0
            });
            this.animation = c, c.translateY(300).step(), this.setData({
                animationData: c.export(),
                showModalStatus: !0
            }), setTimeout(function() {
                c.translateY(0).step(), this.setData({
                    animationData: c.export()
                });
            }.bind(this), 200);
        }
    },
    hideModal: function() {
        var t = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = t, t.translateY(300).step(), this.setData({
            animationData: t.export()
        }), setTimeout(function() {
            t.translateY(0).step(), this.setData({
                animationData: t.export(),
                showModalStatus: !1
            });
        }.bind(this), 200);
    },
    curriculum_form: function(t) {
        this.setData({
            curriculum_form: t.detail.value
        });
    },
    addContent: function(t) {
        this.setData({
            content: t.detail.value
        });
    },
    chooseImg: function(t) {
        var a = this;
        if (this.data.imgs.length >= 9) return this.setData({
            lenMore: 1
        }), setTimeout(function() {
            a.setData({
                lenMore: 0
            });
        }, 2500), !1;
        wx.chooseImage({
            count: 9,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                for (var e = t.tempFilePaths, i = a.data.imgs, s = 0; s < e.length; s++) {
                    if (i.length >= 9) return a.setData({
                        imgs: i
                    }), !1;
                    i.push(e[s]);
                }
                a.setData({
                    imgs: i
                });
            }
        });
    },
    deleteImg: function(t) {
        var a = this.data.imgs, e = t.currentTarget.dataset.index;
        a.splice(e, 1), this.setData({
            imgs: a
        });
    },
    previewImg: function(t) {
        var a = t.currentTarget.dataset.index, e = this.data.imgs;
        wx.previewImage({
            current: e[a],
            urls: e
        });
    },
    getAddress: function() {
        var t = this;
        wx.chooseLocation({
            success: function(a) {
                t.setData({
                    roomname: a.name,
                    latitude: a.latitude,
                    longitude: a.longitude
                });
            }
        });
    },
    checkF: function() {
        this.setData({
            isCheckF: !this.data.isCheckF
        });
    },
    primary: function() {
        i.initQiniu();
        var t = this;
        if (0 != this.data.content.length) {
            var a = 0;
            t.data.isCheckF && (a = 1);
            var e = "";
            t.data.isCheckF2 && (e += ",0"), t.data.isCheckF3 && (e += ",1");
            for (var s = [], o = 0; o < t.data.carts.length; o++) t.data.carts[o].isSelect && (t.data.carts[o].cscState = 0, 
            s.push(t.data.carts[o]));
            s = JSON.stringify(s);
            for (var r = "", o = 0; o < t.data.imgs.length; o++) c.upload(t.data.imgs[o], function(t) {
                null != t.imageURL && "" != t.imageURL && ("" == r ? r = t.imageURL : r += "," + t.imageURL);
            });
            wx.showLoading({
                mask: !0
            }), setTimeout(function() {
                wx.request({
                    url: i.localUrl + "mobileXcx/fireClass",
                    data: {
                        crm_code: i.crm_code,
                        tId: n.globalData.teacher.id,
                        ccm_id: t.data.ccm_id,
                        class_time: t.data.class_time,
                        theme_name: t.data.theme_name,
                        content: t.data.content,
                        imageList: r,
                        isCpc: a,
                        isUrl: 0,
                        urlPic: "",
                        roomname: t.data.roomname,
                        latitude: t.data.latitude,
                        longitude: t.data.longitude,
                        lookType: e,
                        thisCpc: s,
                        curriculum_form: t.data.curriculum_form
                    },
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(t) {
                        "000" == t.data.succeed && (wx.hideLoading(), wx.showToast({
                            title: "消课成功",
                            icon: "success",
                            duration: 2e3,
                            mask: !0,
                            complete: function() {
                                setTimeout(function() {
                                    var t = getCurrentPages();
                                    t[t.length - 2].backLoad(), wx.navigateBack();
                                }, 1e3);
                            }
                        }));
                    }
                });
            }, 2500);
        } else this.setData({
            focusContent: !0
        });
    },
    wxSearchFn: function(t) {
        var a = this;
        s.wxSearchAddHisKey(a);
    },
    wxSearchInput: function(t) {
        this.setData({
            theme_name: t.detail.value
        });
        var a = this;
        s.wxSearchInput(t, a);
    },
    wxSerchFocus: function(t) {
        var a = this;
        s.wxSearchFocus(t, a);
    },
    wxSearchBlur: function(t) {
        var a = this;
        s.wxSearchBlur(t, a);
    },
    wxSearchKeyTap: function(t) {
        var a = this;
        s.wxSearchKeyTap(t, a), this.setData({
            theme_name: a.data.wxSearchData.value
        });
    },
    wxSearchDeleteKey: function(t) {
        var a = this;
        s.wxSearchDeleteKey(t, a);
    },
    wxSearchDeleteAll: function(t) {
        var a = this;
        s.wxSearchDeleteAll(a);
    },
    wxSearchTap: function(t) {
        var a = this;
        s.wxSearchHiddenPancel(a);
    },
    searchStu: function(t) {
        i.collectFomrId(t.detail.formId, parseInt(new Date().getTime() / 1e3) + 604800);
        for (var a = this, e = "", s = 0; s < a.data.carts.length; s++) "" == e ? e = "'" + a.data.carts[s].cpc_id + "'" : e += ",'" + a.data.carts[s].cpc_id + "'";
        wx.navigateTo({
            url: "../layoutStu/layoutStu?noIds=" + e
        });
    },
    thisClassCpc: function() {
        var e = this, i = this;
        t(i.data.ccm_id, "", "", function(t) {
            if (null != t) {
                for (var a = 0; a < t.length; a++) t[a].cpcType = 0;
                e.setData({
                    carts: t
                });
            }
        }), a(i.data.ccm_id, i.data.class_time, function(t) {
            if (null != t) {
                for (var a = 0; a < t.length; a++) t[a].cpcType = 0, i.data.carts.push(t[a]);
                e.setData({
                    carts: i.data.carts
                });
            }
        });
    },
    lodeTheme: function() {
        var t = this;
        e(9, function(a) {
            s.init(t, 43, a);
        }), e(0, function(t) {
            s.initMindKeys(t);
        });
    }
});