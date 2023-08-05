Component({
    properties: {
        showCase: {
            type: Boolean
        },
        rechargeCase: {
            type: Object
        }
    },
    data: {},
    methods: {
        hideRechargeCase: function(e) {
            this.setData({
                showCase: !1
            });
            var a = {
                val: this.data.showCase
            };
            this.triggerEvent("hideRechargeCase", a);
        }
    }
});