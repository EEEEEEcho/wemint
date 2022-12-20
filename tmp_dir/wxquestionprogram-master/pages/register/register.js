// pages/register/register.js
var utils = require('../../utils/util.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        options: [
            {
                department_id: '001',
                department_name: '充西中心站'
            },
            {
                department_id: '002',
                department_name: '莲池中心站'
            },
            {
                department_id: '003',
                department_name: '广安2中心站'
            },
            {
                department_id: '004',
                department_name: '龙女寺中心站'
            },
            {
                department_id: '005',
                department_name: '生产办'
            },
            {
                department_id: '006',
                department_name: 'QHSE办'
            },
            {
                department_id: '007',
                department_name: '综合办'
            },
        ],
        selected: {}

    },
    change(e) {
        this.setData({
            selected: { ...e.detail }
        })
    },
    close() {
        // 关闭select
        this.selectComponent('#select').close()
    },
    async formSubmit(e) {
        let realName = e.detail.value['realName']
        let phoneNumber = e.detail.value['phoneNumber']
        let department = this.data.selected['name']
        let password = e.detail.value['password']
        let repassword = e.detail.value['repassword']
        let inviteCode = e.detail.value['inviteCode']
        if (realName == "" || realName.length == 0) {
            wx.showToast({
                title: '请填写用户名',
                icon: 'error',
                duration: 1000
            })
            return
        }
        const regu = /^1\d{10}$/;
        if (!regu.test(phoneNumber)) {
            wx.showToast({
                title: '手机号格式非法',
                icon: 'error',
                duration: 1000
            })
            return
        }
        if (department == "所有部门" || department == "" || department == undefined) {
            wx.showToast({
                title: '请选择部门',
                icon: 'error',
                duration: 1000
            })
            return
        }
        if (password.length < 8) {
            wx.showToast({
                title: '密码至少8位',
                icon: 'error',
                duration: 1000
            })
            return
        }
        if (repassword != password) {
            wx.showToast({
                title: '两次密码不一致',
                icon: 'error',
                duration: 1000
            })
            return
        }
        if (inviteCode == "" || inviteCode.length == 0) {
            wx.showToast({
                title: '请填写邀请码',
                icon: 'error',
                duration: 1000
            })
            return
        }
        let loginInfo = wx.getStorageSync('loginInfo')
        await utils.showLoading()
            //6.获取code
        let code = null
        await utils.Http.asyncWXLogin(
            res => {
                code = res.code
            }
        )
        let response = null
        await utils.Http.asyncRequest(
            //'http://127.0.0.1:9005/register',
            'https://www.ngzyq.top/register',
            'POST',
            {
                code: code,  //临时登录凭证
                rawData: loginInfo.userInfo,//用户非敏感信息
                signature: loginInfo.signature,//签名
                encryptData: loginInfo.encryptedData,//用户敏感信息
                iv: loginInfo.iv,//解密算法的向量
                realName: realName,
                phoneNumber:phoneNumber,
                password:password,
                department:department,
                inviteCode: inviteCode
            },
            res => {
                console.log(res)
                response = res
            }
        )
        await utils.hideLoading()
        if(response != null){
            if(response['data']['code'] == 4){
                wx.showToast({
                  title: '邀请码错误',
                  icon:'error',
                  duration:1000
                })
            }
            else if(response['data']['code'] == 5){
                wx.showToast({
                    title: '微信用户已存在',
                    icon:'error',
                    duration:1000
                  })
            }
            else if(response['data']['code'] == 0){
                wx.showToast({
                  title: '注册成功',
                  icon:'success',
                  duration:1000
                })
                setTimeout(()=>{
                    wx.navigateTo({
                      url: '/pages/login/login',
                    })
                },1000);
            }
        }
        else{
            wx.showToast({
                title: '服务器错误',
                icon:'error',
                duration:1000
              })
        }
    },

})