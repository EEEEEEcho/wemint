// pages/single/single.js
//错题集
let errorOptions = []
var utils = require("../../utils/util.js")
var total_micro_second = 1800 //30 * 100;
let questionSelect = ""
/* 毫秒级倒计时 */
function count_down(that) {
        // 渲染倒计时时钟
        that.setData({
                clock: date_format(total_micro_second)
        });

        if (total_micro_second <= 0) {
                that.setData({
                        clock: "已经截止",
                        isNotEnd: false
                });
                that.dealEnd()
                // timeout则跳出递归
                return;
        }
        setTimeout(function () {
                // 放在最后--
                //total_micro_second -= 100;
                total_micro_second -= 1;
                count_down(that);
        }
                , 1000)
}

// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
// function date_format(micro_second) {
//         // 秒数
//         var second = Math.floor(micro_second / 1000);
//         console.log("总秒数：" + second )
//         // 小时位
//         var hr = Math.floor(second / 3600);
//         console.log("小时数:" + hr)
//         // 分钟位
//         var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
//         console.log("分钟数:" + min)
//         // 秒位
//         var sec = fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
//         console.log("秒位:" + sec)
//         // 毫秒位，保留2位
//         //var micro_sec = fill_zero_prefix(Math.floor((micro_second % 1000) / 10));
//         var micro_sec = fill_zero_prefix(Math.floor((micro_second % 1000) / 10));
//         console.log("毫秒位:" + micro_sec)
//         //return hr + ":" + min + ":" + sec + " " + micro_sec;
//         return min + ":" + sec + ":" + micro_sec;
// }

function date_format(micro_second){
        let minute = micro_second / 60;
        let seconds = micro_second % 60;
        return "00:" + parseInt(minute) + ":" + fill_zero_prefix(seconds);
}

// 位数不足补零
function fill_zero_prefix(num) {
        return num < 10 ? "0" + num : num
}

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
                isNotEnd: true,
                correctRate: 0, //正确率,
                timeConsume: null,//用时,
                total:0
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
                this.setData({
                        isNotEnd: true
                })
                //1.监听用户选择的题库
                errorOptions = []
                //console.log("用户选择的题库是：" + options.question)
                questionSelect = options.question
                //2.后台取题库，并初始化数据
                this.getQuestions(questionSelect)
                //3.设置时间种子，开始倒计时
                total_micro_second = 1800
                count_down(this)
        },

        onUnload: function () {
                this.init()
        },

        async getQuestions(question){
                let that = this
                await utils.showLoading()
                await utils.Http.asyncRequest(
                    'https://www.ngzyq.top/api/question/exercise',
                    //'http://127.0.0.1:9005/api/question/exercise',
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
                        let total = this.data.total
                        if (this.data.current < total) {
                                this.data.current += 1
                                let question = this.data.questions[this.data.current - 1]
                                this.setData({
                                        current: this.data.current,
                                        question: question,
                                        isChecked: this.data.isChecked,
                                        precent: ((this.data.current - 1) / this.data.questions.length * 100).toFixed(2)
                                })
                        }
                        else if (this.data.current == this.data.questions.length) {
                                this.data.current += 1;
                                total_micro_second  = 0;
                                // this.dealEnd(false)
                        }
                }, 500)
        },

        earlySubmit() {
                total_micro_second = 0;
        },

        dealEnd() {
                //1.进行结算
                // if (!countEnd) {
                //         this.data.current += 1
                // }

                //2.从缓存中取用户的数据
                let userInfo = wx.getStorageSync('userInfo')
                //3.加分，并处理rank，level
                userInfo.score += this.data.userScore
                let level = userInfo['level']
                level = utils.makeScoreToLevel(userInfo.score)
                if (level !== userInfo['level']) {
                        wx.showModal({
                                title: '段位升级！',
                                content: '恭喜您提升至' + level + '段位',
                        })
                        userInfo.level = level
                }
                let rank = userInfo.rank
                let totalRank = userInfo.totalRank
                //4.每次做完一轮就要保存用户数据，不能在触发别的事件的时候保存，因为此时，用户点击了关闭，那么本轮答题作废
                wx.request({
                        //url: 'http://127.0.0.1:9005/api/user/updateScore',
                        url: 'https://www.ngzyq.top/api/user/updateScore',
                        method: 'POST',
                        timeout: 2000,
                        data: {
                                openId: userInfo['openId'],
                                level: level,
                                rank: userInfo['rank'],
                                score: userInfo['score'],
                                workType: userInfo['workType'],
                                department: userInfo['department'],
                                realName: userInfo['realName']
                        },
                        success(res) {
                                //如果成功了，更新rank值，如果失败了，因为原来保留了rank值，会使用原来的rank值，保持不变
                                rank = res.data.rank
                                totalRank = res.data.totalRank
                        },
                        fail(err) {
                                wx.showToast({
                                        title: '服务器错误',
                                        icon: 'error',
                                        duration: 1000
                                })
                                console.log(err)
                        },
                        complete(res) {
                                userInfo.rank = rank
                                userInfo.totalRank = totalRank
                                wx.setStorageSync('userInfo', userInfo)
                        }
                })
                // console.log("开始时间：" + this.data.timeConsume)
                //6.展示数据
                this.setData({
                        current: this.data.current,
                        precent: ((this.data.current - 1) / this.data.questions.length * 100).toFixed(2),
                        userScore: this.data.userScore,
                        userError: this.data.userError,
                        //todo：这里有问题
                        // correctRate: (this.data.userScore / (this.data.current - 1 == 0 ? 1 : this.data.current - 1)).toFixed(2) * 100,
                        correctRate: (this.data.userScore / this.data.total).toFixed(2) * 100,
                        timeConsume: utils.timeFormat(((Date.now() - this.data.timeConsume ) / 1000))
                })
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
                // console.log(wrong)
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
                        // question: {},
                        precent: 0,
                        userScore: 0,
                        userError: 0,
                        isNotEnd: true
                })
                total_micro_second = 1800//30 * 100;
                count_down(this)
        },

        gotoIndex(event) {
                this.init()
                wx.switchTab({
                        url: '/pages/index/index',
                })
        },
})
