Component({
    properties: {
        pageData: {
            type: Object
        }
    },
    data: {
        items: [],
        indicatorDots: !0,
        indicatorColor: "#999",
        indicatorActivecolor: "#fa5c55",
        autoplay: !0,
        interval: 3e3,
        duration: 800
    },
    attached: function() {
        this.setData({
            items: this.data.pageData.Item
        });
    },
    methods: {}
});