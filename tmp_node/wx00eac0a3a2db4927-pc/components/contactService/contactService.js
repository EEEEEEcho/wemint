(0, function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/create")).default)({
    properties: {
        isShowContactService: Boolean
    },
    observers: {
        isShowContactService: function(t) {
            t && this.setData({
                serviceOptions: !0
            });
        }
    },
    data: {
        serviceOptions: !1
    },
    methods: {
        dismissConcatModal: function() {
            var t = this;
            this.setData({
                serviceOptions: !1
            }), setTimeout(function() {
                t.triggerEvent("dismissConcatModal", !1);
            }, 500);
        },
        contactService: function(t) {
            this.triggerEvent("dismissConcatModal", !1);
        }
    }
});