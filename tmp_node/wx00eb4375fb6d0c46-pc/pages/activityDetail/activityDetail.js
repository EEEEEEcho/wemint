Page({
    data: {
        type: 1
    },
    onLoad: function(e) {
        this.setData({
            type: e.type
        });
    },
    getCouponFun: function() {
        var e = wx.getStorageSync("user").openId, a = "", c = "";
        switch (console.log(this.data.type), this.data.type) {
          case "1":
            a = "291ab3151135402dad9188103082e63d", c = "c2e7557322534d01a024c7b7c941f007";
            break;

          case "2":
            a = "77a9fc77f4ec4c07b3b3237fc77adfd5", c = "083239887eff4d289da3c7e4f715f109";
            break;

          case "3":
            a = "69d86309e7d94d33aac249840a469314", c = "8ec1d9313f6c454a825bd8aeab19fb02";
            break;

          case "4":
            a = "ea94d59f213b4fc88eb246e500b16ac1", c = "34c29b0ad31f4895b70a662c20b7a40d";
            break;

          case "5":
            a = "0af2908229a142ad8ecfb4d962c69031", c = "6c059f6d15be4b8eafaeef3b8c7250d3";
            break;

          case "6":
            a = "a725fa65fd6f45d5af7b5d1ea19cee70", c = "f800250aa1284c23b89d3dcac28926e3";
        }
        console.log(a), console.log(c), wx.navigateTo({
            url: "/pages/getCoupon/getCoupon?merchantConfigId=" + a + "&smallOpenId=" + e + "&couponsConfigId=" + c
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "探索身边优惠",
            imageUrl: "https://imgs.52wxr.com/upload/image/201901/20190122/1548146339888061576.jpg",
            path: "/page/index/index"
        };
    }
});