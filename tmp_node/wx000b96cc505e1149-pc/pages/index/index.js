function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

//index.js
//获取应用实例
var app = getApp();

var config = require("../../conf.js");

var requestUtil = require("../../utils/requestUtil.js");

var Page = require("../../utils/xmadx_sdk.min.js").xmad(Page).xmPage;

var index = {
    saveRecord: function saveRecord(userCode, event, eventSign, param, titeName, appsign, success) {
        var url = "/appinfo/saveRecord.json";
        requestUtil.requestPost(url, {
            userCode: userCode,
            event: event.id || 0,
            eventSign: titeName,
            param: eventSign + param,
            appsign: appsign
        }, function(msg) {
            console.log(event.tite + "_" + titeName + "_" + appsign);
            app.aldstat.sendEvent(event.tite + "_" + titeName, {
                /* 内容标题: titeName,
          目标ID: eventSign,
          目标参数: param,*/
                appsign: appsign
            });
            if (success != null) success(msg);
        });
    }
};

Page({
    data: {
        applist: [],
        showModel: false,
        qdlist: [],
        datelist: [ "一", "二", "三", "四", "五", "六", "七" ],
        userId: "",
        cash: 0,
        signDays: 0,
        userOppenId: "",
        money: 0,
        webview: false,
        randcolor: [ "#48bffd,#1daaf3", "#f3d152,#ffbb06", "#c549ff,#b803ff", "#fe5eb2,#fe3da1" ],
        colorList: [],
        imageid: -1,
        startPage: {
            appsign: null,
            operation: 0,
            target: null,
            param: null,
            backgroundImg: "https://zcdn.zhihuangongshe.com/blzy/qiangxie/tupian26.jpg",
            button: "游戏",
            closeImg: "",
            //../images/close.png
            banner: "http://facetalk.gz.bcebos.com/timg.gif",
            bannerAdImg: "",
            bannerAdNoOff: false,
            insertAdNoOff: false,
            txBannerAdNoOff: false
        },
        xmad: {
            adData: {},
            ad: {
                banner: config.banner,
                insert: config.insert,
                fixed: config.fixed
            }
        }
    },
    onLoad: function onLoad(options) {
        if (app.globalData.title != null) {
            wx.setNavigationBarTitle({
                title: app.globalData.title
            });
        }
        var that = this;
        var user = null;
        var loginwx = function loginwx(mode, err) {
            //微信小程序获取userOppenId,并获取用户信息
            wx.login({
                success: function success(res) {
                    console.log(res.code);
                    if (res.code) {
                        wx.request({
                            url: config.ppbaseDomain + "/user/getUserOppenId.json?loginCode=" + res.code + "&appsign=" + config.appsign,
                            success: function success(res) {
                                console.log("获取用户信息" + res.data.openid);
                                that.userOppenId = res.data.openid;
                                //如过没有获取到OpenId
                                                                if (that.userOppenId == undefined) {
                                    var userOppenId = wx.getStorageSync("userOppenId") || Date.now();
                                    wx.setStorageSync("userOppenId", userOppenId);
                                    that.setData({
                                        userOppenId: that.userOppenId
                                    });
                                    that.userOppenId = userOppenId;
                                } else {
                                    that.setData({
                                        userOppenId: that.userOppenId
                                    });
                                }
                                //获取用户信息
                                                                wx.request({
                                    url: config.ppbaseDomain + "/user/getUserInfo.json",
                                    data: {
                                        userOpenId: that.userOppenId,
                                        appsign: config.appsign
                                    },
                                    success: function success(msg) {
                                        console.log("用户信息获取成功");
                                        user = msg.data;
                                        console.log(user);
                                        that.setData({
                                            userOppenId: user.userOpenId,
                                            signdays: user.sign,
                                            money: user.money,
                                            cash: user.cash,
                                            userId: user.id
                                        });
                                        mode();
                                    }
                                });
                            }
                        });
                    } else {
                        console.log("获取用户登录态失败！" + res.errMsg);
                        err();
                    }
                },
                complete: function complete(e) {
                    console.log("未登录");
                },
                fail: function fail(e) {
                    console.log("登录异常");
                    err();
                }
            });
        };
        //获取系统启动初始化状态
                var init = function init() {
            wx.request({
                url: config.ppbaseDomain + "/StartPageController/getStartPageByAppsign.json",
                data: {
                    appsign: config.appsign
                },
                success: function success(msg) {
                    that.setData({
                        startPage: msg.data
                    });
                    switch (msg.data.operation) {
                      case 0:
                        ;
                        break;

                        //保持不变
                                              case 1:
                        //弹出签到
                        if (user == null) break;
                        wx.request({
                            url: config.ppbaseDomain + "/user/getCash.json",
                            data: {
                                appsign: config.appsign
                            },
                            success: function success(msg) {
                                that.setData({
                                    qdlist: msg.data
                                });
                                sign = function() {
                                    var date = new Date();
                                    var year = date.getFullYear();
                                    var month = date.getMonth() + 1;
                                    month = month < 10 ? "0" + month : month;
                                    var day = date.getDate();
                                    day = day < 10 ? "0" + day : day;
                                    var showModel = true;
                                    var signdays = 0;
                                    if (user.signDate == year + "-" + month + "-" + day) {
                                        //今天已经签到
                                        that.setData({
                                            showModel: false
                                        });
                                    } else {
                                        that.setData({
                                            showModel: true
                                        });
                                    }
                                }();
                            }
                        });
                        break;

                      case 2:
                        //弹出二维码
                        msg.data.button = "";

                      case 3:
                        //弹出跳转小程序
                        break;

                      case 4:
                        //强制跳转小程序
                        var success = function success() {
                            wx.navigateToMiniProgram({
                                appId: that.data.startPage.target,
                                path: that.data.startPage.param
                            });
                        };
                        index.saveRecord(that.data.userOppenId, {
                            tite: "启动页强制跳转小程序"
                        }, that.data.startPage.target, that.data.startPage.param, "启动页没有title", config.appNameStr, success);
                        break;
                    }
                }
            });
        };
        //调起登录方法
                loginwx(init, init);
    },
    onReady: function onReady() {
        var that = this;
        //获取下面的APP列表  
                wx.request({
            url: config.ppbaseDomain + "/appinfo/findByOrder.json",
            data: {
                appsign: encodeURI(config.appsign),
                title: app.globalData.title == undefined ? "" : encodeURI(encodeURI(app.globalData.title)),
                param: encodeURI(app.globalData.param)
            },
            success: function success(msg) {
                var a = new Array();
                for (var i = 0; i < msg.data.length; i++) {
                    a[i] = that.data.randcolor[Math.floor(Math.random() * that.data.randcolor.length + 0)];
                }
                that.setData({
                    applist: msg.data,
                    colorList: a
                });
            }
        });
    },
    /** 隐藏签到奖励框 */
    hidemodel: function hidemodel() {
        this.setData({
            showModel: false
        });
    },
    /** 领取签到奖励 */
    qdjllq: function qdjllq() {
        var that = this;
        wx.request({
            url: config.ppbaseDomain + "/user/sign.json",
            data: {
                userOppenId: this.data.userOppenId,
                appsign: config.appsign
            },
            success: function success(msg) {
                if (msg.data) {
                    that.setData({
                        showModel: false
                    });
                }
            }
        });
    },
    junpPage: function junpPage(e) {
        index.saveRecord(this.data.userOppenId, {
            tite: "打开内容跳转webView",
            id: e.currentTarget.dataset.event
        }, e.currentTarget.dataset.url, e.currentTarget.dataset.path, e.currentTarget.dataset.appname, config.appNameStr, null);
        this.setData({
            websrc: config.ppbaseDomain + "/user/junpage?url=" + e.currentTarget.dataset.url + "&userCode=" + this.data.userOppenId + "&appsign=" + config.appsign,
            webview: true
        });
    },
    record: function record(e) {
        console.log(e);
        var that = this;
        var success = function success(msg) {
            console.log("点击成功" + e.currentTarget.dataset.appid + "$" + e.currentTarget.dataset.path);
            // wx.navigateToMiniProgram({
            //   appId: e.currentTarget.dataset.appid,
            //   path: e.currentTarget.dataset.path
            // })
                };
        index.saveRecord(this.data.userOppenId, {
            tite: "打开内容跳转小程序",
            id: e.currentTarget.dataset.event
        }, e.currentTarget.dataset.appid, e.currentTarget.dataset.path, e.currentTarget.dataset.appname, config.appNameStr, success);
    },
    openImg: function openImg(e) {
        var that = this;
        var success = function success(msg) {
            var imgs = new Array();
            imgs.push(e.currentTarget.dataset.target);
            wx.previewImage({
                current: e.currentTarget.dataset.target,
                //当前图片地址
                urls: imgs,
                //所有要预览的图片的地址集合 数组形式
                success: function success(res) {},
                fail: function fail(res) {},
                complete: function complete(res) {}
            });
        };
        console.log(e.currentTarget.appname);
        index.saveRecord(that.data.userOppenId, {
            tite: "打开内容打开图集",
            id: e.currentTarget.dataset.event
        }, e.currentTarget.dataset.target, "图片没有参数", e.currentTarget.dataset.appname, config.appNameStr, success);
    },
    previewImage: function previewImage(e) {
        var wat = this;
        if (wat.data.startPage.operation != 2) {
            console.log("屏蔽打开图片");
            return;
        }
        index.saveRecord(wat.data.userOppenId, {
            tite: "启动页打开二维码图片"
        }, wat.data.startPage.backgroundImg, "图片没有参数", "启动页配置没有标题", config.appNameStr, null);
        wx.previewImage({
            urls: [ wat.data.startPage.backgroundImg ]
        });
    },
    startPageCloseImage: function startPageCloseImage(e) {
        var that = this;
        var success = function success(msg) {
            wx.navigateToMiniProgram({
                appId: that.data.startPage.target,
                path: that.data.startPage.param
            });
        };
        index.saveRecord(that.data.userOppenId, {
            tite: "启动图按钮跳转小程序"
        }, that.data.startPage.target, that.data.startPage.param, "启动页配置没有标题", config.appNameStr, success);
    },
    closeImage: function closeImage(e) {
        var wat = this;
        wat.setData(_defineProperty({}, "startPage.operation", 0));
    },
    addCash: function addCash(e) {
        //点击广告
        var that = this;
        index.saveRecord(that.data.userOppenId, {
            tite: "点击了" + e.currentTarget.dataset.name + "广告"
        }, e.currentTarget.id, e.currentTarget.dataset.name, "广告没有标题", config.appNameStr, null);
        wx.request({
            url: config.ppbaseDomain + "/user/addCash.json",
            data: {
                userOppenId: that.data.userOppenId,
                aDType: e.currentTarget.dataset.name,
                appsign: config.appsign
            },
            success: function success(msg) {
                var a = 0;
                if (msg.data == "banner") {
                    a = 100;
                } else if (msg.data == "insert") {
                    a = 120;
                }
                that.setData({
                    cash: that.data.cash + a
                });
            }
        });
    },
    JumpCustomerService: function JumpCustomerService(e) {
        //跳转到客服
        index.saveRecord(this.data.userOppenId, {
            tite: "打开内容跳转客服",
            id: e.currentTarget.dataset.event
        }, e.currentTarget.dataset.target, e.currentTarget.dataset.path, e.currentTarget.dataset.appNameStr, config.appsign, null);
    },
    onShow: function onShow() {
        //除了从小程序返回！ 其它场景都跳转到该应用
        var that = this;
        console.log(app.globalData.options);
        console.log(that.data.startPage);
        if (app.globalData.options.scene != 1038 && that.data.startPage.operation == 4) {
            wx.navigateToMiniProgram({
                appId: that.data.startPage.target,
                path: that.data.startPage.param
            });
            that.setData(_defineProperty({}, "startPage.operation", 0));
        }
    }
});