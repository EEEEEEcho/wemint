function e(e, o, n) {
    o && o(r(e));
    var t, i, s, c;
    if (t = e.getElems(), console.log("----\x3e msg.fromAccount: " + e.fromAccount + ", identifier: " + G.identifier), 
    e.fromAccount !== G.identifier) {
        for (var a in t) if (i = t[a]) if (s = i.getType(), console.log("0x256 - type: " + s), 
        c = i.getContent()) if ("TIMCustomElem" === s) {
            var u = c.getExt(), l = c.getData();
            if ("TXWhiteBoardExt" === u) {
                console.log("无压缩数据类型： TXWhiteBoardExt"), n && n(l);
                break;
            }
        } else "TIMCustomFile" === s && console.warn("已压缩压缩数据类型： TXWhiteBoardExt_gzip_"); else console.log("content is null");
    } else console.log("self msg");
}

function o(e, o) {
    var n, t, r, s, c;
    switch ((n = e.getFromAccount()) || (n = ""), (t = e.getFromAccountNick()) || (t = n), 
    r = e.getSession().type(), s = e.getSubType(), r) {
      case R.SESSION_TYPE.C2C:
        switch (s) {
          case R.C2C_MSG_SUB_TYPE.COMMON:
            console.log(e.elems[0], "kkkkkk"), e.elems[0].content.text && e.elems[0].content.text.indexOf("csyzwfelab20180425hhhdfq") > -1 ? c = JSON.parse(e.elems[0].content.text) : e.elems[0].type && e.elems[0].type == R.MSG_ELEMENT_TYPE.SOUND ? (console.log("收到语音消息", e.elems[0].content), 
            c = e.elems[0].content) : c = i(e), R.Log.warn("receive a new c2c msg: fromAccountNick=" + t + ", content=" + c);
            var a = {
                To_Account: n,
                LastedMsgTime: e.getTime()
            };
            R.c2CMsgReaded(a), console.error("收到一条c2c消息(好友消息或者全员推送消息): 发送人=" + t + ", 内容=" + c);
        }
        break;

      case R.SESSION_TYPE.GROUP:
    }
    return {
        content: c,
        fromAccountNick: t
    };
}

function n(e, o, n, r, i) {
    R.login(e, o, n, function(o) {
        console.debug(o), console.debug(o), R.Log.info("webim登录成功", e), console.log("webim登陆成功", e), 
        G = e, t({
            ProfileItem: [ {
                Tag: "Tag_Profile_IM_Nick",
                Value: e.identifierNick
            } ]
        }, function() {}), i ? r && r(i) : r && r();
    }, function(e) {
        console.log("webim登录失败", e.message), console.error(e.ErrorInfo);
    });
}

function t(e, o) {
    R.setProfilePortrait(e, function(e) {
        R.Log.info("修改昵称成功"), o && o();
    }, function(e) {
        console.log("修改昵称失败", e), o && o(e);
    });
}

function r(e) {
    var o, n;
    e.getFromAccount(), (o = e.getFromAccountNick()) || (o = "未知用户"), e.getSession().type(), 
    n = e.getSubType(), e.getIsSend();
    var t = "";
    switch (n) {
      case R.GROUP_MSG_SUB_TYPE.COMMON:
        t = i(e);
        break;

      case R.GROUP_MSG_SUB_TYPE.REDPACKET:
        t = "[群红包消息]" + i(e);
        break;

      case R.GROUP_MSG_SUB_TYPE.LOVEMSG:
        t = "[群点赞消息]" + i(e), E();
        break;

      case R.GROUP_MSG_SUB_TYPE.TIP:
        t = "[群提示消息]" + i(e);
    }
    return {
        fromAccountNick: o,
        content: t
    };
}

function i(e) {
    var o, n, t, r, i = "";
    o = e.getElems();
    for (var T in o) switch (n = o[T], t = n.getType(), r = n.getContent(), t) {
      case R.MSG_ELEMENT_TYPE.TEXT:
        i += s(r);
        break;

      case R.MSG_ELEMENT_TYPE.FACE:
        i += c(r);
        break;

      case R.MSG_ELEMENT_TYPE.IMAGE:
        i += a(r);
        break;

      case R.MSG_ELEMENT_TYPE.SOUND:
        i += u(r);
        break;

      case R.MSG_ELEMENT_TYPE.FILE:
        i += l(r);
        break;

      case R.MSG_ELEMENT_TYPE.LOCATION:
        break;

      case R.MSG_ELEMENT_TYPE.CUSTOM:
        i += g(r);
        break;

      case R.MSG_ELEMENT_TYPE.GROUP_TIP:
        i += f(r);
        break;

      default:
        R.Log.error("未知消息元素类型: elemType=" + t);
    }
    return R.Tool.formatHtml2Text(i);
}

function s(e) {
    return e.getText();
}

function c(e) {
    return e.getData();
}

function a(e) {
    var o = e.getImage(R.IMAGE_TYPE.SMALL), n = e.getImage(R.IMAGE_TYPE.LARGE), t = e.getImage(R.IMAGE_TYPE.ORIGIN);
    return n || (n = o), t || (t = o), "<img src='" + o.getUrl() + "#" + n.getUrl() + "#" + t.getUrl() + "' style='CURSOR: hand' id='" + e.getImageId() + "' bigImgUrl='" + n.getUrl() + "' onclick='imageClick(this)' />";
}

function u(e) {
    e.getSecond();
    var o = e.getDownUrl();
    return "ie" == R.BROWSER_INFO.type && parseInt(R.BROWSER_INFO.ver) <= 8 ? "[这是一条语音消息]demo暂不支持ie8(含)以下浏览器播放语音,语音URL:" + o : '<audio src="' + o + '" controls="controls" onplay="onChangePlayAudio(this)" preload="none"></audio>';
}

function l(e) {
    var o = Math.round(e.getSize() / 1024);
    return '<a href="' + e.getDownUrl() + '" title="点击下载文件" ><i class="glyphicon glyphicon-file">&nbsp;' + e.getName() + "(" + o + "KB)</i></a>";
}

function g(e) {
    var o = e.getData();
    e.getDesc(), e.getExt();
    return o;
}

function f(e) {
    var o, n, t, r, i = "";
    switch (o = e.getOpType(), n = e.getOpUserId(), o) {
      case R.GROUP_TIP_TYPE.JOIN:
        t = e.getUserIdList();
        for (var s in t) if (i += t[s] + ",", t.length > 10 && 9 == s) {
            i += "等" + t.length + "人";
            break;
        }
        i = i.substring(0, i.length - 1), i += "进入房间", i += ';{"type":' + o + ',"userIdList":"' + t.join(",") + '"}', 
        r = parseInt(r) + 1;
        break;

      case R.GROUP_TIP_TYPE.QUIT:
        i += n + "离开房间", i += ';{"type":' + o + ',"userIdList":"' + n + '"}', r > 0 && (r = parseInt(r) - 1);
        break;

      case R.GROUP_TIP_TYPE.KICK:
        i += n + "将", t = e.getUserIdList();
        for (var s in t) if (i += t[s] + ",", t.length > 10 && 9 == s) {
            i += "等" + t.length + "人";
            break;
        }
        i += "踢出该群";
        break;

      case R.GROUP_TIP_TYPE.SET_ADMIN:
        i += n + "将", t = e.getUserIdList();
        for (var s in t) if (i += t[s] + ",", t.length > 10 && 9 == s) {
            i += "等" + t.length + "人";
            break;
        }
        i += "设为管理员";
        break;

      case R.GROUP_TIP_TYPE.CANCEL_ADMIN:
        i += n + "取消", t = e.getUserIdList();
        for (var s in t) if (i += t[s] + ",", t.length > 10 && 9 == s) {
            i += "等" + t.length + "人";
            break;
        }
        i += "的管理员资格";
        break;

      case R.GROUP_TIP_TYPE.MODIFY_GROUP_INFO:
        i += n + "修改了群资料：";
        var c, a, u = e.getGroupInfoList();
        for (var s in u) switch (c = u[s].getType(), a = u[s].getValue(), c) {
          case R.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.FACE_URL:
            i += "群头像为" + a + "; ";
            break;

          case R.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NAME:
            i += "群名称为" + a + "; ";
            break;

          case R.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.OWNER:
            i += "群主为" + a + "; ";
            break;

          case R.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NOTIFICATION:
            i += "群公告为" + a + "; ";
            break;

          case R.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.INTRODUCTION:
            i += "群简介为" + a + "; ";
            break;

          default:
            i += "未知信息为:type=" + c + ",value=" + a + "; ";
        }
        break;

      case R.GROUP_TIP_TYPE.MODIFY_MEMBER_INFO:
        i += n + "修改了群成员资料:";
        var l, g, f = e.getMemberInfoList();
        for (var s in f) if (l = f[s].getUserId(), g = f[s].getShutupTime(), i += l + ": ", 
        i += null != g && void 0 !== g ? 0 == g ? "取消禁言; " : "禁言" + g + "秒; " : " shutupTime为空", 
        f.length > 10 && 9 == s) {
            i += "等" + f.length + "人";
            break;
        }
        break;

      default:
        i += "未知群提示消息类型：type=" + o;
    }
    return i;
}

function T() {
    console.warn("tlslogin need rewrite");
}

function d() {}

function M() {}

function p() {}

function m() {}

function E() {}

function _(e) {
    $("#send_msg_text").val($("#send_msg_text").val() + e.id);
}

function I(e, o, n, t, r, i) {
    var s = "收到一条群系统消息: type=" + e + ", typeCh=" + o + ",群ID=" + n + ", 群名称=" + t + ", 内容=" + r + ", 时间=" + R.Tool.formatTimeStamp(i);
    R.Log.warn(s), console.error(s);
}

var G, O, S, P, N, y, C, h, v, R = require("webim_wx.js");

module.exports = {
    init: function(e) {
        O = e.accountMode, S = e.accountType, P = e.sdkAppID, N = e.avChatRoomId || 0, y = e.selType, 
        C = e.selToID;
    },
    onBigGroupMsgNotify: function(o, n, t) {
        for (var r = o.length - 1; r >= 0; r--) {
            var i = o[r];
            console.log("***onBigGroupMsgNotify***", i), R.Log.warn("receive a new avchatroom group msg: " + i.getFromAccountNick()), 
            e(i, n, t), console.log("监听大群新消息", i);
        }
    },
    onMsgNotify: function(e, n) {
        R.setAutoRead(h, !0, !0), console.log("***777***", e);
        for (var t in e) n(o(e[t]));
    },
    handlderMsg: o,
    sdkLogin: n,
    createBigGroup: function(e, o, n) {
        R.createGroup({
            GroupId: e.roomID,
            Owner_Account: e.userID,
            Type: "AVChatRoom",
            Name: e.roomName || "",
            MaxMemberCount: 500,
            ApplyJoinOption: "FreeAccess",
            MemberList: []
        }, function(e) {
            e.ErrorCode ? o && o({
                code: e.ErrorCode,
                errMsg: e.err_msg,
                callback: n
            }) : o && o({
                code: 0,
                callback: n
            });
        }, function(e) {
            o && o({
                errCode: e.ErrorCode,
                errMsg: e.ErrorInfo || "webim建房失败"
            });
        });
    },
    applyJoinBigGroup: function(e, o, n) {
        var t = {
            GroupId: e
        };
        console.log("***applyJoinBigGroup***", e), N = e, h = null, R.applyJoinBigGroup(t, function(t) {
            t.JoinedStatus && "JoinedSuccess" == t.JoinedStatus ? (R.Log.info("进群成功"), console.log("进群成功"), 
            C = e, o && o({
                errCode: 0,
                callback: n
            })) : (console.error("进群失败"), o && o({
                errCode: 999,
                errMsg: "IM进群失败",
                callback: n
            }));
        }, function(e) {
            console.error(e.ErrorInfo), console.log("进群请求失败", e.ErrorInfo), o && o({
                errCode: 999,
                errMsg: e.ErrorInfo || "IM进群失败",
                callback: n
            });
        });
    },
    showMsg: r,
    convertMsgtoHtml: i,
    convertTextMsgToHtml: s,
    convertFaceMsgToHtml: c,
    convertImageMsgToHtml: a,
    convertSoundMsgToHtml: u,
    convertFileMsgToHtml: l,
    convertLocationMsgToHtml: function(e) {
        return "经度=" + e.getLongitude() + ",纬度=" + e.getLatitude() + ",描述=" + e.getDesc();
    },
    convertCustomMsgToHtml: g,
    convertGroupTipMsgToHtml: f,
    tlsLogin: T,
    tlsGetUserSig: function(e) {
        if (e.ErrorCode == R.TLS_ERROR_CODE.OK) {
            G.identifier = R.Tool.getQueryString("identifier"), G.userSig = e.UserSig, G.sdkAppID = G.appIDAt3rd = Number(R.Tool.getQueryString("sdkappid"));
            var o = R.Tool.getCookie("accountType");
            o ? (G.accountType = o, n()) : location.href = location.href.replace(/\?.*$/gi, "");
        } else e.ErrorCode == R.TLS_ERROR_CODE.SIGNATURE_EXPIRATION ? T() : console.error("[" + e.ErrorCode + "]" + e.ErrorInfo);
    },
    imageClick: function(e) {
        var o = e.src.split("#"), n = o[0], t = o[1], r = o[2];
        R.Log.info("小图url:" + n), R.Log.info("大图url:" + t), R.Log.info("原图url:" + r);
    },
    onChangePlayAudio: function(e) {
        curPlayAudio ? curPlayAudio != e && (curPlayAudio.currentTime = 0, curPlayAudio.pause(), 
        curPlayAudio = e) : curPlayAudio = e;
    },
    smsPicClick: function() {
        G.identifier ? (M(), d()) : 1 == O ? (R.Tool.setCookie("accountType", G.accountType, 86400), 
        T()) : console.error("请填写帐号和票据");
    },
    onSendMsg: function(e, o, n, t, i) {
        if (console.log("accountMode", o), n && (G.identifierNick = n), G.identifier) if (o.myselToID && (C = o.myselToID), 
        C) {
            var s = e, c = R.Tool.getStrBytes(e);
            if (s.length < 1) console.error("发送的消息不能为空!"); else {
                var a, u, l = o.TYPE || y, g = o.myselToID || C;
                if (l == R.SESSION_TYPE.GROUP ? (a = R.MSG_MAX_LENGTH.GROUP, u = "消息长度超出限制(最多" + Math.round(a / 3) + "汉字)") : (a = R.MSG_MAX_LENGTH.C2C, 
                u = "消息长度超出限制(最多" + Math.round(a / 3) + "汉字)"), c > a) console.error(u); else {
                    h = new R.Session(l, g, g, v, Math.round(new Date().getTime() / 1e3));
                    var f, d = Math.round(4294967296 * Math.random()), M = Math.round(new Date().getTime() / 1e3);
                    f = l == R.SESSION_TYPE.GROUP ? R.GROUP_MSG_SUB_TYPE.COMMON : R.C2C_MSG_SUB_TYPE.COMMON;
                    var e = new R.Msg(h, !0, -1, d, M, G.identifier, f, G.identifierNick), p = /\[[^[\]]{1,3}\]/gm;
                    console.log(s, "fefeff");
                    var m, E, _, I, S, P = s.match(p);
                    if (!P || P.length < 1) m = new R.Msg.Elem.Text(s), console.log("***text_obj***", m), 
                    e.addText(m); else {
                        for (var N = 0; N < P.length; N++) (_ = s.substring(0, s.indexOf(P[N]))) && (m = new R.Msg.Elem.Text(_), 
                        e.addText(m)), I = R.EmotionDataIndexs[P[N]], R.Emotions[I] ? (E = new R.Msg.Elem.Face(I, P[N]), 
                        e.addFace(E)) : (m = new R.Msg.Elem.Text(P[N]), e.addText(m)), S = s.indexOf(P[N]) + P[N].length, 
                        s = s.substring(S);
                        s && (m = new R.Msg.Elem.Text(s), e.addText(m));
                    }
                    console.log(e), R.sendMsg(e, function(o) {
                        l == R.SESSION_TYPE.C2C && r(e), R.Log.info("发消息成功"), console.log("发消息成功"), t && t(r(e));
                    }, function(o) {
                        R.Log.error("发消息失败:" + o.ErrorInfo), console.log("发消息失败:" + o.ErrorInfo), console.error("发消息失败:" + o.ErrorInfo), 
                        i(r(e));
                    });
                }
            }
        } else console.error("您还没有进入房间，暂不能聊天"); else 1 == O ? (R.Tool.setCookie("accountType", G.accountType, 86400), 
        T()) : console.error("请填写帐号和票据");
    },
    sendCustomMsg: function(e, o, n, t) {
        if (o.myselToID && (C = o.myselToID), y = o.TYPE || y, G.identifier) if (C) {
            var i = e.data || "", s = e.desc || "", c = e.ext || "", a = R.Tool.getStrBytes(i);
            if (y == R.SESSION_TYPE.C2C ? (l = R.MSG_MAX_LENGTH.C2C, g = "消息长度超出限制(最多" + Math.round(l / 3) + "汉字)") : (l = R.MSG_MAX_LENGTH.GROUP, 
            g = "消息长度超出限制(最多" + Math.round(l / 3) + "汉字)"), a > l) alert(g); else {
                var u = e.text, a = R.Tool.getStrBytes(e.text);
                if (u.length < 1) console.error("发送的消息不能为空!"); else {
                    var l, g;
                    if (y == R.SESSION_TYPE.GROUP ? (l = R.MSG_MAX_LENGTH.GROUP, g = "消息长度超出限制(最多" + Math.round(l / 3) + "汉字)") : (l = R.MSG_MAX_LENGTH.C2C, 
                    g = "消息长度超出限制(最多" + Math.round(l / 3) + "汉字)"), a > l) console.error(g); else {
                        h = new R.Session(y, C, C, v, Math.round(new Date().getTime() / 1e3));
                        var f, d = Math.round(4294967296 * Math.random()), M = Math.round(new Date().getTime() / 1e3);
                        f = y == R.SESSION_TYPE.GROUP ? R.GROUP_MSG_SUB_TYPE.COMMON : R.C2C_MSG_SUB_TYPE.COMMON;
                        var e = new R.Msg(h, !0, -1, d, M, G.identifier, f, G.identifierNick), p = new R.Msg.Elem.Custom(i, s, c);
                        e.addCustom(p);
                        var m, E, _, I, S, P = /\[[^[\]]{1,3}\]/gm, N = u.match(P);
                        if (!N || N.length < 1) m = new R.Msg.Elem.Text(u), e.addText(m); else {
                            for (var L = 0; L < N.length; L++) (_ = u.substring(0, u.indexOf(N[L]))) && (m = new R.Msg.Elem.Text(_), 
                            e.addText(m)), I = R.EmotionDataIndexs[N[L]], R.Emotions[I] ? (E = new R.Msg.Elem.Face(I, N[L]), 
                            e.addFace(E)) : (m = new R.Msg.Elem.Text(N[L]), e.addText(m)), S = u.indexOf(N[L]) + N[L].length, 
                            u = u.substring(S);
                            u && (m = new R.Msg.Elem.Text(u), e.addText(m));
                        }
                        R.sendMsg(e, function(o) {
                            y == R.SESSION_TYPE.C2C && r(e), R.Log.info("发自定义消息成功"), console.log("发自定义消息成功", e), 
                            t && t(r(e));
                        }, function(e) {
                            R.Log.info(e.ErrorInfo), console.log("发自定义消息失败:", e);
                        });
                    }
                }
            }
        } else console.error("您还没有进入房间，暂不能聊天"); else 1 == O ? (R.Tool.setCookie("accountType", G.accountType, 86400), 
        T()) : console.error("请填写帐号和票据");
    },
    sendC2CCustomMsg: function(e, o, n) {
        if (G.identifier) {
            var t = o.data || "", r = o.desc || "", i = o.ext || "", s = R.Tool.getStrBytes(t), c = R.MSG_MAX_LENGTH.C2C, a = "消息长度超出限制(最多" + Math.round(c / 3) + "汉字)";
            if (s > c) alert(a); else {
                var u = new R.Session(R.SESSION_TYPE.C2C, e, e, "", Math.round(new Date().getTime() / 1e3)), l = Math.round(4294967296 * Math.random()), g = Math.round(new Date().getTime() / 1e3), f = R.C2C_MSG_SUB_TYPE.COMMON, o = new R.Msg(u, !0, -1, l, g, G.identifier, f, G.identifierNick), d = new R.Msg.Elem.Custom(t, r, i);
                o.addCustom(d), R.sendMsg(o, function(e) {
                    R.Log.info("发自定义消息成功"), console.log("发自定义消息成功"), n && n({
                        errCode: 0,
                        errMsg: ""
                    });
                }, function(e) {
                    R.Log.info(e.ErrorInfo), console.log("发自定义消息失败:", e), n && n({
                        errCode: -1,
                        errMsg: "发自定义消息失败:" + e.ErrorInfo
                    });
                });
            }
        } else 1 == O ? (R.Tool.setCookie("accountType", G.accountType, 86400), T()) : console.error("请填写帐号和票据");
    },
    sendGroupLoveMsg: function() {
        if (G.identifier) if (C) {
            h || (h = new R.Session(y, C, C, v, Math.round(new Date().getTime() / 1e3)));
            var e = Math.round(4294967296 * Math.random()), o = Math.round(new Date().getTime() / 1e3), n = R.GROUP_MSG_SUB_TYPE.LOVEMSG, t = new R.Msg(h, !0, -1, e, o, G.identifier, n, G.identifierNick), i = new R.Msg.Elem.Text("love_msg");
            t.addText(i), R.sendMsg(t, function(e) {
                y == R.SESSION_TYPE.C2C && r(t), R.Log.info("点赞成功");
            }, function(e) {
                R.Log.error("发送点赞消息失败:" + e.ErrorInfo), console.error("发送点赞消息失败:" + e.ErrorInfo);
            });
        } else console.error("您还没有进入房间，暂不能点赞"); else 1 == O ? (R.Tool.setCookie("accountType", G.accountType, 86400), 
        T()) : console.error("请填写帐号和票据");
    },
    hideDiscussForm: function() {},
    showDiscussForm: d,
    hideDiscussTool: M,
    showDiscussTool: function() {},
    hideDiscussEmotion: p,
    showDiscussEmotion: m,
    showLoveMsgAnimation: E,
    initEmotionUL: function() {
        return;
    },
    showEmotionDialog: function() {
        openEmotionFlag ? (openEmotionFlag = !1, p()) : (openEmotionFlag = !0, m());
    },
    selectEmotionImg: _,
    quitBigGroup: function(e) {
        console.log("***注释掉判断语句，请注意quitBigGroup webim_handler.js:1082***", N, e);
        var o = {
            GroupId: 0 == N ? e : N
        };
        console.log("***===quitBigGroup===***", o), R.quitBigGroup(o, function(e) {
            R.Log.info("退群成功"), console.log("IM退群成功"), h = null;
        }, function(e) {
            console.error("TTTTTTTTTT", e.ErrorInfo);
        });
    },
    destroyGroup: function() {
        var e = {
            GroupId: N
        };
        R.destroyGroup(e, function(e) {
            R.Log.info("解散群成功"), h = null;
        });
    },
    logout: function() {
        R.logout(function(e) {
            R.Log.info("登出成功"), console.log("IM登出成功"), G && (G.identifier = null, G.userSig = null), 
            h = null;
        });
    },
    onApplyJoinGroupRequestNotify: function(e) {
        var o = e.MsgTime, n = e.Operator_Account + "申请加入你的群";
        I(e.ReportType, "[申请加群]", e.GroupId, e.GroupName, n, o);
    },
    onApplyJoinGroupAcceptNotify: function(e) {
        var o = e.Operator_Account + "同意你的加群申请，附言：" + e.RemarkInfo;
        I(e.ReportType, "[申请加群被同意]", e.GroupId, e.GroupName, o, e.MsgTime);
    },
    onApplyJoinGroupRefuseNotify: function(e) {
        var o = e.Operator_Account + "拒绝了你的加群申请，附言：" + e.RemarkInfo;
        I(e.ReportType, "[申请加群被拒绝]", e.GroupId, e.GroupName, o, e.MsgTime);
    },
    onKickedGroupNotify: function(e) {
        var o = "你被管理员" + e.Operator_Account + "踢出该群";
        I(e.ReportType, "[被踢出群]", e.GroupId, e.GroupName, o, e.MsgTime);
    },
    onDestoryGroupNotify: function(e) {
        var o = "群主" + e.Operator_Account + "已解散该群";
        I(e.ReportType, "[群被解散]", e.GroupId, e.GroupName, o, e.MsgTime);
    },
    onCreateGroupNotify: function(e) {
        I(e.ReportType, "[创建群]", e.GroupId, e.GroupName, "你创建了该群", e.MsgTime);
    },
    onInvitedJoinGroupNotify: function(e) {
        var o = "你被管理员" + e.Operator_Account + "邀请加入该群";
        I(e.ReportType, "[被邀请加群]", e.GroupId, e.GroupName, o, e.MsgTime);
    },
    onQuitGroupNotify: function(e) {
        I(e.ReportType, "[主动退群]", e.GroupId, e.GroupName, "你退出了该群", e.MsgTime);
    },
    onSetedGroupAdminNotify: function(e) {
        var o = "你被群主" + e.Operator_Account + "设置为管理员";
        I(e.ReportType, "[被设置为管理员]", e.GroupId, e.GroupName, o, e.MsgTime);
    },
    onCanceledGroupAdminNotify: function(e) {
        var o = "你被群主" + e.Operator_Account + "取消了管理员资格";
        I(e.ReportType, "[被取消管理员]", e.GroupId, e.GroupName, o, e.MsgTime);
    },
    onRevokeGroupNotify: function(e) {
        I(e.ReportType, "[群被回收]", e.GroupId, e.GroupName, "该群已被回收", e.MsgTime);
    },
    onCustomGroupNotify: function(e) {
        var o = e.UserDefinedField;
        I(e.ReportType, "[用户自定义系统消息]", e.GroupId, e.GroupName, o, e.MsgTime);
    },
    onGroupInfoChangeNotify: function(e) {
        var o = e.GroupId, n = (e.GroupFaceUrl, e.GroupName);
        e.OwnerAccount, e.GroupNotification, e.GroupIntroduction;
        n && R.Log.warn("群id=" + o + "的新名称为：" + n);
    },
    showGroupSystemMsg: I,
    getC2CHistoryMsgs: function(e, o, n, t, r, i, s) {
        if (y != R.SESSION_TYPE.GROUP) {
            var c = {
                Peer_Account: C,
                MaxCnt: 15,
                LastMsgTime: n = n,
                MsgKey: o = o
            };
            console.log("准备", c), R.getC2CHistoryMsgs(c, function(o) {
                console.log(o, "qiuqiu"), 0 == n && i();
                var s = o.Complete;
                if (o.MsgCount, 0 != o.MsgList.length) {
                    s && r();
                    var a, u = o.MsgList.sort(function(e, o) {
                        return o.time - e.time;
                    });
                    for (var l in u) a = o.MsgList[l], console.log(l, o.MsgList.length), l == o.MsgList.length - 1 ? 0 == n ? e(a, 1, 1) : e(a, 1, 0) : e(a, 0, 0);
                    s || t(o.MsgKey, o.LastMsgTime);
                } else R.Log.error("没有历史消息了:data=" + JSON.stringify(c));
            }, function(e) {
                console.log("baocuo"), s(e);
            });
        } else alert("当前的聊天类型为群聊天，不能进行拉取好友历史消息操作");
    }
};