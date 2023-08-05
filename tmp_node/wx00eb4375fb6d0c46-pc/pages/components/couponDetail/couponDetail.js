Component({
    properties: {
        showDetail: {
            type: Boolean
        },
        couponDetail: {
            type: Object
        }
    },
    data: {},
    methods: {
        openLocation: function(t) {
            console.log(t.currentTarget.dataset.msg), wx.getLocation({
                type: "gcj02",
                success: function(e) {
                    var a = t.currentTarget.dataset.msg.latitude, o = t.currentTarget.dataset.msg.longitude;
                    wx.openLocation({
                        latitude: a,
                        longitude: o,
                        scale: 18
                    });
                }
            });
        },
        closeCouponDetail: function(t) {
            this.setData({
                showDetail: !1
            });
            var e = {
                val: this.data.showDetail
            };
            this.triggerEvent("myevent", e);
        }
    }
});