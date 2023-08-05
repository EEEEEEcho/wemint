module.exports = {
    imageUtil: function(i) {
        var t = {}, e = i.detail.width, g = i.detail.height, a = g / e;
        return wx.getSystemInfo({
            success: function(i) {
                var d = i.windowWidth, h = i.windowHeight;
                a < h / d ? (t.imageWidth = d, t.imageHeight = d * g / e) : (t.imageHeight = h, 
                t.imageWidth = h * e / g);
            }
        }), t;
    }
};