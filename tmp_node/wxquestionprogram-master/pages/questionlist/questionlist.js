// pages/questionlist/questionlist.js
var utils = require('../../utils/util.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        questionlist: []
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //1.从缓存中获取用户选择的工种
        let worktype = wx.getStorageSync('userInfo')['workType']
        // console.log(worktype)
        //2.请求后台获取该工种对应的题目列表
        this.initData(worktype)
        // let liberal = [
        //     { name: "语文", value: "chinese" },
        //     { name: "英语", value: "english" }
        // ]
        // let science = [
        //     { name: "数学", value: "math" },
        //     { name: "物理", value: "physics" }
        // ]
        // let none = [
        //     { name: "政治", value: "politics" }
        // ]
        // if (worktype == "liberal") {
        //     this.setData({
        //         questionlist: liberal
        //     })
        // }
        // if (worktype == "science") {
        //     this.setData({
        //         questionlist: science
        //     })
        // }
        // if (worktype == "none") {
        //     this.setData({
        //         questionlist: none
        //     })
        // }
    },
    async initData(worktype) {
        await utils.showLoading()
        await utils.Http.asyncRequest(
            'https://www.ngzyq.top/api/questioninfo/getAll',
            //'http://127.0.0.1:9005/api/questioninfo/getAll',
            'GET',
            {
                workType: worktype
            },
            res => {
                // console.log(res.data)
                this.setData({
                    questionlist: res.data
                })
            }
        )
        await utils.hideLoading()
    },
    chooseList(e) {
        //1.获取选择的题目的标签
        let questions = this.data.questionlist
        // console.log(questions)
        let value = questions[e.currentTarget.id].name
        // console.log("value:" + value)
        //看看选的是哪种答题
        let exerciseType = wx.getStorageSync('choose')
        // wx.removeStorageSync('choose')

        let url = null
        if(exerciseType == 'exercise'){
            url = '/pages/single/single?question=' + value
        }
        else{
            url = '/pages/random/random?question=' + value
        }
        
        wx.navigateTo({
          url: url,
        })
    }
})