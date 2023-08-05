Component({
    properties: {
        couponList: {
            type: Array
        }
    },
    data: {},
    methods: {
        checkCoupon: function(t) {
            var e = {
                val: t.currentTarget.dataset.coupon
            };
            this.triggerEvent("myevent", e);
        }
    }
});