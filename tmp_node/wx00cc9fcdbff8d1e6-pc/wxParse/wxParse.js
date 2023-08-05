function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    var t = this, a = e.target.dataset.src, i = e.target.dataset.from;
    void 0 !== i && i.length > 0 && wx.previewImage({
        current: a,
        urls: t.data[i].imageUrls
    });
}

function a(e) {
    var t = this, a = e.target.dataset.from, r = e.target.dataset.idx;
    void 0 !== a && a.length > 0 && i(e, r, t, a);
}

function i(e, t, a, i) {
    var o = a.data[i];
    if (0 != o.images.length) {
        var d = o.images, n = r(e.detail.width, e.detail.height, a, i);
        d[t].width = n.imageWidth, d[t].height = n.imageheight, o.images = d;
        var s = {};
        s[i] = o, a.setData(s);
    }
}

function r(e, t, a, i) {
    var r = 0, o = 0, d = 0, n = 0, s = {};
    return wx.getSystemInfo({
        success: function(g) {
            var h = a.data[i].view.imagePadding;
            r = g.windowWidth - 2 * h, o = g.windowHeight, console.log("windowWidth" + r), e > r ? (d = r, 
            console.log("autoWidth" + d), n = d * t / e, console.log("autoHeight" + n), s.imageWidth = d, 
            s.imageheight = n) : (s.imageWidth = e, s.imageheight = t);
        }
    }), s;
}

var o = e(require("./showdown.js")), d = e(require("./html2json.js"));

module.exports = {
    wxParse: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "wxParseData", i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "html", r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '<div class="color:red;">数据不能为空</div>', n = arguments[3], s = arguments[4], g = n, h = {};
        if ("html" == i) h = d.default.html2json(r, e); else if ("md" == i || "markdown" == i) {
            var l = new o.default.Converter().makeHtml(r);
            h = d.default.html2json(l, e);
        }
        h.view = {}, h.view.imagePadding = 0, void 0 !== s && (h.view.imagePadding = s);
        var m = {};
        m[e] = h, g.setData(m), g.wxParseImgLoad = a, g.wxParseImgTap = t;
    },
    wxParseTemArray: function(e, t, a, i) {
        for (var r = [], o = i.data, d = null, n = 0; n < a; n++) {
            var s = o[t + n].nodes;
            r.push(s);
        }
        e = e || "wxParseTemArray", (d = JSON.parse('{"' + e + '":""}'))[e] = r, i.setData(d);
    },
    emojisInit: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", a = arguments[2];
        d.default.emojisInit(e, t, a);
    }
};