Component({
    properties: {
        adData: Object
    },
    attached: function attached() {
        this.setData({
            adID: this.dataset.id
        });
    },
    methods: {
        clickAd: function clickAd() {
            this.triggerEvent("click");
        },
        close: function close() {
            this.triggerEvent("close");
        }
    }
});