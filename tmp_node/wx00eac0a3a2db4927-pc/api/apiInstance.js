function t(t, n) {
    if (200 == t.statusCode) if (1 == t.data.errcode) if (t.data.hasOwnProperty("flushAccessToken")) if ("" == t.data.flushAccessToken) n(t.data); else {
        var i = u.getUser();
        null != i && "" != i && (i.accesstoken = t.data.flushAccessToken, u.setUser(i)), 
        n(t.data);
    } else n(t.data); else n(t.data), null == t.data.errmsg ? wx.showToast({
        title: "网络请求失败，请稍后重试",
        icon: "none",
        duration: 3e3
    }) : wx.showToast({
        title: t.data.errmsg,
        icon: "none",
        duration: 3e3
    }), 20006 == t.data.errcode && (u.clear(), o.default.data.isLogin = !1, o.default.data.userInfo = {
        avatar: "http://oss.shangmian.xin/weixin_applets_login_default_avatar.png",
        nickname: "未登录"
    }, wx.navigateTo({
        url: "/pages/login/loginFast/loginFast"
    })); else n(t.data), wx.showToast({
        title: "网络请求失败，请稍后重试",
        icon: "none",
        duration: 3e3
    });
}

function n(t, n) {
    wx.showToast({
        title: "网络请求失败，请稍后重试",
        icon: "none",
        duration: 3e3
    }), t.errcode = 0, n(t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getAnalyticsData = function(o, u) {
    i.post(e.DATA_ANALYTICS_MA_EVENTID_QUERY, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getValidateCode = function(o, u) {
    i.post(e.VERIFY_SMS_CODE, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.login = function(o, u) {
    i.post(e.UPMS_USER_AUTH_VERCODE_LOGIN, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.updateUserInfo = function(o, u) {
    i.post(e.UPMS_USER_UPGRADE_UPDATE, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.wechatLogin = function(o, u) {
    i.post(e.UMPS_USER_AUTH_TPLOGIN, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.selectAllAddress = function(o, u) {
    i.post(e.UMPS_ADDRESS_QUERY, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.addNewAddress = function(o, u) {
    i.post(e.UMPS_ADDRESS_ADD, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.editAddress = function(o, u) {
    i.post(e.UMPS_ADDRESS_UPDATE, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.deleteAddress = function(o, u) {
    i.post(e.UMPS_ADDRESS_DELETE, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.searchKeywordQuery = function(o, u) {
    i.post(e.OPERATIONS_SEARCH_KEYWORD_RECOMMEND, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.searchFootprintQuery = function(o, u) {
    i.post(e.UPMS_FOOTPRINT_QUERY, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.searchCollectionQuery = function(o, u) {
    i.post(e.UPMS_COLLECTION_QUERY, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getWishQuery = function(o, u) {
    i.post(e.UMPS_WISH_QUERY, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getWishSimpleQuery = function(o, u) {
    i.post(e.UMPS_WISH_SIMPLE_QUERY, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.addWish = function(o, u) {
    i.post(e.UMPS_WISH_ADD, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getWishListQuery = function(o, u) {
    i.post(e.UMPS_WISH_LIST_QUERY, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.updateWishTitle = function(o, u) {
    i.post(e.UMPS_WISH_UPDATE, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.deleteWish = function(o, u) {
    i.post(e.UMPS_WISH_DELETE, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getWishOptionalQuery = function(o, u) {
    i.post(e.UMPS_WISH_GOODS_OPTIONAL_QUERY, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.addWishGoods = function(o, u) {
    i.post(e.UMPS_WISH_LIST_ADD, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.deleteWishGoods = function(o, u) {
    i.post(e.UMPS_WISH_LIST_DELETE, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getUserQrCode = function(o, u) {
    i.post(e.VERTIFY_USER_QRCODE, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getUserDisInfo = function(o, u) {
    i.post(e.UPMS_USER_DIS_INFO, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getBindingUserInfo = function(o, u) {
    i.post(e.UPMS_USER_BINDING_CURRENT_INFO, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getWalletLogInfo = function(o, u) {
    i.post(e.UPMS_WALLET_LOG_QUERY, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getUserDisCashOut = function(o, u) {
    i.post(e.UPMS_USER_DIS_CASH_OUT, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getUserDisExtendOrder = function(o, u) {
    i.post(e.UPMS_USER_DIS_EXTEND_ORDER, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.subFeedback = function(o, u) {
    i.post(e.FEEDBACK_ADD, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getGoodQuery = function(o, u) {
    i.post(e.MA_GOODS_QUERY_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getCategoryQuery = function(o, u) {
    i.post(e.FORE_CATEGORY_QUERY_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getUiDataQuery = function(o, u) {
    i.post(e.OPERATIONS_APP_UI_DATA_QUERY_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getSpaceQuery = function(o, u) {
    i.post(e.FORE_SPACE_QUERY_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getStyleQuery = function(o, u) {
    i.post(e.FORE_STYLE_QUERY_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getGoodsInfo = function(o, u) {
    i.post(e.GOODS_INFO_APP_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getShopSend = function(o, u) {
    i.post(e.ORDER_GOODS_URGE_SHOP_SEND_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getOrderQuery = function(o, u) {
    i.post(e.ORDER_QUERY_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getUserReceive = function(o, u) {
    i.post(e.ORDER_GOODS_CONFIRM_USER_RECEIVE_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getCancelUser = function(o, u) {
    i.post(e.ORDER_CANCEL_USER_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getOrderDelete = function(o, u) {
    i.post(e.ORDER_DELETE_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getOrderPay = function(o, u) {
    i.post(e.ORDER_PAY_PAY_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getScenesQuery = function(o, u) {
    i.post(e.FORE_STYLE_SCENES_QUERY_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getSpacesQuery = function(o, u) {
    i.post(e.FORE_SPACE_SCENES_QUERY_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getStyleLike = function(o, u) {
    i.post(e.FORE_STYLE_SCENES_LIKE_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getSpaceLike = function(o, u) {
    i.post(e.FORE_SPACE_SCENES_LIKE_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getOrderDetail = function(o, u) {
    i.post(e.ORDER_DETAIL_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getCommentQuery = function(o, u) {
    i.post(e.COMMENT_QUERY_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getAppQuery = function(o, u) {
    i.post(e.STORE_APP_QUERY_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getRecommendQuery = function(o, u) {
    i.post(e.MA_GOODS_CATEGORY_RECOMMEND_QUERY_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getOrderLogistics = function(o, u) {
    i.post(e.ORDER_LOGISTICS_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getPayRefund = function(o, u) {
    i.post(e.ORDER_PAY_REFUND_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getCancelRefund = function(o, u) {
    i.post(e.ORDER_PAY_CANCEL_REFUND_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getShoppingCartAdd = function(o, u) {
    i.post(e.SHOPPINGCART_ADD_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getGoodsCollection = function(o, u) {
    i.post(e.SNS_GOODS_COLLECTION_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getGoodsUnCollection = function(o, u) {
    i.post(e.SNS_GOODS_UNCOLLECTION_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getAddressDefault = function(o, u) {
    i.post(e.UPMS_ADDRESS_DEFAULT_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getOrderCalculate = function(o, u) {
    i.post(e.ORDER_CALCULATE_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getOrderAdd = function(o, u) {
    i.post(e.ORDER_ADD_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getUseCouponCard = function(o, u) {
    i.post(e.ORDER_VOUCHER_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getShoppingCartQuery = function(o, u) {
    i.post(e.SHOPPINGCART_QUERY_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getShoppingCartUpdate = function(o, u) {
    i.post(e.SHOPPING_CART_UPDATE_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getShoppingCartDelete = function(o, u) {
    i.post(e.SHOPPINGCART_DELETE_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getShopInfo = function(o, u) {
    i.post(e.SHOP_INFO_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getImageToken = function(o, u) {
    i.post(e.VERIFY_RESOURCES_IMAGE_TOKEN_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getMaQrCode = function(o, u) {
    i.post(e.VERIFY_WX_MA_QRCODE_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getCouponUser = function(o, u) {
    i.post(e.COUPON_USER_QUERY_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getCardUser = function(o, u) {
    i.post(e.CARD_USER_QUERY_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getCouponInfo = function(o, u) {
    i.post(e.VOUCHER_COUPON_INFO_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getCardInfo = function(o, u) {
    i.post(e.VOUCHER_CARD_INFO_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getFeedbackAdd = function(o, u) {
    i.post(e.INSTALL_FEEDBACK_ADD_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getGoodsConditions = function(o, u) {
    i.post(e.MA_GOODS_CONDITIONS_QUERY_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getUserBinding = function(o, u) {
    i.post(e.USER_BINDING_BIND_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getDistributionCategory = function(o, u) {
    i.post(e.GOODS_CATEGORY_QUERY_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getDistributionGoods = function(o, u) {
    i.post(e.DISTRIBUTION_GOODS_QUERY_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getConditionsStyle = function(o, u) {
    i.post(e.GOODS_CONDITIONS_STYLE_QUERY_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getWishInfo = function(o, u) {
    i.post(e.UPMS_WISH_INFO_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getWishAddAll = function(o, u) {
    i.post(e.UPMS_WISH_LIST_ADD_ALL_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getFreeGoodList = function(o, u) {
    i.post(e.GOODS_QUERY_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getActivityQuery = function(o, u) {
    i.post(e.RECOMMEND_ACTIVITY_QUERY_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getGoodsDetail = function(o, u) {
    i.post(e.EXEMPT_GOODS_DETAIL_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getExemptionQuery = function(o, u) {
    i.post(e.SNS_RULE_EXEMPTION_QUERY_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getExemptionList = function(o, u) {
    i.post(e.SNS_EXEMPTION_QUERY, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getDistributionInfoQuery = function(o, u) {
    i.post(e.DISTRIBUTION_INFO_QUERY, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getUserDisBinging = function(o, u) {
    i.post(e.UMPS_USER_DIS_BINDING, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getExemptAdd = function(o, u) {
    i.post(e.ORDER_EXEMPT_ADD_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getExemptShare = function(o, u) {
    i.post(e.ORDER_EXEMPT_SHARE_UPDATE_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getAdPlan = function(o, u) {
    i.post(e.AD_PLAN_ADVERTISEMENT_QUERY_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getMarketingActivityInfo = function(o, u) {
    i.post(e.MARKETING_ACTIVITY_INFO, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getMarketingBuildingQuery = function(o, u) {
    i.post(e.MARKETING_BUILDING_QUERY, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getMarketingBuildingInfo = function(o, u) {
    i.post(e.MARKETING_BUILDING_INFO, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getMarketingBuildingApartmentQuery = function(o, u) {
    i.post(e.MARKETING_BUILDING_APARTMENT_QUERY, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getMarketingBuildingApartmentInfo = function(o, u) {
    i.post(e.MARKETING_BUILDING_APARTMENT_INFO, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getDrawingContentQuery = function(o, u) {
    i.post(e.DRAWING_CONTENT_QUERY, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getDrawingGoodsSelectQuery = function(o, u) {
    i.post(e.DRAWING_GOODS_SELECT_QUERY, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getDrawingPackageSpaceQuery = function(o, u) {
    i.post(e.DRAWING_PACKAGE_SPACE_QUERY, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getDrawingPackageGoodsQuery = function(o, u) {
    i.post(e.DRAWING_PACKAGE_GOODS_QUERY, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getGroupInfo = function(o, u) {
    i.post(e.SNS_EXEMPTION_GROUP_INFO_URL, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.addSelectGoods = function(o, u) {
    i.post(e.MARKETING_GOODS_SELECT_ADD, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.deleteSelectGoods = function(o, u) {
    i.post(e.MARKETING_GOODS_SELECT_DELETE, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.getDistributionUserQuery = function(o, u) {
    i.post(e.DISTRIBUTION_USER_QUERY, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.addDistributionUser = function(o, u) {
    i.post(e.DISTRIBUTION_USER_ADD, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.updateDistributionUser = function(o, u) {
    i.post(e.DISTRIBUTION_USER_UPDATE, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
}, exports.deleteDistributionUser = function(o, u) {
    i.post(e.DISTRIBUTION_USER_DELETE, o, function(n) {
        t(n, u);
    }, function(t) {
        n(t, u);
    });
};

var o = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../store")), i = require("./request.js"), e = require("../utils/apiUrl.js"), u = require("../utils/storage.js");