var off = false;

//测试？
var appId = "wx000b96cc505e1149";

// 小程序ID
var appSecret = "4579a764b80cbaae00af69144e59b725";

// 小程序secret
var app_key_ald = "3c66a7c25985b2dfa825d47f6e178cc3";

//阿拉丁统计ID
var app_key = "";

//请在此行填写从广告后台获取的媒体ID
var banner = "";

//banner 广告
var insert = "";

//insert广告
var fixed = "";

//悬浮广告
var appName = "fenbijiaoshizhengban";

//app标签
var appNameStr = "粉笔教师正版";

//名称
var ppbaseDomain = off ? "http://zhihuankeji.s1.natapp.cc/wechat" : "https://newswx.zhihuangongshe.com/wechat";

module.exports = {
    //图片站的配置
    baseDomain: "https://newswx.zhihuangongshe.com/weixinimg/",
    //泡泡游戏的配置 
    ppbaseDomain: ppbaseDomain,
    appId: appId,
    //appid 当前小程序的APPid wxaaad611de9bb6897
    appsign: appName,
    //泡泡游戏的app标签
    appName: appName,
    //图片站的APP标签
    appNameStr: appNameStr,
    //应用中文名称
    defaultpage: "0",
    //图片站的配置
    app_key: app_key,
    //请在此行填写从广告后台获取的媒体ID。
    // 默认为 '/pages/xmadH5/xmadH5'(wepy框架下为/pages/xmadH5)，如果您未使用小程序的默认目录结构请告诉我们xmadH5页面的路径
    h5_path: "",
    // 小程序ID wx96dface677f1001e
    AppID: appId,
    // 小程序secret 3147aa24f4fca890e6ca1b22a272fbb9
    AppSecret: appSecret,
    banner: banner,
    insert: insert,
    fixed: fixed,
    app_key_ald: app_key_ald,
    //请在此行填写从阿拉丁后台获取的appkey
    plugin: false,
    //您的小程序中是否使用了插件。
    getLocation: false,
    //默认不获取用户坐标位置
    appid: appId,
    //用于用户登录、微信转发群信息、二维码等微信官方功能
    appsecret: appSecret,
    //用于用户登录、微信转发群信息、二维码等微信官方功能
    defaultPath: "pages/main/main"
};