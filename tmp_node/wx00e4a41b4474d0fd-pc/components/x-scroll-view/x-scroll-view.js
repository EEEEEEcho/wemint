Component({
    properties: {
        pullText: {
            type: String,
            value: "下拉可以刷新"
        },
        releaseText: {
            type: String,
            value: "松开立即刷新"
        },
        loadingText: {
            type: String,
            value: "正在刷新数据中"
        },
        finishText: {
            type: String,
            value: "刷新完成"
        },
        loadmoreText: {
            type: String,
            value: "正在加载更多数据"
        },
        nomoreText: {
            type: String,
            value: "已经全部加载完毕"
        },
        pullDownHeight: {
            type: Number,
            value: 60
        },
        refreshing: {
            type: Boolean,
            value: !1,
            observer: "_onRefreshFinished"
        },
        nomore: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        pullDownStatus: 0,
        lastScrollEnd: 0
    },
    methods: {
        _onScroll: function(t) {
            this.triggerEvent("scroll", t.detail);
            var e = this.data.pullDownStatus;
            if (3 !== e && 4 != e) {
                var o = this.properties.pullDownHeight, l = t.detail.scrollTop, s = void 0;
                e != (s = l < -1 * o ? 2 : l < 0 ? 1 : 0) && this.setData({
                    pullDownStatus: s
                });
            }
        },
        _onTouchEnd: function(t) {
            var e = this;
            2 === this.data.pullDownStatus && (this.setData({
                pullDownStatus: 3
            }), this.properties.refreshing = !0, setTimeout(function() {
                e.triggerEvent("pulldownrefresh");
            }, 500));
        },
        _onRefreshFinished: function(t, e) {
            var o = this;
            !0 === e && !1 === t && (this.properties.nomore = !1, this.setData({
                nomore: !1
            }), this.setData({
                pullDownStatus: 4,
                lastScrollEnd: 0
            }), setTimeout(function() {
                o.setData({
                    pullDownStatus: 0
                });
            }, 500));
        },
        _onLoadmore: function() {
            var t = this;
            this.properties.nomore || wx.createSelectorQuery().in(this).select(".scroll-view").fields({
                size: !0,
                scrollOffset: !0
            }, function(e) {
                Math.abs(e.scrollTop - t.data.lastScrollEnd) > e.height && (t.setData({
                    lastScrollEnd: e.scrollTop
                }), t.triggerEvent("loadmore"));
            }).exec();
        }
    }
});