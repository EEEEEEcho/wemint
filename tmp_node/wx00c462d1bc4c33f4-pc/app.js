App({
    globalData: {
        appId: "wx00c462d1bc4c33f4",
        Secret: "7902f236bcd01639db07df36ee89ee9c",
        userInfo: null,
        foodName: "",
        price: 0,
        totalprice: 0,
        toBuyNum: 0,
        httpUrl: "https://zdr.zhongderun.com/",
        tuhttpUrl: "https://zdr.zhongderun.com",
        testhttpUrl: "http://192.168.0.124:8100/"
    },
    onLaunch: function() {
        wx.login({
            success: function(o) {
                console.log("====wx.login success====");
                o.code;
                o.code ? (wx.setStorage({
                    key: "code",
                    data: o.code
                }), console.log("res.code ==> " + o.code)) : console.log("获取用户登录态失败！" + o.errMsg);
            },
            fail: function(o) {
                console.log("====wx.login fail===="), console.log("错误信息"), console.log(o);
            }
        }), wx.setStorageSync("connectedSocket", !1);
        var o = this;
        wx.request({
            url: o.globalData.httpUrl + "skstoremodel/findCompanyByAppid",
            data: {
                xcxAppid: o.globalData.appId
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(o) {
                wx.setNavigationBarTitle({
                    title: o.data.companyInfoName
                }), wx.setStorage({
                    key: "companyInfo",
                    data: o.data
                }), wx.setStorage({
                    key: "companyId",
                    data: o.data.companyInfoId
                });
            }
        });
    },
    getUserInfo: function(o) {
        var e = this;
        e.globalData.userInfo ? "function" == typeof o && o(e.globalData.userInfo) : wx.login({
            success: function() {
                console.log("测试数据 login"), wx.getUserInfo({
                    success: function(t) {
                        e.globalData.userInfo = t.userInfo, "function" == typeof o && o(e.globalData.userInfo);
                    }
                });
            }
        });
    }
});