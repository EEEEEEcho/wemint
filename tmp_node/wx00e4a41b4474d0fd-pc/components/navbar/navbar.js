var a = require("../../utils/util.js"), t = getApp();

Component({
    properties: {
        data: {
            type: Object,
            value: {},
            observer: function(a, t) {}
        }
    },
    data: {
        height: "",
        data: {
            showCapsule: 1,
            capsuleUrl: "",
            navPadding: 0,
            url: "",
            haveCallback: !1,
            fromShare: !1,
            fromProject: 0,
            pageId: null,
            shareToken: null,
            buildingStyleData: null,
            buildingCityStyleData: null,
            currentSelectCity: ""
        }
    },
    attached: function() {
        this.setData({
            height: t.globalData.navigateStatusContainerHeight,
            statusBarHeight: t.globalData.statusBarHeight
        });
    },
    methods: {
        navigateFuc: function(a) {
            var t = {};
            this.triggerEvent("FloatCpClk", a, t);
        },
        cityCpClk: function(a) {
            var t = {};
            this.triggerEvent("cityCpClk", a, t);
        },
        navbackCallback: function() {
            return !!this.data.data.haveCallback && (this.triggerEvent("navbarBackCallback"), 
            !0);
        },
        navback: function(e) {
            var i = this.data.data.url, n = this.data.data.fromShare, l = (this.data.data.fromProject, 
            this.data.data.houseId, this.data.data.shareToken), r = this.data.data.pageName, s = getCurrentPages();
            if (i) wx.navigateTo({
                url: i
            }); else if (!this.navbackCallback()) {
                var c = {
                    clkDesPage: "dianjifanhui",
                    type: "CLK",
                    clkName: "fanhui",
                    pvCurPageName: r,
                    clkId: "clk_2cmina_36"
                };
                a.trackRequest(c, t), !n && s.length > 1 ? wx.navigateBack() : wx.redirectTo({
                    url: "../../pages/index/index?shareToken=" + l,
                    success: function() {},
                    fail: function(a) {
                        console.log(a);
                    }
                });
            }
        }
    }
});