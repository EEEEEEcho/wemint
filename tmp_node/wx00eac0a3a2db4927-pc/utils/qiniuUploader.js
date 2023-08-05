!function() {
    function n(n) {
        n.region ? u.qiniuRegion = n.region : console.error("qiniu uploader need your bucket region"), 
        n.uptoken ? u.qiniuUploadToken = n.uptoken : n.uptokenURL ? u.qiniuUploadTokenURL = n.uptokenURL : n.uptokenFunc && (u.qiniuUploadTokenFunction = n.uptokenFunc), 
        n.domain && (u.qiniuImageURLPrefix = n.domain), u.qiniuShouldUseQiniuFileName = n.shouldUseQiniuFileName;
    }
    function i(n, i, e, l, a, r, t, p) {
        if (null == u.qiniuUploadToken && u.qiniuUploadToken.length > 0) console.error("qiniu UploadToken is null, please check the init config or networking"); else {
            var c = o(u.qiniuRegion), s = n.split("//")[1];
            l && l.key && (s = l.key);
            var k = {
                token: u.qiniuUploadToken
            };
            u.qiniuShouldUseQiniuFileName || (k.key = s), t && t();
            var d = wx.uploadFile({
                url: c,
                filePath: n,
                name: "file",
                formData: k,
                success: function(n) {
                    var o = n.data;
                    try {
                        var l = JSON.parse(o), a = u.qiniuImageURLPrefix + "/" + l.key;
                        l.fileUrl = a, l.imageURL = a, i && i(l);
                    } catch (n) {
                        n = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(n);
                        console.log("parse JSON failed, origin String is: " + o), e && e(n);
                    }
                },
                fail: function(n) {
                    console.error(n), e && e(n);
                },
                complete: function(n) {
                    p && p(n);
                }
            });
            d.onProgressUpdate(function(n) {
                a && a(n);
            }), r && r(function() {
                d.abort();
            });
        }
    }
    function e(n) {
        wx.request({
            url: u.qiniuUploadTokenURL,
            success: function(i) {
                var e = i.data.uptoken;
                e && e.length > 0 ? (u.qiniuUploadToken = e, n && n()) : console.error("qiniuUploader cannot get your token, please check the uptokenURL or server");
            },
            fail: function(n) {
                console.error("qiniu UploadToken is null, please check the init config or networking: " + n);
            }
        });
    }
    function o(n) {
        var i = null;
        switch (n) {
          case "ECN":
            i = "https://up.qiniup.com";
            break;

          case "NCN":
            i = "https://up-z1.qiniup.com";
            break;

          case "SCN":
            i = "https://up-z2.qiniup.com";
            break;

          case "NA":
            i = "https://up-na0.qiniup.com";
            break;

          case "ASG":
            i = "https://up-as0.qiniup.com";
            break;

          default:
            console.error("please make the region is with one of [ECN, SCN, NCN, NA, ASG]");
        }
        return i;
    }
    var u = {
        qiniuRegion: "",
        qiniuImageURLPrefix: "",
        qiniuUploadToken: "",
        qiniuUploadTokenURL: "",
        qiniuUploadTokenFunction: null,
        qiniuShouldUseQiniuFileName: !1
    };
    module.exports = {
        init: function(i) {
            u = {
                qiniuRegion: "",
                qiniuImageURLPrefix: "",
                qiniuUploadToken: "",
                qiniuUploadTokenURL: "",
                qiniuUploadTokenFunction: null,
                qiniuShouldUseQiniuFileName: !1
            }, n(i);
        },
        upload: function(o, l, a, r, t, p, c, s) {
            if (null != o) if (r && n(r), u.qiniuUploadToken) i(o, l, a, r, t, p, c, s); else if (u.qiniuUploadTokenURL) e(function() {
                i(o, l, a, r, t, p, c, s);
            }); else {
                if (!u.qiniuUploadTokenFunction) return void console.error("qiniu uploader need one of [uptoken, uptokenURL, uptokenFunc]");
                if (u.qiniuUploadToken = u.qiniuUploadTokenFunction(), null == u.qiniuUploadToken && u.qiniuUploadToken.length > 0) return void console.error("qiniu UploadTokenFunction result is null, please check the return value");
                i(o, l, a, r, t, p, c, s);
            } else console.error("qiniu uploader need filePath to upload");
        }
    };
}();