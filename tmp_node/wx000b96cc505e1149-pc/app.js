//app.js
var App = require("./utils/xmadx_sdk.min.js").xmad(App, "App").xmApp;

var aldstat = require("./utils/ald-stat.js");

var config = require("./conf.js");

App({
    onLaunch: function onLaunch() {
        // wx.getSetting({
        //   success(res) {
        //     if (!res.authSetting['scope.userInfo']) {
        //       wx.authorize({
        //         scope: 'scope.userInfo',
        //         success() {
        //           console.log('授权成功');
        //         }
        //       })
        //     }
        //   }
        // })
    },
    globalData: {
        param: null,
        title: null,
        options: null
    },
    onShow: function onShow(options) {
        //保存小程序场景
        this.globalData.options = options;
    }
});