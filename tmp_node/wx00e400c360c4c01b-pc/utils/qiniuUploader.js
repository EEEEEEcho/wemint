!function() {
    function e(e) {
        e.region ? u.qiniuRegion = e.region : console.error("qiniu uploader need your bucket region"), 
        e.uptoken ? u.qiniuUploadToken = e.uptoken : e.uptokenURL ? u.qiniuUploadTokenURL = e.uptokenURL : e.uptokenFunc && (u.qiniuUploadTokenFunction = e.uptokenFunc), 
        e.domain && (u.qiniuImageURLPrefix = e.domain), u.qiniuShouldUseQiniuFileName = e.shouldUseQiniuFileName;
    }
    function n(e, n, i, l, a) {
        if (null == u.qiniuUploadToken && u.qiniuUploadToken.length > 0) console.error("qiniu UploadToken is null, please check the init config or networking"); else {
            var t = o(u.qiniuRegion), r = e.split("//")[1];
            l && l.key && (r = l.key);
            var p = {
                token: u.qiniuUploadToken
            };
            u.qiniuShouldUseQiniuFileName || (p.key = r), wx.uploadFile({
                url: t,
                filePath: e,
                name: "file",
                formData: p,
                success: function(e) {
                    var o = e.data;
                    e.data.hasOwnProperty("type") && "Buffer" === e.data.type && (o = String.fromCharCode.apply(null, e.data.data));
                    try {
                        var l = JSON.parse(o), a = u.qiniuImageURLPrefix + "/" + l.key;
                        l.imageURL = a, console.log(l), n && n(l);
                    } catch (e) {
                        e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                        console.log("parse JSON failed, origin String is: " + o), i && i(e);
                    }
                },
                fail: function(e) {
                    console.error(e), i && i(e);
                }
            }).onProgressUpdate(function(e) {
                a && a(e);
            });
        }
    }
    function i(e) {
        wx.request({
            url: u.qiniuUploadTokenURL,
            success: function(n) {
                var i = n.data.uptoken;
                i && i.length > 0 ? (u.qiniuUploadToken = i, e && e()) : console.error("qiniuUploader cannot get your token, please check the uptokenURL or server");
            },
            fail: function(e) {
                console.error("qiniu UploadToken is null, please check the init config or networking: " + e);
            }
        });
    }
    function o(e) {
        var n = null;
        switch (e) {
          case "ECN":
            n = "https://up.qbox.me";
            break;

          case "NCN":
            n = "https://up-z1.qbox.me";
            break;

          case "SCN":
            n = "https://up-z2.qbox.me";
            break;

          case "NA":
            n = "https://up-na0.qbox.me";
            break;

          case "ASG":
            n = "https://up-as0.qbox.me";
            break;

          default:
            console.error("please make the region is with one of [ECN, SCN, NCN, NA, ASG]");
        }
        return n;
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
        init: function(n) {
            u = {
                qiniuRegion: "",
                qiniuImageURLPrefix: "",
                qiniuUploadToken: "",
                qiniuUploadTokenURL: "",
                qiniuUploadTokenFunction: null,
                qiniuShouldUseQiniuFileName: !1
            }, e(n);
        },
        upload: function(o, l, a, t, r) {
            if (null != o) if (t && e(t), u.qiniuUploadToken) n(o, l, a, t, r); else if (u.qiniuUploadTokenURL) i(function() {
                n(o, l, a, t, r);
            }); else {
                if (!u.qiniuUploadTokenFunction) return void console.error("qiniu uploader need one of [uptoken, uptokenURL, uptokenFunc]");
                if (u.qiniuUploadToken = u.qiniuUploadTokenFunction(), null == u.qiniuUploadToken && u.qiniuUploadToken.length > 0) return void console.error("qiniu UploadTokenFunction result is null, please check the return value");
                n(o, l, a, t, r);
            } else console.error("qiniu uploader need filePath to upload");
        }
    };
}();