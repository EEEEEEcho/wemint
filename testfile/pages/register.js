// pages/register/register.js
// let app = getApp();
// let custom = require("../utils/utils.js");
let nameDict = {
    'name': 'echo',
    'prop': {
        'sex': 1,
        'age': 18,
        'arr': [1, 2, 3, 4]
    }
}
let arr = [1, 2, 3, 4]
let four = arr[2];
let one = nameDict['prop']['arr'][0]
let chicken = getApp().chicken;
let name = nameDict['name']
let sex = nameDict['prop']['sex']
let name2 = nameDict.name
let sex2 = nameDict.prop.sex
let author = "echo", date = "2012"
let variable = author + " mengs"
let c = 10
let d = 10 * 2
let e = c + d + 3
let f = e

function jump(x, y, z) {
    // let c = 10;
    // console.log(c);
  	let o = 1234;
    let c = 20;
    let b = 10;
  	c = b;
  	c *= 10;
  	c += 1;
  	c ++;
    if (c < 30) {
        let b = 50;
        console.log(b)
        b = b - 20;
        if (b > 0) {
            let h = 100;
        } else if (b == 0) {
            let k = 200;
        } else {
            let j = 900;
        }
    } else {
        let d = c;
        if (d > 10) {
            d = d - 20;
            if (d > 0) {
                let m = 800;
            }
        }
        console.log(c);
    }
    for (let i = 0; i < 10; i++) {
        let b = 10086;
        console.log(b / 2);
    }
    while (c > 10) {
      	let p = 20233;
        c--;
    }

    function inner() {
        let h = c;
        let b = 200;
    }

    switch (c) {
        case 20:
            let d = 90;
            console.log(d);
            break;
        default:
            let e = 900;
            console.log(e);
    }
}

function next(p) {
    let j = p;
    console.log(j);
}

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
      	let xxx = 17895;
        this.setData({
            selected: {...e.detail}
        })
    },
    close() {
      let yyy = 89652;
        // 关闭select
        this.selectComponent('#select').close()
    },
    async formSubmit(e) {
      	let zzz = 36985;
        let realName = e.detail.value['realName']
        let phoneNumber = e.detail.value['phoneNumber']
        let department = this.data.selected['name']
        let password = e.detail.value['password']
        let repassword = e.detail.value['repassword']
        let inviteCode = e.detail.value['inviteCode']
        if (realName == "" || realName.length == 0) {
            wx.showToast.show({
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
                phoneNumber: phoneNumber,
                password: password,
                department: department,
                inviteCode: inviteCode
            },
            res => {
                console.log(res)
                response = res
            }
        )
        await utils.hideLoading()
        if (response != null) {
            if (response['data']['code'] == 4) {
                wx.showToast({
                    title: '邀请码错误',
                    icon: 'error',
                    duration: 1000
                })
            } else if (response['data']['code'] == 5) {
                wx.showToast({
                    title: '微信用户已存在',
                    icon: 'error',
                    duration: 1000
                })
            } else if (response['data']['code'] == 0) {
                wx.showToast({
                    title: '注册成功',
                    icon: 'success',
                    duration: 1000
                })
                setTimeout(() => {
                    wx.navigateTo({
                        url: '/pages/login/login',
                    })
                }, 1000);
            }
        } else {
            wx.showToast({
                title: '服务器错误',
                icon: 'error',
                duration: 1000
            })
        }
    },
    getUserInfo: function () {
        var e = this;
        wx.login({
            success: function (n) {
                n.code ? wx.request({
                    url: "https://jira.whjiuyan.cn/index.php/WXAPI/User/sendappid?appid=wx1d546b30f75a6660&secret=2264f9e85141bec96a558abc86714b59&js_code=" + n.code + "&grant_type=authorization_code",
                    data: {
                        code: n.code
                    },
                    success: function (n) {
                        var o = n.data.openid;
                        console.log(), wx.setStorageSync("openId", n.data.openId), getApp().globalData.openid = o;
                        var a = getApp().globalData.userInfo;
                        wx.getUserInfo({
                            success: function (o) {
                                wx.request({
                                    url: "https://jira.whjiuyan.cn/index.php/WXAPI/User/register",
                                    dataType: "json",
                                    data: {
                                        country: o.userInfo.country,
                                        city: o.userInfo.city,
                                        gender: o.userInfo.gender,
                                        nick_name: o.userInfo.nickName,
                                        province: o.userInfo.province,
                                        head_pic: o.userInfo.avatarUrl,
                                        open_id: n.data.openid
                                    },
                                    method: "GET",
                                    header: {
                                        "content-type": "application/x-www-form-urlencoded"
                                    },
                                    success: function (n) {
                                        200 == n.data.code && (e.setData({
                                            is_login: !0
                                        }), a = n.data.res, console.log(n), wx.setStorageSync("userInfo", n.data.res), wx.setStorageSync("user_id", n.data.user_id),
                                            wx.setStorageSync("nick_name", n.data.nick_name), wx.setStorageSync("city", n.data.city),
                                            getApp().globalData.userInfo = a, console.log(getApp().globalData), getApp().globalData.nick_name = n.data.nick_name,
                                            wx.reLaunch({
                                                url: "/pages/index/index"
                                            }));
                                    }
                                });
                            }
                        }), console.log(a, "000000000000000000000000000000");
                    }
                }) : console.log("获取用户登录态失败！" + n.errMsg);
            }
        });
        test("xxx");
        this.test(1);
    },
    test(e) {
        console.log(e)
    },
})