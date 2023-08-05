function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function a(e) {
    return function() {
        var a = e.apply(this, arguments);
        return new Promise(function(e, t) {
            function n(i, r) {
                try {
                    var o = a[i](r), c = o.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void t(e);
                }
                if (!o.done) return Promise.resolve(c).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(c);
            }
            return n("next");
        });
    };
}

var t = e(require("../../lib/runtime")), n = e(require("../../lib/requestConfig")), i = require("../../components/appToast/appToast"), r = require("../../utils/util.js"), o = getApp(), c = null;

Page({
    ToastPannel: i.ToastPannel,
    data: {
        currentPage: 1,
        questionArr: [],
        tempQuestionArr: [ {
            title: "1、您希望如何获知工程进展（多选）",
            result: [ {
                mark: "A",
                detail: "置业顾问微信点对点",
                remark: "",
                checked: !1
            }, {
                mark: "B",
                detail: "金宝朋友圈",
                remark: "",
                checked: !1
            }, {
                mark: "C",
                detail: "官微",
                remark: "",
                checked: !1
            }, {
                mark: "D",
                detail: "信函",
                remark: "",
                checked: !1
            } ]
        }, {
            title: "2、您希望如何收到节日祝福（多选）",
            result: [ {
                mark: "A",
                detail: "置业顾问微信点对点",
                remark: "",
                checked: !1
            }, {
                mark: "B",
                detail: "金宝朋友圈",
                remark: "",
                checked: !1
            } ]
        }, {
            title: "3、您希望如何获得活动邀请（多选）",
            result: [ {
                mark: "A",
                detail: "置业顾问微信点对点",
                remark: "",
                checked: !1
            }, {
                mark: "B",
                detail: "金宝朋友圈",
                remark: "",
                checked: !1
            }, {
                mark: "C",
                detail: "官微",
                remark: "",
                checked: !1
            } ]
        }, {
            title: "4、您希望参加的客户活动（多选）",
            result: [ {
                mark: "A",
                detail: "金茂绿色公益行",
                remark: "(农趣采摘与公益相结合)",
                checked: !1
            }, {
                mark: "B",
                detail: "金茂节",
                remark: "(属于金茂人自己的节日嘉年华)",
                checked: !1
            }, {
                mark: "C",
                detail: "客户年终答谢",
                remark: "(音乐会、相声等场馆类活动)",
                checked: !1
            }, {
                mark: "D",
                detail: "官微线上互动",
                remark: "(有奖话题互动、线上游戏、会员特卖商品等)",
                checked: !1
            }, {
                mark: "E",
                detail: "其他",
                remark: "",
                checked: !1,
                inputStr: ""
            } ]
        }, {
            title: "5、您愿意参加哪次工地开放日（多选）",
            result: [ {
                mark: "A",
                detail: "结构开放",
                remark: "",
                checked: !1
            }, {
                mark: "B",
                detail: "装修实楼样板开放",
                remark: "",
                checked: !1
            }, {
                mark: "C",
                detail: "户户开放",
                remark: "",
                checked: !1
            } ]
        }, {
            title: "6、您希望与您互动频次最长不超过（单选）",
            result: [ {
                mark: "A",
                detail: "双周",
                remark: "",
                checked: !1
            }, {
                mark: "B",
                detail: "1个月",
                remark: "",
                checked: !1
            }, {
                mark: "C",
                detail: "1季度",
                remark: "",
                checked: !1
            }, {
                mark: "D",
                detail: "半年",
                remark: "",
                checked: !1
            } ]
        }, {
            title: "7、您的个性化需求和建议：",
            inputStr: "",
            result: []
        } ],
        currentRoom: "",
        currentName: "",
        activity: {},
        customerActivity: {},
        isOther: !0,
        otherCurrentLen: 0,
        ideaCurrentLen: 0,
        placeholdRoom: "",
        placeholdName: ""
    },
    noSignAction: function(e) {
        this.setData({
            currentPage: 6
        }), console.log("我还没有签约"), this.clk_2cmina_154(), this.p_2cmina_57();
    },
    signAction: function(e) {
        this.setData({
            currentPage: 2
        }), console.log("我是已签约业主"), this.clk_2cmina_155(), this.p_2cmina_53();
    },
    page2nextAction: function(e) {
        var a = this.data, t = a.currentRoom, n = a.currentName, i = t.trim(), r = n.trim();
        console.log(i, r), 0 != i.length ? 0 !== r.length ? (this.setData({
            currentPage: 3
        }), wx.setStorageSync(o.globalData.single.id + "currentRoom", this.data.currentRoom), 
        wx.setStorageSync(o.globalData.single.id + "currentName", this.data.currentName), 
        this.clk_2cmina_156(), this.p_2cmina_54()) : wx.showToast({
            title: "您还未输入业主姓名",
            icon: "none"
        }) : wx.showToast({
            title: "您还未输入房号",
            icon: "none"
        });
    },
    goIndex: function(e) {
        wx.reLaunch({
            url: "../index/index"
        }), console.log("返回首页"), this.clk_2cmina_159();
    },
    goIndex1: function(e) {
        wx.reLaunch({
            url: "../index/index"
        }), console.log("返回首页"), this.clk_2cmina_160();
    },
    inputA: function(e) {
        var a = e.detail.value;
        this.data.questionArr[3].result[4].inputStr = a;
        var t = parseInt(a.length);
        this.setData({
            otherCurrentLen: t
        });
    },
    inputB: function(e) {
        var a = e.detail.value;
        this.data.questionArr[6].inputStr = a;
        var t = parseInt(a.length);
        this.setData({
            ideaCurrentLen: t
        });
    },
    submitAction: function(e) {
        var i = this;
        return a(t.default.mark(function e() {
            var a, r, c, u, s, l, m, g, d;
            return t.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    console.log("提交Action"), a = [], r = 0;

                  case 3:
                    if (!(r < i.data.questionArr.length)) {
                        e.next = 35;
                        break;
                    }
                    c = i.data.questionArr[r], u = [], s = {
                        from: o.globalData.fromChannel,
                        uuid: o.globalData.openid,
                        province: o.globalData.userInfo.province,
                        district: "",
                        city: o.globalData.userInfo.city,
                        customerName: "",
                        remark1: "",
                        remark2: ""
                    }, l = 0;

                  case 8:
                    if (!(l < c.result.length)) {
                        e.next = 21;
                        break;
                    }
                    if (!(m = c.result[l]).checked) {
                        e.next = 18;
                        break;
                    }
                    if (4 != l) {
                        e.next = 16;
                        break;
                    }
                    if (0 != parseInt(m.inputStr.length)) {
                        e.next = 15;
                        break;
                    }
                    return i.alertMessageAction("请填写完第4题后再提交"), e.abrupt("return", !1);

                  case 15:
                    s = {
                        from: o.globalData.fromChannel,
                        uuid: o.globalData.openid,
                        province: o.globalData.userInfo.province,
                        district: "",
                        city: o.globalData.userInfo.city,
                        customerName: "",
                        remark1: m.inputStr,
                        remark2: ""
                    };

                  case 16:
                    u.push(l + 1), a.push({
                        type: r + 1,
                        score: l + 1,
                        json: JSON.stringify(s),
                        uuid: o.globalData.openid
                    });

                  case 18:
                    l++, e.next = 8;
                    break;

                  case 21:
                    if (6 != r) {
                        e.next = 29;
                        break;
                    }
                    if (0 != c.inputStr.length) {
                        e.next = 25;
                        break;
                    }
                    return i.alertMessageAction("请填写完第7题后再提交"), e.abrupt("return", !1);

                  case 25:
                    s = {
                        from: o.globalData.fromChannel,
                        uuid: o.globalData.openid,
                        province: o.globalData.userInfo.province,
                        district: "",
                        city: o.globalData.userInfo.city,
                        customerName: "",
                        remark1: "",
                        remark2: c.inputStr
                    }, a.push({
                        type: r + 1,
                        score: 0,
                        json: JSON.stringify(s),
                        uuid: o.globalData.openid
                    }), e.next = 32;
                    break;

                  case 29:
                    if (0 != u.length) {
                        e.next = 32;
                        break;
                    }
                    return i.alertMessageAction("请选择完第" + (r + 1) + "题后再提交"), e.abrupt("return", !1);

                  case 32:
                    r++, e.next = 3;
                    break;

                  case 35:
                    return g = {
                        customerId: o.globalData.single.id,
                        groupType: 140,
                        houseId: o.globalData.single.houseId,
                        uuid: o.globalData.openid,
                        list: a
                    }, console.log("提交参数：", g), wx.showLoading({
                        mask: !0,
                        title: "提交中..."
                    }), e.next = 40, (0, n.default)("questionnaireSubmit", g);

                  case 40:
                    (d = e.sent) && (d.success && (i.alertMessageAction("提交成功"), i.setData({
                        currentPage: 5
                    }), i.setSubmitStorage(), i.getAddActivityRecord()), wx.hideLoading(), console.log("提交请求result：", d)), 
                    i.clk_2cmina_158(), i.p_2cmina_56();

                  case 44:
                  case "end":
                    return e.stop();
                }
            }, e, i);
        }))();
    },
    setSubmitStorage: function() {
        console.log("用户id：", o.globalData.single.id), wx.setStorage({
            key: "isSubmit",
            data: "" + o.globalData.single.id
        });
    },
    getSubmitStorage: function() {
        var e = this;
        wx.getStorage({
            key: "isSubmit",
            success: function(a) {
                console.log("缓存结果：", a.data), parseInt(a.data) == o.globalData.single.id ? (console.log("取出缓存与id一致， 页面跳转至结果页"), 
                e.setData({
                    currentPage: 5
                }), e.getQueryActivity(!0)) : e.getQueryActivity(!1);
            },
            fail: function(a) {
                console.log("缓存取出失败"), e.getQueryActivity(!1);
            }
        });
    },
    getRoomNumberStorage: function() {
        wx.setStorageSync("loadTime", new Date().getTime());
        var e = wx.getStorageSync(o.globalData.single.id + "currentRoom"), a = wx.getStorageSync(o.globalData.single.id + "currentName");
        console.log("=========KKKKKKKKK==============", e, a), e && a && this.setData({
            currentRoom: e,
            currentName: a,
            placeholdRoom: e,
            placeholdName: a
        });
    },
    alertMessageAction: function(e) {
        wx.showToast({
            title: e,
            icon: "none"
        });
    },
    inputRoom: function(e) {
        var a = e.detail.value.trim();
        this.setData({
            currentRoom: a
        });
    },
    inputName: function(e) {
        var a = e.detail.value.trim();
        this.setData({
            currentName: a
        });
    },
    getQueryActivity: function(e) {
        var i = this;
        return a(t.default.mark(function a() {
            var r, c;
            return t.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return e && i.p_2cmina_52(), r = {
                        code: "OWNER_QUESTIONNAIRE",
                        houseId: o.globalData.houseid
                    }, a.next = 4, (0, n.default)("queryActivity", r);

                  case 4:
                    (c = a.sent) && c.success && c.single && (console.log("***获取活动信息***", c), i.setData({
                        activity: c.single
                    }), e || i.getQueryCustomerActivity());

                  case 6:
                  case "end":
                    return a.stop();
                }
            }, a, i);
        }))();
    },
    getQueryCustomerActivity: function() {
        var e = this;
        return a(t.default.mark(function a() {
            var i, r;
            return t.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return i = {
                        customerId: o.globalData.single.id,
                        houseId: o.globalData.houseid,
                        activityId: e.data.activity.id
                    }, a.next = 3, (0, n.default)("queryCustomerActivity", i);

                  case 3:
                    r = a.sent, console.log("===获取客户活动记录信息===", r), r && r.success && r.single && r.single.roomNumber && r.single.roomNumber.length > 0 ? (e.setData({
                        currentPage: 5
                    }), e.p_2cmina_56()) : e.p_2cmina_52();

                  case 6:
                  case "end":
                    return a.stop();
                }
            }, a, e);
        }))();
    },
    getAddActivityRecord: function() {
        var e = this;
        return a(t.default.mark(function a() {
            var i, r;
            return t.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return i = {
                        activityId: e.data.activity.id,
                        customerId: o.globalData.single.id,
                        houseId: o.globalData.houseid,
                        customerName: e.data.currentName,
                        roomNumber: e.data.currentRoom
                    }, a.next = 3, (0, n.default)("addActivityRecord", i);

                  case 3:
                    r = a.sent, console.log("=====添加客户活动记录信息=====", r), r && r.success && r.single;

                  case 6:
                  case "end":
                    return a.stop();
                }
            }, a, e);
        }))();
    },
    page3nextAction: function(e) {
        this.setData({
            currentPage: 4
        }), console.log("page3 下一步"), this.clk_2cmina_157(), this.p_2cmina_55();
    },
    onCheckbox: function(e) {
        var a = this, t = e.currentTarget.dataset.index;
        this.data.questionArr.forEach(function(n, i) {
            t == i && (n.result = e.detail, n.result.forEach(function(e, t) {
                "其他" == e.detail && a.setData({
                    isOther: !e.checked
                });
            }));
        });
    },
    p_2cmina_52: function() {
        var e = {
            ip: o.globalData.ip,
            type: "PV",
            pvId: "p_2cmina_52",
            pvCurPageName: "shifouqianyue",
            pvCurPageParams: c,
            pvLastPageName: "zhuye",
            pvLastPageParams: "",
            pvPageLoadTime: new Date().getTime() - wx.getStorageSync("loadTime")
        };
        console.log("============ 埋点 ============", e), r.trackRequest(e);
    },
    p_2cmina_53: function() {
        wx.setStorageSync("loadTime", new Date().getTime());
        var e = {
            ip: o.globalData.ip,
            type: "PV",
            pvId: "p_2cmina_53",
            pvCurPageName: "tianxiexinxi",
            pvCurPageParams: c,
            pvLastPageName: "shifouqianyue",
            pvLastPageParams: "",
            pvPageLoadTime: new Date().getTime() - wx.getStorageSync("loadTime")
        };
        r.trackRequest(e);
    },
    p_2cmina_54: function() {
        wx.setStorageSync("loadTime", new Date().getTime());
        var e = {
            ip: o.globalData.ip,
            type: "PV",
            pvId: "p_2cmina_54",
            pvCurPageName: "zhunbeidati",
            pvCurPageParams: c,
            pvLastPageName: "tianxiexinxi",
            pvLastPageParams: "",
            pvPageLoadTime: new Date().getTime() - wx.getStorageSync("loadTime")
        };
        r.trackRequest(e);
    },
    p_2cmina_55: function() {
        wx.setStorageSync("loadTime", new Date().getTime());
        var e = {
            ip: o.globalData.ip,
            type: "PV",
            pvId: "p_2cmina_55",
            pvCurPageName: "datiyemian",
            pvCurPageParams: c,
            pvLastPageName: "zhunbeidati",
            pvLastPageParams: "",
            pvPageLoadTime: new Date().getTime() - wx.getStorageSync("loadTime"),
            expand: "groupType=140"
        };
        r.trackRequest(e);
    },
    p_2cmina_56: function() {
        wx.setStorageSync("loadTime", new Date().getTime());
        var e = {
            ip: o.globalData.ip,
            type: "PV",
            pvId: "p_2cmina_56",
            pvCurPageName: "datiwancheng",
            pvCurPageParams: c,
            pvLastPageName: "datiyemian",
            pvLastPageParams: "",
            pvPageLoadTime: new Date().getTime() - wx.getStorageSync("loadTime")
        };
        r.trackRequest(e);
    },
    p_2cmina_57: function() {
        wx.setStorageSync("loadTime", new Date().getTime());
        var e = {
            ip: o.globalData.ip,
            type: "PV",
            pvId: "p_2cmina_57",
            pvCurPageName: "weiqianyuejieguo",
            pvCurPageParams: c,
            pvLastPageName: "shifouqianyue",
            pvLastPageParams: "",
            pvPageLoadTime: new Date().getTime() - wx.getStorageSync("loadTime")
        };
        r.trackRequest(e);
    },
    clk_2cmina_154: function() {
        var e = {
            type: "CLK",
            clkId: "clk_2cmina_154",
            clkName: "weiqianyue",
            pvCurPageName: "shifouqianyue",
            pvCurPageParams: c,
            clkDesPage: "weiqianyuejieguo"
        };
        r.trackRequest(e);
    },
    clk_2cmina_155: function() {
        var e = {
            type: "CLK",
            clkId: "clk_2cmina_155",
            clkName: "yiqianyue",
            pvCurPageName: "shifouqianyue",
            pvCurPageParams: c,
            clkDesPage: "tianxiexinxi"
        };
        r.trackRequest(e);
    },
    clk_2cmina_156: function() {
        var e = {
            type: "CLK",
            clkId: "clk_2cmina_156",
            clkName: "yezhuxinxi",
            pvCurPageName: "tianxiexinxi",
            pvCurPageParams: c,
            clkDesPage: "zhunbeidati",
            clkParams: {
                currentRoom: this.data.currentRoom,
                currentName: this.data.currentName
            }
        };
        r.trackRequest(e);
    },
    clk_2cmina_157: function() {
        var e = {
            type: "CLK",
            clkId: "clk_2cmina_157",
            clkName: "zhunbeidati",
            pvCurPageName: "zhunbeidati",
            pvCurPageParams: c,
            clkDesPage: "datiyemian"
        };
        r.trackRequest(e);
    },
    clk_2cmina_158: function() {
        var e = {
            type: "CLK",
            clkId: "clk_2cmina_158",
            clkName: "tijiaodaan",
            pvCurPageName: "datiyemian",
            pvCurPageParams: c,
            clkDesPage: "datiwancheng",
            expand: "groupType=140"
        };
        r.trackRequest(e);
    },
    clk_2cmina_159: function() {
        var e = {
            type: "CLK",
            clkId: "clk_2cmina_159",
            clkName: "datijieshu",
            pvCurPageName: "datiwancheng",
            pvCurPageParams: c,
            clkDesPage: "zhuye"
        };
        r.trackRequest(e);
    },
    clk_2cmina_160: function() {
        var e = {
            type: "CLK",
            clkId: "clk_2cmina_160",
            clkName: "weiqianyue",
            pvCurPageName: "weiqianyuejieguo",
            pvCurPageParams: c,
            clkDesPage: "zhuye"
        };
        r.trackRequest(e);
    },
    detailLogin: function() {
        var e = this;
        console.log("***onShow未读消息总记录***", wx.getStorageSync("unReadMsgs")), console.log("==是否授权情况==", this.data.indexLiudian, o.globalData.phone), 
        o.login(function() {
            wx.setStorageSync("loadTime", new Date().getTime()), e.getRoomNumberStorage(), e.getSubmitStorage();
        });
    },
    onShareAppMessage: function(e) {
        return {
            imageUrl: o.globalData.shareImage || "",
            title: o.globalData.projectName || "",
            path: "/pages/questionnaire/ownerQuestionnaire?shareToken=" + o.globalData.shareToken + "&fromType=share"
        };
    },
    getCurrentPageParam: function() {
        return c;
    },
    onLoad: function(e) {
        c = JSON.stringify(e), console.log("qOption", e), o.decrypt(e), console.log("globalData.single.id", o.globalData), 
        this.detailLogin(), this.setData({
            questionArr: this.data.tempQuestionArr
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});