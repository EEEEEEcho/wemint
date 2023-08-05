var e = {}, t = {
    login: function(e, t, n) {},
    syncMsgs: function(e, t) {},
    getC2CHistoryMsgs: function(e, t, n) {},
    syncGroupMsgs: function(e, t, n) {},
    sendMsg: function(e, t, n) {},
    logout: function(e, t) {},
    setAutoRead: function(e, t, n) {},
    getProfilePortrait: function(e, t, n) {},
    setProfilePortrait: function(e, t, n) {},
    applyAddFriend: function(e, t, n) {},
    getPendency: function(e, t, n) {},
    deletePendency: function(e, t, n) {},
    responseFriend: function(e, t, n) {},
    getAllFriend: function(e, t, n) {},
    deleteFriend: function(e, t, n) {},
    addBlackList: function(e, t, n) {},
    getBlackList: function(e, t, n) {},
    deleteBlackList: function(e, t, n) {},
    uploadPic: function(e, t, n) {},
    createGroup: function(e, t, n) {},
    applyJoinGroup: function(e, t, n) {},
    handleApplyJoinGroup: function(e, t, n) {},
    deleteApplyJoinGroupPendency: function(e, t, n) {},
    quitGroup: function(e, t, n) {},
    getGroupPublicInfo: function(e, t, n) {},
    getGroupInfo: function(e, t, n) {},
    modifyGroupBaseInfo: function(e, t, n) {},
    destroyGroup: function(e, t, n) {},
    getJoinedGroupListHigh: function(e, t, n) {},
    getGroupMemberInfo: function(e, t, n) {},
    addGroupMember: function(e, t, n) {},
    modifyGroupMember: function(e, t, n) {},
    forbidSendMsg: function(e, t, n) {},
    deleteGroupMember: function(e, t, n) {},
    sendCustomGroupNotify: function(e, t, n) {},
    Msg: function(e, t, n, o, i, r, s, u) {},
    MsgStore: {
        sessMap: function() {
            return {};
        },
        sessCount: function() {
            return 0;
        },
        sessByTypeId: function(e, t) {
            return {};
        },
        delSessByTypeId: function(e, t) {
            return !0;
        },
        resetCookieAndSyncFlag: function() {},
        downloadMap: {}
    }
};

!function(t) {
    var n = {
        VERSION: "1.7.0",
        APPID: "537048168"
    }, o = !0, i = {
        FORMAL: {
            COMMON: "https://webim.tim.qq.com",
            PIC: "https://pic.tim.qq.com"
        },
        TEST: {
            COMMON: "https://test.tim.qq.com",
            PIC: "https://pic.tim.qq.com"
        }
    }, r = {}, s = !1, u = {
        OPEN_IM: "openim",
        GROUP: "group_open_http_svc",
        FRIEND: "sns",
        PROFILE: "profile",
        RECENT_CONTACT: "recentcontact",
        PIC: "openpic",
        BIG_GROUP: "group_open_http_noauth_svc",
        BIG_GROUP_LONG_POLLING: "group_open_long_polling_http_noauth_svc",
        IM_OPEN_STAT: "imopenstat"
    }, a = {
        openim: "v4",
        group_open_http_svc: "v4",
        sns: "v4",
        profile: "v4",
        recentcontact: "v4",
        openpic: "v4",
        group_open_http_noauth_svc: "v1",
        group_open_long_polling_http_noauth_svc: "v1",
        imopenstat: "v4"
    }, c = {
        login: 1,
        pic_up: 3,
        apply_join_group: 9,
        create_group: 10,
        longpolling: 18,
        send_group_msg: 19,
        sendmsg: 20
    }, l = {
        C2C: "C2C",
        GROUP: "GROUP"
    }, p = {
        C2C: 1,
        GROUP: 2
    }, f = {
        C2C: 12e3,
        GROUP: 8898
    }, d = {
        OK: "OK",
        FAIL: "FAIL"
    }, g = {
        TEXT: "TIMTextElem",
        FACE: "TIMFaceElem",
        IMAGE: "TIMImageElem",
        CUSTOM: "TIMCustomElem",
        SOUND: "TIMSoundElem",
        FILE: "TIMFileElem",
        LOCATION: "TIMLocationElem",
        GROUP_TIP: "TIMGroupTipElem"
    }, m = {
        ORIGIN: 1,
        LARGE: 2,
        SMALL: 3
    }, I = {
        RAW_DATA: 0,
        BASE64_DATA: 1
    }, M = {
        BUSSINESS_ID: "10001",
        AUTH_KEY: "617574686b6579",
        SERVER_IP: "182.140.186.147"
    }, E = {
        SOUND: 2106,
        FILE: 2107
    }, _ = {
        IMAGE: 1,
        FILE: 2,
        SHORT_VIDEO: 3,
        SOUND: 4
    }, y = {
        APP_VERSION: "2.1",
        SERVER_VERSION: 1
    }, h = {
        C2C: 1,
        GROUP_COMMON: 3,
        GROUP_TIP: 4,
        GROUP_SYSTEM: 5,
        GROUP_TIP2: 6,
        FRIEND_NOTICE: 7,
        PROFILE_NOTICE: 8,
        C2C_COMMON: 9,
        C2C_EVENT: 10
    }, C = {
        COMMON: 0
    }, T = {
        READED: 92
    }, A = {
        COMMON: 0,
        LOVEMSG: 1,
        TIP: 2,
        REDPACKET: 3
    }, S = {
        REDPACKET: 1,
        COMMON: 2,
        LOVEMSG: 3
    }, G = {
        JOIN: 1,
        QUIT: 2,
        KICK: 3,
        SET_ADMIN: 4,
        CANCEL_ADMIN: 5,
        MODIFY_GROUP_INFO: 6,
        MODIFY_MEMBER_INFO: 7
    }, O = {
        FACE_URL: 1,
        NAME: 2,
        OWNER: 3,
        NOTIFICATION: 4,
        INTRODUCTION: 5
    }, F = {
        JOIN_GROUP_REQUEST: 1,
        JOIN_GROUP_ACCEPT: 2,
        JOIN_GROUP_REFUSE: 3,
        KICK: 4,
        DESTORY: 5,
        CREATE: 6,
        INVITED_JOIN_GROUP_REQUEST: 7,
        QUIT: 8,
        SET_ADMIN: 9,
        CANCEL_ADMIN: 10,
        REVOKE: 11,
        READED: 15,
        CUSTOM: 255
    }, R = {
        FRIEND_ADD: 1,
        FRIEND_DELETE: 2,
        PENDENCY_ADD: 3,
        PENDENCY_DELETE: 4,
        BLACK_LIST_ADD: 5,
        BLACK_LIST_DELETE: 6,
        PENDENCY_REPORT: 7,
        FRIEND_UPDATE: 8
    }, v = {
        PROFILE_MODIFY: 1
    }, N = {
        OK: 0,
        SIGNATURE_EXPIRATION: 11
    }, P = {
        INIT: -1,
        ON: 0,
        RECONNECT: 1,
        OFF: 9999
    }, b = {
        GROUP_MSG: 1,
        C2C_MSG: 2,
        USER_HEAD: 3,
        GROUP_HEAD: 4
    }, L = {
        ING: 14,
        STOP: 15
    }, U = P.INIT, D = !1, k = 0, w = 6e4, q = null, x = 0, B = 0, K = 0, z = null, V = null, J = 0, H = [], Y = null, X = null, j = {
        sdkAppID: null,
        appIDAt3rd: null,
        accountType: null,
        identifier: null,
        tinyid: null,
        identifierNick: null,
        userSig: null,
        a2: null,
        contentType: "json",
        apn: 1
    }, W = {}, Q = 0, $ = [], Z = [], ee = [], te = {
        downloadMap: {}
    }, ne = {
        "[惊讶]": 0,
        "[撇嘴]": 1,
        "[色]": 2,
        "[发呆]": 3,
        "[得意]": 4,
        "[流泪]": 5,
        "[害羞]": 6,
        "[闭嘴]": 7,
        "[睡]": 8,
        "[大哭]": 9,
        "[尴尬]": 10,
        "[发怒]": 11,
        "[调皮]": 12,
        "[龇牙]": 13,
        "[微笑]": 14,
        "[难过]": 15,
        "[酷]": 16,
        "[冷汗]": 17,
        "[抓狂]": 18,
        "[吐]": 19,
        "[偷笑]": 20,
        "[可爱]": 21,
        "[白眼]": 22,
        "[傲慢]": 23,
        "[饿]": 24,
        "[困]": 25,
        "[惊恐]": 26,
        "[流汗]": 27,
        "[憨笑]": 28,
        "[大兵]": 29,
        "[奋斗]": 30,
        "[咒骂]": 31,
        "[疑问]": 32,
        "[嘘]": 33,
        "[晕]": 34
    }, oe = {}, ie = new function() {
        this.formatTimeStamp = function(e, t) {
            if (!e) return 0;
            var n;
            t = t || "yyyy-MM-dd hh:mm:ss";
            var o = new Date(1e3 * e), i = {
                "M+": o.getMonth() + 1,
                "d+": o.getDate(),
                "h+": o.getHours(),
                "m+": o.getMinutes(),
                "s+": o.getSeconds()
            };
            n = /(y+)/.test(t) ? t.replace(RegExp.$1, (o.getFullYear() + "").substr(4 - RegExp.$1.length)) : t;
            for (var r in i) new RegExp("(" + r + ")").test(n) && (n = n.replace(RegExp.$1, 1 == RegExp.$1.length ? i[r] : ("00" + i[r]).substr(("" + i[r]).length)));
            return n;
        }, this.groupTypeEn2Ch = function(e) {
            var t = null;
            switch (e) {
              case "Public":
                t = "公开群";
                break;

              case "ChatRoom":
                t = "聊天室";
                break;

              case "Private":
                t = "讨论组";
                break;

              case "AVChatRoom":
                t = "直播聊天室";
                break;

              default:
                t = e;
            }
            return t;
        }, this.groupTypeCh2En = function(e) {
            var t = null;
            switch (e) {
              case "公开群":
                t = "Public";
                break;

              case "聊天室":
                t = "ChatRoom";
                break;

              case "讨论组":
                t = "Private";
                break;

              case "直播聊天室":
                t = "AVChatRoom";
                break;

              default:
                t = e;
            }
            return t;
        }, this.groupRoleEn2Ch = function(e) {
            var t = null;
            switch (e) {
              case "Member":
                t = "成员";
                break;

              case "Admin":
                t = "管理员";
                break;

              case "Owner":
                t = "群主";
                break;

              default:
                t = e;
            }
            return t;
        }, this.groupRoleCh2En = function(e) {
            var t = null;
            switch (e) {
              case "成员":
                t = "Member";
                break;

              case "管理员":
                t = "Admin";
                break;

              case "群主":
                t = "Owner";
                break;

              default:
                t = e;
            }
            return t;
        }, this.groupMsgFlagEn2Ch = function(e) {
            var t = null;
            switch (e) {
              case "AcceptAndNotify":
                t = "接收并提示";
                break;

              case "AcceptNotNotify":
                t = "接收不提示";
                break;

              case "Discard":
                t = "屏蔽";
                break;

              default:
                t = e;
            }
            return t;
        }, this.groupMsgFlagCh2En = function(e) {
            var t = null;
            switch (e) {
              case "接收并提示":
                t = "AcceptAndNotify";
                break;

              case "接收不提示":
                t = "AcceptNotNotify";
                break;

              case "屏蔽":
                t = "Discard";
                break;

              default:
                t = e;
            }
            return t;
        }, this.formatText2Html = function(e) {
            var t = e;
            return t && (t = (t = (t = this.xssFilter(t)).replace(/ /g, "&nbsp;")).replace(/\n/g, "<br/>")), 
            t;
        }, this.formatHtml2Text = function(e) {
            var t = e;
            return t && (t = (t = t.replace(/&nbsp;/g, " ")).replace(/<br\/>/g, "\n")), t;
        }, this.getStrBytes = function(e) {
            if (null == e || void 0 === e) return 0;
            if ("string" != typeof e) return 0;
            var t, n, o, i = 0;
            for (n = 0, o = e.length; n < o; n++) i += (t = e.charCodeAt(n)) <= 127 ? 1 : t <= 2047 ? 2 : t <= 65535 ? 3 : 4;
            return i;
        }, this.xssFilter = function(e) {
            return e = e.toString(), e = e.replace(/[<]/g, "&lt;"), e = e.replace(/[>]/g, "&gt;"), 
            e = e.replace(/'/g, "&#039;");
        }, this.trimStr = function(e) {
            return e ? (e = e.toString()).replace(/(^\s*)|(\s*$)/g, "") : "";
        }, this.validNumber = function(e) {
            return (e = e.toString()).match(/(^\d{1,8}$)/g);
        }, this.getReturnError = function(e, t) {
            return t || (t = -100), {
                ActionStatus: d.FAIL,
                ErrorCode: t,
                ErrorInfo: e + "[" + t + "]"
            };
        }, this.setCookie = function(e, t, n, o, i) {
            var r = new Date();
            r.setTime(r.getTime() + 1e3 * n), document.cookie = e + "=" + escape(t) + ";expires=" + r.toGMTString();
        }, this.getCookie = function(e) {
            var t = document.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)"));
            return null != t ? unescape(t[2]) : null;
        }, this.delCookie = function(e) {
            var t = new Date();
            t.setTime(t.getTime() - 1);
            var n = this.getCookie(e);
            null != n && (document.cookie = e + "=" + escape(n) + ";expires=" + t.toGMTString());
        }, this.getBrowserInfo = function() {
            return {
                type: "wechat app",
                ver: -1
            };
        };
    }(), re = new function() {
        var e = !0;
        this.setOn = function(t) {
            e = t;
        }, this.getOn = function() {
            return e;
        }, this.error = function(t) {
            try {
                e && console.error(t);
            } catch (e) {}
        }, this.warn = function(t) {
            try {
                e && console.warn(t);
            } catch (e) {}
        }, this.info = function(t) {
            try {
                e && console.info(t);
            } catch (e) {}
        }, this.debug = function(t) {
            try {
                e && console.debug(t);
            } catch (e) {}
        };
    }(), se = function(e) {
        return e || (e = new Date()), Math.round(e.getTime() / 1e3);
    }, ue = function() {
        return Q ? Q += 1 : Q = Math.round(1e7 * Math.random()), Q;
    }, ae = function() {
        return Math.round(4294967296 * Math.random());
    }, ce = function(e, t, n, o, i, r, s) {
        console.debug(t, n), wx.request({
            url: t,
            data: n,
            dataType: "json",
            method: e,
            header: {
                "Content-Type": "application/json"
            },
            success: function(e) {
                k = x = 0, r && r(e.data);
            },
            fail: function(e) {
                setTimeout(function() {
                    var e = ie.getReturnError("请求服务器失败,请检查你的网络是否正常", -2);
                    s && s(e);
                }, 16);
            }
        });
    }, le = function(e, t, n, o, i, r, s) {
        ce(e, t, JSON.stringify(n), 0, 0, function(e) {
            var t = null;
            e && (t = e), r && r(t);
        }, s);
    }, pe = function() {
        return j.sdkAppID && j.identifier;
    }, fe = function(e, t) {
        if (!pe()) {
            if (t) {
                var n = ie.getReturnError("请登录", -4);
                e && e(n);
            }
            return !1;
        }
        return !0;
    }, de = function() {
        return o;
    }, ge = function(e, t, o, r) {
        var s = i;
        s = de() ? i.FORMAL.COMMON : i.TEST.COMMON, e == u.PIC && (s = de() ? i.FORMAL.PIC : i.TEST.PIC);
        var c = s + "/" + a[e] + "/" + e + "/" + t + "?websdkappid=" + n.APPID + "&v=" + n.VERSION;
        if (pe()) {
            if ("login" == t) c += "&identifier=" + encodeURIComponent(j.identifier) + "&usersig=" + j.userSig; else if (j.tinyid && j.a2) c += "&tinyid=" + j.tinyid + "&a2=" + j.a2; else if (r) return re.error("tinyid或a2为空[" + e + "][" + t + "]"), 
            r(ie.getReturnError("tinyid或a2为空[" + e + "][" + t + "]", -5)), !1;
            c += "&contenttype=" + j.contentType;
        }
        return c += "&sdkappid=" + j.sdkAppID + "&accounttype=" + j.accountType + "&apn=" + j.apn + "&reqtime=" + se();
    }, me = function(e, t) {
        var n = null;
        return Y && H[0] ? n = "http://" + H[0] + "/asn.com/stddownload_common_file?authkey=" + Y + "&bid=" + M.BUSSINESS_ID + "&subbid=" + j.sdkAppID + "&fileid=" + e + "&filetype=" + E.SOUND + "&openid=" + t + "&ver=0" : re.error("拼接语音下载url不报错：ip或者authkey为空"), 
        n;
    }, Ie = function(e, t, n) {
        var o = null;
        return Y && H[0] ? o = "http://" + H[0] + "/asn.com/stddownload_common_file?authkey=" + Y + "&bid=" + M.BUSSINESS_ID + "&subbid=" + j.sdkAppID + "&fileid=" + e + "&filetype=" + E.FILE + "&openid=" + t + "&ver=0&filename=" + encodeURIComponent(n) : re.error("拼接文件下载url不报错：ip或者authkey为空"), 
        te.downloadMap["uuid_" + e] = o, o;
    }, Me = function(e, t, n, o, i, r, s) {
        var u = {
            From_Account: t,
            To_Account: i,
            os_platform: 10,
            Timestamp: se().toString(),
            Random: ae().toString(),
            request_info: [ {
                busi_id: r,
                download_flag: o,
                type: s,
                uuid: e,
                version: y.SERVER_VERSION,
                auth_key: Y,
                ip: H[0]
            } ]
        };
        It(u, function(e) {
            0 == e.error_code && e.response_info && (te.downloadMap["uuid_" + u.uuid] = e.response_info.url), 
            onAppliedDownloadUrl && onAppliedDownloadUrl({
                uuid: u.uuid,
                url: e.response_info.url,
                maps: te.downloadMap
            });
        }, function(e) {
            re.error("获取下载地址失败", u.uuid);
        });
    }, Ee = function() {
        j = {
            sdkAppID: null,
            appIDAt3rd: null,
            accountType: null,
            identifier: null,
            identifierNick: null,
            userSig: null,
            contentType: "json",
            apn: 1
        }, W = {}, Q = 0, K = 0, z = null, ee = [], Ct.clear();
    }, _e = function(e, t, n, i, r) {
        Ee(), n && (W = n), 0 == W.isAccessFormalEnv && (o = W.isAccessFormalEnv), 0 == W.isLogOn && re.setOn(W.isLogOn), 
        e || !r ? e.sdkAppID || !r ? e.accountType || !r ? (e.identifier && (j.identifier = e.identifier.toString()), 
        e.identifier && !e.userSig && r ? r(ie.getReturnError("loginInfo.userSig is empty", -9)) : (e.userSig && (j.userSig = e.userSig.toString()), 
        j.sdkAppID = e.sdkAppID, j.accountType = e.accountType, j.identifier && j.userSig ? he(function(e) {
            Ct.init(t, function(t) {
                i && (t.identifierNick = e, i(t));
            }, r);
        }, r) : Ct.init(t, i, r))) : r(ie.getReturnError("loginInfo.accountType is empty", -8)) : r(ie.getReturnError("loginInfo.sdkAppID is empty", -7)) : r(ie.getReturnError("loginInfo is empty", -6));
    }, ye = function(e, t, o) {
        if ("longpolling" != e || 60008 != t && 91101 != t) {
            var i = c[e];
            if (i) {
                var r = se(), s = null, u = {
                    Code: t,
                    ErrMsg: o
                };
                if (j.a2 ? s = j.a2.substring(0, 10) + "_" + r + "_" + ae() : j.userSig && (s = j.userSig.substring(0, 10) + "_" + r + "_" + ae()), 
                s) {
                    var a = {
                        UniqKey: s,
                        EventId: i,
                        ReportTime: r,
                        MsgCmdErrorCode: u
                    };
                    if ("login" == e) {
                        var l = [];
                        l.push(a), gt({
                            EvtItems: l,
                            MainVersion: n.VERSION,
                            Version: "0"
                        }, function(e) {
                            l = null;
                        }, function(e) {
                            l = null;
                        });
                    } else ee.push(a), ee.length >= 20 && gt({
                        EvtItems: ee,
                        MainVersion: n.VERSION,
                        Version: "0"
                    }, function(e) {
                        ee = [];
                    }, function(e) {
                        ee = [];
                    });
                }
            }
        }
    }, he = function(e, t) {
        Mt.apiCall(u.OPEN_IM, "login", {
            State: "Online"
        }, function(n) {
            if (n.TinyId) j.tinyid = n.TinyId; else if (t) return void t(ie.getReturnError("TinyId is empty", -10));
            if (n.A2Key) j.a2 = n.A2Key; else if (t) return void t(ie.getReturnError("A2Key is empty", -11));
            var o = [ "Tag_Profile_IM_Nick" ], i = {
                From_Account: j.identifier,
                To_Account: [ j.identifier ],
                LastStandardSequence: 0,
                TagList: o
            };
            st(i, function(t) {
                var n;
                if (t.UserProfileItem && t.UserProfileItem.length > 0) for (var o in t.UserProfileItem) for (var i in t.UserProfileItem[o].ProfileItem) switch (t.UserProfileItem[o].ProfileItem[i].Tag) {
                  case "Tag_Profile_IM_Nick":
                    (n = t.UserProfileItem[o].ProfileItem[i].Value) && (j.identifierNick = n);
                }
                e && e(j.identifierNick);
            }, t);
        }, t);
    }, Ce = function(e, t, n) {
        if (!fe(n, !1)) return Ee(), void (t && t({
            ActionStatus: d.OK,
            ErrorCode: 0,
            ErrorInfo: "logout success"
        }));
        "all" == e ? Mt.apiCall(u.OPEN_IM, "logout", {}, function(e) {
            Ee(), t && t(e);
        }, n) : Mt.apiCall(u.OPEN_IM, "longpollinglogout", {
            LongPollingId: q
        }, function(e) {
            Ee(), t && t(e);
        }, n);
    }, Te = function(e, t, n) {
        if (fe(n, !0)) {
            var o = null;
            switch (e.sess.type()) {
              case l.C2C:
                o = {
                    From_Account: j.identifier,
                    To_Account: e.sess.id().toString(),
                    MsgTimeStamp: e.time,
                    MsgSeq: e.seq,
                    MsgRandom: e.random,
                    MsgBody: []
                };
                break;

              case l.GROUP:
                var i = e.getSubType();
                switch (o = {
                    GroupId: e.sess.id().toString(),
                    From_Account: j.identifier,
                    Random: e.random,
                    MsgBody: []
                }, i) {
                  case A.COMMON:
                    o.MsgPriority = "COMMON";
                    break;

                  case A.REDPACKET:
                    o.MsgPriority = "REDPACKET";
                    break;

                  case A.LOVEMSG:
                    o.MsgPriority = "LOVEMSG";
                    break;

                  case A.TIP:
                    re.error("不能主动发送群提示消息,subType=" + i);
                    break;

                  default:
                    return void re.error("发送群消息时，出现未知子消息类型：subType=" + i);
                }
            }
            for (var r in e.elems) {
                var s = e.elems[r], a = null, c = s.type;
                switch (c) {
                  case g.TEXT:
                    a = {
                        Text: s.content.text
                    };
                    break;

                  case g.FACE:
                    a = {
                        Index: s.content.index,
                        Data: s.content.data
                    };
                    break;

                  case g.IMAGE:
                    var p = [];
                    for (var f in s.content.ImageInfoArray) p.push({
                        Type: s.content.ImageInfoArray[f].type,
                        Size: s.content.ImageInfoArray[f].size,
                        Width: s.content.ImageInfoArray[f].width,
                        Height: s.content.ImageInfoArray[f].height,
                        URL: s.content.ImageInfoArray[f].url
                    });
                    a = {
                        UUID: s.content.UUID,
                        ImageInfoArray: p
                    };
                    break;

                  case g.SOUND:
                    re.warn("web端暂不支持发送语音消息");
                    continue;

                  case g.LOCATION:
                    re.warn("web端暂不支持发送地理位置消息");
                    continue;

                  case g.FILE:
                    a = {
                        UUID: s.content.uuid,
                        FileName: s.content.name,
                        FileSize: s.content.size,
                        DownloadFlag: s.content.downFlag
                    };
                    break;

                  case g.CUSTOM:
                    a = {
                        Data: s.content.data,
                        Desc: s.content.desc,
                        Ext: s.content.ext
                    }, c = g.CUSTOM;
                    break;

                  default:
                    re.warn("web端暂不支持发送" + s.type + "消息");
                    continue;
                }
                o.MsgBody.push({
                    MsgType: c,
                    MsgContent: a
                });
            }
            e.sess.type() == l.C2C ? Mt.apiCall(u.OPEN_IM, "sendmsg", o, t, n) : e.sess.type() == l.GROUP && Mt.apiCall(u.GROUP, "send_group_msg", o, t, n);
        }
    }, Ae = function(e, t, n) {
        (o || "undefined" == typeof stopPolling || 1 != stopPolling) && fe(n, !0) && Mt.apiCall(u.OPEN_IM, "longpolling", e, t, n, w, !0);
    }, Se = function(e, t, n, o) {
        Mt.apiCall(u.BIG_GROUP_LONG_POLLING, "get_msg", e, t, n, o);
    }, Ge = function e(t, n, o, i) {
        fe(i, !0) && Mt.apiCall(u.OPEN_IM, "getmsg", {
            Cookie: t,
            SyncFlag: n
        }, function(t) {
            if (t.MsgList && t.MsgList.length) for (var n in t.MsgList) $.push(t.MsgList[n]);
            1 == t.SyncFlag ? e(t.Cookie, t.SyncFlag, o, i) : (t.MsgList = $, $ = [], o && o(t));
        }, i);
    }, Oe = function(e, t, n, o) {
        if (fe(o, !0)) {
            var i = [];
            for (var r in t) {
                var s = {
                    To_Account: t[r].toAccount,
                    LastedMsgTime: t[r].lastedMsgTime
                };
                i.push(s);
            }
            Mt.apiCall(u.OPEN_IM, "msgreaded", {
                C2CMsgReaded: {
                    Cookie: e,
                    C2CMsgReadedItem: i
                }
            }, n, o);
        }
    }, Fe = function(e, t, n) {
        fe(n, !0) && Mt.apiCall(u.OPEN_IM, "deletemsg", e, t, n);
    }, Re = function e(t, n, o) {
        fe(o, !0) && Mt.apiCall(u.OPEN_IM, "getroammsg", t, function(i) {
            var r = t.MaxCnt, s = i.Complete, u = i.MaxCnt, a = i.MsgKey, c = i.LastMsgTime;
            if (i.MsgList && i.MsgList.length) for (var l in i.MsgList) Z.push(i.MsgList[l]);
            var p = null;
            0 == s && u < r && (p = {
                Peer_Account: t.Peer_Account,
                MaxCnt: r - u,
                LastMsgTime: c,
                MsgKey: a
            }), p ? e(p, n, o) : (i.MsgList = Z, Z = [], n && n(i));
        }, o);
    }, ve = function(e, t, n) {
        if (fe(n, !0)) {
            for (var o = {
                Type: e.Type,
                Name: e.Name
            }, i = [], r = 0; r < e.MemberList.length; r++) i.push({
                Member_Account: e.MemberList[r]
            });
            o.MemberList = i, e.GroupId && (o.GroupId = e.GroupId), e.Owner_Account && (o.Owner_Account = e.Owner_Account), 
            e.Introduction && (o.Introduction = e.Introduction), e.Notification && (o.Notification = e.Notification), 
            e.MaxMemberCount && (o.MaxMemberCount = e.MaxMemberCount), e.ApplyJoinOption && (o.ApplyJoinOption = e.ApplyJoinOption), 
            e.AppDefinedData && (o.AppDefinedData = e.AppDefinedData), e.FaceUrl && (o.FaceUrl = e.FaceUrl), 
            Mt.apiCall(u.GROUP, "create_group", o, t, n);
        }
    }, Ne = function(e, t, n) {
        fe(n, !0) && Mt.apiCall(u.GROUP, "create_group", e, t, n);
    }, Pe = function(e, t, n) {
        fe(n, !0) && Mt.apiCall(u.GROUP, "modify_group_base_info", e, t, n);
    }, be = function(e, t, n) {
        fe(n, !0) && Mt.apiCall(u.GROUP, "apply_join_group", {
            GroupId: e.GroupId,
            ApplyMsg: e.ApplyMsg,
            UserDefinedField: e.UserDefinedField
        }, t, n);
    }, Le = function(e, t, n) {
        var o;
        o = fe(n, !1) ? u.GROUP : u.BIG_GROUP, Mt.apiCall(o, "apply_join_group", {
            GroupId: e.GroupId,
            ApplyMsg: e.ApplyMsg,
            UserDefinedField: e.UserDefinedField
        }, function(o) {
            if (o.JoinedStatus && "JoinedSuccess" == o.JoinedStatus) {
                if (!o.LongPollingKey) return void (n && n(ie.getReturnError("The type of group is not AVChatRoom: groupid=" + e.GroupId, -12)));
                Ct.setBigGroupLongPollingOn(!0), Ct.setBigGroupLongPollingKey(o.LongPollingKey), 
                Ct.setBigGroupLongPollingMsgMap(e.GroupId, 0), Ct.bigGroupLongPolling();
            }
            t && t(o);
        }, function(e) {
            n && n(e);
        });
    }, Ue = function(e, t, n) {
        fe(n, !0) && Mt.apiCall(u.GROUP, "handle_apply_join_group", {
            GroupId: e.GroupId,
            Applicant_Account: e.Applicant_Account,
            HandleMsg: e.HandleMsg,
            Authentication: e.Authentication,
            MsgKey: e.MsgKey,
            ApprovalMsg: e.ApprovalMsg,
            UserDefinedField: e.UserDefinedField
        }, t, function(e) {
            if (10024 == e.ErrorCode) {
                if (t) {
                    var o = {
                        ActionStatus: d.OK,
                        ErrorCode: 0,
                        ErrorInfo: "该申请已经被处理过"
                    };
                    t(o);
                }
            } else n && n(e);
        });
    }, De = function(e, t, n) {
        fe(n, !0) && Mt.apiCall(u.GROUP, "quit_group", {
            GroupId: e.GroupId
        }, t, n);
    }, ke = function(e, t, n) {
        var o;
        o = fe(n, !1) ? u.GROUP : u.BIG_GROUP, Mt.apiCall(o, "quit_group", {
            GroupId: e.GroupId
        }, function(e) {
            Ct.resetBigGroupLongPollingInfo(), t && t(e);
        }, n);
    }, we = function(e, t, n) {
        Mt.apiCall(u.GROUP, "search_group", e, t, n);
    }, qe = function(e, t, n) {
        fe(n, !0) && Mt.apiCall(u.GROUP, "get_group_public_info", {
            GroupIdList: e.GroupIdList,
            ResponseFilter: {
                GroupBasePublicInfoFilter: e.GroupBasePublicInfoFilter
            }
        }, function(e) {
            if (e.ErrorInfo = "", e.GroupInfo) for (var o in e.GroupInfo) {
                var i = e.GroupInfo[o].ErrorCode;
                i > 0 && (e.ActionStatus = d.FAIL, e.GroupInfo[o].ErrorInfo = "[" + i + "]" + e.GroupInfo[o].ErrorInfo, 
                e.ErrorInfo += e.GroupInfo[o].ErrorInfo + "\n");
            }
            e.ActionStatus == d.FAIL ? n && n(e) : t && t(e);
        }, n);
    }, xe = function(e, t, n) {
        if (fe(n, !0)) {
            var o = {
                GroupIdList: e.GroupIdList,
                ResponseFilter: {
                    GroupBaseInfoFilter: e.GroupBaseInfoFilter,
                    MemberInfoFilter: e.MemberInfoFilter
                }
            };
            e.AppDefinedDataFilter_Group && (o.ResponseFilter.AppDefinedDataFilter_Group = e.AppDefinedDataFilter_Group), 
            e.AppDefinedDataFilter_GroupMember && (o.ResponseFilter.AppDefinedDataFilter_GroupMember = e.AppDefinedDataFilter_GroupMember), 
            Mt.apiCall(u.GROUP, "get_group_info", o, t, n);
        }
    }, Be = function(e, t, n) {
        fe(n, !0) && Mt.apiCall(u.GROUP, "get_group_member_info", {
            GroupId: e.GroupId,
            Offset: e.Offset,
            Limit: e.Limit,
            MemberInfoFilter: e.MemberInfoFilter,
            MemberRoleFilter: e.MemberRoleFilter,
            AppDefinedDataFilter_GroupMember: e.AppDefinedDataFilter_GroupMember
        }, t, n);
    }, Ke = function(e, t, n) {
        fe(n, !0) && Mt.apiCall(u.GROUP, "add_group_member", {
            GroupId: e.GroupId,
            Silence: e.Silence,
            MemberList: e.MemberList
        }, t, n);
    }, ze = function(e, t, n) {
        if (fe(n, !0)) {
            var o = {};
            e.GroupId && (o.GroupId = e.GroupId), e.Member_Account && (o.Member_Account = e.Member_Account), 
            e.Role && (o.Role = e.Role), e.MsgFlag && (o.MsgFlag = e.MsgFlag), e.ShutUpTime && (o.ShutUpTime = e.ShutUpTime), 
            e.NameCard && (o.NameCard = e.NameCard), e.AppMemberDefinedData && (o.AppMemberDefinedData = e.AppMemberDefinedData), 
            Mt.apiCall(u.GROUP, "modify_group_member_info", o, t, n);
        }
    }, Ve = function(e, t, n) {
        fe(n, !0) && Mt.apiCall(u.GROUP, "delete_group_member", {
            GroupId: e.GroupId,
            Silence: e.Silence,
            MemberToDel_Account: e.MemberToDel_Account,
            Reason: e.Reason
        }, t, n);
    }, Je = function(e, t, n) {
        fe(n, !0) && Mt.apiCall(u.GROUP, "destroy_group", {
            GroupId: e.GroupId
        }, t, n);
    }, He = function(e, t, n) {
        fe(n, !0) && Mt.apiCall(u.GROUP, "change_group_owner", e, t, n);
    }, Ye = function(e, t, n) {
        fe(n, !0) && Mt.apiCall(u.GROUP, "get_joined_group_list", {
            Member_Account: e.Member_Account,
            Limit: e.Limit,
            Offset: e.Offset,
            GroupType: e.GroupType,
            ResponseFilter: {
                GroupBaseInfoFilter: e.GroupBaseInfoFilter,
                SelfInfoFilter: e.SelfInfoFilter
            }
        }, t, n);
    }, Xe = function(e, t, n) {
        fe(n, !0) && Mt.apiCall(u.GROUP, "get_role_in_group", {
            GroupId: e.GroupId,
            User_Account: e.User_Account
        }, t, n);
    }, je = function(e, t, n) {
        fe(n, !0) && Mt.apiCall(u.GROUP, "forbid_send_msg", {
            GroupId: e.GroupId,
            Members_Account: e.Members_Account,
            ShutUpTime: e.ShutUpTime
        }, t, n);
    }, We = function(e, t, n) {
        fe(n, !0) && Mt.apiCall(u.GROUP, "send_group_system_notification", e, t, n);
    }, Qe = function(e, t, n) {
        fe(n, !0) && Mt.apiCall(u.GROUP, "group_msg_get", {
            GroupId: e.GroupId,
            ReqMsgSeq: e.ReqMsgSeq,
            ReqMsgNumber: e.ReqMsgNumber
        }, t, n);
    }, $e = function(e, t, n) {
        fe(n, !0) && Mt.apiCall(u.GROUP, "msg_read_report", {
            GroupId: e.GroupId,
            MsgReadedSeq: e.MsgReadedSeq
        }, t, n);
    }, Ze = function(e) {
        var t = [];
        if (e.Fail_Account && e.Fail_Account.length && (t = e.Fail_Account), e.Invalid_Account && e.Invalid_Account.length) for (var n in e.Invalid_Account) t.push(e.Invalid_Account[n]);
        if (t.length) {
            e.ActionStatus = d.FAIL, e.ErrorCode = 99999, e.ErrorInfo = "";
            for (var o in t) {
                var i = t[o];
                for (var r in e.ResultItem) if (e.ResultItem[r].To_Account == i) {
                    var s = e.ResultItem[r].ResultCode;
                    e.ResultItem[r].ResultInfo = "[" + s + "]" + e.ResultItem[r].ResultInfo, e.ErrorInfo += e.ResultItem[r].ResultInfo + "\n";
                    break;
                }
            }
        }
        return e;
    }, et = function(e, t, n) {
        fe(n, !0) && Mt.apiCall(u.FRIEND, "friend_add", {
            From_Account: j.identifier,
            AddFriendItem: e.AddFriendItem
        }, function(e) {
            var o = Ze(e);
            o.ActionStatus == d.FAIL ? n && n(o) : t && t(o);
        }, n);
    }, tt = function(e, t, n) {
        fe(n, !0) && Mt.apiCall(u.FRIEND, "friend_delete", {
            From_Account: j.identifier,
            To_Account: e.To_Account,
            DeleteType: e.DeleteType
        }, function(e) {
            var o = Ze(e);
            o.ActionStatus == d.FAIL ? n && n(o) : t && t(o);
        }, n);
    }, nt = function(e, t, n) {
        fe(n, !0) && Mt.apiCall(u.FRIEND, "pendency_get", {
            From_Account: j.identifier,
            PendencyType: e.PendencyType,
            StartTime: e.StartTime,
            MaxLimited: e.MaxLimited,
            LastSequence: e.LastSequence
        }, t, n);
    }, ot = function(e, t, n) {
        fe(n, !0) && Mt.apiCall(u.FRIEND, "pendency_delete", {
            From_Account: j.identifier,
            PendencyType: e.PendencyType,
            To_Account: e.To_Account
        }, function(e) {
            var o = Ze(e);
            o.ActionStatus == d.FAIL ? n && n(o) : t && t(o);
        }, n);
    }, it = function(e, t, n) {
        fe(n, !0) && Mt.apiCall(u.FRIEND, "friend_response", {
            From_Account: j.identifier,
            ResponseFriendItem: e.ResponseFriendItem
        }, function(e) {
            var o = Ze(e);
            o.ActionStatus == d.FAIL ? n && n(o) : t && t(o);
        }, n);
    }, rt = function(e, t, n) {
        fe(n, !0) && Mt.apiCall(u.FRIEND, "friend_get_all", {
            From_Account: j.identifier,
            TimeStamp: e.TimeStamp,
            StartIndex: e.StartIndex,
            GetCount: e.GetCount,
            LastStandardSequence: e.LastStandardSequence,
            TagList: e.TagList
        }, t, n);
    }, st = function(e, t, n) {
        fe(n, !0) && Mt.apiCall(u.PROFILE, "portrait_get", {
            From_Account: j.identifier,
            To_Account: e.To_Account,
            TagList: e.TagList
        }, function(e) {
            var o = [];
            if (e.Fail_Account && e.Fail_Account.length && (o = e.Fail_Account), e.Invalid_Account && e.Invalid_Account.length) for (var i in e.Invalid_Account) o.push(e.Invalid_Account[i]);
            if (o.length) {
                e.ActionStatus = d.FAIL, e.ErrorCode = 99999, e.ErrorInfo = "";
                for (var r in o) {
                    var s = o[r];
                    for (var u in e.UserProfileItem) if (e.UserProfileItem[u].To_Account == s) {
                        var a = e.UserProfileItem[u].ResultCode;
                        e.UserProfileItem[u].ResultInfo = "[" + a + "]" + e.UserProfileItem[u].ResultInfo, 
                        e.ErrorInfo += "账号:" + s + "," + e.UserProfileItem[u].ResultInfo + "\n";
                        break;
                    }
                }
            }
            e.ActionStatus == d.FAIL ? n && n(e) : t && t(e);
        }, n);
    }, ut = function(e, t, n) {
        fe(n, !0) && Mt.apiCall(u.PROFILE, "portrait_set", {
            From_Account: j.identifier,
            ProfileItem: e.ProfileItem
        }, function(n) {
            for (var o in e.ProfileItem) {
                var i = e.ProfileItem[o];
                if ("Tag_Profile_IM_Nick" == i.Tag) {
                    j.identifierNick = i.Value;
                    break;
                }
            }
            t && t(n);
        }, n);
    }, at = function(e, t, n) {
        fe(n, !0) && Mt.apiCall(u.FRIEND, "black_list_add", {
            From_Account: j.identifier,
            To_Account: e.To_Account
        }, function(e) {
            var o = Ze(e);
            o.ActionStatus == d.FAIL ? n && n(o) : t && t(o);
        }, n);
    }, ct = function(e, t, n) {
        fe(n, !0) && Mt.apiCall(u.FRIEND, "black_list_delete", {
            From_Account: j.identifier,
            To_Account: e.To_Account
        }, function(e) {
            var o = Ze(e);
            o.ActionStatus == d.FAIL ? n && n(o) : t && t(o);
        }, n);
    }, lt = function(e, t, n) {
        fe(n, !0) && Mt.apiCall(u.FRIEND, "black_list_get", {
            From_Account: j.identifier,
            StartIndex: e.StartIndex,
            MaxLimited: e.MaxLimited,
            LastSequence: e.LastSequence
        }, t, n);
    }, pt = function(e, t, n) {
        fe(n, !0) && Mt.apiCall(u.RECENT_CONTACT, "get", {
            From_Account: j.identifier,
            Count: e.Count
        }, t, n);
    }, ft = function(e, t, n) {
        fe(n, !0) && (de() ? cmdName = "pic_up" : cmdName = "pic_up_test", Mt.apiCall(u.PIC, cmdName, {
            App_Version: y.APP_VERSION,
            From_Account: j.identifier,
            To_Account: e.To_Account,
            Seq: e.Seq,
            Timestamp: e.Timestamp,
            Random: e.Random,
            File_Str_Md5: e.File_Str_Md5,
            File_Size: e.File_Size,
            File_Type: e.File_Type,
            Server_Ver: y.SERVER_VERSION,
            Auth_Key: Y,
            Busi_Id: e.Busi_Id,
            PkgFlag: e.PkgFlag,
            Slice_Offset: e.Slice_Offset,
            Slice_Size: e.Slice_Size,
            Slice_Data: e.Slice_Data
        }, t, n));
    }, dt = function(e, t) {
        fe(t, !0) && Mt.apiCall(u.OPEN_IM, "authkey", {}, e, t);
    }, gt = function(e, t, n) {
        fe(n, !0) && Mt.apiCall(u.IM_OPEN_STAT, "web_report", e, t, n);
    }, mt = function(e, t, n) {
        fe(n, !0) && Mt.apiCall(u.OPEN_IM, "getlongpollingid", {}, function(e) {
            t && t(e);
        }, n);
    }, It = function(e, t, n) {
        Mt.apiCall(u.PIC, "apply_download", e, t, n);
    };
    r = ie.getBrowserInfo(), re.info("BROWSER_INFO: type=" + r.type + ", ver=" + r.ver), 
    "ie" == r.type && parseInt(r.ver) < 10 && (s = !0);
    var Mt = 0 == s ? new function() {
        var e = null;
        this.init = function(t, n, o) {
            t && (e = t);
        }, this.callBack = function(t) {
            e && e(t);
        }, this.clear = function() {
            e = null;
        }, this.apiCall = function(e, t, n, o, i, r, s) {
            var u = ge(e, t, 0, i);
            0 != u && le("POST", u, n, 0, 0, function(r) {
                console.log("***webim.js***");
                var s = null, u = "";
                "pic_up" == t && (n.Slice_Data = "");
                r.ActionStatus == d.OK ? (re.info("[" + e + "][" + t + "]success: "), o && o(r), 
                s = 0, u = "") : (s = r.ErrorCode, u = r.ErrorInfo, i && (r.SrcErrorInfo = r.ErrorInfo, 
                r.ErrorInfo = "[" + e + "][" + t + "]failed: ", "longpolling" == t && 60008 == r.ErrorCode || re.error(r.ErrorInfo), 
                i(r))), ye(t, s, u);
            }, function(e) {
                i && i(e), ye(t, e.ErrorCode, e.ErrorInfo);
            });
        };
    }() : new function() {
        var e = null;
        this.init = function(t, n, o) {
            t && (e = t);
        }, this.callBack = function(t) {
            e && e(t);
        }, this.clear = function() {
            e = null;
        }, this.apiCall = function(e, t, n, o, i, r, s) {
            var u = ge(e, t, 0, i);
            if (0 != u) {
                var a = K++, c = "jsonpRequest" + a, l = document.createElement("script"), p = 0;
                window[c] = V, l.type = "text/javascript", u = u + "&jsonpcallback=" + c + "&jsonpbody=" + encodeURIComponent(JSON.stringify(n)), 
                l.src = u, l.async = !0, void 0 !== l.onreadystatechange && (l.event = "onclick", 
                l.htmlFor = l.id = "_jsonpRequest_" + a), l.onload = l.onreadystatechange = function() {
                    if (this.readyState && "complete" !== this.readyState && "loaded" !== this.readyState || p) return !1;
                    l.onload = l.onreadystatechange = null, l.onclick && l.onclick();
                    var r = z, s = "\n request url: \n" + u + "\n request body: \n" + JSON.stringify(n) + "\n response: \n" + JSON.stringify(r);
                    r.ActionStatus == d.OK ? (re.info("[" + e + "][" + t + "]success: " + s), o && o(r)) : (r.ErrorInfo = "[" + e + "][" + t + "]failed " + s, 
                    "longpolling" != t || 60008 != r.ErrorCode ? re.error(r.ErrorInfo) : re.warn("[" + e + "][" + t + "]success: " + s), 
                    i && i(r)), z = void 0, document.body.removeChild(l), p = 1;
                }, document.body.appendChild(l);
            }
        };
    }(), Et = function e(t, n, o, i, r, s) {
        this._impl = {
            skey: e.skey(t, n),
            type: t,
            id: n,
            name: o,
            icon: i,
            unread: 0,
            isAutoRead: !1,
            time: r >= 0 ? r : 0,
            curMaxMsgSeq: s >= 0 ? s : 0,
            msgs: [],
            isFinished: 1
        };
    };
    Et.skey = function(e, t) {
        return e + t;
    }, Et.prototype.type = function() {
        return this._impl.type;
    }, Et.prototype.id = function() {
        return this._impl.id;
    }, Et.prototype.name = function() {
        return this._impl.name;
    }, Et.prototype.icon = function() {
        return this._impl.icon;
    }, Et.prototype.unread = function(e) {
        if (void 0 === e) return this._impl.unread;
        this._impl.unread = e;
    }, Et.prototype.isFinished = function(e) {
        if (void 0 === e) return this._impl.isFinished;
        this._impl.isFinished = e;
    }, Et.prototype.time = function() {
        return this._impl.time;
    }, Et.prototype.curMaxMsgSeq = function(e) {
        if (void 0 === e) return this._impl.curMaxMsgSeq;
        this._impl.curMaxMsgSeq = e;
    }, Et.prototype.msgCount = function() {
        return this._impl.msgs.length;
    }, Et.prototype.msg = function(e) {
        return this._impl.msgs[e];
    }, Et.prototype.msgs = function() {
        return this._impl.msgs;
    }, Et.prototype._impl_addMsg = function(e) {
        this._impl.msgs.push(e), e.time > this._impl.time && (this._impl.time = e.time), 
        e.seq > this._impl.curMaxMsgSeq && (this._impl.curMaxMsgSeq = e.seq), e.isSend || this._impl.isAutoRead || this._impl.unread++;
    };
    var _t = function(e, t) {
        this.toAccount = e, this.lastedMsgTime = t;
    }, yt = function(e, t, n, o, i, r, s, u) {
        this.sess = e, this.subType = s >= 0 ? s : 0, this.fromAccount = r, this.fromAccountNick = u || r, 
        this.isSend = Boolean(t), this.seq = n >= 0 ? n : ue(), this.random = o >= 0 ? o : ae(), 
        this.time = i >= 0 ? i : se(), this.elems = [];
    };
    yt.prototype.getSession = function() {
        return this.sess;
    }, yt.prototype.getType = function() {
        return this.subType;
    }, yt.prototype.getSubType = function() {
        return this.subType;
    }, yt.prototype.getFromAccount = function() {
        return this.fromAccount;
    }, yt.prototype.getFromAccountNick = function() {
        return this.fromAccountNick;
    }, yt.prototype.getIsSend = function() {
        return this.isSend;
    }, yt.prototype.getSeq = function() {
        return this.seq;
    }, yt.prototype.getTime = function() {
        return this.time;
    }, yt.prototype.getRandom = function() {
        return this.random;
    }, yt.prototype.getElems = function() {
        return this.elems;
    }, yt.prototype.addText = function(e) {
        this.addElem(new t.Msg.Elem(g.TEXT, e));
    }, yt.prototype.addFace = function(e) {
        this.addElem(new t.Msg.Elem(g.FACE, e));
    }, yt.prototype.addImage = function(e) {
        this.addElem(new t.Msg.Elem(g.IMAGE, e));
    }, yt.prototype.addLocation = function(e) {
        this.addElem(new t.Msg.Elem(g.LOCATION, e));
    }, yt.prototype.addFile = function(e) {
        this.addElem(new t.Msg.Elem(g.FILE, e));
    }, yt.prototype.addCustom = function(e) {
        this.addElem(new t.Msg.Elem(g.CUSTOM, e));
    }, yt.prototype.addElem = function(e) {
        this.elems.push(e);
    }, yt.prototype.toHtml = function() {
        var e = "";
        for (var t in this.elems) e += this.elems[t].toHtml();
        return e;
    }, (yt.Elem = function(e, t) {
        this.type = e, this.content = t;
    }).prototype.getType = function() {
        return this.type;
    }, yt.Elem.prototype.getContent = function() {
        return this.content;
    }, yt.Elem.prototype.toHtml = function() {
        return this.content.toHtml();
    }, yt.Elem.Text = function(e) {
        this.text = ie.xssFilter(e);
    }, yt.Elem.Text.prototype.getText = function() {
        return this.text;
    }, yt.Elem.Text.prototype.toHtml = function() {
        return this.text;
    }, yt.Elem.Face = function(e, t) {
        this.index = e, this.data = t;
    }, yt.Elem.Face.prototype.getIndex = function() {
        return this.index;
    }, yt.Elem.Face.prototype.getData = function() {
        return this.data;
    }, yt.Elem.Face.prototype.toHtml = function() {
        var e = null, t = ne[this.data], n = oe[t];
        return n && n[1] && (e = n[1]), e ? "<img src='" + e + "'/>" : this.data;
    }, yt.Elem.Location = function(e, t, n) {
        this.latitude = t, this.longitude = e, this.desc = n;
    }, yt.Elem.Location.prototype.getLatitude = function() {
        return this.latitude;
    }, yt.Elem.Location.prototype.getLongitude = function() {
        return this.longitude;
    }, yt.Elem.Location.prototype.getDesc = function() {
        return this.desc;
    }, yt.Elem.Location.prototype.toHtml = function() {
        return "经度=" + this.longitude + ",纬度=" + this.latitude + ",描述=" + this.desc;
    }, yt.Elem.Images = function(e) {
        this.UUID = e, this.ImageInfoArray = [];
    }, yt.Elem.Images.prototype.addImage = function(e) {
        this.ImageInfoArray.push(e);
    }, yt.Elem.Images.prototype.toHtml = function() {
        var e = this.getImage(m.SMALL), t = this.getImage(m.LARGE), n = this.getImage(m.ORIGIN);
        return t || (t = e), n || (n = e), "<img src='" + e.getUrl() + "#" + t.getUrl() + "#" + n.getUrl() + "' style='CURSOR: hand' id='" + this.getImageId() + "' bigImgUrl='" + t.getUrl() + "' onclick='imageClick(this)' />";
    }, yt.Elem.Images.prototype.getImageId = function() {
        return this.UUID;
    }, yt.Elem.Images.prototype.getImage = function(e) {
        for (var t in this.ImageInfoArray) if (this.ImageInfoArray[t].getType() == e) return this.ImageInfoArray[t];
        return null;
    }, yt.Elem.Images.Image = function(e, t, n, o, i) {
        this.type = e, this.size = t, this.width = n, this.height = o, this.url = i;
    }, yt.Elem.Images.Image.prototype.getType = function() {
        return this.type;
    }, yt.Elem.Images.Image.prototype.getSize = function() {
        return this.size;
    }, yt.Elem.Images.Image.prototype.getWidth = function() {
        return this.width;
    }, yt.Elem.Images.Image.prototype.getHeight = function() {
        return this.height;
    }, yt.Elem.Images.Image.prototype.getUrl = function() {
        return this.url;
    }, yt.Elem.Sound = function(e, t, n, o, i, r, s) {
        this.uuid = e, this.second = t, this.size = n, this.senderId = o, this.receiverId = i, 
        this.downFlag = r, this.busiId = s == l.C2C ? 2 : 1, void 0 !== r && void 0 !== busiId ? Me(e, o, 0, r, i, this.busiId, _.SOUND) : this.downUrl = me(e, o);
    }, yt.Elem.Sound.prototype.getUUID = function() {
        return this.uuid;
    }, yt.Elem.Sound.prototype.getSecond = function() {
        return this.second;
    }, yt.Elem.Sound.prototype.getSize = function() {
        return this.size;
    }, yt.Elem.Sound.prototype.getSenderId = function() {
        return this.senderId;
    }, yt.Elem.Sound.prototype.getDownUrl = function() {
        return this.downUrl;
    }, yt.Elem.Sound.prototype.toHtml = function() {
        return "ie" == r.type && parseInt(r.ver) <= 8 ? "[这是一条语音消息]demo暂不支持ie8(含)以下浏览器播放语音,语音URL:" + this.downUrl : '<audio id="uuid_' + this.uuid + '" src="' + this.downUrl + '" controls="controls" onplay="onChangePlayAudio(this)" preload="none"></audio>';
    }, yt.Elem.File = function(e, t, n, o, i, r, s) {
        this.uuid = e, this.name = t, this.size = n, this.senderId = o, this.receiverId = i, 
        this.downFlag = r, this.busiId = s == l.C2C ? 2 : 1, void 0 !== r && void 0 !== busiId ? Me(e, o, 0, r, i, this.busiId, _.FILE) : this.downUrl = Ie(e, o, t);
    }, yt.Elem.File.prototype.getUUID = function() {
        return this.uuid;
    }, yt.Elem.File.prototype.getName = function() {
        return this.name;
    }, yt.Elem.File.prototype.getSize = function() {
        return this.size;
    }, yt.Elem.File.prototype.getSenderId = function() {
        return this.senderId;
    }, yt.Elem.File.prototype.getDownUrl = function() {
        return this.downUrl;
    }, yt.Elem.File.prototype.getDownFlag = function() {
        return this.downFlag;
    }, yt.Elem.File.prototype.toHtml = function() {
        var e, t;
        return e = this.size, t = "Byte", this.size >= 1024 && (e = Math.round(this.size / 1024), 
        t = "KB"), '<a href="javascript" onclick="webim.onDownFile("' + this.uuid + '")" title="点击下载文件" ><i class="glyphicon glyphicon-file">&nbsp;' + this.name + "(" + e + t + ")</i></a>";
    }, yt.Elem.GroupTip = function(e, t, n, o, i) {
        this.opType = e, this.opUserId = t, this.groupId = n, this.groupName = o, this.userIdList = i || [], 
        this.groupInfoList = [], this.memberInfoList = [], this.groupMemberNum = null;
    }, yt.Elem.GroupTip.prototype.addGroupInfo = function(e) {
        this.groupInfoList.push(e);
    }, yt.Elem.GroupTip.prototype.addMemberInfo = function(e) {
        this.memberInfoList.push(e);
    }, yt.Elem.GroupTip.prototype.getOpType = function() {
        return this.opType;
    }, yt.Elem.GroupTip.prototype.getOpUserId = function() {
        return this.opUserId;
    }, yt.Elem.GroupTip.prototype.getGroupId = function() {
        return this.groupId;
    }, yt.Elem.GroupTip.prototype.getGroupName = function() {
        return this.groupName;
    }, yt.Elem.GroupTip.prototype.getUserIdList = function() {
        return this.userIdList;
    }, yt.Elem.GroupTip.prototype.getGroupInfoList = function() {
        return this.groupInfoList;
    }, yt.Elem.GroupTip.prototype.getMemberInfoList = function() {
        return this.memberInfoList;
    }, yt.Elem.GroupTip.prototype.getGroupMemberNum = function() {
        return this.groupMemberNum;
    }, yt.Elem.GroupTip.prototype.setGroupMemberNum = function(e) {
        return this.groupMemberNum = e;
    }, yt.Elem.GroupTip.prototype.toHtml = function() {
        var e = "[群提示消息]";
        switch (this.opType) {
          case G.JOIN:
            e += this.opUserId + "邀请了";
            for (var t in this.userIdList) if (e += this.userIdList[t] + ",", this.userIdList.length > 10 && 9 == t) {
                e += "等" + this.userIdList.length + "人";
                break;
            }
            e += "加入该群";
            break;

          case G.QUIT:
            e += this.opUserId + "主动退出该群";
            break;

          case G.KICK:
            e += this.opUserId + "将";
            for (var t in this.userIdList) if (e += this.userIdList[t] + ",", this.userIdList.length > 10 && 9 == t) {
                e += "等" + this.userIdList.length + "人";
                break;
            }
            e += "踢出该群";
            break;

          case G.SET_ADMIN:
            e += this.opUserId + "将";
            for (var t in this.userIdList) if (e += this.userIdList[t] + ",", this.userIdList.length > 10 && 9 == t) {
                e += "等" + this.userIdList.length + "人";
                break;
            }
            e += "设为管理员";
            break;

          case G.CANCEL_ADMIN:
            e += this.opUserId + "取消";
            for (var t in this.userIdList) if (e += this.userIdList[t] + ",", this.userIdList.length > 10 && 9 == t) {
                e += "等" + this.userIdList.length + "人";
                break;
            }
            e += "的管理员资格";
            break;

          case G.MODIFY_GROUP_INFO:
            e += this.opUserId + "修改了群资料：";
            for (var t in this.groupInfoList) {
                var n = this.groupInfoList[t].getType(), o = this.groupInfoList[t].getValue();
                switch (n) {
                  case O.FACE_URL:
                    e += "群头像为" + o + "; ";
                    break;

                  case O.NAME:
                    e += "群名称为" + o + "; ";
                    break;

                  case O.OWNER:
                    e += "群主为" + o + "; ";
                    break;

                  case O.NOTIFICATION:
                    e += "群公告为" + o + "; ";
                    break;

                  case O.INTRODUCTION:
                    e += "群简介为" + o + "; ";
                    break;

                  default:
                    e += "未知信息为:type=" + n + ",value=" + o + "; ";
                }
            }
            break;

          case G.MODIFY_MEMBER_INFO:
            e += this.opUserId + "修改了群成员资料:";
            for (var t in this.memberInfoList) {
                var i = this.memberInfoList[t].getUserId(), r = this.memberInfoList[t].getShutupTime();
                if (e += i + ": ", e += null != r && void 0 !== r ? 0 == r ? "取消禁言; " : "禁言" + r + "秒; " : " shutupTime为空", 
                this.memberInfoList.length > 10 && 9 == t) {
                    e += "等" + this.memberInfoList.length + "人";
                    break;
                }
            }
            break;

          case G.READED:
            Log.info("消息已读同步");
            break;

          default:
            e += "未知群提示消息类型：type=" + this.opType;
        }
        return e;
    }, yt.Elem.GroupTip.GroupInfo = function(e, t) {
        this.type = e, this.value = t;
    }, yt.Elem.GroupTip.GroupInfo.prototype.getType = function() {
        return this.type;
    }, yt.Elem.GroupTip.GroupInfo.prototype.getValue = function() {
        return this.value;
    }, yt.Elem.GroupTip.MemberInfo = function(e, t) {
        this.userId = e, this.shutupTime = t;
    }, yt.Elem.GroupTip.MemberInfo.prototype.getUserId = function() {
        return this.userId;
    }, yt.Elem.GroupTip.MemberInfo.prototype.getShutupTime = function() {
        return this.shutupTime;
    }, yt.Elem.Custom = function(e, t, n) {
        this.data = e, this.desc = t, this.ext = n;
    }, yt.Elem.Custom.prototype.getData = function() {
        return this.data;
    }, yt.Elem.Custom.prototype.getDesc = function() {
        return this.desc;
    }, yt.Elem.Custom.prototype.getExt = function() {
        return this.ext;
    }, yt.Elem.Custom.prototype.toHtml = function() {
        return this.data;
    };
    var ht = new function() {
        var t = {}, n = [];
        e = {}, this.cookie = "", this.syncFlag = 0;
        var o = function(e) {
            for (var n in t) e(t[n]);
        }, i = function(t) {
            var n = !1, o = t.sess._impl.skey, i = t.isSend + t.seq + t.random;
            return e[o] && e[o][i] && (n = !0), e[o] ? e[o][i] = {
                time: t.time
            } : (e[o] = {}, e[o][i] = {
                time: t.time
            }), n;
        };
        this.sessMap = function() {
            return t;
        }, this.sessCount = function() {
            return n.length;
        }, this.sessByTypeId = function(e, n) {
            var o = Et.skey(e, n);
            return void 0 === o || null == o ? null : t[o];
        }, this.delSessByTypeId = function(n, o) {
            var i = Et.skey(n, o);
            return void 0 !== i && null != i && (t[i] && (delete t[i], delete e[i]), !0);
        }, this.resetCookieAndSyncFlag = function() {
            this.cookie = "", this.syncFlag = 0;
        }, this.setAutoRead = function(e, t, n) {
            if (n && o(function(e) {
                e._impl.isAutoRead = !1;
            }), e && (e._impl.isAutoRead = t, t)) if (e._impl.unread = 0, e._impl.type == l.C2C) {
                var i = [];
                i.push(new _t(e._impl.id, e._impl.time)), Oe(ht.cookie, i, function(e) {
                    re.info("[setAutoRead]: c2CMsgReaded success");
                }, function(e) {
                    re.error("[setAutoRead}: c2CMsgReaded failed:" + e.ErrorInfo);
                });
            } else if (e._impl.type == l.GROUP) {
                var r = {
                    GroupId: e._impl.id,
                    MsgReadedSeq: e._impl.curMaxMsgSeq
                };
                $e(r, function(e) {
                    re.info("groupMsgReaded success");
                }, function(e) {
                    re.error("groupMsgReaded failed:" + e.ErrorInfo);
                });
            }
        }, this.c2CMsgReaded = function(e, t, n) {
            var o = [];
            o.push(new _t(e.To_Account, e.LastedMsgTime)), Oe(ht.cookie, o, function(e) {
                t && (re.info("c2CMsgReaded success"), t(e));
            }, function(e) {
                n && (re.error("c2CMsgReaded failed:" + e.ErrorInfo), n(e));
            });
        }, this.addSession = function(e) {
            t[e._impl.skey] = e;
        }, this.delSession = function(e) {
            delete t[e._impl.skey];
        }, this.addMsg = function(e) {
            if (i(e)) return !1;
            var n = e.sess;
            return t[n._impl.skey] || this.addSession(n), n._impl_addMsg(e), !0;
        }, this.updateTimeline = function() {
            var e = new Array();
            o(function(t) {
                e.push(t);
            }), e.sort(function(e, t) {
                return t.time - e.time;
            }), n = e;
        };
    }(), Ct = new function() {
        var e = null, t = null, n = {
            1: null,
            2: null,
            3: null,
            4: null,
            5: null,
            6: null,
            7: null,
            8: null,
            9: null,
            10: null,
            11: null,
            15: null,
            255: null
        }, o = {
            1: null,
            2: null,
            3: null,
            4: null,
            5: null,
            6: null,
            7: null,
            8: null
        }, i = {
            1: null
        }, r = !1, s = 0, u = 0, a = null, c = !1, p = 0, f = 90, m = null, I = {}, M = 0, E = {}, _ = {};
        this.setLongPollingOn = function(e) {
            r = e;
        }, this.getLongPollingOn = function() {
            return r;
        }, this.resetLongPollingInfo = function() {
            r = !1, s = 0, u = 0;
        }, this.setBigGroupLongPollingOn = function(e) {
            c = e;
        }, this.setBigGroupLongPollingKey = function(e) {
            m = e;
        }, this.resetBigGroupLongPollingInfo = function() {
            c = !1, p = 0, m = null, I = {};
        }, this.setBigGroupLongPollingMsgMap = function(e, t) {
            var n = I[e];
            n ? (n = parseInt(n) + t, I[e] = n) : I[e] = t;
        }, this.clear = function() {
            t = null, n = {
                1: null,
                2: null,
                3: null,
                4: null,
                5: null,
                6: null,
                7: null,
                8: null,
                9: null,
                10: null,
                11: null,
                15: null,
                255: null
            }, o = {
                1: null,
                2: null,
                3: null,
                4: null,
                5: null,
                6: null,
                7: null,
                8: null
            }, i = {
                1: null
            }, e = null, r = !1, s = 0, u = 0, a = null, c = !1, p = 0, m = null, I = {}, _ = {}, 
            H = [], Y = null, X = null;
        };
        var y = function(e, t) {
            dt(function(t) {
                H = t.IpList, Y = t.AuthKey, X = t.ExpireTime, e && e(t);
            }, function(e) {
                re.error("initIpAndAuthkey failed:" + e.ErrorInfo), t && t(e);
            });
        }, C = function(e, t) {
            var n = {
                Member_Account: j.identifier,
                Limit: 1e3,
                Offset: 0,
                GroupBaseInfoFilter: [ "NextMsgSeq" ]
            };
            Ye(n, function(t) {
                if (!t.GroupIdList || 0 == t.GroupIdList.length) return re.info("initMyGroupMaxSeqs: 目前还没有加入任何群组"), 
                void (e && e(t));
                for (var n = 0; n < t.GroupIdList.length; n++) {
                    var o = t.GroupIdList[n].GroupId, i = t.GroupIdList[n].NextMsgSeq - 1;
                    E[o] = i;
                }
                e && e(t);
            }, function(e) {
                re.error("initMyGroupMaxSeqs failed:" + e.ErrorInfo), t && t(e);
            });
        }, N = function(e, t, n) {
            M++;
            var o = {
                GroupId: e,
                ReqMsgSeq: t,
                ReqMsgNumber: n
            };
            re.warn("第" + M + "次补齐群消息,参数=" + JSON.stringify(o)), Ct.syncGroupMsgs(o);
        }, b = function(e, t) {
            var n = E[e];
            n ? t > n && (E[e] = t) : E[e] = t;
        }, B = function(e, t) {
            for (var n in e) {
                var o = e[n];
                if (o.From_Account) {
                    var i = oe(o, !1, !0);
                    i && t.push(i), b(o.ToGroupId, o.MsgSeq);
                }
            }
            return t;
        }, K = function(t, n) {
            var o = {}, i = [];
            for (var r in n) {
                var s = o[n[r].ToGroupId];
                s || (s = o[n[r].ToGroupId] = {
                    min: 99999999,
                    max: -1,
                    msgs: []
                }), n[r].NoticeSeq > u && (re.warn("noticeSeq=" + u + ",msgNoticeSeq=" + n[r].NoticeSeq), 
                u = n[r].NoticeSeq), n[r].Event = t, o[n[r].ToGroupId].msgs.push(n[r]), n[r].MsgSeq < s.min && (o[n[r].ToGroupId].min = n[r].MsgSeq), 
                n[r].MsgSeq > s.max && (o[n[r].ToGroupId].max = n[r].MsgSeq);
            }
            for (var a in o) {
                var c = o[a].max - o[a].min + 1, l = E[a];
                l ? o[a].min - l > 1 || o[a].msgs.length < c ? (re.warn("发起一次补齐群消息请求,curMaxMsgSeq=" + l + ", minMsgSeq=" + o[a].min + ", maxMsgSeq=" + o[a].max + ", msgs.length=" + o[a].msgs.length + ", tempCount=" + c), 
                N(a, o[a].max, o[a].max - l), b(a, o[a].max)) : i = B(o[a].msgs, i) : (re.warn("不存在该群的最大消息seq，群id=" + a), 
                o[a].msgs.length < c ? (re.warn("发起一次补齐群消息请求,minMsgSeq=" + o[a].min + ", maxMsgSeq=" + o[a].max + ", msgs.length=" + o[a].msgs.length + ", tempCount=" + c), 
                N(a, o[a].max, c), b(a, o[a].max)) : i = B(o[a].msgs, i));
            }
            i.length && ht.updateTimeline(), e && i.length && e(i);
        }, z = function(t, n) {
            var o = {}, i = [];
            for (var r in n) {
                var s = o[n[r].ToGroupId];
                s || (s = o[n[r].ToGroupId] = {
                    min: 99999999,
                    max: -1,
                    msgs: []
                }), n[r].NoticeSeq > u && (re.warn("noticeSeq=" + u + ",msgNoticeSeq=" + n[r].NoticeSeq), 
                u = n[r].NoticeSeq), n[r].Event = t, o[n[r].ToGroupId].msgs.push(n[r]), n[r].MsgSeq < s.min && (o[n[r].ToGroupId].min = n[r].MsgSeq), 
                n[r].MsgSeq > s.max && (o[n[r].ToGroupId].max = n[r].MsgSeq);
            }
            for (var a in o) {
                var c = o[a].max - o[a].min + 1, l = E[a];
                l ? o[a].min - l > 1 || o[a].msgs.length < c ? (re.warn("发起一次补齐群消息请求,curMaxMsgSeq=" + l + ", minMsgSeq=" + o[a].min + ", maxMsgSeq=" + o[a].max + ", msgs.length=" + o[a].msgs.length + ", tempCount=" + c), 
                N(a, o[a].max, o[a].max - l), b(a, o[a].max)) : i = B(o[a].msgs, i) : (re.warn("不存在该群的最大消息seq，群id=" + a), 
                o[a].msgs.length < c ? (re.warn("发起一次补齐群消息请求,minMsgSeq=" + o[a].min + ", maxMsgSeq=" + o[a].max + ", msgs.length=" + o[a].msgs.length + ", tempCount=" + c), 
                N(a, o[a].max, c), b(a, o[a].max)) : i = B(o[a].msgs, i));
            }
            i.length && ht.updateTimeline(), e && i.length && e(i);
        }, V = function(e, t) {
            for (var o in e) {
                var i = e[o], r = i.MsgBody, s = r.ReportType;
                0 == t && i.NoticeSeq && i.NoticeSeq > u && (u = i.NoticeSeq);
                i.GroupInfo.To_Account;
                if (t) {
                    var a = i.ToGroupId + "_" + s + "_" + r.Operator_Account;
                    if (_[a]) {
                        re.warn("收到重复的群系统消息：key=" + a);
                        continue;
                    }
                    _[a] = !0;
                }
                var c = {
                    SrcFlag: 0,
                    ReportType: s,
                    GroupId: i.ToGroupId,
                    GroupName: i.GroupInfo.GroupName,
                    Operator_Account: r.Operator_Account,
                    MsgTime: i.MsgTimeStamp,
                    groupReportTypeMsg: r
                };
                switch (s) {
                  case F.JOIN_GROUP_REQUEST:
                    c.RemarkInfo = r.RemarkInfo, c.MsgKey = r.MsgKey, c.Authentication = r.Authentication, 
                    c.UserDefinedField = i.UserDefinedField, c.From_Account = i.From_Account, c.MsgSeq = i.ClientSeq, 
                    c.MsgRandom = i.MsgRandom;
                    break;

                  case F.JOIN_GROUP_ACCEPT:
                  case F.JOIN_GROUP_REFUSE:
                    c.RemarkInfo = r.RemarkInfo;
                    break;

                  case F.KICK:
                  case F.DESTORY:
                  case F.CREATE:
                  case F.INVITED_JOIN_GROUP_REQUEST:
                  case F.QUIT:
                  case F.SET_ADMIN:
                  case F.CANCEL_ADMIN:
                  case F.REVOKE:
                  case F.READED:
                    break;

                  case F.CUSTOM:
                    c.MsgSeq = i.MsgSeq, c.UserDefinedField = r.UserDefinedField;
                    break;

                  default:
                    re.error("未知群系统消息类型：reportType=" + s);
                }
                t ? s == F.JOIN_GROUP_REQUEST && n[s] && n[s](c) : n[s] && n[s](c);
            }
        }, J = function(e, t) {
            var n, i, r;
            for (var s in e) {
                switch (n = e[s], i = n.PushType, 0 == t && n.NoticeSeq && n.NoticeSeq > u && (u = n.NoticeSeq), 
                r = {
                    Type: i
                }, i) {
                  case R.FRIEND_ADD:
                    r.Accounts = n.FriendAdd_Account;
                    break;

                  case R.FRIEND_DELETE:
                    r.Accounts = n.FriendDel_Account;
                    break;

                  case R.PENDENCY_ADD:
                    r.PendencyList = n.PendencyAdd;
                    break;

                  case R.PENDENCY_DELETE:
                    r.Accounts = n.FrienPencydDel_Account;
                    break;

                  case R.BLACK_LIST_ADD:
                    r.Accounts = n.BlackListAdd_Account;
                    break;

                  case R.BLACK_LIST_DELETE:
                    r.Accounts = n.BlackListDel_Account;
                    break;

                  default:
                    re.error("未知好友系统通知类型：friendNotice=" + JSON.stringify(n));
                }
                t ? i == R.PENDENCY_ADD && o[i] && o[i](r) : o[i] && o[i](r);
            }
        }, W = function(e, t) {
            var n, o, r;
            for (var s in e) {
                switch (n = e[s], o = n.PushType, 0 == t && n.NoticeSeq && n.NoticeSeq > u && (u = n.NoticeSeq), 
                r = {
                    Type: o
                }, o) {
                  case v.PROFILE_MODIFY:
                    r.Profile_Account = n.Profile_Account, r.ProfileList = n.ProfileList;
                    break;

                  default:
                    re.error("未知资料系统通知类型：profileNotice=" + JSON.stringify(n));
                }
                t ? o == v.PROFILE_MODIFY && i[o] && i[o](r) : i[o] && i[o](r);
            }
        }, Q = function(e) {
            var t = e.MsgBody, o = t.ReportType, i = (e.GroupInfo.To_Account, {
                SrcFlag: 1,
                ReportType: o,
                GroupId: e.ToGroupId,
                GroupName: e.GroupInfo.GroupName,
                Operator_Account: t.Operator_Account,
                MsgTime: e.MsgTimeStamp
            });
            switch (o) {
              case F.JOIN_GROUP_REQUEST:
                i.RemarkInfo = t.RemarkInfo, i.MsgKey = t.MsgKey, i.Authentication = t.Authentication, 
                i.UserDefinedField = e.UserDefinedField, i.From_Account = e.From_Account, i.MsgSeq = e.ClientSeq, 
                i.MsgRandom = e.MsgRandom;
                break;

              case F.JOIN_GROUP_ACCEPT:
              case F.JOIN_GROUP_REFUSE:
                i.RemarkInfo = t.RemarkInfo;
                break;

              case F.KICK:
              case F.DESTORY:
              case F.CREATE:
              case F.INVITED_JOIN_GROUP_REQUEST:
              case F.QUIT:
              case F.SET_ADMIN:
              case F.CANCEL_ADMIN:
              case F.REVOKE:
                break;

              case F.CUSTOM:
                i.MsgSeq = e.MsgSeq, i.UserDefinedField = t.UserDefinedField;
                break;

              default:
                re.error("未知群系统消息类型：reportType=" + o);
            }
            n[o] && n[o](i);
        }, $ = function(e) {
            for (var t = 0, n = e.length; t < n; t++) Z(e[t]);
        }, Z = function(e) {
            var t = e.SubMsgType;
            switch (t) {
              case T.READED:
                break;

              default:
                re.error("未知C2c系统消息：reportType=" + reportType);
            }
            onC2cEventCallbacks[t] && onC2cEventCallbacks[t](e);
        };
        this.longPolling = function(e, t) {
            function n() {
                Ae(o, function(e) {
                    for (var t in e.EventArray) {
                        var n = e.EventArray[t];
                        switch (n.Event) {
                          case h.C2C:
                            s = n.NotifySeq, re.warn("longpolling: received new c2c msg"), Ct.syncMsgs();
                            break;

                          case h.GROUP_COMMON:
                            re.warn("longpolling: received new group msgs"), z(n.Event, n.GroupMsgArray);
                            break;

                          case h.GROUP_TIP:
                            re.warn("longpolling: received new group tips"), z(n.Event, n.GroupTips);
                            break;

                          case h.GROUP_SYSTEM:
                            re.warn("longpolling: received new group system msgs"), V(n.GroupTips, !1);
                            break;

                          case h.FRIEND_NOTICE:
                            re.warn("longpolling: received new friend system notice"), J(n.FriendListMod, !1);
                            break;

                          case h.PROFILE_NOTICE:
                            re.warn("longpolling: received new profile system notice"), W(n.ProfileDataMod, !1);
                            break;

                          case h.C2C_COMMON:
                            u = n.C2cMsgArray[0].NoticeSeq, re.warn("longpolling: received new c2c_common msg", u), 
                            K(n.Event, n.C2cMsgArray);
                            break;

                          case h.C2C_EVENT:
                            u = n.C2cNotifyMsgArray[0].NoticeSeq, re.warn("longpolling: received new c2c_event msg"), 
                            $(n.C2cNotifyMsgArray);
                            break;

                          default:
                            re.error("longpolling收到未知新消息类型: Event=" + n.Event);
                        }
                    }
                    var o = {
                        ActionStatus: d.OK,
                        ErrorCode: 0
                    };
                    ee(o);
                }, function(e) {
                    ee(e), t && t(e);
                });
            }
            var o = {
                Timeout: w / 1e3,
                Cookie: {
                    NotifySeq: s,
                    NoticeSeq: u
                }
            };
            q ? (o.Cookie.LongPollingId = q, n()) : mt(0, function(e) {
                q = o.Cookie.LongPollingId = e.LongPollingId, w = e.Timeout > 60 ? w : 1e3 * e.Timeout, 
                n();
            });
        }, this.bigGroupLongPolling = function(e, t) {
            Se({
                StartSeq: p,
                HoldTime: f,
                Key: m
            }, function(t) {
                var n = [];
                if (p = t.NextSeq, f = t.HoldTime, m = t.Key, t.RspMsgList && t.RspMsgList.length > 0) {
                    for (var o, i, r, s = 0, u = t.RspMsgList.length - 1; u >= 0; u--) if (!(o = t.RspMsgList[u]).IsPlaceMsg && o.From_Account && o.MsgBody && 0 != o.MsgBody.length) switch (i = o.Event) {
                      case h.GROUP_COMMON:
                        re.info("bigGroupLongPolling: return new group msg"), (r = oe(o, !1, !1)) && n.push(r), 
                        s += 1;
                        break;

                      case h.GROUP_TIP:
                      case h.GROUP_TIP2:
                        re.info("bigGroupLongPolling: return new group tip"), (r = oe(o, !1, !1)) && n.push(r);
                        break;

                      case h.GROUP_SYSTEM:
                        re.info("bigGroupLongPolling: new group system msg"), Q(o);
                        break;

                      default:
                        re.error("bigGroupLongPolling收到未知新消息类型: Event=" + i);
                    }
                    s > 0 && (Ct.setBigGroupLongPollingMsgMap(o.ToGroupId, s), re.warn("current bigGroupLongPollingMsgMap: " + JSON.stringify(I)));
                }
                x = 0;
                var l = {
                    ActionStatus: d.OK,
                    ErrorCode: P.ON,
                    ErrorInfo: "connection is ok..."
                };
                Mt.callBack(l), e ? e(n) : a && a(n), c && Ct.bigGroupLongPolling();
            }, function(e) {
                if (60008 != e.ErrorCode && (re.error(e.ErrorInfo), x++), 91101 == e.ErrorCode && (re.error("多实例登录，被kick"), 
                onKickedEventCall && onKickedEventCall()), x < 10) c && Ct.bigGroupLongPolling(); else {
                    var n = {
                        ActionStatus: d.FAIL,
                        ErrorCode: P.OFF,
                        ErrorInfo: "connection is off"
                    };
                    Mt.callBack(n);
                }
                t && t(e);
            }, 1e3 * f);
        };
        var ee = function(e) {
            if (0 == e.ErrorCode || 60008 == e.ErrorCode) {
                k = 0, D = !1;
                var t, n = !1;
                switch (U) {
                  case P.INIT:
                    n = !0, U = P.ON, t = "create connection successfully(INIT->ON)";
                    break;

                  case P.ON:
                    t = "connection is on...(ON->ON)";
                    break;

                  case P.RECONNECT:
                    U = P.ON, t = "connection is on...(RECONNECT->ON)";
                    break;

                  case P.OFF:
                    n = !0, U = P.RECONNECT, t = "reconnect successfully(OFF->RECONNECT)";
                }
                var o = {
                    ActionStatus: d.OK,
                    ErrorCode: U,
                    ErrorInfo: t
                };
                n && Mt.callBack(o), r && Ct.longPolling();
            } else if (91101 == e.ErrorCode) re.error("多实例登录，被kick"), onKickedEventCall && onKickedEventCall(); else if (k++, 
            re.warn("longPolling接口第" + k + "次报错: " + e.ErrorInfo), k <= 10) setTimeout(te, 100); else {
                U = P.OFF;
                var i = {
                    ActionStatus: d.FAIL,
                    ErrorCode: P.OFF,
                    ErrorInfo: "connection is off"
                };
                0 == D && Mt.callBack(i), D = !0, re.warn("5000毫秒之后,SDK会发起新的longPolling请求..."), 
                setTimeout(te, 5e3);
            }
        }, K = function(t, n) {
            var o = [];
            msgInfos = n;
            for (var i in msgInfos) {
                var r, s, u, a = msgInfos[i];
                a.From_Account == j.identifier ? (r = !0, s = a.To_Account, u = "") : (r = !1, s = a.From_Account, 
                u = "");
                var c = ht.sessByTypeId(l.C2C, s);
                c || (c = new Et(l.C2C, s, s, u, 0, 0));
                var p = new yt(c, r, a.MsgSeq, a.MsgRandom, a.MsgTimeStamp, a.From_Account), f = null, d = null, m = null;
                for (var I in a.MsgBody) {
                    switch (f = a.MsgBody[I], m = f.MsgType) {
                      case g.TEXT:
                        d = new yt.Elem.Text(f.MsgContent.Text);
                        break;

                      case g.FACE:
                        d = new yt.Elem.Face(f.MsgContent.Index, f.MsgContent.Data);
                        break;

                      case g.IMAGE:
                        d = new yt.Elem.Images(f.MsgContent.UUID);
                        for (var M in f.MsgContent.ImageInfoArray) {
                            var E = f.MsgContent.ImageInfoArray[M];
                            d.addImage(new yt.Elem.Images.Image(E.Type, E.Size, E.Width, E.Height, E.URL));
                        }
                        break;

                      case g.SOUND:
                        f.MsgContent ? d = new yt.Elem.Sound(f.MsgContent.UUID, f.MsgContent.Second, f.MsgContent.Size, a.From_Account, a.To_Account, f.MsgContent.Download_Flag, l.C2C) : (m = g.TEXT, 
                        d = new yt.Elem.Text("[语音消息]下载地址解析出错"));
                        break;

                      case g.LOCATION:
                        d = new yt.Elem.Location(f.MsgContent.Longitude, f.MsgContent.Latitude, f.MsgContent.Desc);
                        break;

                      case g.FILE:
                      case g.FILE + " ":
                        m = g.FILE, f.MsgContent ? d = new yt.Elem.File(f.MsgContent.UUID, f.MsgContent.FileName, f.MsgContent.FileSize, a.From_Account, a.To_Account, f.MsgContent.Download_Flag, l.C2C) : (m = g.TEXT, 
                        d = new yt.Elem.Text("[文件消息下载地址解析出错]"));
                        break;

                      case g.CUSTOM:
                        try {
                            var _ = JSON.parse(f.MsgContent.Data);
                            if (_ && _.userAction && _.userAction == L.ING) continue;
                        } catch (e) {}
                        m = g.CUSTOM, d = new yt.Elem.Custom(f.MsgContent.Data, f.MsgContent.Desc, f.MsgContent.Ext);
                        break;

                      default:
                        m = g.TEXT, d = new yt.Elem.Text("web端暂不支持" + f.MsgType + "消息");
                    }
                    p.elems.push(new yt.Elem(m, d));
                }
                p.elems.length > 0 && ht.addMsg(p) && o.push(p);
            }
            o.length > 0 && ht.updateTimeline(), o.length > 0 && e && e(o);
        }, te = function() {
            r && Ct.longPolling();
        }, ne = function(e) {
            for (var t in e) {
                var n = e[t];
                switch (n.Event) {
                  case h.GROUP_SYSTEM:
                    re.warn("handlerApplyJoinGroupSystemMsgs： handler new group system msg"), V(n.GroupTips, !0);
                    break;

                  default:
                    re.error("syncMsgs收到未知的群系统消息类型: Event=" + n.Event);
                }
            }
        };
        this.syncMsgs = function(t, n) {
            var o = [], i = [];
            Ge(ht.cookie, ht.syncFlag, function(n) {
                2 == n.SyncFlag && (ht.syncFlag = 0), i = n.MsgList, ht.cookie = n.Cookie;
                for (var r in i) {
                    var s, u, a, c = i[r];
                    c.From_Account == j.identifier ? (s = !0, u = c.To_Account, a = "") : (s = !1, u = c.From_Account, 
                    a = "");
                    var p = ht.sessByTypeId(l.C2C, u);
                    p || (p = new Et(l.C2C, u, u, a, 0, 0));
                    var f = new yt(p, s, c.MsgSeq, c.MsgRandom, c.MsgTimeStamp, c.From_Account), d = null, m = null, I = null;
                    for (var M in c.MsgBody) {
                        switch (d = c.MsgBody[M], I = d.MsgType) {
                          case g.TEXT:
                            m = new yt.Elem.Text(d.MsgContent.Text);
                            break;

                          case g.FACE:
                            m = new yt.Elem.Face(d.MsgContent.Index, d.MsgContent.Data);
                            break;

                          case g.IMAGE:
                            m = new yt.Elem.Images(d.MsgContent.UUID);
                            for (var E in d.MsgContent.ImageInfoArray) {
                                var _ = d.MsgContent.ImageInfoArray[E];
                                m.addImage(new yt.Elem.Images.Image(_.Type, _.Size, _.Width, _.Height, _.URL));
                            }
                            break;

                          case g.SOUND:
                            d.MsgContent ? m = new yt.Elem.Sound(d.MsgContent.UUID, d.MsgContent.Second, d.MsgContent.Size, c.From_Account, c.To_Account, d.MsgContent.Download_Flag, l.C2C) : (I = g.TEXT, 
                            m = new yt.Elem.Text("[语音消息]下载地址解析出错"));
                            break;

                          case g.LOCATION:
                            m = new yt.Elem.Location(d.MsgContent.Longitude, d.MsgContent.Latitude, d.MsgContent.Desc);
                            break;

                          case g.FILE:
                          case g.FILE + " ":
                            I = g.FILE, d.MsgContent ? m = new yt.Elem.File(d.MsgContent.UUID, d.MsgContent.FileName, d.MsgContent.FileSize, c.From_Account, c.To_Account, d.MsgContent.Download_Flag, l.C2C) : (I = g.TEXT, 
                            m = new yt.Elem.Text("[文件消息下载地址解析出错]"));
                            break;

                          case g.CUSTOM:
                            try {
                                var y = JSON.parse(d.MsgContent.Data);
                                if (y && y.userAction && y.userAction == L.ING) continue;
                            } catch (e) {}
                            I = g.CUSTOM, m = new yt.Elem.Custom(d.MsgContent.Data, d.MsgContent.Desc, d.MsgContent.Ext);
                            break;

                          default:
                            I = g.TEXT, m = new yt.Elem.Text("web端暂不支持" + d.MsgType + "消息");
                        }
                        f.elems.push(new yt.Elem(I, m));
                    }
                    f.elems.length > 0 && ht.addMsg(f) && o.push(f);
                }
                ne(n.EventArray), o.length > 0 && ht.updateTimeline(), t ? t(o) : o.length > 0 && e && e(o);
            }, function(e) {
                re.error("getMsgs failed:" + e.ErrorInfo), n && n(e);
            });
        }, this.getC2CHistoryMsgs = function(e, t, n) {
            if (console.log("为什么不进来啊"), e.Peer_Account || !n) if (e.MaxCnt || (e.MaxCnt = 15), 
            e.MaxCnt <= 0 && n) n(ie.getReturnError("MaxCnt should be greater than 0", -14)); else if (e.MaxCnt > 15) {
                if (n) return void n(ie.getReturnError("MaxCnt can not be greater than 15", -15));
            } else {
                null != e.MsgKey && void 0 !== e.MsgKey || (e.MsgKey = "");
                var o = {
                    Peer_Account: e.Peer_Account,
                    MaxCnt: e.MaxCnt,
                    LastMsgTime: e.LastMsgTime,
                    MsgKey: e.MsgKey
                };
                Re(o, function(n) {
                    var o = [];
                    msgInfos = n.MsgList;
                    var i = ht.sessByTypeId(l.C2C, e.Peer_Account);
                    i || (i = new Et(l.C2C, e.Peer_Account, e.Peer_Account, "", 0, 0));
                    for (var r in msgInfos) {
                        var s, u = msgInfos[r];
                        u.From_Account == j.identifier ? (s = !0, u.To_Account, "") : (s = !1, u.From_Account, 
                        "");
                        var a = new yt(i, s, u.MsgSeq, u.MsgRandom, u.MsgTimeStamp, u.From_Account), c = null, p = null, f = null;
                        for (var d in u.MsgBody) {
                            switch (c = u.MsgBody[d], f = c.MsgType) {
                              case g.TEXT:
                                p = new yt.Elem.Text(c.MsgContent.Text);
                                break;

                              case g.FACE:
                                p = new yt.Elem.Face(c.MsgContent.Index, c.MsgContent.Data);
                                break;

                              case g.IMAGE:
                                p = new yt.Elem.Images(c.MsgContent.UUID);
                                for (var m in c.MsgContent.ImageInfoArray) {
                                    var I = c.MsgContent.ImageInfoArray[m];
                                    p.addImage(new yt.Elem.Images.Image(I.Type, I.Size, I.Width, I.Height, I.URL));
                                }
                                break;

                              case g.SOUND:
                                c.MsgContent ? p = new yt.Elem.Sound(c.MsgContent.UUID, c.MsgContent.Second, c.MsgContent.Size, u.From_Account, u.To_Account, c.MsgContent.Download_Flag, l.C2C) : (f = g.TEXT, 
                                p = new yt.Elem.Text("[语音消息]下载地址解析出错"));
                                break;

                              case g.LOCATION:
                                p = new yt.Elem.Location(c.MsgContent.Longitude, c.MsgContent.Latitude, c.MsgContent.Desc);
                                break;

                              case g.FILE:
                              case g.FILE + " ":
                                f = g.FILE, c.MsgContent ? p = new yt.Elem.File(c.MsgContent.UUID, c.MsgContent.FileName, c.MsgContent.FileSize, u.From_Account, u.To_Account, c.MsgContent.Download_Flag, l.C2C) : (f = g.TEXT, 
                                p = new yt.Elem.Text("[文件消息下载地址解析出错]"));
                                break;

                              case g.CUSTOM:
                                f = g.CUSTOM, p = new yt.Elem.Custom(c.MsgContent.Data, c.MsgContent.Desc, c.MsgContent.Ext);
                                break;

                              default:
                                f = g.TEXT, p = new yt.Elem.Text("web端暂不支持" + c.MsgType + "消息");
                            }
                            a.elems.push(new yt.Elem(f, p));
                        }
                        ht.addMsg(a), o.push(a);
                    }
                    if (ht.updateTimeline(), t) {
                        var M = {
                            Complete: n.Complete,
                            MsgCount: o.length,
                            LastMsgTime: n.LastMsgTime,
                            MsgKey: n.MsgKey,
                            MsgList: o
                        };
                        i.isFinished(n.Complete), t(M);
                    }
                }, function(e) {
                    re.error("getC2CHistoryMsgs failed:" + e.ErrorInfo), n && n(e);
                });
            } else n(ie.getReturnError("Peer_Account is empty", -13));
        }, this.syncGroupMsgs = function(t, n, o) {
            if (t.ReqMsgSeq <= 0) {
                if (o) {
                    var i = ie.getReturnError("ReqMsgSeq must be greater than 0", -16);
                    o(i);
                }
            } else {
                var r = {
                    GroupId: t.GroupId,
                    ReqMsgSeq: t.ReqMsgSeq,
                    ReqMsgNumber: t.ReqMsgNumber
                };
                Qe(r, function(t) {
                    var o = [], i = (t.GroupId, t.RspMsgList), r = t.IsFinished;
                    if (null != i && void 0 !== i) {
                        for (var s = i.length - 1; s >= 0; s--) {
                            var u = i[s];
                            if (!u.IsPlaceMsg && u.From_Account && u.MsgBody && 0 != u.MsgBody.length) {
                                var a = oe(u, !0, !0, r);
                                a && o.push(a);
                            }
                        }
                        o.length > 0 && ht.updateTimeline(), n ? n(o) : o.length > 0 && e && e(o);
                    } else n && n([]);
                }, function(e) {
                    re.error("getGroupMsgs failed:" + e.ErrorInfo), o && o(e);
                });
            }
        };
        var oe = function(e, n, o, i) {
            if (e.IsPlaceMsg || !e.From_Account || !e.MsgBody || 0 == e.MsgBody.length) return null;
            var r, s, u, a = e.ToGroupId, c = a;
            e.GroupInfo && e.GroupInfo.GroupName && (c = e.GroupInfo.GroupName), u = e.From_Account, 
            e.GroupInfo && e.GroupInfo.From_AccountNick && (u = e.GroupInfo.From_AccountNick), 
            e.From_Account == j.identifier ? (r = !0, e.From_Account, s = "") : (r = !1, e.From_Account, 
            s = "");
            var p = ht.sessByTypeId(l.GROUP, a);
            p || (p = new Et(l.GROUP, a, c, s, 0, 0)), void 0 !== i && p.isFinished(i || 0);
            var f = A.COMMON;
            if (h.GROUP_TIP == e.Event || h.GROUP_TIP2 == e.Event) {
                f = A.TIP;
                var d = e.MsgBody;
                e.MsgBody = [], e.MsgBody.push({
                    MsgType: g.GROUP_TIP,
                    MsgContent: d
                });
            } else e.MsgPriority && (e.MsgPriority == S.REDPACKET ? f = A.REDPACKET : e.MsgPriority == S.LOVEMSG && (f = A.LOVEMSG));
            var m = new yt(p, r, e.MsgSeq, e.MsgRandom, e.MsgTimeStamp, e.From_Account, f, u), I = null, M = null, E = null;
            for (var _ in e.MsgBody) {
                switch (I = e.MsgBody[_], E = I.MsgType) {
                  case g.TEXT:
                    M = new yt.Elem.Text(I.MsgContent.Text);
                    break;

                  case g.FACE:
                    M = new yt.Elem.Face(I.MsgContent.Index, I.MsgContent.Data);
                    break;

                  case g.IMAGE:
                    M = new yt.Elem.Images(I.MsgContent.UUID);
                    for (var y in I.MsgContent.ImageInfoArray) M.addImage(new yt.Elem.Images.Image(I.MsgContent.ImageInfoArray[y].Type, I.MsgContent.ImageInfoArray[y].Size, I.MsgContent.ImageInfoArray[y].Width, I.MsgContent.ImageInfoArray[y].Height, I.MsgContent.ImageInfoArray[y].URL));
                    break;

                  case g.SOUND:
                    I.MsgContent ? M = new yt.Elem.Sound(I.MsgContent.UUID, I.MsgContent.Second, I.MsgContent.Size, e.From_Account, e.To_Account, I.MsgContent.Download_Flag, l.GROUP) : (E = g.TEXT, 
                    M = new yt.Elem.Text("[语音消息]下载地址解析出错"));
                    break;

                  case g.LOCATION:
                    M = new yt.Elem.Location(I.MsgContent.Longitude, I.MsgContent.Latitude, I.MsgContent.Desc);
                    break;

                  case g.FILE:
                  case g.FILE + " ":
                    E = g.FILE;
                    Ie(I.MsgContent.UUID, e.From_Account, I.MsgContent.FileName);
                    I.MsgContent ? M = new yt.Elem.File(I.MsgContent.UUID, I.MsgContent.FileName, I.MsgContent.FileSize, e.From_Account, e.To_Account, I.MsgContent.Download_Flag, l.GROUP) : (E = g.TEXT, 
                    M = new yt.Elem.Text("[文件消息]地址解析出错"));
                    break;

                  case g.GROUP_TIP:
                    var C = I.MsgContent.OpType;
                    if (M = new yt.Elem.GroupTip(C, I.MsgContent.Operator_Account, a, e.GroupInfo.GroupName, I.MsgContent.List_Account), 
                    G.JOIN == C || G.QUIT == C) M.setGroupMemberNum(I.MsgContent.MemberNum); else if (G.MODIFY_GROUP_INFO == C) {
                        var T = !1, F = {
                            GroupId: a,
                            GroupFaceUrl: null,
                            GroupName: null,
                            OwnerAccount: null,
                            GroupNotification: null,
                            GroupIntroduction: null
                        }, R = I.MsgContent.MsgGroupNewInfo;
                        if (R.GroupFaceUrl) {
                            var v = new yt.Elem.GroupTip.GroupInfo(O.FACE_URL, R.GroupFaceUrl);
                            M.addGroupInfo(v), T = !0, F.GroupFaceUrl = R.GroupFaceUrl;
                        }
                        if (R.GroupName) {
                            var N = new yt.Elem.GroupTip.GroupInfo(O.NAME, R.GroupName);
                            M.addGroupInfo(N), T = !0, F.GroupName = R.GroupName;
                        }
                        if (R.Owner_Account) {
                            var P = new yt.Elem.GroupTip.GroupInfo(O.OWNER, R.Owner_Account);
                            M.addGroupInfo(P), T = !0, F.OwnerAccount = R.Owner_Account;
                        }
                        if (R.GroupNotification) {
                            var b = new yt.Elem.GroupTip.GroupInfo(O.NOTIFICATION, R.GroupNotification);
                            M.addGroupInfo(b), T = !0, F.GroupNotification = R.GroupNotification;
                        }
                        if (R.GroupIntroduction) {
                            var L = new yt.Elem.GroupTip.GroupInfo(O.INTRODUCTION, R.GroupIntroduction);
                            M.addGroupInfo(L), T = !0, F.GroupIntroduction = R.GroupIntroduction;
                        }
                        0 == n && T && t && t(F);
                    } else if (G.MODIFY_MEMBER_INFO == C) {
                        var U = I.MsgContent.MsgMemberInfo;
                        for (var D in U) {
                            var k = U[D];
                            M.addMemberInfo(new yt.Elem.GroupTip.MemberInfo(k.User_Account, k.ShutupTime));
                        }
                    }
                    break;

                  case g.CUSTOM:
                    E = g.CUSTOM, M = new yt.Elem.Custom(I.MsgContent.Data, I.MsgContent.Desc, I.MsgContent.Ext);
                    break;

                  default:
                    E = g.TEXT, M = new yt.Elem.Text("web端暂不支持" + I.MsgType + "消息");
                }
                m.elems.push(new yt.Elem(E, M));
            }
            return 0 == o ? m : ht.addMsg(m) ? m : null;
        };
        this.init = function(s, u, c) {
            if (s.onMsgNotify || re.warn("listeners.onMsgNotify is empty"), e = s.onMsgNotify, 
            s.onBigGroupMsgNotify ? a = s.onBigGroupMsgNotify : re.warn("listeners.onBigGroupMsgNotify is empty"), 
            s.onC2cEventNotifys ? onC2cEventCallbacks = s.onC2cEventNotifys : re.warn("listeners.onC2cEventNotifys is empty"), 
            s.onGroupSystemNotifys ? n = s.onGroupSystemNotifys : re.warn("listeners.onGroupSystemNotifys is empty"), 
            s.onGroupInfoChangeNotify ? t = s.onGroupInfoChangeNotify : re.warn("listeners.onGroupInfoChangeNotify is empty"), 
            s.onFriendSystemNotifys ? o = s.onFriendSystemNotifys : re.warn("listeners.onFriendSystemNotifys is empty"), 
            s.onProfileSystemNotifys ? i = s.onProfileSystemNotifys : re.warn("listeners.onProfileSystemNotifys is empty"), 
            s.onKickedEventCall ? onKickedEventCall = s.onKickedEventCall : re.warn("listeners.onKickedEventCall is empty"), 
            s.onAppliedDownloadUrl ? onAppliedDownloadUrl = s.onAppliedDownloadUrl : re.warn("listeners.onAppliedDownloadUrl is empty"), 
            j.identifier && j.userSig) C(function(e) {
                re.info("initMyGroupMaxSeqs success"), y(function(e) {
                    if (re.info("initIpAndAuthkey success"), u) {
                        re.info("login success(have login state))");
                        var t = {
                            ActionStatus: d.OK,
                            ErrorCode: 0,
                            ErrorInfo: "login success"
                        };
                        u(t);
                    }
                    Ct.setLongPollingOn(!0), r && Ct.longPolling(u);
                }, c);
            }, c); else if (u) {
                var l = {
                    ActionStatus: d.OK,
                    ErrorCode: 0,
                    ErrorInfo: "login success(no login state)"
                };
                u(l);
            }
        }, this.sendMsg = function(e, t, n) {
            Te(e, function(o) {
                if (e.sess.type() == l.C2C) {
                    if (!ht.addMsg(e)) {
                        var i = "sendMsg: addMsg failed!", r = ie.getReturnError(i, -17);
                        return re.error(i), void (n && n(r));
                    }
                    ht.updateTimeline();
                }
                t && t(o);
            }, function(e) {
                n && n(e);
            });
        };
    }(), Tt = new function() {
        this.fileMd5 = null;
        var e = function(e, t, n) {
            function o() {
                var t = a * s, n = t + s >= e.size ? e.size : t + s, o = r.call(e, t, n);
                i.readAsArrayBuffer(o);
            }
            var i = null;
            try {
                i = new FileReader();
            } catch (e) {
                e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                if (n) return void n(ie.getReturnError("当前浏览器不支持FileReader", -18));
            }
            var r = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice;
            if (r || !n) {
                var s = 2097152, u = Math.ceil(e.size / s), a = 0, c = new SparkMD5();
                i.onload = function(e) {
                    for (var n = "", i = new Uint8Array(e.target.result), r = i.byteLength, s = 0; s < r; s++) n += String.fromCharCode(i[s]);
                    c.appendBinary(n), ++a < u ? o() : (this.fileMd5 = c.end(), t && t(this.fileMd5));
                }, o();
            } else n(ie.getReturnError("当前浏览器不支持FileAPI", -19));
        };
        this.submitUploadFileForm = function(e, t, n) {
            function o(e, t) {
                var n = document.createElement("input");
                n.type = "hidden", n.name = e, n.value = t, f.appendChild(n);
            }
            function i() {
                var e;
                try {
                    e = JSON.parse(m.contentWindow.name) || {};
                } catch (t) {
                    t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                    e = {};
                }
                e.ActionStatus ? (m.src = "about:blank", m.parentNode.removeChild(m), m = null, 
                e.ActionStatus == d.OK ? t && t(e) : n && n(e)) : setTimeout(i, 100);
            }
            var r, s, u = e.formId, a = e.fileId, c = "uploadResultIframe_" + J++, l = e.To_Account, p = e.businessType, f = document.getElementById(u);
            if (!f) return r = "获取表单对象为空: formId=" + u + "(formId非法)", s = ie.getReturnError(r, -20), 
            void (n && n(s));
            var g = document.getElementById(a);
            if (!g) return r = "获取文件对象为空: fileId=" + a + "(没有选择文件或者fileId非法)", s = ie.getReturnError(r, -21), 
            void (n && n(s));
            g.name = "file";
            var m = document.createElement("iframe");
            m.name = c, m.id = c, m.style.display = "none", document.body.appendChild(m);
            var M, E = "https://pic.tim.qq.com/v4/openpic/" + (M = de() ? "pic_up" : "pic_up_test") + "?tinyid=" + j.tinyid + "&a2=" + j.a2 + "&sdkappid=" + j.sdkAppID + "&accounttype=" + j.accountType + "&contenttype=http";
            f.action = E, f.method = "post", f.target = c, o("App_Version", y.APP_VERSION), 
            o("From_Account", j.identifier), o("To_Account", l), o("Seq", ue().toString()), 
            o("Timestamp", se().toString()), o("Random", ae().toString()), o("Busi_Id", p), 
            o("PkgFlag", I.RAW_DATA.toString()), o("Auth_Key", Y), o("Server_Ver", y.SERVER_VERSION.toString()), 
            o("File_Type", e.fileType), setTimeout(i, 500), f.submit();
        }, this.uploadFile = function(t, n, o) {
            var i = {
                init: function(e, t, n) {
                    var o = this;
                    o.file = e.file, o.onProgressCallBack = e.onProgressCallBack, e.abortButton && (e.abortButton.onclick = o.abortHandler), 
                    o.total = o.file.size, o.loaded = 0, o.step = 1105920, o.sliceSize = 0, o.sliceOffset = 0, 
                    o.timestamp = se(), o.seq = ue(), o.random = ae(), o.fromAccount = j.identifier, 
                    o.toAccount = e.To_Account, o.fileMd5 = e.fileMd5, o.businessType = e.businessType, 
                    o.fileType = e.fileType, o.cbOk = t, o.cbErr = n, o.reader = new FileReader(), o.blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice, 
                    o.reader.onloadstart = o.onLoadStart, o.reader.onprogress = o.onProgress, o.reader.onabort = o.onAbort, 
                    o.reader.onerror = o.onerror, o.reader.onload = o.onLoad, o.reader.onloadend = o.onLoadEnd;
                },
                upload: function() {
                    i.readBlob(0);
                },
                onLoadStart: function() {},
                onProgress: function(e) {
                    var t = i;
                    t.loaded += e.loaded, t.onProgressCallBack && t.onProgressCallBack(t.loaded, t.total);
                },
                onAbort: function() {},
                onError: function() {},
                onLoad: function(e) {
                    var t = i;
                    if (e.target.readyState == FileReader.DONE) {
                        var n = e.target.result, o = n.indexOf(",");
                        -1 != o && (n = n.substr(o + 1));
                        var r = {
                            From_Account: t.fromAccount,
                            To_Account: t.toAccount,
                            Busi_Id: t.businessType,
                            File_Type: t.fileType,
                            File_Str_Md5: t.fileMd5,
                            PkgFlag: I.BASE64_DATA,
                            File_Size: t.total,
                            Slice_Offset: t.sliceOffset,
                            Slice_Size: t.sliceSize,
                            Slice_Data: n,
                            Seq: t.seq,
                            Timestamp: t.timestamp,
                            Random: t.random
                        }, s = function(e) {
                            if (0 == e.IsFinish) t.loaded = e.Next_Offset, t.loaded < t.total ? t.readBlob(t.loaded) : t.loaded = t.total; else if (t.cbOk) {
                                var n = {
                                    ActionStatus: e.ActionStatus,
                                    ErrorCode: e.ErrorCode,
                                    ErrorInfo: e.ErrorInfo,
                                    File_UUID: e.File_UUID,
                                    File_Size: e.Next_Offset,
                                    URL_INFO: e.URL_INFO,
                                    Download_Flag: e.Download_Flag
                                };
                                t.fileType == _.FILE && (n.URL_INFO = Ie(e.File_UUID, j.identifier, t.file.name)), 
                                t.cbOk(n);
                            }
                            B = 0;
                        };
                        ft(r, s, function e(n) {
                            B < 20 ? (B++, setTimeout(function() {
                                ft(r, s, e);
                            }, 1e3)) : t.cbErr(n);
                        });
                    }
                },
                onLoadEnd: function() {},
                readBlob: function(e) {
                    var t, n = i, o = n.file, r = e + n.step;
                    r > n.total ? (r = n.total, n.sliceSize = r - e) : n.sliceSize = n.step, n.sliceOffset = e, 
                    t = n.blobSlice.call(o, e, r), n.reader.readAsDataURL(t);
                },
                abortHandler: function() {
                    var e = i;
                    e.reader && e.reader.abort();
                }
            };
            e(t.file, function(e) {
                re.info("fileMd5: " + e), t.fileMd5 = e, i.init(t, n, o), i.upload();
            }, o);
        };
    }();
    t.SESSION_TYPE = l, t.MSG_MAX_LENGTH = f, t.C2C_MSG_SUB_TYPE = C, t.GROUP_MSG_SUB_TYPE = A, 
    t.MSG_ELEMENT_TYPE = g, t.GROUP_TIP_TYPE = G, t.IMAGE_TYPE = m, t.GROUP_SYSTEM_TYPE = F, 
    t.FRIEND_NOTICE_TYPE = R, t.GROUP_TIP_MODIFY_GROUP_INFO_TYPE = O, t.BROWSER_INFO = r, 
    t.Emotions = t.EmotionPicData = oe, t.EmotionDataIndexs = t.EmotionPicDataIndex = ne, 
    t.TLS_ERROR_CODE = N, t.CONNECTION_STATUS = P, t.UPLOAD_PIC_BUSSINESS_TYPE = b, 
    t.RECENT_CONTACT_TYPE = p, t.UPLOAD_RES_TYPE = _, t.Tool = ie, t.Log = re, t.Msg = yt, 
    t.Session = Et, t.MsgStore = {
        sessMap: function() {
            return ht.sessMap();
        },
        sessCount: function() {
            return ht.sessCount();
        },
        sessByTypeId: function(e, t) {
            return ht.sessByTypeId(e, t);
        },
        delSessByTypeId: function(e, t) {
            return ht.delSessByTypeId(e, t);
        },
        resetCookieAndSyncFlag: function() {
            return ht.resetCookieAndSyncFlag();
        }
    }, t.Resources = te, t.login = t.init = function(e, t, n, o, i) {
        Mt.init(t.onConnNotify, o, i), t.jsonpCallback && (V = t.jsonpCallback), _e(e, t, n, o, i);
    }, t.logout = t.offline = function(e, t) {
        return Ce("instance", e, t);
    }, t.logoutAll = function(e, t) {
        return Ce("all", e, t);
    }, t.sendMsg = function(e, t, n) {
        return Ct.sendMsg(e, t, n);
    }, t.syncMsgs = function(e, t) {
        return Ct.syncMsgs(e, t);
    }, t.getC2CHistoryMsgs = function(e, t, n) {
        return Ct.getC2CHistoryMsgs(e, t, n);
    }, t.syncGroupMsgs = function(e, t, n) {
        return Ct.syncGroupMsgs(e, t, n);
    }, t.c2CMsgReaded = function(e, t, n) {
        return ht.c2CMsgReaded(e, t, n);
    }, t.groupMsgReaded = function(e, t, n) {
        return $e(e, t, n);
    }, t.setAutoRead = function(e, t, n) {
        return ht.setAutoRead(e, t, n);
    }, t.createGroup = function(e, t, n) {
        return ve(e, t, n);
    }, t.createGroupHigh = function(e, t, n) {
        return Ne(e, t, n);
    }, t.applyJoinGroup = function(e, t, n) {
        return be(e, t, n);
    }, t.handleApplyJoinGroupPendency = function(e, t, n) {
        return Ue(e, t, n);
    }, t.deleteApplyJoinGroupPendency = function(e, t, n) {
        return Fe(e, t, n);
    }, t.quitGroup = function(e, t, n) {
        return De(e, t, n);
    }, t.searchGroupByName = function(e, t, n) {
        return we(e, t, n);
    }, t.getGroupPublicInfo = function(e, t, n) {
        return qe(e, t, n);
    }, t.getGroupInfo = function(e, t, n) {
        return xe(e, t, n);
    }, t.modifyGroupBaseInfo = function(e, t, n) {
        return Pe(e, t, n);
    }, t.getGroupMemberInfo = function(e, t, n) {
        return Be(e, t, n);
    }, t.addGroupMember = function(e, t, n) {
        return Ke(e, t, n);
    }, t.modifyGroupMember = function(e, t, n) {
        return ze(e, t, n);
    }, t.deleteGroupMember = function(e, t, n) {
        return Ve(e, t, n);
    }, t.destroyGroup = function(e, t, n) {
        return Je(e, t, n);
    }, t.changeGroupOwner = function(e, t, n) {
        return He(e, t, n);
    }, t.getJoinedGroupListHigh = function(e, t, n) {
        return Ye(e, t, n);
    }, t.getRoleInGroup = function(e, t, n) {
        return Xe(e, t, n);
    }, t.forbidSendMsg = function(e, t, n) {
        return je(e, t, n);
    }, t.sendCustomGroupNotify = function(e, t, n) {
        return We(e, t, n);
    }, t.applyJoinBigGroup = function(e, t, n) {
        return Le(e, t, n);
    }, t.quitBigGroup = function(e, t, n) {
        return ke(e, t, n);
    }, t.getProfilePortrait = function(e, t, n) {
        return st(e, t, n);
    }, t.setProfilePortrait = function(e, t, n) {
        return ut(e, t, n);
    }, t.applyAddFriend = function(e, t, n) {
        return et(e, t, n);
    }, t.getPendency = function(e, t, n) {
        return nt(e, t, n);
    }, t.deletePendency = function(e, t, n) {
        return ot(e, t, n);
    }, t.responseFriend = function(e, t, n) {
        return it(e, t, n);
    }, t.getAllFriend = function(e, t, n) {
        return rt(e, t, n);
    }, t.deleteFriend = function(e, t, n) {
        return tt(e, t, n);
    }, t.addBlackList = function(e, t, n) {
        return at(e, t, n);
    }, t.deleteBlackList = function(e, t, n) {
        return ct(e, t, n);
    }, t.getBlackList = function(e, t, n) {
        return lt(e, t, n);
    }, t.getRecentContactList = function(e, t, n) {
        return pt(e, t, n);
    }, t.uploadFile = t.uploadPic = function(e, t, n) {
        return Tt.uploadFile(e, t, n);
    }, t.submitUploadFileForm = function(e, t, n) {
        return Tt.submitUploadFileForm(e, t, n);
    }, t.uploadFileByBase64 = t.uploadPicByBase64 = function(e, t, n) {
        var o = {
            To_Account: e.toAccount,
            Busi_Id: e.businessType,
            File_Type: e.File_Type,
            File_Str_Md5: e.fileMd5,
            PkgFlag: I.BASE64_DATA,
            File_Size: e.totalSize,
            Slice_Offset: 0,
            Slice_Size: e.totalSize,
            Slice_Data: e.base64Str,
            Seq: ue(),
            Timestamp: se(),
            Random: ae()
        };
        return ft(o, t, n);
    }, t.setJsonpLastRspData = function(e) {
        z = "string" == typeof e ? JSON.parse(e) : e;
    }, t.getLongPollingId = function(e, t, n) {
        return mt(0, t, n);
    }, t.applyDownload = function(e, t, n) {
        return It(e, t, n);
    }, t.onDownFile = function(e) {
        window.open(te.downloadMap["uuid_" + e]);
    }, t.checkLogin = function(e, t) {
        return fe(e, t);
    };
}(t), module.exports = t;