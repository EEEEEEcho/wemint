Component({
    properties: {
        data: {
            type: Object,
            observer: function(t, e) {
                this.data.checkbox = t || [ {
                    value: "未设置值"
                } ], this.setData({
                    items: t
                });
            }
        },
        isRadio: Boolean
    },
    data: {
        checkbox: [ {} ]
    },
    methods: {
        checkbox: function(t) {
            console.log("是否单选", this.data.isRadio);
            var e = [ t.currentTarget.dataset.id, this.data.checkbox ], a = e[0], i = e[1];
            this.data.items[a].checked = !i[a].checked;
            var s = i;
            this.data.isRadio && this.data.items.map(function(t, e) {
                t.checked = a == e;
            }), this.setData({
                items: this.data.items
            }), this.triggerEvent("onCheckbox", s);
        }
    }
});