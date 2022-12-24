// pages/login/login.js
var utils = require('../../utils/util.js')
Page({
    data: {
        phoneNumber: "",
        password: "",
        src: '/images/login.png'
    },
    async login() {
        //1.点击时先判断缓存中有无用户信息
        let hasLoginInfo = utils.judgeLogin()
        if (!hasLoginInfo) {
            //2.没有userInfo和loginInfo那么就授权
            wx.getUserProfile({
                desc: '用户登录授权',
                success: res => {
                    wx.setStorageSync('loginInfo', res)
                },
                fail: err => {
                    console.log("登陆失败")
                    console.log(err)
                }
            })
            return
        }
        else {
            //3。获取用户的输入
            let phoneNumber = this.data.phoneNumber
            let password = this.data.password
            if (phoneNumber == "" || password == "") {
                wx.showToast({
                    title: '请正确输入',
                    icon: 'error',
                    duration: 500
                })
                return
            }
            //4.从缓存中获取登录信息
            let loginInfo = wx.getStorageSync('loginInfo')
            //5.同步请求后台数据
            let response = null
            await utils.showLoading()
            //6.获取code
            let code = null
            await utils.Http.asyncWXLogin(
                res => {
                    code = res.code
                }
            )
            await utils.Http.asyncRequest(
                //'http://127.0.0.1:9005/login',
                'https://www.ngzyq.top/login',
                'GET',
                {
                    code: code,  //临时登录凭证
                    rawData: loginInfo.userInfo,//用户非敏感信息
                    signature: loginInfo.signature,//签名
                    encryptData: loginInfo.encryptedData,//用户敏感信息
                    iv: loginInfo.iv,//解密算法的向量
                    phoneNumber: phoneNumber,
                    password: password
                },
                res => {
                    response = res
                }
            )
            await utils.hideLoading()
            //7.后台执行登录判断，然后解析后台返回的数据
            if (response['data']['code'] == 0) {
                //8.正常返回，缓存用户信息，并跳转到主页
                wx.setStorageSync('userInfo', response['data']['userData'])
                //9.删除用户信息
                wx.removeStorageSync('loginInfo')
                wx.switchTab({
                    url: '/pages/news/news',
                })
            }
            else if (response['data']['code'] == 1) {
                wx.showToast({
                    title: '服务器错误',
                    icon: 'error',
                    duration: 1000
                })
            }
            else if (response['data']['code'] == 2) {
                wx.showToast({
                    title: '手机或密码错误',
                    icon: 'error',
                    duration: 1000
                })
            }
            else if (response['data']['code'] == 3) {
                wx.showToast({
                    title: '用户不存在',
                    icon: 'error',
                    duration: 1000
                })
            }
        }
    },
    register() {
        //1.点击时先判断缓存中有无用户信息
        //let hasUserInfo = utils.judgeUserInfo()
        let hasLoginInfo = utils.judgeLogin()
        if (!hasLoginInfo) {
            //2.没有userInfo和loginInfo那么就授权
            wx.getUserProfile({
                desc: '用户登录授权',
                success: res => {
                    wx.setStorageSync('loginInfo', res)
                },
                fail: err => {
                    console.log("登陆失败")
                    console.log(err)
                }
            })
            return
        }
        else {
            wx.navigateTo({
                url: '/pages/register/register',
            })
        }
    },
    getPhoneNumber(e) {
        this.setData({
            phoneNumber: e.detail.value
        })
    },
    getPassword(e) {
        this.setData({
            password: e.detail.value
        })
        const systemSetting = wx.getSystemSetting()
        console.log(systemSetting.bluetoothEnabled)
        console.log(systemSetting.deviceOrientation)
        console.log(systemSetting.locationEnabled)
        console.log(systemSetting.wifiEnabled)
    },
    testFunction(e){
        const systemSetting = wx.getSystemSetting()
        console.log(systemSetting.bluetoothEnabled)
        console.log(systemSetting.deviceOrientation)
        console.log(systemSetting.locationEnabled)
        console.log(systemSetting.wifiEnabled)
    }
})


