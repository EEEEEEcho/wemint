var a = {
    README: {
        intro: "README 为此文件的格式说明，不会显示在小程序的链接组件中",
        url: "页面地址，如 /pages/index",
        name: "页面名称，如首页",
        isnav: "值为 true 或 false,当为 false 时，不会显示在小程序的链接组件中，为什么需要这样？因为产品详情页等，不应该出现在链接组件中，但系统又需要有相应的配置才能正常工作"
    },
    HomeIndex: {
        url: "/pages/shop/index",
        name: "首页"
    },
    UserCenter: {
        url: "/pages/company/mycenter",
        name: "用户中心"
    },
    ShopCart: {
        url: "/pages/shop/shopcart",
        name: "购物车"
    },
    ProductList: {
        url: "/pages/shop/productlist?classid=$id",
        name: "产品列表"
    },
    ProductDetail: {
        url: "/pages/shop/productdetail?id=$id",
        name: "产品详情",
        isnav: !1
    },
    ServiceList: {
        url: "/pages/shop/servicelist?classid=$id",
        name: "服务列表"
    },
    ServiceDetail: {
        url: "/pages/shop/servicedetail?id=$id",
        name: "服务详情",
        isnav: !1
    },
    NewsList: {
        url: "/pages/shop/newslist?classid=$id",
        name: "文章列表"
    },
    NewsDetail: {
        url: "/pages/shop/newsdetail?id=$id",
        name: "文章详情",
        isnav: !1
    },
    categoryPage: {
        url: "/pages/shop/categoryPage",
        name: "产品分类列表"
    },
    qrcode: {
        url: "/pages/shop/qrcode",
        name: "分享二维码",
        isnav: !1
    },
    mycoupon: {
        url: "/pages/company/mycoupon",
        name: "优惠券列表"
    },
    couponCenter: {
        url: "/pages/company/couponcenter",
        name: "领券中心"
    },
    recharge: {
        url: "/pages/shop/recharge",
        name: "会员充值"
    },
    distribution: {
        url: "/pages/distributioncenter/withdraw/index",
        name: "分销中心"
    },
    PinTuanDetail: {
        url: "/pages/fightGroups/productdetail/index?id=$id",
        name: "拼团产品详情",
        isnav: !1
    },
    PinTuanIndex: {
        url: "/pages/fightGroups/jigsawpuzzle",
        name: "拼团列表",
        isnav: !1
    },
    SecKillList: {
        url: "/pages/purchaselimit/purchaselimit/index",
        name: "秒杀列表",
        isnav: !1
    },
    SecKillProDetail: {
        url: "/pages/purchaselimit/productdetail/index",
        name: "秒杀产品详情",
        isnav: !1
    },
    OneKeyPhoneCall: {
        url: "/pages/OneKeyPhoneCall",
        name: "一键拨号"
    },
    OneKeyNav: {
        url: "/pages/OneKeyNav",
        name: "一键导航"
    },
    CustomPage: {
        url: "/pages/shop/custompage?id=$id",
        name: "自定义页",
        isnav: !1
    },
    ActivityList: {
        url: "/pages/fullReduction/activityListPage?id=$id",
        name: "满减活动",
        isnav: !1
    },
    CardDetails: {
        url: "/pages/businesscard/workbench/index?BusinessCardID=$businessCardID",
        name: "名片详情",
        isnav: !1
    },
    NormalCardDetails: {
        url: "/pages/company/businessCard/cardDetails?BusinessCardID=$businessCardID",
        name: "名片详情",
        isnav: !1
    },
    EditCard: {
        url: "/pages/businesscard/editcard/index",
        name: "名片编辑",
        isnav: !1
    },
    CardCase: {
        url: "/pages/businesscard/cardcase/index",
        name: "名片夹",
        isnav: !1
    },
    BargainList: {
        url: "/pages/bargain/bargainlist/index",
        name: "砍价列表",
        isnav: !1
    },
    BargainProDetail: {
        url: "/pages/bargain/productdetail/index",
        name: "砍价详情",
        isnav: !1
    },
    ScratchCard: {
        url: "/pages/scratchcard/scratchcard?id=$id",
        name: "刮刮卡",
        isnav: !1
    }
};

try {
    module.exports = a;
} catch (a) {}