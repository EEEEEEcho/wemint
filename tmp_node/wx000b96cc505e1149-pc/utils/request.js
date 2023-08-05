var _es6Promise = require("es6-promise.min");

var _es6Promise2 = _interopRequireDefault(_es6Promise);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

module.exports = function(options) {
    return new _es6Promise2.default(function(resolve, reject) {
        options = Object.assign(options, {
            success: function success(result) {
                if (result.statusCode === 200) {
                    resolve(result.data);
                } else {
                    reject(result);
                }
            },
            fail: reject
        });
        wx.request(options);
    });
};