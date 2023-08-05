Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.upTokenImage = function(e, i, o, t) {
    n.upload(e, function(n) {
        o(n.imageURL);
    }, function(n) {
        t();
    }, {
        region: "ECN",
        domain: "http://oss.shangmian.xin",
        uptoken: i
    }, function(n) {}, function() {}, function() {}, function(n) {});
};

var n = require("../utils/qiniuUploader");