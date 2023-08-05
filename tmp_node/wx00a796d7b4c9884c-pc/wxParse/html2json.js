var e = "https", t = "", r = "", s = {}, a = require("./wxDiscode.js"), o = require("./htmlparser.js"), n = (d("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"), 
d("br,a,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video")), i = d("abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"), l = d("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

d("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"), 
d("wxxxcode-style,script,style,view,scroll-view,block");

function d(e) {
    for (var t = {}, r = e.split(","), s = 0; s < r.length; s++) t[r[s]] = !0;
    return t;
}

function c(e) {
    var a = [];
    if (0 == t.length || !s) return (d = {
        node: "text"
    }).text = e, n = [ d ];
    e = e.replace(/\[([^\[\]]+)\]/g, ":$1:");
    for (var o = new RegExp("[:]"), n = e.split(o), i = 0; i < n.length; i++) {
        var l = n[i], d = {};
        s[l] ? (d.node = "element", d.tag = "emoji", d.text = s[l], d.baseSrc = r) : (d.node = "text", 
        d.text = l), a.push(d);
    }
    return a;
}

module.exports = {
    html2json: function(t, r) {
        t = function(e) {
            return e.replace(/<\?xml.*\?>\n/, "").replace(/<.*!doctype.*\>\n/, "").replace(/<.*!DOCTYPE.*\>\n/, "");
        }(t), t = a.strDiscode(t);
        var s = [], d = {
            node: r,
            nodes: [],
            images: [],
            imageUrls: []
        };
        return o(t, {
            start: function(t, o, c) {
                var u = {
                    node: "element",
                    tag: t
                };
                if (n[t] ? u.tagType = "block" : i[t] ? u.tagType = "inline" : l[t] && (u.tagType = "closeSelf"), 
                0 !== o.length && (u.attr = o.reduce(function(e, t) {
                    var r = t.name, s = t.value;
                    return "class" == r && (console.dir(s), u.classStr = s), "style" == r && (console.dir(s), 
                    u.styleStr = s), s.match(/ /) && (s = s.split(" ")), e[r] ? Array.isArray(e[r]) ? e[r].push(s) : e[r] = [ e[r], s ] : e[r] = s, 
                    e;
                }, {})), "img" === u.tag) {
                    u.imgIndex = d.images.length;
                    var p = u.attr.src;
                    p = a.urlToHttpUrl(p, e), u.attr.src = p, u.from = r, d.images.push(u), d.imageUrls.push(p);
                }
                if ("font" === u.tag) {
                    var m = [ "x-small", "small", "medium", "large", "x-large", "xx-large", "-webkit-xxx-large" ], f = {
                        color: "color",
                        face: "font-family",
                        size: "font-size"
                    };
                    for (var h in u.attr.style || (u.attr.style = []), u.styleStr || (u.styleStr = ""), 
                    f) if (u.attr[h]) {
                        var g = "size" === h ? m[u.attr[h] - 1] : u.attr[h];
                        u.attr.style.push(f[h]), u.attr.style.push(g), u.styleStr += f[h] + ": " + g + ";";
                    }
                }
                if ("source" === u.tag && (d.source = u.attr.src), c) {
                    var v = s[0] || d;
                    void 0 === v.nodes && (v.nodes = []), v.nodes.push(u);
                } else s.unshift(u);
            },
            end: function(e) {
                var t = s.shift();
                if (t.tag !== e && console.error("invalid state: mismatch end tag"), "video" === t.tag && d.source && (t.attr.src = d.source, 
                delete result.source), 0 === s.length) d.nodes.push(t); else {
                    var r = s[0];
                    void 0 === r.nodes && (r.nodes = []), r.nodes.push(t);
                }
            },
            chars: function(e) {
                var t = {
                    node: "text",
                    text: e,
                    textArray: c(e)
                };
                if (0 === s.length) d.nodes.push(t); else {
                    var r = s[0];
                    void 0 === r.nodes && (r.nodes = []), r.nodes.push(t);
                }
            },
            comment: function(e) {}
        }), d;
    },
    emojisInit: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", o = arguments.length > 2 ? arguments[2] : void 0;
        t = e, r = a, s = o;
    }
};