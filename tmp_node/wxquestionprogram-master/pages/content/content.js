// pages/content/content.js
var utils = require("../../utils/util.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        news:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options.newsId)
        this.getNews(options.newsId)
    },

    async getNews(newsId){
        let that = this
        await utils.showLoading()
        await utils.Http.asyncRequest(
            //'http://127.0.0.1:9005/news/findNewsById',
            'https://www.ngzyq.top/news/findNewsById',
            'GET',
            {
                newsId:newsId
            },
            res => {
                that.setData({
                    news:res.data
                })
            }
        )
        await utils.hideLoading()
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})