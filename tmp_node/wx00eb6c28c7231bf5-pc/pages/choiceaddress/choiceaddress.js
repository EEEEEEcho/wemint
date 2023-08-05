var d = getApp();

Page({
    data: {
        ProductSku: "",
        BuyAmount: 0,
        FromPage: "",
        CountdownId: "",
        ShipAddressId: "",
        AddressList: null,
        AddressCount: 0
    },
    onLoad: function(t) {
        var o = this, a = t.productsku, e = t.buyamount, u = t.frompage, s = t.countdownid, r = t.shipaddressid;
        d.getOpenId(function(t) {
            wx.request({
                url: d.getUrl("GetUserShippingAddress"),
                data: {
                    openId: t
                },
                success: function(d) {
                    var t = d.data.Data;
                    "NO" == t.Status && wx.redirectTo({
                        url: "../editaddress/editaddress?Source=choiceaddress&productsku=" + a + "&buyamount=" + e + "&frompage=" + u + "&countdownid=" + s
                    }), o.setData({
                        ProductSku: a,
                        BuyAmount: e,
                        FromPage: u,
                        CountdownId: s,
                        ShipAddressId: r,
                        AddressCount: "[]" == t ? 0 : t.length,
                        AddressList: t
                    });
                }
            });
        });
    },
    bindEditAddressTap: function(d) {
        var t = d.currentTarget.dataset.addressdata, o = this;
        wx.redirectTo({
            url: "../editaddress/editaddress?extra=" + JSON.stringify(t) + "&title=编辑收货地址&Source=choiceaddress&productsku=" + o.data.ProductSku + "&buyamount=" + o.data.BuyAmount + "&frompage=" + o.data.FromPage + "&countdownid=" + o.data.CountdownId
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onAddShippingAddress: function(d) {
        wx.redirectTo({
            url: "../editaddress/editaddress?Source=choiceaddress&productsku=" + this.data.ProductSku + "&buyamount=" + this.data.BuyAmount + "&frompage=" + this.data.FromPage + "&countdownid=" + this.data.CountdownId + "&title=新增收货地址"
        });
    },
    onAddressCheck: function(d) {
        console.log(d);
        var t = d.detail.value;
        wx.redirectTo({
            url: "../submitorder/submitorder?productsku=" + this.data.ProductSku + "&buyamount=" + this.data.BuyAmount + "&frompage=" + this.data.FromPage + "&countdownid=" + this.data.CountdownId + "&shipaddressid=" + t
        });
    }
});