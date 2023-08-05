Component({
    properties: {
        messageList: {
            type: Array
        }
    },
    data: {},
    methods: {
        delMessage: function(e) {
            var t = {
                val: e.currentTarget.dataset.msgid
            };
            this.triggerEvent("delMessage", t);
        }
    }
});