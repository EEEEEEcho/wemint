var t = getApp();

Page({
    data: {
        rec_name: "",
        cur_address: "",
        phone: "",
        is_first: 0,
        url: t.page.url,
        userid: "",
        id: 0,
        address: []
    },
    nameText: function(t) {
        console.log(t.detail.value), this.setData({
            rec_name: t.detail.value
        });
    },
    telText: function(t) {
        console.log(t.detail.value), this.setData({
            phone: t.detail.value
        });
    },
    addText: function(t) {
        this.setData({
            cur_address: t.detail.value
        });
    },
    switch2Change: function(t) {
        console.log("switch2 发生 change 事件，携带值为", t.detail.value), this.setData({
            is_first: t.detail.value
        });
    },
    onLoad: function(t) {
        var a = this;
        wx.getStorage({
            key: "userid",
            success: function(e) {
                console.log(e), a.setData({
                    userid: e.data
                }), console.log(t.id), t.id && (a.setData({
                    id: t.id
                }), a.getAddress());
            }
        });
    },
    getAddress: function() {
        var a = this;
        console.log(a.data.id), console.log(a.data.userid), wx.request({
            url: t.page.url + "/wx/member.php?act=address_update",
            method: "post",
            data: {
                userid: a.data.userid,
                id: a.data.id
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.log(t.data), a.setData({
                    rec_name: t.data.rec_name,
                    cur_address: t.data.cur_address,
                    phone: t.data.phone,
                    is_first: t.data.is_first
                });
            }
        });
    },
    submit: function() {
        var t = this.data.rec_name, a = this.data.cur_address, e = this.data.phone;
        return 1 == this.data.is_first ? this.setData({
            is_first: 1
        }) : this.setData({
            is_first: 0
        }), "" == t ? (wx.showToast({
            title: "请输入收货人姓名！",
            icon: "loading",
            duration: 1e3
        }), !1) : "" == e ? (wx.showToast({
            title: "请输入手机号",
            icon: "loading",
            duration: 1e3
        }), !1) : /^[1][3,4,5,7,8][0-9]{9}$/.test(e) ? "" == a && a.length < 5 ? (wx.showToast({
            title: "请输入详细地址！",
            icon: "loading",
            duration: 1e3
        }), !1) : void (this.data.id ? this.updateAddress() : this.addAddress()) : (wx.showToast({
            title: "手机号输入错误",
            icon: "loading",
            duration: 1e3
        }), !1);
    },
    addAddress: function() {
        console.log(this.data.userid), wx.request({
            url: t.page.url + "/wx/member.php?act=address_jud",
            method: "post",
            data: {
                userid: this.data.userid,
                is_first: this.data.is_first,
                rec_name: this.data.rec_name,
                phone: this.data.phone,
                cur_address: this.data.cur_address
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.log(t.data), 0 == t.data.code ? wx.navigateBack() : wx.showToast({
                    title: t.data.msg,
                    icon: "loading",
                    duration: 1e4
                });
            }
        });
    },
    updateAddress: function() {
        console.log(this.data.is_first), wx.request({
            url: t.page.url + "/wx/member.php?act=addr_update",
            method: "post",
            data: {
                id: this.data.id,
                userid: this.data.userid,
                is_first: this.data.is_first,
                rec_name: this.data.rec_name,
                phone: this.data.phone,
                cur_address: this.data.cur_address
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.log(t.data), 0 == t.data.code ? wx.navigateBack() : wx.showToast({
                    title: t.data.msg,
                    icon: "loading",
                    duration: 1e4
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        wx.setNavigationBarTitle({
            title: t.globalData.title
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});