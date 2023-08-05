var e = {
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
    PinTuanDetail: {
        url: "/pages/fightGroups/productdetail?id=$id",
        name: "拼团产品详情",
        isnav: !1
    },
    PinTuanIndex: {
        url: "/pages/fightGroups/jigsawpuzzle",
        name: "拼团列表"
    },
    SecKillList: {
        url: "/pages/purchaseLimit/purchaseLimit",
        name: "秒杀列表"
    },
    SecKillProDetail: {
        url: "/pages/purchaseLimit/productdetail",
        name: "秒杀产品详情",
        isnav: !1
    }
};

try {
    module.exports = e;
} catch (e) {}