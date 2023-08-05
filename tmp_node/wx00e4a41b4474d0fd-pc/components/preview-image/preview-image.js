Component({
    properties: {
        src: {
            type: String,
            value: ""
        },
        class: {
            type: String,
            value: ""
        },
        mode: {
            type: String,
            value: ""
        }
    },
    methods: {
        attached: function() {},
        onPreview: function() {
            var e = this.properties.src;
            wx.previewImage({
                urls: [ e ],
                current: e
            });
        }
    }
});