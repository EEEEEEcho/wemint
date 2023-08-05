var e = require("../../utils/base64.js"), t = require("../../wxParse/wxParse.js");

Component({
    properties: {
        pageData: {
            type: Object
        }
    },
    data: {},
    attached: function() {
        var a = this, r = (0, e.utf8to16)((0, e.base64decode)(this.data.pageData.Text));
        (r = '<div style="margin:10px; line-height:25px; font-weight:200; font-size:17px; color:black; word-break:normal">' + r + "</div>").indexOf("\x3c!--SPINFO#0--\x3e") > 0 && (r = r.replace(/<!--SPINFO#0-->/, ""));
        var i = r.split("\x3c!--IMG#").length - 1;
        if (i > 0) for (var s = 0; s < i; s++) {
            var c = "\x3c!--IMG#" + s + "--\x3e", o = '<div> <img style="width:100%" src=' + ('"' + imgInfoArr[s].src + '"') + "> </div>";
            r = r.replace(c, o);
        }
        t.wxParse("article", "html", r, a, i);
    },
    methods: {}
});