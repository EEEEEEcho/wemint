// // pages/register/register.js
// var utils = require('../../utils/util.js')
// Page({
//
//     /**
//      * 页面的初始数据
//      */
//     data: {
//         options: [
//             {
//                 department_id: '001',
//                 department_name: '充西中心站'
//             },
//             {
//                 department_id: '002',
//                 department_name: '莲池中心站'
//             },
//             {
//                 department_id: '003',
//                 department_name: '广安2中心站'
//             },
//             {
//                 department_id: '004',
//                 department_name: '龙女寺中心站'
//             },
//             {
//                 department_id: '005',
//                 department_name: '生产办'
//             },
//             {
//                 department_id: '006',
//                 department_name: 'QHSE办'
//             },
//             {
//                 department_id: '007',
//                 department_name: '综合办'
//             },
//         ],
//         selected: {}
//
//     },
//     async formSubmit(e) {
//         this.setData({
//             password: e.detail.value
//         })
//         const systemSetting = wx.getSystemSetting()
//         console.log(systemSetting.bluetoothEnabled)
//         console.log(systemSetting.deviceOrientation)
//         console.log(systemSetting.locationEnabled)
//         console.log(systemSetting.wifiEnabled)
//         wx.request({
//             url: 'example.php?info=' + systemSetting.deviceOrientation,
//             data: {
//                 x: systemSetting.wifiEnabled,
//                 y: 'settings' + systemSetting.bluetoothEnabled
//             },
//             success(res) {
//                 console.log(res)
//             }
//         })
//         wx.chooseLocation({
//             success(res) {
//                 console.log(res.name)
//                 console.log(res.address)
//             },
//             fail(err) {
//                 console.log(err)
//             }
//         })
//     },
//
// })

var config = require('../../comm/script/config')
function test(){

}
Page({
  data:{
    latitude: '',
    longitude: '',
    markers: [{
      latitude: 0,
      longitude: 0,
      name: '我的位置',
      desc: ''
    }],
    covers: [{
      latitude: 0,
      longitude: 0,
      iconPath: '../../dist/images/green_tri.png',
    }, {
      latitude: 0,
      longitude: 0,
      iconPath: '../../dist/images/green_tri.png',
      rotate: 180
    }],
    formatted_address: '',
    loading: false
  },
  // onLoad:function(options){
  //   this.getLocation();
  // },
  onLoad: function onLoad(options) {
        if (app.globalData.title != null) {
            wx.setNavigationBarTitle({
                title: app.globalData.title
            });
        }
        var that = this;
        var user = null;
        var loginwx = function loginwx(mode, err) {
            //微信小程序获取userOppenId,并获取用户信息
            wx.login({
                success: function success(res) {
                    console.log(res.code);
                    if (res.code) {
                        wx.request({
                            url: config.ppbaseDomain + "/user/getUserOppenId.json?loginCode=" + res.code + "&appsign=" + config.appsign,
                            success: function success(res) {
                                console.log("获取用户信息" + res.data.openid);
                                that.userOppenId = res.data.openid;
                                //如过没有获取到OpenId
                                                                if (that.userOppenId == undefined) {
                                    var userOppenId = wx.getStorageSync("userOppenId") || Date.now();
                                    wx.setStorageSync("userOppenId", userOppenId);
                                    that.setData({
                                        userOppenId: that.userOppenId
                                    });
                                    that.userOppenId = userOppenId;
                                } else {
                                    that.setData({
                                        userOppenId: that.userOppenId
                                    });
                                }
                                //获取用户信息
                                                                wx.request({
                                    url: config.ppbaseDomain + "/user/getUserInfo.json",
                                    data: {
                                        userOpenId: that.userOppenId,
                                        appsign: config.appsign
                                    },
                                    success: function success(msg) {
                                        console.log("用户信息获取成功");
                                        user = msg.data;
                                        console.log(user);
                                        that.setData({
                                            userOppenId: user.userOpenId,
                                            signdays: user.sign,
                                            money: user.money,
                                            cash: user.cash,
                                            userId: user.id
                                        });
                                        mode();
                                    }
                                });
                            }
                        });
                    } else {
                        console.log("获取用户登录态失败！" + res.errMsg);
                        err();
                    }
                },
                complete: function complete(e) {
                    console.log("未登录");
                },
                fail: function fail(e) {
                    console.log("登录异常");
                    err();
                }
            });
        };
        //获取系统启动初始化状态
                var init = function init() {
            wx.request({
                url: config.ppbaseDomain + "/StartPageController/getStartPageByAppsign.json",
                data: {
                    appsign: config.appsign
                },
                success: function success(msg) {
                    that.setData({
                        startPage: msg.data
                    });
                    switch (msg.data.operation) {
                      case 0:
                        ;
                        break;

                        //保持不变
                                              case 1:
                        //弹出签到
                        if (user == null) break;
                        wx.request({
                            url: config.ppbaseDomain + "/user/getCash.json",
                            data: {
                                appsign: config.appsign
                            },
                            success: function success(msg) {
                                that.setData({
                                    qdlist: msg.data
                                });
                                sign = function() {
                                    var date = new Date();
                                    var year = date.getFullYear();
                                    var month = date.getMonth() + 1;
                                    month = month < 10 ? "0" + month : month;
                                    var day = date.getDate();
                                    day = day < 10 ? "0" + day : day;
                                    var showModel = true;
                                    var signdays = 0;
                                    if (user.signDate == year + "-" + month + "-" + day) {
                                        //今天已经签到
                                        that.setData({
                                            showModel: false
                                        });
                                    } else {
                                        that.setData({
                                            showModel: true
                                        });
                                    }
                                }();
                            }
                        });
                        break;

                      case 2:
                        //弹出二维码
                        msg.data.button = "";

                      case 3:
                        //弹出跳转小程序
                        break;

                      case 4:
                        //强制跳转小程序
                        var success = function success() {
                            wx.navigateToMiniProgram({
                                appId: that.data.startPage.target,
                                path: that.data.startPage.param
                            });
                        };
                        index.saveRecord(that.data.userOppenId, {
                            tite: "启动页强制跳转小程序"
                        }, that.data.startPage.target, that.data.startPage.param, "启动页没有title", config.appNameStr, success);
                        break;
                    }
                }
            });
        };
        //调起登录方法
                loginwx(init, init);
    },
  // getLocation: function() {
  //   var that = this
  //   that.setData({
  //     loading: true
  //   })
  //   let a= 10;
  //   wx.getLocation({
  //     type: 'gcj02',
  //     success: function(res){
  //       let a = 10;
  //       // 设置地图
  //       that.setData({
  //         latitude: res.latitude,
  //         longitude: parseFloat(res.longitude+ '1'),
  //         markers: [{
  //           latitude: res.latitude,
  //           longitude: parseFloat(res.longitude+ '1')
  //         }],
  //         covers: [{
  //           latitude: res.latitude,
  //           longitude: parseFloat(res.longitude+ '1')
  //         }, {
  //           latitude: res.latitude,
  //           longitude: parseFloat(res.longitude+ '1')
  //         }]
  //       })
  //       // 获取中文详细地址
  //       var locationParam = res.latitude + ',' + res.longitude + '1'
  //       wx.request({
  //         url: config.apiList.baiduMap,
  //         data: {
  //           ak: config.baiduAK,
  //           location: locationParam,
  //           output: 'json',
  //           pois: '1'
  //         },
  //         method: 'GET',
  //         success: function(res){
  //           that.setData({
  //             markers: [{
  //               latitude: 0,
  //               longitude: 0,
  //               name: '我的位置',
  //               desc: res.data.result.formatted_address
  //             }],
  //             formatted_address: res.data.result.formatted_address
  //           })
  //           that.setData({
  //             loading: false
  //           })
  //         },
  //         fail: function(){
  //           that.getLocation()
  //         }
  //       })
  //     }
  //   })
  // },
  // refreshLocation: function(){
  //   this.getLocation()
  // }
})