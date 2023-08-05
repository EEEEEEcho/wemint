var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/create")), e = require("../../api/apiInstance");

(0, t.default)({
    properties: {
        isShowMask: Boolean,
        latitude: Number,
        longitude: Number
    },
    observers: {
        isShowMask: function(t) {
            t && this.setData({
                options: t
            });
        }
    },
    data: {
        shopList: [],
        options: !1
    },
    methods: {
        closeMask: function() {
            var t = this;
            this.setData({
                options: !1
            }), setTimeout(function() {
                t.setData({
                    isShowMask: !1
                }), t.triggerEvent("closeMask", !1);
            }, 480);
        },
        setLocation: function(t, a) {
            var o = this, s = {
                longitude: t,
                latitude: a
            };
            (0, e.getAppQuery)(s, function(t) {
                if (1 === t.errcode) {
                    for (var e = 0, a = 0; a < t.data.length; a++) e = (t.data[a].distance / 1e3).toFixed(1), 
                    t.data[a].distance = e;
                    o.setData({
                        shopList: t.data
                    });
                }
            });
        },
        onNavigation: function(t) {
            var e = t.currentTarget.dataset.shop, a = e.latitude, o = e.longitude, s = e.name, i = e.address;
            wx.openLocation({
                latitude: a,
                longitude: o,
                scale: 18,
                name: s,
                address: i
            });
        },
        callPhone: function(t) {
            var e = t.currentTarget.dataset.phone;
            wx.makePhoneCall({
                phoneNumber: e
            });
        }
    }
});