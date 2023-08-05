function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

function a(e) {
    var t = this, a = e.target.dataset.src, i = e.target.dataset.from;
    void 0 !== i && i.length > 0 && wx.previewImage({
        current: a,
        urls: t.data[i].imageUrls
    });
}

function i(e) {
    var t = this, a = e.target.dataset.from, i = e.target.dataset.idx;
    void 0 !== a && a.length > 0 && r(e, i, t, a);
}

function r(e, a, i, r) {
    var d, o = i.data[r];
    if (o && 0 != o.images.length) {
        var s = o.images, g = n(e.detail.width, e.detail.height, i, r);
        s[a].width = g.imageWidth, s[a].height = g.imageheight, o.images = s;
        var h = {};
        h[r] = o, i.setData(h);
        var l = s[a].index, m = "" + r, v = !0, u = !1, f = void 0;
        try {
            for (var w, c = l.split(".")[Symbol.iterator](); !(v = (w = c.next()).done); v = !0) m += ".nodes[" + w.value + "]";
        } catch (e) {
            e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
            u = !0, f = e;
        } finally {
            try {
                !v && c.return && c.return();
            } finally {
                if (u) throw f;
            }
        }
        var x = m + ".width", P = m + ".height";
        i.setData((d = {}, t(d, x, g.imageWidth), t(d, P, g.imageheight), d));
    }
}

function n(e, t, a, i) {
    var r = 0, n = 0, d = 0, o = {}, h = a.data[i].view.imagePadding;
    return r = s - 2 * h, g, e > r ? (d = (n = r) * t / e, o.imageWidth = n, o.imageheight = d) : (o.imageWidth = e, 
    o.imageheight = t), o;
}

var d = e(require("./showdown.js")), o = e(require("./html2json.js")), s = 0, g = 0;

wx.getSystemInfo({
    success: function(e) {
        s = e.windowWidth, g = e.windowHeight;
    }
}), module.exports = {
    wxParse: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "wxParseData", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "html", r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '<div class="color:red;">数据不能为空</div>', n = arguments[3], s = arguments[4], g = n, h = {};
        if ("html" == t) h = o.default.html2json(r, e); else if ("md" == t || "markdown" == t) {
            var l = new d.default.Converter().makeHtml(r);
            h = o.default.html2json(l, e);
        }
        h.view = {}, h.view.imagePadding = 0, void 0 !== s && (h.view.imagePadding = s);
        var m = {};
        m[e] = h, g.setData(m), g.wxParseImgLoad = i, g.wxParseImgTap = a;
    },
    wxParseTemArray: function(e, t, a, i) {
        for (var r = [], n = i.data, d = null, o = 0; o < a; o++) {
            var s = n[t + o].nodes;
            r.push(s);
        }
        e = e || "wxParseTemArray", (d = JSON.parse('{"' + e + '":""}'))[e] = r, i.setData(d);
    },
    emojisInit: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", a = arguments[2];
        o.default.emojisInit(e, t, a);
    }
};