var e = {
    formatDate: function(e, t) {
        var a = {
            "M+": e.getMonth() + 1,
            "d+": e.getDate(),
            "H+": e.getHours(),
            "m+": e.getMinutes(),
            "s+": e.getSeconds(),
            "q+": Math.floor((e.getMonth() + 3) / 3),
            "f+": e.getMilliseconds()
        };
        /(y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length)));
        for (var r in a) new RegExp("(" + r + ")").test(t) && (t = t.replace(RegExp.$1, 1 === RegExp.$1.length ? a[r] : ("00" + a[r]).substr(("" + a[r]).length)));
        return t;
    },
    replaceRichHtml: function(e) {
        var t = new RegExp("<[a-z]+[^>]+>", "gi"), a = e.match(t), r = (new RegExp("src=('|\")?([^'\"s/>]+)", "i"), 
        new RegExp("<([a-z]+)", "i")), s = getApp();
        for (var l in a) {
            var c = a[l];
            if (c = c.replace(/(max-width:\s*[\d\.]+px;?)/gi, "max-width:100%;"), c = c.replace(/(height:\s*[\d\.]+px;?)/gi, ""), 
            (c = c.replace(/(max-height:\s*[\d\.]+px;?)/gi, "")) != a[l]) e = e.replace(a[l], c); else {
                var i = c.match(r)[1];
                "img" == i && (c = c.replace(/height=[^>\s]+/, ""), 0 == /^(http:|https:)/.test(c) && c.indexOf("/comdata/") > -1 && s.globalData.siteBaseUrl && (c.indexOf("src=/comdata") > -1 && (c = c.replace("src=/", "src=" + s.globalData.siteBaseUrl + "/")), 
                c.indexOf("src='/comdata") > -1 && (c = c.replace("src='/", "src='" + s.globalData.siteBaseUrl + "/")), 
                c.indexOf('src="/comdata') > -1 && (c = c.replace('src="/', 'src="' + s.globalData.siteBaseUrl + "/")))), 
                "table" != i && "td" != i || (c = c.replace(/width=[^>\s]+/, "")), c.toLowerCase().indexOf("style=") > -1 && (c.toLowerCase().indexOf('style="') > -1 && (c = c.replace('style="', 'style="max-width:100%;')), 
                c.toLowerCase().indexOf("style='") > -1 && (c = c.replace("style='", "style='max-width:100%;"))), 
                e = e.replace(a[l], c);
            }
        }
        return e;
    },
    trim: function(e) {
        return e.replace(/(^\s*)|(\s*$)/g, "");
    }
};

module.exports = e;