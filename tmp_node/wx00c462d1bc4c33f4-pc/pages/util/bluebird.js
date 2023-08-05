var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function(e) {
    if ("object" == ("undefined" == typeof exports ? "undefined" : t(exports)) && "undefined" != typeof module) module.exports = e(); else if ("function" == typeof define && define.amd) define([], e); else {
        var n;
        "undefined" != typeof window ? n = window : "undefined" != typeof global ? n = global : "undefined" != typeof self && (n = self), 
        n.Promise = e();
    }
}(function() {
    var e, n, r;
    return function t(e, n, r) {
        function i(s, a) {
            if (!n[s]) {
                if (!e[s]) {
                    var c = "function" == typeof _dereq_ && _dereq_;
                    if (!a && c) return c(s, !0);
                    if (o) return o(s, !0);
                    var l = new Error("Cannot find module '" + s + "'");
                    throw l.code = "MODULE_NOT_FOUND", l;
                }
                var u = n[s] = {
                    exports: {}
                };
                e[s][0].call(u.exports, function(t) {
                    var n = e[s][1][t];
                    return i(n || t);
                }, u, u.exports, t, e, n, r);
            }
            return n[s].exports;
        }
        for (var o = "function" == typeof _dereq_ && _dereq_, s = 0; s < r.length; s++) i(r[s]);
        return i;
    }({
        1: [ function(t, e, n) {
            e.exports = function(t) {
                function e(t) {
                    var e = new n(t), r = e.promise();
                    return e.setHowMany(1), e.setUnwrap(), e.init(), r;
                }
                var n = t._SomePromiseArray;
                t.any = function(t) {
                    return e(t);
                }, t.prototype.any = function() {
                    return e(this);
                };
            };
        }, {} ],
        2: [ function(t, e, n) {
            function r() {
                this._customScheduler = !1, this._isTickUsed = !1, this._lateQueue = new l(16), 
                this._normalQueue = new l(16), this._haveDrainedQueues = !1, this._trampolineEnabled = !0;
                var t = this;
                this.drainQueues = function() {
                    t._drainQueues();
                }, this._schedule = c;
            }
            function i(t, e, n) {
                this._lateQueue.push(t, e, n), this._queueTick();
            }
            function o(t, e, n) {
                this._normalQueue.push(t, e, n), this._queueTick();
            }
            function s(t) {
                this._normalQueue._pushOne(t), this._queueTick();
            }
            var a;
            try {
                throw new Error();
            } catch (t) {
                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                a = t;
            }
            var c = t("./schedule"), l = t("./queue"), u = t("./util");
            r.prototype.setScheduler = function(t) {
                var e = this._schedule;
                return this._schedule = t, this._customScheduler = !0, e;
            }, r.prototype.hasCustomScheduler = function() {
                return this._customScheduler;
            }, r.prototype.enableTrampoline = function() {
                this._trampolineEnabled = !0;
            }, r.prototype.disableTrampolineIfNecessary = function() {
                u.hasDevTools && (this._trampolineEnabled = !1);
            }, r.prototype.haveItemsQueued = function() {
                return this._isTickUsed || this._haveDrainedQueues;
            }, r.prototype.fatalError = function(t, e) {
                e ? (process.stderr.write("Fatal " + (t instanceof Error ? t.stack : t) + "\n"), 
                process.exit(2)) : this.throwLater(t);
            }, r.prototype.throwLater = function(t, e) {
                if (1 === arguments.length && (e = t, t = function() {
                    throw e;
                }), "undefined" != typeof setTimeout) setTimeout(function() {
                    t(e);
                }, 0); else try {
                    this._schedule(function() {
                        t(e);
                    });
                } catch (t) {
                    t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                    throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
                }
            }, u.hasDevTools ? (r.prototype.invokeLater = function(t, e, n) {
                this._trampolineEnabled ? i.call(this, t, e, n) : this._schedule(function() {
                    setTimeout(function() {
                        t.call(e, n);
                    }, 100);
                });
            }, r.prototype.invoke = function(t, e, n) {
                this._trampolineEnabled ? o.call(this, t, e, n) : this._schedule(function() {
                    t.call(e, n);
                });
            }, r.prototype.settlePromises = function(t) {
                this._trampolineEnabled ? s.call(this, t) : this._schedule(function() {
                    t._settlePromises();
                });
            }) : (r.prototype.invokeLater = i, r.prototype.invoke = o, r.prototype.settlePromises = s), 
            r.prototype._drainQueue = function(t) {
                for (;t.length() > 0; ) {
                    var e = t.shift();
                    if ("function" == typeof e) {
                        var n = t.shift(), r = t.shift();
                        e.call(n, r);
                    } else e._settlePromises();
                }
            }, r.prototype._drainQueues = function() {
                this._drainQueue(this._normalQueue), this._reset(), this._haveDrainedQueues = !0, 
                this._drainQueue(this._lateQueue);
            }, r.prototype._queueTick = function() {
                this._isTickUsed || (this._isTickUsed = !0, this._schedule(this.drainQueues));
            }, r.prototype._reset = function() {
                this._isTickUsed = !1;
            }, e.exports = r, e.exports.firstLineError = a;
        }, {
            "./queue": 26,
            "./schedule": 29,
            "./util": 36
        } ],
        3: [ function(t, e, n) {
            e.exports = function(t, e, n, r) {
                var i = !1, o = function(t, e) {
                    this._reject(e);
                }, s = function(t, e) {
                    e.promiseRejectionQueued = !0, e.bindingPromise._then(o, o, null, this, t);
                }, a = function(t, e) {
                    0 == (50397184 & this._bitField) && this._resolveCallback(e.target);
                }, c = function(t, e) {
                    e.promiseRejectionQueued || this._reject(t);
                };
                t.prototype.bind = function(o) {
                    i || (i = !0, t.prototype._propagateFrom = r.propagateFromFunction(), t.prototype._boundValue = r.boundValueFunction());
                    var l = n(o), u = new t(e);
                    u._propagateFrom(this, 1);
                    var p = this._target();
                    if (u._setBoundTo(l), l instanceof t) {
                        var h = {
                            promiseRejectionQueued: !1,
                            promise: u,
                            target: p,
                            bindingPromise: l
                        };
                        p._then(e, s, void 0, u, h), l._then(a, c, void 0, u, h), u._setOnCancel(l);
                    } else u._resolveCallback(p);
                    return u;
                }, t.prototype._setBoundTo = function(t) {
                    void 0 !== t ? (this._bitField = 2097152 | this._bitField, this._boundTo = t) : this._bitField = -2097153 & this._bitField;
                }, t.prototype._isBound = function() {
                    return 2097152 == (2097152 & this._bitField);
                }, t.bind = function(e, n) {
                    return t.resolve(n).bind(e);
                };
            };
        }, {} ],
        4: [ function(t, e, n) {
            var r;
            "undefined" != typeof Promise && (r = Promise);
            var i = t("./promise")();
            i.noConflict = function() {
                try {
                    Promise === i && (Promise = r);
                } catch (t) {}
                return i;
            }, e.exports = i;
        }, {
            "./promise": 22
        } ],
        5: [ function(t, e, n) {
            var r = Object.create;
            if (r) {
                var i = r(null), o = r(null);
                i[" size"] = o[" size"] = 0;
            }
            e.exports = function(e) {
                function n(t, n) {
                    var r;
                    if (null != t && (r = t[n]), "function" != typeof r) {
                        var i = "Object " + a.classString(t) + " has no method '" + a.toString(n) + "'";
                        throw new e.TypeError(i);
                    }
                    return r;
                }
                function r(t) {
                    return n(t, this.pop()).apply(t, this);
                }
                function i(t) {
                    return t[this];
                }
                function o(t) {
                    var e = +this;
                    return e < 0 && (e = Math.max(0, e + t.length)), t[e];
                }
                var s, a = t("./util"), c = a.canEvaluate;
                a.isIdentifier;
                e.prototype.call = function(t) {
                    var e = [].slice.call(arguments, 1);
                    return e.push(t), this._then(r, void 0, void 0, e, void 0);
                }, e.prototype.get = function(t) {
                    var e;
                    if ("number" == typeof t) e = o; else if (c) {
                        var n = s(t);
                        e = null !== n ? n : i;
                    } else e = i;
                    return this._then(e, void 0, void 0, t, void 0);
                };
            };
        }, {
            "./util": 36
        } ],
        6: [ function(t, e, n) {
            e.exports = function(e, n, r, i) {
                var o = t("./util"), s = o.tryCatch, a = o.errorObj, c = e._async;
                e.prototype.break = e.prototype.cancel = function() {
                    if (!i.cancellation()) return this._warn("cancellation is disabled");
                    for (var t = this, e = t; t._isCancellable(); ) {
                        if (!t._cancelBy(e)) {
                            e._isFollowing() ? e._followee().cancel() : e._cancelBranched();
                            break;
                        }
                        var n = t._cancellationParent;
                        if (null == n || !n._isCancellable()) {
                            t._isFollowing() ? t._followee().cancel() : t._cancelBranched();
                            break;
                        }
                        t._isFollowing() && t._followee().cancel(), t._setWillBeCancelled(), e = t, t = n;
                    }
                }, e.prototype._branchHasCancelled = function() {
                    this._branchesRemainingToCancel--;
                }, e.prototype._enoughBranchesHaveCancelled = function() {
                    return void 0 === this._branchesRemainingToCancel || this._branchesRemainingToCancel <= 0;
                }, e.prototype._cancelBy = function(t) {
                    return t === this ? (this._branchesRemainingToCancel = 0, this._invokeOnCancel(), 
                    !0) : (this._branchHasCancelled(), !!this._enoughBranchesHaveCancelled() && (this._invokeOnCancel(), 
                    !0));
                }, e.prototype._cancelBranched = function() {
                    this._enoughBranchesHaveCancelled() && this._cancel();
                }, e.prototype._cancel = function() {
                    this._isCancellable() && (this._setCancelled(), c.invoke(this._cancelPromises, this, void 0));
                }, e.prototype._cancelPromises = function() {
                    this._length() > 0 && this._settlePromises();
                }, e.prototype._unsetOnCancel = function() {
                    this._onCancelField = void 0;
                }, e.prototype._isCancellable = function() {
                    return this.isPending() && !this._isCancelled();
                }, e.prototype.isCancellable = function() {
                    return this.isPending() && !this.isCancelled();
                }, e.prototype._doInvokeOnCancel = function(t, e) {
                    if (o.isArray(t)) for (var n = 0; n < t.length; ++n) this._doInvokeOnCancel(t[n], e); else if (void 0 !== t) if ("function" == typeof t) {
                        if (!e) {
                            var r = s(t).call(this._boundValue());
                            r === a && (this._attachExtraTrace(r.e), c.throwLater(r.e));
                        }
                    } else t._resultCancelled(this);
                }, e.prototype._invokeOnCancel = function() {
                    var t = this._onCancel();
                    this._unsetOnCancel(), c.invoke(this._doInvokeOnCancel, this, t);
                }, e.prototype._invokeInternalOnCancel = function() {
                    this._isCancellable() && (this._doInvokeOnCancel(this._onCancel(), !0), this._unsetOnCancel());
                }, e.prototype._resultCancelled = function() {
                    this.cancel();
                };
            };
        }, {
            "./util": 36
        } ],
        7: [ function(t, e, n) {
            e.exports = function(e) {
                var n = t("./util"), r = t("./es5").keys, i = n.tryCatch, o = n.errorObj;
                return function(t, s, a) {
                    return function(c) {
                        var l = a._boundValue();
                        t: for (var u = 0; u < t.length; ++u) {
                            var p = t[u];
                            if (p === Error || null != p && p.prototype instanceof Error) {
                                if (c instanceof p) return i(s).call(l, c);
                            } else if ("function" == typeof p) {
                                var h = i(p).call(l, c);
                                if (h === o) return h;
                                if (h) return i(s).call(l, c);
                            } else if (n.isObject(c)) {
                                for (var f = r(p), _ = 0; _ < f.length; ++_) {
                                    var d = f[_];
                                    if (p[d] != c[d]) continue t;
                                }
                                return i(s).call(l, c);
                            }
                        }
                        return e;
                    };
                };
            };
        }, {
            "./es5": 13,
            "./util": 36
        } ],
        8: [ function(t, e, n) {
            e.exports = function(t) {
                function e() {
                    this._trace = new e.CapturedTrace(n());
                }
                function n() {
                    var t = i.length - 1;
                    if (t >= 0) return i[t];
                }
                var r = !1, i = [];
                return t.prototype._promiseCreated = function() {}, t.prototype._pushContext = function() {}, 
                t.prototype._popContext = function() {
                    return null;
                }, t._peekContext = t.prototype._peekContext = function() {}, e.prototype._pushContext = function() {
                    void 0 !== this._trace && (this._trace._promiseCreated = null, i.push(this._trace));
                }, e.prototype._popContext = function() {
                    if (void 0 !== this._trace) {
                        var t = i.pop(), e = t._promiseCreated;
                        return t._promiseCreated = null, e;
                    }
                    return null;
                }, e.CapturedTrace = null, e.create = function() {
                    if (r) return new e();
                }, e.deactivateLongStackTraces = function() {}, e.activateLongStackTraces = function() {
                    var i = t.prototype._pushContext, o = t.prototype._popContext, s = t._peekContext, a = t.prototype._peekContext, c = t.prototype._promiseCreated;
                    e.deactivateLongStackTraces = function() {
                        t.prototype._pushContext = i, t.prototype._popContext = o, t._peekContext = s, t.prototype._peekContext = a, 
                        t.prototype._promiseCreated = c, r = !1;
                    }, r = !0, t.prototype._pushContext = e.prototype._pushContext, t.prototype._popContext = e.prototype._popContext, 
                    t._peekContext = t.prototype._peekContext = n, t.prototype._promiseCreated = function() {
                        var t = this._peekContext();
                        t && null == t._promiseCreated && (t._promiseCreated = this);
                    };
                }, e;
            };
        }, {} ],
        9: [ function(e, n, r) {
            n.exports = function(n, r) {
                function i(t, e) {
                    return {
                        promise: e
                    };
                }
                function o() {
                    return !1;
                }
                function s(t, e, n) {
                    var r = this;
                    try {
                        t(e, n, function(t) {
                            if ("function" != typeof t) throw new TypeError("onCancel must be a function, got: " + V.toString(t));
                            r._attachCancellationCallback(t);
                        });
                    } catch (t) {
                        t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                        return t;
                    }
                }
                function a(t) {
                    if (!this._isCancellable()) return this;
                    var e = this._onCancel();
                    void 0 !== e ? V.isArray(e) ? e.push(t) : this._setOnCancel([ e, t ]) : this._setOnCancel(t);
                }
                function c() {
                    return this._onCancelField;
                }
                function l(t) {
                    this._onCancelField = t;
                }
                function u() {
                    this._cancellationParent = void 0, this._onCancelField = void 0;
                }
                function p(t, e) {
                    if (0 != (1 & e)) {
                        this._cancellationParent = t;
                        var n = t._branchesRemainingToCancel;
                        void 0 === n && (n = 0), t._branchesRemainingToCancel = n + 1;
                    }
                    0 != (2 & e) && t._isBound() && this._setBoundTo(t._boundTo);
                }
                function h() {
                    var t = this._boundTo;
                    return void 0 !== t && t instanceof n ? t.isFulfilled() ? t.value() : void 0 : t;
                }
                function f() {
                    this._trace = new T(this._peekContext());
                }
                function _(t, e) {
                    if (I(t)) {
                        var n = this._trace;
                        if (void 0 !== n && e && (n = n._parent), void 0 !== n) n.attachExtraTrace(t); else if (!t.__stackCleaned__) {
                            var r = w(t);
                            V.notEnumerableProp(t, "stack", r.message + "\n" + r.stack.join("\n")), V.notEnumerableProp(t, "__stackCleaned__", !0);
                        }
                    }
                }
                function d(t, e, r) {
                    if (nt.warnings) {
                        var i, o = new D(t);
                        if (e) r._attachExtraTrace(o); else if (nt.longStackTraces && (i = n._peekContext())) i.attachExtraTrace(o); else {
                            var s = w(o);
                            o.stack = s.message + "\n" + s.stack.join("\n");
                        }
                        J("warning", o) || C(o, "", !0);
                    }
                }
                function v(t, e) {
                    for (var n = 0; n < e.length - 1; ++n) e[n].push("From previous event:"), e[n] = e[n].join("\n");
                    return n < e.length && (e[n] = e[n].join("\n")), t + "\n" + e.join("\n");
                }
                function y(t) {
                    for (var e = 0; e < t.length; ++e) (0 === t[e].length || e + 1 < t.length && t[e][0] === t[e + 1][0]) && (t.splice(e, 1), 
                    e--);
                }
                function m(t) {
                    for (var e = t[0], n = 1; n < t.length; ++n) {
                        for (var r = t[n], i = e.length - 1, o = e[i], s = -1, a = r.length - 1; a >= 0; --a) if (r[a] === o) {
                            s = a;
                            break;
                        }
                        for (a = s; a >= 0; --a) {
                            var c = r[a];
                            if (e[i] !== c) break;
                            e.pop(), i--;
                        }
                        e = r;
                    }
                }
                function g(t) {
                    for (var e = [], n = 0; n < t.length; ++n) {
                        var r = t[n], i = "    (No stack trace)" === r || U.test(r), o = i && Z(r);
                        i && !o && (M && " " !== r.charAt(0) && (r = "    " + r), e.push(r));
                    }
                    return e;
                }
                function b(t) {
                    for (var e = t.stack.replace(/\s+$/g, "").split("\n"), n = 0; n < e.length; ++n) {
                        var r = e[n];
                        if ("    (No stack trace)" === r || U.test(r)) break;
                    }
                    return n > 0 && "SyntaxError" != t.name && (e = e.slice(n)), e;
                }
                function w(t) {
                    var e = t.stack, n = t.toString();
                    return e = "string" == typeof e && e.length > 0 ? b(t) : [ "    (No stack trace)" ], 
                    {
                        message: n,
                        stack: "SyntaxError" == t.name ? e : g(e)
                    };
                }
                function C(e, n, r) {
                    if ("undefined" != typeof console) {
                        var i;
                        if (V.isObject(e)) {
                            var o = e.stack;
                            i = n + B(o, e);
                        } else i = n + String(e);
                        "function" == typeof R ? R(i, r) : "function" != typeof console.log && "object" !== t(console.log) || console.log(i);
                    }
                }
                function j(t, e, n, r) {
                    var i = !1;
                    try {
                        "function" == typeof e && (i = !0, "rejectionHandled" === t ? e(r) : e(n, r));
                    } catch (t) {
                        t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                        A.throwLater(t);
                    }
                    "unhandledRejection" === t ? J(t, n, r) || i || C(n, "Unhandled rejection ") : J(t, r);
                }
                function k(t) {
                    var e;
                    if ("function" == typeof t) e = "[function " + (t.name || "anonymous") + "]"; else {
                        if (e = t && "function" == typeof t.toString ? t.toString() : V.toString(t), /\[object [a-zA-Z0-9$_]+\]/.test(e)) try {
                            e = JSON.stringify(t);
                        } catch (t) {}
                        0 === e.length && (e = "(empty array)");
                    }
                    return "(<" + E(e) + ">, no stack trace)";
                }
                function E(t) {
                    return t.length < 41 ? t : t.substr(0, 38) + "...";
                }
                function F() {
                    return "function" == typeof et;
                }
                function x(t) {
                    var e = t.match(tt);
                    if (e) return {
                        fileName: e[1],
                        line: parseInt(e[2], 10)
                    };
                }
                function T(t) {
                    this._parent = t, this._promisesCreated = 0;
                    var e = this._length = 1 + (void 0 === t ? 0 : t._length);
                    et(this, T), e > 32 && this.uncycle();
                }
                var P, S, R, O = n._getDomain, A = n._async, D = e("./errors").Warning, V = e("./util"), I = V.canAttachTrace, L = /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/, H = /\((?:timers\.js):\d+:\d+\)/, N = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/, U = null, B = null, M = !1, q = !(0 == V.env("BLUEBIRD_DEBUG")), Q = !(0 == V.env("BLUEBIRD_WARNINGS") || !q && !V.env("BLUEBIRD_WARNINGS")), $ = !(0 == V.env("BLUEBIRD_LONG_STACK_TRACES") || !q && !V.env("BLUEBIRD_LONG_STACK_TRACES")), z = 0 != V.env("BLUEBIRD_W_FORGOTTEN_RETURN") && (Q || !!V.env("BLUEBIRD_W_FORGOTTEN_RETURN"));
                n.prototype.suppressUnhandledRejections = function() {
                    var t = this._target();
                    t._bitField = -1048577 & t._bitField | 524288;
                }, n.prototype._ensurePossibleRejectionHandled = function() {
                    0 == (524288 & this._bitField) && (this._setRejectionIsUnhandled(), A.invokeLater(this._notifyUnhandledRejection, this, void 0));
                }, n.prototype._notifyUnhandledRejectionIsHandled = function() {
                    j("rejectionHandled", P, void 0, this);
                }, n.prototype._setReturnedNonUndefined = function() {
                    this._bitField = 268435456 | this._bitField;
                }, n.prototype._returnedNonUndefined = function() {
                    return 0 != (268435456 & this._bitField);
                }, n.prototype._notifyUnhandledRejection = function() {
                    if (this._isRejectionUnhandled()) {
                        var t = this._settledValue();
                        this._setUnhandledRejectionIsNotified(), j("unhandledRejection", S, t, this);
                    }
                }, n.prototype._setUnhandledRejectionIsNotified = function() {
                    this._bitField = 262144 | this._bitField;
                }, n.prototype._unsetUnhandledRejectionIsNotified = function() {
                    this._bitField = -262145 & this._bitField;
                }, n.prototype._isUnhandledRejectionNotified = function() {
                    return (262144 & this._bitField) > 0;
                }, n.prototype._setRejectionIsUnhandled = function() {
                    this._bitField = 1048576 | this._bitField;
                }, n.prototype._unsetRejectionIsUnhandled = function() {
                    this._bitField = -1048577 & this._bitField, this._isUnhandledRejectionNotified() && (this._unsetUnhandledRejectionIsNotified(), 
                    this._notifyUnhandledRejectionIsHandled());
                }, n.prototype._isRejectionUnhandled = function() {
                    return (1048576 & this._bitField) > 0;
                }, n.prototype._warn = function(t, e, n) {
                    return d(t, e, n || this);
                }, n.onPossiblyUnhandledRejection = function(t) {
                    var e = O();
                    S = "function" == typeof t ? null === e ? t : V.domainBind(e, t) : void 0;
                }, n.onUnhandledRejectionHandled = function(t) {
                    var e = O();
                    P = "function" == typeof t ? null === e ? t : V.domainBind(e, t) : void 0;
                };
                var G = function() {};
                n.longStackTraces = function() {
                    if (A.haveItemsQueued() && !nt.longStackTraces) throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
                    if (!nt.longStackTraces && F()) {
                        var t = n.prototype._captureStackTrace, e = n.prototype._attachExtraTrace;
                        nt.longStackTraces = !0, G = function() {
                            if (A.haveItemsQueued() && !nt.longStackTraces) throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
                            n.prototype._captureStackTrace = t, n.prototype._attachExtraTrace = e, r.deactivateLongStackTraces(), 
                            A.enableTrampoline(), nt.longStackTraces = !1;
                        }, n.prototype._captureStackTrace = f, n.prototype._attachExtraTrace = _, r.activateLongStackTraces(), 
                        A.disableTrampolineIfNecessary();
                    }
                }, n.hasLongStackTraces = function() {
                    return nt.longStackTraces && F();
                };
                var X = function() {
                    try {
                        if ("function" == typeof CustomEvent) {
                            t = new CustomEvent("CustomEvent");
                            return V.global.dispatchEvent(t), function(t, e) {
                                var n = new CustomEvent(t.toLowerCase(), {
                                    detail: e,
                                    cancelable: !0
                                });
                                return !V.global.dispatchEvent(n);
                            };
                        }
                        if ("function" == typeof Event) {
                            var t = new Event("CustomEvent");
                            return V.global.dispatchEvent(t), function(t, e) {
                                var n = new Event(t.toLowerCase(), {
                                    cancelable: !0
                                });
                                return n.detail = e, !V.global.dispatchEvent(n);
                            };
                        }
                        return (t = document.createEvent("CustomEvent")).initCustomEvent("testingtheevent", !1, !0, {}), 
                        V.global.dispatchEvent(t), function(t, e) {
                            var n = document.createEvent("CustomEvent");
                            return n.initCustomEvent(t.toLowerCase(), !1, !0, e), !V.global.dispatchEvent(n);
                        };
                    } catch (t) {}
                    return function() {
                        return !1;
                    };
                }(), W = V.isNode ? function() {
                    return process.emit.apply(process, arguments);
                } : V.global ? function(t) {
                    var e = "on" + t.toLowerCase(), n = V.global[e];
                    return !!n && (n.apply(V.global, [].slice.call(arguments, 1)), !0);
                } : function() {
                    return !1;
                }, K = {
                    promiseCreated: i,
                    promiseFulfilled: i,
                    promiseRejected: i,
                    promiseResolved: i,
                    promiseCancelled: i,
                    promiseChained: function(t, e, n) {
                        return {
                            promise: e,
                            child: n
                        };
                    },
                    warning: function(t, e) {
                        return {
                            warning: e
                        };
                    },
                    unhandledRejection: function(t, e, n) {
                        return {
                            reason: e,
                            promise: n
                        };
                    },
                    rejectionHandled: i
                }, J = function(t) {
                    var e = !1;
                    try {
                        e = W.apply(null, arguments);
                    } catch (t) {
                        t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                        A.throwLater(t), e = !0;
                    }
                    var n = !1;
                    try {
                        n = X(t, K[t].apply(null, arguments));
                    } catch (t) {
                        t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                        A.throwLater(t), n = !0;
                    }
                    return n || e;
                };
                n.config = function(t) {
                    if ("longStackTraces" in (t = Object(t)) && (t.longStackTraces ? n.longStackTraces() : !t.longStackTraces && n.hasLongStackTraces() && G()), 
                    "warnings" in t) {
                        var e = t.warnings;
                        nt.warnings = !!e, z = nt.warnings, V.isObject(e) && "wForgottenReturn" in e && (z = !!e.wForgottenReturn);
                    }
                    if ("cancellation" in t && t.cancellation && !nt.cancellation) {
                        if (A.haveItemsQueued()) throw new Error("cannot enable cancellation after promises are in use");
                        n.prototype._clearCancellationData = u, n.prototype._propagateFrom = p, n.prototype._onCancel = c, 
                        n.prototype._setOnCancel = l, n.prototype._attachCancellationCallback = a, n.prototype._execute = s, 
                        Y = p, nt.cancellation = !0;
                    }
                    return "monitoring" in t && (t.monitoring && !nt.monitoring ? (nt.monitoring = !0, 
                    n.prototype._fireEvent = J) : !t.monitoring && nt.monitoring && (nt.monitoring = !1, 
                    n.prototype._fireEvent = o)), n;
                }, n.prototype._fireEvent = o, n.prototype._execute = function(t, e, n) {
                    try {
                        t(e, n);
                    } catch (t) {
                        t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                        return t;
                    }
                }, n.prototype._onCancel = function() {}, n.prototype._setOnCancel = function(t) {}, 
                n.prototype._attachCancellationCallback = function(t) {}, n.prototype._captureStackTrace = function() {}, 
                n.prototype._attachExtraTrace = function() {}, n.prototype._clearCancellationData = function() {}, 
                n.prototype._propagateFrom = function(t, e) {};
                var Y = function(t, e) {
                    0 != (2 & e) && t._isBound() && this._setBoundTo(t._boundTo);
                }, Z = function() {
                    return !1;
                }, tt = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
                V.inherits(T, Error), r.CapturedTrace = T, T.prototype.uncycle = function() {
                    var t = this._length;
                    if (!(t < 2)) {
                        for (var e = [], n = {}, r = 0, i = this; void 0 !== i; ++r) e.push(i), i = i._parent;
                        for (r = (t = this._length = r) - 1; r >= 0; --r) {
                            var o = e[r].stack;
                            void 0 === n[o] && (n[o] = r);
                        }
                        for (r = 0; r < t; ++r) {
                            var s = n[e[r].stack];
                            if (void 0 !== s && s !== r) {
                                s > 0 && (e[s - 1]._parent = void 0, e[s - 1]._length = 1), e[r]._parent = void 0, 
                                e[r]._length = 1;
                                var a = r > 0 ? e[r - 1] : this;
                                s < t - 1 ? (a._parent = e[s + 1], a._parent.uncycle(), a._length = a._parent._length + 1) : (a._parent = void 0, 
                                a._length = 1);
                                for (var c = a._length + 1, l = r - 2; l >= 0; --l) e[l]._length = c, c++;
                                return;
                            }
                        }
                    }
                }, T.prototype.attachExtraTrace = function(t) {
                    if (!t.__stackCleaned__) {
                        this.uncycle();
                        for (var e = w(t), n = e.message, r = [ e.stack ], i = this; void 0 !== i; ) r.push(g(i.stack.split("\n"))), 
                        i = i._parent;
                        m(r), y(r), V.notEnumerableProp(t, "stack", v(n, r)), V.notEnumerableProp(t, "__stackCleaned__", !0);
                    }
                };
                var et = function() {
                    var e = /^\s*at\s*/, n = function(t, e) {
                        return "string" == typeof t ? t : void 0 !== e.name && void 0 !== e.message ? e.toString() : k(e);
                    };
                    if ("number" == typeof Error.stackTraceLimit && "function" == typeof Error.captureStackTrace) {
                        Error.stackTraceLimit += 6, U = e, B = n;
                        var r = Error.captureStackTrace;
                        return Z = function(t) {
                            return L.test(t);
                        }, function(t, e) {
                            Error.stackTraceLimit += 6, r(t, e), Error.stackTraceLimit -= 6;
                        };
                    }
                    var i = new Error();
                    if ("string" == typeof i.stack && i.stack.split("\n")[0].indexOf("stackDetection@") >= 0) return U = /@/, 
                    B = n, M = !0, function(t) {
                        t.stack = new Error().stack;
                    };
                    var o;
                    try {
                        throw new Error();
                    } catch (t) {
                        t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                        o = "stack" in t;
                    }
                    return "stack" in i || !o || "number" != typeof Error.stackTraceLimit ? (B = function(e, n) {
                        return "string" == typeof e ? e : "object" !== (void 0 === n ? "undefined" : t(n)) && "function" != typeof n || void 0 === n.name || void 0 === n.message ? k(n) : n.toString();
                    }, null) : (U = e, B = n, function(t) {
                        Error.stackTraceLimit += 6;
                        try {
                            throw new Error();
                        } catch (e) {
                            e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                            t.stack = e.stack;
                        }
                        Error.stackTraceLimit -= 6;
                    });
                }();
                "undefined" != typeof console && void 0 !== console.warn && (R = function(t) {
                    console.warn(t);
                }, V.isNode && process.stderr.isTTY ? R = function(t, e) {
                    var n = e ? "[33m" : "[31m";
                    console.warn(n + t + "[0m\n");
                } : V.isNode || "string" != typeof new Error().stack || (R = function(t, e) {
                    console.warn("%c" + t, e ? "color: darkorange" : "color: red");
                }));
                var nt = {
                    warnings: Q,
                    longStackTraces: !1,
                    cancellation: !1,
                    monitoring: !1
                };
                return $ && n.longStackTraces(), {
                    longStackTraces: function() {
                        return nt.longStackTraces;
                    },
                    warnings: function() {
                        return nt.warnings;
                    },
                    cancellation: function() {
                        return nt.cancellation;
                    },
                    monitoring: function() {
                        return nt.monitoring;
                    },
                    propagateFromFunction: function() {
                        return Y;
                    },
                    boundValueFunction: function() {
                        return h;
                    },
                    checkForgottenReturns: function(t, e, n, r, i) {
                        if (void 0 === t && null !== e && z) {
                            if (void 0 !== i && i._returnedNonUndefined()) return;
                            if (0 == (65535 & r._bitField)) return;
                            n && (n += " ");
                            var o = "", s = "";
                            if (e._trace) {
                                for (var a = e._trace.stack.split("\n"), c = g(a), l = c.length - 1; l >= 0; --l) {
                                    var u = c[l];
                                    if (!H.test(u)) {
                                        var p = u.match(N);
                                        p && (o = "at " + p[1] + ":" + p[2] + ":" + p[3] + " ");
                                        break;
                                    }
                                }
                                if (c.length > 0) for (var h = c[0], l = 0; l < a.length; ++l) if (a[l] === h) {
                                    l > 0 && (s = "\n" + a[l - 1]);
                                    break;
                                }
                            }
                            var f = "a promise was created in a " + n + "handler " + o + "but was not returned from it, see http://goo.gl/rRqMUw" + s;
                            r._warn(f, !0, e);
                        }
                    },
                    setBounds: function(t, e) {
                        if (F()) {
                            for (var n, r, i = t.stack.split("\n"), o = e.stack.split("\n"), s = -1, a = -1, c = 0; c < i.length; ++c) if (l = x(i[c])) {
                                n = l.fileName, s = l.line;
                                break;
                            }
                            for (c = 0; c < o.length; ++c) {
                                var l = x(o[c]);
                                if (l) {
                                    r = l.fileName, a = l.line;
                                    break;
                                }
                            }
                            s < 0 || a < 0 || !n || !r || n !== r || s >= a || (Z = function(t) {
                                if (L.test(t)) return !0;
                                var e = x(t);
                                return !!(e && e.fileName === n && s <= e.line && e.line <= a);
                            });
                        }
                    },
                    warn: d,
                    deprecated: function(t, e) {
                        var n = t + " is deprecated and will be removed in a future version.";
                        return e && (n += " Use " + e + " instead."), d(n);
                    },
                    CapturedTrace: T,
                    fireDomEvent: X,
                    fireGlobalEvent: W
                };
            };
        }, {
            "./errors": 12,
            "./util": 36
        } ],
        10: [ function(t, e, n) {
            e.exports = function(t) {
                function e() {
                    return this.value;
                }
                function n() {
                    throw this.reason;
                }
                t.prototype.return = t.prototype.thenReturn = function(n) {
                    return n instanceof t && n.suppressUnhandledRejections(), this._then(e, void 0, void 0, {
                        value: n
                    }, void 0);
                }, t.prototype.throw = t.prototype.thenThrow = function(t) {
                    return this._then(n, void 0, void 0, {
                        reason: t
                    }, void 0);
                }, t.prototype.catchThrow = function(t) {
                    if (arguments.length <= 1) return this._then(void 0, n, void 0, {
                        reason: t
                    }, void 0);
                    var e = arguments[1];
                    return this.caught(t, function() {
                        throw e;
                    });
                }, t.prototype.catchReturn = function(n) {
                    if (arguments.length <= 1) return n instanceof t && n.suppressUnhandledRejections(), 
                    this._then(void 0, e, void 0, {
                        value: n
                    }, void 0);
                    var r = arguments[1];
                    r instanceof t && r.suppressUnhandledRejections();
                    return this.caught(n, function() {
                        return r;
                    });
                };
            };
        }, {} ],
        11: [ function(t, e, n) {
            e.exports = function(t, e) {
                function n() {
                    return i(this);
                }
                var r = t.reduce, i = t.all;
                t.prototype.each = function(t) {
                    return r(this, t, e, 0)._then(n, void 0, void 0, this, void 0);
                }, t.prototype.mapSeries = function(t) {
                    return r(this, t, e, e);
                }, t.each = function(t, i) {
                    return r(t, i, e, 0)._then(n, void 0, void 0, t, void 0);
                }, t.mapSeries = function(t, n) {
                    return r(t, n, e, e);
                };
            };
        }, {} ],
        12: [ function(t, e, n) {
            function r(t, e) {
                function n(r) {
                    if (!(this instanceof n)) return new n(r);
                    p(this, "message", "string" == typeof r ? r : e), p(this, "name", t), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : Error.call(this);
                }
                return u(n, Error), n;
            }
            function i(t) {
                if (!(this instanceof i)) return new i(t);
                p(this, "name", "OperationalError"), p(this, "message", t), this.cause = t, this.isOperational = !0, 
                t instanceof Error ? (p(this, "message", t.message), p(this, "stack", t.stack)) : Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
            }
            var o, s, a = t("./es5"), c = a.freeze, l = t("./util"), u = l.inherits, p = l.notEnumerableProp, h = r("Warning", "warning"), f = r("CancellationError", "cancellation error"), _ = r("TimeoutError", "timeout error"), d = r("AggregateError", "aggregate error");
            try {
                o = TypeError, s = RangeError;
            } catch (t) {
                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                o = r("TypeError", "type error"), s = r("RangeError", "range error");
            }
            for (var v = "join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" "), y = 0; y < v.length; ++y) "function" == typeof Array.prototype[v[y]] && (d.prototype[v[y]] = Array.prototype[v[y]]);
            a.defineProperty(d.prototype, "length", {
                value: 0,
                configurable: !1,
                writable: !0,
                enumerable: !0
            }), d.prototype.isOperational = !0;
            var m = 0;
            d.prototype.toString = function() {
                var t = Array(4 * m + 1).join(" "), e = "\n" + t + "AggregateError of:\n";
                m++, t = Array(4 * m + 1).join(" ");
                for (var n = 0; n < this.length; ++n) {
                    for (var r = this[n] === this ? "[Circular AggregateError]" : this[n] + "", i = r.split("\n"), o = 0; o < i.length; ++o) i[o] = t + i[o];
                    e += (r = i.join("\n")) + "\n";
                }
                return m--, e;
            }, u(i, Error);
            var g = Error.__BluebirdErrorTypes__;
            g || (g = c({
                CancellationError: f,
                TimeoutError: _,
                OperationalError: i,
                RejectionError: i,
                AggregateError: d
            }), a.defineProperty(Error, "__BluebirdErrorTypes__", {
                value: g,
                writable: !1,
                enumerable: !1,
                configurable: !1
            })), e.exports = {
                Error: Error,
                TypeError: o,
                RangeError: s,
                CancellationError: g.CancellationError,
                OperationalError: g.OperationalError,
                TimeoutError: g.TimeoutError,
                AggregateError: g.AggregateError,
                Warning: h
            };
        }, {
            "./es5": 13,
            "./util": 36
        } ],
        13: [ function(t, e, n) {
            var r = function() {
                return void 0 === this;
            }();
            if (r) e.exports = {
                freeze: Object.freeze,
                defineProperty: Object.defineProperty,
                getDescriptor: Object.getOwnPropertyDescriptor,
                keys: Object.keys,
                names: Object.getOwnPropertyNames,
                getPrototypeOf: Object.getPrototypeOf,
                isArray: Array.isArray,
                isES5: r,
                propertyIsWritable: function(t, e) {
                    var n = Object.getOwnPropertyDescriptor(t, e);
                    return !(n && !n.writable && !n.set);
                }
            }; else {
                var i = {}.hasOwnProperty, o = {}.toString, s = {}.constructor.prototype, a = function(t) {
                    var e = [];
                    for (var n in t) i.call(t, n) && e.push(n);
                    return e;
                };
                e.exports = {
                    isArray: function(t) {
                        try {
                            return "[object Array]" === o.call(t);
                        } catch (t) {
                            t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                            return !1;
                        }
                    },
                    keys: a,
                    names: a,
                    defineProperty: function(t, e, n) {
                        return t[e] = n.value, t;
                    },
                    getDescriptor: function(t, e) {
                        return {
                            value: t[e]
                        };
                    },
                    freeze: function(t) {
                        return t;
                    },
                    getPrototypeOf: function(t) {
                        try {
                            return Object(t).constructor.prototype;
                        } catch (t) {
                            t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                            return s;
                        }
                    },
                    isES5: r,
                    propertyIsWritable: function() {
                        return !0;
                    }
                };
            }
        }, {} ],
        14: [ function(t, e, n) {
            e.exports = function(t, e) {
                var n = t.map;
                t.prototype.filter = function(t, r) {
                    return n(this, t, r, e);
                }, t.filter = function(t, r, i) {
                    return n(t, r, i, e);
                };
            };
        }, {} ],
        15: [ function(t, e, n) {
            e.exports = function(e, n, r) {
                function i(t, e, n) {
                    this.promise = t, this.type = e, this.handler = n, this.called = !1, this.cancelPromise = null;
                }
                function o(t) {
                    this.finallyHandler = t;
                }
                function s(t, e) {
                    return null != t.cancelPromise && (arguments.length > 1 ? t.cancelPromise._reject(e) : t.cancelPromise._cancel(), 
                    t.cancelPromise = null, !0);
                }
                function a() {
                    return l.call(this, this.promise._target()._settledValue());
                }
                function c(t) {
                    if (!s(this, t)) return h.e = t, h;
                }
                function l(t) {
                    var i = this.promise, l = this.handler;
                    if (!this.called) {
                        this.called = !0;
                        var u = this.isFinallyHandler() ? l.call(i._boundValue()) : l.call(i._boundValue(), t);
                        if (u === r) return u;
                        if (void 0 !== u) {
                            i._setReturnedNonUndefined();
                            var f = n(u, i);
                            if (f instanceof e) {
                                if (null != this.cancelPromise) {
                                    if (f._isCancelled()) {
                                        var _ = new p("late cancellation observer");
                                        return i._attachExtraTrace(_), h.e = _, h;
                                    }
                                    f.isPending() && f._attachCancellationCallback(new o(this));
                                }
                                return f._then(a, c, void 0, this, void 0);
                            }
                        }
                    }
                    return i.isRejected() ? (s(this), h.e = t, h) : (s(this), t);
                }
                var u = t("./util"), p = e.CancellationError, h = u.errorObj, f = t("./catch_filter")(r);
                return i.prototype.isFinallyHandler = function() {
                    return 0 === this.type;
                }, o.prototype._resultCancelled = function() {
                    s(this.finallyHandler);
                }, e.prototype._passThrough = function(t, e, n, r) {
                    return "function" != typeof t ? this.then() : this._then(n, r, void 0, new i(this, e, t), void 0);
                }, e.prototype.lastly = e.prototype.finally = function(t) {
                    return this._passThrough(t, 0, l, l);
                }, e.prototype.tap = function(t) {
                    return this._passThrough(t, 1, l);
                }, e.prototype.tapCatch = function(t) {
                    var n = arguments.length;
                    if (1 === n) return this._passThrough(t, 1, void 0, l);
                    var r, i = new Array(n - 1), o = 0;
                    for (r = 0; r < n - 1; ++r) {
                        var s = arguments[r];
                        if (!u.isObject(s)) return e.reject(new TypeError("tapCatch statement predicate: expecting an object but got " + u.classString(s)));
                        i[o++] = s;
                    }
                    i.length = o;
                    var a = arguments[r];
                    return this._passThrough(f(i, a, this), 1, void 0, l);
                }, i;
            };
        }, {
            "./catch_filter": 7,
            "./util": 36
        } ],
        16: [ function(t, e, n) {
            e.exports = function(e, n, r, i, o, s) {
                function a(t, n, r) {
                    for (var o = 0; o < n.length; ++o) {
                        r._pushContext();
                        var s = h(n[o])(t);
                        if (r._popContext(), s === p) {
                            r._pushContext();
                            var a = e.reject(p.e);
                            return r._popContext(), a;
                        }
                        var c = i(s, r);
                        if (c instanceof e) return c;
                    }
                    return null;
                }
                function c(t, n, i, o) {
                    if (s.cancellation()) {
                        var a = new e(r), c = this._finallyPromise = new e(r);
                        this._promise = a.lastly(function() {
                            return c;
                        }), a._captureStackTrace(), a._setOnCancel(this);
                    } else (this._promise = new e(r))._captureStackTrace();
                    this._stack = o, this._generatorFunction = t, this._receiver = n, this._generator = void 0, 
                    this._yieldHandlers = "function" == typeof i ? [ i ].concat(f) : f, this._yieldedPromise = null, 
                    this._cancellationPhase = !1;
                }
                var l = t("./errors").TypeError, u = t("./util"), p = u.errorObj, h = u.tryCatch, f = [];
                u.inherits(c, o), c.prototype._isResolved = function() {
                    return null === this._promise;
                }, c.prototype._cleanup = function() {
                    this._promise = this._generator = null, s.cancellation() && null !== this._finallyPromise && (this._finallyPromise._fulfill(), 
                    this._finallyPromise = null);
                }, c.prototype._promiseCancelled = function() {
                    if (!this._isResolved()) {
                        var t;
                        if (void 0 !== this._generator.return) this._promise._pushContext(), t = h(this._generator.return).call(this._generator, void 0), 
                        this._promise._popContext(); else {
                            var n = new e.CancellationError("generator .return() sentinel");
                            e.coroutine.returnSentinel = n, this._promise._attachExtraTrace(n), this._promise._pushContext(), 
                            t = h(this._generator.throw).call(this._generator, n), this._promise._popContext();
                        }
                        this._cancellationPhase = !0, this._yieldedPromise = null, this._continue(t);
                    }
                }, c.prototype._promiseFulfilled = function(t) {
                    this._yieldedPromise = null, this._promise._pushContext();
                    var e = h(this._generator.next).call(this._generator, t);
                    this._promise._popContext(), this._continue(e);
                }, c.prototype._promiseRejected = function(t) {
                    this._yieldedPromise = null, this._promise._attachExtraTrace(t), this._promise._pushContext();
                    var e = h(this._generator.throw).call(this._generator, t);
                    this._promise._popContext(), this._continue(e);
                }, c.prototype._resultCancelled = function() {
                    if (this._yieldedPromise instanceof e) {
                        var t = this._yieldedPromise;
                        this._yieldedPromise = null, t.cancel();
                    }
                }, c.prototype.promise = function() {
                    return this._promise;
                }, c.prototype._run = function() {
                    this._generator = this._generatorFunction.call(this._receiver), this._receiver = this._generatorFunction = void 0, 
                    this._promiseFulfilled(void 0);
                }, c.prototype._continue = function(t) {
                    var n = this._promise;
                    if (t === p) return this._cleanup(), this._cancellationPhase ? n.cancel() : n._rejectCallback(t.e, !1);
                    var r = t.value;
                    if (!0 === t.done) return this._cleanup(), this._cancellationPhase ? n.cancel() : n._resolveCallback(r);
                    var o = i(r, this._promise);
                    if (o instanceof e || null !== (o = a(o, this._yieldHandlers, this._promise))) {
                        var s = (o = o._target())._bitField;
                        0 == (50397184 & s) ? (this._yieldedPromise = o, o._proxy(this, null)) : 0 != (33554432 & s) ? e._async.invoke(this._promiseFulfilled, this, o._value()) : 0 != (16777216 & s) ? e._async.invoke(this._promiseRejected, this, o._reason()) : this._promiseCancelled();
                    } else this._promiseRejected(new l("A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/MqrFmX\n\n".replace("%s", String(r)) + "From coroutine:\n" + this._stack.split("\n").slice(1, -7).join("\n")));
                }, e.coroutine = function(t, e) {
                    if ("function" != typeof t) throw new l("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
                    var n = Object(e).yieldHandler, r = c, i = new Error().stack;
                    return function() {
                        var e = t.apply(this, arguments), o = new r(void 0, void 0, n, i), s = o.promise();
                        return o._generator = e, o._promiseFulfilled(void 0), s;
                    };
                }, e.coroutine.addYieldHandler = function(t) {
                    if ("function" != typeof t) throw new l("expecting a function but got " + u.classString(t));
                    f.push(t);
                }, e.spawn = function(t) {
                    if (s.deprecated("Promise.spawn()", "Promise.coroutine()"), "function" != typeof t) return n("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
                    var r = new c(t, this), i = r.promise();
                    return r._run(e.spawn), i;
                };
            };
        }, {
            "./errors": 12,
            "./util": 36
        } ],
        17: [ function(t, e, n) {
            e.exports = function(e, n, r, i, o, s) {
                var a = t("./util");
                a.canEvaluate, a.tryCatch, a.errorObj;
                e.join = function() {
                    var t, e = arguments.length - 1;
                    if (e > 0 && "function" == typeof arguments[e]) {
                        t = arguments[e];
                    }
                    var r = [].slice.call(arguments);
                    t && r.pop();
                    var i = new n(r).promise();
                    return void 0 !== t ? i.spread(t) : i;
                };
            };
        }, {
            "./util": 36
        } ],
        18: [ function(e, n, r) {
            n.exports = function(n, r, i, o, s, a) {
                function c(t, e, n, r) {
                    this.constructor$(t), this._promise._captureStackTrace();
                    var i = u();
                    this._callback = null === i ? e : p.domainBind(i, e), this._preservedValues = r === s ? new Array(this.length()) : null, 
                    this._limit = n, this._inFlight = 0, this._queue = [], _.invoke(this._asyncInit, this, void 0);
                }
                function l(e, r, o, s) {
                    if ("function" != typeof r) return i("expecting a function but got " + p.classString(r));
                    var a = 0;
                    if (void 0 !== o) {
                        if ("object" !== (void 0 === o ? "undefined" : t(o)) || null === o) return n.reject(new TypeError("options argument must be an object but it is " + p.classString(o)));
                        if ("number" != typeof o.concurrency) return n.reject(new TypeError("'concurrency' must be a number but it is " + p.classString(o.concurrency)));
                        a = o.concurrency;
                    }
                    return a = "number" == typeof a && isFinite(a) && a >= 1 ? a : 0, new c(e, r, a, s).promise();
                }
                var u = n._getDomain, p = e("./util"), h = p.tryCatch, f = p.errorObj, _ = n._async;
                p.inherits(c, r), c.prototype._asyncInit = function() {
                    this._init$(void 0, -2);
                }, c.prototype._init = function() {}, c.prototype._promiseFulfilled = function(t, e) {
                    var r = this._values, i = this.length(), s = this._preservedValues, c = this._limit;
                    if (e < 0) {
                        if (e = -1 * e - 1, r[e] = t, c >= 1 && (this._inFlight--, this._drainQueue(), this._isResolved())) return !0;
                    } else {
                        if (c >= 1 && this._inFlight >= c) return r[e] = t, this._queue.push(e), !1;
                        null !== s && (s[e] = t);
                        var l = this._promise, u = this._callback, p = l._boundValue();
                        l._pushContext();
                        var _ = h(u).call(p, t, e, i), d = l._popContext();
                        if (a.checkForgottenReturns(_, d, null !== s ? "Promise.filter" : "Promise.map", l), 
                        _ === f) return this._reject(_.e), !0;
                        var v = o(_, this._promise);
                        if (v instanceof n) {
                            var y = (v = v._target())._bitField;
                            if (0 == (50397184 & y)) return c >= 1 && this._inFlight++, r[e] = v, v._proxy(this, -1 * (e + 1)), 
                            !1;
                            if (0 == (33554432 & y)) return 0 != (16777216 & y) ? (this._reject(v._reason()), 
                            !0) : (this._cancel(), !0);
                            _ = v._value();
                        }
                        r[e] = _;
                    }
                    return ++this._totalResolved >= i && (null !== s ? this._filter(r, s) : this._resolve(r), 
                    !0);
                }, c.prototype._drainQueue = function() {
                    for (var t = this._queue, e = this._limit, n = this._values; t.length > 0 && this._inFlight < e; ) {
                        if (this._isResolved()) return;
                        var r = t.pop();
                        this._promiseFulfilled(n[r], r);
                    }
                }, c.prototype._filter = function(t, e) {
                    for (var n = e.length, r = new Array(n), i = 0, o = 0; o < n; ++o) t[o] && (r[i++] = e[o]);
                    r.length = i, this._resolve(r);
                }, c.prototype.preservedValues = function() {
                    return this._preservedValues;
                }, n.prototype.map = function(t, e) {
                    return l(this, t, e, null);
                }, n.map = function(t, e, n, r) {
                    return l(t, e, n, r);
                };
            };
        }, {
            "./util": 36
        } ],
        19: [ function(t, e, n) {
            e.exports = function(e, n, r, i, o) {
                var s = t("./util"), a = s.tryCatch;
                e.method = function(t) {
                    if ("function" != typeof t) throw new e.TypeError("expecting a function but got " + s.classString(t));
                    return function() {
                        var r = new e(n);
                        r._captureStackTrace(), r._pushContext();
                        var i = a(t).apply(this, arguments), s = r._popContext();
                        return o.checkForgottenReturns(i, s, "Promise.method", r), r._resolveFromSyncValue(i), 
                        r;
                    };
                }, e.attempt = e.try = function(t) {
                    if ("function" != typeof t) return i("expecting a function but got " + s.classString(t));
                    var r = new e(n);
                    r._captureStackTrace(), r._pushContext();
                    var c;
                    if (arguments.length > 1) {
                        o.deprecated("calling Promise.try with more than 1 argument");
                        var l = arguments[1], u = arguments[2];
                        c = s.isArray(l) ? a(t).apply(u, l) : a(t).call(u, l);
                    } else c = a(t)();
                    var p = r._popContext();
                    return o.checkForgottenReturns(c, p, "Promise.try", r), r._resolveFromSyncValue(c), 
                    r;
                }, e.prototype._resolveFromSyncValue = function(t) {
                    t === s.errorObj ? this._rejectCallback(t.e, !1) : this._resolveCallback(t, !0);
                };
            };
        }, {
            "./util": 36
        } ],
        20: [ function(t, e, n) {
            function r(t) {
                return t instanceof Error && c.getPrototypeOf(t) === Error.prototype;
            }
            function i(t) {
                var e;
                if (r(t)) {
                    (e = new a(t)).name = t.name, e.message = t.message, e.stack = t.stack;
                    for (var n = c.keys(t), i = 0; i < n.length; ++i) {
                        var s = n[i];
                        l.test(s) || (e[s] = t[s]);
                    }
                    return e;
                }
                return o.markAsOriginatingFromRejection(t), t;
            }
            var o = t("./util"), s = o.maybeWrapAsError, a = t("./errors").OperationalError, c = t("./es5"), l = /^(?:name|message|stack|cause)$/;
            e.exports = function(t, e) {
                return function(n, r) {
                    if (null !== t) {
                        if (n) {
                            var o = i(s(n));
                            t._attachExtraTrace(o), t._reject(o);
                        } else if (e) {
                            var a = [].slice.call(arguments, 1);
                            t._fulfill(a);
                        } else t._fulfill(r);
                        t = null;
                    }
                };
            };
        }, {
            "./errors": 12,
            "./es5": 13,
            "./util": 36
        } ],
        21: [ function(t, e, n) {
            e.exports = function(e) {
                function n(t, e) {
                    var n = this;
                    if (!o.isArray(t)) return r.call(n, t, e);
                    var i = a(e).apply(n._boundValue(), [ null ].concat(t));
                    i === c && s.throwLater(i.e);
                }
                function r(t, e) {
                    var n = this._boundValue(), r = void 0 === t ? a(e).call(n, null) : a(e).call(n, null, t);
                    r === c && s.throwLater(r.e);
                }
                function i(t, e) {
                    var n = this;
                    if (!t) {
                        var r = new Error(t + "");
                        r.cause = t, t = r;
                    }
                    var i = a(e).call(n._boundValue(), t);
                    i === c && s.throwLater(i.e);
                }
                var o = t("./util"), s = e._async, a = o.tryCatch, c = o.errorObj;
                e.prototype.asCallback = e.prototype.nodeify = function(t, e) {
                    if ("function" == typeof t) {
                        var o = r;
                        void 0 !== e && Object(e).spread && (o = n), this._then(o, i, void 0, this, t);
                    }
                    return this;
                };
            };
        }, {
            "./util": 36
        } ],
        22: [ function(t, e, n) {
            e.exports = function() {
                function n() {}
                function r(t, e) {
                    if (null == t || t.constructor !== i) throw new m("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n");
                    if ("function" != typeof e) throw new m("expecting a function but got " + f.classString(e));
                }
                function i(t) {
                    t !== b && r(this, t), this._bitField = 0, this._fulfillmentHandler0 = void 0, this._rejectionHandler0 = void 0, 
                    this._promise0 = void 0, this._receiver0 = void 0, this._resolveFromExecutor(t), 
                    this._promiseCreated(), this._fireEvent("promiseCreated", this);
                }
                function o(t) {
                    this.promise._resolveCallback(t);
                }
                function s(t) {
                    this.promise._rejectCallback(t, !1);
                }
                function a(t) {
                    var e = new i(b);
                    e._fulfillmentHandler0 = t, e._rejectionHandler0 = t, e._promise0 = t, e._receiver0 = t;
                }
                var c, l = function() {
                    return new m("circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n");
                }, u = function() {
                    return new i.PromiseInspection(this._target());
                }, p = function(t) {
                    return i.reject(new m(t));
                }, h = {}, f = t("./util");
                c = f.isNode ? function() {
                    var t = process.domain;
                    return void 0 === t && (t = null), t;
                } : function() {
                    return null;
                }, f.notEnumerableProp(i, "_getDomain", c);
                var _ = t("./es5"), d = t("./async"), v = new d();
                _.defineProperty(i, "_async", {
                    value: v
                });
                var y = t("./errors"), m = i.TypeError = y.TypeError;
                i.RangeError = y.RangeError;
                var g = i.CancellationError = y.CancellationError;
                i.TimeoutError = y.TimeoutError, i.OperationalError = y.OperationalError, i.RejectionError = y.OperationalError, 
                i.AggregateError = y.AggregateError;
                var b = function() {}, w = {}, C = {}, j = t("./thenables")(i, b), k = t("./promise_array")(i, b, j, p, n), E = t("./context")(i), F = E.create, x = t("./debuggability")(i, E), T = (x.CapturedTrace, 
                t("./finally")(i, j, C)), P = t("./catch_filter")(C), S = t("./nodeback"), R = f.errorObj, O = f.tryCatch;
                return i.prototype.toString = function() {
                    return "[object Promise]";
                }, i.prototype.caught = i.prototype.catch = function(t) {
                    var e = arguments.length;
                    if (e > 1) {
                        var n, r = new Array(e - 1), i = 0;
                        for (n = 0; n < e - 1; ++n) {
                            var o = arguments[n];
                            if (!f.isObject(o)) return p("Catch statement predicate: expecting an object but got " + f.classString(o));
                            r[i++] = o;
                        }
                        return r.length = i, t = arguments[n], this.then(void 0, P(r, t, this));
                    }
                    return this.then(void 0, t);
                }, i.prototype.reflect = function() {
                    return this._then(u, u, void 0, this, void 0);
                }, i.prototype.then = function(t, e) {
                    if (x.warnings() && arguments.length > 0 && "function" != typeof t && "function" != typeof e) {
                        var n = ".then() only accepts functions but was passed: " + f.classString(t);
                        arguments.length > 1 && (n += ", " + f.classString(e)), this._warn(n);
                    }
                    return this._then(t, e, void 0, void 0, void 0);
                }, i.prototype.done = function(t, e) {
                    this._then(t, e, void 0, void 0, void 0)._setIsFinal();
                }, i.prototype.spread = function(t) {
                    return "function" != typeof t ? p("expecting a function but got " + f.classString(t)) : this.all()._then(t, void 0, void 0, w, void 0);
                }, i.prototype.toJSON = function() {
                    var t = {
                        isFulfilled: !1,
                        isRejected: !1,
                        fulfillmentValue: void 0,
                        rejectionReason: void 0
                    };
                    return this.isFulfilled() ? (t.fulfillmentValue = this.value(), t.isFulfilled = !0) : this.isRejected() && (t.rejectionReason = this.reason(), 
                    t.isRejected = !0), t;
                }, i.prototype.all = function() {
                    return arguments.length > 0 && this._warn(".all() was passed arguments but it does not take any"), 
                    new k(this).promise();
                }, i.prototype.error = function(t) {
                    return this.caught(f.originatesFromRejection, t);
                }, i.getNewLibraryCopy = e.exports, i.is = function(t) {
                    return t instanceof i;
                }, i.fromNode = i.fromCallback = function(t) {
                    var e = new i(b);
                    e._captureStackTrace();
                    var n = arguments.length > 1 && !!Object(arguments[1]).multiArgs, r = O(t)(S(e, n));
                    return r === R && e._rejectCallback(r.e, !0), e._isFateSealed() || e._setAsyncGuaranteed(), 
                    e;
                }, i.all = function(t) {
                    return new k(t).promise();
                }, i.cast = function(t) {
                    var e = j(t);
                    return e instanceof i || ((e = new i(b))._captureStackTrace(), e._setFulfilled(), 
                    e._rejectionHandler0 = t), e;
                }, i.resolve = i.fulfilled = i.cast, i.reject = i.rejected = function(t) {
                    var e = new i(b);
                    return e._captureStackTrace(), e._rejectCallback(t, !0), e;
                }, i.setScheduler = function(t) {
                    if ("function" != typeof t) throw new m("expecting a function but got " + f.classString(t));
                    return v.setScheduler(t);
                }, i.prototype._then = function(t, e, n, r, o) {
                    var s = void 0 !== o, a = s ? o : new i(b), l = this._target(), u = l._bitField;
                    s || (a._propagateFrom(this, 3), a._captureStackTrace(), void 0 === r && 0 != (2097152 & this._bitField) && (r = 0 != (50397184 & u) ? this._boundValue() : l === this ? void 0 : this._boundTo), 
                    this._fireEvent("promiseChained", this, a));
                    var p = c();
                    if (0 != (50397184 & u)) {
                        var h, _, d = l._settlePromiseCtx;
                        0 != (33554432 & u) ? (_ = l._rejectionHandler0, h = t) : 0 != (16777216 & u) ? (_ = l._fulfillmentHandler0, 
                        h = e, l._unsetRejectionIsUnhandled()) : (d = l._settlePromiseLateCancellationObserver, 
                        _ = new g("late cancellation observer"), l._attachExtraTrace(_), h = e), v.invoke(d, l, {
                            handler: null === p ? h : "function" == typeof h && f.domainBind(p, h),
                            promise: a,
                            receiver: r,
                            value: _
                        });
                    } else l._addCallbacks(t, e, a, r, p);
                    return a;
                }, i.prototype._length = function() {
                    return 65535 & this._bitField;
                }, i.prototype._isFateSealed = function() {
                    return 0 != (117506048 & this._bitField);
                }, i.prototype._isFollowing = function() {
                    return 67108864 == (67108864 & this._bitField);
                }, i.prototype._setLength = function(t) {
                    this._bitField = -65536 & this._bitField | 65535 & t;
                }, i.prototype._setFulfilled = function() {
                    this._bitField = 33554432 | this._bitField, this._fireEvent("promiseFulfilled", this);
                }, i.prototype._setRejected = function() {
                    this._bitField = 16777216 | this._bitField, this._fireEvent("promiseRejected", this);
                }, i.prototype._setFollowing = function() {
                    this._bitField = 67108864 | this._bitField, this._fireEvent("promiseResolved", this);
                }, i.prototype._setIsFinal = function() {
                    this._bitField = 4194304 | this._bitField;
                }, i.prototype._isFinal = function() {
                    return (4194304 & this._bitField) > 0;
                }, i.prototype._unsetCancelled = function() {
                    this._bitField = -65537 & this._bitField;
                }, i.prototype._setCancelled = function() {
                    this._bitField = 65536 | this._bitField, this._fireEvent("promiseCancelled", this);
                }, i.prototype._setWillBeCancelled = function() {
                    this._bitField = 8388608 | this._bitField;
                }, i.prototype._setAsyncGuaranteed = function() {
                    v.hasCustomScheduler() || (this._bitField = 134217728 | this._bitField);
                }, i.prototype._receiverAt = function(t) {
                    var e = 0 === t ? this._receiver0 : this[4 * t - 4 + 3];
                    if (e !== h) return void 0 === e && this._isBound() ? this._boundValue() : e;
                }, i.prototype._promiseAt = function(t) {
                    return this[4 * t - 4 + 2];
                }, i.prototype._fulfillmentHandlerAt = function(t) {
                    return this[4 * t - 4 + 0];
                }, i.prototype._rejectionHandlerAt = function(t) {
                    return this[4 * t - 4 + 1];
                }, i.prototype._boundValue = function() {}, i.prototype._migrateCallback0 = function(t) {
                    t._bitField;
                    var e = t._fulfillmentHandler0, n = t._rejectionHandler0, r = t._promise0, i = t._receiverAt(0);
                    void 0 === i && (i = h), this._addCallbacks(e, n, r, i, null);
                }, i.prototype._migrateCallbackAt = function(t, e) {
                    var n = t._fulfillmentHandlerAt(e), r = t._rejectionHandlerAt(e), i = t._promiseAt(e), o = t._receiverAt(e);
                    void 0 === o && (o = h), this._addCallbacks(n, r, i, o, null);
                }, i.prototype._addCallbacks = function(t, e, n, r, i) {
                    var o = this._length();
                    if (o >= 65531 && (o = 0, this._setLength(0)), 0 === o) this._promise0 = n, this._receiver0 = r, 
                    "function" == typeof t && (this._fulfillmentHandler0 = null === i ? t : f.domainBind(i, t)), 
                    "function" == typeof e && (this._rejectionHandler0 = null === i ? e : f.domainBind(i, e)); else {
                        var s = 4 * o - 4;
                        this[s + 2] = n, this[s + 3] = r, "function" == typeof t && (this[s + 0] = null === i ? t : f.domainBind(i, t)), 
                        "function" == typeof e && (this[s + 1] = null === i ? e : f.domainBind(i, e));
                    }
                    return this._setLength(o + 1), o;
                }, i.prototype._proxy = function(t, e) {
                    this._addCallbacks(void 0, void 0, e, t, null);
                }, i.prototype._resolveCallback = function(t, e) {
                    if (0 == (117506048 & this._bitField)) {
                        if (t === this) return this._rejectCallback(l(), !1);
                        var n = j(t, this);
                        if (!(n instanceof i)) return this._fulfill(t);
                        e && this._propagateFrom(n, 2);
                        var r = n._target();
                        if (r !== this) {
                            var o = r._bitField;
                            if (0 == (50397184 & o)) {
                                var s = this._length();
                                s > 0 && r._migrateCallback0(this);
                                for (var a = 1; a < s; ++a) r._migrateCallbackAt(this, a);
                                this._setFollowing(), this._setLength(0), this._setFollowee(r);
                            } else if (0 != (33554432 & o)) this._fulfill(r._value()); else if (0 != (16777216 & o)) this._reject(r._reason()); else {
                                var c = new g("late cancellation observer");
                                r._attachExtraTrace(c), this._reject(c);
                            }
                        } else this._reject(l());
                    }
                }, i.prototype._rejectCallback = function(t, e, n) {
                    var r = f.ensureErrorObject(t), i = r === t;
                    if (!i && !n && x.warnings()) {
                        var o = "a promise was rejected with a non-error: " + f.classString(t);
                        this._warn(o, !0);
                    }
                    this._attachExtraTrace(r, !!e && i), this._reject(t);
                }, i.prototype._resolveFromExecutor = function(t) {
                    if (t !== b) {
                        var e = this;
                        this._captureStackTrace(), this._pushContext();
                        var n = !0, r = this._execute(t, function(t) {
                            e._resolveCallback(t);
                        }, function(t) {
                            e._rejectCallback(t, n);
                        });
                        n = !1, this._popContext(), void 0 !== r && e._rejectCallback(r, !0);
                    }
                }, i.prototype._settlePromiseFromHandler = function(t, e, n, r) {
                    var i = r._bitField;
                    if (0 == (65536 & i)) {
                        r._pushContext();
                        var o;
                        e === w ? n && "number" == typeof n.length ? o = O(t).apply(this._boundValue(), n) : (o = R).e = new m("cannot .spread() a non-array: " + f.classString(n)) : o = O(t).call(e, n);
                        var s = r._popContext();
                        0 == (65536 & (i = r._bitField)) && (o === C ? r._reject(n) : o === R ? r._rejectCallback(o.e, !1) : (x.checkForgottenReturns(o, s, "", r, this), 
                        r._resolveCallback(o)));
                    }
                }, i.prototype._target = function() {
                    for (var t = this; t._isFollowing(); ) t = t._followee();
                    return t;
                }, i.prototype._followee = function() {
                    return this._rejectionHandler0;
                }, i.prototype._setFollowee = function(t) {
                    this._rejectionHandler0 = t;
                }, i.prototype._settlePromise = function(t, e, r, o) {
                    var s = t instanceof i, a = this._bitField, c = 0 != (134217728 & a);
                    0 != (65536 & a) ? (s && t._invokeInternalOnCancel(), r instanceof T && r.isFinallyHandler() ? (r.cancelPromise = t, 
                    O(e).call(r, o) === R && t._reject(R.e)) : e === u ? t._fulfill(u.call(r)) : r instanceof n ? r._promiseCancelled(t) : s || t instanceof k ? t._cancel() : r.cancel()) : "function" == typeof e ? s ? (c && t._setAsyncGuaranteed(), 
                    this._settlePromiseFromHandler(e, r, o, t)) : e.call(r, o, t) : r instanceof n ? r._isResolved() || (0 != (33554432 & a) ? r._promiseFulfilled(o, t) : r._promiseRejected(o, t)) : s && (c && t._setAsyncGuaranteed(), 
                    0 != (33554432 & a) ? t._fulfill(o) : t._reject(o));
                }, i.prototype._settlePromiseLateCancellationObserver = function(t) {
                    var e = t.handler, n = t.promise, r = t.receiver, o = t.value;
                    "function" == typeof e ? n instanceof i ? this._settlePromiseFromHandler(e, r, o, n) : e.call(r, o, n) : n instanceof i && n._reject(o);
                }, i.prototype._settlePromiseCtx = function(t) {
                    this._settlePromise(t.promise, t.handler, t.receiver, t.value);
                }, i.prototype._settlePromise0 = function(t, e, n) {
                    var r = this._promise0, i = this._receiverAt(0);
                    this._promise0 = void 0, this._receiver0 = void 0, this._settlePromise(r, t, i, e);
                }, i.prototype._clearCallbackDataAtIndex = function(t) {
                    var e = 4 * t - 4;
                    this[e + 2] = this[e + 3] = this[e + 0] = this[e + 1] = void 0;
                }, i.prototype._fulfill = function(t) {
                    var e = this._bitField;
                    if (!((117506048 & e) >>> 16)) {
                        if (t === this) {
                            var n = l();
                            return this._attachExtraTrace(n), this._reject(n);
                        }
                        this._setFulfilled(), this._rejectionHandler0 = t, (65535 & e) > 0 && (0 != (134217728 & e) ? this._settlePromises() : v.settlePromises(this));
                    }
                }, i.prototype._reject = function(t) {
                    var e = this._bitField;
                    if (!((117506048 & e) >>> 16)) {
                        if (this._setRejected(), this._fulfillmentHandler0 = t, this._isFinal()) return v.fatalError(t, f.isNode);
                        (65535 & e) > 0 ? v.settlePromises(this) : this._ensurePossibleRejectionHandled();
                    }
                }, i.prototype._fulfillPromises = function(t, e) {
                    for (var n = 1; n < t; n++) {
                        var r = this._fulfillmentHandlerAt(n), i = this._promiseAt(n), o = this._receiverAt(n);
                        this._clearCallbackDataAtIndex(n), this._settlePromise(i, r, o, e);
                    }
                }, i.prototype._rejectPromises = function(t, e) {
                    for (var n = 1; n < t; n++) {
                        var r = this._rejectionHandlerAt(n), i = this._promiseAt(n), o = this._receiverAt(n);
                        this._clearCallbackDataAtIndex(n), this._settlePromise(i, r, o, e);
                    }
                }, i.prototype._settlePromises = function() {
                    var t = this._bitField, e = 65535 & t;
                    if (e > 0) {
                        if (0 != (16842752 & t)) {
                            var n = this._fulfillmentHandler0;
                            this._settlePromise0(this._rejectionHandler0, n, t), this._rejectPromises(e, n);
                        } else {
                            var r = this._rejectionHandler0;
                            this._settlePromise0(this._fulfillmentHandler0, r, t), this._fulfillPromises(e, r);
                        }
                        this._setLength(0);
                    }
                    this._clearCancellationData();
                }, i.prototype._settledValue = function() {
                    var t = this._bitField;
                    return 0 != (33554432 & t) ? this._rejectionHandler0 : 0 != (16777216 & t) ? this._fulfillmentHandler0 : void 0;
                }, i.defer = i.pending = function() {
                    return x.deprecated("Promise.defer", "new Promise"), {
                        promise: new i(b),
                        resolve: o,
                        reject: s
                    };
                }, f.notEnumerableProp(i, "_makeSelfResolutionError", l), t("./method")(i, b, j, p, x), 
                t("./bind")(i, b, j, x), t("./cancel")(i, k, p, x), t("./direct_resolve")(i), t("./synchronous_inspection")(i), 
                t("./join")(i, k, j, b, v, c), i.Promise = i, i.version = "3.5.0", t("./map.js")(i, k, p, j, b, x), 
                t("./call_get.js")(i), t("./using.js")(i, p, j, F, b, x), t("./timers.js")(i, b, x), 
                t("./generators.js")(i, p, b, j, n, x), t("./nodeify.js")(i), t("./promisify.js")(i, b), 
                t("./props.js")(i, k, j, p), t("./race.js")(i, b, j, p), t("./reduce.js")(i, k, p, j, b, x), 
                t("./settle.js")(i, k, x), t("./some.js")(i, k, p), t("./filter.js")(i, b), t("./each.js")(i, b), 
                t("./any.js")(i), f.toFastProperties(i), f.toFastProperties(i.prototype), a({
                    a: 1
                }), a({
                    b: 2
                }), a({
                    c: 3
                }), a(1), a(function() {}), a(void 0), a(!1), a(new i(b)), x.setBounds(d.firstLineError, f.lastLineError), 
                i;
            };
        }, {
            "./any.js": 1,
            "./async": 2,
            "./bind": 3,
            "./call_get.js": 5,
            "./cancel": 6,
            "./catch_filter": 7,
            "./context": 8,
            "./debuggability": 9,
            "./direct_resolve": 10,
            "./each.js": 11,
            "./errors": 12,
            "./es5": 13,
            "./filter.js": 14,
            "./finally": 15,
            "./generators.js": 16,
            "./join": 17,
            "./map.js": 18,
            "./method": 19,
            "./nodeback": 20,
            "./nodeify.js": 21,
            "./promise_array": 23,
            "./promisify.js": 24,
            "./props.js": 25,
            "./race.js": 27,
            "./reduce.js": 28,
            "./settle.js": 30,
            "./some.js": 31,
            "./synchronous_inspection": 32,
            "./thenables": 33,
            "./timers.js": 34,
            "./using.js": 35,
            "./util": 36
        } ],
        23: [ function(t, e, n) {
            e.exports = function(e, n, r, i, o) {
                function s(t) {
                    switch (t) {
                      case -2:
                        return [];

                      case -3:
                        return {};

                      case -6:
                        return new Map();
                    }
                }
                function a(t) {
                    var r = this._promise = new e(n);
                    t instanceof e && r._propagateFrom(t, 3), r._setOnCancel(this), this._values = t, 
                    this._length = 0, this._totalResolved = 0, this._init(void 0, -2);
                }
                var c = t("./util");
                c.isArray;
                return c.inherits(a, o), a.prototype.length = function() {
                    return this._length;
                }, a.prototype.promise = function() {
                    return this._promise;
                }, a.prototype._init = function t(n, o) {
                    var a = r(this._values, this._promise);
                    if (a instanceof e) {
                        var l = (a = a._target())._bitField;
                        if (this._values = a, 0 == (50397184 & l)) return this._promise._setAsyncGuaranteed(), 
                        a._then(t, this._reject, void 0, this, o);
                        if (0 == (33554432 & l)) return 0 != (16777216 & l) ? this._reject(a._reason()) : this._cancel();
                        a = a._value();
                    }
                    if (null !== (a = c.asArray(a))) 0 !== a.length ? this._iterate(a) : -5 === o ? this._resolveEmptyArray() : this._resolve(s(o)); else {
                        var u = i("expecting an array or an iterable object but got " + c.classString(a)).reason();
                        this._promise._rejectCallback(u, !1);
                    }
                }, a.prototype._iterate = function(t) {
                    var n = this.getActualLength(t.length);
                    this._length = n, this._values = this.shouldCopyValues() ? new Array(n) : this._values;
                    for (var i = this._promise, o = !1, s = null, a = 0; a < n; ++a) {
                        var c = r(t[a], i);
                        s = c instanceof e ? (c = c._target())._bitField : null, o ? null !== s && c.suppressUnhandledRejections() : null !== s ? 0 == (50397184 & s) ? (c._proxy(this, a), 
                        this._values[a] = c) : o = 0 != (33554432 & s) ? this._promiseFulfilled(c._value(), a) : 0 != (16777216 & s) ? this._promiseRejected(c._reason(), a) : this._promiseCancelled(a) : o = this._promiseFulfilled(c, a);
                    }
                    o || i._setAsyncGuaranteed();
                }, a.prototype._isResolved = function() {
                    return null === this._values;
                }, a.prototype._resolve = function(t) {
                    this._values = null, this._promise._fulfill(t);
                }, a.prototype._cancel = function() {
                    !this._isResolved() && this._promise._isCancellable() && (this._values = null, this._promise._cancel());
                }, a.prototype._reject = function(t) {
                    this._values = null, this._promise._rejectCallback(t, !1);
                }, a.prototype._promiseFulfilled = function(t, e) {
                    return this._values[e] = t, ++this._totalResolved >= this._length && (this._resolve(this._values), 
                    !0);
                }, a.prototype._promiseCancelled = function() {
                    return this._cancel(), !0;
                }, a.prototype._promiseRejected = function(t) {
                    return this._totalResolved++, this._reject(t), !0;
                }, a.prototype._resultCancelled = function() {
                    if (!this._isResolved()) {
                        var t = this._values;
                        if (this._cancel(), t instanceof e) t.cancel(); else for (var n = 0; n < t.length; ++n) t[n] instanceof e && t[n].cancel();
                    }
                }, a.prototype.shouldCopyValues = function() {
                    return !0;
                }, a.prototype.getActualLength = function(t) {
                    return t;
                }, a;
            };
        }, {
            "./util": 36
        } ],
        24: [ function(e, n, r) {
            n.exports = function(n, r) {
                function i(t) {
                    return !w.test(t);
                }
                function o(t) {
                    try {
                        return !0 === t.__isPromisified__;
                    } catch (t) {
                        t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                        return !1;
                    }
                }
                function s(t, e, n) {
                    var r = f.getDataPropertyOrDefault(t, e + n, g);
                    return !!r && o(r);
                }
                function a(t, e, n) {
                    for (var r = 0; r < t.length; r += 2) {
                        var i = t[r];
                        if (n.test(i)) for (var o = i.replace(n, ""), s = 0; s < t.length; s += 2) if (t[s] === o) throw new m("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/MqrFmX\n".replace("%s", e));
                    }
                }
                function c(t, e, n, r) {
                    for (var i = f.inheritedDataKeys(t), c = [], l = 0; l < i.length; ++l) {
                        var u = i[l], p = t[u], h = r === C || C(u, p, t);
                        "function" != typeof p || o(p) || s(t, u, e) || !r(u, p, t, h) || c.push(u, p);
                    }
                    return a(c, e, n), c;
                }
                function l(t, e, n, r, i) {
                    for (var o = new RegExp(j(e) + "$"), s = c(t, e, o, n), a = 0, l = s.length; a < l; a += 2) {
                        var u = s[a], p = s[a + 1], _ = u + e;
                        if (r === k) t[_] = k(u, h, u, p, e, i); else {
                            var d = r(p, function() {
                                return k(u, h, u, p, e, i);
                            });
                            f.notEnumerableProp(d, "__isPromisified__", !0), t[_] = d;
                        }
                    }
                    return f.toFastProperties(t), t;
                }
                function u(t, e, n) {
                    return k(t, e, void 0, t, null, n);
                }
                var p, h = {}, f = e("./util"), _ = e("./nodeback"), d = f.withAppended, v = f.maybeWrapAsError, y = f.canEvaluate, m = e("./errors").TypeError, g = {
                    __isPromisified__: !0
                }, b = [ "arity", "length", "name", "arguments", "caller", "callee", "prototype", "__isPromisified__" ], w = new RegExp("^(?:" + b.join("|") + ")$"), C = function(t) {
                    return f.isIdentifier(t) && "_" !== t.charAt(0) && "constructor" !== t;
                }, j = function(t) {
                    return t.replace(/([$])/, "\\$");
                }, k = y ? p : function(t, e, i, o, s, a) {
                    function c() {
                        var i = e;
                        e === h && (i = this);
                        var o = new n(r);
                        o._captureStackTrace();
                        var s = "string" == typeof u && this !== l ? this[u] : t, c = _(o, a);
                        try {
                            s.apply(i, d(arguments, c));
                        } catch (t) {
                            t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                            o._rejectCallback(v(t), !0, !0);
                        }
                        return o._isFateSealed() || o._setAsyncGuaranteed(), o;
                    }
                    var l = function() {
                        return this;
                    }(), u = t;
                    return "string" == typeof u && (t = o), f.notEnumerableProp(c, "__isPromisified__", !0), 
                    c;
                };
                n.promisify = function(t, e) {
                    if ("function" != typeof t) throw new m("expecting a function but got " + f.classString(t));
                    if (o(t)) return t;
                    var n = u(t, void 0 === (e = Object(e)).context ? h : e.context, !!e.multiArgs);
                    return f.copyDescriptors(t, n, i), n;
                }, n.promisifyAll = function(e, n) {
                    if ("function" != typeof e && "object" !== (void 0 === e ? "undefined" : t(e))) throw new m("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n");
                    var r = !!(n = Object(n)).multiArgs, i = n.suffix;
                    "string" != typeof i && (i = "Async");
                    var o = n.filter;
                    "function" != typeof o && (o = C);
                    var s = n.promisifier;
                    if ("function" != typeof s && (s = k), !f.isIdentifier(i)) throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n");
                    for (var a = f.inheritedDataKeys(e), c = 0; c < a.length; ++c) {
                        var u = e[a[c]];
                        "constructor" !== a[c] && f.isClass(u) && (l(u.prototype, i, o, s, r), l(u, i, o, s, r));
                    }
                    return l(e, i, o, s, r);
                };
            };
        }, {
            "./errors": 12,
            "./nodeback": 20,
            "./util": 36
        } ],
        25: [ function(t, e, n) {
            e.exports = function(e, n, r, i) {
                function o(t) {
                    var e, n = !1;
                    if (void 0 !== a && t instanceof a) e = p(t), n = !0; else {
                        var r = u.keys(t), i = r.length;
                        e = new Array(2 * i);
                        for (var o = 0; o < i; ++o) {
                            var s = r[o];
                            e[o] = t[s], e[o + i] = s;
                        }
                    }
                    this.constructor$(e), this._isMap = n, this._init$(void 0, n ? -6 : -3);
                }
                function s(t) {
                    var n, s = r(t);
                    return l(s) ? (n = s instanceof e ? s._then(e.props, void 0, void 0, void 0, void 0) : new o(s).promise(), 
                    s instanceof e && n._propagateFrom(s, 2), n) : i("cannot await properties of a non-object\n\n    See http://goo.gl/MqrFmX\n");
                }
                var a, c = t("./util"), l = c.isObject, u = t("./es5");
                "function" == typeof Map && (a = Map);
                var p = function() {
                    function t(t, r) {
                        this[e] = t, this[e + n] = r, e++;
                    }
                    var e = 0, n = 0;
                    return function(r) {
                        n = r.size, e = 0;
                        var i = new Array(2 * r.size);
                        return r.forEach(t, i), i;
                    };
                }(), h = function(t) {
                    for (var e = new a(), n = t.length / 2 | 0, r = 0; r < n; ++r) {
                        var i = t[n + r], o = t[r];
                        e.set(i, o);
                    }
                    return e;
                };
                c.inherits(o, n), o.prototype._init = function() {}, o.prototype._promiseFulfilled = function(t, e) {
                    if (this._values[e] = t, ++this._totalResolved >= this._length) {
                        var n;
                        if (this._isMap) n = h(this._values); else {
                            n = {};
                            for (var r = this.length(), i = 0, o = this.length(); i < o; ++i) n[this._values[i + r]] = this._values[i];
                        }
                        return this._resolve(n), !0;
                    }
                    return !1;
                }, o.prototype.shouldCopyValues = function() {
                    return !1;
                }, o.prototype.getActualLength = function(t) {
                    return t >> 1;
                }, e.prototype.props = function() {
                    return s(this);
                }, e.props = function(t) {
                    return s(t);
                };
            };
        }, {
            "./es5": 13,
            "./util": 36
        } ],
        26: [ function(t, e, n) {
            function r(t, e, n, r, i) {
                for (var o = 0; o < i; ++o) n[o + r] = t[o + e], t[o + e] = void 0;
            }
            function i(t) {
                this._capacity = t, this._length = 0, this._front = 0;
            }
            i.prototype._willBeOverCapacity = function(t) {
                return this._capacity < t;
            }, i.prototype._pushOne = function(t) {
                var e = this.length();
                this._checkCapacity(e + 1), this[this._front + e & this._capacity - 1] = t, this._length = e + 1;
            }, i.prototype.push = function(t, e, n) {
                var r = this.length() + 3;
                if (this._willBeOverCapacity(r)) return this._pushOne(t), this._pushOne(e), void this._pushOne(n);
                var i = this._front + r - 3;
                this._checkCapacity(r);
                var o = this._capacity - 1;
                this[i + 0 & o] = t, this[i + 1 & o] = e, this[i + 2 & o] = n, this._length = r;
            }, i.prototype.shift = function() {
                var t = this._front, e = this[t];
                return this[t] = void 0, this._front = t + 1 & this._capacity - 1, this._length--, 
                e;
            }, i.prototype.length = function() {
                return this._length;
            }, i.prototype._checkCapacity = function(t) {
                this._capacity < t && this._resizeTo(this._capacity << 1);
            }, i.prototype._resizeTo = function(t) {
                var e = this._capacity;
                this._capacity = t, r(this, 0, this, e, this._front + this._length & e - 1);
            }, e.exports = i;
        }, {} ],
        27: [ function(t, e, n) {
            e.exports = function(e, n, r, i) {
                function o(t, o) {
                    var c = r(t);
                    if (c instanceof e) return a(c);
                    if (null === (t = s.asArray(t))) return i("expecting an array or an iterable object but got " + s.classString(t));
                    var l = new e(n);
                    void 0 !== o && l._propagateFrom(o, 3);
                    for (var u = l._fulfill, p = l._reject, h = 0, f = t.length; h < f; ++h) {
                        var _ = t[h];
                        (void 0 !== _ || h in t) && e.cast(_)._then(u, p, void 0, l, null);
                    }
                    return l;
                }
                var s = t("./util"), a = function(t) {
                    return t.then(function(e) {
                        return o(e, t);
                    });
                };
                e.race = function(t) {
                    return o(t, void 0);
                }, e.prototype.race = function() {
                    return o(this, void 0);
                };
            };
        }, {
            "./util": 36
        } ],
        28: [ function(t, e, n) {
            e.exports = function(e, n, r, i, o, s) {
                function a(t, n, r, i) {
                    this.constructor$(t);
                    var s = h();
                    this._fn = null === s ? n : f.domainBind(s, n), void 0 !== r && (r = e.resolve(r))._attachCancellationCallback(this), 
                    this._initialValue = r, this._currentCancellable = null, this._eachValues = i === o ? Array(this._length) : 0 === i ? null : void 0, 
                    this._promise._captureStackTrace(), this._init$(void 0, -5);
                }
                function c(t, e) {
                    this.isFulfilled() ? e._resolve(t) : e._reject(t);
                }
                function l(t, e, n, i) {
                    return "function" != typeof e ? r("expecting a function but got " + f.classString(e)) : new a(t, e, n, i).promise();
                }
                function u(t) {
                    this.accum = t, this.array._gotAccum(t);
                    var n = i(this.value, this.array._promise);
                    return n instanceof e ? (this.array._currentCancellable = n, n._then(p, void 0, void 0, this, void 0)) : p.call(this, n);
                }
                function p(t) {
                    var n = this.array, r = n._promise, i = _(n._fn);
                    r._pushContext();
                    var o;
                    (o = void 0 !== n._eachValues ? i.call(r._boundValue(), t, this.index, this.length) : i.call(r._boundValue(), this.accum, t, this.index, this.length)) instanceof e && (n._currentCancellable = o);
                    var a = r._popContext();
                    return s.checkForgottenReturns(o, a, void 0 !== n._eachValues ? "Promise.each" : "Promise.reduce", r), 
                    o;
                }
                var h = e._getDomain, f = t("./util"), _ = f.tryCatch;
                f.inherits(a, n), a.prototype._gotAccum = function(t) {
                    void 0 !== this._eachValues && null !== this._eachValues && t !== o && this._eachValues.push(t);
                }, a.prototype._eachComplete = function(t) {
                    return null !== this._eachValues && this._eachValues.push(t), this._eachValues;
                }, a.prototype._init = function() {}, a.prototype._resolveEmptyArray = function() {
                    this._resolve(void 0 !== this._eachValues ? this._eachValues : this._initialValue);
                }, a.prototype.shouldCopyValues = function() {
                    return !1;
                }, a.prototype._resolve = function(t) {
                    this._promise._resolveCallback(t), this._values = null;
                }, a.prototype._resultCancelled = function(t) {
                    if (t === this._initialValue) return this._cancel();
                    this._isResolved() || (this._resultCancelled$(), this._currentCancellable instanceof e && this._currentCancellable.cancel(), 
                    this._initialValue instanceof e && this._initialValue.cancel());
                }, a.prototype._iterate = function(t) {
                    this._values = t;
                    var n, r, i = t.length;
                    if (void 0 !== this._initialValue ? (n = this._initialValue, r = 0) : (n = e.resolve(t[0]), 
                    r = 1), this._currentCancellable = n, !n.isRejected()) for (;r < i; ++r) {
                        var o = {
                            accum: null,
                            value: t[r],
                            index: r,
                            length: i,
                            array: this
                        };
                        n = n._then(u, void 0, void 0, o, void 0);
                    }
                    void 0 !== this._eachValues && (n = n._then(this._eachComplete, void 0, void 0, this, void 0)), 
                    n._then(c, c, void 0, n, this);
                }, e.prototype.reduce = function(t, e) {
                    return l(this, t, e, null);
                }, e.reduce = function(t, e, n, r) {
                    return l(t, e, n, r);
                };
            };
        }, {
            "./util": 36
        } ],
        29: [ function(t, e, n) {
            var r, i = t("./util"), o = i.getNativePromise();
            if (i.isNode && "undefined" == typeof MutationObserver) {
                var s = global.setImmediate, a = process.nextTick;
                r = i.isRecentNode ? function(t) {
                    s.call(global, t);
                } : function(t) {
                    a.call(process, t);
                };
            } else if ("function" == typeof o && "function" == typeof o.resolve) {
                var c = o.resolve();
                r = function(t) {
                    c.then(t);
                };
            } else r = "undefined" == typeof MutationObserver || "undefined" != typeof window && window.navigator && (window.navigator.standalone || window.cordova) ? "undefined" != typeof setImmediate ? function(t) {
                setImmediate(t);
            } : "undefined" != typeof setTimeout ? function(t) {
                setTimeout(t, 0);
            } : function() {
                throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
            } : function() {
                var t = document.createElement("div"), e = {
                    attributes: !0
                }, n = !1, r = document.createElement("div");
                new MutationObserver(function() {
                    t.classList.toggle("foo"), n = !1;
                }).observe(r, e);
                var i = function() {
                    n || (n = !0, r.classList.toggle("foo"));
                };
                return function(n) {
                    var r = new MutationObserver(function() {
                        r.disconnect(), n();
                    });
                    r.observe(t, e), i();
                };
            }();
            e.exports = r;
        }, {
            "./util": 36
        } ],
        30: [ function(t, e, n) {
            e.exports = function(e, n, r) {
                function i(t) {
                    this.constructor$(t);
                }
                var o = e.PromiseInspection;
                t("./util").inherits(i, n), i.prototype._promiseResolved = function(t, e) {
                    return this._values[t] = e, ++this._totalResolved >= this._length && (this._resolve(this._values), 
                    !0);
                }, i.prototype._promiseFulfilled = function(t, e) {
                    var n = new o();
                    return n._bitField = 33554432, n._settledValueField = t, this._promiseResolved(e, n);
                }, i.prototype._promiseRejected = function(t, e) {
                    var n = new o();
                    return n._bitField = 16777216, n._settledValueField = t, this._promiseResolved(e, n);
                }, e.settle = function(t) {
                    return r.deprecated(".settle()", ".reflect()"), new i(t).promise();
                }, e.prototype.settle = function() {
                    return e.settle(this);
                };
            };
        }, {
            "./util": 36
        } ],
        31: [ function(t, e, n) {
            e.exports = function(e, n, r) {
                function i(t) {
                    this.constructor$(t), this._howMany = 0, this._unwrap = !1, this._initialized = !1;
                }
                function o(t, e) {
                    if ((0 | e) !== e || e < 0) return r("expecting a positive integer\n\n    See http://goo.gl/MqrFmX\n");
                    var n = new i(t), o = n.promise();
                    return n.setHowMany(e), n.init(), o;
                }
                var s = t("./util"), a = t("./errors").RangeError, c = t("./errors").AggregateError, l = s.isArray, u = {};
                s.inherits(i, n), i.prototype._init = function() {
                    if (this._initialized) if (0 !== this._howMany) {
                        this._init$(void 0, -5);
                        var t = l(this._values);
                        !this._isResolved() && t && this._howMany > this._canPossiblyFulfill() && this._reject(this._getRangeError(this.length()));
                    } else this._resolve([]);
                }, i.prototype.init = function() {
                    this._initialized = !0, this._init();
                }, i.prototype.setUnwrap = function() {
                    this._unwrap = !0;
                }, i.prototype.howMany = function() {
                    return this._howMany;
                }, i.prototype.setHowMany = function(t) {
                    this._howMany = t;
                }, i.prototype._promiseFulfilled = function(t) {
                    return this._addFulfilled(t), this._fulfilled() === this.howMany() && (this._values.length = this.howMany(), 
                    1 === this.howMany() && this._unwrap ? this._resolve(this._values[0]) : this._resolve(this._values), 
                    !0);
                }, i.prototype._promiseRejected = function(t) {
                    return this._addRejected(t), this._checkOutcome();
                }, i.prototype._promiseCancelled = function() {
                    return this._values instanceof e || null == this._values ? this._cancel() : (this._addRejected(u), 
                    this._checkOutcome());
                }, i.prototype._checkOutcome = function() {
                    if (this.howMany() > this._canPossiblyFulfill()) {
                        for (var t = new c(), e = this.length(); e < this._values.length; ++e) this._values[e] !== u && t.push(this._values[e]);
                        return t.length > 0 ? this._reject(t) : this._cancel(), !0;
                    }
                    return !1;
                }, i.prototype._fulfilled = function() {
                    return this._totalResolved;
                }, i.prototype._rejected = function() {
                    return this._values.length - this.length();
                }, i.prototype._addRejected = function(t) {
                    this._values.push(t);
                }, i.prototype._addFulfilled = function(t) {
                    this._values[this._totalResolved++] = t;
                }, i.prototype._canPossiblyFulfill = function() {
                    return this.length() - this._rejected();
                }, i.prototype._getRangeError = function(t) {
                    var e = "Input array must contain at least " + this._howMany + " items but contains only " + t + " items";
                    return new a(e);
                }, i.prototype._resolveEmptyArray = function() {
                    this._reject(this._getRangeError(0));
                }, e.some = function(t, e) {
                    return o(t, e);
                }, e.prototype.some = function(t) {
                    return o(this, t);
                }, e._SomePromiseArray = i;
            };
        }, {
            "./errors": 12,
            "./util": 36
        } ],
        32: [ function(t, e, n) {
            e.exports = function(t) {
                function e(t) {
                    void 0 !== t ? (t = t._target(), this._bitField = t._bitField, this._settledValueField = t._isFateSealed() ? t._settledValue() : void 0) : (this._bitField = 0, 
                    this._settledValueField = void 0);
                }
                e.prototype._settledValue = function() {
                    return this._settledValueField;
                };
                var n = e.prototype.value = function() {
                    if (!this.isFulfilled()) throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n");
                    return this._settledValue();
                }, r = e.prototype.error = e.prototype.reason = function() {
                    if (!this.isRejected()) throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n");
                    return this._settledValue();
                }, i = e.prototype.isFulfilled = function() {
                    return 0 != (33554432 & this._bitField);
                }, o = e.prototype.isRejected = function() {
                    return 0 != (16777216 & this._bitField);
                }, s = e.prototype.isPending = function() {
                    return 0 == (50397184 & this._bitField);
                }, a = e.prototype.isResolved = function() {
                    return 0 != (50331648 & this._bitField);
                };
                e.prototype.isCancelled = function() {
                    return 0 != (8454144 & this._bitField);
                }, t.prototype.__isCancelled = function() {
                    return 65536 == (65536 & this._bitField);
                }, t.prototype._isCancelled = function() {
                    return this._target().__isCancelled();
                }, t.prototype.isCancelled = function() {
                    return 0 != (8454144 & this._target()._bitField);
                }, t.prototype.isPending = function() {
                    return s.call(this._target());
                }, t.prototype.isRejected = function() {
                    return o.call(this._target());
                }, t.prototype.isFulfilled = function() {
                    return i.call(this._target());
                }, t.prototype.isResolved = function() {
                    return a.call(this._target());
                }, t.prototype.value = function() {
                    return n.call(this._target());
                }, t.prototype.reason = function() {
                    var t = this._target();
                    return t._unsetRejectionIsUnhandled(), r.call(t);
                }, t.prototype._value = function() {
                    return this._settledValue();
                }, t.prototype._reason = function() {
                    return this._unsetRejectionIsUnhandled(), this._settledValue();
                }, t.PromiseInspection = e;
            };
        }, {} ],
        33: [ function(t, e, n) {
            e.exports = function(e, n) {
                function r(t) {
                    return t.then;
                }
                function i(t) {
                    try {
                        return r(t);
                    } catch (t) {
                        t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                        return c.e = t, c;
                    }
                }
                function o(t) {
                    try {
                        return u.call(t, "_promise0");
                    } catch (t) {
                        t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                        return !1;
                    }
                }
                function s(t, r, i) {
                    var o = new e(n), s = o;
                    i && i._pushContext(), o._captureStackTrace(), i && i._popContext();
                    var l = !0, u = a.tryCatch(r).call(t, function(t) {
                        o && (o._resolveCallback(t), o = null);
                    }, function(t) {
                        o && (o._rejectCallback(t, l, !0), o = null);
                    });
                    return l = !1, o && u === c && (o._rejectCallback(u.e, !0, !0), o = null), s;
                }
                var a = t("./util"), c = a.errorObj, l = a.isObject, u = {}.hasOwnProperty;
                return function(t, r) {
                    if (l(t)) {
                        if (t instanceof e) return t;
                        var a = i(t);
                        if (a === c) return r && r._pushContext(), u = e.reject(a.e), r && r._popContext(), 
                        u;
                        if ("function" == typeof a) {
                            if (o(t)) {
                                var u = new e(n);
                                return t._then(u._fulfill, u._reject, void 0, u, null), u;
                            }
                            return s(t, a, r);
                        }
                    }
                    return t;
                };
            };
        }, {
            "./util": 36
        } ],
        34: [ function(t, e, n) {
            e.exports = function(e, n, r) {
                function i(t) {
                    this.handle = t;
                }
                function o(t) {
                    return clearTimeout(this.handle), t;
                }
                function s(t) {
                    throw clearTimeout(this.handle), t;
                }
                var a = t("./util"), c = e.TimeoutError;
                i.prototype._resultCancelled = function() {
                    clearTimeout(this.handle);
                };
                var l = function(t) {
                    return u(+this).thenReturn(t);
                }, u = e.delay = function(t, o) {
                    var s, a;
                    return void 0 !== o ? (s = e.resolve(o)._then(l, null, null, t, void 0), r.cancellation() && o instanceof e && s._setOnCancel(o)) : (s = new e(n), 
                    a = setTimeout(function() {
                        s._fulfill();
                    }, +t), r.cancellation() && s._setOnCancel(new i(a)), s._captureStackTrace()), s._setAsyncGuaranteed(), 
                    s;
                };
                e.prototype.delay = function(t) {
                    return u(t, this);
                };
                var p = function(t, e, n) {
                    var r;
                    r = "string" != typeof e ? e instanceof Error ? e : new c("operation timed out") : new c(e), 
                    a.markAsOriginatingFromRejection(r), t._attachExtraTrace(r), t._reject(r), null != n && n.cancel();
                };
                e.prototype.timeout = function(t, e) {
                    t = +t;
                    var n, a, c = new i(setTimeout(function() {
                        n.isPending() && p(n, e, a);
                    }, t));
                    return r.cancellation() ? (a = this.then(), (n = a._then(o, s, void 0, c, void 0))._setOnCancel(c)) : n = this._then(o, s, void 0, c, void 0), 
                    n;
                };
            };
        }, {
            "./util": 36
        } ],
        35: [ function(t, e, n) {
            e.exports = function(e, n, r, i, o, s) {
                function a(t) {
                    setTimeout(function() {
                        throw t;
                    }, 0);
                }
                function c(t) {
                    var e = r(t);
                    return e !== t && "function" == typeof t._isDisposable && "function" == typeof t._getDisposer && t._isDisposable() && e._setDisposable(t._getDisposer()), 
                    e;
                }
                function l(t, n) {
                    function i() {
                        if (s >= l) return u._fulfill();
                        var o = c(t[s++]);
                        if (o instanceof e && o._isDisposable()) {
                            try {
                                o = r(o._getDisposer().tryDispose(n), t.promise);
                            } catch (t) {
                                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                                return a(t);
                            }
                            if (o instanceof e) return o._then(i, a, null, null, null);
                        }
                        i();
                    }
                    var s = 0, l = t.length, u = new e(o);
                    return i(), u;
                }
                function u(t, e, n) {
                    this._data = t, this._promise = e, this._context = n;
                }
                function p(t, e, n) {
                    this.constructor$(t, e, n);
                }
                function h(t) {
                    return u.isDisposer(t) ? (this.resources[this.index]._setDisposable(t), t.promise()) : t;
                }
                function f(t) {
                    this.length = t, this.promise = null, this[t - 1] = null;
                }
                var _ = t("./util"), d = t("./errors").TypeError, v = t("./util").inherits, y = _.errorObj, m = _.tryCatch, g = {};
                u.prototype.data = function() {
                    return this._data;
                }, u.prototype.promise = function() {
                    return this._promise;
                }, u.prototype.resource = function() {
                    return this.promise().isFulfilled() ? this.promise().value() : g;
                }, u.prototype.tryDispose = function(t) {
                    var e = this.resource(), n = this._context;
                    void 0 !== n && n._pushContext();
                    var r = e !== g ? this.doDispose(e, t) : null;
                    return void 0 !== n && n._popContext(), this._promise._unsetDisposable(), this._data = null, 
                    r;
                }, u.isDisposer = function(t) {
                    return null != t && "function" == typeof t.resource && "function" == typeof t.tryDispose;
                }, v(p, u), p.prototype.doDispose = function(t, e) {
                    return this.data().call(t, t, e);
                }, f.prototype._resultCancelled = function() {
                    for (var t = this.length, n = 0; n < t; ++n) {
                        var r = this[n];
                        r instanceof e && r.cancel();
                    }
                }, e.using = function() {
                    var t = arguments.length;
                    if (t < 2) return n("you must pass at least 2 arguments to Promise.using");
                    var i = arguments[t - 1];
                    if ("function" != typeof i) return n("expecting a function but got " + _.classString(i));
                    var o, a = !0;
                    2 === t && Array.isArray(arguments[0]) ? (t = (o = arguments[0]).length, a = !1) : (o = arguments, 
                    t--);
                    for (var c = new f(t), p = 0; p < t; ++p) {
                        var d = o[p];
                        if (u.isDisposer(d)) {
                            var v = d;
                            (d = d.promise())._setDisposable(v);
                        } else {
                            var g = r(d);
                            g instanceof e && (d = g._then(h, null, null, {
                                resources: c,
                                index: p
                            }, void 0));
                        }
                        c[p] = d;
                    }
                    for (var b = new Array(c.length), p = 0; p < b.length; ++p) b[p] = e.resolve(c[p]).reflect();
                    var w = e.all(b).then(function(t) {
                        for (var e = 0; e < t.length; ++e) {
                            var n = t[e];
                            if (n.isRejected()) return y.e = n.error(), y;
                            if (!n.isFulfilled()) return void w.cancel();
                            t[e] = n.value();
                        }
                        C._pushContext(), i = m(i);
                        var r = a ? i.apply(void 0, t) : i(t), o = C._popContext();
                        return s.checkForgottenReturns(r, o, "Promise.using", C), r;
                    }), C = w.lastly(function() {
                        var t = new e.PromiseInspection(w);
                        return l(c, t);
                    });
                    return c.promise = C, C._setOnCancel(c), C;
                }, e.prototype._setDisposable = function(t) {
                    this._bitField = 131072 | this._bitField, this._disposer = t;
                }, e.prototype._isDisposable = function() {
                    return (131072 & this._bitField) > 0;
                }, e.prototype._getDisposer = function() {
                    return this._disposer;
                }, e.prototype._unsetDisposable = function() {
                    this._bitField = -131073 & this._bitField, this._disposer = void 0;
                }, e.prototype.disposer = function(t) {
                    if ("function" == typeof t) return new p(t, this, i());
                    throw new d();
                };
            };
        }, {
            "./errors": 12,
            "./util": 36
        } ],
        36: [ function(e, n, r) {
            function i() {
                try {
                    var t = S;
                    return S = null, t.apply(this, arguments);
                } catch (t) {
                    t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                    return P.e = t, P;
                }
            }
            function o(t) {
                return S = t, i;
            }
            function s(t) {
                return null == t || !0 === t || !1 === t || "string" == typeof t || "number" == typeof t;
            }
            function a(e) {
                return "function" == typeof e || "object" === (void 0 === e ? "undefined" : t(e)) && null !== e;
            }
            function c(t) {
                return s(t) ? new Error(y(t)) : t;
            }
            function l(t, e) {
                var n, r = t.length, i = new Array(r + 1);
                for (n = 0; n < r; ++n) i[n] = t[n];
                return i[n] = e, i;
            }
            function u(t, e, n) {
                if (!x.isES5) return {}.hasOwnProperty.call(t, e) ? t[e] : void 0;
                var r = Object.getOwnPropertyDescriptor(t, e);
                return null != r ? null == r.get && null == r.set ? r.value : n : void 0;
            }
            function p(t, e, n) {
                if (s(t)) return t;
                var r = {
                    value: n,
                    configurable: !0,
                    enumerable: !1,
                    writable: !0
                };
                return x.defineProperty(t, e, r), t;
            }
            function h(t) {
                throw t;
            }
            function f(t) {
                try {
                    if ("function" == typeof t) {
                        var e = x.names(t.prototype), n = x.isES5 && e.length > 1, r = e.length > 0 && !(1 === e.length && "constructor" === e[0]), i = D.test(t + "") && x.names(t).length > 0;
                        if (n || r || i) return !0;
                    }
                    return !1;
                } catch (t) {
                    t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                    return !1;
                }
            }
            function _(t) {
                function e() {}
                e.prototype = t;
                for (var n = 8; n--; ) new e();
                return t;
            }
            function d(t) {
                return V.test(t);
            }
            function v(t, e, n) {
                for (var r = new Array(t), i = 0; i < t; ++i) r[i] = e + i + n;
                return r;
            }
            function y(t) {
                try {
                    return t + "";
                } catch (t) {
                    t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                    return "[no string representation]";
                }
            }
            function m(e) {
                return null !== e && "object" === (void 0 === e ? "undefined" : t(e)) && "string" == typeof e.message && "string" == typeof e.name;
            }
            function g(t) {
                try {
                    p(t, "isOperational", !0);
                } catch (t) {}
            }
            function b(t) {
                return null != t && (t instanceof Error.__BluebirdErrorTypes__.OperationalError || !0 === t.isOperational);
            }
            function w(t) {
                return m(t) && x.propertyIsWritable(t, "stack");
            }
            function C(t) {
                return {}.toString.call(t);
            }
            function j(t, e, n) {
                for (var r = x.names(t), i = 0; i < r.length; ++i) {
                    var o = r[i];
                    if (n(o)) try {
                        x.defineProperty(e, o, x.getDescriptor(t, o));
                    } catch (t) {}
                }
            }
            function k(t) {
                return U ? process.env[t] : void 0;
            }
            function E() {
                if ("function" == typeof Promise) try {
                    var t = new Promise(function() {});
                    if ("[object Promise]" === {}.toString.call(t)) return Promise;
                } catch (t) {}
            }
            function F(t, e) {
                return t.bind(e);
            }
            var x = e("./es5"), T = "undefined" == typeof navigator, P = {
                e: {}
            }, S, R = "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : void 0 !== this ? this : null, O = function(t, e) {
                function n() {
                    this.constructor = t, this.constructor$ = e;
                    for (var n in e.prototype) r.call(e.prototype, n) && "$" !== n.charAt(n.length - 1) && (this[n + "$"] = e.prototype[n]);
                }
                var r = {}.hasOwnProperty;
                return n.prototype = e.prototype, t.prototype = new n(), t.prototype;
            }, A = function() {
                var t = [ Array.prototype, Object.prototype, Function.prototype ], e = function(e) {
                    for (var n = 0; n < t.length; ++n) if (t[n] === e) return !0;
                    return !1;
                };
                if (x.isES5) {
                    var n = Object.getOwnPropertyNames;
                    return function(t) {
                        for (var r = [], i = Object.create(null); null != t && !e(t); ) {
                            var o;
                            try {
                                o = n(t);
                            } catch (t) {
                                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                                return r;
                            }
                            for (var s = 0; s < o.length; ++s) {
                                var a = o[s];
                                if (!i[a]) {
                                    i[a] = !0;
                                    var c = Object.getOwnPropertyDescriptor(t, a);
                                    null != c && null == c.get && null == c.set && r.push(a);
                                }
                            }
                            t = x.getPrototypeOf(t);
                        }
                        return r;
                    };
                }
                var r = {}.hasOwnProperty;
                return function(n) {
                    if (e(n)) return [];
                    var i = [];
                    t: for (var o in n) if (r.call(n, o)) i.push(o); else {
                        for (var s = 0; s < t.length; ++s) if (r.call(t[s], o)) continue t;
                        i.push(o);
                    }
                    return i;
                };
            }(), D = /this\s*\.\s*\S+\s*=/, V = /^[a-z$_][a-z$_0-9]*$/i, I = "stack" in new Error() ? function(t) {
                return w(t) ? t : new Error(y(t));
            } : function(t) {
                if (w(t)) return t;
                try {
                    throw new Error(y(t));
                } catch (t) {
                    t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                    return t;
                }
            }, L = function(t) {
                return x.isArray(t) ? t : null;
            };
            if ("undefined" != typeof Symbol && Symbol.iterator) {
                var H = "function" == typeof Array.from ? function(t) {
                    return Array.from(t);
                } : function(t) {
                    for (var e, n = [], r = t[Symbol.iterator](); !(e = r.next()).done; ) n.push(e.value);
                    return n;
                };
                L = function(t) {
                    return x.isArray(t) ? t : null != t && "function" == typeof t[Symbol.iterator] ? H(t) : null;
                };
            }
            var N = "undefined" != typeof process && "[object process]" === C(process).toLowerCase(), U = "undefined" != typeof process && void 0 !== process.env, B = {
                isClass: f,
                isIdentifier: d,
                inheritedDataKeys: A,
                getDataPropertyOrDefault: u,
                thrower: h,
                isArray: x.isArray,
                asArray: L,
                notEnumerableProp: p,
                isPrimitive: s,
                isObject: a,
                isError: m,
                canEvaluate: T,
                errorObj: P,
                tryCatch: o,
                inherits: O,
                withAppended: l,
                maybeWrapAsError: c,
                toFastProperties: _,
                filledRange: v,
                toString: y,
                canAttachTrace: w,
                ensureErrorObject: I,
                originatesFromRejection: b,
                markAsOriginatingFromRejection: g,
                classString: C,
                copyDescriptors: j,
                hasDevTools: "undefined" != typeof chrome && chrome && "function" == typeof chrome.loadTimes,
                isNode: N,
                hasEnvVariables: U,
                env: k,
                global: R,
                getNativePromise: E,
                domainBind: F
            };
            B.isRecentNode = B.isNode && function() {
                var t = process.versions.node.split(".").map(Number);
                return 0 === t[0] && t[1] > 10 || t[0] > 0;
            }(), B.isNode && B.toFastProperties(process);
            try {
                throw new Error();
            } catch (t) {
                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                B.lastLineError = t;
            }
            n.exports = B;
        }, {
            "./es5": 13
        } ]
    }, {}, [ 4 ])(4);
}), "undefined" != typeof window && null !== window ? window.P = window.Promise : "undefined" != typeof self && null !== self && (self.P = self.Promise);