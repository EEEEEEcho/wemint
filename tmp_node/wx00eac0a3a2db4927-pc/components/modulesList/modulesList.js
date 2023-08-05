(0, function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/create")).default)({
    properties: {
        uiData: Object,
        modulesData: Object
    },
    observers: {
        uiData: function(e) {
            "{}" != JSON.stringify(e) && this.setData({
                banners: e.banners
            });
        },
        modulesData: function(e) {
            "{}" != JSON.stringify(e) && (this.data.commend.comByCategory.dataList = e.cateList, 
            this.data.commend.comByStyle.dataList = e.styleList, this.data.commend.comByArea.dataList = e.spaceList, 
            this.setData({
                commend: this.data.commend
            }));
        }
    },
    data: {
        banners: [],
        limitState: !1,
        commend: {
            comByFriend: {
                avatar: "http://oss.shangmian.xin/weixin_applets_login_default_avatar.png",
                wechatName: "酒不醉人",
                label: "为您推荐",
                dataList: []
            },
            comByStyle: {
                title: "家",
                category: "风格",
                label: "勾勒美居",
                dataList: []
            },
            comByCategory: {
                title: "家",
                category: "分类",
                label: "细分精选",
                dataList: []
            },
            comByArea: {
                title: "家",
                category: "空间",
                label: "场景专题",
                dataList: []
            }
        },
        userInfo: {}
    },
    ready: function() {},
    methods: {
        onFreeList: function(e) {
            var t = e.currentTarget.dataset.free.page;
            wx.navigateTo({
                url: t
            });
        },
        changeLimitState: function() {
            this.setData({
                limitState: !0
            });
        },
        navigateToTap: function(e) {
            var t = e.currentTarget.dataset.cate, a = "", i = e.currentTarget.dataset.index;
            "undefined" != e.currentTarget.dataset.param && (a = e.currentTarget.dataset.param), 
            "风格" == t ? wx.navigateTo({
                url: "/pages/home/homeStyle/homeStyle?name=" + a + "&index=" + i
            }) : "分类" == t ? wx.navigateTo({
                url: "/pages/home/homeCate/homeCate?name=" + a
            }) : "空间" == t ? wx.navigateTo({
                url: "/pages/home/homeSpace/homeSpace?name=" + a + "&index=" + i
            }) : wx.navigateTo({
                url: "/pages/home/friendRecommend/friendRecommend"
            });
        }
    }
});