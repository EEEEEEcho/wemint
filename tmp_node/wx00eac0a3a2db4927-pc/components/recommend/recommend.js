function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/create")), a = require("../../utils/jumpTo.js"), s = require("../../api/apiInstance.js");

require("../../utils/canvasUtil");

(0, t.default)({
    properties: {
        navH: Number,
        status: Number,
        isShowMask: Boolean
    },
    data: {
        isComplex: !0,
        isPrice: !0,
        isGrade: !0,
        isShow: !1,
        isShowDesign: !1,
        active: 0,
        currentSwiper: 0,
        uiData: {},
        isShowLoad: !0,
        isIndexRecommend: 1,
        isShowContactService: !1,
        modulesData: {}
    },
    ready: function() {
        this.getUiData(), this.getModulesData();
    },
    onHide: function() {
        this.setData({
            isShowContactService: !1
        });
    },
    methods: {
        toSearch: function() {
            wx.navigateTo({
                url: "/pages/search/search"
            });
        },
        onFreeList: function(e) {
            var t = e.currentTarget.dataset.free.page;
            wx.navigateTo({
                url: t
            });
        },
        changeTap: function(e) {
            this.triggerEvent("changeTap", {
                active: e.currentTarget.dataset.activeid,
                isShowDesign: !0
            });
        },
        onPageScroll: function(e) {
            this.selectComponent("#goodList").onPageScroll(e);
        },
        swiperChange: function(e) {
            this.setData({
                currentSwiper: e.detail.current
            });
        },
        onRefresh: function() {
            this.getUiData(), this.selectComponent("#goodList").onRefresh();
        },
        onMore: function() {
            this.selectComponent("#goodList").onMore();
        },
        getCategoryQuery: function() {
            var t = this, a = {
                pageSize: 20,
                pageNum: 1
            };
            (0, s.getCategoryQuery)(a, function(a) {
                1 === a.errcode && t.setData(e({}, "modulesData.cateList", a.data));
            });
        },
        getSpaceQuery: function() {
            var t = this, a = {
                pageSize: 20,
                pageNum: 1,
                isMiniApp: 1
            };
            this.store.data.userInfo.accesstoken && (a.accesstoken = this.store.data.userInfo.accesstoken), 
            (0, s.getSpaceQuery)(a, function(a) {
                1 === a.errcode && t.setData(e({}, "modulesData.spaceList", a.data));
            });
        },
        getStyleQuery: function() {
            var t = this, a = {
                pageSize: 20,
                pageNum: 1,
                isMiniApp: 1
            };
            this.store.data.userInfo.accesstoken && (a.accesstoken = this.store.data.userInfo.accesstoken), 
            (0, s.getStyleQuery)(a, function(a) {
                1 === a.errcode && (a.data.length > 0 && (t.data.styleUuid = a.data[0].styleUuid), 
                t.setData(e({}, "modulesData.styleList", a.data)));
            });
        },
        getModulesData: function() {
            this.getCategoryQuery(), this.getSpaceQuery(), this.getStyleQuery();
        },
        getUiData: function() {
            var e = this, t = {
                type: 4
            };
            "" != this.store.data.userInfo.accesstoken && (t.accesstoken = this.store.data.userInfo.accesstoken), 
            (0, s.getUiDataQuery)(t, function(t) {
                1 === t.errcode && e.setData({
                    uiData: t.data
                }), e.setData({
                    isShowLoad: !1
                });
            });
        },
        dismissConcatModal: function(e) {
            this.setData({
                isShowContactService: e.detail
            });
        },
        jumpToPage: function(e) {
            var t = e.currentTarget.dataset.url, s = e.currentTarget.dataset.urlschema, i = (0, 
            a.jumpToWeb)(s, t);
            "" != i && ("isShowContactService" == i ? this.setData({
                isShowContactService: !0
            }) : wx.navigateTo({
                url: i
            }));
        }
    }
});