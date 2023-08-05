function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function a(t, a, i) {
    return a in t ? Object.defineProperty(t, a, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = i, t;
}

var i = t(require("../../../store")), e = t(require("../../../utils/create")), o = require("../../../utils/authorize"), n = require("../../../api/apiInstance.js"), s = getApp();

(0, e.default)(i.default, {
    properties: {},
    data: {
        timeout: null,
        navH: s.globalData.navH,
        status: s.globalData.status,
        cartPage: "尚免·图纸",
        drawArea: [],
        positionInfo: {},
        initAddress: {},
        location: {},
        pageSize: 10,
        pageNum: 1,
        isLoad: !1,
        currentSwiper: 0,
        isShowPosition: !1,
        options: !1,
        inputValue: "",
        swiperImages: [],
        provinceIndex: -1,
        provinceName: "",
        cityList: [],
        cityIndex: -1,
        cityName: "嘉兴市",
        townList: [],
        townIndex: -1,
        townName: "",
        region: "南湖区",
        isShowLoad: !1
    },
    toSelectPosition: function() {
        this.setData({
            isShowPosition: !0,
            options: !0
        });
    },
    closePositionModel: function() {
        var t = this;
        this.setData({
            options: !1
        }), this.data.timeout = setTimeout(function() {
            t.setData({
                isShowPosition: !1
            });
        }, 450);
    },
    getInputValue: function(t) {
        this.setData({
            inputValue: t.detail.value
        }), "" != t.detail.value && this.getMarketingBuildingQuery();
    },
    inputPosition: function() {
        "" != this.data.inputValue ? this.getMarketingBuildingQuery() : wx.showToast({
            title: "请输入关键字",
            icon: "none",
            duration: 1e3
        });
    },
    swiperChange: function(t) {
        this.setData({
            currentSwiper: t.detail.current
        });
    },
    selectThisProvince: function(t) {
        var i, e = t.currentTarget.dataset.provinceindex, o = this.data.positionInfo.region[e], n = o.geo.split(",");
        this.setData((i = {
            provinceIndex: e,
            provinceName: t.currentTarget.dataset.provincename,
            region: t.currentTarget.dataset.provincename
        }, a(i, "location.longitude", n[0]), a(i, "location.latitude", n[1]), a(i, "location.adCode", o.adCode), 
        a(i, "cityList", o.childs), i));
    },
    selectThisCity: function(t) {
        var i, e = t.currentTarget.dataset.cityindex, o = this.data.cityList[e], n = o.geo.split(",");
        this.setData((i = {
            cityIndex: e,
            cityName: t.currentTarget.dataset.cityname,
            region: t.currentTarget.dataset.cityname
        }, a(i, "location.longitude", n[0]), a(i, "location.latitude", n[1]), a(i, "location.adCode", o.adCode), 
        a(i, "townList", o.childs), i));
    },
    selectThisTown: function(t) {
        var i, e = t.currentTarget.dataset.townindex, o = this.data.townList[e], n = o.geo.split(",");
        this.setData((i = {
            townIndex: t.currentTarget.dataset.townindex,
            townName: t.currentTarget.dataset.townname,
            region: t.currentTarget.dataset.townname
        }, a(i, "location.longitude", n[0]), a(i, "location.latitude", n[1]), a(i, "location.adCode", o.adCode), 
        i));
    },
    getRegion: function() {
        var t = this;
        "" != this.data.provinceName && "" != this.data.cityName && "" != this.data.townName ? (this.setData({
            options: !1
        }), this.data.timeout = setTimeout(function() {
            t.setData({
                isShowPosition: !1,
                region: "南湖区"
            });
        }, 450), this.getMarketingBuildingQuery()) : wx.showToast({
            title: "请选择具体位置",
            icon: "none",
            duration: 1e3
        });
    },
    toPage: function(t) {
        var a = t.currentTarget.dataset.linkuuid;
        wx.navigateTo({
            url: "/pages/drawing/houseType/houseType?activityUuid=1553594489397100894&linkUuid=" + a
        });
    },
    onUnload: function() {
        clearTimeout(timeout), this.setData({
            inputValue: ""
        });
    },
    onLoad: function() {
        this.setData({
            isShowLoad: !0
        }), this.getMarketingActivityInfo(), this.getPosition();
    },
    onShow: function() {},
    getMarketingActivityInfo: function() {
        var t = this, a = {
            activityUuid: "1553594489397100894",
            accesstoken: ""
        };
        (0, n.getMarketingActivityInfo)(a, function(a) {
            1 == a.errcode && t.setData({
                positionInfo: a.data
            });
        });
    },
    getPosition: function() {
        var t = this;
        (0, o.getLocationPermission)(function(i) {
            if ("getLocation:ok" == i.errMsg) {
                var e;
                t.setData((e = {}, a(e, "location.longitude", i.longitude), a(e, "location.latitude", i.latitude), 
                e));
            }
            t.getMarketingBuildingQuery();
        });
    },
    getParam: function() {
        var t = {
            pageSize: this.data.pageSize,
            pageNum: this.data.pageNum,
            sort: "desc",
            accesstoken: "",
            activityUuid: "1553594489397100894"
        };
        return 0 != Object.keys(this.data.location).length ? (t.longitude = this.data.location.longitude, 
        t.latitude = this.data.location.latitude, "" != this.data.location.adCode ? t.adCode = this.data.location.adCode : t.adCode = "") : (t.longitude = 120.749953, 
        t.latitude = 30.764652, t.adCode = "330402"), "" != this.data.inputValue ? t.keywords = this.data.inputValue : t.keywords = "", 
        t;
    },
    getMarketingBuildingQuery: function() {
        var t = this, a = this.getParam();
        (0, n.getMarketingBuildingQuery)(a, function(a) {
            1 == a.errcode && t.setData({
                drawArea: a.data,
                isShowLoad: !1
            });
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            pageNum: 1,
            isShowLoad: !0
        }), this.getMarketingBuildingQuery();
    },
    onReachBottom: function() {
        var t = this;
        if (!this.data.isLoad) {
            var a = this.data.pageNum + 1;
            this.setData({
                pageNum: a,
                isShowLoad: !0
            });
            var i = this.getParam();
            (0, n.getMarketingBuildingQuery)(i, function(i) {
                if (1 === i.errcode) {
                    var e = t.data.drawArea.concat(i.data), o = !0;
                    i.pages > t.data.pageNum && (o = !1), t.setData({
                        drawArea: e,
                        isLoad: o,
                        isShowLoad: !1
                    });
                } else t.setData({
                    isLoad: !1,
                    pageNum: a - 1,
                    isShowLoad: !1
                });
            });
        }
    }
});