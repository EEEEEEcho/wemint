var t = require("../../utils/config.js"), e = null, a = new Array(), i = new Array(), s = new Array(), d = new Array(), o = 0, r = 0, n = 0, l = 0, u = getApp(), h = [], c = [];

Page({
    data: {
        navigateTitle: "",
        addressData: {},
        shipTo: "",
        cellPhone: "",
        fullAddress: "",
        address: "",
        regionId: "",
        provinceName: [],
        provinceCode: [],
        provinceSelIndex: "",
        cityName: [],
        cityCode: [],
        citySelIndex: "",
        districtName: [],
        districtCode: [],
        districtSelIndex: "",
        streetName: [],
        streetCode: [],
        streetSelIndex: "",
        showMessage: !1,
        messageContent: "",
        showDistpicker: !1,
        Source: "",
        ProductSku: "",
        BuyAmount: 0,
        FromPage: "",
        CountdownId: "",
        ShipAddressId: "",
        FullRegionName: ""
    },
    onLoad: function(t) {
        this.setAreaData();
        var e = t.title;
        this.data.navigateTitle = e, wx.setNavigationBarTitle({
            title: this.data.navigateTitle
        });
        var a = 0;
        if ("编辑收货地址" == e) {
            var i = JSON.parse(t.extra);
            i.FullAddress.replace(" " + i.Address, "");
            if (void 0 != i.FullRegionPath && null != i.FullRegionPath) {
                var s = i.FullRegionPath.split(",");
                a = s[s.length - 1];
            }
            this.setData({
                addressData: i,
                shipTo: i.ShipTo,
                cellPhone: i.CellPhone,
                fullAddress: i.FullAddress,
                FullRegionName: i.FullRegionName,
                address: i.Address,
                ProductSku: t.productsku,
                BuyAmount: t.buyamount,
                FromPage: t.frompage,
                CountdownId: t.countdownid,
                ShipAddressId: t.shipaddressid,
                Source: t.Source
            });
        }
        this.setData({
            regionId: a,
            ProductSku: t.productsku,
            BuyAmount: t.buyamount,
            FromPage: t.frompage,
            CountdownId: t.countdownid,
            ShipAddressId: t.shipaddressid,
            Source: t.Source
        });
    },
    bindShipToTap: function(t) {
        var e = t.detail.value;
        this.data.shipTo = e;
    },
    bindCellPhoneTap: function(t) {
        var e = t.detail.value;
        this.data.cellPhone = e;
    },
    bindFullAddressTap: function(t) {
        this.setData({
            showDistpicker: !0
        });
    },
    bindAddressTap: function(t) {
        var e = t.detail.value;
        this.data.address = e;
    },
    bindSaveTapTap: function(e) {
        var a = this;
        0 != a.data.shipTo.length ? 0 != a.data.cellPhone.length ? 0 != a.data.fullAddress.length ? 0 != a.data.address.length ? u.getOpenId(function(e) {
            if (wx.showNavigationBarLoading(), "新增收货地址" == a.data.navigateTitle) {
                i = {
                    openId: e,
                    shipTo: a.data.shipTo,
                    address: a.data.address,
                    cellphone: a.data.cellPhone,
                    regionId: a.data.regionId
                };
                t.httpPost(u.getUrl(u.globalData.addShippingAddress), i, a.getEditAddressData);
            } else {
                var i = {
                    openId: e,
                    shippingId: a.data.addressData.ShippingId,
                    isDefault: a.data.addressData.IsDefault,
                    shipTo: a.data.shipTo,
                    address: a.data.address,
                    cellphone: a.data.cellPhone,
                    regionId: a.data.regionId
                };
                t.httpPost(u.getUrl(u.globalData.updateShippingAddress), i, a.getEditAddressData);
            }
        }) : wx.showToast({
            title: "请输入详细地址",
            icon: "fail",
            duration: 2e3
        }) : wx.showToast({
            title: "请输入所在地区",
            icon: "fail",
            duration: 2e3
        }) : wx.showToast({
            title: "请输入联系电话",
            icon: "fail",
            duration: 2e3
        }) : wx.showToast({
            title: "请输入收货人",
            icon: "fail",
            duration: 2e3
        });
    },
    getEditAddressData: function(t) {
        if (wx.hideNavigationBarLoading(), "NOUser" == t.Message) wx.redirectTo({
            url: "../login/login"
        }); else if ("OK" == t.Status) {
            var e = this.data.Source, a = "";
            void 0 == e || "" == e ? a = "../address/address" : (e = "choiceaddress") ? a = "../choiceaddress/choiceaddress?productsku=" + this.data.ProductSku + "&buyamount=" + this.data.BuyAmount + "&frompage=" + this.data.FromPage + "&countdownid=" + this.data.CountdownId : (e = "submmitorder") && (a = "../submitorder/submitorder?productsku=" + this.data.ProductSku + "&buyamount=" + this.data.BuyAmount + "&frompage=" + this.data.FromPage + "&countdownid=" + this.data.CountdownId + "&shipaddressid=" + t.Message), 
            void 0 != a && "" != a && wx.redirectTo({
                url: a
            });
        } else wx.showToast({
            title: t.Message,
            icon: "loading",
            duration: 1e4
        }), setTimeout(function() {
            wx.hideToast();
        }, 2e3);
    },
    changeArea: function(t) {
        var e = this;
        o = t.detail.value[0], r = t.detail.value[1], n = t.detail.value.length > 2 ? t.detail.value[2] : 0, 
        l = 0, e.setAreaData(o, r, n, l);
    },
    showDistpicker: function() {
        this.setData({
            showDistpicker: !0
        });
    },
    distpickerCancel: function() {
        this.setData({
            showDistpicker: !1
        });
    },
    distpickerSure: function() {
        var t, e = this.data.provinceName[o] + " " + this.data.cityName[r] + " " + this.data.districtName[n];
        this.data.streetCode.length > 0 ? t = this.data.streetCode[l] : this.data.districtCode.length > 0 ? t = this.data.districtCode[n] : this.data.cityCode.length > 0 && (t = this.data.cityCode[r]), 
        this.setData({
            fullAddress: e,
            FullRegionName: e,
            regionId: t
        }), this.distpickerCancel();
    },
    ArrayContains: function(t, e) {
        for (var a = t.length; a--; ) if (t[a] === e) return !0;
        return !1;
    },
    getRegions: function(t, e, i, d) {
        var o = this, r = !0;
        3 == e ? o.ArrayContains(a, t) || (r = !1) : 4 == r && (o.ArrayContains(s, t) || (r = !1)), 
        wx.request({
            url: u.getUrl("GetRegions"),
            async: !1,
            data: {
                parentId: t
            },
            success: function(e) {
                console.log(e), "OK" == e.data.Status && (3 == e.data.Depth ? o.setAreaDataShow(e.data.Regions, t, i, d) : 4 == e.Depth && o.setStreetData(e.data.Regions, t, i, d));
            }
        });
    },
    setProvinceCityData: function(t, a, i, s, d) {
        var o = this;
        null != t && (e = t);
        var r = e, n = [], l = [];
        for (var u in r) {
            var h = r[u].name, c = r[u].id;
            n.push(h), l.push(c);
        }
        o.setData({
            provinceName: n,
            provinceCode: l
        });
        var g = e[a].city, p = [], v = [];
        for (var u in g) {
            var h = g[u].name, c = g[u].id;
            1, p.push(h), v.push(c);
        }
        o.setData({
            cityName: p,
            cityCode: v
        });
        var f = g[i].area, m = [], D = [];
        if (null != f && f.length > 0) {
            for (var u in f) {
                var h = f[u].name, c = f[u].id;
                m.push(h), D.push(c);
            }
            o.setData({
                districtName: m,
                districtCode: D
            });
        } else o.setData({
            districtName: [],
            districtCode: []
        });
    },
    getItemIndex: function(t, e) {
        for (var a = t.length; a--; ) if (t[a] === e) return a;
        return -1;
    },
    setAreaDataShow: function(t, e, d, o) {
        var n = this;
        if (null != t) h = t, a.push(e), i.push(t); else {
            var l = n.getItemIndex(a, e);
            h = l >= 0 ? i[l] : [];
        }
        var u = [], c = [];
        if (h && h.length > 0) {
            for (var g in h) {
                var p = g.id, v = g.name;
                u.push(p), c.push(v);
            }
            n.setData({
                districtName: u,
                districtCode: c
            });
        } else n.setData({
            districtName: [],
            districtCode: []
        });
        this.ArrayContains(s, d) ? n.setStreetData(null, r, d, o) : n.getRegions(r, 4, d, o);
    },
    setStreetData: function(t, e, a, i) {
        var o = this;
        if (null != t) s.push(regionId), d.push(t), c = t; else {
            var r = o.getItemIndex(s, e);
            c = r >= 0 ? d[r] : [];
        }
    },
    setAreaData: function(t, a, i, s) {
        var d = this, t = t || 0, a = a || 0, s = (i = i || 0) || 0;
        void 0 == e || null == e ? wx.request({
            url: u.getUrl("GetRegionsOfProvinceCity"),
            async: !1,
            success: function(e) {
                "OK" == e.data.Status && (console.log("aaa-" + t + "-" + a + "-" + i + "-" + s), 
                d.setProvinceCityData(e.data.province, t, a, i, s));
            },
            error: function(t) {
                console.log(t);
            }
        }) : d.setProvinceCityData(null, t, a, i, s);
    }
});