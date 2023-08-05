var e = require("../../utils/util");

Component({
    properties: {
        type: {
            type: String,
            value: "huxing"
        },
        houseTypes: {
            type: Array,
            value: []
        },
        houseTypeSelected: {
            type: Object,
            value: {}
        },
        spaceTypes: {
            type: Array,
            value: []
        },
        spaceSelected: {
            type: Object,
            value: {}
        },
        spaceNames: {
            type: Object,
            value: {}
        }
    },
    methods: {
        attached: function() {},
        onSelectChange: function(e) {
            this.triggerEvent("onselectchange", e);
        },
        onPickCancel: function() {
            var t = {};
            "huxing" === this.properties.type && (this.triggerEvent("oncancel", {
                update: !1
            }), t = {
                type: "CLK",
                clkName: "quxiaoxaunzehuxing",
                clkId: "clk_2cdinzhi_8"
            }), "space" === this.properties.type && (this.triggerEvent("onspacecancel", {
                update: !1
            }), t = {
                type: "CLK",
                clkName: "quxiaoxuanzekongjian",
                clkId: "clk_2cdinzhi_12"
            }), (0, e.trackRequest)(t);
        },
        onPickSure: function() {
            "huxing" === this.properties.type && this.triggerEvent("onsure", {
                update: !0
            }), "space" === this.properties.type && this.triggerEvent("onspacesure", {
                update: !0
            });
        },
        onSelectSpaceChange: function(e) {
            this.triggerEvent("onselectspacechange", e);
        },
        onSelectSubSpaceChange: function(e) {
            this.triggerEvent("onselectsubspacechange", e);
        },
        onClose: function() {
            this.triggerEvent("onclose");
        },
        onMenuTap: function() {}
    }
});