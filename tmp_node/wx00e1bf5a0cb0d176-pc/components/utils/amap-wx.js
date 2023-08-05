function t(t) {
    this.key = t.key, this.requestConfig = {
        key: t.key,
        s: "rsx",
        platform: "WXJS",
        appname: t.key,
        sdkversion: "1.2.0",
        logversion: "2.0"
    };
}

t.prototype.getWxLocation = function(t, e) {
    wx.getLocation({
        type: "gcj02",
        success: function(t) {
            var o = t.longitude + "," + t.latitude;
            wx.setStorage({
                key: "userLocation",
                data: o
            }), e(o);
        },
        fail: function(o) {
            wx.getStorage({
                key: "userLocation",
                success: function(t) {
                    t.data && e(t.data);
                }
            }), t.fail({
                errCode: "0",
                errMsg: o.errMsg || ""
            });
        }
    });
}, t.prototype.getRegeo = function(t) {
    function e(e) {
        var a = o.requestConfig;
        wx.request({
            url: "https://restapi.amap.com/v3/geocode/regeo",
            data: {
                key: o.key,
                location: e,
                extensions: "all",
                s: a.s,
                platform: a.platform,
                appname: o.key,
                sdkversion: a.sdkversion,
                logversion: a.logversion
            },
            method: "GET",
            header: {
                "content-type": "application/json"
            },
            success: function(o) {
                var a, s, i, r, n, p, c, d;
                o.data.status && "1" == o.data.status ? (a = o.data.regeocode, s = a.addressComponent, 
                i = [], r = a.roads[0].name + "附近", n = e.split(",")[0], p = e.split(",")[1], a.pois && a.pois[0] && (r = a.pois[0].name + "附近", 
                (c = a.pois[0].location) && (n = parseFloat(c.split(",")[0]), p = parseFloat(c.split(",")[1]))), 
                s.provice && i.push(s.provice), s.city && i.push(s.city), s.district && i.push(s.district), 
                s.streetNumber && s.streetNumber.street && s.streetNumber.number ? (i.push(s.streetNumber.street), 
                i.push(s.streetNumber.number)) : i.push(a.roads[0].name), i = i.join(""), d = [ {
                    iconPath: t.iconPath,
                    width: t.iconWidth,
                    height: t.iconHeight,
                    name: i,
                    desc: r,
                    longitude: n,
                    latitude: p,
                    id: 0,
                    regeocodeData: a
                } ], t.success(d)) : t.fail({
                    errCode: o.data.infocode,
                    errMsg: o.data.info
                });
            },
            fail: function(e) {
                t.fail({
                    errCode: "0",
                    errMsg: e.errMsg || ""
                });
            }
        });
    }
    var o = this;
    t.location ? e(t.location) : o.getWxLocation(t, function(t) {
        e(t);
    });
}, t.prototype.getWeather = function(t) {
    function e(e) {
        var o = "base";
        t.type && "forecast" == t.type && (o = "all"), wx.request({
            url: "https://restapi.amap.com/v3/weather/weatherInfo",
            data: {
                key: a.key,
                city: e,
                extensions: o,
                s: s.s,
                platform: s.platform,
                appname: a.key,
                sdkversion: s.sdkversion,
                logversion: s.logversion
            },
            method: "GET",
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                var o, a;
                e.data.status && "1" == e.data.status ? e.data.lives ? (o = e.data.lives) && o.length > 0 && (o = o[0], 
                a = function(t) {
                    return {
                        city: {
                            text: "城市",
                            data: t.city
                        },
                        weather: {
                            text: "天气",
                            data: t.weather
                        },
                        temperature: {
                            text: "温度",
                            data: t.temperature
                        },
                        winddirection: {
                            text: "风向",
                            data: t.winddirection + "风"
                        },
                        windpower: {
                            text: "风力",
                            data: t.windpower + "级"
                        },
                        humidity: {
                            text: "湿度",
                            data: t.humidity + "%"
                        }
                    };
                }(o), a.liveData = o, t.success(a)) : e.data.forecasts && e.data.forecasts[0] && t.success({
                    forecast: e.data.forecasts[0]
                }) : t.fail({
                    errCode: e.data.infocode,
                    errMsg: e.data.info
                });
            },
            fail: function(e) {
                t.fail({
                    errCode: "0",
                    errMsg: e.errMsg || ""
                });
            }
        });
    }
    function o(o) {
        wx.request({
            url: "https://restapi.amap.com/v3/geocode/regeo",
            data: {
                key: a.key,
                location: o,
                extensions: "all",
                s: s.s,
                platform: s.platform,
                appname: a.key,
                sdkversion: s.sdkversion,
                logversion: s.logversion
            },
            method: "GET",
            header: {
                "content-type": "application/json"
            },
            success: function(o) {
                var a, s;
                o.data.status && "1" == o.data.status ? ((s = o.data.regeocode).addressComponent ? a = s.addressComponent.adcode : s.aois && s.aois.length > 0 && (a = s.aois[0].adcode), 
                e(a)) : t.fail({
                    errCode: o.data.infocode,
                    errMsg: o.data.info
                });
            },
            fail: function(e) {
                t.fail({
                    errCode: "0",
                    errMsg: e.errMsg || ""
                });
            }
        });
    }
    var a = this, s = a.requestConfig;
    t.city ? e(t.city) : a.getWxLocation(t, function(t) {
        o(t);
    });
}, t.prototype.getPoiAround = function(t) {
    function e(e) {
        var s = {
            key: o.key,
            location: e,
            s: a.s,
            platform: a.platform,
            appname: o.key,
            sdkversion: a.sdkversion,
            logversion: a.logversion
        };
        t.querytypes && (s.types = t.querytypes), t.querykeywords && (s.keywords = t.querykeywords), 
        wx.request({
            url: "https://restapi.amap.com/v3/place/around",
            data: s,
            method: "GET",
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                var o, a, s, i;
                if (e.data.status && "1" == e.data.status) {
                    if ((e = e.data) && e.pois) {
                        for (o = [], a = 0; a < e.pois.length; a++) s = 0 == a ? t.iconPathSelected : t.iconPath, 
                        o.push({
                            latitude: parseFloat(e.pois[a].location.split(",")[1]),
                            longitude: parseFloat(e.pois[a].location.split(",")[0]),
                            iconPath: s,
                            width: 22,
                            height: 32,
                            id: a,
                            name: e.pois[a].name,
                            address: e.pois[a].address
                        });
                        i = {
                            markers: o,
                            poisData: e.pois
                        }, t.success(i);
                    }
                } else t.fail({
                    errCode: e.data.infocode,
                    errMsg: e.data.info
                });
            },
            fail: function(e) {
                t.fail({
                    errCode: "0",
                    errMsg: e.errMsg || ""
                });
            }
        });
    }
    var o = this, a = o.requestConfig;
    t.location ? e(t.location) : o.getWxLocation(t, function(t) {
        e(t);
    });
}, t.prototype.getStaticmap = function(t) {
    function e(e) {
        s.push("location=" + e), t.zoom && s.push("zoom=" + t.zoom), t.size && s.push("size=" + t.size), 
        t.scale && s.push("scale=" + t.scale), t.markers && s.push("markers=" + t.markers), 
        t.labels && s.push("labels=" + t.labels), t.paths && s.push("paths=" + t.paths), 
        t.traffic && s.push("traffic=" + t.traffic);
        var o = i + s.join("&");
        t.success({
            url: o
        });
    }
    var o, a = this, s = [], i = "https://restapi.amap.com/v3/staticmap?";
    s.push("key=" + a.key), o = a.requestConfig, s.push("s=" + o.s), s.push("platform=" + o.platform), 
    s.push("appname=" + o.appname), s.push("sdkversion=" + o.sdkversion), s.push("logversion=" + o.logversion), 
    t.location ? e(t.location) : a.getWxLocation(t, function(t) {
        e(t);
    });
}, t.prototype.getInputtips = function(t) {
    var e = this, o = e.requestConfig, a = {
        key: e.key,
        s: o.s,
        platform: o.platform,
        appname: e.key,
        sdkversion: o.sdkversion,
        logversion: o.logversion
    };
    t.location && (a.location = t.location), t.keywords && (a.keywords = t.keywords), 
    t.type && (a.type = t.type), t.city && (a.city = t.city), t.citylimit && (a.citylimit = t.citylimit), 
    wx.request({
        url: "https://restapi.amap.com/v3/assistant/inputtips",
        data: a,
        method: "GET",
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            e && e.data && e.data.tips && t.success({
                tips: e.data.tips
            });
        },
        fail: function(e) {
            t.fail({
                errCode: "0",
                errMsg: e.errMsg || ""
            });
        }
    });
}, t.prototype.getDrivingRoute = function(t) {
    var e = this, o = e.requestConfig, a = {
        key: e.key,
        s: o.s,
        platform: o.platform,
        appname: e.key,
        sdkversion: o.sdkversion,
        logversion: o.logversion
    };
    t.origin && (a.origin = t.origin), t.destination && (a.destination = t.destination), 
    t.strategy && (a.strategy = t.strategy), t.waypoints && (a.waypoints = t.waypoints), 
    t.avoidpolygons && (a.avoidpolygons = t.avoidpolygons), t.avoidroad && (a.avoidroad = t.avoidroad), 
    wx.request({
        url: "https://restapi.amap.com/v3/direction/driving",
        data: a,
        method: "GET",
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            e && e.data && e.data.route && t.success({
                paths: e.data.route.paths,
                taxi_cost: e.data.route.taxi_cost || ""
            });
        },
        fail: function(e) {
            t.fail({
                errCode: "0",
                errMsg: e.errMsg || ""
            });
        }
    });
}, t.prototype.getWalkingRoute = function(t) {
    var e = this, o = e.requestConfig, a = {
        key: e.key,
        s: o.s,
        platform: o.platform,
        appname: e.key,
        sdkversion: o.sdkversion,
        logversion: o.logversion
    };
    t.origin && (a.origin = t.origin), t.destination && (a.destination = t.destination), 
    wx.request({
        url: "https://restapi.amap.com/v3/direction/walking",
        data: a,
        method: "GET",
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            e && e.data && e.data.route && t.success({
                paths: e.data.route.paths
            });
        },
        fail: function(e) {
            t.fail({
                errCode: "0",
                errMsg: e.errMsg || ""
            });
        }
    });
}, t.prototype.getTransitRoute = function(t) {
    var e = this, o = e.requestConfig, a = {
        key: e.key,
        s: o.s,
        platform: o.platform,
        appname: e.key,
        sdkversion: o.sdkversion,
        logversion: o.logversion
    };
    t.origin && (a.origin = t.origin), t.destination && (a.destination = t.destination), 
    t.strategy && (a.strategy = t.strategy), t.city && (a.city = t.city), t.cityd && (a.cityd = t.cityd), 
    wx.request({
        url: "https://restapi.amap.com/v3/direction/transit/integrated",
        data: a,
        method: "GET",
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            if (e && e.data && e.data.route) {
                var o = e.data.route;
                t.success({
                    distance: o.distance || "",
                    taxi_cost: o.taxi_cost || "",
                    transits: o.transits
                });
            }
        },
        fail: function(e) {
            t.fail({
                errCode: "0",
                errMsg: e.errMsg || ""
            });
        }
    });
}, t.prototype.getRidingRoute = function(t) {
    var e = this, o = e.requestConfig, a = {
        key: e.key,
        s: o.s,
        platform: o.platform,
        appname: e.key,
        sdkversion: o.sdkversion,
        logversion: o.logversion
    };
    t.origin && (a.origin = t.origin), t.destination && (a.destination = t.destination), 
    wx.request({
        url: "https://restapi.amap.com/v3/direction/riding",
        data: a,
        method: "GET",
        header: {
            "content-type": "application/json"
        },
        success: function(e) {
            e && e.data && e.data.route && t.success({
                paths: e.data.route.paths
            });
        },
        fail: function(e) {
            t.fail({
                errCode: "0",
                errMsg: e.errMsg || ""
            });
        }
    });
}, module.exports.AMapWX = t;