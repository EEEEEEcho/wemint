function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../../store")), i = t(require("../../../utils/create")), e = require("../../../api/apiInstance.js"), u = getApp();

(0, i.default)(a.default, {
    properties: {},
    data: {
        navH: u.globalData.navH,
        status: u.globalData.status,
        cartPage: "尚免·图纸",
        buildingData: {},
        houseTypeList: [],
        linkUuid: "",
        activityUuid: "",
        groupUuid: "",
        pageSize: 10,
        pageNum: 1,
        active: 0
    },
    onLoad: function(t) {
        this.setData({
            isShowLoad: !0,
            linkUuid: t.linkUuid,
            activityUuid: t.activityUuid
        }), this.getMarketingBuildingInfo();
    },
    getMarketingBuildingApartmentQuery: function(t) {
        var a = this, i = {
            pageSize: this.data.pageSize,
            pageNum: this.data.pageNum,
            activityUuid: this.data.activityUuid,
            sort: "desc",
            accesstoken: "",
            linkUuid: this.data.linkUuid,
            groupUuid: t
        };
        (0, e.getMarketingBuildingApartmentQuery)(i, function(t) {
            1 == t.errcode && (console.log(t), a.setData({
                houseTypeList: t.data,
                isShowLoad: !1
            }));
        });
    },
    getMarketingBuildingInfo: function() {
        var t = this, a = {
            linkUuid: this.data.linkUuid
        };
        (0, e.getMarketingBuildingInfo)(a, function(a) {
            1 == a.errcode && (t.setData({
                buildingData: a.data
            }), 0 != a.data.apartmentGroups.length && (t.setData({
                groupUuid: a.data.apartmentGroups[0].groupUuid
            }), t.getMarketingBuildingApartmentQuery(a.data.apartmentGroups[0].groupUuid)));
        });
    },
    chooseOne: function(t) {
        this.setData({
            active: t.currentTarget.dataset.index,
            isShowLoad: !0,
            groupUuid: t.currentTarget.dataset.groupuuid
        }), this.getMarketingBuildingApartmentQuery(t.currentTarget.dataset.groupuuid);
    },
    toPage: function(t) {
        var a = t.currentTarget.dataset.apartmentuuid, i = this.data.activityUuid;
        wx.navigateTo({
            url: "/pages/drawing/furnitureCate/furnitureCate?apartmentUuid=" + a + "&activityUuid=" + i
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            pageNum: 1,
            isShowLoad: !0
        });
        var t = this.data.groupUuid;
        this.getMarketingBuildingApartmentQuery(t);
    },
    onReachBottom: function() {
        var t = this;
        if (!this.data.isLoad) {
            var a = this.data.pageNum + 1;
            this.setData({
                pageNum: a,
                isShowLoad: !0
            });
            var i = {
                pageSize: this.data.pageSize,
                pageNum: this.data.pageNum,
                activityUuid: this.data.activityUuid,
                sort: "desc",
                accesstoken: "",
                linkUuid: this.data.linkUuid,
                groupUuid: this.data.groupUuid
            };
            (0, e.getMarketingBuildingApartmentQuery)(i, function(i) {
                if (1 === i.errcode) {
                    var e = t.data.houseTypeList.concat(i.data), u = !0;
                    i.pages > t.data.pageNum && (u = !1), t.setData({
                        houseTypeList: e,
                        isLoad: u,
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