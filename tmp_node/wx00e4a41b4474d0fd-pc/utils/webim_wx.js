var e = 0, t = 0, n = !0;

module.exports = function() {
    var o = {}, r = {
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
        Msg: function(e, t, n, o, r, i, s, u) {},
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
    return function(r) {
        var i = {
            VERSION: "1.7.0",
            APPID: "537048168"
        }, s = !0, u = {
            FORMAL: {
                COMMON: "https://webim.tim.qq.com",
                PIC: "https://pic.tim.qq.com"
            },
            TEST: {
                COMMON: "https://test.tim.qq.com",
                PIC: "https://pic.tim.qq.com"
            }
        }, a = {}, l = {
            OPEN_IM: "openim",
            GROUP: "group_open_http_svc",
            FRIEND: "sns",
            PROFILE: "profile",
            RECENT_CONTACT: "recentcontact",
            PIC: "openpic",
            BIG_GROUP: "group_open_http_noauth_svc",
            BIG_GROUP_LONG_POLLING: "group_open_long_polling_http_noauth_svc",
            IM_OPEN_STAT: "imopenstat"
        }, c = {
            openim: "v4",
            group_open_http_svc: "v4",
            sns: "v4",
            profile: "v4",
            recentcontact: "v4",
            openpic: "v4",
            group_open_http_noauth_svc: "v1",
            group_open_long_polling_http_noauth_svc: "v1",
            imopenstat: "v4"
        }, p = {
            login: 1,
            pic_up: 3,
            apply_join_group: 9,
            create_group: 10,
            longpolling: 18,
            send_group_msg: 19,
            sendmsg: 20
        }, f = {
            C2C: "C2C",
            GROUP: "GROUP"
        }, g = {
            C2C: 1,
            GROUP: 2
        }, d = {
            C2C: 12e3,
            GROUP: 8898
        }, m = {
            OK: "OK",
            FAIL: "FAIL"
        }, I = {
            TEXT: "TIMTextElem",
            FACE: "TIMFaceElem",
            IMAGE: "TIMImageElem",
            CUSTOM: "TIMCustomElem",
            SOUND: "TIMSoundElem",
            FILE: "TIMFileElem",
            LOCATION: "TIMLocationElem",
            GROUP_TIP: "TIMGroupTipElem"
        }, M = {
            ORIGIN: 1,
            LARGE: 2,
            SMALL: 3
        }, E = {
            RAW_DATA: 0,
            BASE64_DATA: 1
        }, _ = {
            BUSSINESS_ID: "10001",
            AUTH_KEY: "617574686b6579",
            SERVER_IP: "182.140.186.147"
        }, y = {
            SOUND: 2106,
            FILE: 2107
        }, h = {
            IMAGE: 1,
            FILE: 2,
            SHORT_VIDEO: 3,
            SOUND: 4
        }, T = {
            APP_VERSION: "2.1",
            SERVER_VERSION: 1
        }, C = {
            C2C: 1,
            GROUP_COMMON: 3,
            GROUP_TIP: 4,
            GROUP_SYSTEM: 5,
            GROUP_TIP2: 6,
            FRIEND_NOTICE: 7,
            PROFILE_NOTICE: 8,
            C2C_COMMON: 9,
            C2C_EVENT: 10
        }, A = {
            COMMON: 0
        }, S = {
            READED: 92
        }, G = {
            COMMON: 0,
            LOVEMSG: 1,
            TIP: 2,
            REDPACKET: 3
        }, O = {
            REDPACKET: 1,
            COMMON: 2,
            LOVEMSG: 3
        }, F = {
            JOIN: 1,
            QUIT: 2,
            KICK: 3,
            SET_ADMIN: 4,
            CANCEL_ADMIN: 5,
            MODIFY_GROUP_INFO: 6,
            MODIFY_MEMBER_INFO: 7
        }, R = {
            FACE_URL: 1,
            NAME: 2,
            OWNER: 3,
            NOTIFICATION: 4,
            INTRODUCTION: 5
        }, v = {
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
        }, N = {
            FRIEND_ADD: 1,
            FRIEND_DELETE: 2,
            PENDENCY_ADD: 3,
            PENDENCY_DELETE: 4,
            BLACK_LIST_ADD: 5,
            BLACK_LIST_DELETE: 6,
            PENDENCY_REPORT: 7,
            FRIEND_UPDATE: 8
        }, P = {
            PROFILE_MODIFY: 1
        }, b = {
            OK: 0,
            SIGNATURE_EXPIRATION: 11
        }, L = {
            INIT: -1,
            ON: 0,
            RECONNECT: 1,
            OFF: 9999
        }, U = {
            GROUP_MSG: 1,
            C2C_MSG: 2,
            USER_HEAD: 3,
            GROUP_HEAD: 4
        }, D = {
            ING: 14,
            STOP: 15
        }, k = L.INIT, w = !1, q = 0, x = 6e4, B = null, K = 0, z = 0, V = 0, J = null, H = null, Y = 0, X = [], Q = null, W = null, j = {
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
        }, $ = {}, Z = 0, ee = {}, te = 0, ne = [], oe = [], re = [], ie = {
            downloadMap: {}
        }, se = {
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
        }, ue = {}, ae = new function() {
            this.formatTimeStamp = function(e, t) {
                if (!e) return 0;
                var n;
                t = t || "yyyy-MM-dd hh:mm:ss";
                var o = new Date(1e3 * e), r = {
                    "M+": o.getMonth() + 1,
                    "d+": o.getDate(),
                    "h+": o.getHours(),
                    "m+": o.getMinutes(),
                    "s+": o.getSeconds()
                };
                n = /(y+)/.test(t) ? t.replace(RegExp.$1, (o.getFullYear() + "").substr(4 - RegExp.$1.length)) : t;
                for (var i in r) new RegExp("(" + i + ")").test(n) && (n = n.replace(RegExp.$1, 1 == RegExp.$1.length ? r[i] : ("00" + r[i]).substr(("" + r[i]).length)));
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
                var t, n, o, r = 0;
                for (n = 0, o = e.length; n < o; n++) r += (t = e.charCodeAt(n)) <= 127 ? 1 : t <= 2047 ? 2 : t <= 65535 ? 3 : 4;
                return r;
            }, this.xssFilter = function(e) {
                return e = e.toString(), e = e.replace(/[<]/g, "&lt;"), e = e.replace(/[>]/g, "&gt;");
            }, this.trimStr = function(e) {
                return e ? (e = e.toString()).replace(/(^\s*)|(\s*$)/g, "") : "";
            }, this.validNumber = function(e) {
                return (e = e.toString()).match(/(^\d{1,8}$)/g);
            }, this.getReturnError = function(e, t) {
                return t || (t = -100), {
                    ActionStatus: m.FAIL,
                    ErrorCode: t,
                    ErrorInfo: e + "[" + t + "]"
                };
            }, this.setCookie = function(e, t, n, o, r) {
                var i = new Date();
                i.setTime(i.getTime() + 1e3 * n), document.cookie = e + "=" + escape(t) + ";expires=" + i.toGMTString();
            }, this.getCookie = function(e) {
                var t = document.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)"));
                return null != t ? unescape(t[2]) : null;
            }, this.delCookie = function(e) {
                var t = new Date();
                t.setTime(t.getTime() - 1);
                var n = this.getCookie(e);
                null != n && (document.cookie = e + "=" + escape(n) + ";expires=" + t.toGMTString());
            }, this.getQueryString = function(e) {
                var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i"), n = location.search.substr(1).match(t);
                return null != n ? unescape(n[2]) : null;
            };
        }(), le = new function() {
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
        }(), ce = function(e) {
            return e || (e = new Date()), Math.round(e.getTime() / 1e3);
        }, pe = function() {
            return te ? te += 1 : te = Math.round(1e7 * Math.random()), te;
        }, fe = function() {
            return Math.round(4294967296 * Math.random());
        }, ge = function(n, o, r, i, s, u, a) {
            e++, t++, ee[Z++] = wx.request({
                url: o + "&reqSeq=" + e,
                data: r,
                dataType: "json",
                method: n,
                header: {
                    "Content-Type": "application/json"
                },
                success: function(e) {
                    t--, q = K = 0, u && u(e.data);
                },
                fail: function(e) {
                    t--, setTimeout(function() {
                        var e = ae.getReturnError("请求服务器失败,请检查你的网络是否正常", -2);
                        a && a(e);
                    }, 16);
                }
            });
        }, de = function(e, t, n, o, r, i, s) {
            ge(e, t, JSON.stringify(n), 0, 0, function(e) {
                var t = null;
                e && (t = e), i && i(t);
            }, s);
        }, me = function() {
            return j.sdkAppID && j.identifier;
        }, Ie = function(e, t) {
            if (!me()) {
                if (t) {
                    var n = ae.getReturnError("请登录", -4);
                    e && e(n);
                }
                return !1;
            }
            return !0;
        }, Me = function() {
            return s;
        }, Ee = function(e, t, n, o) {
            var r = u;
            r = Me() ? u.FORMAL.COMMON : u.TEST.COMMON, e == l.PIC && (r = Me() ? u.FORMAL.PIC : u.TEST.PIC);
            var s = r + "/" + c[e] + "/" + e + "/" + t + "?websdkappid=" + i.APPID + "&v=" + i.VERSION;
            if (me()) {
                if ("login" == t) s += "&identifier=" + encodeURIComponent(j.identifier) + "&usersig=" + j.userSig; else if (j.tinyid && j.a2) s += "&tinyid=" + j.tinyid + "&a2=" + j.a2; else if (o) return le.error("tinyid或a2为空[" + e + "][" + t + "]"), 
                o(ae.getReturnError("tinyid或a2为空[" + e + "][" + t + "]", -5)), !1;
                s += "&contenttype=" + j.contentType;
            }
            return s += "&sdkappid=" + j.sdkAppID + "&accounttype=" + j.accountType + "&apn=" + j.apn + "&reqtime=" + ce();
        }, _e = function(e, t) {
            var n = null;
            return Q && X[0] ? n = "http://" + X[0] + "/asn.com/stddownload_common_file?authkey=" + Q + "&bid=" + _.BUSSINESS_ID + "&subbid=" + j.sdkAppID + "&fileid=" + e + "&filetype=" + y.SOUND + "&openid=" + t + "&ver=0" : le.error("拼接语音下载url不报错：ip或者authkey为空"), 
            n;
        }, ye = function(e, t, n) {
            var o = null;
            return Q && X[0] ? o = "http://" + X[0] + "/asn.com/stddownload_common_file?authkey=" + Q + "&bid=" + _.BUSSINESS_ID + "&subbid=" + j.sdkAppID + "&fileid=" + e + "&filetype=" + y.FILE + "&openid=" + t + "&ver=0&filename=" + encodeURIComponent(n) : le.error("拼接文件下载url不报错：ip或者authkey为空"), 
            ie.downloadMap["uuid_" + e] = o, o;
        }, he = function(e, t, n, o, r, i, s) {
            var u = {
                From_Account: t,
                To_Account: r,
                os_platform: 10,
                Timestamp: ce().toString(),
                Random: fe().toString(),
                request_info: [ {
                    busi_id: i,
                    download_flag: o,
                    type: s,
                    uuid: e,
                    version: T.SERVER_VERSION,
                    auth_key: Q,
                    ip: X[0]
                } ]
            };
            ht(u, function(e) {
                0 == e.error_code && e.response_info && (ie.downloadMap["uuid_" + u.uuid] = e.response_info.url), 
                onAppliedDownloadUrl && onAppliedDownloadUrl({
                    uuid: u.uuid,
                    url: e.response_info.url,
                    maps: ie.downloadMap
                });
            }, function(e) {
                le.error("获取下载地址失败", u.uuid);
            });
        }, Te = function() {
            for (var e in ee) {
                var t = ee[e];
                t && (t.abort(), ee[Z] = null);
            }
            Z = 0, ee = {};
        }, Ce = function() {
            Te(), j = {
                sdkAppID: null,
                appIDAt3rd: null,
                accountType: null,
                identifier: null,
                identifierNick: null,
                userSig: null,
                contentType: "json",
                apn: 1
            }, $ = {}, te = 0, V = 0, J = null, re = [], Ot.clear(), B = null;
        }, Ae = function(e, t, n, o, r) {
            Ce(), n && ($ = n), 0 == $.isAccessFormalEnv && (le.error("请切换为正式环境"), s = $.isAccessFormalEnv), 
            0 == $.isLogOn && le.setOn($.isLogOn), e || !r ? e.sdkAppID || !r ? e.accountType || !r ? (e.identifier && (j.identifier = e.identifier.toString()), 
            e.identifier && !e.userSig && r ? r(ae.getReturnError("loginInfo.userSig is empty", -9)) : (e.userSig && (j.userSig = e.userSig.toString()), 
            j.sdkAppID = e.sdkAppID, j.accountType = e.accountType, j.identifier && j.userSig ? Ge(function(e, n) {
                Ot.init(t, function(t) {
                    o && (t.identifierNick = e, t.headurl = n, o(t));
                }, r);
            }, r) : Ot.init(t, o, r))) : r(ae.getReturnError("loginInfo.accountType is empty", -8)) : r(ae.getReturnError("loginInfo.sdkAppID is empty", -7)) : r(ae.getReturnError("loginInfo is empty", -6));
        }, Se = function(e, t, n) {
            if ("longpolling" != e || 60008 != t && 91101 != t) {
                var o = p[e];
                if (o) {
                    var r = ce(), s = null, u = {
                        Code: t,
                        ErrMsg: n
                    };
                    if (j.a2 ? s = j.a2.substring(0, 10) + "_" + r + "_" + fe() : j.userSig && (s = j.userSig.substring(0, 10) + "_" + r + "_" + fe()), 
                    s) {
                        var a = {
                            UniqKey: s,
                            EventId: o,
                            ReportTime: r,
                            MsgCmdErrorCode: u
                        };
                        if ("login" == e) {
                            var l = [];
                            l.push(a), _t({
                                EvtItems: l,
                                MainVersion: i.VERSION,
                                Version: "0"
                            }, function(e) {
                                l = null;
                            }, function(e) {
                                l = null;
                            });
                        } else re.push(a), re.length >= 20 && _t({
                            EvtItems: re,
                            MainVersion: i.VERSION,
                            Version: "0"
                        }, function(e) {
                            re = [];
                        }, function(e) {
                            re = [];
                        });
                    }
                }
            }
        }, Ge = function(e, t) {
            Tt.apiCall(l.OPEN_IM, "login", {
                State: "Online"
            }, function(n) {
                if (n.TinyId) j.tinyid = n.TinyId; else if (t) return void t(ae.getReturnError("TinyId is empty", -10));
                if (n.A2Key) j.a2 = n.A2Key; else if (t) return void t(ae.getReturnError("A2Key is empty", -11));
                var o = [ "Tag_Profile_IM_Nick", "Tag_Profile_IM_Image" ], r = {
                    From_Account: j.identifier,
                    To_Account: [ j.identifier ],
                    LastStandardSequence: 0,
                    TagList: o
                };
                pt(r, function(t) {
                    var n, o;
                    if (t.UserProfileItem && t.UserProfileItem.length > 0) for (var r in t.UserProfileItem) for (var i in t.UserProfileItem[r].ProfileItem) switch (t.UserProfileItem[r].ProfileItem[i].Tag) {
                      case "Tag_Profile_IM_Nick":
                        (n = t.UserProfileItem[r].ProfileItem[i].Value) && (j.identifierNick = n);
                        break;

                      case "Tag_Profile_IM_Image":
                        (o = t.UserProfileItem[r].ProfileItem[i].Value) && (j.headurl = o);
                    }
                    e && e(j.identifierNick, j.headurl);
                }, t);
            }, t);
        }, Oe = function(e, t, n) {
            if (!Ie(n, !1)) return Ce(), void (t && t({
                ActionStatus: m.OK,
                ErrorCode: 0,
                ErrorInfo: "logout success"
            }));
            "all" == e ? Tt.apiCall(l.OPEN_IM, "logout", {}, function(e) {
                Ce(), t && t(e);
            }, n) : Tt.apiCall(l.OPEN_IM, "longpollinglogout", {
                LongPollingId: B
            }, function(e) {
                Ce(), t && t(e);
            }, n);
        }, Fe = function(e, t, n) {
            if (Ie(n, !0)) {
                var o = null;
                switch (e.sess.type()) {
                  case f.C2C:
                    o = {
                        From_Account: j.identifier,
                        To_Account: e.sess.id().toString(),
                        MsgTimeStamp: e.time,
                        MsgSeq: e.seq,
                        MsgRandom: e.random,
                        MsgBody: []
                    };
                    break;

                  case f.GROUP:
                    var r = e.getSubType();
                    switch (o = {
                        GroupId: e.sess.id().toString(),
                        From_Account: j.identifier,
                        Random: e.random,
                        MsgBody: []
                    }, r) {
                      case G.COMMON:
                        o.MsgPriority = "COMMON";
                        break;

                      case G.REDPACKET:
                        o.MsgPriority = "REDPACKET";
                        break;

                      case G.LOVEMSG:
                        o.MsgPriority = "LOVEMSG";
                        break;

                      case G.TIP:
                        le.error("不能主动发送群提示消息,subType=" + r);
                        break;

                      default:
                        return void le.error("发送群消息时，出现未知子消息类型：subType=" + r);
                    }
                }
                for (var i in e.elems) {
                    var s = e.elems[i], u = null, a = s.type;
                    switch (a) {
                      case I.TEXT:
                        u = {
                            Text: s.content.text
                        };
                        break;

                      case I.FACE:
                        u = {
                            Index: s.content.index,
                            Data: s.content.data
                        };
                        break;

                      case I.IMAGE:
                        var c = [];
                        for (var p in s.content.ImageInfoArray) c.push({
                            Type: s.content.ImageInfoArray[p].type,
                            Size: s.content.ImageInfoArray[p].size,
                            Width: s.content.ImageInfoArray[p].width,
                            Height: s.content.ImageInfoArray[p].height,
                            URL: s.content.ImageInfoArray[p].url
                        });
                        u = {
                            UUID: s.content.UUID,
                            ImageInfoArray: c
                        };
                        break;

                      case I.SOUND:
                        le.warn("web端暂不支持发送语音消息");
                        continue;

                      case I.LOCATION:
                        le.warn("web端暂不支持发送地理位置消息");
                        continue;

                      case I.FILE:
                        u = {
                            UUID: s.content.uuid,
                            FileName: s.content.name,
                            FileSize: s.content.size,
                            DownloadFlag: s.content.downFlag
                        };
                        break;

                      case I.CUSTOM:
                        u = {
                            Data: s.content.data,
                            Desc: s.content.desc,
                            Ext: s.content.ext
                        }, a = I.CUSTOM;
                        break;

                      default:
                        le.warn("web端暂不支持发送" + s.type + "消息");
                        continue;
                    }
                    e.PushInfoBoolean && (o.OfflinePushInfo = e.PushInfo), o.MsgBody.push({
                        MsgType: a,
                        MsgContent: u
                    });
                }
                e.sess.type() == f.C2C ? Tt.apiCall(l.OPEN_IM, "sendmsg", o, t, n) : e.sess.type() == f.GROUP && Tt.apiCall(l.GROUP, "send_group_msg", o, t, n);
            }
        }, Re = function(e, t, n) {
            (s || "undefined" == typeof stopPolling || 1 != stopPolling) && Ie(n, !0) && Tt.apiCall(l.OPEN_IM, "longpolling", e, t, n, x, !0);
        }, ve = function(e, t, n, o) {
            Tt.apiCall(l.BIG_GROUP_LONG_POLLING, "get_msg", e, t, n, o);
        }, Ne = function e(t, n, o, r) {
            Ie(r, !0) && Tt.apiCall(l.OPEN_IM, "getmsg", {
                Cookie: t,
                SyncFlag: n
            }, function(t) {
                if (t.MsgList && t.MsgList.length) for (var n in t.MsgList) ne.push(t.MsgList[n]);
                1 == t.SyncFlag ? e(t.Cookie, t.SyncFlag, o, r) : (t.MsgList = ne, ne = [], o && o(t));
            }, r);
        }, Pe = function(e, t, n, o) {
            if (Ie(o, !0)) {
                var r = [];
                for (var i in t) {
                    var s = {
                        To_Account: t[i].toAccount,
                        LastedMsgTime: t[i].lastedMsgTime
                    };
                    r.push(s);
                }
                Tt.apiCall(l.OPEN_IM, "msgreaded", {
                    C2CMsgReaded: {
                        Cookie: e,
                        C2CMsgReadedItem: r
                    }
                }, n, o);
            }
        }, be = function(e, t, n) {
            Ie(n, !0) && Tt.apiCall(l.OPEN_IM, "deletemsg", e, t, n);
        }, Le = function e(t, n, o) {
            Ie(o, !0) && Tt.apiCall(l.OPEN_IM, "getroammsg", t, function(r) {
                var i = t.MaxCnt, s = r.Complete, u = r.MaxCnt, a = r.MsgKey, l = r.LastMsgTime;
                if (r.MsgList && r.MsgList.length) for (var c in r.MsgList) oe.push(r.MsgList[c]);
                var p = null;
                0 == s && u < i && (p = {
                    Peer_Account: t.Peer_Account,
                    MaxCnt: i - u,
                    LastMsgTime: l,
                    MsgKey: a
                }), p ? e(p, n, o) : (r.MsgList = oe, oe = [], n && n(r));
            }, o);
        }, Ue = function(e, t, n) {
            if (Ie(n, !0)) {
                for (var o = {
                    Type: e.Type,
                    Name: e.Name
                }, r = [], i = 0; i < e.MemberList.length; i++) r.push({
                    Member_Account: e.MemberList[i]
                });
                o.MemberList = r, e.GroupId && (o.GroupId = e.GroupId), e.Owner_Account && (o.Owner_Account = e.Owner_Account), 
                e.Introduction && (o.Introduction = e.Introduction), e.Notification && (o.Notification = e.Notification), 
                e.MaxMemberCount && (o.MaxMemberCount = e.MaxMemberCount), e.ApplyJoinOption && (o.ApplyJoinOption = e.ApplyJoinOption), 
                e.AppDefinedData && (o.AppDefinedData = e.AppDefinedData), e.FaceUrl && (o.FaceUrl = e.FaceUrl), 
                Tt.apiCall(l.GROUP, "create_group", o, t, n);
            }
        }, De = function(e, t, n) {
            Ie(n, !0) && Tt.apiCall(l.GROUP, "create_group", e, t, n);
        }, ke = function(e, t, n) {
            Ie(n, !0) && Tt.apiCall(l.GROUP, "modify_group_base_info", e, t, n);
        }, we = function(e, t, n) {
            Ie(n, !0) && Tt.apiCall(l.GROUP, "apply_join_group", {
                GroupId: e.GroupId,
                ApplyMsg: e.ApplyMsg,
                UserDefinedField: e.UserDefinedField
            }, t, n);
        }, qe = function(e, t, n) {
            var o;
            o = Ie(n, !1) ? l.GROUP : l.BIG_GROUP, Tt.apiCall(o, "apply_join_group", {
                GroupId: e.GroupId,
                ApplyMsg: e.ApplyMsg,
                UserDefinedField: e.UserDefinedField
            }, function(o) {
                if (o.JoinedStatus && "JoinedSuccess" == o.JoinedStatus) {
                    if (!o.LongPollingKey) return void (n && n(ae.getReturnError("The type of group is not AVChatRoom: groupid=" + e.GroupId, -12)));
                    Ot.resetBigGroupLongPollingInfo(), Ot.setBigGroupLongPollingOn(!0), Ot.setBigGroupLongPollingKey(o.LongPollingKey), 
                    Ot.setBigGroupLongPollingMsgMap(e.GroupId, 0), Ot.bigGroupLongPolling();
                }
                t && t(o);
            }, function(e) {
                n && n(e);
            });
        }, xe = function(e, t, n) {
            Ie(n, !0) && Tt.apiCall(l.GROUP, "handle_apply_join_group", {
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
                            ActionStatus: m.OK,
                            ErrorCode: 0,
                            ErrorInfo: "该申请已经被处理过"
                        };
                        t(o);
                    }
                } else n && n(e);
            });
        }, Be = function(e, t, n) {
            Ie(n, !0) && Tt.apiCall(l.GROUP, "quit_group", {
                GroupId: e.GroupId
            }, t, n);
        }, Ke = function(e, t, n) {
            var o;
            o = Ie(n, !1) ? l.GROUP : l.BIG_GROUP, Ot.resetBigGroupLongPollingInfo(), Tt.apiCall(o, "quit_group", {
                GroupId: e.GroupId
            }, function(e) {
                Ot.resetBigGroupLongPollingInfo(), t && t(e);
            }, n);
        }, ze = function(e, t, n) {
            Tt.apiCall(l.GROUP, "search_group", e, t, n);
        }, Ve = function(e, t, n) {
            Ie(n, !0) && Tt.apiCall(l.GROUP, "get_group_public_info", {
                GroupIdList: e.GroupIdList,
                ResponseFilter: {
                    GroupBasePublicInfoFilter: e.GroupBasePublicInfoFilter
                }
            }, function(e) {
                if (e.ErrorInfo = "", e.GroupInfo) for (var o in e.GroupInfo) {
                    var r = e.GroupInfo[o].ErrorCode;
                    r > 0 && (e.ActionStatus = m.FAIL, e.GroupInfo[o].ErrorInfo = "[" + r + "]" + e.GroupInfo[o].ErrorInfo, 
                    e.ErrorInfo += e.GroupInfo[o].ErrorInfo + "\n");
                }
                e.ActionStatus == m.FAIL ? n && n(e) : t && t(e);
            }, n);
        }, Je = function(e, t, n) {
            if (Ie(n, !0)) {
                var o = {
                    GroupIdList: e.GroupIdList,
                    ResponseFilter: {
                        GroupBaseInfoFilter: e.GroupBaseInfoFilter,
                        MemberInfoFilter: e.MemberInfoFilter
                    }
                };
                e.AppDefinedDataFilter_Group && (o.ResponseFilter.AppDefinedDataFilter_Group = e.AppDefinedDataFilter_Group), 
                e.AppDefinedDataFilter_GroupMember && (o.ResponseFilter.AppDefinedDataFilter_GroupMember = e.AppDefinedDataFilter_GroupMember), 
                Tt.apiCall(l.GROUP, "get_group_info", o, t, n);
            }
        }, He = function(e, t, n) {
            Ie(n, !0) && Tt.apiCall(l.GROUP, "get_group_member_info", {
                GroupId: e.GroupId,
                Offset: e.Offset,
                Limit: e.Limit,
                MemberInfoFilter: e.MemberInfoFilter,
                MemberRoleFilter: e.MemberRoleFilter,
                AppDefinedDataFilter_GroupMember: e.AppDefinedDataFilter_GroupMember
            }, t, n);
        }, Ye = function(e, t, n) {
            Ie(n, !0) && Tt.apiCall(l.GROUP, "add_group_member", {
                GroupId: e.GroupId,
                Silence: e.Silence,
                MemberList: e.MemberList
            }, t, n);
        }, Xe = function(e, t, n) {
            if (Ie(n, !0)) {
                var o = {};
                e.GroupId && (o.GroupId = e.GroupId), e.Member_Account && (o.Member_Account = e.Member_Account), 
                e.Role && (o.Role = e.Role), e.MsgFlag && (o.MsgFlag = e.MsgFlag), e.ShutUpTime && (o.ShutUpTime = e.ShutUpTime), 
                e.NameCard && (o.NameCard = e.NameCard), e.AppMemberDefinedData && (o.AppMemberDefinedData = e.AppMemberDefinedData), 
                Tt.apiCall(l.GROUP, "modify_group_member_info", o, t, n);
            }
        }, Qe = function(e, t, n) {
            Ie(n, !0) && Tt.apiCall(l.GROUP, "delete_group_member", {
                GroupId: e.GroupId,
                Silence: e.Silence,
                MemberToDel_Account: e.MemberToDel_Account,
                Reason: e.Reason
            }, t, n);
        }, We = function(e, t, n) {
            Ie(n, !0) && Tt.apiCall(l.GROUP, "destroy_group", {
                GroupId: e.GroupId
            }, t, n);
        }, je = function(e, t, n) {
            Ie(n, !0) && Tt.apiCall(l.GROUP, "change_group_owner", e, t, n);
        }, $e = function(e, t, n) {
            Ie(n, !0) && Tt.apiCall(l.GROUP, "get_joined_group_list", {
                Member_Account: e.Member_Account,
                Limit: e.Limit,
                Offset: e.Offset,
                GroupType: e.GroupType,
                ResponseFilter: {
                    GroupBaseInfoFilter: e.GroupBaseInfoFilter,
                    SelfInfoFilter: e.SelfInfoFilter
                }
            }, t, n);
        }, Ze = function(e, t, n) {
            Ie(n, !0) && Tt.apiCall(l.GROUP, "get_role_in_group", {
                GroupId: e.GroupId,
                User_Account: e.User_Account
            }, t, n);
        }, et = function(e, t, n) {
            Ie(n, !0) && Tt.apiCall(l.GROUP, "forbid_send_msg", {
                GroupId: e.GroupId,
                Members_Account: e.Members_Account,
                ShutUpTime: e.ShutUpTime
            }, t, n);
        }, tt = function(e, t, n) {
            Ie(n, !0) && Tt.apiCall(l.GROUP, "send_group_system_notification", e, t, n);
        }, nt = function(e, t, n) {
            Ie(n, !0) && Tt.apiCall(l.GROUP, "group_msg_get", {
                GroupId: e.GroupId,
                ReqMsgSeq: e.ReqMsgSeq,
                ReqMsgNumber: e.ReqMsgNumber
            }, t, n);
        }, ot = function(e, t, n) {
            Ie(n, !0) && Tt.apiCall(l.GROUP, "msg_read_report", {
                GroupId: e.GroupId,
                MsgReadedSeq: e.MsgReadedSeq
            }, t, n);
        }, rt = function(e) {
            var t = [];
            if (e.Fail_Account && e.Fail_Account.length && (t = e.Fail_Account), e.Invalid_Account && e.Invalid_Account.length) for (var n in e.Invalid_Account) t.push(e.Invalid_Account[n]);
            if (t.length) {
                e.ActionStatus = m.FAIL, e.ErrorCode = 99999, e.ErrorInfo = "";
                for (var o in t) {
                    var r = t[o];
                    for (var i in e.ResultItem) if (e.ResultItem[i].To_Account == r) {
                        var s = e.ResultItem[i].ResultCode;
                        e.ResultItem[i].ResultInfo = "[" + s + "]" + e.ResultItem[i].ResultInfo, e.ErrorInfo += e.ResultItem[i].ResultInfo + "\n";
                        break;
                    }
                }
            }
            return e;
        }, it = function(e, t, n) {
            Ie(n, !0) && Tt.apiCall(l.FRIEND, "friend_add", {
                From_Account: j.identifier,
                AddFriendItem: e.AddFriendItem
            }, function(e) {
                var o = rt(e);
                o.ActionStatus == m.FAIL ? n && n(o) : t && t(o);
            }, n);
        }, st = function(e, t, n) {
            Ie(n, !0) && Tt.apiCall(l.FRIEND, "friend_delete", {
                From_Account: j.identifier,
                To_Account: e.To_Account,
                DeleteType: e.DeleteType
            }, function(e) {
                var o = rt(e);
                o.ActionStatus == m.FAIL ? n && n(o) : t && t(o);
            }, n);
        }, ut = function(e, t, n) {
            Ie(n, !0) && Tt.apiCall(l.FRIEND, "pendency_get", {
                From_Account: j.identifier,
                PendencyType: e.PendencyType,
                StartTime: e.StartTime,
                MaxLimited: e.MaxLimited,
                LastSequence: e.LastSequence
            }, t, n);
        }, at = function(e, t, n) {
            Ie(n, !0) && Tt.apiCall(l.FRIEND, "pendency_delete", {
                From_Account: j.identifier,
                PendencyType: e.PendencyType,
                To_Account: e.To_Account
            }, function(e) {
                var o = rt(e);
                o.ActionStatus == m.FAIL ? n && n(o) : t && t(o);
            }, n);
        }, lt = function(e, t, n) {
            Ie(n, !0) && Tt.apiCall(l.FRIEND, "friend_response", {
                From_Account: j.identifier,
                ResponseFriendItem: e.ResponseFriendItem
            }, function(e) {
                var o = rt(e);
                o.ActionStatus == m.FAIL ? n && n(o) : t && t(o);
            }, n);
        }, ct = function(e, t, n) {
            Ie(n, !0) && Tt.apiCall(l.FRIEND, "friend_get_all", {
                From_Account: j.identifier,
                TimeStamp: e.TimeStamp,
                StartIndex: e.StartIndex,
                GetCount: e.GetCount,
                LastStandardSequence: e.LastStandardSequence,
                TagList: e.TagList
            }, t, n);
        }, pt = function(e, t, n) {
            Ie(n, !0) && Tt.apiCall(l.PROFILE, "portrait_get", {
                From_Account: j.identifier,
                To_Account: e.To_Account,
                TagList: e.TagList
            }, function(e) {
                var o = [];
                if (e.Fail_Account && e.Fail_Account.length && (o = e.Fail_Account), e.Invalid_Account && e.Invalid_Account.length) for (var r in e.Invalid_Account) o.push(e.Invalid_Account[r]);
                if (o.length) {
                    e.ActionStatus = m.FAIL, e.ErrorCode = 99999, e.ErrorInfo = "";
                    for (var i in o) {
                        var s = o[i];
                        for (var u in e.UserProfileItem) if (e.UserProfileItem[u].To_Account == s) {
                            var a = e.UserProfileItem[u].ResultCode;
                            e.UserProfileItem[u].ResultInfo = "[" + a + "]" + e.UserProfileItem[u].ResultInfo, 
                            e.ErrorInfo += "账号:" + s + "," + e.UserProfileItem[u].ResultInfo + "\n";
                            break;
                        }
                    }
                }
                e.ActionStatus == m.FAIL ? n && n(e) : t && t(e);
            }, n);
        }, ft = function(e, t, n) {
            Ie(n, !0) && Tt.apiCall(l.PROFILE, "portrait_set", {
                From_Account: j.identifier,
                ProfileItem: e.ProfileItem
            }, function(n) {
                for (var o in e.ProfileItem) {
                    var r = e.ProfileItem[o];
                    if ("Tag_Profile_IM_Nick" == r.Tag) {
                        j.identifierNick = r.Value;
                        break;
                    }
                }
                t && t(n);
            }, n);
        }, gt = function(e, t, n) {
            Ie(n, !0) && Tt.apiCall(l.FRIEND, "black_list_add", {
                From_Account: j.identifier,
                To_Account: e.To_Account
            }, function(e) {
                var o = rt(e);
                o.ActionStatus == m.FAIL ? n && n(o) : t && t(o);
            }, n);
        }, dt = function(e, t, n) {
            Ie(n, !0) && Tt.apiCall(l.FRIEND, "black_list_delete", {
                From_Account: j.identifier,
                To_Account: e.To_Account
            }, function(e) {
                var o = rt(e);
                o.ActionStatus == m.FAIL ? n && n(o) : t && t(o);
            }, n);
        }, mt = function(e, t, n) {
            Ie(n, !0) && Tt.apiCall(l.FRIEND, "black_list_get", {
                From_Account: j.identifier,
                StartIndex: e.StartIndex,
                MaxLimited: e.MaxLimited,
                LastSequence: e.LastSequence
            }, t, n);
        }, It = function(e, t, n) {
            Ie(n, !0) && Tt.apiCall(l.RECENT_CONTACT, "get", {
                From_Account: j.identifier,
                Count: e.Count
            }, t, n);
        }, Mt = function(e, t, n) {
            if (Ie(n, !0)) {
                var o;
                o = Me() ? "pic_up" : "pic_up_test", Tt.apiCall(l.PIC, o, {
                    App_Version: T.APP_VERSION,
                    From_Account: j.identifier,
                    To_Account: e.To_Account,
                    Seq: e.Seq,
                    Timestamp: e.Timestamp,
                    Random: e.Random,
                    File_Str_Md5: e.File_Str_Md5,
                    File_Size: e.File_Size,
                    File_Type: e.File_Type,
                    Server_Ver: T.SERVER_VERSION,
                    Auth_Key: Q,
                    Busi_Id: e.Busi_Id,
                    PkgFlag: e.PkgFlag,
                    Slice_Offset: e.Slice_Offset,
                    Slice_Size: e.Slice_Size,
                    Slice_Data: e.Slice_Data
                }, t, n);
            }
        }, Et = function(e, t) {
            Ie(t, !0) && Tt.apiCall(l.OPEN_IM, "authkey", {}, e, t);
        }, _t = function(e, t, n) {
            Ie(n, !0) && Tt.apiCall(l.IM_OPEN_STAT, "web_report", e, t, n);
        }, yt = function(e, t, n) {
            Ie(n, !0) && Tt.apiCall(l.OPEN_IM, "getlongpollingid", {}, function(e) {
                t && t(e);
            }, n);
        }, ht = function(e, t, n) {
            Tt.apiCall(l.PIC, "apply_download", e, t, n);
        };
        a = "wechat";
        var Tt = new function() {
            var e = null;
            this.init = function(t, n, o) {
                t && (e = t);
            }, this.callBack = function(t) {
                e && e(t);
            }, this.clear = function() {
                e = null;
            }, this.apiCall = function(e, t, o, r, i, s, u) {
                var a = Ee(e, t, 0, i);
                0 != a && (n && a.includes("send") && (console.log(a, o, "链接"), n = !1), de("POST", a, o, 0, 0, function(n) {
                    var s = null, u = "";
                    "pic_up" == t && (o.Slice_Data = "");
                    var l = "\n request url: \n" + a + "\n request body: \n" + JSON.stringify(o) + "\n response: \n" + JSON.stringify(n);
                    n.ActionStatus == m.OK ? (le.info("[" + e + "][" + t + "]success: " + l), r && r(n), 
                    s = 0, u = "") : (s = n.ErrorCode, u = n.ErrorInfo, i && (n.SrcErrorInfo = n.ErrorInfo, 
                    n.ErrorInfo = "[" + e + "][" + t + "]failed: " + l, "longpolling" == t && 60008 == n.ErrorCode || le.error(n.ErrorInfo), 
                    i(n))), Se(t, s, u);
                }, function(e) {
                    i && i(e), Se(t, e.ErrorCode, e.ErrorInfo);
                }));
            };
        }(), Ct = function e(t, n, o, r, i, s) {
            this._impl = {
                skey: e.skey(t, n),
                type: t,
                id: n,
                name: o,
                icon: r,
                unread: 0,
                isAutoRead: !1,
                time: i >= 0 ? i : 0,
                curMaxMsgSeq: s >= 0 ? s : 0,
                msgs: [],
                isFinished: 1
            };
        };
        Ct.skey = function(e, t) {
            return e + t;
        }, Ct.prototype.type = function() {
            return this._impl.type;
        }, Ct.prototype.id = function() {
            return this._impl.id;
        }, Ct.prototype.name = function() {
            return this._impl.name;
        }, Ct.prototype.icon = function() {
            return this._impl.icon;
        }, Ct.prototype.unread = function(e) {
            if (void 0 === e) return this._impl.unread;
            this._impl.unread = e;
        }, Ct.prototype.isFinished = function(e) {
            if (void 0 === e) return this._impl.isFinished;
            this._impl.isFinished = e;
        }, Ct.prototype.time = function() {
            return this._impl.time;
        }, Ct.prototype.curMaxMsgSeq = function(e) {
            if (void 0 === e) return this._impl.curMaxMsgSeq;
            this._impl.curMaxMsgSeq = e;
        }, Ct.prototype.msgCount = function() {
            return this._impl.msgs.length;
        }, Ct.prototype.msg = function(e) {
            return this._impl.msgs[e];
        }, Ct.prototype.msgs = function() {
            return this._impl.msgs;
        }, Ct.prototype._impl_addMsg = function(e) {
            this._impl.msgs.push(e), e.time > this._impl.time && (this._impl.time = e.time), 
            e.seq > this._impl.curMaxMsgSeq && (this._impl.curMaxMsgSeq = e.seq), e.isSend || this._impl.isAutoRead || this._impl.unread++;
        };
        var At = function(e, t) {
            this.toAccount = e, this.lastedMsgTime = t;
        }, St = function(e, t, n, o, r, i, s, u) {
            this.sess = e, this.subType = s >= 0 ? s : 0, this.fromAccount = i, this.fromAccountNick = u || i, 
            this.isSend = Boolean(t), this.seq = n >= 0 ? n : pe(), this.random = o >= 0 ? o : fe(), 
            this.time = r >= 0 ? r : ce(), this.elems = [];
        };
        St.prototype.getSession = function() {
            return this.sess;
        }, St.prototype.getType = function() {
            return this.subType;
        }, St.prototype.getSubType = function() {
            return this.subType;
        }, St.prototype.getFromAccount = function() {
            return this.fromAccount;
        }, St.prototype.getFromAccountNick = function() {
            return this.fromAccountNick;
        }, St.prototype.getIsSend = function() {
            return this.isSend;
        }, St.prototype.getSeq = function() {
            return this.seq;
        }, St.prototype.getTime = function() {
            return this.time;
        }, St.prototype.getRandom = function() {
            return this.random;
        }, St.prototype.getElems = function() {
            return this.elems;
        }, St.prototype.addText = function(e) {
            this.addElem(new r.Msg.Elem(I.TEXT, e));
        }, St.prototype.addFace = function(e) {
            this.addElem(new r.Msg.Elem(I.FACE, e));
        }, St.prototype.addImage = function(e) {
            this.addElem(new r.Msg.Elem(I.IMAGE, e));
        }, St.prototype.addLocation = function(e) {
            this.addElem(new r.Msg.Elem(I.LOCATION, e));
        }, St.prototype.addFile = function(e) {
            this.addElem(new r.Msg.Elem(I.FILE, e));
        }, St.prototype.addCustom = function(e) {
            this.addElem(new r.Msg.Elem(I.CUSTOM, e));
        }, St.prototype.addElem = function(e) {
            this.elems.push(e);
        }, St.prototype.toHtml = function() {
            var e = "";
            for (var t in this.elems) e += this.elems[t].toHtml();
            return e;
        }, (St.Elem = function(e, t) {
            this.type = e, this.content = t;
        }).prototype.getType = function() {
            return this.type;
        }, St.Elem.prototype.getContent = function() {
            return this.content;
        }, St.Elem.prototype.toHtml = function() {
            return this.content.toHtml();
        }, St.Elem.Text = function(e) {
            this.text = ae.xssFilter(e);
        }, St.Elem.Text.prototype.getText = function() {
            return this.text;
        }, St.Elem.Text.prototype.toHtml = function() {
            return this.text;
        }, St.Elem.Face = function(e, t) {
            this.index = e, this.data = t;
        }, St.Elem.Face.prototype.getIndex = function() {
            return this.index;
        }, St.Elem.Face.prototype.getData = function() {
            return this.data;
        }, St.Elem.Face.prototype.toHtml = function() {
            var e = null, t = se[this.data], n = ue[t];
            return n && n[1] && (e = n[1]), e ? "<img src='" + e + "'/>" : this.data;
        }, St.Elem.Location = function(e, t, n) {
            this.latitude = t, this.longitude = e, this.desc = n;
        }, St.Elem.Location.prototype.getLatitude = function() {
            return this.latitude;
        }, St.Elem.Location.prototype.getLongitude = function() {
            return this.longitude;
        }, St.Elem.Location.prototype.getDesc = function() {
            return this.desc;
        }, St.Elem.Location.prototype.toHtml = function() {
            return "经度=" + this.longitude + ",纬度=" + this.latitude + ",描述=" + this.desc;
        }, St.Elem.Images = function(e) {
            this.UUID = e, this.ImageInfoArray = [];
        }, St.Elem.Images.prototype.addImage = function(e) {
            this.ImageInfoArray.push(e);
        }, St.Elem.Images.prototype.toHtml = function() {
            var e = this.getImage(M.SMALL), t = this.getImage(M.LARGE), n = this.getImage(M.ORIGIN);
            return t || (t = e), n || (n = e), "<img src='" + e.getUrl() + "#" + t.getUrl() + "#" + n.getUrl() + "' style='CURSOR: hand' id='" + this.getImageId() + "' bigImgUrl='" + t.getUrl() + "' onclick='imageClick(this)' />";
        }, St.Elem.Images.prototype.getImageId = function() {
            return this.UUID;
        }, St.Elem.Images.prototype.getImage = function(e) {
            for (var t in this.ImageInfoArray) if (this.ImageInfoArray[t].getType() == e) return this.ImageInfoArray[t];
            return null;
        }, St.Elem.Images.Image = function(e, t, n, o, r) {
            this.type = e, this.size = t, this.width = n, this.height = o, this.url = r;
        }, St.Elem.Images.Image.prototype.getType = function() {
            return this.type;
        }, St.Elem.Images.Image.prototype.getSize = function() {
            return this.size;
        }, St.Elem.Images.Image.prototype.getWidth = function() {
            return this.width;
        }, St.Elem.Images.Image.prototype.getHeight = function() {
            return this.height;
        }, St.Elem.Images.Image.prototype.getUrl = function() {
            return this.url;
        }, St.Elem.Sound = function(e, t, n, o, r, i, s) {
            this.uuid = e, this.second = t, this.size = n, this.senderId = o, this.receiverId = r, 
            this.downFlag = i, this.busiId = s == f.C2C ? 2 : 1, this.downUrl = _e(e, o);
        }, St.Elem.Sound.prototype.getUUID = function() {
            return this.uuid;
        }, St.Elem.Sound.prototype.getSecond = function() {
            return this.second;
        }, St.Elem.Sound.prototype.getSize = function() {
            return this.size;
        }, St.Elem.Sound.prototype.getSenderId = function() {
            return this.senderId;
        }, St.Elem.Sound.prototype.getDownUrl = function() {
            return this.downUrl;
        }, St.Elem.Sound.prototype.toHtml = function() {
            return "ie" == a.type && parseInt(a.ver) <= 8 ? "[这是一条语音消息]demo暂不支持ie8(含)以下浏览器播放语音,语音URL:" + this.downUrl : '<audio id="uuid_' + this.uuid + '" src="' + this.downUrl + '" controls="controls" onplay="onChangePlayAudio(this)" preload="none"></audio>';
        }, St.Elem.File = function(e, t, n, o, r, i, s) {
            this.uuid = e, this.name = t, this.size = n, this.senderId = o, this.receiverId = r, 
            this.downFlag = i, this.busiId = s == f.C2C ? 2 : 1, void 0 !== i && void 0 !== busiId ? he(e, o, 0, i, r, this.busiId, h.FILE) : this.downUrl = ye(e, o, t);
        }, St.Elem.File.prototype.getUUID = function() {
            return this.uuid;
        }, St.Elem.File.prototype.getName = function() {
            return this.name;
        }, St.Elem.File.prototype.getSize = function() {
            return this.size;
        }, St.Elem.File.prototype.getSenderId = function() {
            return this.senderId;
        }, St.Elem.File.prototype.getDownUrl = function() {
            return this.downUrl;
        }, St.Elem.File.prototype.getDownFlag = function() {
            return this.downFlag;
        }, St.Elem.File.prototype.toHtml = function() {
            var e, t;
            return e = this.size, t = "Byte", this.size >= 1024 && (e = Math.round(this.size / 1024), 
            t = "KB"), '<a href="javascript" onclick="webim.onDownFile("' + this.uuid + '")" title="点击下载文件" ><i class="glyphicon glyphicon-file">&nbsp;' + this.name + "(" + e + t + ")</i></a>";
        }, St.Elem.GroupTip = function(e, t, n, o, r) {
            this.opType = e, this.opUserId = t, this.groupId = n, this.groupName = o, this.userIdList = r || [], 
            this.groupInfoList = [], this.memberInfoList = [], this.groupMemberNum = null;
        }, St.Elem.GroupTip.prototype.addGroupInfo = function(e) {
            this.groupInfoList.push(e);
        }, St.Elem.GroupTip.prototype.addMemberInfo = function(e) {
            this.memberInfoList.push(e);
        }, St.Elem.GroupTip.prototype.getOpType = function() {
            return this.opType;
        }, St.Elem.GroupTip.prototype.getOpUserId = function() {
            return this.opUserId;
        }, St.Elem.GroupTip.prototype.getGroupId = function() {
            return this.groupId;
        }, St.Elem.GroupTip.prototype.getGroupName = function() {
            return this.groupName;
        }, St.Elem.GroupTip.prototype.getUserIdList = function() {
            return this.userIdList;
        }, St.Elem.GroupTip.prototype.getGroupInfoList = function() {
            return this.groupInfoList;
        }, St.Elem.GroupTip.prototype.getMemberInfoList = function() {
            return this.memberInfoList;
        }, St.Elem.GroupTip.prototype.getGroupMemberNum = function() {
            return this.groupMemberNum;
        }, St.Elem.GroupTip.prototype.setGroupMemberNum = function(e) {
            return this.groupMemberNum = e;
        }, St.Elem.GroupTip.prototype.toHtml = function() {
            var e = "[群提示消息]";
            switch (this.opType) {
              case F.JOIN:
                e += this.opUserId + "邀请了";
                for (var t in this.userIdList) if (e += this.userIdList[t] + ",", this.userIdList.length > 10 && 9 == t) {
                    e += "等" + this.userIdList.length + "人";
                    break;
                }
                e += "加入该群";
                break;

              case F.QUIT:
                e += this.opUserId + "主动退出该群";
                break;

              case F.KICK:
                e += this.opUserId + "将";
                for (var t in this.userIdList) if (e += this.userIdList[t] + ",", this.userIdList.length > 10 && 9 == t) {
                    e += "等" + this.userIdList.length + "人";
                    break;
                }
                e += "踢出该群";
                break;

              case F.SET_ADMIN:
                e += this.opUserId + "将";
                for (var t in this.userIdList) if (e += this.userIdList[t] + ",", this.userIdList.length > 10 && 9 == t) {
                    e += "等" + this.userIdList.length + "人";
                    break;
                }
                e += "设为管理员";
                break;

              case F.CANCEL_ADMIN:
                e += this.opUserId + "取消";
                for (var t in this.userIdList) if (e += this.userIdList[t] + ",", this.userIdList.length > 10 && 9 == t) {
                    e += "等" + this.userIdList.length + "人";
                    break;
                }
                e += "的管理员资格";
                break;

              case F.MODIFY_GROUP_INFO:
                e += this.opUserId + "修改了群资料：";
                for (var t in this.groupInfoList) {
                    var n = this.groupInfoList[t].getType(), o = this.groupInfoList[t].getValue();
                    switch (n) {
                      case R.FACE_URL:
                        e += "群头像为" + o + "; ";
                        break;

                      case R.NAME:
                        e += "群名称为" + o + "; ";
                        break;

                      case R.OWNER:
                        e += "群主为" + o + "; ";
                        break;

                      case R.NOTIFICATION:
                        e += "群公告为" + o + "; ";
                        break;

                      case R.INTRODUCTION:
                        e += "群简介为" + o + "; ";
                        break;

                      default:
                        e += "未知信息为:type=" + n + ",value=" + o + "; ";
                    }
                }
                break;

              case F.MODIFY_MEMBER_INFO:
                e += this.opUserId + "修改了群成员资料:";
                for (var t in this.memberInfoList) {
                    var r = this.memberInfoList[t].getUserId(), i = this.memberInfoList[t].getShutupTime();
                    if (e += r + ": ", e += null != i && void 0 !== i ? 0 == i ? "取消禁言; " : "禁言" + i + "秒; " : " shutupTime为空", 
                    this.memberInfoList.length > 10 && 9 == t) {
                        e += "等" + this.memberInfoList.length + "人";
                        break;
                    }
                }
                break;

              case F.READED:
                Log.info("消息已读同步");
                break;

              default:
                e += "未知群提示消息类型：type=" + this.opType;
            }
            return e;
        }, St.Elem.GroupTip.GroupInfo = function(e, t) {
            this.type = e, this.value = t;
        }, St.Elem.GroupTip.GroupInfo.prototype.getType = function() {
            return this.type;
        }, St.Elem.GroupTip.GroupInfo.prototype.getValue = function() {
            return this.value;
        }, St.Elem.GroupTip.MemberInfo = function(e, t) {
            this.userId = e, this.shutupTime = t;
        }, St.Elem.GroupTip.MemberInfo.prototype.getUserId = function() {
            return this.userId;
        }, St.Elem.GroupTip.MemberInfo.prototype.getShutupTime = function() {
            return this.shutupTime;
        }, St.Elem.Custom = function(e, t, n) {
            this.data = e, this.desc = t, this.ext = n;
        }, St.Elem.Custom.prototype.getData = function() {
            return this.data;
        }, St.Elem.Custom.prototype.getDesc = function() {
            return this.desc;
        }, St.Elem.Custom.prototype.getExt = function() {
            return this.ext;
        }, St.Elem.Custom.prototype.toHtml = function() {
            return this.data;
        };
        var Gt = new function() {
            var e = {}, t = [];
            o = {}, this.cookie = "", this.syncFlag = 0;
            var n = function(t) {
                for (var n in e) t(e[n]);
            }, r = function(e) {
                var t = !1, n = e.sess._impl.skey, r = e.isSend + e.seq + e.random;
                return o[n] && o[n][r] && (t = !0), o[n] ? o[n][r] = {
                    time: e.time
                } : (o[n] = {}, o[n][r] = {
                    time: e.time
                }), t;
            };
            this.sessMap = function() {
                return e;
            }, this.sessCount = function() {
                return t.length;
            }, this.sessByTypeId = function(t, n) {
                var o = Ct.skey(t, n);
                return void 0 === o || null == o ? null : e[o];
            }, this.delSessByTypeId = function(t, n) {
                var r = Ct.skey(t, n);
                return void 0 !== r && null != r && (e[r] && (delete e[r], delete o[r]), !0);
            }, this.resetCookieAndSyncFlag = function() {
                this.cookie = "", this.syncFlag = 0;
            }, this.setAutoRead = function(e, t, o) {
                if (o && n(function(e) {
                    e._impl.isAutoRead = !1;
                }), e && (e._impl.isAutoRead = t, t)) if (e._impl.unread = 0, e._impl.type == f.C2C) {
                    var r = [];
                    r.push(new At(e._impl.id, e._impl.time)), Pe(Gt.cookie, r, function(e) {
                        le.info("[setAutoRead]: c2CMsgReaded success");
                    }, function(e) {
                        le.error("[setAutoRead}: c2CMsgReaded failed:" + e.ErrorInfo);
                    });
                } else if (e._impl.type == f.GROUP) {
                    var i = {
                        GroupId: e._impl.id,
                        MsgReadedSeq: e._impl.curMaxMsgSeq
                    };
                    ot(i, function(e) {
                        le.info("groupMsgReaded success");
                    }, function(e) {
                        le.error("groupMsgReaded failed:" + e.ErrorInfo);
                    });
                }
            }, this.c2CMsgReaded = function(e, t, n) {
                var o = [];
                o.push(new At(e.To_Account, e.LastedMsgTime)), Pe(Gt.cookie, o, function(e) {
                    t && (le.info("c2CMsgReaded success"), t(e));
                }, function(e) {
                    n && (le.error("c2CMsgReaded failed:" + e.ErrorInfo), n(e));
                });
            }, this.addSession = function(t) {
                e[t._impl.skey] = t;
            }, this.delSession = function(t) {
                delete e[t._impl.skey];
            }, this.addMsg = function(t) {
                if (r(t)) return !1;
                var n = t.sess;
                return e[n._impl.skey] || this.addSession(n), t.time > n._impl.time && (n._impl.time = t.time), 
                t.seq > n._impl.curMaxMsgSeq && (n._impl.curMaxMsgSeq = t.seq), t.isSend || n._impl.isAutoRead || n._impl.unread++, 
                !0;
            }, this.updateTimeline = function() {
                var e = new Array();
                n(function(t) {
                    e.push(t);
                }), e.sort(function(e, t) {
                    return t.time - e.time;
                }), t = e;
            };
        }(), Ot = new function() {
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
            }, r = {
                1: null
            }, i = null, s = !1, u = 0, a = 0, l = null, c = !1, p = 0, g = 90, d = null, M = {}, E = 0, _ = {}, y = {};
            this.setLongPollingOn = function(e) {
                s = e;
            }, this.getLongPollingOn = function() {
                return s;
            }, this.resetLongPollingInfo = function() {
                s = !1, u = 0, a = 0;
            }, this.setBigGroupLongPollingOn = function(e) {
                c = e;
            }, this.setBigGroupLongPollingKey = function(e) {
                d = e;
            }, this.resetBigGroupLongPollingInfo = function() {
                c = !1, p = 0, d = null, M = {};
            }, this.setBigGroupLongPollingMsgMap = function(e, t) {
                var n = M[e];
                n ? (n = parseInt(n) + t, M[e] = n) : M[e] = t;
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
                }, r = {
                    1: null
                }, e = null, s = !1, u = 0, a = 0, l = null, c = !1, p = 0, d = null, M = {}, y = {}, 
                X = [], Q = null, W = null;
            };
            var h = function(e, t) {
                Et(function(t) {
                    X = t.IpList, Q = t.AuthKey, W = t.ExpireTime, e && e(t);
                }, function(e) {
                    le.error("initIpAndAuthkey failed:" + e.ErrorInfo), t && t(e);
                });
            }, T = function(e, t) {
                var n = {
                    Member_Account: j.identifier,
                    Limit: 1e3,
                    Offset: 0,
                    GroupBaseInfoFilter: [ "NextMsgSeq" ]
                };
                $e(n, function(t) {
                    if (!t.GroupIdList || 0 == t.GroupIdList.length) return le.info("initMyGroupMaxSeqs: 目前还没有加入任何群组"), 
                    void (e && e(t));
                    for (var n = 0; n < t.GroupIdList.length; n++) {
                        var o = t.GroupIdList[n].GroupId, r = t.GroupIdList[n].NextMsgSeq - 1;
                        _[o] = r;
                    }
                    e && e(t);
                }, function(e) {
                    le.error("initMyGroupMaxSeqs failed:" + e.ErrorInfo), t && t(e);
                });
            }, A = function(e, t, n) {
                E++;
                var o = {
                    GroupId: e,
                    ReqMsgSeq: t,
                    ReqMsgNumber: n
                };
                le.warn("第" + E + "次补齐群消息,参数=" + JSON.stringify(o)), Ot.syncGroupMsgs(o);
            }, b = function(e, t) {
                var n = _[e];
                n ? t > n && (_[e] = t) : _[e] = t;
            }, U = function(e, t) {
                for (var n in e) {
                    var o = e[n];
                    if (o.From_Account) {
                        var r = re(o, !1, !0);
                        r && t.push(r), b(o.ToGroupId, o.MsgSeq);
                    }
                }
                return t;
            }, z = function(t, n) {
                var o = {}, r = [];
                for (var i in n) {
                    var s = o[n[i].ToGroupId];
                    s || (s = o[n[i].ToGroupId] = {
                        min: 99999999,
                        max: -1,
                        msgs: []
                    }), n[i].NoticeSeq > a && (le.warn("noticeSeq=" + a + ",msgNoticeSeq=" + n[i].NoticeSeq), 
                    a = n[i].NoticeSeq), n[i].Event = t, o[n[i].ToGroupId].msgs.push(n[i]), n[i].MsgSeq < s.min && (o[n[i].ToGroupId].min = n[i].MsgSeq), 
                    n[i].MsgSeq > s.max && (o[n[i].ToGroupId].max = n[i].MsgSeq);
                }
                for (var u in o) {
                    var l = o[u].max - o[u].min + 1, c = _[u];
                    c ? o[u].min - c > 1 || o[u].msgs.length < l ? (le.warn("发起一次补齐群消息请求,curMaxMsgSeq=" + c + ", minMsgSeq=" + o[u].min + ", maxMsgSeq=" + o[u].max + ", msgs.length=" + o[u].msgs.length + ", tempCount=" + l), 
                    A(u, o[u].max, o[u].max - c), b(u, o[u].max)) : r = U(o[u].msgs, r) : (le.warn("不存在该群的最大消息seq，群id=" + u), 
                    o[u].msgs.length < l ? (le.warn("发起一次补齐群消息请求,minMsgSeq=" + o[u].min + ", maxMsgSeq=" + o[u].max + ", msgs.length=" + o[u].msgs.length + ", tempCount=" + l), 
                    A(u, o[u].max, l), b(u, o[u].max)) : r = U(o[u].msgs, r));
                }
                r.length && Gt.updateTimeline(), e && r.length && e(r);
            }, V = function(t, n) {
                var o = {}, r = [];
                for (var i in n) {
                    var s = o[n[i].ToGroupId];
                    s || (s = o[n[i].ToGroupId] = {
                        min: 99999999,
                        max: -1,
                        msgs: []
                    }), n[i].NoticeSeq > a && (le.warn("noticeSeq=" + a + ",msgNoticeSeq=" + n[i].NoticeSeq), 
                    a = n[i].NoticeSeq), n[i].Event = t, o[n[i].ToGroupId].msgs.push(n[i]), n[i].MsgSeq < s.min && (o[n[i].ToGroupId].min = n[i].MsgSeq), 
                    n[i].MsgSeq > s.max && (o[n[i].ToGroupId].max = n[i].MsgSeq);
                }
                for (var u in o) {
                    var l = o[u].max - o[u].min + 1, c = _[u];
                    c ? o[u].min - c > 1 || o[u].msgs.length < l ? (le.warn("发起一次补齐群消息请求,curMaxMsgSeq=" + c + ", minMsgSeq=" + o[u].min + ", maxMsgSeq=" + o[u].max + ", msgs.length=" + o[u].msgs.length + ", tempCount=" + l), 
                    A(u, o[u].max, o[u].max - c), b(u, o[u].max)) : r = U(o[u].msgs, r) : (le.warn("不存在该群的最大消息seq，群id=" + u), 
                    o[u].msgs.length < l ? (le.warn("发起一次补齐群消息请求,minMsgSeq=" + o[u].min + ", maxMsgSeq=" + o[u].max + ", msgs.length=" + o[u].msgs.length + ", tempCount=" + l), 
                    A(u, o[u].max, l), b(u, o[u].max)) : r = U(o[u].msgs, r));
                }
                r.length && Gt.updateTimeline(), e && r.length && e(r);
            }, J = function(e, t) {
                for (var o in e) {
                    var r = e[o], i = r.MsgBody, s = i.ReportType;
                    0 == t && r.NoticeSeq && r.NoticeSeq > a && (a = r.NoticeSeq);
                    r.GroupInfo.To_Account;
                    if (t) {
                        var u = r.ToGroupId + "_" + s + "_" + i.Operator_Account;
                        if (y[u]) {
                            le.warn("收到重复的群系统消息：key=" + u);
                            continue;
                        }
                        y[u] = !0;
                    }
                    var l = {
                        SrcFlag: 0,
                        ReportType: s,
                        GroupId: r.ToGroupId,
                        GroupName: r.GroupInfo.GroupName,
                        Operator_Account: i.Operator_Account,
                        MsgTime: r.MsgTimeStamp,
                        groupReportTypeMsg: i
                    };
                    switch (s) {
                      case v.JOIN_GROUP_REQUEST:
                        l.RemarkInfo = i.RemarkInfo, l.MsgKey = i.MsgKey, l.Authentication = i.Authentication, 
                        l.UserDefinedField = r.UserDefinedField, l.From_Account = r.From_Account, l.MsgSeq = r.ClientSeq, 
                        l.MsgRandom = r.MsgRandom;
                        break;

                      case v.JOIN_GROUP_ACCEPT:
                      case v.JOIN_GROUP_REFUSE:
                        l.RemarkInfo = i.RemarkInfo;
                        break;

                      case v.KICK:
                      case v.DESTORY:
                      case v.CREATE:
                      case v.INVITED_JOIN_GROUP_REQUEST:
                      case v.QUIT:
                      case v.SET_ADMIN:
                      case v.CANCEL_ADMIN:
                      case v.REVOKE:
                      case v.READED:
                        break;

                      case v.CUSTOM:
                        l.MsgSeq = r.MsgSeq, l.UserDefinedField = i.UserDefinedField;
                        break;

                      default:
                        le.error("未知群系统消息类型：reportType=" + s);
                    }
                    if (t) s == v.JOIN_GROUP_REQUEST && n[s] && n[s](l); else if (n[s]) if (s == v.READED) for (var c = l.groupReportTypeMsg.GroupReadInfoArray, p = 0, f = c.length; p < f; p++) {
                        var g = c[p];
                        n[s](g);
                    } else n[s](l);
                }
            }, H = function(e, t) {
                var n, r, i;
                for (var s in e) {
                    switch (n = e[s], r = n.PushType, 0 == t && n.NoticeSeq && n.NoticeSeq > a && (a = n.NoticeSeq), 
                    i = {
                        Type: r
                    }, r) {
                      case N.FRIEND_ADD:
                        i.Accounts = n.FriendAdd_Account;
                        break;

                      case N.FRIEND_DELETE:
                        i.Accounts = n.FriendDel_Account;
                        break;

                      case N.PENDENCY_ADD:
                        i.PendencyList = n.PendencyAdd;
                        break;

                      case N.PENDENCY_DELETE:
                        i.Accounts = n.FrienPencydDel_Account;
                        break;

                      case N.BLACK_LIST_ADD:
                        i.Accounts = n.BlackListAdd_Account;
                        break;

                      case N.BLACK_LIST_DELETE:
                        i.Accounts = n.BlackListDel_Account;
                        break;

                      default:
                        le.error("未知好友系统通知类型：friendNotice=" + JSON.stringify(n));
                    }
                    t ? r == N.PENDENCY_ADD && o[r] && o[r](i) : o[r] && o[r](i);
                }
            }, Y = function(e, t) {
                var n, o, i;
                for (var s in e) {
                    switch (n = e[s], o = n.PushType, 0 == t && n.NoticeSeq && n.NoticeSeq > a && (a = n.NoticeSeq), 
                    i = {
                        Type: o
                    }, o) {
                      case P.PROFILE_MODIFY:
                        i.Profile_Account = n.Profile_Account, i.ProfileList = n.ProfileList;
                        break;

                      default:
                        le.error("未知资料系统通知类型：profileNotice=" + JSON.stringify(n));
                    }
                    t ? o == P.PROFILE_MODIFY && r[o] && r[o](i) : r[o] && r[o](i);
                }
            }, $ = function(e) {
                var t = e.MsgBody, o = t.ReportType, r = (e.GroupInfo.To_Account, {
                    SrcFlag: 1,
                    ReportType: o,
                    GroupId: e.ToGroupId,
                    GroupName: e.GroupInfo.GroupName,
                    Operator_Account: t.Operator_Account,
                    MsgTime: e.MsgTimeStamp
                });
                switch (o) {
                  case v.JOIN_GROUP_REQUEST:
                    r.RemarkInfo = t.RemarkInfo, r.MsgKey = t.MsgKey, r.Authentication = t.Authentication, 
                    r.UserDefinedField = e.UserDefinedField, r.From_Account = e.From_Account, r.MsgSeq = e.ClientSeq, 
                    r.MsgRandom = e.MsgRandom;
                    break;

                  case v.JOIN_GROUP_ACCEPT:
                  case v.JOIN_GROUP_REFUSE:
                    r.RemarkInfo = t.RemarkInfo;
                    break;

                  case v.KICK:
                  case v.DESTORY:
                  case v.CREATE:
                  case v.INVITED_JOIN_GROUP_REQUEST:
                  case v.QUIT:
                  case v.SET_ADMIN:
                  case v.CANCEL_ADMIN:
                  case v.REVOKE:
                    break;

                  case v.CUSTOM:
                    r.MsgSeq = e.MsgSeq, r.UserDefinedField = t.UserDefinedField;
                    break;

                  default:
                    le.error("未知群系统消息类型：reportType=" + o);
                }
                n[o] && n[o](r);
            }, Z = function(e) {
                for (var t = 0, n = e.length; t < n; t++) ee(e[t]);
            }, ee = function(e) {
                var t = e.SubMsgType;
                switch (t) {
                  case S.READED:
                    break;

                  default:
                    le.error("未知C2c系统消息：reportType=" + reportType);
                }
                if (e.ReadC2cMsgNotify.UinPairReadArray && onC2cEventCallbacks[t]) for (var n = 0, o = e.ReadC2cMsgNotify.UinPairReadArray.length; n < o; n++) {
                    var r = e.ReadC2cMsgNotify.UinPairReadArray[n];
                    onC2cEventCallbacks[t](r);
                }
            };
            this.longPolling = function(e, t) {
                function n() {
                    Re(o, function(e) {
                        for (var t in e.EventArray) {
                            var n = e.EventArray[t];
                            switch (n.Event) {
                              case C.C2C:
                                u = n.NotifySeq, le.warn("longpolling: received new c2c msg"), Ot.syncMsgs();
                                break;

                              case C.GROUP_COMMON:
                                le.warn("longpolling: received new group msgs"), V(n.Event, n.GroupMsgArray);
                                break;

                              case C.GROUP_TIP:
                                le.warn("longpolling: received new group tips"), V(n.Event, n.GroupTips);
                                break;

                              case C.GROUP_SYSTEM:
                                le.warn("longpolling: received new group system msgs"), J(n.GroupTips, !1);
                                break;

                              case C.FRIEND_NOTICE:
                                le.warn("longpolling: received new friend system notice"), H(n.FriendListMod, !1);
                                break;

                              case C.PROFILE_NOTICE:
                                le.warn("longpolling: received new profile system notice"), Y(n.ProfileDataMod, !1);
                                break;

                              case C.C2C_COMMON:
                                a = n.C2cMsgArray[0].NoticeSeq, le.warn("longpolling: received new c2c_common msg", a), 
                                z(n.Event, n.C2cMsgArray);
                                break;

                              case C.C2C_EVENT:
                                a = n.C2cNotifyMsgArray[0].NoticeSeq, le.warn("longpolling: received new c2c_event msg"), 
                                Z(n.C2cNotifyMsgArray);
                                break;

                              default:
                                le.error("longpolling收到未知新消息类型: Event=" + n.Event);
                            }
                        }
                        var o = {
                            ActionStatus: m.OK,
                            ErrorCode: 0
                        };
                        te(o);
                    }, function(e) {
                        te(e), t && t(e);
                    });
                }
                var o = {
                    Timeout: x / 1e3,
                    Cookie: {
                        NotifySeq: u,
                        NoticeSeq: a
                    }
                };
                B ? (o.Cookie.LongPollingId = B, n()) : yt(0, function(e) {
                    B = o.Cookie.LongPollingId = e.LongPollingId, x = e.Timeout > 60 ? x : 1e3 * e.Timeout, 
                    n();
                });
            }, this.bigGroupLongPolling = function(e, t) {
                ve({
                    StartSeq: p,
                    HoldTime: g,
                    Key: d
                }, function(t) {
                    var n = [];
                    if (p = t.NextSeq, g = t.HoldTime, d = t.Key, t.RspMsgList && t.RspMsgList.length > 0) {
                        for (var o, r, i, s = 0, u = t.RspMsgList.length - 1; u >= 0; u--) if (!(o = t.RspMsgList[u]).IsPlaceMsg && o.From_Account && o.MsgBody && 0 != o.MsgBody.length) switch (r = o.Event) {
                          case C.GROUP_COMMON:
                            le.info("bigGroupLongPolling: return new group msg"), (i = re(o, !1, !1)) && n.push(i), 
                            s += 1;
                            break;

                          case C.GROUP_TIP:
                          case C.GROUP_TIP2:
                            le.info("bigGroupLongPolling: return new group tip"), (i = re(o, !1, !1)) && n.push(i);
                            break;

                          case C.GROUP_SYSTEM:
                            le.info("bigGroupLongPolling: new group system msg"), $(o);
                            break;

                          default:
                            le.error("bigGroupLongPolling收到未知新消息类型: Event=" + r);
                        }
                        s > 0 && (Ot.setBigGroupLongPollingMsgMap(o.ToGroupId, s), le.warn("current bigGroupLongPollingMsgMap: " + JSON.stringify(M)));
                    }
                    K = 0;
                    var a = {
                        ActionStatus: m.OK,
                        ErrorCode: L.ON,
                        ErrorInfo: "connection is ok..."
                    };
                    Tt.callBack(a), e ? e(n) : l && l(n), c && Ot.bigGroupLongPolling();
                }, function(e) {
                    if (60008 != e.ErrorCode && (le.error(e.ErrorInfo), K++), 91101 != e.ErrorCode && (le.error("多实例登录，被kick"), 
                    i && i()), K < 10) c && Ot.bigGroupLongPolling(); else {
                        var n = {
                            ActionStatus: m.FAIL,
                            ErrorCode: L.OFF,
                            ErrorInfo: "connection is off"
                        };
                        Tt.callBack(n);
                    }
                    t && t(e);
                }, 1e3 * g);
            };
            var te = function(e) {
                if (0 == e.ErrorCode || 60008 == e.ErrorCode) {
                    q = 0, w = !1;
                    var t, n = !1;
                    switch (k) {
                      case L.INIT:
                        n = !0, k = L.ON, t = "create connection successfully(INIT->ON)";
                        break;

                      case L.ON:
                        t = "connection is on...(ON->ON)";
                        break;

                      case L.RECONNECT:
                        k = L.ON, t = "connection is on...(RECONNECT->ON)";
                        break;

                      case L.OFF:
                        n = !0, k = L.RECONNECT, t = "reconnect successfully(OFF->RECONNECT)";
                    }
                    var o = {
                        ActionStatus: m.OK,
                        ErrorCode: k,
                        ErrorInfo: t
                    };
                    n && Tt.callBack(o), s && Ot.longPolling();
                } else if (91101 == e.ErrorCode) le.error("多实例登录，被kick"), i && i(); else if (q++, 
                le.warn("longPolling接口第" + q + "次报错: " + e.ErrorInfo), q <= 10) setTimeout(ne, 100); else {
                    k = L.OFF;
                    var r = {
                        ActionStatus: m.FAIL,
                        ErrorCode: L.OFF,
                        ErrorInfo: "connection is off"
                    };
                    0 == w && Tt.callBack(r), w = !0, le.warn("5000毫秒之后,SDK会发起新的longPolling请求..."), 
                    setTimeout(ne, 5e3);
                }
            }, z = function(t, n) {
                var o = [], r = [];
                r = n;
                for (var i in r) {
                    var s, u, a, l = r[i];
                    l.From_Account == j.identifier ? (s = !0, u = l.To_Account, a = "") : (s = !1, u = l.From_Account, 
                    a = "");
                    var c = Gt.sessByTypeId(f.C2C, u);
                    c || (c = new Ct(f.C2C, u, u, a, 0, 0));
                    var p = new St(c, s, l.MsgSeq, l.MsgRandom, l.MsgTimeStamp, l.From_Account), g = null, d = null, m = null;
                    for (var M in l.MsgBody) {
                        switch (g = l.MsgBody[M], m = g.MsgType) {
                          case I.TEXT:
                            d = new St.Elem.Text(g.MsgContent.Text);
                            break;

                          case I.FACE:
                            d = new St.Elem.Face(g.MsgContent.Index, g.MsgContent.Data);
                            break;

                          case I.IMAGE:
                            d = new St.Elem.Images(g.MsgContent.UUID);
                            for (var E in g.MsgContent.ImageInfoArray) {
                                var _ = g.MsgContent.ImageInfoArray[E];
                                d.addImage(new St.Elem.Images.Image(_.Type, _.Size, _.Width, _.Height, _.URL));
                            }
                            break;

                          case I.SOUND:
                            g.MsgContent ? d = new St.Elem.Sound(g.MsgContent.UUID, g.MsgContent.Second, g.MsgContent.Size, l.From_Account, l.To_Account, g.MsgContent.Download_Flag, f.C2C) : (m = I.TEXT, 
                            d = new St.Elem.Text("[语音消息]下载地址解析出错"));
                            break;

                          case I.LOCATION:
                            d = new St.Elem.Location(g.MsgContent.Longitude, g.MsgContent.Latitude, g.MsgContent.Desc);
                            break;

                          case I.FILE:
                          case I.FILE + " ":
                            m = I.FILE, g.MsgContent ? d = new St.Elem.File(g.MsgContent.UUID, g.MsgContent.FileName, g.MsgContent.FileSize, l.From_Account, l.To_Account, g.MsgContent.Download_Flag, f.C2C) : (m = I.TEXT, 
                            d = new St.Elem.Text("[文件消息下载地址解析出错]"));
                            break;

                          case I.CUSTOM:
                            try {
                                var y = JSON.parse(g.MsgContent.Data);
                                if (y && y.userAction && y.userAction == D.ING) continue;
                            } catch (e) {}
                            m = I.CUSTOM, d = new St.Elem.Custom(g.MsgContent.Data, g.MsgContent.Desc, g.MsgContent.Ext);
                            break;

                          default:
                            m = I.TEXT, d = new St.Elem.Text("web端暂不支持" + g.MsgType + "消息");
                        }
                        p.elems.push(new St.Elem(m, d));
                    }
                    p.elems.length > 0 && Gt.addMsg(p) && o.push(p);
                }
                o.length > 0 && Gt.updateTimeline(), o.length > 0 && e && e(o);
            }, ne = function() {
                s && Ot.longPolling();
            }, oe = function(e) {
                for (var t in e) {
                    var n = e[t];
                    switch (n.Event) {
                      case C.GROUP_SYSTEM:
                        le.warn("handlerApplyJoinGroupSystemMsgs： handler new group system msg"), J(n.GroupTips, !0);
                        break;

                      default:
                        le.error("syncMsgs收到未知的群系统消息类型: Event=" + n.Event);
                    }
                }
            };
            this.syncMsgs = function(t, n) {
                var o = [], r = [];
                Ne(Gt.cookie, Gt.syncFlag, function(n) {
                    2 == n.SyncFlag && (Gt.syncFlag = 0), r = n.MsgList, Gt.cookie = n.Cookie, console.log("");
                    for (var i in r) {
                        var s, u, a, l = r[i];
                        l.From_Account == j.identifier ? (s = !0, u = l.To_Account, a = "") : (s = !1, u = l.From_Account, 
                        a = "");
                        var c = Gt.sessByTypeId(f.C2C, u);
                        c || (c = new Ct(f.C2C, u, u, a, 0, 0));
                        var p = new St(c, s, l.MsgSeq, l.MsgRandom, l.MsgTimeStamp, l.From_Account), g = null, d = null, m = null;
                        for (var M in l.MsgBody) {
                            switch (g = l.MsgBody[M], m = g.MsgType) {
                              case I.TEXT:
                                d = new St.Elem.Text(g.MsgContent.Text);
                                break;

                              case I.FACE:
                                d = new St.Elem.Face(g.MsgContent.Index, g.MsgContent.Data);
                                break;

                              case I.IMAGE:
                                d = new St.Elem.Images(g.MsgContent.UUID);
                                for (var E in g.MsgContent.ImageInfoArray) {
                                    var _ = g.MsgContent.ImageInfoArray[E];
                                    d.addImage(new St.Elem.Images.Image(_.Type, _.Size, _.Width, _.Height, _.URL));
                                }
                                break;

                              case I.SOUND:
                                g.MsgContent ? d = new St.Elem.Sound(g.MsgContent.UUID, g.MsgContent.Second, g.MsgContent.Size, l.From_Account, l.To_Account, g.MsgContent.Download_Flag, f.C2C) : (m = I.TEXT, 
                                d = new St.Elem.Text("[语音消息]下载地址解析出错"));
                                break;

                              case I.LOCATION:
                                d = new St.Elem.Location(g.MsgContent.Longitude, g.MsgContent.Latitude, g.MsgContent.Desc);
                                break;

                              case I.FILE:
                              case I.FILE + " ":
                                m = I.FILE, g.MsgContent ? d = new St.Elem.File(g.MsgContent.UUID, g.MsgContent.FileName, g.MsgContent.FileSize, l.From_Account, l.To_Account, g.MsgContent.Download_Flag, f.C2C) : (m = I.TEXT, 
                                d = new St.Elem.Text("[文件消息下载地址解析出错]"));
                                break;

                              case I.CUSTOM:
                                try {
                                    var y = JSON.parse(g.MsgContent.Data);
                                    if (y && y.userAction && y.userAction == D.ING) continue;
                                } catch (e) {}
                                m = I.CUSTOM, d = new St.Elem.Custom(g.MsgContent.Data, g.MsgContent.Desc, g.MsgContent.Ext);
                                break;

                              default:
                                m = I.TEXT, d = new St.Elem.Text("web端暂不支持" + g.MsgType + "消息");
                            }
                            p.elems.push(new St.Elem(m, d));
                        }
                        p.elems.length > 0 && Gt.addMsg(p) && o.push(p);
                    }
                    oe(n.EventArray), o.length > 0 && Gt.updateTimeline(), t ? t(o) : o.length > 0 && e && e(o);
                }, function(e) {
                    le.error("getMsgs failed:" + e.ErrorInfo), n && n(e);
                });
            }, this.getC2CHistoryMsgs = function(e, t, n) {
                if (e.Peer_Account || !n) if (e.MaxCnt || (e.MaxCnt = 15), e.MaxCnt <= 0 && n) n(ae.getReturnError("MaxCnt should be greater than 0", -14)); else if (e.MaxCnt > 15) {
                    if (n) return void n(ae.getReturnError("MaxCnt can not be greater than 15", -15));
                } else {
                    null != e.MsgKey && void 0 !== e.MsgKey || (e.MsgKey = "");
                    var o = {
                        Peer_Account: e.Peer_Account,
                        MaxCnt: e.MaxCnt,
                        LastMsgTime: e.LastMsgTime,
                        MsgKey: e.MsgKey
                    };
                    Le(o, function(n) {
                        var o = [], r = [];
                        r = n.MsgList;
                        var i = Gt.sessByTypeId(f.C2C, e.Peer_Account);
                        i || (i = new Ct(f.C2C, e.Peer_Account, e.Peer_Account, "", 0, 0));
                        for (var s in r) {
                            var u, a = r[s];
                            a.From_Account == j.identifier ? (u = !0, a.To_Account, "") : (u = !1, a.From_Account, 
                            "");
                            var l = new St(i, u, a.MsgSeq, a.MsgRandom, a.MsgTimeStamp, a.From_Account), c = null, p = null, g = null;
                            for (var d in a.MsgBody) {
                                switch (c = a.MsgBody[d], g = c.MsgType) {
                                  case I.TEXT:
                                    p = new St.Elem.Text(c.MsgContent.Text);
                                    break;

                                  case I.FACE:
                                    p = new St.Elem.Face(c.MsgContent.Index, c.MsgContent.Data);
                                    break;

                                  case I.IMAGE:
                                    p = new St.Elem.Images(c.MsgContent.UUID);
                                    for (var m in c.MsgContent.ImageInfoArray) {
                                        var M = c.MsgContent.ImageInfoArray[m];
                                        p.addImage(new St.Elem.Images.Image(M.Type, M.Size, M.Width, M.Height, M.URL));
                                    }
                                    break;

                                  case I.SOUND:
                                    c.MsgContent ? p = new St.Elem.Sound(c.MsgContent.UUID, c.MsgContent.Second, c.MsgContent.Size, a.From_Account, a.To_Account, c.MsgContent.Download_Flag, f.C2C) : (g = I.TEXT, 
                                    p = new St.Elem.Text("[语音消息]下载地址解析出错"));
                                    break;

                                  case I.LOCATION:
                                    p = new St.Elem.Location(c.MsgContent.Longitude, c.MsgContent.Latitude, c.MsgContent.Desc);
                                    break;

                                  case I.FILE:
                                  case I.FILE + " ":
                                    g = I.FILE, c.MsgContent ? p = new St.Elem.File(c.MsgContent.UUID, c.MsgContent.FileName, c.MsgContent.FileSize, a.From_Account, a.To_Account, c.MsgContent.Download_Flag, f.C2C) : (g = I.TEXT, 
                                    p = new St.Elem.Text("[文件消息下载地址解析出错]"));
                                    break;

                                  case I.CUSTOM:
                                    g = I.CUSTOM, p = new St.Elem.Custom(c.MsgContent.Data, c.MsgContent.Desc, c.MsgContent.Ext);
                                    break;

                                  default:
                                    g = I.TEXT, p = new St.Elem.Text("web端暂不支持" + c.MsgType + "消息");
                                }
                                l.elems.push(new St.Elem(g, p));
                            }
                            Gt.addMsg(l), o.push(l);
                        }
                        if (Gt.updateTimeline(), t) {
                            var E = {
                                Complete: n.Complete,
                                MsgCount: o.length,
                                LastMsgTime: n.LastMsgTime,
                                MsgKey: n.MsgKey,
                                MsgList: o
                            };
                            i.isFinished(n.Complete), t(E);
                        }
                    }, function(e) {
                        le.error("getC2CHistoryMsgs failed:" + e.ErrorInfo), n && n(e);
                    });
                } else n(ae.getReturnError("Peer_Account is empty", -13));
            }, this.syncGroupMsgs = function(t, n, o) {
                if (t.ReqMsgSeq <= 0) {
                    if (o) {
                        var r = ae.getReturnError("ReqMsgSeq must be greater than 0", -16);
                        o(r);
                    }
                } else {
                    var i = {
                        GroupId: t.GroupId,
                        ReqMsgSeq: t.ReqMsgSeq,
                        ReqMsgNumber: t.ReqMsgNumber
                    };
                    nt(i, function(t) {
                        var o = [], r = (t.GroupId, t.RspMsgList), i = t.IsFinished;
                        if (null != r && void 0 !== r) {
                            for (var s = r.length - 1; s >= 0; s--) {
                                var u = r[s];
                                if (!u.IsPlaceMsg && u.From_Account && u.MsgBody && 0 != u.MsgBody.length) {
                                    var a = re(u, !0, !0, i);
                                    a && o.push(a);
                                }
                            }
                            o.length > 0 && Gt.updateTimeline(), n ? n(o) : o.length > 0 && e && e(o);
                        } else n && n([]);
                    }, function(e) {
                        le.error("getGroupMsgs failed:" + e.ErrorInfo), o && o(e);
                    });
                }
            };
            var re = function(e, n, o, r) {
                if (e.IsPlaceMsg || !e.From_Account || !e.MsgBody || 0 == e.MsgBody.length) return null;
                var i, s, u, a = e.ToGroupId, l = a;
                e.GroupInfo && e.GroupInfo.GroupName && (l = e.GroupInfo.GroupName), u = e.From_Account, 
                e.GroupInfo && e.GroupInfo.From_AccountNick && (u = e.GroupInfo.From_AccountNick), 
                e.From_Account == j.identifier ? (i = !0, e.From_Account, s = "") : (i = !1, e.From_Account, 
                s = "");
                var c = Gt.sessByTypeId(f.GROUP, a);
                c || (c = new Ct(f.GROUP, a, l, s, 0, 0)), void 0 !== r && c.isFinished(r || 0);
                var p = G.COMMON;
                if (C.GROUP_TIP == e.Event || C.GROUP_TIP2 == e.Event) {
                    p = G.TIP;
                    var g = e.MsgBody;
                    e.MsgBody = [], e.MsgBody.push({
                        MsgType: I.GROUP_TIP,
                        MsgContent: g
                    });
                } else e.MsgPriority && (e.MsgPriority == O.REDPACKET ? p = G.REDPACKET : e.MsgPriority == O.LOVEMSG && (p = G.LOVEMSG));
                var d = new St(c, i, e.MsgSeq, e.MsgRandom, e.MsgTimeStamp, e.From_Account, p, u), m = null, M = null, E = null;
                for (var _ in e.MsgBody) {
                    switch (m = e.MsgBody[_], E = m.MsgType) {
                      case I.TEXT:
                        M = new St.Elem.Text(m.MsgContent.Text);
                        break;

                      case I.FACE:
                        M = new St.Elem.Face(m.MsgContent.Index, m.MsgContent.Data);
                        break;

                      case I.IMAGE:
                        M = new St.Elem.Images(m.MsgContent.UUID);
                        for (var y in m.MsgContent.ImageInfoArray) M.addImage(new St.Elem.Images.Image(m.MsgContent.ImageInfoArray[y].Type, m.MsgContent.ImageInfoArray[y].Size, m.MsgContent.ImageInfoArray[y].Width, m.MsgContent.ImageInfoArray[y].Height, m.MsgContent.ImageInfoArray[y].URL));
                        break;

                      case I.SOUND:
                        m.MsgContent ? M = new St.Elem.Sound(m.MsgContent.UUID, m.MsgContent.Second, m.MsgContent.Size, e.From_Account, e.To_Account, m.MsgContent.Download_Flag, f.GROUP) : (E = I.TEXT, 
                        M = new St.Elem.Text("[语音消息]下载地址解析出错"));
                        break;

                      case I.LOCATION:
                        M = new St.Elem.Location(m.MsgContent.Longitude, m.MsgContent.Latitude, m.MsgContent.Desc);
                        break;

                      case I.FILE:
                      case I.FILE + " ":
                        E = I.FILE;
                        ye(m.MsgContent.UUID, e.From_Account, m.MsgContent.FileName);
                        m.MsgContent ? M = new St.Elem.File(m.MsgContent.UUID, m.MsgContent.FileName, m.MsgContent.FileSize, e.From_Account, e.To_Account, m.MsgContent.Download_Flag, f.GROUP) : (E = I.TEXT, 
                        M = new St.Elem.Text("[文件消息]地址解析出错"));
                        break;

                      case I.GROUP_TIP:
                        var h = m.MsgContent.OpType;
                        if (M = new St.Elem.GroupTip(h, m.MsgContent.Operator_Account, a, e.GroupInfo.GroupName, m.MsgContent.List_Account), 
                        F.JOIN == h || F.QUIT == h) M.setGroupMemberNum(m.MsgContent.MemberNum); else if (F.MODIFY_GROUP_INFO == h) {
                            var T = !1, A = {
                                GroupId: a,
                                GroupFaceUrl: null,
                                GroupName: null,
                                OwnerAccount: null,
                                GroupNotification: null,
                                GroupIntroduction: null
                            }, S = m.MsgContent.MsgGroupNewInfo;
                            if (S.GroupFaceUrl) {
                                var v = new St.Elem.GroupTip.GroupInfo(R.FACE_URL, S.GroupFaceUrl);
                                M.addGroupInfo(v), T = !0, A.GroupFaceUrl = S.GroupFaceUrl;
                            }
                            if (S.GroupName) {
                                var N = new St.Elem.GroupTip.GroupInfo(R.NAME, S.GroupName);
                                M.addGroupInfo(N), T = !0, A.GroupName = S.GroupName;
                            }
                            if (S.Owner_Account) {
                                var P = new St.Elem.GroupTip.GroupInfo(R.OWNER, S.Owner_Account);
                                M.addGroupInfo(P), T = !0, A.OwnerAccount = S.Owner_Account;
                            }
                            if (S.GroupNotification) {
                                var b = new St.Elem.GroupTip.GroupInfo(R.NOTIFICATION, S.GroupNotification);
                                M.addGroupInfo(b), T = !0, A.GroupNotification = S.GroupNotification;
                            }
                            if (S.GroupIntroduction) {
                                var L = new St.Elem.GroupTip.GroupInfo(R.INTRODUCTION, S.GroupIntroduction);
                                M.addGroupInfo(L), T = !0, A.GroupIntroduction = S.GroupIntroduction;
                            }
                            0 == n && T && t && t(A);
                        } else if (F.MODIFY_MEMBER_INFO == h) {
                            var U = m.MsgContent.MsgMemberInfo;
                            for (var D in U) {
                                var k = U[D];
                                M.addMemberInfo(new St.Elem.GroupTip.MemberInfo(k.User_Account, k.ShutupTime));
                            }
                        }
                        break;

                      case I.CUSTOM:
                        E = I.CUSTOM, M = new St.Elem.Custom(m.MsgContent.Data, m.MsgContent.Desc, m.MsgContent.Ext);
                        break;

                      default:
                        E = I.TEXT, M = new St.Elem.Text("web端暂不支持" + m.MsgType + "消息");
                    }
                    d.elems.push(new St.Elem(E, M));
                }
                return 0 == o ? d : Gt.addMsg(d) ? d : null;
            };
            this.init = function(u, a, c) {
                if (u.onMsgNotify || le.warn("listeners.onMsgNotify is empty"), e = u.onMsgNotify, 
                u.onBigGroupMsgNotify ? l = u.onBigGroupMsgNotify : le.warn("listeners.onBigGroupMsgNotify is empty"), 
                u.onC2cEventNotifys ? onC2cEventCallbacks = u.onC2cEventNotifys : le.warn("listeners.onC2cEventNotifys is empty"), 
                u.onGroupSystemNotifys ? n = u.onGroupSystemNotifys : le.warn("listeners.onGroupSystemNotifys is empty"), 
                u.onGroupInfoChangeNotify ? t = u.onGroupInfoChangeNotify : le.warn("listeners.onGroupInfoChangeNotify is empty"), 
                u.onFriendSystemNotifys ? o = u.onFriendSystemNotifys : le.warn("listeners.onFriendSystemNotifys is empty"), 
                u.onProfileSystemNotifys ? r = u.onProfileSystemNotifys : le.warn("listeners.onProfileSystemNotifys is empty"), 
                u.onKickedEventCall ? i = u.onKickedEventCall : le.warn("listeners.onKickedEventCall is empty"), 
                u.onAppliedDownloadUrl ? onAppliedDownloadUrl = u.onAppliedDownloadUrl : le.warn("listeners.onAppliedDownloadUrl is empty"), 
                j.identifier && j.userSig) T(function(e) {
                    le.info("initMyGroupMaxSeqs success"), h(function(e) {
                        if (le.info("initIpAndAuthkey success"), a) {
                            le.info("login success(have login state))");
                            var t = {
                                ActionStatus: m.OK,
                                ErrorCode: 0,
                                ErrorInfo: "login success"
                            };
                            a(t);
                        }
                        Ot.setLongPollingOn(!0), s && Ot.longPolling(a);
                    }, c);
                }, c); else if (a) {
                    var p = {
                        ActionStatus: m.OK,
                        ErrorCode: 0,
                        ErrorInfo: "login success(no login state)"
                    };
                    a(p);
                }
            }, this.sendMsg = function(e, t, n) {
                Fe(e, function(n) {
                    if (e.sess.type() == f.C2C) {
                        if (!Gt.addMsg(e)) {
                            var o = "sendMsg: addMsg failed!";
                            ae.getReturnError(o, -17);
                            return le.error(o), Gt.updateTimeline(), void (t && t(n));
                        }
                        Gt.updateTimeline();
                    }
                    t && t(n);
                }, function(e) {
                    n && n(e);
                });
            };
        }(), Ft = new function() {
            this.fileMd5 = null;
            var e = function(e, t, n) {
                function o() {
                    var t = a * s, n = t + s >= e.size ? e.size : t + s, o = i.call(e, t, n);
                    r.readAsArrayBuffer(o);
                }
                var r = null;
                try {
                    r = new FileReader();
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    if (n) return void n(ae.getReturnError("当前浏览器不支持FileReader", -18));
                }
                var i = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice;
                if (i || !n) {
                    var s = 2097152, u = Math.ceil(e.size / s), a = 0, l = new SparkMD5();
                    r.onload = function(e) {
                        for (var n = "", r = new Uint8Array(e.target.result), i = r.byteLength, s = 0; s < i; s++) n += String.fromCharCode(r[s]);
                        l.appendBinary(n), ++a < u ? o() : (this.fileMd5 = l.end(), t && t(this.fileMd5));
                    }, o();
                } else n(ae.getReturnError("当前浏览器不支持FileAPI", -19));
            };
            this.submitUploadFileForm = function(e, t, n) {
                function o(e, t) {
                    var n = document.createElement("input");
                    n.type = "hidden", n.name = e, n.value = t, f.appendChild(n);
                }
                function r() {
                    var e;
                    try {
                        e = JSON.parse(d.contentWindow.name) || {};
                    } catch (t) {
                        t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                        e = {};
                    }
                    e.ActionStatus ? (d.src = "about:blank", d.parentNode.removeChild(d), d = null, 
                    e.ActionStatus == m.OK ? t && t(e) : n && n(e)) : setTimeout(r, 100);
                }
                var i, s, u = e.formId, a = e.fileId, l = "uploadResultIframe_" + Y++, c = e.To_Account, p = e.businessType, f = document.getElementById(u);
                if (!f) return i = "获取表单对象为空: formId=" + u + "(formId非法)", s = ae.getReturnError(i, -20), 
                void (n && n(s));
                var g = document.getElementById(a);
                if (!g) return i = "获取文件对象为空: fileId=" + a + "(没有选择文件或者fileId非法)", s = ae.getReturnError(i, -21), 
                void (n && n(s));
                g.name = "file";
                var d = document.createElement("iframe");
                d.name = l, d.id = l, d.style.display = "none", document.body.appendChild(d);
                var I, M = "https://pic.tim.qq.com/v4/openpic/" + (I = Me() ? "pic_up" : "pic_up_test") + "?tinyid=" + j.tinyid + "&a2=" + j.a2 + "&sdkappid=" + j.sdkAppID + "&accounttype=" + j.accountType + "&contenttype=http";
                f.action = M, f.method = "post", f.target = l, o("App_Version", T.APP_VERSION), 
                o("From_Account", j.identifier), o("To_Account", c), o("Seq", pe().toString()), 
                o("Timestamp", ce().toString()), o("Random", fe().toString()), o("Busi_Id", p), 
                o("PkgFlag", E.RAW_DATA.toString()), o("Auth_Key", Q), o("Server_Ver", T.SERVER_VERSION.toString()), 
                o("File_Type", e.fileType), setTimeout(r, 500), f.submit();
            }, this.uploadFile = function(t, n, o) {
                var r = {
                    init: function(e, t, n) {
                        var o = this;
                        o.file = e.file, o.onProgressCallBack = e.onProgressCallBack, e.abortButton && (e.abortButton.onclick = o.abortHandler), 
                        o.total = o.file.size, o.loaded = 0, o.step = 1105920, o.sliceSize = 0, o.sliceOffset = 0, 
                        o.timestamp = ce(), o.seq = pe(), o.random = fe(), o.fromAccount = j.identifier, 
                        o.toAccount = e.To_Account, o.fileMd5 = e.fileMd5, o.businessType = e.businessType, 
                        o.fileType = e.fileType, o.cbOk = t, o.cbErr = n, o.reader = new FileReader(), o.blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice, 
                        o.reader.onloadstart = o.onLoadStart, o.reader.onprogress = o.onProgress, o.reader.onabort = o.onAbort, 
                        o.reader.onerror = o.onerror, o.reader.onload = o.onLoad, o.reader.onloadend = o.onLoadEnd;
                    },
                    upload: function() {
                        r.readBlob(0);
                    },
                    onLoadStart: function() {},
                    onProgress: function(e) {
                        var t = r;
                        t.loaded += e.loaded, t.onProgressCallBack && t.onProgressCallBack(t.loaded, t.total);
                    },
                    onAbort: function() {},
                    onError: function() {},
                    onLoad: function(e) {
                        var t = r;
                        if (e.target.readyState == FileReader.DONE) {
                            var n = e.target.result, o = n.indexOf(",");
                            -1 != o && (n = n.substr(o + 1));
                            var i = {
                                From_Account: t.fromAccount,
                                To_Account: t.toAccount,
                                Busi_Id: t.businessType,
                                File_Type: t.fileType,
                                File_Str_Md5: t.fileMd5,
                                PkgFlag: E.BASE64_DATA,
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
                                    t.fileType == h.FILE && (n.URL_INFO = ye(e.File_UUID, j.identifier, t.file.name)), 
                                    t.cbOk(n);
                                }
                                z = 0;
                            };
                            Mt(i, s, function e(n) {
                                z < 20 ? (z++, setTimeout(function() {
                                    Mt(i, s, e);
                                }, 1e3)) : t.cbErr(n);
                            });
                        }
                    },
                    onLoadEnd: function() {},
                    readBlob: function(e) {
                        var t, n = r, o = n.file, i = e + n.step;
                        i > n.total ? (i = n.total, n.sliceSize = i - e) : n.sliceSize = n.step, n.sliceOffset = e, 
                        t = n.blobSlice.call(o, e, i), n.reader.readAsDataURL(t);
                    },
                    abortHandler: function() {
                        var e = r;
                        e.reader && e.reader.abort();
                    }
                };
                e(t.file, function(e) {
                    le.info("fileMd5: " + e), t.fileMd5 = e, r.init(t, n, o), r.upload();
                }, o);
            };
        }();
        r.SESSION_TYPE = f, r.MSG_MAX_LENGTH = d, r.C2C_MSG_SUB_TYPE = A, r.GROUP_MSG_SUB_TYPE = G, 
        r.MSG_ELEMENT_TYPE = I, r.GROUP_TIP_TYPE = F, r.IMAGE_TYPE = M, r.GROUP_SYSTEM_TYPE = v, 
        r.FRIEND_NOTICE_TYPE = N, r.GROUP_TIP_MODIFY_GROUP_INFO_TYPE = R, r.BROWSER_INFO = a, 
        r.Emotions = r.EmotionPicData = ue, r.EmotionDataIndexs = r.EmotionPicDataIndex = se, 
        r.TLS_ERROR_CODE = b, r.CONNECTION_STATUS = L, r.UPLOAD_PIC_BUSSINESS_TYPE = U, 
        r.RECENT_CONTACT_TYPE = g, r.UPLOAD_RES_TYPE = h, r.Tool = ae, r.Log = le, r.Msg = St, 
        r.Session = Ct, r.MsgStore = {
            sessMap: function() {
                return Gt.sessMap();
            },
            sessCount: function() {
                return Gt.sessCount();
            },
            sessByTypeId: function(e, t) {
                return Gt.sessByTypeId(e, t);
            },
            delSessByTypeId: function(e, t) {
                return Gt.delSessByTypeId(e, t);
            },
            resetCookieAndSyncFlag: function() {
                return Gt.resetCookieAndSyncFlag();
            }
        }, r.Resources = ie, r.login = r.init = function(e, t, n, o, r) {
            Tt.init(t.onConnNotify, o, r), t.jsonpCallback && (H = t.jsonpCallback), Ae(e, t, n, o, r);
        }, r.logout = r.offline = function(e, t) {
            return Oe("instance", e, t);
        }, r.logoutAll = function(e, t) {
            return Oe("all", e, t);
        }, r.sendMsg = function(e, t, n) {
            return Ot.sendMsg(e, t, n);
        }, r.syncMsgs = function(e, t) {
            return Ot.syncMsgs(e, t);
        }, r.getC2CHistoryMsgs = function(e, t, n) {
            return Ot.getC2CHistoryMsgs(e, t, n);
        }, r.syncGroupMsgs = function(e, t, n) {
            return Ot.syncGroupMsgs(e, t, n);
        }, r.c2CMsgReaded = function(e, t, n) {
            return Gt.c2CMsgReaded(e, t, n);
        }, r.groupMsgReaded = function(e, t, n) {
            return ot(e, t, n);
        }, r.setAutoRead = function(e, t, n) {
            return Gt.setAutoRead(e, t, n);
        }, r.createGroup = function(e, t, n) {
            return Ue(e, t, n);
        }, r.createGroupHigh = function(e, t, n) {
            return De(e, t, n);
        }, r.applyJoinGroup = function(e, t, n) {
            return we(e, t, n);
        }, r.handleApplyJoinGroupPendency = function(e, t, n) {
            return xe(e, t, n);
        }, r.deleteApplyJoinGroupPendency = function(e, t, n) {
            return be(e, t, n);
        }, r.quitGroup = function(e, t, n) {
            return Be(e, t, n);
        }, r.searchGroupByName = function(e, t, n) {
            return ze(e, t, n);
        }, r.getGroupPublicInfo = function(e, t, n) {
            return Ve(e, t, n);
        }, r.getGroupInfo = function(e, t, n) {
            return Je(e, t, n);
        }, r.modifyGroupBaseInfo = function(e, t, n) {
            return ke(e, t, n);
        }, r.getGroupMemberInfo = function(e, t, n) {
            return He(e, t, n);
        }, r.addGroupMember = function(e, t, n) {
            return Ye(e, t, n);
        }, r.modifyGroupMember = function(e, t, n) {
            return Xe(e, t, n);
        }, r.deleteGroupMember = function(e, t, n) {
            return Qe(e, t, n);
        }, r.destroyGroup = function(e, t, n) {
            return We(e, t, n);
        }, r.changeGroupOwner = function(e, t, n) {
            return je(e, t, n);
        }, r.getJoinedGroupListHigh = function(e, t, n) {
            return $e(e, t, n);
        }, r.getRoleInGroup = function(e, t, n) {
            return Ze(e, t, n);
        }, r.forbidSendMsg = function(e, t, n) {
            return et(e, t, n);
        }, r.sendCustomGroupNotify = function(e, t, n) {
            return tt(e, t, n);
        }, r.applyJoinBigGroup = function(e, t, n) {
            return qe(e, t, n);
        }, r.quitBigGroup = function(e, t, n) {
            return Ke(e, t, n);
        }, r.getProfilePortrait = function(e, t, n) {
            return pt(e, t, n);
        }, r.setProfilePortrait = function(e, t, n) {
            return ft(e, t, n);
        }, r.applyAddFriend = function(e, t, n) {
            return it(e, t, n);
        }, r.getPendency = function(e, t, n) {
            return ut(e, t, n);
        }, r.deletePendency = function(e, t, n) {
            return at(e, t, n);
        }, r.responseFriend = function(e, t, n) {
            return lt(e, t, n);
        }, r.getAllFriend = function(e, t, n) {
            return ct(e, t, n);
        }, r.deleteFriend = function(e, t, n) {
            return st(e, t, n);
        }, r.addBlackList = function(e, t, n) {
            return gt(e, t, n);
        }, r.deleteBlackList = function(e, t, n) {
            return dt(e, t, n);
        }, r.getBlackList = function(e, t, n) {
            return mt(e, t, n);
        }, r.getRecentContactList = function(e, t, n) {
            return It(e, t, n);
        }, r.uploadFile = r.uploadPic = function(e, t, n) {
            return Ft.uploadFile(e, t, n);
        }, r.submitUploadFileForm = function(e, t, n) {
            return Ft.submitUploadFileForm(e, t, n);
        }, r.uploadFileByBase64 = r.uploadPicByBase64 = function(e, t, n) {
            var o = {
                To_Account: e.toAccount,
                Busi_Id: e.businessType,
                File_Type: e.File_Type,
                File_Str_Md5: e.fileMd5,
                PkgFlag: E.BASE64_DATA,
                File_Size: e.totalSize,
                Slice_Offset: 0,
                Slice_Size: e.totalSize,
                Slice_Data: e.base64Str,
                Seq: pe(),
                Timestamp: ce(),
                Random: fe()
            };
            return Mt(o, t, n);
        }, r.setJsonpLastRspData = function(e) {
            J = "string" == typeof e ? JSON.parse(e) : e;
        }, r.getLongPollingId = function(e, t, n) {
            return yt(0, t, n);
        }, r.applyDownload = function(e, t, n) {
            return ht(e, t, n);
        }, r.onDownFile = function(e) {
            window.open(ie.downloadMap["uuid_" + e]);
        }, r.checkLogin = function(e, t) {
            return Ie(e, t);
        };
    }(r), r;
}();