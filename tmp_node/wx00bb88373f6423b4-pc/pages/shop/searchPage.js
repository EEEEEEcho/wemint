var e = getApp(), t = (require("../../components/utils/imgutil.js"), require("../../components/utils/util.js"));

Page({
    data: {
        searchkey: "",
        searchRecord: [],
        firstKey: ""
    },
    onLoad: function(e) {
        var t = this, a = /^\d*$/;
        t.data.searchkey = new Date().getTime() + "", wx.getStorageInfo({
            success: function(e) {
                for (var r = e.keys.length - 1; r >= 0; r--) {
                    var o = wx.getStorageSync(e.keys[r]);
                    console.log(o), console.log(e), 1 == r && (t.data.firstKey = e.keys[r]), a.test(e.keys[r]) && t.data.searchRecord.push(o);
                }
                t.data.searchRecord.length > 20 && (wx.removeStorage({
                    key: t.data.firstKey,
                    success: function(e) {
                        console.log(e.data);
                    }
                }), t.data.searchRecord.pop()), t.setData({
                    searchRecord: t.data.searchRecord
                });
            }
        });
    },
    back: function() {
        wx.navigateBack({});
    },
    onSearchSubmit: function(a) {
        var r, o = t.trim(a.detail.value.keyword);
        if (o) {
            if (o) {
                try {
                    r = this.data.searchkey, wx.setStorageSync(r, o);
                } catch (a) {
                    a = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(a);
                    console.log(a);
                }
                wx.redirectTo({
                    url: "productlist?keyword=" + o
                });
            }
        } else e.showModal({
            title: "提示",
            content: "请输入产品关键词"
        });
    },
    clearStorage: function() {
        var e = this;
        wx.clearStorageSync(), e.setData({
            searchRecord: []
        }), wx.showToast({
            title: "清除历史记录",
            icon: "succes",
            duration: 1e3,
            mask: !0
        });
    },
    onKeywordChange: function(a) {
        var r, o = t.trim(a.detail.value);
        if (o) {
            if (o) {
                try {
                    r = this.data.searchkey, wx.setStorageSync(r, o);
                } catch (a) {
                    a = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(a);
                    console.log(a);
                }
                wx.redirectTo({
                    url: "productlist?keyword=" + o
                });
            }
        } else e.showModal({
            title: "提示",
            content: "请输入产品关键词"
        });
    },
    searchAgain: function(e) {
        console.log(e.currentTarget.dataset.value), wx.redirectTo({
            url: "productlist?keyword=" + e.currentTarget.dataset.value
        });
    }
});