function safe_add(e, f) {
    var g = (65535 & e) + (65535 & f);
    return (e >> 16) + (f >> 16) + (g >> 16) << 16 | 65535 & g;
}

function rol(e, f) {
    return e << f | e >>> 32 - f;
}

function cmn(e, f, g, h, j, k) {
    return safe_add(rol(safe_add(safe_add(f, e), safe_add(h, k)), j), g);
}

function ff(e, f, g, h, j, k, l) {
    return cmn(f & g | ~f & h, e, f, j, k, l);
}

function gg(e, f, g, h, j, k, l) {
    return cmn(f & h | g & ~h, e, f, j, k, l);
}

function hh(e, f, g, h, j, k, l) {
    return cmn(f ^ g ^ h, e, f, j, k, l);
}

function ii(e, f, g, h, j, k, l) {
    return cmn(g ^ (f | ~h), e, f, j, k, l);
}

function coreMD5(e) {
    for (var f = 1732584193, g = -271733879, h = -1732584194, j = 271733878, k = 0; k < e.length; k += 16) {
        var l = f, m = g, n = h, o = j;
        f = ff(f, g, h, j, e[k + 0], 7, -680876936), j = ff(j, f, g, h, e[k + 1], 12, -389564586), 
        h = ff(h, j, f, g, e[k + 2], 17, 606105819), g = ff(g, h, j, f, e[k + 3], 22, -1044525330), 
        f = ff(f, g, h, j, e[k + 4], 7, -176418897), j = ff(j, f, g, h, e[k + 5], 12, 1200080426), 
        h = ff(h, j, f, g, e[k + 6], 17, -1473231341), g = ff(g, h, j, f, e[k + 7], 22, -45705983), 
        f = ff(f, g, h, j, e[k + 8], 7, 1770035416), j = ff(j, f, g, h, e[k + 9], 12, -1958414417), 
        h = ff(h, j, f, g, e[k + 10], 17, -42063), g = ff(g, h, j, f, e[k + 11], 22, -1990404162), 
        f = ff(f, g, h, j, e[k + 12], 7, 1804603682), j = ff(j, f, g, h, e[k + 13], 12, -40341101), 
        h = ff(h, j, f, g, e[k + 14], 17, -1502002290), g = ff(g, h, j, f, e[k + 15], 22, 1236535329), 
        f = gg(f, g, h, j, e[k + 1], 5, -165796510), j = gg(j, f, g, h, e[k + 6], 9, -1069501632), 
        h = gg(h, j, f, g, e[k + 11], 14, 643717713), g = gg(g, h, j, f, e[k + 0], 20, -373897302), 
        f = gg(f, g, h, j, e[k + 5], 5, -701558691), j = gg(j, f, g, h, e[k + 10], 9, 38016083), 
        h = gg(h, j, f, g, e[k + 15], 14, -660478335), g = gg(g, h, j, f, e[k + 4], 20, -405537848), 
        f = gg(f, g, h, j, e[k + 9], 5, 568446438), j = gg(j, f, g, h, e[k + 14], 9, -1019803690), 
        h = gg(h, j, f, g, e[k + 3], 14, -187363961), g = gg(g, h, j, f, e[k + 8], 20, 1163531501), 
        f = gg(f, g, h, j, e[k + 13], 5, -1444681467), j = gg(j, f, g, h, e[k + 2], 9, -51403784), 
        h = gg(h, j, f, g, e[k + 7], 14, 1735328473), g = gg(g, h, j, f, e[k + 12], 20, -1926607734), 
        f = hh(f, g, h, j, e[k + 5], 4, -378558), j = hh(j, f, g, h, e[k + 8], 11, -2022574463), 
        h = hh(h, j, f, g, e[k + 11], 16, 1839030562), g = hh(g, h, j, f, e[k + 14], 23, -35309556), 
        f = hh(f, g, h, j, e[k + 1], 4, -1530992060), j = hh(j, f, g, h, e[k + 4], 11, 1272893353), 
        h = hh(h, j, f, g, e[k + 7], 16, -155497632), g = hh(g, h, j, f, e[k + 10], 23, -1094730640), 
        f = hh(f, g, h, j, e[k + 13], 4, 681279174), j = hh(j, f, g, h, e[k + 0], 11, -358537222), 
        h = hh(h, j, f, g, e[k + 3], 16, -722521979), g = hh(g, h, j, f, e[k + 6], 23, 76029189), 
        f = hh(f, g, h, j, e[k + 9], 4, -640364487), j = hh(j, f, g, h, e[k + 12], 11, -421815835), 
        h = hh(h, j, f, g, e[k + 15], 16, 530742520), g = hh(g, h, j, f, e[k + 2], 23, -995338651), 
        f = ii(f, g, h, j, e[k + 0], 6, -198630844), j = ii(j, f, g, h, e[k + 7], 10, 1126891415), 
        h = ii(h, j, f, g, e[k + 14], 15, -1416354905), g = ii(g, h, j, f, e[k + 5], 21, -57434055), 
        f = ii(f, g, h, j, e[k + 12], 6, 1700485571), j = ii(j, f, g, h, e[k + 3], 10, -1894986606), 
        h = ii(h, j, f, g, e[k + 10], 15, -1051523), g = ii(g, h, j, f, e[k + 1], 21, -2054922799), 
        f = ii(f, g, h, j, e[k + 8], 6, 1873313359), j = ii(j, f, g, h, e[k + 15], 10, -30611744), 
        h = ii(h, j, f, g, e[k + 6], 15, -1560198380), g = ii(g, h, j, f, e[k + 13], 21, 1309151649), 
        f = ii(f, g, h, j, e[k + 4], 6, -145523070), j = ii(j, f, g, h, e[k + 11], 10, -1120210379), 
        h = ii(h, j, f, g, e[k + 2], 15, 718787259), g = ii(g, h, j, f, e[k + 9], 21, -343485551), 
        f = safe_add(f, l), g = safe_add(g, m), h = safe_add(h, n), j = safe_add(j, o);
    }
    return [ f, g, h, j ];
}

function binl2hex(e) {
    for (var f = "0123456789abcdef", g = "", h = 0; h < 4 * e.length; h++) {
        g += f.charAt(15 & e[h >> 2] >> 8 * (h % 4) + 4) + f.charAt(15 & e[h >> 2] >> 8 * (h % 4));
    }
    return g;
}

function binl2b64(e) {
    for (var g = "", h = 0; h < 32 * e.length; h += 6) {
        g += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(63 & e[h >> 5] << h % 32 | 63 & e[h >> 6] >> 32 - h % 32);
    }
    return g;
}

function str2binl(e) {
    for (var f = (e.length + 8 >> 6) + 1, g = Array(16 * f), h = 0; h < 16 * f; h++) {
        g[h] = 0;
    }
    for (var h = 0; h < e.length; h++) {
        g[h >> 2] |= (255 & e.charCodeAt(h)) << 8 * (h % 4);
    }
    return g[h >> 2] |= 128 << 8 * (h % 4), g[16 * f - 2] = 8 * e.length, g;
}

function strw2binl(e) {
    for (var f = (e.length + 4 >> 5) + 1, g = Array(16 * f), h = 0; h < 16 * f; h++) {
        g[h] = 0;
    }
    for (var h = 0; h < e.length; h++) {
        g[h >> 1] |= e.charCodeAt(h) << 16 * (h % 2);
    }
    return g[h >> 1] |= 128 << 16 * (h % 2), g[16 * f - 2] = 16 * e.length, g;
}

function hexMD5(e) {
    return binl2hex(coreMD5(str2binl(e)));
}

function hexMD5w(e) {
    return binl2hex(coreMD5(strw2binl(e)));
}

function b64MD5(e) {
    return binl2b64(coreMD5(str2binl(e)));
}

function b64MD5w(e) {
    return binl2b64(coreMD5(strw2binl(e)));
}

function calcMD5(e) {
    return binl2hex(coreMD5(str2binl(e)));
}

module.exports = {
    hexMD5: hexMD5
};