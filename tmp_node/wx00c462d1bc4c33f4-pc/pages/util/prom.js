var n = require("./bluebird.js");

module.exports = {
    wxPromisify: function(i) {
        return function() {
            var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return new n(function(n, u) {
                r.success = function(i) {
                    n(i);
                }, r.fail = function(n) {
                    u(n);
                }, i(r);
            });
        };
    }
};