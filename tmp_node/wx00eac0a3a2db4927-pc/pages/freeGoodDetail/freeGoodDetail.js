function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, o) {
    return t in e ? Object.defineProperty(e, t, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = o, e;
}

var o = e(require("../../store")), a = e(require("../../utils/create")), s = require("../../api/apiInstance.js"), n = require("../../utils/distribution"), i = getApp();

(0, a.default)(o.default, {
    properties: {
        cartPage: String
    },
    data: {
        isShowContact: !1,
        isShowBack: !0,
        current: 0,
        scrollLeft: 0,
        isShowSkus: !1,
        isShowGenerate: !1,
        cartPage: "商品详情",
        navH: i.globalData.navH,
        status: i.globalData.status,
        isIphoneX: i.globalData.isIphoneX,
        goodsInfo: {},
        notesData: [],
        parameter: [],
        comment: {},
        goodsUuid: "",
        qrCodeKey: "",
        isShowUserInfo: !1,
        isShareGroup: !1,
        sceneData: "",
        isShareJump: !1,
        isShowLoad: !1,
        wishMenu: [],
        exemptionRule: "",
        groupUuid: "",
        shareGroupUuid: "",
        ruleList: [ "在线逛店", "到店体验", "分享拼团", "开奖免单" ],
        serviceNotes: [ {
            number: 1,
            title: "绿色环保",
            content: "委托国家权威机构对商场/商户内经营商品进行抽检，确保商品符合国家环保质量标准。售出商品如有不符合国家法律规定的环保标准的，可至购买商场/商户进行无条件退换货。"
        }, {
            number: 2,
            title: "同城比价 三倍退差",
            content: "切实履行保价机制，定期进行同城比价调研，同时承诺顾客自交付定金7天内，发现同样商品在同城、同类型商场、同等交易条件下的实际成交价格更低，并能提供有效凭据原件，按照差价的三倍给与奖励。（样品、特价品、特殊制定法商品、进口商品除外）"
        }, {
            number: 3,
            title: "30天无理由退货",
            content: "顾客购买商品后，自支付定金之日起30天内，如购买意愿发生变更，在不影响商品二次销售的情况下，可持有有效凭证至门店退货，无需给出退货理由。（样品、特价品、特殊定制品、进口商品除外，货物的安装、往返运输和重新包装费用由顾客承担。）"
        }, {
            number: 4,
            title: "按时送货",
            content: "顾客购买商品后，商户提供准时送货、专业安装的舒心服务。若送货、安装发生延迟，每延迟一天，顾客可获得逾期商品总价款金额3%的违约金，若送货、安装延迟超过30天，顾客有权接触相关购买协议。"
        }, {
            number: 5,
            title: "专业导购",
            content: "门店导购拥有丰富的家居美学专业知识，可根据顾客的需要提供全方位的导购服务。"
        }, {
            number: 6,
            title: "无忧质保",
            content: "各门店向顾客提供真实的商品信息，不误导、不欺诈，并对因商品质量问题而产生的异议或投诉承担法律法规规定的责任。"
        }, {
            number: 7,
            title: "客户回访承诺",
            content: "对消费者进行不定期回访，听取相关建议和意见，最大限度地为消费者提供满周到的服务。"
        }, {
            number: 8,
            title: "定金退还承诺",
            content: "消费者可在购物三天时间内无理由退货或返还定金。"
        }, {
            number: 9,
            title: "7天无忧退货",
            content: "从下单日开始往后计算7天内，客户可无理由退货。理由可包括：“不喜欢了”、“不想要了”。\n无理由退货含以下两种情形：\n一、已下定金，尚未配送及安装：尚免平台不收取任何费用，全额退款。\n二、已下定金，已配送及安装：尚免平台按定单金额的15%收取退货包装费、短途运费及长\n途物流费。\n注：客户要保证退货商品的完好无损，对超出查验和试用需要而试用过的商品并导致商品产\n生明显的价值贬损，视为商品不完好。尚免平台可拒绝客户退货要求。\n\n退货、退款流程：\n1、定金退款流程：在尚免小程序选择“我的订单”——“退货申请”——客服收到申请3个工作日内与客户联系并沟通详细情况——财务打款并确认流程完成（收到货后7个工作日内完成退货、退款流程）\n\n2、全款退款、退货流程：在尚免小程序选择“我的订单”——“退货申请”——客服收到申请3个工作日内与客户联系并沟通详细情况——7个工作日内线下到客户家检查货品并确认是否可退货——商品入库——财务打款并确认流程完成。"
        }, {
            number: 10,
            title: "90天价保服务",
            content: "从下单之日往后计算90天内，客户所购商品出现降价的情况，客户可联系尚免平台客服并返还价差。\n注：商品参加活动出现的优惠不在价保范围内。\n含赠品或优惠的商品在申请价保时需是扣除赠品或优惠后的实际购买价格。\n尚免平台实行线上、线下实价销售。尚免线上平台及线下店的标价均可作为客户价保的\n凭据。\n\n价保退差流程：客户在尚免小程序选择“我的”——“平台客服”申诉——客服收到申请3个工作日内与客户联系并沟通详细情况——客服整理凭证并在后台提交——财务打款并确认流程完成（收到货后7个工作日内完成退差流程）。"
        }, {
            number: 11,
            title: "180天无忧包换",
            content: "从下单日开始往后计算180天内，由于商品任何非人为品质问题，客户可无理由包换。\n无理由包换流程：在尚免小程序选择“我的”——“平台客服”申诉——客服收到申请3个工作日内与客户联系并沟通详细情况——7个工作日内线下到客户家检查货品并确认是否包换或维修——确认后45天内完成包换流程。"
        }, {
            number: 12,
            title: "三年保修终身维护",
            content: "从下单之日往后计算3年内，客户所购商品出现人为或非人为的损坏。在可修范围内，尚免平台极力修补，所有修补费用由尚免平台承担。超过三年的商品，尚免平台提供终身付费维护服务。\n3年保修 终身维护流程：在尚免小程序选择“我的”——“平台客服”——提交维修原因——客服收到申请3个工作日内与客户联系并沟通详细情况——7天内完成维修流程。"
        }, {
            number: 13,
            title: "延期发货保障",
            content: "从下单之日往后45天后，超过一天按实付金额千分之三给予补偿，以此类推。赔偿金额不超过商品货值40%\n延期发货保障流程：客户下单后3个工作日内尚免平台客服与客户沟通商品情况——客户收货——确认定单后超过45天的客户可申请补偿——“我的”——“平台客服”——提交补偿情况——客服收到申请3个工作日内与客户联系并沟通详细情况提交凭据——7天内完成补偿流程。"
        } ]
    },
    onLoad: function(e) {
        var t = this;
        void 0 !== e.shareGroupUuid && this.setData({
            shareGroupUuid: e.shareGroupUuid,
            isShareGroup: !0
        }), (0, n.initScene)(this, e, !0, "goodsUuid", function() {
            (0, n.initQrCode)(t, "pages/freeGoodDetail/freeGoodDetail", "goodsUuid", t.data.goodsUuid), 
            t.getGoodInfo(t.data.goodsUuid), t.getCommentQuery(t.data.goodsUuid);
        }, function() {
            (0, n.initQrCode)(t, "pages/freeGoodDetail/freeGoodDetail", "goodsUuid", t.data.goodsUuid), 
            t.getGoodInfo(t.data.goodsUuid), t.getCommentQuery(t.data.goodsUuid);
        }, function(e) {
            t.setData({
                sceneData: e,
                isShowUserInfo: !0
            });
        }), this.getExemptionQuery();
    },
    onShareAppMessage: function(e) {
        if ("" != this.data.goodsUuid && "{}" != JSON.stringify(this.data.goodsInfo)) return (0, 
        n.onSharePage)(this, "/pages/freeGoodDetail/freeGoodDetail", "goodsUuid", this.data.goodsUuid, {
            title: this.data.goodsInfo.shopName,
            desc: this.data.goodsInfo.title,
            imageUrl: this.data.goodsInfo.covers[0]
        });
    },
    onQrCodeKey: function(e) {
        this.setData({
            qrCodeKey: e.detail
        });
    },
    imgOnLoad: function() {
        this.setData({
            isShowBack: !1
        });
    },
    getExemptionQuery: function() {
        var e = this, t = {
            accesstoken: ""
        };
        (0, s.getExemptionQuery)(t, function(t) {
            if (1 === t.errcode) {
                var o = JSON.stringify(t.data);
                o = (o = (o = (o = (o = (o = o.replace(/(\n)/g, "")).replace(/(\t)/g, "")).replace(/(\r)/g, "")).replace(/<\/?[^>]*>/g, "")).replace(/\s*/g, "")).replace(/&nbsp;/gi, ""), 
                e.setData({
                    exemptionRule: o.slice(0, 80)
                });
            }
        });
    },
    getGoodInfo: function(e) {
        var t = this;
        this.setData({
            isShowLoad: !0
        });
        var o = {
            goodsUuid: e
        };
        this.store.data.isLogin && (o.accesstoken = this.store.data.userInfo.accesstoken), 
        (0, s.getGoodsDetail)(o, function(e) {
            if (1 === e.errcode) {
                for (var o = [], a = [], s = e.data.parameter.length > 3 ? 3 : e.data.parameter.length, n = 0; n < e.data.serviceNotes.length; n++) o.push(t.data.serviceNotes[parseInt(e.data.serviceNotes[n]) - 1]);
                for (n = 0; n < s; n++) a.push(e.data.parameter[n]);
                var i = e.data.detail;
                e.data.detail = i.replace(/\<img/gi, '<img class="richImg" '), t.setData({
                    goodsInfo: e.data,
                    notesData: o,
                    parameter: a
                });
            }
            t.setData({
                isShowLoad: !1
            });
        });
    },
    getCommentQuery: function(e) {
        var t = this, o = {
            type: 2,
            goodsUuid: e
        };
        (0, s.getCommentQuery)(o, function(e) {
            1 === e.errcode && e.data.length > 0 && t.setData({
                comment: e.data[0]
            });
        });
    },
    refreshGroup: function() {
        this.selectComponent("#freeGroup").onRefreshGroup(), this.selectComponent("#shareGroup").onRefreshGroup();
    },
    onBuy: function() {
        this.setData({
            isShowSkus: !0,
            groupUuid: ""
        });
    },
    onJoinFree: function(e) {
        this.setData({
            isShowSkus: !0,
            groupUuid: e.detail
        });
    },
    previewImg: function(e) {
        var t = e.currentTarget.dataset.current;
        wx.previewImage({
            current: this.data.goodsInfo.covers[t],
            urls: this.data.goodsInfo.covers,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    toShare: function() {
        this.store.data.isLogin ? this.setData({
            isShowGenerate: !0
        }) : wx.navigateTo({
            url: "/pages/login/loginFast/loginFast"
        });
    },
    toPage: function(e) {
        var t = e.currentTarget.dataset.type, o = e.currentTarget.dataset.shopuuid, a = "";
        switch (t) {
          case "保障":
            a = "/pages/goodDetail/ensure/ensure?notesData=" + JSON.stringify(this.data.notesData);
            break;

          case "评价":
            a = "/pages/goodDetail/comment/comment?goodsUuid=" + this.data.goodsUuid;
            break;

          case "相关参数":
            a = "/pages/goodDetail/goodParam/goodParam?parameter=" + JSON.stringify(this.data.goodsInfo.parameter);
            break;

          case "免单规则":
            a = "/pages/freeGoodDetail/freeRule/freeRule?goodsUuid=" + this.data.goodsUuid;
            break;

          case "进店":
            a = "/pages/shop/shop?shopUuid=" + o;
        }
        wx.navigateTo({
            url: a
        });
    },
    addCollection: function() {
        var e = this;
        if (this.store.data.isLogin) {
            var o = {
                accesstoken: this.store.data.userInfo.accesstoken,
                goodsUuid: this.data.goodsUuid
            };
            1 == this.data.goodsInfo.isCollection ? (0, s.getGoodsUnCollection)(o, function(o) {
                if (1 === o.errcode) {
                    var a;
                    wx.showToast({
                        title: "取消收藏",
                        icon: "none",
                        duration: 3e3
                    }), e.setData((a = {}, t(a, "goodsInfo.isCollection", 0), t(a, "showCoverScreenOptions", !1), 
                    a)), setTimeout(function() {
                        e.setData({
                            showCoverScreen: !1
                        });
                    }, 220);
                }
            }) : (0, s.getGoodsCollection)(o, function(a) {
                if (1 === a.errcode) {
                    var n;
                    wx.showToast({
                        title: "收藏成功",
                        icon: "none",
                        duration: 3e3
                    });
                    var i = {
                        accesstoken: o.accesstoken,
                        pageSize: 100,
                        pageNum: 1,
                        sort: "",
                        userUuid: e.store.data.userInfo.userUuid
                    };
                    (0, s.getWishSimpleQuery)(i, function(t) {
                        1 == t.errcode && e.setData({
                            wishMenu: t.data
                        });
                    }), e.setData((n = {}, t(n, "goodsInfo.isCollection", 1), t(n, "showCoverScreenOptions", !0), 
                    t(n, "showCoverScreen", !0), n));
                }
            });
        } else wx.navigateTo({
            url: "/pages/login/loginFast/loginFast"
        });
    },
    onPageScroll: function(e) {
        e.scrollTop > 20 && this.setData({
            isShowContact: !0
        });
    },
    onHide: function() {
        this.setData({
            isShowContact: !1
        }), clearTimeout();
    },
    closeCoverScreen: function() {
        var e = this;
        this.setData({
            showCoverScreenOptions: !1
        }), setTimeout(function() {
            e.setData({
                showCoverScreen: !1
            });
        }, 220);
    },
    onUnload: function() {
        clearTimeout();
    },
    addToWishDetail: function(e) {
        var t = this, o = [];
        o.push(this.data.goodsInfo.goodsUuid);
        var a = {
            accesstoken: this.store.data.userInfo.accesstoken,
            wishUuid: e.currentTarget.dataset.wishuuid,
            goodsUuids: JSON.stringify(o)
        };
        (0, s.addWishGoods)(a, function(e) {
            1 == e.errcode && (wx.showToast({
                title: "成功添加到心愿单",
                icon: "none",
                duration: 2e3
            }), t.setData({
                showCoverScreenOptions: !1
            }), setTimeout(function() {
                t.setData({
                    showCoverScreen: !1
                });
            }, 220));
        });
    }
});