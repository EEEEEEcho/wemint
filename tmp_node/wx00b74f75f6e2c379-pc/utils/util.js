function formatTime(date) {
    if (date == undefined) {
        return;
    }
    if (date == "") {
        return;
    }
    date = date.replace(/(\d{4})-(\d{2})-(\d{2})T(.*)?\.(.*)/, "$1/$2/$3 $4");
    date = new Date(date);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return [ year, month, day ].map(formatNumber).join("-") + " " + [ hour, minute, second ].map(formatNumber).join(":");
}

function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : "0" + n;
}

function json2Form(json) {
    var str = [];
    for (var p in json) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
    }
    return str.join("&");
}

module.exports = {
    formatTime: formatTime,
    json2Form: json2Form
};