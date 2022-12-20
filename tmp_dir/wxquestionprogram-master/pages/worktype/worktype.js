// pages/worktype/worktype.js
var utils = require('../../utils/util.js')
var workTypeList = []
Page({

    /**
     * 页面的初始数据
     */
    data: {
        items: [],
        selected: -1,
    },

    onLoad: function () {
        this.initData()
    },

    async initData() {
        await utils.showLoading()
        await utils.Http.asyncRequest(
            //'http://127.0.0.1:9005/api/worktype/getAll',
            'https://www.ngzyq.top/api/worktype/getAll',
            'GET',
            {
            },
            res => {
                this.setData({
                    items: res.data
                })
            }
        )
        await utils.hideLoading()
    },

    radioChange: function (e) {

        var items = this.data.items;
        var selected = 0;
        for (var i = 0; i < items.length; ++i) {
            items[i].checked = items[i].type == e.detail.value
            if (items[i].checked) {
                selected = i
            }
        }
        this.setData({
            items: items,
            selected: selected
        });
    },

    submit() {
        //获取选中的工种
        var items = this.data.items;
        var selected = this.data.selected;
        var selectedValue = items[selected].name
        //在缓存中，缓存一份。同时将userInfo中的工种信息更新
        let userInfo = wx.getStorageSync('userInfo')
        userInfo['workType'] = selectedValue
        wx.setStorageSync('userInfo', userInfo)
        wx.navigateTo({
            url: '/pages/questionlist/questionlist',
        })
    }
})