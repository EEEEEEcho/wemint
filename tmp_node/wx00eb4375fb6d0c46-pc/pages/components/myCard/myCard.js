Component({
    properties: {
        cardList: {
            type: Array
        }
    },
    data: {},
    methods: {
        recharge: function(r) {
            var t = {
                val: r.currentTarget.dataset.cardid
            };
            this.triggerEvent("recharge", t);
        }
    }
});