// pages/error/error.js
let errorQuestions = []
Page({

    /**
     * 页面的初始数据
     */
    data: {
        question: null,
        current: 0,
        total: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //1.从本地缓存中取数据
        let errorOptions = wx.getStorageSync('errorOptions')
        if (errorOptions && errorOptions.length > 0) {
            errorQuestions = errorOptions
            this.setData(
                {
                    question: errorQuestions[0],
                    total: errorQuestions.length,
                    current: 0
                }
            )
        }
    },
    submit(event) {
        this.data.current += 1
        if (this.data.current < this.data.total) {
            this.setData(
                {
                    question: errorQuestions[this.data.current],
                    current: this.data.current
                }
            )
        }
        else {
            this.data.current = this.data.total
            wx.showToast({
                title: '已经到底啦',
                icon: 'none',
                duration: 500
            })
        }
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