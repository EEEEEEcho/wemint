function e(e) {
    return wx.setStorageSync(n.STORAGE_REMIND_FIRST, e);
}

function t(e) {
    return wx.setStorageSync(n.STORAGE_DEVICE_ID, e);
}

function r() {
    return wx.getStorageSync(n.STORAGE_DEVICE_ID);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.setUser = function(e) {
    wx.setStorageSync(n.STORAGE_USER, e);
}, exports.getUser = function() {
    return wx.getStorageSync(n.STORAGE_USER);
}, exports.setSearchHistory = function(e) {
    return wx.setStorageSync(n.STORAGE_SEARCH_HISTORY, e);
}, exports.getSearchHistory = function() {
    return wx.getStorageSync(n.STORAGE_SEARCH_HISTORY);
}, exports.setRemindFirst = e, exports.getRemindFirst = function() {
    return wx.getStorageSync(n.STORAGE_REMIND_FIRST);
}, exports.setDeviceId = t, exports.getDeviceId = r, exports.clear = function() {
    var n = r();
    wx.clearStorage(), "" != n && t(n), e(!0);
};

var n = require("./constant.js");