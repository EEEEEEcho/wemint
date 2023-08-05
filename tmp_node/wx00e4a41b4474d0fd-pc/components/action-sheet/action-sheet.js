var e = require("../../utils/util");

Component({
    properties: {
        showActionSheet: {
            type: Boolean,
            value: !0
        },
        contentSrc: {
            type: String,
            value: ""
        },
        hasClose: {
            type: Boolean,
            value: !0
        },
        hasInnerBtn: {
            type: Boolean,
            value: !1
        },
        timelineSrc: {
            type: String,
            value: ""
        },
        openSetting: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        showMenu: !0,
        timeline: !1
    },
    methods: {
        attached: function() {},
        onClose: function() {
            this.triggerEvent("onclose");
        },
        onShareFriend: function() {
            (0, e.trackRequest)({
                type: "CLK",
                clkName: "fenxainggeihaoyou",
                clkId: "clk_2cdinzhi_16"
            }), console.log("onsharefriend"), this.triggerEvent("onsharefriend");
        },
        onShareTimeline: function() {
            (0, e.trackRequest)({
                type: "CLK",
                clkName: "fenxiangdaopengyouquan",
                clkId: "clk_2cdinzhi_17"
            }), this.setData({
                timeline: !0,
                showMenu: !1
            });
        },
        saveImage: function() {
            this.triggerEvent("onsaveimage");
        },
        onMenuTap: function() {
            console.log("onMenuTap");
        },
        handleSetting: function(e) {
            console.log("actionsheet", e), this.triggerEvent("opensetting", e);
        }
    }
});