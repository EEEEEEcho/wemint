var t = getApp();

Page({
    data: {
        shengArr: [],
        shengId: [],
        shiArr: [],
        shiId: [],
        quArr: [],
        shengIndex: 0,
        shiIndex: 0,
        quIndex: 0,
        mid: 0,
        sheng: 0,
        city: 0,
        area: 0,
        code: 0,
        cartId: 0
    },
    formSubmit: function(a) {
        var e = a.detail.value, s = this.data.cartId;
        wx.request({
            url: t.d.ceshiUrl + "/Api/Address/add_adds",
            data: {
                user_id: t.d.userId,
                receiver: e.name,
                tel: e.phone,
                sheng: this.data.sheng,
                city: this.data.city,
                quyu: this.data.area,
                adds: e.address,
                code: this.data.code
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                1 == t.data.status ? wx.showToast({
                    title: "保存成功！",
                    duration: 2e3
                }) : wx.showToast({
                    title: t.data.err,
                    duration: 2e3
                }), wx.redirectTo({
                    url: "user-address/user-address?cartId=" + s
                });
            },
            fail: function() {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3
                });
            }
        });
    },
    onLoad: function(a) {
        var e = this;
        e.setData({
            cartId: a.cartId
        }), wx.request({
            url: t.d.ceshiUrl + "/Api/Address/get_province",
            data: {},
            method: "POST",
            success: function(t) {
                t.data.status;
                var a = t.data.list, s = [], d = [];
                s.push("请选择"), d.push("0");
                for (var i = 0; i < a.length; i++) s.push(a[i].name), d.push(a[i].id);
                e.setData({
                    shengArr: s,
                    shengId: d
                });
            },
            fail: function() {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3
                });
            }
        });
    },
    bindPickerChangeshengArr: function(a) {
        this.setData({
            shengIndex: a.detail.value,
            shiArr: [],
            shiId: [],
            quArr: [],
            quiId: []
        });
        var e = this;
        wx.request({
            url: t.d.ceshiUrl + "/Api/Address/get_city",
            data: {
                sheng: a.detail.value
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                t.data.status;
                var a = t.data.city_list, s = [], d = [];
                s.push("请选择"), d.push("0");
                for (var i = 0; i < a.length; i++) s.push(a[i].name), d.push(a[i].id);
                e.setData({
                    sheng: t.data.sheng,
                    shiArr: s,
                    shiId: d
                });
            },
            fail: function() {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3
                });
            }
        });
    },
    bindPickerChangeshiArr: function(a) {
        this.setData({
            shiIndex: a.detail.value,
            quArr: [],
            quiId: []
        });
        var e = this;
        wx.request({
            url: t.d.ceshiUrl + "/Api/Address/get_area",
            data: {
                city: a.detail.value,
                sheng: this.data.sheng
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                t.data.status;
                var a = t.data.area_list, s = [], d = [];
                s.push("请选择"), d.push("0");
                for (var i = 0; i < a.length; i++) s.push(a[i].name), d.push(a[i].id);
                e.setData({
                    city: t.data.city,
                    quArr: s,
                    quiId: d
                });
            },
            fail: function() {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3
                });
            }
        });
    },
    bindPickerChangequArr: function(a) {
        console.log(this.data.city), this.setData({
            quIndex: a.detail.value
        });
        var e = this;
        wx.request({
            url: t.d.ceshiUrl + "/Api/Address/get_code",
            data: {
                quyu: a.detail.value,
                city: this.data.city
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                e.setData({
                    area: t.data.area,
                    code: t.data.code
                });
            },
            fail: function() {
                wx.showToast({
                    title: "网络异常！",
                    duration: 2e3
                });
            }
        });
    }
});