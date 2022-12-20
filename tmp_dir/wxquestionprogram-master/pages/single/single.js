// pages/single/single.js
//伪造的数据集
//错题集
let errorOptions = []
var utils = require("../../utils/util.js")
//
let questionSelect = ""
Page({

    /**
     * 页面的初始数据
     */
    data: {
        questions:[],
        userSelected: '',
        isChecked: false,
        question: {},
        current: -1,
        precent: 0,
        userScore: 0,
        userError: 0,
        timeConsume: null,//用时
        correctRate: 0, //正确率,
        showAnswer: false,
        total:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //1.监听用户选择的题库
        errorOptions = []
        questionSelect = options.question
        // this.setData({
        //     current: -1
        // })
        // console.log("用户选择的题库是：" + questionSelect)
        this.getQuestions(questionSelect)
        //2.从后台取题库
        
        // wx.request({
        //   url: 'url',
        // })
        // console.log(this.data.questions)
        // let total = this.data.questions.length
        // let question = this.data.questions[0]
        // console.log("question:" + question)
    
        // this.setData({
        //     total: total,
        //     question: question,
        //     timeConsume: Date.now()
        // })
    },

    onUnload: function () {
        this.init()
    },

    async getQuestions(question){
        let that = this
        await utils.showLoading()
        await utils.Http.asyncRequest(
            //'http://127.0.0.1:9005/api/question/exercise',
            'https://www.ngzyq.top/api/question/exercise',
            'GET',
            {
                questionInfo:question
            },
            res => {
                let total = res.data.length
                let question = res.data[0]
                // console.log("question:" + question)
                that.setData({
                    questions:res.data,
                    total: total,
                    question: question,
                    timeConsume: Date.now(),
                    current: 1
                })
            }
        )
        await utils.hideLoading()
    },

    radioChange(e) {
        this.setData({
            userSelected: e.detail.value
        })
    },

    submit() {
        let userSelect = this.data.userSelected
        if (!userSelect) {
            wx.showToast({
                title: '请选择答案',
                icon: 'error',
                duration: 500
            })
            return
        }
        //判断提醒，并判断对错
        if (this.data.question.type === '单选' || this.data.question.type === '判断') {
            if (this.data.question.answer.indexOf(userSelect) >= 0) {
                this.dealRightOption()
            }
            else {
                this.dealErrorOption(userSelect)
            }
        }
        else {
            if (this.data.question.answer.sort().toString() === userSelect.sort().toString()) {
                this.dealRightOption()
            }
            else {
                this.dealErrorOption(userSelect)
            }
        }
        //设置提示，并判断题目是否到了末尾
        setTimeout(() => {
            //这里改了
            let total = this.data.total
            if (this.data.current < total) {
                this.data.current += 1
                //这里改了
                let question = this.data.questions[this.data.current - 1]
                this.setData({
                    current: this.data.current,
                    question: question,
                    isChecked: this.data.isChecked,
                    showAnswer:false,
                    //这里改了
                    precent: ((this.data.current - 1) / this.data.questions.length * 100).toFixed(2)
                })
            }
            //这里改了
            else if (this.data.current == this.data.questions.length) {
                //1.最后一道题了，进行结算
                this.data.current += 1
                //*************练习不需要加分，所以下面逻辑不需要处理了***************
                //2.从缓存中取用户的数据
                // let userInfo = wx.getStorageSync('userInfo')
                //3.加分，并处理rank，level
                // userInfo.score += this.data.userScore
                // let level = userInfo['level']
                // level = utils.makeScoreToLevel(userInfo.score)
                // if (level !== userInfo['level']) {
                //     wx.showModal({
                //         title: '段位升级！',
                //         content: '恭喜您提升至' + level + '段位',
                //     })
                //     userInfo.level = level
                // }
                // let rank = userInfo.rank
                //4.每次做完一轮就要保存用户数据，不能在触发别的事件的时候保存，因为此时，用户点击了关闭，那么本轮答题作废
                // wx.request({
                //     url: 'http://127.0.0.1:8080/api/user/updateScore',
                //     //url: 'http://121.36.64.201:9005/api/user/updateScore',
                //     method: 'POST',
                //     timeout: 2000,
                //     data: {
                //         openId: userInfo['openId'],
                //         level: level,
                //         rank: userInfo['rank'],
                //         score: userInfo['score'],
                //         workType: userInfo['workType'],
                //         department: userInfo['department'],
                //         realName: userInfo['realName']
                //     },
                //     success(res) {
                //         //如果成功了，更新rank值，如果失败了，因为原来保留了rank值，会使用原来的rank值，保持不变
                //         rank = res.data.rank
                //     },
                //     fail(err) {
                //         wx.showToast({
                //             title: '服务器错误',
                //             icon: 'error',
                //             duration: 1000
                //         })
                //         console.log(err)
                //     },
                //     complete(res) {
                //         userInfo.rank = rank
                //         wx.setStorageSync('userInfo', userInfo)
                //     }
                // })
                //*********************************************************************************** */
                //6.展示数据
                this.setData({
                    current: this.data.current,
                    precent: ((this.data.current - 1) / this.data.questions.length * 100).toFixed(2),
                    userScore: this.data.userScore,
                    userError: this.data.userError,
                    correctRate: (this.data.userScore / this.data.total).toFixed(2) * 100,
                    timeConsume: utils.timeFormat(((Date.now() - this.data.timeConsume) / 1000))
                })
            }
        }, 200)
    },

    dealRightOption() {
        this.data.userScore += 1
        wx.showToast({
            title: '回答正确',
            icon: 'success',
            duration: 500
        })
        this.setData({
            userSelected: ''
        })
    },

    dealErrorOption(userSelect) {
        this.data.userError += 1
        wx.showToast({
            title: '回答错误',
            icon: 'error',
            duration: 500
        })
        this.setData({
            userSelected: ''
        })
        //设置错题集
        //获取当前错题
        let wrong = this.data.question
        //给错题对象添加一个 当前用户选择的答案的属性
        wrong.userSelect = userSelect
        //console.log(wrong)
        //添加到错题集
        errorOptions.push(wrong)
    },

    getErrorOptions(event) {
        //跳页之前存数据
        //1.存到本地缓存中，建议、
        wx.setStorageSync('errorOptions', errorOptions)
        wx.navigateTo({
            url: '/pages/error/error',
        })
    },

    showAnswer(){
        this.setData({
            showAnswer: true
        })
    },

    //任何离开答题页面或者重新刷题的页面都需要清理错题并保存用户的数据
    init() {
        //1.清理当前错题
        errorOptions = []
        wx.removeStorageSync('errorOptions')
    },

    redo(event) {
        //1.从后台请求数据
        this.getQuestions(questionSelect)
        //2.设置数据
        this.init()
        // console.log(question)
        this.setData({
            userSelected: '',
            isChecked: false,
            question: {},
            precent: 0,
            userScore: 0,
            userError: 0,
            showAnswer: false
        })
    },

    gotoIndex(event) {
        this.init()
        wx.switchTab({
            url: '/pages/index/index',
        })
    }
})