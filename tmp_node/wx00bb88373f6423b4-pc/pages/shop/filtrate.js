Page({
    data: {
        startDate: "",
        endDate: "",
        chooseType: 0,
        chooseTypeText: "全部",
        forceRefresh: !1
    },
    onLoad: function(e) {},
    onUnload: function() {
        wx.setStorage({
            key: "startDate",
            data: this.data.startDate
        }), wx.setStorage({
            key: "endDate",
            data: this.data.endDate
        }), wx.setStorage({
            key: "chooseType",
            data: this.data.chooseType
        }), wx.setStorage({
            key: "chooseTypeText",
            data: this.data.chooseTypeText
        }), wx.setStorage({
            key: "forceRefresh",
            data: !0
        });
    },
    startDateChange: function(e) {
        this.setData({
            startDate: e.detail.value,
            forceRefresh: !0
        });
    },
    endDateChange: function(e) {
        this.setData({
            endDate: e.detail.value,
            forceRefresh: !0
        });
    },
    chooseWay: function(e) {
        this.data.chooseType;
        var t = parseInt(e.currentTarget.dataset.idx), a = e.currentTarget.dataset.text;
        this.setData({
            chooseType: t,
            chooseTypeText: a,
            forceRefresh: !0
        });
    },
    navigateBack: function() {
        wx.setStorageSync("isOk", 1), setTimeout(function() {
            wx.navigateBack({
                delta: 1
            });
        }, 200);
    }
});