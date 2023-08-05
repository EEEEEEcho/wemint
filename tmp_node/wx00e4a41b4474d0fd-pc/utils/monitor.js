Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./wxLogger.js")), r = require("../config.js"), t = null;

t = r.env && "prod" == r.env ? e.default.init({
    pid: "hwv84u5sz8@8fd54f235f2df71",
    region: "cn"
}) : e.default.init(), exports.default = t;