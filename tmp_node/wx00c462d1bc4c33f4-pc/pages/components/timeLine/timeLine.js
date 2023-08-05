var e = void 0, o = getApp().globalData.httpUrl;

Component({
    properties: {
        refundId: String,
        refundTitle: String
    },
    data: {
        orderNum: "",
        payBackMoney: "",
        refundresult: ""
    },
    methods: {
        contact: function() {
            console.log("==========绑定打电话功能=========="), wx.getStorage({
                key: "storeInfo",
                success: function(e) {
                    console.log("========联系电话========="), console.log(e.data.storeInfoTelephoneNum), 
                    null != e.data.storeInfoTelephoneNum && "" != e.data.storeInfoTelephoneNum && void 0 != e.data.storeInfoTelephoneNum && "undefined" != e.data.storeInfoTelephoneNum && "null" != e.data.storeInfoTelephoneNum || wx.showModal({
                        title: "无联系电话",
                        content: ""
                    }), wx.makePhoneCall({
                        phoneNumber: e.data.storeInfoTelephoneNum
                    });
                },
                fail: function(e) {
                    console.log("========没有storeInfo=========");
                }
            });
        },
        swithToOrder: function() {
            e.setData({
                displ: !1
            }), wx.switchTab({
                url: "/pages/index/order/order"
            });
        }
    },
    attached: function() {
        var t = (e = this).properties.refundId, a = e.properties.refundTitle;
        wx.request({
            url: o + "skmembermodel/selRefundInfo",
            data: {
                id: t
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(o) {
                console.log(o.data), e.setData({
                    refundTitle: a,
                    refundId: t,
                    orderNum: o.data.data[0].orderNum,
                    orderType: o.data.data[0].orderType,
                    refundTime: o.data.data[0].createTime,
                    payBackMoney: o.data.data[0].refundmoney,
                    refundresult: o.data.data[0].refundresult
                });
            }
        });
    }
});