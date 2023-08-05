function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, a) {
            function n(r, i) {
                try {
                    var o = t[r](i), u = o.value;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return void a(e);
                }
                if (!o.done) return Promise.resolve(u).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(u);
            }
            return n("next");
        });
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = e(require("./request")), n = e(require("./runtime")), r = e(require("../config")), i = {
    upload: function(e) {
        return {
            path: "elab-marketing-system/behavior/miniOrWeb/upload",
            data: e,
            method: "POST"
        };
    },
    login: function(e) {
        return {
            path: "elab-marketing-user/login/xcxLogin",
            data: e,
            method: "POST"
        };
    },
    sign: function(e) {
        return {
            path: "elab-marketing-user/share/sign",
            data: e,
            method: "POST"
        };
    },
    signature: function(e) {
        return {
            path: "elab-marketing-user/tencent/signature",
            data: e,
            method: "POST"
        };
    },
    decrypt: function(e) {
        return {
            path: "elab-marketing-user/share/decrypt",
            data: {
                shareSign: e.shareSign
            },
            method: "POST"
        };
    },
    detail: function(e) {
        return {
            path: "elab-marketing-user/mimiapp/parameter/detail",
            data: {
                houseId: e.houseId
            },
            method: "POST"
        };
    },
    queryXcxPage: function(e) {
        return {
            path: "elab-marketing-content/house/frame/queryXcxPage",
            data: e,
            method: "POST"
        };
    },
    queryOnline: function(e) {
        return {
            path: "elab-marketing-content/block/queryOnline",
            data: e,
            method: "POST"
        };
    },
    imAdviserList: function(e) {
        return {
            path: "elab-marketing-user/adviser/online/im/list",
            data: e,
            method: "POST"
        };
    },
    getIpAddr: function() {
        return {
            path: "elab-marketing-user/ipAddr/getIpAddr",
            method: "POST"
        };
    },
    leavePhone: function(e) {
        return {
            path: "elab-marketing-user/invitation/leavePhone",
            data: e,
            method: "POST"
        };
    },
    queryMomentCurrent: function(e) {
        return {
            path: "elab-marketing-content/moment/queryMomentCurrent",
            data: e,
            method: "POST"
        };
    },
    modifyMomentView: function(e) {
        return {
            path: "elab-marketing-content/module/modifyMomentView",
            data: e,
            method: "POST"
        };
    },
    getTDHouseList: function(e) {
        return {
            path: "elab-marketing-user/layoutVr/house",
            data: e,
            method: "POST"
        };
    },
    queryPositionHome: function(e) {
        return {
            path: "elab-marketing-content/module/queryPositionHome",
            data: e,
            method: "POST"
        };
    },
    queryModuleShowable: function(e) {
        return {
            path: "elab-marketing-content/module/queryModuleShowable",
            data: e,
            method: "POST"
        };
    },
    authorizedMobile: function(e) {
        return {
            path: "elab-marketing-user/invitation/authorizedMobile",
            data: e,
            method: "POST"
        };
    },
    querySendCode: function(e) {
        return {
            path: "elab-marketing-user/vcode/verifyCodeForLeavePhone/send",
            data: e,
            method: "POST"
        };
    },
    updateLike: function(e) {
        return {
            path: "elab-marketing-content/atlas/updateLike",
            data: e,
            method: "POST"
        };
    },
    imagesListGroup: function(e) {
        return {
            path: "elab-marketing-content/atlas/listGroup",
            data: e,
            method: "POST"
        };
    },
    listBuilding: function(e) {
        return {
            path: "elab-marketing-content/layout/listBuilding",
            data: e,
            method: "POST"
        };
    },
    pageListLayoutByBuilding: function(e) {
        return {
            path: "elab-marketing-content/layout/pageListLayoutByBuilding",
            data: e,
            method: "POST"
        };
    },
    successfulList: function(e) {
        return {
            path: "elab-marketing-user/invitation/successfulList",
            data: e,
            method: "POST"
        };
    },
    noticeList: function(e) {
        return {
            path: "elab-marketing-notify/customer/pageList",
            data: e,
            method: "POST"
        };
    },
    createImages: function(e) {
        return {
            path: "elab-marketing-user/image/create",
            data: e,
            method: "POST"
        };
    },
    queryMomentCurrentList: function(e) {
        return {
            path: "elab-marketing-content/moment/queryMomentCurrentList",
            data: e,
            method: "POST"
        };
    },
    queryWeather: function(e) {
        return {
            path: "elab-marketing-content/module/queryWeather",
            data: e,
            method: "POST"
        };
    },
    getCityInfo: function(e) {
        return {
            path: "elab-marketing-user/house/detail",
            data: e,
            method: "POST"
        };
    },
    getCallLog: function(e) {
        return {
            path: "elab-marketing-user/adviser/video/callLog",
            data: e,
            method: "POST"
        };
    },
    queryImChatRecord: function(e) {
        return {
            path: "elab-marketing-user/adviser/text/queryImChatRecord",
            data: e,
            method: "POST"
        };
    },
    validateCode: function(e) {
        return {
            path: "elab-marketing-user/vcode/login/validate",
            data: e,
            method: "POST"
        };
    },
    validate: function(e) {
        return {
            path: "elab-marketing-user/vcode/verifyCode/validate",
            data: e,
            method: "POST"
        };
    },
    customerSign: function(e) {
        return {
            path: "elab-marketing-user/customer/source/sign",
            data: e,
            method: "POST"
        };
    },
    customerVisit: function(e) {
        return {
            path: "elab-marketing-user/customer/addEcrmUser",
            data: e,
            method: "POST"
        };
    },
    selectHouseLeadWork: function(e) {
        return {
            path: "elab-marketing-user/house/house/selectHouseLeadWork",
            data: e,
            method: "POST"
        };
    },
    pushIMInfo: function(e) {
        return {
            path: "elab-marketing-notify/message/push",
            data: e,
            method: "POST"
        };
    },
    getCustomerDetail: function(e) {
        return {
            path: "elab-marketing-user/adviser/text/getCustomerDetail",
            data: e,
            method: "POST"
        };
    },
    chatSms: function(e) {
        return {
            path: "elab-marketing-user/vcode/send/chatSms",
            data: e,
            method: "POST"
        };
    },
    connect: function(e) {
        return {
            path: "elab-marketing-user/adviser/text/connect",
            data: e,
            method: "POST"
        };
    },
    selfInfo: function(e) {
        return {
            path: "elab-marketing-user/worker/account/selfInfo",
            data: e,
            method: "POST"
        };
    },
    bindImAdviser: function(e) {
        return {
            path: "elab-marketing-user/invitation/bindImAdviser",
            data: e,
            method: "POST"
        };
    },
    adviserInfo: function(e) {
        return {
            path: "elab-marketing-user/worker/account/adviserInfo",
            data: e,
            method: "POST"
        };
    },
    randomAdviser: function(e) {
        return {
            path: "elab-marketing-user/adviser/random/videoAdviser",
            data: e,
            method: "POST"
        };
    },
    dialVideo: function(e) {
        return {
            path: "elab-marketing-user/adviser/dialVideo",
            data: e,
            method: "POST"
        };
    },
    submitEvaluate: function(e) {
        return {
            path: "elab-marketing-user/feedback/insertFeedback",
            data: e,
            method: "POST"
        };
    },
    submitEvaluate2: function(e) {
        return {
            path: "elab-marketing-user/evalute/adviser/insert",
            data: e,
            method: "POST"
        };
    },
    switchStatus: function(e) {
        return {
            path: "elab-marketing-user/worker/adviser/switchStatus",
            data: e,
            method: "POST"
        };
    },
    insertData: function(e) {
        return {
            path: "elab-marketing-system/imlog/insert",
            data: e,
            method: "POST"
        };
    },
    modifyUserInfo: function(e) {
        return {
            path: "elab-marketing-user/customer/modify",
            data: e,
            method: "POST"
        };
    },
    insertFormId: function(e) {
        return {
            path: "elab-marketing-user/customer/insertFormId",
            data: e,
            method: "POST"
        };
    },
    reportToProject: function(e) {
        return {
            path: "elab-marketing-user/invitation/recordToProject",
            data: e,
            method: "POST"
        };
    },
    createBusinessCard: function(e) {
        return {
            path: "elab-marketing-user/image/createBusinessCard",
            data: e,
            method: "POST"
        };
    },
    getAutoRepeatList: function(e) {
        return {
            path: "elab-marketing-user/cQuestion/selectQuestionAndAnswer",
            data: e,
            method: "POST"
        };
    },
    scHouseAndBuilding4back: function(e) {
        return {
            path: "elab-wuxi-project/scHouse/scHouseAndBuilding4back",
            data: e,
            method: "POST"
        };
    },
    scRoomDetailById: function(e) {
        return {
            path: "elab-wuxi-project/scRoom/detailById",
            data: e,
            method: "POST"
        };
    },
    queryPositionPhone: function(e) {
        return {
            path: "elab-marketing-user/position/queryPositionPhone",
            data: e,
            method: "POST"
        };
    },
    tempLockRoom: function(e) {
        return {
            path: "elab-wuxi-project/scRoom/tempLockRoom",
            data: e,
            method: "POST"
        };
    },
    listBySCBuildingId: function(e) {
        return {
            path: "elab-wuxi-project/scFloor/listBySCBuildingId",
            data: e,
            method: "POST"
        };
    },
    queryEnumList: function(e) {
        return {
            path: "elab-marketing-user/enum/queryEnumList",
            data: e,
            method: "POST"
        };
    },
    isAdviserInRoom: function(e) {
        return {
            path: "elab-marketing-user/app/websocket/selectStatusData",
            data: e,
            method: "POST"
        };
    },
    getPdInfo: function(e) {
        return {
            path: "elab-marketing-user/adviser/dispatchAdviser",
            data: e,
            method: "POST"
        };
    },
    updateDispatchStatus: function(e) {
        return {
            path: "elab-marketing-user/adviser/updateDispatchStatus",
            data: e,
            method: "POST"
        };
    },
    insertOrUpdate: function(e) {
        return {
            path: "elab-marketing-user/pushMessageAdviser/insertOrUpdate",
            data: e,
            method: "POST"
        };
    },
    adviserResponseTime: function(e) {
        return {
            path: "elab-marketing-user/adviser/adviserResponseTime",
            data: e,
            method: "POST"
        };
    },
    createXcxQrCode: function(e) {
        return {
            path: "elab-marketing-user/image/createXcxQrCode",
            data: e,
            method: "POST"
        };
    },
    queryViewCustomer: function(e) {
        return {
            path: "elab-marketing-user/invitation/queryViewCustomer",
            data: e,
            method: "POST"
        };
    },
    queryShareConfig: function(e) {
        return {
            path: "elab-marketing-user/mimiapp/parameter/queryShareConfig",
            data: e,
            method: "POST"
        };
    },
    queryActivity: function(e) {
        return {
            path: "elab-marketing-user/activities/queryActivity",
            data: e,
            method: "POST"
        };
    },
    queryCustomerActivity: function(e) {
        return {
            path: "elab-marketing-user/activities/queryCustomerActivity",
            data: e,
            method: "POST"
        };
    },
    addActivityRecord: function(e) {
        return {
            path: "elab-marketing-user/activities/addActivityRecord",
            data: e,
            method: "POST"
        };
    },
    editActivityRecord: function(e) {
        return {
            path: "elab-marketing-user/activities/editActivityRecord",
            data: e,
            method: "POST"
        };
    },
    questionnaireSubmit: function(e) {
        return {
            path: "elab-marketing-system/daren/insert",
            data: e,
            method: "POST"
        };
    },
    nuClearList: function(e) {
        return {
            path: "elab-marketing-user/invitation/page",
            data: e,
            method: "POST"
        };
    },
    queryHouseImageList: function(e) {
        return {
            path: "elab-marketing-content/house/queryHouseImageList",
            data: e,
            method: "POST"
        };
    },
    likeImage: function(e) {
        return {
            path: "elab-marketing-content/house/likeImage",
            data: e,
            method: "POST"
        };
    },
    queryHouseImageRecommend: function(e) {
        return {
            path: "elab-marketing-content/house/queryHouseImageRecommend",
            data: e,
            method: "POST"
        };
    },
    addCityHistory: function(e) {
        return {
            path: "elab-marketing-content/cityHistory/add",
            data: e,
            method: "POST"
        };
    },
    selectCityHistory: function(e) {
        return {
            path: "elab-marketing-content/cityHistory/select",
            data: e,
            method: "POST"
        };
    },
    houseAttrInfo: function(e) {
        return {
            path: "elab-marketing-user/house/houseAttrInfo",
            data: e,
            method: "POST"
        };
    },
    recommendList: function(e) {
        return {
            path: "elab-marketing-user/customerRecord/recommendList",
            data: e,
            method: "POST"
        };
    },
    record: function(e) {
        return {
            path: "elab-marketing-user/customerRecord/record",
            data: e,
            method: "POST"
        };
    },
    recordList: function(e) {
        return {
            path: "elab-marketing-user/customerRecord/recordList",
            data: e,
            method: "POST"
        };
    },
    adviserListByManualRecord: function(e) {
        return {
            path: "elab-marketing-user/customerRecord/adviserListByManualRecord",
            data: e,
            method: "POST"
        };
    },
    manualRecord: function(e) {
        return {
            path: "elab-marketing-user/customerRecord/manualRecord",
            data: e,
            method: "POST"
        };
    },
    bindIdentity: function(e) {
        return {
            path: "elab-marketing-user/customerRecord/bindIdentity",
            data: e,
            method: "POST"
        };
    },
    noVerifiedRecommendList: function(e) {
        return {
            path: "elab-marketing-user/customerRecord/noVerifiedRecommendList",
            data: e,
            method: "POST"
        };
    },
    agentName: function(e) {
        return {
            path: "elab-marketing-user/customerRecord/agentName",
            data: e,
            method: "POST"
        };
    },
    organizeHouseInfo: function(e) {
        return {
            path: "elab-marketing-user/customerRecord/organizeHouseInfo",
            data: e,
            method: "POST"
        };
    },
    queryBindIdentityInfo: function(e) {
        return {
            path: "elab-marketing-user/customerRecord/queryBindIdentityInfo",
            data: e,
            method: "POST"
        };
    },
    entrance: function(e) {
        return {
            path: "elab-marketing-user/organize/v2.0/verification/entrance",
            data: e,
            method: "POST"
        };
    },
    verificationList: function(e) {
        return {
            path: "elab-marketing-user/organize/v2.0/verification/list",
            data: e,
            method: "POST"
        };
    },
    getAuthenticationStatus: function(e) {
        return {
            path: "elab-marketing-user/organize/v2.0/verification/getAuthenticationStatus",
            data: e,
            method: "POST"
        };
    },
    authentication: function(e) {
        return {
            path: "elab-marketing-user/organize/v2.0/verification/authentication",
            data: e,
            method: "POST"
        };
    },
    autoAuthentication: function(e) {
        return {
            path: "elab-marketing-user/organize/v2.0/verification/autoAuthentication",
            data: e,
            method: "POST"
        };
    },
    msgSecCheck: function(e) {
        return {
            path: "elab-marketing-user/wx/msgSecCheck",
            data: e,
            method: "POST"
        };
    },
    imgSecCheck: function(e) {
        return {
            path: "elab-marketing-user/wx/imgSecCheck",
            data: e,
            method: "POST"
        };
    },
    qrCodeGetStatus: function(e) {
        return {
            path: "elab-marketing-user/qrCode/getStatus",
            data: e,
            method: "POST"
        };
    },
    visitAddVisitQueue: function(e) {
        return {
            path: "elab-marketing-user/visit/addVisitQueue",
            data: e,
            method: "POST"
        };
    },
    getVideoChatCount: function(e) {
        return {
            path: "elab-marketing-content/house/video/videoHouseCount",
            data: e,
            method: "POST"
        };
    },
    addVideoChatCount: function(e) {
        return {
            path: "elab-marketing-content/house/video/addVideoHouseCount",
            data: e,
            method: "POST"
        };
    }
};

exports.default = function() {
    var e = t(n.default.mark(function e(t, o) {
        var u, d, s, m = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
        return n.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (u = getApp(), i.hasOwnProperty(t)) {
                    e.next = 4;
                    break;
                }
                return console.error("no such endpoint: " + t), e.abrupt("return", {
                    message: "不存在该接口"
                });

              case 4:
                return d = i[t].call(null, o), console.log("获取" + d.path + "请求的参数:", d.data), d.url = r.default.newUrl + d.path, 
                d.header = {
                    elabHouseId: r.default.houseId,
                    elabProjectName: r.default.projectEngName || "",
                    elabSystem: 2,
                    elabEnvironment: 3,
                    "content-type": "application/json;charset=UTF-8",
                    tonken: u && u.globalData && u.globalData.tonken ? u.globalData.tonken : ""
                }, e.next = 10, (0, a.default)(d, m);

              case 10:
                return s = e.sent, console.log("得到" + d.path + "请求的结果:", s), e.abrupt("return", s);

              case 13:
              case "end":
                return e.stop();
            }
        }, e, void 0);
    }));
    return function(t, a) {
        return e.apply(this, arguments);
    };
}();