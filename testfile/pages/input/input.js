// pages/login/login.js
var utils = require('../../utils/util.js')
Page({
    data: {
        phoneNumber: "",
        password: "",
        src: '/images/login.png'
    },
    async login() {
        await utils.Http.asyncWXLogin(
            res => {
                    code = res.code
                }
            )
    },
})


