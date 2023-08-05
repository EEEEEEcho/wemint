function e(e) {
    if (Array.isArray(e)) {
        for (var r = 0, a = Array(e.length); r < e.length; r++) a[r] = e[r];
        return a;
    }
    return Array.from(e);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.themeMapper = exports.processMapper = exports.customizedMapper = exports.customDetailMapper = exports.rankMapper = exports.spaceTypeMapper = exports.houseTypesMapper = void 0;

var r = Object.assign || function(e) {
    for (var r = 1; r < arguments.length; r++) {
        var a = arguments[r];
        for (var t in a) Object.prototype.hasOwnProperty.call(a, t) && (e[t] = a[t]);
    }
    return e;
}, a = require("./date");

exports.houseTypesMapper = function(e) {
    var r = e.id, a = e.houseId, t = e.layoutId, o = e.thumbnail, n = e.chooseImage, i = e.senceImage, p = e.area, s = e.type, m = e.name, u = e.floor;
    return {
        id: r,
        houseId: a,
        area: parseInt(p),
        name: m,
        type: s,
        height: u,
        layoutId: t,
        chooseImage: n,
        thumb: i,
        thumbSm: o
    };
}, exports.spaceTypeMapper = function(e) {
    return {
        id: e.id,
        name: e.name,
        subTypes: e.spaces
    };
}, exports.rankMapper = function(r) {
    var a = r.id, t = r.senceImage, o = r.isThumbsUp, n = r.thumbsUpNo, i = void 0 === n ? 0 : n, p = r.avatar, s = void 0 === p ? "" : p, m = r.name, u = r.spaces, c = r.originCustomer, d = r.orderNo, g = i || 0, l = o, h = u || [];
    h = h.map(function(e) {
        return e.name;
    });
    var f = [ m ].concat(e(h)), v = c || {}, y = v.nickName, x = v.headPic;
    return {
        id: a,
        src: t,
        like: g,
        avatar: s,
        name: m,
        special: f,
        owner: {
            name: y || "",
            avatar: x || ""
        },
        isLike: l,
        rank: d || ""
    };
}, exports.customDetailMapper = function(e) {
    var a = e.thumbsUpCustomerList, t = e.customizedProgramme, o = e.inviteCustomerList, n = e.originCustomer || {}, i = t || {}, p = i.image3dPlane, s = i.image3d, m = o || [];
    return r({}, e, {
        likes: a || [],
        origin: n,
        image3d: s,
        inviteList: m,
        originUrl: p,
        image3dPlane: e.commentImageUrl
    });
}, exports.customizedMapper = function(t) {
    var o = t.updated || t.created, n = (0, a.getDate)(o), i = t.thumbsUpNo || 0, p = t.isThumbsUp, s = t.spaces.map(function(e) {
        return e.name;
    }), m = [ t.name ].concat(e(s)), u = t.orderNo || "", c = t.originCustomer || {};
    return r({}, t, {
        rank: u,
        date: n,
        like: i,
        isLike: p,
        special: m,
        origin: c
    });
}, exports.processMapper = function(e) {
    var t = e.date, o = (0, a.getDate)(t), n = (0, a.getTime)(t);
    return r({}, e, {
        date: o,
        time: n
    });
}, exports.themeMapper = function(e) {
    return e.map(function(e) {
        var r = e.decorationStyle, a = e.imageUrl;
        return {
            name: r.name,
            color: r.imageUrl,
            effect: a
        };
    });
};