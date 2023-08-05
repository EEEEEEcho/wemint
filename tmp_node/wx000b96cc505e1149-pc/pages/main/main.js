//index.js
//获取应用实例
var app = getApp();

var config = require("../../conf.js");

var Page = require("../../utils/xmadx_sdk.min.js").xmad(Page).xmPage;

Page({
    data: {},
    onLoad: function onLoad(options) {
        app.globalData.title = options.title;
        //'美食'
                app.globalData.param = JSON.stringify(options);
    },
    onReady: function onReady() {
        // app.aldstat.sendEvent("启动小程序",{
        //   appsign: config.appsign
        // });
        wx.request({
            url: config.ppbaseDomain + "/appinfo/getswitch2.json",
            data: {
                appsign: config.appsign
            },
            success: function success(msg) {
                if (msg.data.appSwitch == "1" && msg.data.appsign == config.appsign) {
                    console.log("*****" + "进入 index");
                    wx.reLaunch({
                        url: "../index/index"
                    });
                } else if (msg.data.appSwitch == "2" && msg.data.appsign == config.appsign) {
                    console.log("*****" + "进入 home");
                    wx.reLaunch({
                        url: "../home/home"
                    });
                } else {
                    console.log("*****" + "进入 index");
                    wx.reLaunch({
                        url: "../index/index"
                    });
                }
            },
            fail: function fail(err) {
                console.log(err);
                console.error("*****" + "请求错误" + config.ppbaseDomain + "/appinfo/getswitch2.json" + config.appsign);
            }
        });
    }
});