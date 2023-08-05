module.exports = function(t) {
    var e = this;
    this.page = t.page, this.page.currentAddrId = 0, this.app = getApp(), this.onSelected = t.onSelected, 
    this.page.showAddrAddPanel = function(t) {
        e.page.setData({
            showAddrAddPanel: !0
        }), t && t.currentTarget.dataset.isnew && e.page.setData({
            currentAddr: {}
        });
    }, this.page.hideAddrAddPanel = function() {
        e.page.setData({
            showAddrAddPanel: !1
        });
    }, this.page.onAddrRegionChange = function(t) {
        var d = new Array();
        for (var a in t.detail.value) d.push(t.detail.value[a]);
        e.page.setData({
            selectedArea: d.join(",")
        });
    }, this.page.closeCurrentPage = function(t) {
        e.page.data.showAddrAddPanel ? e.page.setData({
            showAddrAddPanel: !e.page.data.showAddrAddPanel
        }) : e.page.setData({
            showAddrManage: !1,
            textareaFlag: !this.data.textareaFlag
        });
    }, this.loadUserAddrList = function(t) {
        e.app.sendRequest({
            url: "/index.php?c=front/Useraddr&a=GetList",
            method: "POST",
            hideLoading: !0,
            success: function(d) {
                if (d.success) {
                    for (var a in d.list) d.list[a].AreaList = d.list[a].ProvinceName + "," + d.list[a].CityName + "," + d.list[a].DistrictName;
                    e.page.setData({
                        userAddrList: d.list
                    }), t && t();
                } else e.app.showModal({
                    title: "提示",
                    content: "操作失败：" + d.msg
                });
            },
            fail: function(t) {
                e.app.showModal({
                    title: "提示",
                    content: "操作失败：" + t
                });
            }
        });
    }, this.findAddrById = function(t) {
        var d = null;
        for (var a in e.page.data.userAddrList) if (e.page.data.userAddrList[a].ID == t) {
            d = e.page.data.userAddrList[a];
            break;
        }
        return d;
    }, this.setCurrentAddrId = function(t) {
        e.page.setData({
            currentAddrId: t
        });
    }, this.setCurrentAddrById = function(t) {
        var d = e.findAddrById(t);
        e.setCurrentAddrId(t), e.onSelected && e.onSelected(d);
    }, this.page.onAddrItemSelected = function(t) {
        var d = t.currentTarget.dataset.addrid;
        e.setCurrentAddrById(d), e.page.setData({
            showAddrManage: !1,
            textareaFlag: !this.data.textareaFlag
        });
    }, this.page.onSetDefaultAddr = function(t) {
        var d = t.currentTarget.dataset.addrid;
        for (var a in e.page.data.userAddrList) e.page.data.userAddrList[a].IsDefault = "0";
        e.findAddrById(d).IsDefault = "1", e.page.setData({
            userAddrList: e.page.data.userAddrList
        }), e.app.sendRequest({
            url: "/index.php?c=front/useraddr&a=setDefaultAddr&addrID=" + d,
            method: "POST",
            hideLoading: !0,
            success: function(t) {
                t.success || e.app.showModal({
                    title: "提示",
                    content: "操作失败：" + t.msg
                });
            },
            fail: function(t) {
                e.app.showModal({
                    title: "提示",
                    content: "操作失败：" + t
                });
            }
        });
    }, this.page.editAddrItem = function(t) {
        var d = t.currentTarget.dataset.addrid, a = e.findAddrById(d);
        e.page.setData({
            currentAddr: a
        }), e.page.showAddrAddPanel();
    }, this.page.delAddrItem = function(t) {
        var d = t.currentTarget.dataset.addrid, a = function() {
            e.app.sendRequest({
                url: "/index.php?c=front/useraddr&a=delete&addrID=" + d,
                method: "POST",
                success: function(t) {
                    t.success ? e.loadUserAddrList(function() {
                        d == e.page.data.currentAddrId && e.setCurrentAddrById(e.page.data.userAddrList[0].ID);
                    }) : e.app.showModal({
                        title: "提示",
                        content: "操作失败：" + t.msg
                    });
                },
                fail: function(t) {
                    e.app.showModal({
                        title: "提示",
                        content: "操作失败：" + t
                    });
                }
            });
        };
        e.app.showModal({
            title: "提示",
            content: "确认删除？",
            showCancel: !0,
            confirm: function() {
                a();
            }
        });
    }, this.page.onAddrEditFormSubmit = function(t) {
        new Array();
        var d = t.detail.value;
        d.RealName ? d.ContactNumber ? 0 != /^((1\d{10})|(\d{3,4}\-\d{6,9}))$/.test(d.ContactNumber) ? d.PostCode && 0 == /^\d{6}$/.test(d.PostCode) ? e.app.showModal({
            title: "提示",
            content: "邮编不正确"
        }) : d.AreaList ? d.Address ? e.app.sendRequest({
            url: "/index.php?c=front/WxApp/ShopApi&a=saveUserAddr",
            method: "POST",
            data: d,
            success: function(t) {
                t.success ? (e.page.setData({
                    showAddrAddPanel: !1
                }), e.loadUserAddrList(function() {
                    d.AddrId == e.page.data.currentAddrId && e.setCurrentAddrById(d.AddrId);
                })) : e.app.showModal({
                    title: "提示",
                    content: "操作失败：" + t.msg
                });
            },
            fail: function(t) {
                e.app.showModal({
                    title: "提示",
                    content: "操作失败：" + t
                });
            }
        }) : e.app.showModal({
            title: "提示",
            content: "请输入详细地址"
        }) : e.app.showModal({
            title: "提示",
            content: "请选择地区"
        }) : e.app.showModal({
            title: "提示",
            content: "电话格式不正确，请填写座机或手机号码，座机格式如 区号-电话号码"
        }) : e.app.showModal({
            title: "提示",
            content: "请输入收货人电话"
        }) : e.app.showModal({
            title: "提示",
            content: "请输入收货人姓名"
        });
    };
};