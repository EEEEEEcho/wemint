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
  onLoad:function(options){
    this.getLocation();
  },
  getLocation: function() {
    var that = this
    that.setData({
      loading: true
    })
    wx.getLocation({
      type: 'gcj02',
      success: function(res){
        // 设置地图
        that.setData({
          latitude: res.latitude,
          longitude: parseFloat(res.longitude+ '1'),
          markers: [{
            latitude: res.latitude,
            longitude: parseFloat(res.longitude+ '1')
          }],
          covers: [{
            latitude: res.latitude,
            longitude: parseFloat(res.longitude+ '1')
          }, {
            latitude: res.latitude,
            longitude: parseFloat(res.longitude+ '1')
          }]
        })
        // 获取中文详细地址
        var locationParam = res.latitude + ',' + res.longitude + '1'
        wx.request({
          url: config.apiList.baiduMap,
          data: {
            ak: config.baiduAK,
            location: locationParam,
            output: 'json',
            pois: '1'
          },
          method: 'GET',
          success: function(res){
            that.setData({
              markers: [{
                latitude: 0,
                longitude: 0,
                name: '我的位置',
                desc: res.data.result.formatted_address
              }],
              formatted_address: res.data.result.formatted_address
            })
            that.setData({
              loading: false
            })
          },
          fail: function(){
            that.getLocation()
          }
        })
      }
    })
  },
  refreshLocation: function(){
    this.getLocation()
  }
})