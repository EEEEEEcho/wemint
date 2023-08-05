var e = require("../@babel/runtime/helpers/interopRequireDefault")(require("../@babel/runtime/helpers/typeof"));

function r(e) {
    var r = {
        omitExtraWLInCodeBlocks: {
            defaultValue: !1,
            describe: "Omit the default extra whiteline added to code blocks",
            type: "boolean"
        },
        noHeaderId: {
            defaultValue: !1,
            describe: "Turn on/off generated header id",
            type: "boolean"
        },
        prefixHeaderId: {
            defaultValue: !1,
            describe: "Specify a prefix to generated header ids",
            type: "string"
        },
        headerLevelStart: {
            defaultValue: !1,
            describe: "The header blocks level start",
            type: "integer"
        },
        parseImgDimensions: {
            defaultValue: !1,
            describe: "Turn on/off image dimension parsing",
            type: "boolean"
        },
        simplifiedAutoLink: {
            defaultValue: !1,
            describe: "Turn on/off GFM autolink style",
            type: "boolean"
        },
        literalMidWordUnderscores: {
            defaultValue: !1,
            describe: "Parse midword underscores as literal underscores",
            type: "boolean"
        },
        strikethrough: {
            defaultValue: !1,
            describe: "Turn on/off strikethrough support",
            type: "boolean"
        },
        tables: {
            defaultValue: !1,
            describe: "Turn on/off tables support",
            type: "boolean"
        },
        tablesHeaderId: {
            defaultValue: !1,
            describe: "Add an id to table headers",
            type: "boolean"
        },
        ghCodeBlocks: {
            defaultValue: !0,
            describe: "Turn on/off GFM fenced code blocks support",
            type: "boolean"
        },
        tasklists: {
            defaultValue: !1,
            describe: "Turn on/off GFM tasklist support",
            type: "boolean"
        },
        smoothLivePreview: {
            defaultValue: !1,
            describe: "Prevents weird effects in live previews due to incomplete input",
            type: "boolean"
        },
        smartIndentationFix: {
            defaultValue: !1,
            description: "Tries to smartly fix identation in es6 strings",
            type: "boolean"
        }
    };
    if (!1 === e) return JSON.parse(JSON.stringify(r));
    var t = {};
    for (var n in r) r.hasOwnProperty(n) && (t[n] = r[n].defaultValue);
    return t;
}

var t = {}, n = {}, a = {}, s = r(!0), o = {
    github: {
        omitExtraWLInCodeBlocks: !0,
        prefixHeaderId: "user-content-",
        simplifiedAutoLink: !0,
        literalMidWordUnderscores: !0,
        strikethrough: !0,
        tables: !0,
        tablesHeaderId: !0,
        ghCodeBlocks: !0,
        tasklists: !0
    },
    vanilla: r(!0)
};

function i(r, n) {
    var a = n ? "Error in " + n + " extension->" : "Error in unnamed extension", s = {
        valid: !0,
        error: ""
    };
    t.helper.isArray(r) || (r = [ r ]);
    for (var o = 0; o < r.length; ++o) {
        var i = a + " sub-extension " + o + ": ", l = r[o];
        if ("object" !== (0, e.default)(l)) return s.valid = !1, s.error = i + "must be an object, but " + (0, 
        e.default)(l) + " given", s;
        if (!t.helper.isString(l.type)) return s.valid = !1, s.error = i + 'property "type" must be a string, but ' + (0, 
        e.default)(l.type) + " given", s;
        var c = l.type = l.type.toLowerCase();
        if ("language" === c && (c = l.type = "lang"), "html" === c && (c = l.type = "output"), 
        "lang" !== c && "output" !== c && "listener" !== c) return s.valid = !1, s.error = i + "type " + c + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"', 
        s;
        if ("listener" === c) {
            if (t.helper.isUndefined(l.listeners)) return s.valid = !1, s.error = i + '. Extensions of type "listener" must have a property called "listeners"', 
            s;
        } else if (t.helper.isUndefined(l.filter) && t.helper.isUndefined(l.regex)) return s.valid = !1, 
        s.error = i + c + ' extensions must define either a "regex" property or a "filter" method', 
        s;
        if (l.listeners) {
            if ("object" !== (0, e.default)(l.listeners)) return s.valid = !1, s.error = i + '"listeners" property must be an object but ' + (0, 
            e.default)(l.listeners) + " given", s;
            for (var u in l.listeners) if (l.listeners.hasOwnProperty(u) && "function" != typeof l.listeners[u]) return s.valid = !1, 
            s.error = i + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + u + " must be a function but " + (0, 
            e.default)(l.listeners[u]) + " given", s;
        }
        if (l.filter) {
            if ("function" != typeof l.filter) return s.valid = !1, s.error = i + '"filter" must be a function, but ' + (0, 
            e.default)(l.filter) + " given", s;
        } else if (l.regex) {
            if (t.helper.isString(l.regex) && (l.regex = new RegExp(l.regex, "g")), !l.regex instanceof RegExp) return s.valid = !1, 
            s.error = i + '"regex" property must either be a string or a RegExp object, but ' + (0, 
            e.default)(l.regex) + " given", s;
            if (t.helper.isUndefined(l.replace)) return s.valid = !1, s.error = i + '"regex" extensions must implement a replace string or function', 
            s;
        }
    }
    return s;
}

function l(e, r) {
    return "~E" + r.charCodeAt(0) + "E";
}

t.helper = {}, t.extensions = {}, t.setOption = function(e, r) {
    return s[e] = r, this;
}, t.getOption = function(e) {
    return s[e];
}, t.getOptions = function() {
    return s;
}, t.resetOptions = function() {
    s = r(!0);
}, t.setFlavor = function(e) {
    if (o.hasOwnProperty(e)) {
        var r = o[e];
        for (var t in r) r.hasOwnProperty(t) && (s[t] = r[t]);
    }
}, t.getDefaultOptions = function(e) {
    return r(e);
}, t.subParser = function(e, r) {
    if (t.helper.isString(e)) {
        if (void 0 === r) {
            if (n.hasOwnProperty(e)) return n[e];
            throw Error("SubParser named " + e + " not registered!");
        }
        n[e] = r;
    }
}, t.extension = function(e, r) {
    if (!t.helper.isString(e)) throw Error("Extension 'name' must be a string");
    if (e = t.helper.stdExtName(e), t.helper.isUndefined(r)) {
        if (!a.hasOwnProperty(e)) throw Error("Extension named " + e + " is not registered!");
        return a[e];
    }
    "function" == typeof r && (r = r()), t.helper.isArray(r) || (r = [ r ]);
    var n = i(r, e);
    if (!n.valid) throw Error(n.error);
    a[e] = r;
}, t.getAllExtensions = function() {
    return a;
}, t.removeExtension = function(e) {
    delete a[e];
}, t.resetExtensions = function() {
    a = {};
}, t.validateExtension = function(e) {
    var r = i(e, null);
    return !!r.valid || (console.warn(r.error), !1);
}, t.hasOwnProperty("helper") || (t.helper = {}), t.helper.isString = function(e) {
    return "string" == typeof e || e instanceof String;
}, t.helper.isFunction = function(e) {
    return e && "[object Function]" === {}.toString.call(e);
}, t.helper.forEach = function(e, r) {
    if ("function" == typeof e.forEach) e.forEach(r); else for (var t = 0; t < e.length; t++) r(e[t], t, e);
}, t.helper.isArray = function(e) {
    return e.constructor === Array;
}, t.helper.isUndefined = function(e) {
    return void 0 === e;
}, t.helper.stdExtName = function(e) {
    return e.replace(/[_-]||\s/g, "").toLowerCase();
}, t.helper.escapeCharactersCallback = l, t.helper.escapeCharacters = function(e, r, t) {
    var n = "([" + r.replace(/([\[\]\\])/g, "\\$1") + "])";
    t && (n = "\\\\" + n);
    var a = new RegExp(n, "g");
    return e = e.replace(a, l);
};

var c = function(e, r, t, n) {
    var a, s, o, i, l, c = n || "", u = c.indexOf("g") > -1, p = new RegExp(r + "|" + t, "g" + c.replace(/g/g, "")), h = new RegExp(r, c.replace(/g/g, "")), d = [];
    do {
        for (a = 0; o = p.exec(e); ) if (h.test(o[0])) a++ || (i = (s = p.lastIndex) - o[0].length); else if (a && !--a) {
            l = o.index + o[0].length;
            var f = {
                left: {
                    start: i,
                    end: s
                },
                match: {
                    start: s,
                    end: o.index
                },
                right: {
                    start: o.index,
                    end: l
                },
                wholeMatch: {
                    start: i,
                    end: l
                }
            };
            if (d.push(f), !u) return d;
        }
    } while (a && (p.lastIndex = s));
    return d;
};

t.helper.matchRecursiveRegExp = function(e, r, t, n) {
    for (var a = c(e, r, t, n), s = [], o = 0; o < a.length; ++o) s.push([ e.slice(a[o].wholeMatch.start, a[o].wholeMatch.end), e.slice(a[o].match.start, a[o].match.end), e.slice(a[o].left.start, a[o].left.end), e.slice(a[o].right.start, a[o].right.end) ]);
    return s;
}, t.helper.replaceRecursiveRegExp = function(e, r, n, a, s) {
    if (!t.helper.isFunction(r)) {
        var o = r;
        r = function() {
            return o;
        };
    }
    var i = c(e, n, a, s), l = e, u = i.length;
    if (u > 0) {
        var p = [];
        0 !== i[0].wholeMatch.start && p.push(e.slice(0, i[0].wholeMatch.start));
        for (var h = 0; h < u; ++h) p.push(r(e.slice(i[h].wholeMatch.start, i[h].wholeMatch.end), e.slice(i[h].match.start, i[h].match.end), e.slice(i[h].left.start, i[h].left.end), e.slice(i[h].right.start, i[h].right.end))), 
        h < u - 1 && p.push(e.slice(i[h].wholeMatch.end, i[h + 1].wholeMatch.start));
        i[u - 1].wholeMatch.end < e.length && p.push(e.slice(i[u - 1].wholeMatch.end)), 
        l = p.join("");
    }
    return l;
}, t.helper.isUndefined(console) && (console = {
    warn: function(e) {
        alert(e);
    },
    log: function(e) {
        alert(e);
    },
    error: function(e) {
        throw e;
    }
}), t.Converter = function(r) {
    var n = {}, l = [], c = [], u = {};
    function p(e, r) {
        if (r = r || null, t.helper.isString(e)) {
            if (r = e = t.helper.stdExtName(e), t.extensions[e]) return console.warn("DEPRECATION WARNING: " + e + " is an old extension that uses a deprecated loading method.Please inform the developer that the extension should be updated!"), 
            void function(e, r) {
                "function" == typeof e && (e = e(new t.Converter()));
                t.helper.isArray(e) || (e = [ e ]);
                var n = i(e, r);
                if (!n.valid) throw Error(n.error);
                for (var a = 0; a < e.length; ++a) switch (e[a].type) {
                  case "lang":
                    l.push(e[a]);
                    break;

                  case "output":
                    c.push(e[a]);
                    break;

                  default:
                    throw Error("Extension loader error: Type unrecognized!!!");
                }
            }(t.extensions[e], e);
            if (t.helper.isUndefined(a[e])) throw Error('Extension "' + e + '" could not be loaded. It was either not found or is not a valid extension.');
            e = a[e];
        }
        "function" == typeof e && (e = e()), t.helper.isArray(e) || (e = [ e ]);
        var n = i(e, r);
        if (!n.valid) throw Error(n.error);
        for (var s = 0; s < e.length; ++s) {
            switch (e[s].type) {
              case "lang":
                l.push(e[s]);
                break;

              case "output":
                c.push(e[s]);
            }
            if (e[s].hasOwnProperty(u)) for (var o in e[s].listeners) e[s].listeners.hasOwnProperty(o) && h(o, e[s].listeners[o]);
        }
    }
    function h(r, n) {
        if (!t.helper.isString(r)) throw Error("Invalid argument in converter.listen() method: name must be a string, but " + (0, 
        e.default)(r) + " given");
        if ("function" != typeof n) throw Error("Invalid argument in converter.listen() method: callback must be a function, but " + (0, 
        e.default)(n) + " given");
        u.hasOwnProperty(r) || (u[r] = []), u[r].push(n);
    }
    !function() {
        for (var a in r = r || {}, s) s.hasOwnProperty(a) && (n[a] = s[a]);
        if ("object" !== (0, e.default)(r)) throw Error("Converter expects the passed parameter to be an object, but " + (0, 
        e.default)(r) + " was passed instead.");
        for (var o in r) r.hasOwnProperty(o) && (n[o] = r[o]);
        n.extensions && t.helper.forEach(n.extensions, p);
    }(), this._dispatch = function(e, r, t, n) {
        if (u.hasOwnProperty(e)) for (var a = 0; a < u[e].length; ++a) {
            var s = u[e][a](e, r, this, t, n);
            s && void 0 !== s && (r = s);
        }
        return r;
    }, this.listen = function(e, r) {
        return h(e, r), this;
    }, this.makeHtml = function(e) {
        if (!e) return e;
        var r = {
            gHtmlBlocks: [],
            gHtmlMdBlocks: [],
            gHtmlSpans: [],
            gUrls: {},
            gTitles: {},
            gDimensions: {},
            gListLevel: 0,
            hashLinkCounts: {},
            langExtensions: l,
            outputModifiers: c,
            converter: this,
            ghCodeBlocks: []
        };
        return e = (e = (e = (e = e.replace(/~/g, "~T")).replace(/\$/g, "~D")).replace(/\r\n/g, "\n")).replace(/\r/g, "\n"), 
        n.smartIndentationFix && (e = function(e) {
            var r = e.match(/^\s*/)[0].length, t = new RegExp("^\\s{0," + r + "}", "gm");
            return e.replace(t, "");
        }(e)), e = e, e = t.subParser("detab")(e, n, r), e = t.subParser("stripBlankLines")(e, n, r), 
        t.helper.forEach(l, function(a) {
            e = t.subParser("runExtension")(a, e, n, r);
        }), e = t.subParser("hashPreCodeTags")(e, n, r), e = t.subParser("githubCodeBlocks")(e, n, r), 
        e = t.subParser("hashHTMLBlocks")(e, n, r), e = t.subParser("hashHTMLSpans")(e, n, r), 
        e = t.subParser("stripLinkDefinitions")(e, n, r), e = t.subParser("blockGamut")(e, n, r), 
        e = t.subParser("unhashHTMLSpans")(e, n, r), e = (e = (e = t.subParser("unescapeSpecialChars")(e, n, r)).replace(/~D/g, "$$")).replace(/~T/g, "~"), 
        t.helper.forEach(c, function(a) {
            e = t.subParser("runExtension")(a, e, n, r);
        }), e;
    }, this.setOption = function(e, r) {
        n[e] = r;
    }, this.getOption = function(e) {
        return n[e];
    }, this.getOptions = function() {
        return n;
    }, this.addExtension = function(e, r) {
        p(e, r = r || null);
    }, this.useExtension = function(e) {
        p(e);
    }, this.setFlavor = function(e) {
        if (o.hasOwnProperty(e)) {
            var r = o[e];
            for (var t in r) r.hasOwnProperty(t) && (n[t] = r[t]);
        }
    }, this.removeExtension = function(e) {
        t.helper.isArray(e) || (e = [ e ]);
        for (var r = 0; r < e.length; ++r) {
            for (var n = e[r], a = 0; a < l.length; ++a) l[a] === n && l[a].splice(a, 1);
            for (;0 < c.length; ++a) c[0] === n && c[0].splice(a, 1);
        }
    }, this.getAllExtensions = function() {
        return {
            language: l,
            output: c
        };
    };
}, t.subParser("anchors", function(e, r, n) {
    var a = function(e, r, a, s, o, i, l, c) {
        t.helper.isUndefined(c) && (c = ""), e = r;
        var u = a, p = s.toLowerCase(), h = o, d = c;
        if (!h) if (p || (p = u.toLowerCase().replace(/ ?\n/g, " ")), h = "#" + p, t.helper.isUndefined(n.gUrls[p])) {
            if (!(e.search(/\(\s*\)$/m) > -1)) return e;
            h = "";
        } else h = n.gUrls[p], t.helper.isUndefined(n.gTitles[p]) || (d = n.gTitles[p]);
        var f = '<a href="' + (h = t.helper.escapeCharacters(h, "*_", !1)) + '"';
        return "" !== d && null !== d && (d = d.replace(/"/g, "&quot;"), f += ' title="' + (d = t.helper.escapeCharacters(d, "*_", !1)) + '"'), 
        f += ">" + u + "</a>";
    };
    return e = (e = (e = (e = n.converter._dispatch("anchors.before", e, r, n)).replace(/(\[((?:\[[^\]]*]|[^\[\]])*)][ ]?(?:\n[ ]*)?\[(.*?)])()()()()/g, a)).replace(/(\[((?:\[[^\]]*]|[^\[\]])*)]\([ \t]*()<?(.*?(?:\(.*?\).*?)?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, a)).replace(/(\[([^\[\]]+)])()()()()()/g, a), 
    e = n.converter._dispatch("anchors.after", e, r, n);
}), t.subParser("autoLinks", function(e, r, n) {
    function a(e, r) {
        var t = r;
        return /^www\./i.test(r) && (r = r.replace(/^www\./i, "http://www.")), '<a href="' + r + '">' + t + "</a>";
    }
    function s(e, r) {
        var n = t.subParser("unescapeSpecialChars")(r);
        return t.subParser("encodeEmailAddress")(n);
    }
    return e = (e = (e = n.converter._dispatch("autoLinks.before", e, r, n)).replace(/<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)>/gi, a)).replace(/<(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi, s), 
    r.simplifiedAutoLink && (e = (e = e.replace(/\b(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+)(?=\s|$)(?!["<>])/gi, a)).replace(/(?:^|[ \n\t])([A-Za-z0-9!#$%&'*+-\/=?^_`\{|}~\.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?:$|[ \n\t])/gi, s)), 
    e = n.converter._dispatch("autoLinks.after", e, r, n);
}), t.subParser("blockGamut", function(e, r, n) {
    e = n.converter._dispatch("blockGamut.before", e, r, n), e = t.subParser("blockQuotes")(e, r, n), 
    e = t.subParser("headers")(e, r, n);
    var a = t.subParser("hashBlock")("<hr />", r, n);
    return e = (e = (e = e.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, a)).replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm, a)).replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm, a), 
    e = t.subParser("lists")(e, r, n), e = t.subParser("codeBlocks")(e, r, n), e = t.subParser("tables")(e, r, n), 
    e = t.subParser("hashHTMLBlocks")(e, r, n), e = t.subParser("paragraphs")(e, r, n), 
    e = n.converter._dispatch("blockGamut.after", e, r, n);
}), t.subParser("blockQuotes", function(e, r, n) {
    return e = (e = n.converter._dispatch("blockQuotes.before", e, r, n)).replace(/((^[ \t]{0,3}>[ \t]?.+\n(.+\n)*\n*)+)/gm, function(e, a) {
        var s = a;
        return s = (s = (s = s.replace(/^[ \t]*>[ \t]?/gm, "~0")).replace(/~0/g, "")).replace(/^[ \t]+$/gm, ""), 
        s = t.subParser("githubCodeBlocks")(s, r, n), s = (s = (s = t.subParser("blockGamut")(s, r, n)).replace(/(^|\n)/g, "$1  ")).replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(e, r) {
            var t = r;
            return t = (t = t.replace(/^  /gm, "~0")).replace(/~0/g, "");
        }), t.subParser("hashBlock")("<blockquote>\n" + s + "\n</blockquote>", r, n);
    }), e = n.converter._dispatch("blockQuotes.after", e, r, n);
}), t.subParser("codeBlocks", function(e, r, n) {
    e = n.converter._dispatch("codeBlocks.before", e, r, n);
    return e = (e = (e += "~0").replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g, function(e, a, s) {
        var o = a, i = s, l = "\n";
        return o = t.subParser("outdent")(o), o = t.subParser("encodeCode")(o), o = (o = (o = t.subParser("detab")(o)).replace(/^\n+/g, "")).replace(/\n+$/g, ""), 
        r.omitExtraWLInCodeBlocks && (l = ""), o = "<pre><code>" + o + l + "</code></pre>", 
        t.subParser("hashBlock")(o, r, n) + i;
    })).replace(/~0/, ""), e = n.converter._dispatch("codeBlocks.after", e, r, n);
}), t.subParser("codeSpans", function(e, r, n) {
    return void 0 === (e = n.converter._dispatch("codeSpans.before", e, r, n)) && (e = ""), 
    e = e.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function(e, r, n, a) {
        var s = a;
        return s = (s = s.replace(/^([ \t]*)/g, "")).replace(/[ \t]*$/g, ""), r + "<code>" + (s = t.subParser("encodeCode")(s)) + "</code>";
    }), e = n.converter._dispatch("codeSpans.after", e, r, n);
}), t.subParser("detab", function(e) {
    return e = (e = (e = (e = (e = e.replace(/\t(?=\t)/g, "    ")).replace(/\t/g, "~A~B")).replace(/~B(.+?)~A/g, function(e, r) {
        for (var t = r, n = 4 - t.length % 4, a = 0; a < n; a++) t += " ";
        return t;
    })).replace(/~A/g, "    ")).replace(/~B/g, "");
}), t.subParser("encodeAmpsAndAngles", function(e) {
    return e = (e = e.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;")).replace(/<(?![a-z\/?\$!])/gi, "&lt;");
}), t.subParser("encodeBackslashEscapes", function(e) {
    return e = (e = e.replace(/\\(\\)/g, t.helper.escapeCharactersCallback)).replace(/\\([`*_{}\[\]()>#+-.!])/g, t.helper.escapeCharactersCallback);
}), t.subParser("encodeCode", function(e) {
    return e = (e = (e = e.replace(/&/g, "&amp;")).replace(/</g, "&lt;")).replace(/>/g, "&gt;"), 
    e = t.helper.escapeCharacters(e, "*_{}[]\\", !1);
}), t.subParser("encodeEmailAddress", function(e) {
    var r = [ function(e) {
        return "&#" + e.charCodeAt(0) + ";";
    }, function(e) {
        return "&#x" + e.charCodeAt(0).toString(16) + ";";
    }, function(e) {
        return e;
    } ];
    return e = (e = '<a href="' + (e = (e = "mailto:" + e).replace(/./g, function(e) {
        if ("@" === e) e = r[Math.floor(2 * Math.random())](e); else if (":" !== e) {
            var t = Math.random();
            e = t > .9 ? r[2](e) : t > .45 ? r[1](e) : r[0](e);
        }
        return e;
    })) + '">' + e + "</a>").replace(/">.+:/g, '">');
}), t.subParser("escapeSpecialCharsWithinTagAttributes", function(e) {
    return e = e.replace(/(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi, function(e) {
        var r = e.replace(/(.)<\/?code>(?=.)/g, "$1`");
        return r = t.helper.escapeCharacters(r, "\\`*_", !1);
    });
}), t.subParser("githubCodeBlocks", function(e, r, n) {
    return r.ghCodeBlocks ? (e = n.converter._dispatch("githubCodeBlocks.before", e, r, n), 
    e = (e = (e += "~0").replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g, function(e, a, s) {
        var o = r.omitExtraWLInCodeBlocks ? "" : "\n";
        return s = t.subParser("encodeCode")(s), s = "<pre><code" + (a ? ' class="' + a + " language-" + a + '"' : "") + ">" + (s = (s = (s = t.subParser("detab")(s)).replace(/^\n+/g, "")).replace(/\n+$/g, "")) + o + "</code></pre>", 
        s = t.subParser("hashBlock")(s, r, n), "\n\n~G" + (n.ghCodeBlocks.push({
            text: e,
            codeblock: s
        }) - 1) + "G\n\n";
    })).replace(/~0/, ""), n.converter._dispatch("githubCodeBlocks.after", e, r, n)) : e;
}), t.subParser("hashBlock", function(e, r, t) {
    return e = e.replace(/(^\n+|\n+$)/g, ""), "\n\n~K" + (t.gHtmlBlocks.push(e) - 1) + "K\n\n";
}), t.subParser("hashElement", function(e, r, t) {
    return function(e, r) {
        var n = r;
        return n = (n = (n = n.replace(/\n\n/g, "\n")).replace(/^\n/, "")).replace(/\n+$/g, ""), 
        n = "\n\n~K" + (t.gHtmlBlocks.push(n) - 1) + "K\n\n";
    };
}), t.subParser("hashHTMLBlocks", function(e, r, n) {
    for (var a = [ "pre", "div", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "table", "dl", "ol", "ul", "script", "noscript", "form", "fieldset", "iframe", "math", "style", "section", "header", "footer", "nav", "article", "aside", "address", "audio", "canvas", "figure", "hgroup", "output", "video", "p" ], s = function(e, r, t, a) {
        var s = e;
        return -1 !== t.search(/\bmarkdown\b/) && (s = t + n.converter.makeHtml(r) + a), 
        "\n\n~K" + (n.gHtmlBlocks.push(s) - 1) + "K\n\n";
    }, o = 0; o < a.length; ++o) e = t.helper.replaceRecursiveRegExp(e, s, "^(?: |\\t){0,3}<" + a[o] + "\\b[^>]*>", "</" + a[o] + ">", "gim");
    return e = (e = (e = e.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, t.subParser("hashElement")(e, r, n))).replace(/(<!--[\s\S]*?-->)/g, t.subParser("hashElement")(e, r, n))).replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, t.subParser("hashElement")(e, r, n));
}), t.subParser("hashHTMLSpans", function(e, r, n) {
    for (var a = t.helper.matchRecursiveRegExp(e, "<code\\b[^>]*>", "</code>", "gi"), s = 0; s < a.length; ++s) e = e.replace(a[s][0], "~L" + (n.gHtmlSpans.push(a[s][0]) - 1) + "L");
    return e;
}), t.subParser("unhashHTMLSpans", function(e, r, t) {
    for (var n = 0; n < t.gHtmlSpans.length; ++n) e = e.replace("~L" + n + "L", t.gHtmlSpans[n]);
    return e;
}), t.subParser("hashPreCodeTags", function(e, r, n) {
    return e = t.helper.replaceRecursiveRegExp(e, function(e, r, a, s) {
        var o = a + t.subParser("encodeCode")(r) + s;
        return "\n\n~G" + (n.ghCodeBlocks.push({
            text: e,
            codeblock: o
        }) - 1) + "G\n\n";
    }, "^(?: |\\t){0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>", "^(?: |\\t){0,3}</code>\\s*</pre>", "gim");
}), t.subParser("headers", function(e, r, n) {
    e = n.converter._dispatch("headers.before", e, r, n);
    var a = r.prefixHeaderId, s = isNaN(parseInt(r.headerLevelStart)) ? 1 : parseInt(r.headerLevelStart), o = r.smoothLivePreview ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm, i = r.smoothLivePreview ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;
    function l(e) {
        var r, s = e.replace(/[^\w]/g, "").toLowerCase();
        return n.hashLinkCounts[s] ? r = s + "-" + n.hashLinkCounts[s]++ : (r = s, n.hashLinkCounts[s] = 1), 
        !0 === a && (a = "section"), t.helper.isString(a) ? a + r : r;
    }
    return e = (e = (e = e.replace(o, function(e, a) {
        var o = t.subParser("spanGamut")(a, r, n), i = r.noHeaderId ? "" : ' id="' + l(a) + '"', c = "<h" + s + i + ">" + o + "</h" + s + ">";
        return t.subParser("hashBlock")(c, r, n);
    })).replace(i, function(e, a) {
        var o = t.subParser("spanGamut")(a, r, n), i = r.noHeaderId ? "" : ' id="' + l(a) + '"', c = s + 1, u = "<h" + c + i + ">" + o + "</h" + c + ">";
        return t.subParser("hashBlock")(u, r, n);
    })).replace(/^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm, function(e, a, o) {
        var i = t.subParser("spanGamut")(o, r, n), c = r.noHeaderId ? "" : ' id="' + l(o) + '"', u = s - 1 + a.length, p = "<h" + u + c + ">" + i + "</h" + u + ">";
        return t.subParser("hashBlock")(p, r, n);
    }), e = n.converter._dispatch("headers.after", e, r, n);
}), t.subParser("images", function(e, r, n) {
    function a(e, r, a, s, o, i, l, c) {
        var u = n.gUrls, p = n.gTitles, h = n.gDimensions;
        if (a = a.toLowerCase(), c || (c = ""), "" === s || null === s) {
            if ("" !== a && null !== a || (a = r.toLowerCase().replace(/ ?\n/g, " ")), s = "#" + a, 
            t.helper.isUndefined(u[a])) return e;
            s = u[a], t.helper.isUndefined(p[a]) || (c = p[a]), t.helper.isUndefined(h[a]) || (o = h[a].width, 
            i = h[a].height);
        }
        r = r.replace(/"/g, "&quot;"), r = t.helper.escapeCharacters(r, "*_", !1);
        var d = '<img src="' + (s = t.helper.escapeCharacters(s, "*_", !1)) + '" alt="' + r + '"';
        return c && (c = c.replace(/"/g, "&quot;"), d += ' title="' + (c = t.helper.escapeCharacters(c, "*_", !1)) + '"'), 
        o && i && (d += ' width="' + (o = "*" === o ? "auto" : o) + '"', d += ' height="' + (i = "*" === i ? "auto" : i) + '"'), 
        d += " />";
    }
    return e = (e = (e = n.converter._dispatch("images.before", e, r, n)).replace(/!\[([^\]]*?)] ?(?:\n *)?\[(.*?)]()()()()()/g, a)).replace(/!\[(.*?)]\s?\([ \t]*()<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(['"])(.*?)\6[ \t]*)?\)/g, a), 
    e = n.converter._dispatch("images.after", e, r, n);
}), t.subParser("italicsAndBold", function(e, r, t) {
    return e = t.converter._dispatch("italicsAndBold.before", e, r, t), e = r.literalMidWordUnderscores ? (e = (e = (e = e.replace(/(^|\s|>|\b)__(?=\S)([\s\S]+?)__(?=\b|<|\s|$)/gm, "$1<strong>$2</strong>")).replace(/(^|\s|>|\b)_(?=\S)([\s\S]+?)_(?=\b|<|\s|$)/gm, "$1<em>$2</em>")).replace(/(\*\*)(?=\S)([^\r]*?\S[*]*)\1/g, "<strong>$2</strong>")).replace(/(\*)(?=\S)([^\r]*?\S)\1/g, "<em>$2</em>") : (e = e.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g, "<strong>$2</strong>")).replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g, "<em>$2</em>"), 
    e = t.converter._dispatch("italicsAndBold.after", e, r, t);
}), t.subParser("lists", function(e, r, n) {
    function a(e, a) {
        n.gListLevel++, e = e.replace(/\n{2,}$/, "\n");
        var s = /\n[ \t]*\n(?!~0)/.test(e += "~0");
        return e = (e = e.replace(/(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm, function(e, a, o, i, l, c, u) {
            u = u && "" !== u.trim();
            var p = t.subParser("outdent")(l, r, n), h = "";
            return c && r.tasklists && (h = ' class="task-list-item" style="list-style-type: none;"', 
            p = p.replace(/^[ \t]*\[(x|X| )?]/m, function() {
                var e = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
                return u && (e += " checked"), e += ">";
            })), a || p.search(/\n{2,}/) > -1 ? (p = t.subParser("githubCodeBlocks")(p, r, n), 
            p = t.subParser("blockGamut")(p, r, n)) : (p = (p = t.subParser("lists")(p, r, n)).replace(/\n$/, ""), 
            p = s ? t.subParser("paragraphs")(p, r, n) : t.subParser("spanGamut")(p, r, n)), 
            p = "\n<li" + h + ">" + p + "</li>\n";
        })).replace(/~0/g, ""), n.gListLevel--, a && (e = e.replace(/\s+$/, "")), e;
    }
    function s(e, r, t) {
        var n = "ul" === r ? /^ {0,2}\d+\.[ \t]/gm : /^ {0,2}[*+-][ \t]/gm, s = [], o = "";
        if (-1 !== e.search(n)) {
            !function e(s) {
                var i = s.search(n);
                -1 !== i ? (o += "\n\n<" + r + ">" + a(s.slice(0, i), !!t) + "</" + r + ">\n\n", 
                n = "ul" === (r = "ul" === r ? "ol" : "ul") ? /^ {0,2}\d+\.[ \t]/gm : /^ {0,2}[*+-][ \t]/gm, 
                e(s.slice(i))) : o += "\n\n<" + r + ">" + a(s, !!t) + "</" + r + ">\n\n";
            }(e);
            for (var i = 0; i < s.length; ++i) ;
        } else o = "\n\n<" + r + ">" + a(e, !!t) + "</" + r + ">\n\n";
        return o;
    }
    e = n.converter._dispatch("lists.before", e, r, n), e += "~0";
    var o = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
    return n.gListLevel ? e = e.replace(o, function(e, r, t) {
        return s(r, t.search(/[*+-]/g) > -1 ? "ul" : "ol", !0);
    }) : (o = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm, 
    e = e.replace(o, function(e, r, t, n) {
        return s(t, n.search(/[*+-]/g) > -1 ? "ul" : "ol");
    })), e = e.replace(/~0/, ""), e = n.converter._dispatch("lists.after", e, r, n);
}), t.subParser("outdent", function(e) {
    return e = (e = e.replace(/^(\t|[ ]{1,4})/gm, "~0")).replace(/~0/g, "");
}), t.subParser("paragraphs", function(e, r, n) {
    for (var a = (e = (e = (e = n.converter._dispatch("paragraphs.before", e, r, n)).replace(/^\n+/g, "")).replace(/\n+$/g, "")).split(/\n{2,}/g), s = [], o = a.length, i = 0; i < o; i++) {
        var l = a[i];
        l.search(/~(K|G)(\d+)\1/g) >= 0 ? s.push(l) : (l = (l = t.subParser("spanGamut")(l, r, n)).replace(/^([ \t]*)/g, "<p>"), 
        l += "</p>", s.push(l));
    }
    for (o = s.length, i = 0; i < o; i++) {
        for (var c = "", u = s[i], p = !1; u.search(/~(K|G)(\d+)\1/) >= 0; ) {
            var h = RegExp.$1, d = RegExp.$2;
            c = (c = "K" === h ? n.gHtmlBlocks[d] : p ? t.subParser("encodeCode")(n.ghCodeBlocks[d].text) : n.ghCodeBlocks[d].codeblock).replace(/\$/g, "$$$$"), 
            u = u.replace(/(\n\n)?~(K|G)\d+\2(\n\n)?/, c), /^<pre\b[^>]*>\s*<code\b[^>]*>/.test(u) && (p = !0);
        }
        s[i] = u;
    }
    return e = (e = (e = s.join("\n\n")).replace(/^\n+/g, "")).replace(/\n+$/g, ""), 
    n.converter._dispatch("paragraphs.after", e, r, n);
}), t.subParser("runExtension", function(e, r, t, n) {
    if (e.filter) r = e.filter(r, n.converter, t); else if (e.regex) {
        var a = e.regex;
        !a instanceof RegExp && (a = new RegExp(a, "g")), r = r.replace(a, e.replace);
    }
    return r;
}), t.subParser("spanGamut", function(e, r, n) {
    return e = n.converter._dispatch("spanGamut.before", e, r, n), e = t.subParser("codeSpans")(e, r, n), 
    e = t.subParser("escapeSpecialCharsWithinTagAttributes")(e, r, n), e = t.subParser("encodeBackslashEscapes")(e, r, n), 
    e = t.subParser("images")(e, r, n), e = t.subParser("anchors")(e, r, n), e = t.subParser("autoLinks")(e, r, n), 
    e = t.subParser("encodeAmpsAndAngles")(e, r, n), e = t.subParser("italicsAndBold")(e, r, n), 
    e = (e = t.subParser("strikethrough")(e, r, n)).replace(/  +\n/g, " <br />\n"), 
    e = n.converter._dispatch("spanGamut.after", e, r, n);
}), t.subParser("strikethrough", function(e, r, t) {
    return r.strikethrough && (e = (e = t.converter._dispatch("strikethrough.before", e, r, t)).replace(/(?:~T){2}([\s\S]+?)(?:~T){2}/g, "<del>$1</del>"), 
    e = t.converter._dispatch("strikethrough.after", e, r, t)), e;
}), t.subParser("stripBlankLines", function(e) {
    return e.replace(/^[ \t]+$/gm, "");
}), t.subParser("stripLinkDefinitions", function(e, r, n) {
    return e = (e = (e += "~0").replace(/^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=~0))/gm, function(e, a, s, o, i, l, c) {
        return a = a.toLowerCase(), n.gUrls[a] = t.subParser("encodeAmpsAndAngles")(s), 
        l ? l + c : (c && (n.gTitles[a] = c.replace(/"|'/g, "&quot;")), r.parseImgDimensions && o && i && (n.gDimensions[a] = {
            width: o,
            height: i
        }), "");
    })).replace(/~0/, "");
}), t.subParser("tables", function(e, r, n) {
    if (!r.tables) return e;
    function a(e, a) {
        return "<td" + a + ">" + t.subParser("spanGamut")(e, r, n) + "</td>\n";
    }
    return e = (e = n.converter._dispatch("tables.before", e, r, n)).replace(/^[ \t]{0,3}\|?.+\|.+\n[ \t]{0,3}\|?[ \t]*:?[ \t]*(?:-|=){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:-|=){2,}[\s\S]+?(?:\n\n|~0)/gm, function(e) {
        var s, o = e.split("\n");
        for (s = 0; s < o.length; ++s) /^[ \t]{0,3}\|/.test(o[s]) && (o[s] = o[s].replace(/^[ \t]{0,3}\|/, "")), 
        /\|[ \t]*$/.test(o[s]) && (o[s] = o[s].replace(/\|[ \t]*$/, ""));
        var i, l, c, u, p = o[0].split("|").map(function(e) {
            return e.trim();
        }), h = o[1].split("|").map(function(e) {
            return e.trim();
        }), d = [], f = [], g = [], b = [];
        for (o.shift(), o.shift(), s = 0; s < o.length; ++s) "" !== o[s].trim() && d.push(o[s].split("|").map(function(e) {
            return e.trim();
        }));
        if (p.length < h.length) return e;
        for (s = 0; s < h.length; ++s) g.push((i = h[s], /^:[ \t]*--*$/.test(i) ? ' style="text-align:left;"' : /^--*[ \t]*:[ \t]*$/.test(i) ? ' style="text-align:right;"' : /^:[ \t]*--*[ \t]*:$/.test(i) ? ' style="text-align:center;"' : ""));
        for (s = 0; s < p.length; ++s) t.helper.isUndefined(g[s]) && (g[s] = ""), f.push((l = p[s], 
        c = g[s], u = void 0, u = "", l = l.trim(), r.tableHeaderId && (u = ' id="' + l.replace(/ /g, "_").toLowerCase() + '"'), 
        "<th" + u + c + ">" + (l = t.subParser("spanGamut")(l, r, n)) + "</th>\n"));
        for (s = 0; s < d.length; ++s) {
            for (var v = [], m = 0; m < f.length; ++m) t.helper.isUndefined(d[s][m]), v.push(a(d[s][m], g[m]));
            b.push(v);
        }
        return function(e, r) {
            for (var t = "<table>\n<thead>\n<tr>\n", n = e.length, a = 0; a < n; ++a) t += e[a];
            for (t += "</tr>\n</thead>\n<tbody>\n", a = 0; a < r.length; ++a) {
                t += "<tr>\n";
                for (var s = 0; s < n; ++s) t += r[a][s];
                t += "</tr>\n";
            }
            return t += "</tbody>\n</table>\n";
        }(f, b);
    }), e = n.converter._dispatch("tables.after", e, r, n);
}), t.subParser("unescapeSpecialChars", function(e) {
    return e = e.replace(/~E(\d+)E/g, function(e, r) {
        var t = parseInt(r);
        return String.fromCharCode(t);
    });
}), module.exports = t;