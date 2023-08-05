function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    } else {
        return Array.from(arr);
    }
}

//index.js
var config = require("../../conf.js");

var util = require("../../utils/util.js");

var request = require("../../utils/request.js");

var app = getApp();

Page({
    data: {
        showLoading: false,
        loadingMessage: "",
        showToast: false,
        toastMessage: "",
        imgList: [],
        layoutList: [],
        layoutColumnSize: 3,
        previewing: false,
        previewIndex: 0,
        showingActionsSheet: false,
        inActionImgUrl: "",
        navItems: [],
        navBtnSelectIdx: 0,
        page: 0,
        mid: "",
        hasMore: true,
        scrollTop: 1,
        showLoadMore: false,
        longTapTime: 0,
        longTapTag: false
    },
    showLoading: function showLoading(message) {
        this.setData({
            showLoading: true,
            loadingMessage: message
        });
    },
    hideLoading: function hideLoading() {
        this.setData({
            showLoading: false,
            loadingMessage: ""
        });
    },
    showToast: function showToast(toastMessage) {
        this.setData({
            showToast: true,
            toastMessage: toastMessage
        });
    },
    hideToast: function hideToast() {
        this.setData({
            showToast: false,
            toastMessage: ""
        });
    },
    renderImgList: function renderImgList() {
        var layoutColumnSize = this.data.layoutColumnSize;
        var layoutList = [];
        if (this.data.imgList.length) {
            layoutList = util.matrixArr(this.data.imgList, layoutColumnSize);
            var lastRow = layoutList[layoutList.length - 1];
            if (lastRow.length < layoutColumnSize) {
                var supplement = Array(layoutColumnSize - lastRow.length).fill(0);
                lastRow.push.apply(lastRow, _toConsumableArray(supplement));
            }
        }
        this.setData({
            layoutList: layoutList
        });
    },
    fetchTags: function fetchTags() {
        this.showLoading("加载中...");
        return request({
            method: "GET",
            url: util.getUrl("img/findImgClassify", [ {
                appName: config.appName
            } ])
        });
    },
    fetchImgs: function fetchImgs(cid) {
        this.showLoading("加载中...");
        if (cid == null) {
            cid = config.defaultpage;
        }
        return request({
            method: "GET",
            url: util.getUrl("img/findImgByClassifyID", [ {
                classifyID: cid
            }, {
                pageNum: this.data.page
            }, {
                appName: config.appName
            } ])
        });
    },
    showPreview: function showPreview(event) {
        console.log(this.data.imgList);
        if (this.data.showActionsSheet) {
            return;
        }
        var index = event.target.dataset.index;
        console.log(index);
        if (index > this.data.imgList.length - 1) {
            return;
        }
        var previewIndex = this.data.imgList[index];
        console.log(previewIndex);
        this.setData({
            previewing: true,
            previewIndex: index
        });
    },
    dismissPreview: function dismissPreview() {
        if (this.data.showingActionsSheet) {
            return;
        }
        this.setData({
            previewing: false,
            previewIndex: 0
        });
    },
    dismissActionSheet: function dismissActionSheet() {
        this.setData({
            showingActionsSheet: false,
            inActionImgUrl: ""
        });
    },
    showActionSheet: function showActionSheet(event) {
        console.log(event);
        this.setData({
            showLoadMore: true,
            showingActionsSheet: true,
            inActionImgUrl: event.target.dataset.imgurl
        });
    },
    collectImage: function collectImage() {
        var that = this;
        console.log(this.data.inActionImgUrl);
        wx.getSystemInfo({
            success: function success(res) {
                var phone = res.model + "-" + res.pixelRatio + "-" + res.screenWidth + "-" + res.screenHeight + "-" + res.system;
                wx.request({
                    url: config.baseDomain + "/img/insertImgCollect",
                    data: {
                        phoneName: phone,
                        imgCollect: that.data.inActionImgUrl,
                        apppName: config.appName
                    },
                    success: function success(res) {
                        console.info();
                        if (res.data == 1) {
                            that.showToast("收藏成功");
                        } else {
                            that.showToast("收藏失败");
                        }
                    }
                });
            }
        });
        this.setData({
            showingActionsSheet: false,
            inActionImgUrl: ""
        });
    },
    saveImage: function saveImage() {
        var that = this;
        this.showLoading("保存图片中...");
        console.log("download_image_url", this.data.inActionImgUrl);
        wx.getSystemInfo({
            success: function success(res) {
                var phone = res.model + "-" + res.pixelRatio + "-" + res.screenWidth + "-" + res.screenHeight + "-" + res.system;
                wx.request({
                    url: config.baseDomain + "/img/insertDownLoadImg",
                    data: {
                        downloadPhone: phone,
                        downloadImage: that.data.inActionImgUrl,
                        appName: config.appName
                    },
                    success: function success(res) {}
                });
            }
        });
        console.log("图片保存操作开始");
        wx.downloadFile({
            url: this.data.inActionImgUrl,
            type: "image",
            success: function success(resp) {
                console.log("保存");
                var path = resp.tempFilePath;
                wx.saveFile({
                    tempFilePath: path,
                    success: function success(resp) {
                        that.showToast("保存成功...");
                    },
                    fail: function fail(resp) {
                        console.log("失败");
                    },
                    complete: function complete(resp) {
                        that.hideLoading();
                    }
                });
            },
            fail: function fail(_fail) {
                that.hideLoading();
                console.log(_fail);
            }
        });
        this.setData({
            showingActionsSheet: false,
            inActionImgUrl: ""
        });
    },
    // scroll(e) {
    //     this.setData({ scrollTop: e.detail.scrollTop});
    // },
    navItemTap: function navItemTap(e) {
        var _this = this;
        this.setData({
            scrollTop: -39
        });
        var index = e.target.dataset.index;
        var cid = e.target.dataset.cid;
        if (index != this.navBtnSelectIdx) {
            this.setData({
                navBtnSelectIdx: index,
                page: 0
            });
            this.fetchImgs(cid).then(function(resp) {
                _this.imgRespHandler(resp, true);
            });
        }
    },
    imgRespHandler: function imgRespHandler(resp, flush) {
        this.hideLoading();
        if (resp.code != 0) {
            this.showToast("加载失败...");
            this.setData({
                page: this.data.page--
            });
            return;
        }
        if (util.isEmpty(resp.data)) {
            this.setData({
                hasMore: false
            });
            this.showToast("全部加载完毕...");
            this.setData({
                page: this.data.page--
            });
            return;
        }
        this.showToast("加载成功...");
        for (var index in resp.data) {
            resp.data[index].imgUrl = util.imgUrlFix(resp.data[index].imgUrl);
            resp.data[index].thumbSrc = util.imgUrlFix(resp.data[index].thumbSrc);
            resp.data[index].smallSrc = util.imgUrlFix(resp.data[index].smallSrc);
        }
        this.setData({
            imgList: flush ? resp.data : this.data.imgList.concat(resp.data)
        });
        this.renderImgList();
    },
    onPullDownRefresh: function onPullDownRefresh() {
        this.loadImgData(true);
    },
    loadMoreEvent: function loadMoreEvent() {
        this.setData({
            showLoadMore: true,
            page: this.data.page + 1
        });
        this.loadImgData(false);
    },
    loadImgData: function loadImgData(flush) {
        var _this2 = this;
        var cid;
        console.info(this.data.navItems);
        if (!util.isEmpty(this.data.navItems)) {
            cid = this.data.navItems[this.data.navBtnSelectIdx].cid;
        }
        console.info(cid);
        this.fetchImgs(cid).then(function(resp) {
            _this2.imgRespHandler(resp, flush);
        });
    },
    loadTagData: function loadTagData() {
        var _this3 = this;
        this.fetchTags().then(function(resp) {
            _this3.hideLoading();
            if (resp.code !== 0) {
                _this3.showToast("加载失败 请重试...");
                return;
            }
            console.log(resp.data);
            _this3.setData({
                navItems: resp.data
            });
            _this3.fetchImgs(resp.data[0].cid).then(function(resp) {
                _this3.imgRespHandler(resp, flush);
            });
            _this3.loadImgData();
        });
    },
    onLoad: function onLoad() {
        this.renderImgList();
        this.loadTagData();
    },
    test: function test(e) {
        // var myDate = new Date();
        // var mytime = myDate.getTime();  
        // this.data.longTapTime = mytime;
        this.data.longTapTag = true;
        var that = this;
        var i = setTimeout(function() {
            if (that.data.longTapTag) {
                that.showActionSheet(e);
                clearInterval(i);
                that.data.longTapTag = false;
            }
        }, 350);
    },
    test2: function test2(e) {
        this.data.longTapTag = false;
        // var myDate = new Date();
        // var mytime = myDate.getTime();  
        // var tms = mytime-this.data.longTapTime;   
        // if(tms>350){
        //   console.log(e)
        //   console.info(e.target.dataset.largeSrc);
        //   this.showActionSheet(e)
        // } 
        }
});