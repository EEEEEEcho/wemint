Page({
    data: {
        path: ""
    },
    onLoad: function(t) {
        console.log(t), this.setData({
            path: "https://" + t.path
        });
    }
});