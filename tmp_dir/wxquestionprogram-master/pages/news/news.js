const app = getApp()
var utils = require("../../utils/util.js")
Page({
    data: {
        isShowAllContent: false,
        navState: 0,//导航状态
        news: [],
        swiperCurrent: 0,
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 3000,
        circular: true,

        // 轮播图
    },
    //监听滑块
    bindchange(e) {
        // console.log(e.detail.current)
        let index = e.detail.current;
        this.setData({
            navState: index
        })
    },
    //点击导航
    navSwitch: function (e) {
        // console.log(e.currentTarget.dataset.index)
        let index = e.currentTarget.dataset.index;
        this.setData({
            navState: index
        })
    },
    //隐藏多余字
    //     showAllAction: function() {
    //     this.setData({
    //       isShowAllContent: !this.data.isShowAllContent
    //     })
    //   },
    //事件处理函数
    onLoad: function () {
        wx.request({
          //url: 'http://127.0.0.1:9005/news/findNoContent',
          url: 'https://www.ngzyq.top/news/findNoContent',
          method:'GET',
          success: (res) => {
              this.setData({
                  news: res.data
              })
          },
          fail: (e)=>{
              console.log(e)
              wx.showModal({
                        title: '错误',
                        content: '服务器错误',
                    })
          }
        })

        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }


        wx.getSystemInfo({
            success: (res) => {
                this.setData({
                    pixelRatio: res.pixelRatio,
                    windowHeight: res.windowHeight,
                    windowWidth: res.windowWidth
                })
            },
        })
    },
    switchNav(event) {
        var cur = event.currentTarget.dataset.current;
        //每个tab选项宽度占1/5
        var singleNavWidth = this.data.windowWidth / 5;
        //tab选项居中                            
        this.setData({
            navScrollLeft: (cur - 2) * singleNavWidth
        })
        if (this.data.currentTab == cur) {
            return false;
        } else {
            this.setData({
                currentTab: cur
            })
        }
    },
    switchTab(event) {
        var cur = event.detail.current;
        var singleNavWidth = this.data.windowWidth / 5;
        this.setData({
            currentTab: cur,
            navScrollLeft: (cur - 2) * singleNavWidth
        });
    },
    // 轮播图
    //轮播图的切换事件
    swiperChange: function (e) {
        let {
            current,
            source
        } = e.detail
        if(source == 'autoplay' || source == 'touch'){
            this.setData({
                swiperCurrent: current
            })
        }
    },
    //点击指示点切换
    chuangEvent: function (e) {
        this.setData({
            swiperCurrent: e.currentTarget.id
        })
    },
    //点击图片触发事件
    swipclick: function (e) {
        // console.log(this.data.swiperCurrent);
        wx.navigateTo({
          url: '/pages/content/content?newsId=' + this.data.news[this.data.swiperCurrent].id,
        })
    },
    opencontent(e) {
        wx.navigateTo({
            url: '/pages/content/content?newsId=' + e.currentTarget.dataset.newsid,
        })
    }
})
