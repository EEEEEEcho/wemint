Component({
    properties: {
        contentSrc: {
            type: String,
            value: ""
        },
        hasClose: {
            type: Boolean,
            value: !0
        },
        hasInnerBtn: {
            type: Boolean,
            value: !1
        }
    },
    methods: {
        attached: function() {},
        onClose: function() {
            this.triggerEvent("onclose");
        }
    }
});