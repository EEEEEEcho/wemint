var t = getApp();

Page({
    pageurl: "",
    onLoad: function(e) {
        var i = this;
        i.pageurl = t.getPageUrl(i, e), t.registerGlobalFunctions(i), i.setData({
            queryparams: e
        }), this.getScrollHeight();
    },
    onShow: function() {
        t.doAfterUserInfoAuth({
            success: this.initData,
            fail: this.initData
        });
    },
    initData: function() {
        this.loadList(!0);
    },
    data: {
        pagesize: 10,
        recordcount: 99,
        list: [],
        sortcol: "",
        sort: "",
        showedMore: {
            0: "000"
        },
        hasdata: !0,
        scrollHeight: t.windowHeight * t.pixelRatio,
        plugNavFlag: !0
    },
    getScrollHeight: function() {
        this.setData({
            scrollHeight: wx.getSystemInfoSync().windowHeight + 10
        });
    },
    loadList: function(e) {
        var i = this;
        e && (i.data.recordcount = 99, i.data.list = []);
        var s = i.data.recordcount, l = i.data.list.length;
        if (s > l) {
            var a = Math.ceil(l / i.data.pagesize) + 1, o = "";
            i.data.sortcol && (o = "&sortcol=" + i.data.sortcol + "&sort=" + i.data.sort), t.sendRequest({
                url: "/index.php?c=Front/WxApp/ServiceApi&a=getMyReserveList&page=" + a + "&pagesize=" + i.data.pagesize + o,
                method: "GET",
                success: function(e) {
                    if (e.success) {
                        for (var s = 0; s < e.list.length; s++) {
                            e.list[s].ArriveTime = "", e.list[s].Memo = "", e.list[s].Contact = "", e.list[s].Tel = "";
                            for (var l in e.list[s]) /^cc_/.test(l) && (!e.list[s][l].FieldInfo || "8" != e.list[s][l].FieldInfo.FieldType && "ReserveTime" != e.list[s][l].FieldInfo.ExtendName ? !e.list[s][l].FieldInfo || "2" != e.list[s][l].FieldInfo.FieldType && "Memo" != e.list[s][l].FieldInfo.ExtendName ? e.list[s][l].FieldInfo && ("Contact" == e.list[s][l].FieldInfo.ExtendName || /(姓名|联系人)/.test(l)) ? e.list[s].Contact || (e.list[s].Contact = e.list[s][l].value, 
                            delete e.list[s][l]) : e.list[s][l].FieldInfo && ("Tel" == e.list[s][l].FieldInfo.ExtendName || /(电话|手机)/.test(l)) && (e.list[s].Tel || (e.list[s].Tel = e.list[s][l].value, 
                            delete e.list[s][l])) : e.list[s].Memo || (e.list[s].Memo = e.list[s][l].value, 
                            delete e.list[s][l]) : e.list[s].ArriveTime || (e.list[s].ArriveTime = e.list[s][l].value, 
                            delete e.list[s][l]));
                            e.list[s].CustomCols = [];
                            for (var l in e.list[s]) /^cc_/.test(l) && e.list[s].CustomCols.push({
                                Name: l.replace("cc_", ""),
                                Value: e.list[s][l].value
                            });
                            i.data.list.push(e.list[s]);
                        }
                        i.setData({
                            list: i.data.list,
                            recordcount: e.recordcount,
                            hasdata: i.data.list.length > 0
                        });
                    } else console.log("loadList fail：" + e.msg), 1 == e.needLogin && t.login(function() {
                        wx.reLaunch({
                            url: "/" + i.pageurl
                        });
                    });
                },
                fail: function(t) {
                    console.log("loadList fail");
                }
            });
        }
    },
    onReserveListScroll: function(t) {
        this.loadList();
    },
    showMore: function(t) {
        var e = this, i = t.currentTarget.dataset.id;
        e.data.showedMore[i] = "true";
    },
    cancelReserve: function(e) {
        var i = this, s = e.currentTarget.dataset.id;
        t.sendRequest({
            url: "/index.php?c=Front/WxApp/ServiceApi&a=cancelReserve&id=" + s,
            method: "GET",
            success: function(e) {
                e.success ? (t.showModal({
                    title: "提示",
                    content: "取消成功"
                }), i.loadList(!0)) : t.showModal({
                    title: "提示",
                    content: "取消失败：" + e.msg
                });
            },
            fail: function(e) {
                t.showModal({
                    title: "提示",
                    content: "取消失败：" + e.errMsg
                });
            }
        });
    },
    navBtnShowAndHide: function() {
        var t = !this.data.plugNavFlag;
        this.setData({
            plugNavFlag: t
        });
    }
});