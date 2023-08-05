var e = getApp();

Component({
    properties: {
        popusHidden: {
            type: Boolean,
            value: !0,
            observer: function(e, t) {}
        },
        popusMsg: {
            type: String,
            value: " "
        },
        popusStatus: {
            type: Number,
            value: 1
        },
        popusText: {
            type: String,
            value: ""
        },
        isLoading: {
            type: Boolean,
            value: !1
        },
        prizeImg: {
            type: String,
            value: ""
        },
        dialogShow: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        baseUrl: e.globalData.siteBaseUrl
    },
    methods: {
        _popus_click_Hidden: function() {
            this.setData({
                isLoading: !1
            });
            var e = {}, t = {};
            this.triggerEvent("closeEvent", e, t);
        },
        _popus_click_pay: function() {
            var e = {}, t = {};
            this.triggerEvent("payEvent", e, t);
        },
        _popus_click_index: function() {
            wx.switchTab({
                url: "/pages/shop/index"
            });
        },
        _popus_click_share: function() {
            var e = {}, t = {};
            this.triggerEvent("shareEvent", e, t);
        },
        _popus_click_look: function() {
            var e = {}, t = {};
            this.triggerEvent("lookEvent", e, t);
        }
    }
});