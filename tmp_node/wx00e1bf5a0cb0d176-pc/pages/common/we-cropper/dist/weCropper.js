var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function(e, n) {
    "object" === ("undefined" == typeof exports ? "undefined" : t(exports)) && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : e.WeCropper = n();
}(void 0, function() {
    function e(t) {
        return t.charAt(0).toUpperCase() + t.slice(1);
    }
    function n(t) {
        for (var e = [], n = arguments.length - 1; n-- > 0; ) e[n] = arguments[n + 1];
        p.forEach(function(n, o) {
            void 0 !== e[o] && (t[n] = e[o]);
        });
    }
    function o(t, e) {
        Object.defineProperties(t, e);
    }
    function r() {
        return g || (g = wx.getSystemInfoSync()), g;
    }
    function i(t, e) {
        return e = {
            exports: {}
        }, t(e, e.exports), e.exports;
    }
    function a(t) {
        return function(e) {
            return void 0 === e && (e = {}), new Promise(function(n, o) {
                e.success = function(t) {
                    n(t);
                }, e.fail = function(t) {
                    o(t);
                }, t(e);
            });
        };
    }
    function c(t, e) {
        return void 0 === e && (e = !1), new Promise(function(n) {
            t.draw(e, n);
        });
    }
    function u(t, e) {
        return "data:" + e + ";base64," + t;
    }
    function d(t) {
        return "image/" + (t = t.toLowerCase().replace(/jpg/i, "jpeg")).match(/png|jpeg|bmp|gif/)[0];
    }
    function s(t) {
        var e = "";
        if ("string" == typeof t) e = t; else for (var n = 0; n < t.length; n++) e += String.fromCharCode(t[n]);
        return T.encode(e);
    }
    function f(t, e, n, o, r, i) {
        wx.canvasGetImageData({
            canvasId: t,
            x: e,
            y: n,
            width: o,
            height: r,
            success: function(t) {
                i(t);
            },
            fail: function(t) {
                i(null), console.error("canvasGetImageData error: " + t);
            }
        });
    }
    function h(t) {
        var e = t.width, n = t.height, o = e * n * 3, r = o + 54, i = [ 66, 77, 255 & r, r >> 8 & 255, r >> 16 & 255, r >> 24 & 255, 0, 0, 0, 0, 54, 0, 0, 0 ], a = [ 40, 0, 0, 0, 255 & e, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255, 255 & n, n >> 8 & 255, n >> 16 & 255, n >> 24 & 255, 1, 0, 24, 0, 0, 0, 0, 0, 255 & o, o >> 8 & 255, o >> 16 & 255, o >> 24 & 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], c = (4 - 3 * e % 4) % 4, u = t.data, d = "", f = e << 2, h = n, l = String.fromCharCode;
        do {
            for (var g = f * (h - 1), p = "", v = 0; v < e; v++) {
                var y = v << 2;
                p += l(u[g + y + 2]) + l(u[g + y + 1]) + l(u[g + y]);
            }
            for (var x = 0; x < c; x++) p += String.fromCharCode(0);
            d += p;
        } while (--h);
        return s(i.concat(a)) + s(d);
    }
    function l(t, e, n, o, r, i, a) {
        void 0 === a && (a = function() {}), void 0 === i && (i = "png"), i = d(i), /bmp/.test(i) ? f(t, e, n, o, r, function(t) {
            var e = h(t);
            w(a) && a(u(e, "image/" + i));
        }) : console.error("暂不支持生成'" + i + "'类型的base64图片");
    }
    var g = void 0, p = [ "touchstarted", "touchmoved", "touchended" ], v = {}, y = {
        id: {
            default: "cropper",
            get: function() {
                return v.id;
            },
            set: function(t) {
                "string" != typeof t && console.error("id：" + t + " is invalid"), v.id = t;
            }
        },
        width: {
            default: 750,
            get: function() {
                return v.width;
            },
            set: function(t) {
                "number" != typeof t && console.error("width：" + t + " is invalid"), v.width = t;
            }
        },
        height: {
            default: 750,
            get: function() {
                return v.height;
            },
            set: function(t) {
                "number" != typeof t && console.error("height：" + t + " is invalid"), v.height = t;
            }
        },
        pixelRatio: {
            default: r().pixelRatio,
            get: function() {
                return v.pixelRatio;
            },
            set: function(t) {
                "number" != typeof t && console.error("pixelRatio：" + t + " is invalid"), v.pixelRatio = t;
            }
        },
        scale: {
            default: 2.5,
            get: function() {
                return v.scale;
            },
            set: function(t) {
                "number" != typeof t && console.error("scale：" + t + " is invalid"), v.scale = t;
            }
        },
        zoom: {
            default: 5,
            get: function() {
                return v.zoom;
            },
            set: function(t) {
                "number" != typeof t ? console.error("zoom：" + t + " is invalid") : (t < 0 || t > 10) && console.error("zoom should be ranged in 0 ~ 10"), 
                v.zoom = t;
            }
        },
        src: {
            default: "",
            get: function() {
                return v.src;
            },
            set: function(t) {
                "string" != typeof t && console.error("src：" + t + " is invalid"), v.src = t;
            }
        },
        cut: {
            default: {},
            get: function() {
                return v.cut;
            },
            set: function(e) {
                "object" !== (void 0 === e ? "undefined" : t(e)) && console.error("cut：" + e + " is invalid"), 
                v.cut = e;
            }
        },
        boundStyle: {
            default: {},
            get: function() {
                return v.boundStyle;
            },
            set: function(e) {
                "object" !== (void 0 === e ? "undefined" : t(e)) && console.error("boundStyle：" + e + " is invalid"), 
                v.boundStyle = e;
            }
        },
        onReady: {
            default: null,
            get: function() {
                return v.ready;
            },
            set: function(t) {
                v.ready = t;
            }
        },
        onBeforeImageLoad: {
            default: null,
            get: function() {
                return v.beforeImageLoad;
            },
            set: function(t) {
                v.beforeImageLoad = t;
            }
        },
        onImageLoad: {
            default: null,
            get: function() {
                return v.imageLoad;
            },
            set: function(t) {
                v.imageLoad = t;
            }
        },
        onBeforeDraw: {
            default: null,
            get: function() {
                return v.beforeDraw;
            },
            set: function(t) {
                v.beforeDraw = t;
            }
        }
    }, x = r().windowWidth, m = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}, b = i(function(e, n) {
        n.isStr = function(t) {
            return "string" == typeof t;
        }, n.isNum = function(t) {
            return "number" == typeof t;
        }, n.isArr = Array.isArray, n.isUndef = function(t) {
            return void 0 === t;
        }, n.isTrue = function(t) {
            return !0 === t;
        }, n.isFalse = function(t) {
            return !1 === t;
        }, n.isFunc = function(t) {
            return "function" == typeof t;
        }, n.isObj = n.isObject = function(e) {
            return null !== e && "object" === (void 0 === e ? "undefined" : t(e));
        };
        var o = Object.prototype.toString;
        n.isPlainObject = function(t) {
            return "[object Object]" === o.call(t);
        };
        var r = Object.prototype.hasOwnProperty;
        n.hasOwn = function(t, e) {
            return r.call(t, e);
        }, n.noop = function(t, e, n) {}, n.isValidArrayIndex = function(t) {
            var e = parseFloat(String(t));
            return e >= 0 && Math.floor(e) === e && isFinite(t);
        };
    }), w = b.isFunc, S = b.isPlainObject, C = [ "ready", "beforeImageLoad", "beforeDraw", "imageLoad" ], M = a(wx.getImageInfo), I = a(wx.canvasToTempFilePath), T = i(function(e, n) {
        !function(o) {
            var r = n, i = e && e.exports == r && e, a = "object" == (void 0 === m ? "undefined" : t(m)) && m;
            a.global !== a && a.window !== a || (o = a);
            var c = function(t) {
                this.message = t;
            };
            (c.prototype = new Error()).name = "InvalidCharacterError";
            var u = function(t) {
                throw new c(t);
            }, d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = /[\t\n\f\r ]/g, f = {
                encode: function(t) {
                    t = String(t), /[^\0-\xFF]/.test(t) && u("The string to be encoded contains characters outside of the Latin1 range.");
                    for (var e, n = t.length % 3, o = "", r = -1, i = t.length - n; ++r < i; ) e = (t.charCodeAt(r) << 16) + (t.charCodeAt(++r) << 8) + t.charCodeAt(++r), 
                    o += d.charAt(e >> 18 & 63) + d.charAt(e >> 12 & 63) + d.charAt(e >> 6 & 63) + d.charAt(63 & e);
                    return 2 == n ? (e = (t.charCodeAt(r) << 8) + t.charCodeAt(++r), o += d.charAt(e >> 10) + d.charAt(e >> 4 & 63) + d.charAt(e << 2 & 63) + "=") : 1 == n && (e = t.charCodeAt(r), 
                    o += d.charAt(e >> 2) + d.charAt(e << 4 & 63) + "=="), o;
                },
                decode: function(t) {
                    var e = (t = String(t).replace(s, "")).length;
                    e % 4 == 0 && (e = (t = t.replace(/==?$/, "")).length), (e % 4 == 1 || /[^+a-zA-Z0-9/]/.test(t)) && u("Invalid character: the string to be decoded is not correctly encoded.");
                    for (var n, o, r = 0, i = "", a = -1; ++a < e; ) o = d.indexOf(t.charAt(a)), n = r % 4 ? 64 * n + o : o, 
                    r++ % 4 && (i += String.fromCharCode(255 & n >> (-2 * r & 6)));
                    return i;
                },
                version: "0.1.0"
            };
            if (r && !r.nodeType) if (i) i.exports = f; else for (var h in f) f.hasOwnProperty(h) && (r[h] = f[h]); else o.base64 = f;
        }(m);
    }), j = {
        convertToImage: l,
        convertToBMP: function(t, e) {
            void 0 === t && (t = {});
            var n = t.canvasId, o = t.x, r = t.y, i = t.width, a = t.height;
            return void 0 === e && (e = function() {}), l(n, o, r, i, a, "bmp", e);
        }
    }, A = function(t, e, n, o, r) {
        var i, a, c;
        return i = Math.round(r.x - o.x), a = Math.round(r.y - o.y), c = Math.round(Math.sqrt(i * i + a * a)), 
        t + .001 * n * (c - e);
    }, L = {
        touchStart: function(t) {
            var e = this, o = t.touches, r = o[0], i = o[1];
            e.src && (n(e, !0, null, null), e.__oneTouchStart(r), t.touches.length >= 2 && e.__twoTouchStart(r, i));
        },
        touchMove: function(t) {
            var e = this, o = t.touches, r = o[0], i = o[1];
            e.src && (n(e, null, !0), 1 === t.touches.length && e.__oneTouchMove(r), t.touches.length >= 2 && e.__twoTouchMove(r, i));
        },
        touchEnd: function(t) {
            var e = this;
            e.src && (n(e, !1, !1, !0), e.__xtouchEnd());
        }
    }, O = function(t) {
        var e = this, n = {};
        return o(e, y), Object.keys(y).forEach(function(t) {
            n[t] = y[t].default;
        }), Object.assign(e, n, t), e.prepare(), e.attachPage(), e.createCtx(), e.observer(), 
        e.cutt(), e.methods(), e.init(), e.update(), e;
    };
    return O.prototype.init = function() {
        var t = this, e = t.src;
        return t.version = "1.3.3", "function" == typeof t.onReady && t.onReady(t.ctx, t), 
        e ? t.pushOrign(e) : t.updateCanvas(), n(t, !1, !1, !1), t.oldScale = 1, t.newScale = 1, 
        t;
    }, Object.assign(O.prototype, L), O.prototype.prepare = function() {
        var t = this;
        t.attachPage = function() {
            var e = getCurrentPages(), n = e[e.length - 1];
            Object.defineProperty(n, "wecropper", {
                get: function() {
                    return t;
                }
            });
        }, t.createCtx = function() {
            var e = t.id, n = t.targetId;
            e ? (t.ctx = wx.createCanvasContext(e), t.targetCtx = wx.createCanvasContext(n)) : console.error("constructor: create canvas context failed, 'id' must be valuable");
        }, t.deviceRadio = x / 750;
    }, O.prototype.observer = function() {
        var t = this;
        t.on = function(n, o) {
            return C.indexOf(n) > -1 ? w(o) && ("ready" === n ? o(t) : t["on" + e(n)] = o) : console.error("event: " + n + " is invalid"), 
            t;
        };
    }, O.prototype.methods = function() {
        var t = this, e = t.width, n = t.height, o = t.id, r = t.targetId, i = t.pixelRatio, a = t.cut, u = a.x;
        void 0 === u && (u = 0);
        var d = a.y;
        void 0 === d && (d = 0);
        var s = a.width;
        void 0 === s && (s = e);
        var f = a.height;
        void 0 === f && (f = n), t.updateCanvas = function(e) {
            return t.croperTarget && t.ctx.drawImage(t.croperTarget, t.imgLeft, t.imgTop, t.scaleWidth, t.scaleHeight), 
            w(t.onBeforeDraw) && t.onBeforeDraw(t.ctx, t), t.setBoundStyle(t.boundStyle), t.ctx.draw(!1, e), 
            t;
        }, t.pushOrign = function(e) {
            return t.src = e, w(t.onBeforeImageLoad) && t.onBeforeImageLoad(t.ctx, t), M({
                src: e
            }).then(function(e) {
                var n = e.width / e.height, o = s / f;
                return t.croperTarget = e.path, n < o ? (t.rectX = u, t.baseWidth = s, t.baseHeight = s / n, 
                t.rectY = d - Math.abs((f - t.baseHeight) / 2)) : (t.rectY = d, t.baseWidth = f * n, 
                t.baseHeight = f, t.rectX = u - Math.abs((s - t.baseWidth) / 2)), t.imgLeft = t.rectX, 
                t.imgTop = t.rectY, t.scaleWidth = t.baseWidth, t.scaleHeight = t.baseHeight, t.update(), 
                new Promise(function(e) {
                    t.updateCanvas(e);
                });
            }).then(function() {
                w(t.onImageLoad) && t.onImageLoad(t.ctx, t);
            });
        }, t.getCropperBase64 = function(t) {
            void 0 === t && (t = function() {}), j.convertToBMP({
                canvasId: o,
                x: u,
                y: d,
                width: s,
                height: f
            }, t);
        }, t.getCropperImage = function() {
            for (var e = [], n = arguments.length; n--; ) e[n] = arguments[n];
            var a = e[0], h = e[e.length - 1], l = {
                canvasId: o,
                x: u,
                y: d,
                width: s,
                height: f
            }, g = function() {
                return Promise.resolve();
            };
            return S(a) && a.original && (g = function() {
                return t.targetCtx.drawImage(t.croperTarget, t.imgLeft * i, t.imgTop * i, t.scaleWidth * i, t.scaleHeight * i), 
                l = {
                    canvasId: r,
                    x: u * i,
                    y: d * i,
                    width: s * i,
                    height: f * i
                }, c(t.targetCtx);
            }), g().then(function() {
                return S(a) && (l = Object.assign({}, l, a)), I(l);
            }).then(function(e) {
                var n = e.tempFilePath;
                return w(h) && h.call(t, n), n;
            }).catch(function() {
                w(h) && h.call(t, null);
            });
        };
    }, O.prototype.cutt = function() {
        var t = this, e = t.width, n = t.height, o = t.cut, r = o.x;
        void 0 === r && (r = 0);
        var i = o.y;
        void 0 === i && (i = 0);
        var a = o.width;
        void 0 === a && (a = e);
        var c = o.height;
        void 0 === c && (c = n), t.outsideBound = function(e, n) {
            t.imgLeft = e >= r ? r : t.scaleWidth + e - r <= a ? r + a - t.scaleWidth : e, t.imgTop = n >= i ? i : t.scaleHeight + n - i <= c ? i + c - t.scaleHeight : n;
        }, t.setBoundStyle = function(o) {
            void 0 === o && (o = {});
            var u = o.color;
            void 0 === u && (u = "#04b00f");
            var d = o.mask;
            void 0 === d && (d = "rgba(0, 0, 0, 0.3)");
            var s = o.lineWidth;
            void 0 === s && (s = 1);
            var f = [ {
                start: {
                    x: r - s,
                    y: i + 10 - s
                },
                step1: {
                    x: r - s,
                    y: i - s
                },
                step2: {
                    x: r + 10 - s,
                    y: i - s
                }
            }, {
                start: {
                    x: r - s,
                    y: i + c - 10 + s
                },
                step1: {
                    x: r - s,
                    y: i + c + s
                },
                step2: {
                    x: r + 10 - s,
                    y: i + c + s
                }
            }, {
                start: {
                    x: r + a - 10 + s,
                    y: i - s
                },
                step1: {
                    x: r + a + s,
                    y: i - s
                },
                step2: {
                    x: r + a + s,
                    y: i + 10 - s
                }
            }, {
                start: {
                    x: r + a + s,
                    y: i + c - 10 + s
                },
                step1: {
                    x: r + a + s,
                    y: i + c + s
                },
                step2: {
                    x: r + a - 10 + s,
                    y: i + c + s
                }
            } ];
            t.ctx.beginPath(), t.ctx.setFillStyle(d), t.ctx.fillRect(0, 0, r, n), t.ctx.fillRect(r, 0, a, i), 
            t.ctx.fillRect(r, i + c, a, n - i - c), t.ctx.fillRect(r + a, 0, e - r - a, n), 
            t.ctx.fill(), f.forEach(function(e) {
                t.ctx.beginPath(), t.ctx.setStrokeStyle(u), t.ctx.setLineWidth(s), t.ctx.moveTo(e.start.x, e.start.y), 
                t.ctx.lineTo(e.step1.x, e.step1.y), t.ctx.lineTo(e.step2.x, e.step2.y), t.ctx.stroke();
            });
        };
    }, O.prototype.update = function() {
        var t = this;
        t.src && (t.__oneTouchStart = function(e) {
            t.touchX0 = Math.round(e.x), t.touchY0 = Math.round(e.y);
        }, t.__oneTouchMove = function(e) {
            var n, o;
            if (t.touchended) return t.updateCanvas();
            n = Math.round(e.x - t.touchX0), o = Math.round(e.y - t.touchY0);
            var r = Math.round(t.rectX + n), i = Math.round(t.rectY + o);
            t.outsideBound(r, i), t.updateCanvas();
        }, t.__twoTouchStart = function(e, n) {
            var o, r, i;
            t.touchX1 = Math.round(t.rectX + t.scaleWidth / 2), t.touchY1 = Math.round(t.rectY + t.scaleHeight / 2), 
            o = Math.round(n.x - e.x), r = Math.round(n.y - e.y), i = Math.round(Math.sqrt(o * o + r * r)), 
            t.oldDistance = i;
        }, t.__twoTouchMove = function(e, n) {
            var o = t.oldScale, r = t.oldDistance, i = t.scale, a = t.zoom;
            t.newScale = A(o, r, a, e, n), t.newScale <= 1 && (t.newScale = 1), t.newScale >= i && (t.newScale = i), 
            t.scaleWidth = Math.round(t.newScale * t.baseWidth), t.scaleHeight = Math.round(t.newScale * t.baseHeight);
            var c = Math.round(t.touchX1 - t.scaleWidth / 2), u = Math.round(t.touchY1 - t.scaleHeight / 2);
            t.outsideBound(c, u), t.updateCanvas();
        }, t.__xtouchEnd = function() {
            t.oldScale = t.newScale, t.rectX = t.imgLeft, t.rectY = t.imgTop;
        });
    }, O;
});