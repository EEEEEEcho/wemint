// pages/login/login.js
var app = getApp();

Page({
    data: {
        disabled: true,
        userName: "",
        password: ""
    },
    onLoad: function onLoad(options) {
        // 页面初始化 options为页面跳转所带来的参数
    },
    onReady: function onReady() {
        // 页面渲染完成
    },
    onShow: function onShow() {
        // 页面显示
    },
    onHide: function onHide() {
        // 页面隐藏
    },
    onUnload: function onUnload() {
        // 页面关闭
    },
    bindUserNameInput: function bindUserNameInput(e) {
        this.setData({
            userName: e.detail.value
        });
    },
    bindPwdInput: function bindPwdInput(e) {
        this.setData({
            password: e.detail.value
        });
        if (this.data.userName.length > 0 && this.data.password.length > 0) {
            this.setData({
                disabled: false
            });
        } else {
            this.setData({
                disabled: true
            });
        }
    },
    loginbyUser: function loginbyUser(e) {
        //账号登录
        var uname = this.data.userName;
        var pwd = this.data.password;
        if (pwd.length < 6) {
            app.showErrorModal("密码长度不能少于6位");
            return;
        }
        wx.showLoading({
            title: "正在登录"
        });
        app.getWxUserInfo(function(wxUserInfo) {
            wx.request({
                url: app.getUrl("login/getLoginByUserName"),
                data: {
                    openId: wxUserInfo.openId,
                    userName: uname,
                    password: pwd,
                    nickName: wxUserInfo.nikeName,
                    unionId: wxUserInfo.unionId,
                    encryptedData: wxUserInfo.encryptedData,
                    session_key: wxUserInfo.session_key,
                    iv: wxUserInfo.iv
                },
                success: function success(result) {
                    if (result.data.Status == "OK") {
                        wx.hideLoading();
                        app.setUserInfo(result.data.Data);
                        wx.switchTab({
                            url: "../home/home"
                        });
                    } else {
                        wx.hideLoading();
                        app.showErrorModal(result.data.Message);
                    }
                }
            });
        });
    },
    quickLogin: function quickLogin(e) {
        //信任登录
        app.getWxUserInfo(function(wxUserInfo) {
            wx.request({
                url: app.getUrl("Login/GetQuickLogin"),
                data: {
                    openId: wxUserInfo.openId,
                    nickName: wxUserInfo.nikeName,
                    unionId: wxUserInfo.unionId,
                    headImage: wxUserInfo.headImage,
                    encryptedData: wxUserInfo.encryptedData,
                    session_key: wxUserInfo.session_key,
                    iv: wxUserInfo.iv
                },
                success: function success(result) {
                    if (result.data.Status == "OK") {
                        app.setUserInfo(result.data.Data);
                        wx.switchTab({
                            url: "../home/home"
                        });
                    }
                }
            });
        });
    }
});