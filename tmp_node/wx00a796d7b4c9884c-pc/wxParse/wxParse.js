var e = require("../@babel/runtime/helpers/interopRequireDefault"), t = e(require("./showdown.js")), a = e(require("./html2json.js"));

function i(e) {
    var t = e.target.dataset.src, a = e.target.dataset.from;
    void 0 !== a && a.length > 0 && wx.previewImage({
        current: t,
        urls: this.data[a].imageUrls
    });
}

function r(e) {
    var t = e.target.dataset.from, a = e.target.dataset.idx;
    void 0 !== t && t.length > 0 && function(e, t, a, i) {
        var r = a.data[i];
        if (0 == r.images.length) return;
        var o = r.images, n = function(e, t, a, i) {
            var r = 0, o = 0, n = 0, d = {};
            return wx.getSystemInfo({
                success: function(s) {
                    var g = a.data[i].view.imagePadding;
                    r = s.windowWidth - 2 * g, s.windowHeight, console.log("windowWidth" + r), e > r ? (o = r, 
                    console.log("autoWidth" + o), n = o * t / e, console.log("autoHeight" + n), d.imageWidth = o, 
                    d.imageheight = n) : (d.imageWidth = e, d.imageheight = t);
                }
            }), d;
        }(e.detail.width, e.detail.height, a, i);
        o[t].width = n.imageWidth, o[t].height = n.imageheight, r.images = o;
        var d = {};
        d[i] = r, a.setData(d);
    }(e, a, this, t);
}

module.exports = {
    wxParse: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "wxParseData", o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "html", n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '<div class="color:red;">数据不能为空</div>', d = arguments.length > 3 ? arguments[3] : void 0, s = arguments.length > 4 ? arguments[4] : void 0, g = d, h = {};
        if ("html" == o) h = a.default.html2json(n, e); else if ("md" == o || "markdown" == o) {
            var l = new t.default.Converter().makeHtml(n);
            h = a.default.html2json(l, e);
        }
        h.view = {}, h.view.imagePadding = 0, void 0 !== s && (h.view.imagePadding = s);
        var m = {};
        m[e] = h, g.setData(m), g.wxParseImgLoad = r, g.wxParseImgTap = i;
    },
    wxParseTemArray: function(e, t, a, i) {
        for (var r = [], o = i.data, n = null, d = 0; d < a; d++) {
            var s = o[t + d].nodes;
            r.push(s);
        }
        e = e || "wxParseTemArray", (n = JSON.parse('{"' + e + '":""}'))[e] = r, i.setData(n);
    },
    emojisInit: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", i = arguments.length > 2 ? arguments[2] : void 0;
        a.default.emojisInit(e, t, i);
    }
};