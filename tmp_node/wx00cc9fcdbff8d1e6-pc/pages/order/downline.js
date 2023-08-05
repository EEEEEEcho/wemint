var a = getApp();

Page({
    data: {
        orderId: 0,
        payBankName: "支付宝",
        payAccountName: "",
        payMethod: "银行转帐",
        payNo: "",
        payRemark: "",
        payBankNameList: [ "支付宝", "中国农业银行", "中国建设银行", "中国银行", "中国工商银行", "兴业银行" ],
        payMethodList: [ "银行转帐", "支付宝" ]
    },
    onLoad: function(a) {
        this.setData({
            orderId: a.orderId
        });
    },
    submitPayInfo: function() {
        var t = this;
        this.data.payNo ? this.data.payAccountName ? wx.request({
            url: a.d.hostUrl + "/ztb/orderZBT/AddpaymentInfo",
            method: "post",
            data: {
                orderId: t.data.orderId,
                payBankName: t.data.payBankName,
                payAccountName: t.data.payAccountName,
                payMethod: t.data.payMethod,
                payNo: t.data.payNo,
                payRemark: t.data.payRemark
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(a) {
                console.log(a);
                var t = a.data;
                console.log(t), wx.showToast({
                    title: t.message,
                    icon: "success",
                    duration: 2e3
                }), "ok" == t.result && wx.navigateTo({
                    url: "/pages/user/dingdan?currentTab=2"
                });
            }
        }) : wx.showToast({
            title: "请输入支付人",
            icon: "success",
            duration: 2e3
        }) : wx.showToast({
            title: "请输入支付流水号",
            icon: "success",
            duration: 2e3
        });
    },
    bindPickerPayBankNameChange: function(a) {
        console.log("picker发送选择改变，携带值为", a.detail.value), this.setData({
            payBankName: this.data.payBankNameList[parseInt(a.detail.value)]
        });
    },
    bindPickerPayMethodChange: function(a) {
        console.log("picker发送选择改变，携带值为", a.detail.value), this.setData({
            payMethod: this.data.payMethodList[parseInt(a.detail.value)]
        });
    },
    bindKeyInputPayNo: function(a) {
        this.setData({
            payNo: a.detail.value
        });
    },
    bindKeyInputPayUser: function(a) {
        this.setData({
            payAccountName: a.detail.value
        });
    }
});