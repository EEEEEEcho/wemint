var e = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

module.exports = {
    utf8to16: function(e) {
        var r, a, o, t, c, h;
        for (r = "", o = e.length, a = 0; a < o; ) switch ((t = e.charCodeAt(a++)) >> 4) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
            r += e.charAt(a - 1);
            break;

          case 12:
          case 13:
            c = e.charCodeAt(a++), r += String.fromCharCode((31 & t) << 6 | 63 & c);
            break;

          case 14:
            c = e.charCodeAt(a++), h = e.charCodeAt(a++), r += String.fromCharCode((15 & t) << 12 | (63 & c) << 6 | (63 & h) << 0);
        }
        return r;
    },
    base64decode: function(r) {
        var a, o, t, c, h, d, i;
        for (d = r.length, h = 0, i = ""; h < d; ) {
            do {
                a = e[255 & r.charCodeAt(h++)];
            } while (h < d && -1 == a);
            if (-1 == a) break;
            do {
                o = e[255 & r.charCodeAt(h++)];
            } while (h < d && -1 == o);
            if (-1 == o) break;
            i += String.fromCharCode(a << 2 | (48 & o) >> 4);
            do {
                if (61 == (t = 255 & r.charCodeAt(h++))) return i;
                t = e[t];
            } while (h < d && -1 == t);
            if (-1 == t) break;
            i += String.fromCharCode((15 & o) << 4 | (60 & t) >> 2);
            do {
                if (61 == (c = 255 & r.charCodeAt(h++))) return i;
                c = e[c];
            } while (h < d && -1 == c);
            if (-1 == c) break;
            i += String.fromCharCode((3 & t) << 6 | c);
        }
        return i;
    }
};