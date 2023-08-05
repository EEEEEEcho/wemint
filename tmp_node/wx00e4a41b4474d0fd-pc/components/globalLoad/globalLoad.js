Component({
    properties: {
        text: {
            type: String,
            value: "正在加载中..."
        },
        index: {
            type: Number,
            value: ""
        }
    },
    data: {
        isShow: !1
    },
    methods: {
        hideLoading: function() {
            this.setData({
                isShow: !1
            });
        },
        showLoading: function(t) {
            this.setData({
                text: t || "正在加载中...",
                isShow: !0
            });
        }
    }
});