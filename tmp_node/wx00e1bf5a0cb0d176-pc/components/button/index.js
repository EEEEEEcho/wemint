Component({
    properties: {
        size: {
            type: String,
            value: "middle"
        },
        type: {
            type: String,
            value: "solidcore",
            observer: function(e, t) {
                this.gettinct();
            }
        },
        loading: {
            type: Boolean,
            value: !1
        },
        formType: {
            type: String,
            value: ""
        },
        openType: {
            type: String,
            value: ""
        },
        disabled: {
            type: Boolean,
            value: !1
        },
        lang: {
            type: String,
            value: ""
        },
        hoverClass: {
            type: String,
            value: "button-hover"
        },
        hoverStopPropagation: {
            type: Boolean,
            value: !1
        },
        hoverStartTime: {
            type: Number,
            value: 20
        },
        hoverStayTime: {
            type: Number,
            value: 70
        },
        sessionFrom: {
            type: String,
            value: ""
        },
        sendMessageTitle: {
            type: String,
            value: ""
        },
        sendMessagePath: {
            type: String,
            value: ""
        },
        sendMessageImg: {
            type: String,
            value: ""
        },
        appParameter: {
            type: String,
            value: ""
        }
    },
    externalClasses: [ "custom-class" ],
    data: {
        hue: "whiteness main-bg size28"
    },
    methods: {
        gettinct: function() {
            var e = {
                hollow: "main-color border",
                lucency: "secondary-bg main-color border",
                solidcore: " whiteness main-bg",
                circle: "whiteness main-bg"
            }[this.data.type];
            console.log(this.data.type), this.setData({
                hue: e
            });
        },
        bindgetuserinfo: function(e) {
            this.triggerEvent("bindgetuserinfo", e);
        },
        bindcontact: function(e) {
            this.triggerEvent("bindcontact", e);
        },
        binderror: function(e) {
            this.triggerEvent("binderror", e);
        },
        bindopensetting: function(e) {
            this.triggerEvent("bindopensetting", e);
        }
    }
});