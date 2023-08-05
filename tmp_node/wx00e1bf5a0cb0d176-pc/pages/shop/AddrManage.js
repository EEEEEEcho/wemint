module.exports = function(e) {
    var t = this;
    this.page = e.page, this.page.currentAddrId = 0, this.app = getApp(), this.onSelected = e.onSelected, 
    this.canbeat = !0, this.page.showAddrAddPanel = function(e) {
        if (t.page.setData({
            showAddrAddPanel: !0
        }), e && e.currentTarget.dataset.isnew) {
            var d = t.page.data.userAddrList;
            t.page.setData({
                currentAddr: {
                    IsDefault: d && d.length > 0 ? 0 : "1"
                }
            });
        }
    }, this.page.hideAddrAddPanel = function() {
        wx.removeStorageSync("isEditAddr"), t.page.setData({
            showAddrAddPanel: !1,
            selectedArea: "",
            currentAddr: {}
        });
    }, this.page.onAddrRegionChange = function(e) {
        var d = new Array();
        for (var a in e.detail.value) d.push(e.detail.value[a]);
        t.page.setData({
            selectedArea: d.join(",")
        });
    }, this.page.closeCurrentPage = function(e) {
        t.page.data.showAddrAddPanel ? t.page.setData({
            showAddrAddPanel: !t.page.data.showAddrAddPanel
        }) : t.page.setData({
            showAddrManage: !1,
            textareaFlag: !this.data.textareaFlag
        });
    }, this.loadUserAddrList = function(e, d) {
        t.app.sendRequest({
            url: "/index.php?c=front/Useraddr&a=GetList",
            method: "POST",
            hideLoading: !0,
            success: function(a) {
                if (a.success) {
                    for (var s in a.list) a.list[s].AreaList = a.list[s].ProvinceName + "," + a.list[s].CityName + "," + a.list[s].DistrictName;
                    if (t.page.data.textareaFlag && d) {
                        if (a.list.length > 1) "1" != a.list[0].IsDefault ? 0 !== a.list[0].ID && (r = a.list[0], 
                        t.setCurrentAddrId(a.list[0].ID), t.onSelected && t.onSelected(r)) : 0 !== a.list[1].ID && (r = a.list[1], 
                        t.setCurrentAddrId(a.list[1].ID), t.onSelected && t.onSelected(r)); else {
                            var r = a.list[0];
                            t.setCurrentAddrId(a.list[0].ID), t.onSelected && t.onSelected(r);
                        }
                        t.page.setData({
                            showAddrManage: !1,
                            textareaFlag: !t.page.data.textareaFlag
                        });
                    }
                    t.page.setData({
                        userAddrList: a.list
                    }), e && e();
                } else t.app.showModal({
                    title: "提示",
                    content: a.msg
                });
            },
            fail: function(e) {
                t.app.showModal({
                    title: "提示",
                    content: e
                });
            }
        });
    }, this.findAddrById = function(e) {
        var d = null;
        for (var a in t.page.data.userAddrList) if (t.page.data.userAddrList[a].ID == e) {
            d = t.page.data.userAddrList[a];
            break;
        }
        return d;
    }, this.setCurrentAddrId = function(e) {
        t.page.setData({
            currentAddrId: e
        });
    }, this.setCurrentAddrById = function(e) {
        if (0 !== e) {
            var d = t.findAddrById(e);
            t.setCurrentAddrId(e), t.onSelected && t.onSelected(d);
        } else t.setCurrentAddrId(0);
    }, this.page.onAddrItemSelected = function(e) {
        var d = e.currentTarget.dataset.addrid;
        wx.setStorageSync("addrDefaultId", d), t.setCurrentAddrById(d), t.page.setData({
            showAddrManage: !1,
            textareaFlag: !this.data.textareaFlag
        });
    }, this.page.onSetDefaultAddr = function(e) {
        var d = e.currentTarget.dataset.addrid;
        for (var a in t.page.data.userAddrList) t.page.data.userAddrList[a].IsDefault = "0";
        t.findAddrById(d).IsDefault = "1", t.page.setData({
            userAddrList: t.page.data.userAddrList
        }), t.app.sendRequest({
            url: "/index.php?c=front/useraddr&a=setDefaultAddr&addrID=" + d,
            method: "POST",
            hideLoading: !0,
            success: function(e) {
                e.success || t.app.showModal({
                    title: "提示",
                    content: e.msg
                });
            },
            fail: function(e) {
                t.app.showModal({
                    title: "提示",
                    content: e
                });
            }
        });
    }, this.page.editAddrItem = function(e) {
        wx.setStorageSync("isEditAddr", !0);
        var d = e.currentTarget.dataset.addrid, a = t.findAddrById(d);
        t.page.setData({
            currentAddr: a
        }), t.page.showAddrAddPanel();
    }, this.page.delAddrItem = function(e) {
        var d = e.currentTarget.dataset.addrid, a = function() {
            t.app.sendRequest({
                url: "/index.php?c=front/useraddr&a=delete&addrID=" + d,
                method: "POST",
                success: function(e) {
                    e.success ? t.loadUserAddrList(function() {
                        d == t.page.data.currentAddrId && (0 !== t.page.data.userAddrList.length ? t.setCurrentAddrById(t.page.data.userAddrList[0].ID) : (t.page.setData({
                            defaultAddr: ""
                        }), t.setCurrentAddrById(0)));
                    }) : t.app.showModal({
                        title: "提示",
                        content: e.msg
                    });
                },
                fail: function(e) {
                    t.app.showModal({
                        title: "提示",
                        content: e
                    });
                }
            });
        };
        t.app.showModal({
            title: "提示",
            content: "确认删除？",
            showCancel: !0,
            confirm: function() {
                a();
            }
        });
    }, this.page.onAddrEditFormSubmit = function(e) {
        if (t.canbeat) {
            t.canbeat = !1, new Array();
            var d = e.detail.value;
            return d.RealName ? d.ContactNumber ? 0 == /^((1\d{10})|(\d{3,4}\-\d{6,9}))$/.test(d.ContactNumber) ? (t.app.showModal({
                title: "提示",
                content: "电话格式不正确，请填写座机或手机号码，座机格式如 区号-电话号码"
            }), void setTimeout(function() {
                t.canbeat = !0;
            }, 600)) : d.PostCode && 0 == /^\d{6}$/.test(d.PostCode) ? (t.app.showModal({
                title: "提示",
                content: "邮编不正确"
            }), void setTimeout(function() {
                t.canbeat = !0;
            }, 600)) : d.AreaList ? d.Address ? void t.app.sendRequest({
                url: "/index.php?c=front/WxApp/ShopApi&a=saveUserAddr",
                method: "POST",
                data: d,
                success: function(e) {
                    if (setTimeout(function() {
                        t.canbeat = !0;
                    }, 600), e.success) {
                        t.page.setData({
                            showAddrAddPanel: !1,
                            selectedArea: ""
                        });
                        var a = function() {
                            d.AddrId == t.page.data.currentAddrId && t.setCurrentAddrById(d.AddrId), t.page.setData({
                                currentAddr: ""
                            });
                        };
                        wx.getStorageSync("isEditAddr") ? (wx.removeStorageSync("isEditAddr"), t.loadUserAddrList(a)) : t.loadUserAddrList(a, !0);
                    } else t.app.showModal({
                        title: "提示",
                        content: e.msg
                    });
                },
                fail: function(e) {
                    setTimeout(function() {
                        t.canbeat = !0;
                    }, 600), t.app.showModal({
                        title: "提示",
                        content: e
                    });
                }
            }) : (t.app.showModal({
                title: "提示",
                content: "请输入详细地址"
            }), void setTimeout(function() {
                t.canbeat = !0;
            }, 600)) : (t.app.showModal({
                title: "提示",
                content: "请选择地区"
            }), void setTimeout(function() {
                t.canbeat = !0;
            }, 600)) : (t.app.showModal({
                title: "提示",
                content: "请输入收货人电话"
            }), void setTimeout(function() {
                t.canbeat = !0;
            }, 600)) : (t.app.showModal({
                title: "提示",
                content: "请输入收货人姓名"
            }), void setTimeout(function() {
                t.canbeat = !0;
            }, 600));
        }
    }, this.page.chooseAddress = function(e) {
        wx.chooseAddress ? wx.chooseAddress({
            success: function(e) {
                var d = {
                    RealName: e.userName,
                    ContactNumber: e.telNumber,
                    AreaList: e.provinceName + "," + e.cityName + "," + e.countyName,
                    Address: e.detailInfo,
                    AddrId: ""
                };
                t.app.sendRequest({
                    url: "/index.php?c=front/WxApp/ShopApi&a=saveUserAddr",
                    method: "POST",
                    data: d,
                    success: function(e) {
                        e.success ? (t.page.setData({
                            showAddrAddPanel: !1,
                            selectedArea: ""
                        }), t.loadUserAddrList(function() {
                            d.AddrId == t.page.data.currentAddrId && t.setCurrentAddrById(d.AddrId), t.page.setData({
                                currentAddr: ""
                            });
                        }, !0)) : t.app.showModal({
                            title: "提示",
                            content: e.msg
                        });
                    },
                    fail: function(e) {
                        t.app.showModal({
                            title: "提示",
                            content: e
                        });
                    }
                });
            },
            fail: function(e) {}
        }) : console.log("当前微信版本不支持chooseAddress");
    };
};