// pages/login/login.js
var utils = require('../../utils/util.js')
Page({
    data: {
        phoneNumber: "",
        password: "",
        src: '/images/login.png'
    },
    moneyInput: function(t) {
        void 0 != t && (this.setData({
            txtMoney: t.detail.value
        }), this.verifykInput());
    },
})


