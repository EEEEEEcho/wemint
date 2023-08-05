// applysendgood.js
var app = getApp();

var config = require("../../utils/config.js");

Page({
    /**
   * 页面的初始数据
   */
    data: {
        ApplySendGood: null,
        ProductName: "",
        formId: "",
        express: "请选择物流公司",
        shipOrderNumber: "",
        IsShowExpress: true,
        ExpressList: [],
        index: 0
    },
    /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function onLoad(options) {
        var that = this;
        var id = options.id;
        var skuId = options.skuId;
        app.getOpenId(function(openid) {
            wx.request({
                url: app.getUrl(app.globalData.getReturnDetail),
                data: {
                    openId: openid,
                    returnId: id
                },
                success: function success(result) {
                    if (result.data.Status == "OK") {
                        var r = result.data.Data;
                        that.setData({
                            ApplySendGood: r
                        });
                    } else if (result.data.Message == "NOUser") {
                        wx.navigateTo({
                            url: "../login/login"
                        });
                    } else {
                        app.showErrorModal(result.data.Message, function(res) {
                            if (res.confirm) {
                                wx.navigateBack({
                                    delta: 1
                                });
                            }
                        });
                    }
                },
                complete: function complete() {
                    that.LoadExpress();
                    //加载物流公司
                                }
            });
        });
    },
    bindPickerChange: function bindPickerChange(e) {
        var that = this;
        var val = e.detail.value;
        var tempexpresslist = that.data.ExpressList;
        that.setData({
            express: tempexpresslist[val]
        });
    },
    ShowExpress: function ShowExpress(e) {
        var that = this;
        if (that.data.ExpressList.length > 0) {
            that.setData({
                IsShowExpress: false
            });
        } else {
            app.showErrorModal("物流公司加载失败");
            return;
        }
    },
    LoadExpress: function LoadExpress() {
        var that = this;
        wx.request({
            url: app.getUrl(app.globalData.getExpressList),
            success: function success(result) {
                if (result.data.Status == "OK") {
                    var temp = new Array();
                    result.data.Data.find(function(item, index) {
                        if (item.ExpressName != undefined) {
                            temp.push(item.ExpressName);
                        }
                    });
                    that.setData({
                        ExpressList: temp
                    });
                }
            }
        });
    },
    formSubmit: function formSubmit(e) {
        var that = this;
        var formId = e.detail.formId;
        if (that.data.express == "请选择物流公司") {
            app.showErrorModal("请选择物流公司");
            return;
        }
        var shipnum = that.ToTrim(e.detail.value.txtshipOrderNumber);
        if (shipnum == null || shipnum == "undefined" || shipnum.length <= 0) {
            app.showErrorModal("快递单号不允许为空");
            return;
        }
        app.getOpenId(function(openid) {
            var para = {
                openId: openid,
                skuId: that.data.ApplySendGood.SkuId,
                orderId: that.data.ApplySendGood.OrderId,
                ReturnsId: that.data.ApplySendGood.ReturnId,
                express: that.data.express,
                shipOrderNumber: shipnum,
                formId: formId
            };
            config.httpPost(app.getUrl(app.globalData.returnSendGoods), para, function(result) {
                if (result.Status == "OK") {
                    wx.showModal({
                        title: "提示",
                        content: result.Message,
                        showCancel: false,
                        success: function success(res) {
                            if (res.confirm) {
                                wx.navigateBack({
                                    delta: 1
                                });
                            }
                        }
                    });
                } else {
                    if (result.Message == "NOUser") {
                        wx.navigateTo({
                            url: "../login/login"
                        });
                    } else {
                        app.showErrorModal(result.ErrorResponse.ErrorMsg, function(res) {
                            if (res.confirm) {
                                wx.navigateBack({
                                    delta: 1
                                });
                            }
                        });
                    }
                }
            });
        });
    },
    ToTrim: function ToTrim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    /**
   * 生命周期函数--监听页面初次渲染完成
   */
    onReady: function onReady() {},
    /**
   * 生命周期函数--监听页面显示
   */
    onShow: function onShow() {},
    /**
   * 生命周期函数--监听页面隐藏
   */
    onHide: function onHide() {},
    /**
   * 生命周期函数--监听页面卸载
   */
    onUnload: function onUnload() {},
    /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
    onPullDownRefresh: function onPullDownRefresh() {},
    /**
   * 页面上拉触底事件的处理函数
   */
    onReachBottom: function onReachBottom() {},
    /**
   * 用户点击右上角分享
   */
    onShareAppMessage: function onShareAppMessage() {}
});