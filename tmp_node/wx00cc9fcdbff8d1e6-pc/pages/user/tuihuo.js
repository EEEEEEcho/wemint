var t = getApp();

Page({
    data: {
        orderId: 0,
        reason: "",
        remark: "",
        imgUrl: ""
    },
    onLoad: function(t) {
        this.setData({
            orderId: t.orderId
        });
    },
    submitReturnData: function() {
        if (this.data.remark) {
            var e = this;
            wx.request({
                url: t.d.ceshiUrl + "/Api/Order/orders_edit",
                method: "post",
                data: {
                    id: e.data.orderId,
                    type: "refund",
                    back_remark: e.data.remark
                },
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    1 == t.data.status ? wx.showToast({
                        title: "您的申请已提交审核！",
                        duration: 2e3
                    }) : wx.showToast({
                        title: t.data.err,
                        duration: 2e3
                    });
                }
            });
        } else wx.showToast({
            title: "请填写退款原因",
            icon: "success",
            duration: 2e3
        });
    },
    reasonInput: function(t) {
        this.setData({
            reason: t.detail.value
        });
    },
    remarkInput: function(t) {
        this.setData({
            remark: t.detail.value
        });
    },
    uploadImgs: function() {
        wx.chooseImage({
            success: function(t) {
                console.log(t);
                var e = t.tempFilePaths;
                wx.uploadFile({
                    url: "http://example.weixin.qq.com/upload",
                    filePath: e[0],
                    name: "file",
                    formData: {
                        user: "test"
                    },
                    success: function(t) {
                        t.data;
                    }
                });
            }
        });
    }
});