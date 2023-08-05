Component({
    properties: {},
    data: {},
    methods: {
        clickSearch: function(e) {
            console.log(12312), wx.navigateTo({
                url: "/pages/search/search"
            });
        }
    }
});