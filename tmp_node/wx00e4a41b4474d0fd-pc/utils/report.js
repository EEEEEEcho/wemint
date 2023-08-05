function t() {
    if (p.str_roomid && p.str_userid) if (p.str_room_creator != p.str_userid) {
        var t = p;
        t.str_appid = _, t.str_platform = e, t.str_appversion = s, t.str_sdkversion = o, 
        t.str_common_version = n, t.str_nickname = i, t.str_device = a, t.str_device_type = c, 
        console.log("真正上报数据: ", t), wx.request({
            url: "https://roomtest.qcloud.com/weapp/utils/report",
            data: {
                reportID: 1,
                data: t
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                t.data.code ? console.log("上报失败：" + t.data.code + t.data.message) : console.log("上报成功");
            },
            fail: function() {
                console.log("report error");
            },
            complete: function() {}
        }), r();
    } else r(); else r();
}

function r() {
    p = {
        str_roomid: "",
        str_room_creator: "",
        str_userid: "",
        str_play_info: "",
        str_push_info: "",
        int64_ts_enter_room: -99999,
        int64_tc_join_group: -99999,
        int64_tc_get_pushers: -99999,
        int64_tc_play_stream: -99999,
        int64_tc_get_pushurl: -99999,
        int64_tc_push_stream: -99999,
        int64_tc_add_pusher: -99999,
        int64_tc_enter_room: -99999
    }, m = {
        int64_ts_add_pusher: 0,
        int64_ts_play_stream: 0
    };
}

var _ = 1252463788, e = "weixin", s = "1.2.477", o = "", n = "", i = "", a = "", c = "", p = {
    str_roomid: "",
    str_room_creator: "",
    str_userid: "",
    str_play_info: "",
    str_push_info: "",
    int64_ts_enter_room: -99999,
    int64_tc_join_group: -99999,
    int64_tc_get_pushers: -99999,
    int64_tc_play_stream: -99999,
    int64_tc_get_pushurl: -99999,
    int64_tc_push_stream: -99999,
    int64_tc_add_pusher: -99999,
    int64_tc_enter_room: -99999
}, m = {
    int64_ts_add_pusher: 0,
    int64_ts_play_stream: 0
}, u = wx.getSystemInfoSync();

o = u.version, n = u.SDKVersion, a = u.model, c = u.system, module.exports = {
    setReportData: function(_) {
        _.int64_ts_enter_room && (console.log("第一次进来重置数据"), r());
        for (var e in p) _[e] && (p[e] = _[e]);
        for (var e in m) _[e] && (m[e] = _[e]);
        for (var e in p) if (!isNaN(p[e]) && "int64_tc_enter_room" != e && p[e] < 0) return;
        m.int64_ts_add_pusher && m.int64_ts_play_stream && (p.int64_tc_enter_room = Math.max(m.int64_ts_add_pusher, m.int64_ts_play_stream) - p.int64_ts_enter_room, 
        p.str_room_creator && p.str_userid && p.str_room_creator != p.str_userid && t());
    },
    report: t,
    clearData: r
};