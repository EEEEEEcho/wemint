function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

function e(a, e, t) {
    return e in a ? Object.defineProperty(a, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[e] = t, a;
}

var t = a(require("../../../store")), s = a(require("../../../utils/create")), i = require("../../../utils/qiniuImage"), n = require("../../../api/apiInstance.js"), r = getApp();

(0, s.default)(t.default, {
    properties: {},
    data: {
        navH: r.globalData.navH,
        status: r.globalData.status,
        cartPage: "评价",
        uploadImage: [],
        evaluation: "",
        detailInfo: {},
        orderUuid: "",
        imagesString: "",
        questions: [ {
            title: "1、请对安装师傅的态度评分？",
            answers: [ {
                name: "A、6分及以下（差评）",
                isCheck: !1,
                serial: "A",
                fraction: 6
            }, {
                name: "B、8分（中评）",
                isCheck: !1,
                serial: "B",
                fraction: 8
            }, {
                name: "C、10分（好评）",
                isCheck: !1,
                serial: "C",
                fraction: 10
            } ]
        }, {
            title: "2、安装师傅有无向您收取费用？",
            answers: [ {
                name: "A、6分及以下（差评）",
                isCheck: !1,
                serial: "A",
                fraction: 6
            }, {
                name: "B、10分（未收费好评）",
                isCheck: !1,
                serial: "B",
                fraction: 10
            } ]
        }, {
            title: "3、安装师傅是否按以下流程为您服务:穿戴进门鞋套-安装区域铺垫地毯-安装家具并归位-擦拭家具-整理安装垃圾并带走-请您填写反馈表并致谢？",
            answers: [ {
                name: "A、6分及以下（未按流程差评）",
                isCheck: !1,
                serial: "A",
                fraction: 6
            }, {
                name: "B、10分（符合流程好评）",
                isCheck: !1,
                serial: "B",
                fraction: 10
            } ]
        }, {
            title: "4、请问您对安装的工作效率是否满意？",
            answers: [ {
                name: "A、6分及以下（差评）",
                isCheck: !1,
                serial: "A",
                fraction: 6
            }, {
                name: "B、8分（中评）",
                isCheck: !1,
                serial: "B",
                fraction: 8
            }, {
                name: "C、10分（好评）",
                isCheck: !1,
                serial: "C",
                fraction: 10
            } ]
        } ]
    },
    onLoad: function(a) {
        this.data.orderUuid = a.orderUuid, this.initDetail();
    },
    initDetail: function() {
        var a = this, e = {
            accesstoken: this.store.data.userInfo.accesstoken,
            orderUuid: this.data.orderUuid
        };
        (0, n.getOrderDetail)(e, function(e) {
            1 === e.errcode && a.setData({
                detailInfo: e.data
            });
        });
    },
    bindInput: function(a) {
        this.setData({
            evaluation: a.detail.value
        });
    },
    chooseImage: function() {
        var a = this, e = 9 - this.data.uploadImage.length;
        wx.chooseImage({
            count: e,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                for (var t = e.tempFilePaths, s = 0; s < t.length; s++) a.data.uploadImage.push(t[s]);
                a.setData({
                    uploadImage: a.data.uploadImage
                });
            }
        });
    },
    deleteImage: function(a) {
        var e = a.currentTarget.dataset.index;
        this.data.uploadImage.splice(e, 1), this.setData({
            uploadImage: this.data.uploadImage
        });
    },
    checkedAnswer: function(a) {
        var t = a.currentTarget.dataset.questionIndex, s = a.currentTarget.dataset.answerIndex, i = "questions[" + t + "].answers";
        if (this.data.questions[t].answers[s].isCheck) this.data.questions[t].answers[s].isCheck = !1; else {
            for (var n = 0; n < this.data.questions[t].answers.length; n++) this.data.questions[t].answers[n].isCheck = !1;
            this.data.questions[t].answers[s].isCheck = !0;
        }
        this.setData(e({}, i, this.data.questions[t].answers));
    },
    uploadImages: function(a) {
        var e = this, t = {
            accesstoken: this.store.data.userInfo.accesstoken
        };
        (0, n.getImageToken)(t, function(t) {
            1 === t.errcode && (0, i.upTokenImage)(e.data.uploadImage[a], t.data.token, function(t) {
                0 == a && (e.data.imagesString = "["), a < e.data.uploadImage.length - 1 ? (e.data.imagesString = e.data.imagesString + "'" + t + "',", 
                e.uploadImages(a + 1)) : (e.data.imagesString = e.data.imagesString + "'" + t + "']", 
                e.setData({
                    imagesString: e.data.imagesString
                }), e.onFeedbackAdd());
            }, function() {});
        });
    },
    onFeedbackAdd: function() {
        var a = {
            orderUuid: this.data.orderUuid,
            accesstoken: this.store.data.userInfo.accesstoken
        };
        "" != this.data.evaluation && (a.appraiseRemark = this.data.evaluation), 0 != this.data.uploadImage.length && (a.images = this.data.imagesString);
        for (var e = 0, t = 0; t < this.data.questions.length; t++) for (var s = 0; s < this.data.questions[t].answers.length; s++) {
            var i = this.data.questions[t].answers[s];
            if (i.isCheck) {
                switch (e += i.fraction, t) {
                  case 0:
                    a.attitude = i.serial;
                    break;

                  case 1:
                    a.cost = i.serial;
                    break;

                  case 2:
                    a.process = i.serial;
                    break;

                  case 3:
                    a.efficiency = i.serial;
                }
                break;
            }
        }
        a.totalScore = e, (0, n.getFeedbackAdd)(a, function(a) {
            if (1 === a.errcode) {
                var e = getCurrentPages(), t = e[e.length - 2];
                t.nextRefresh(), "订单详情" == t.data.cartPage && e[e.length - 3].nextRefresh(), wx.showToast({
                    title: "感谢您的评价",
                    icon: "none",
                    duration: 3e3
                }), wx.navigateBack({
                    delta: 1
                });
            }
        });
    },
    submitData: function() {
        "" != this.data.evaluation ? 0 == this.data.uploadImage.length ? this.onFeedbackAdd() : (this.setData({
            imagesString: ""
        }), this.uploadImages(0)) : wx.showToast({
            title: "请您写点评论吧",
            icon: "none",
            duration: 3e3
        });
    }
});