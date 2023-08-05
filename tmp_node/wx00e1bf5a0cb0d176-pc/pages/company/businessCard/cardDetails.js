var a = getApp(), t = (require("../../../common.js"), require("../../../components/utils/socket.js")), e = require("../../../components/wxb.js");

Page({
    isloading: !1,
    path: "",
    myaudio: "",
    data: {
        pullDownRefreshFlag: !0,
        phoneNum: "",
        shareMarkFlag: !1,
        baseUrl: a.globalData.siteBaseUrl,
        cardcontent: {},
        userID: "",
        cardchoice: "1",
        authorization: 1,
        reminder: "提示",
        matter: "您可以留下您的电话，让我给你提供更好的服务！",
        abrogate: "暂时先不",
        permission: "允许",
        buttonClicked: !1,
        adminID: "",
        businessCardID: "",
        shareUserID: "",
        PostLikesStatus: !1,
        informationAllHiding: !0,
        hiddenLoading: !1,
        incard: !1,
        isOverTime: !1,
        currentTab: 0,
        winHeight: "",
        openDetailFlag: !1,
        isPlay: !1,
        music: {
            playtime: "00:00",
            duration: "00:00",
            percent: 0,
            left: -7
        },
        circleTop: 2,
        havePlayAudio: !1,
        mesCount: 0,
        isShare: !1,
        showGetMobileBtn: !1,
        isFromWorkBench: !1,
        isDynamic: !0,
        dynamicBlank: !1,
        dynamicList: [],
        scrollCurrent: 0,
        pagesize: 10,
        recordcount: 99,
        falgAjax: !0,
        currentIndex: 0,
        showPopFlag: !1,
        showForm: !1,
        commentcontent: "",
        modelType: !0,
        canhold: !0,
        nickName: null,
        avatarUrl: null,
        imgUrls: [],
        indicatorDots: !0,
        autoplay: !0,
        interval: 3e3,
        duration: 1e3,
        isMaterial: !0,
        productPage: "1",
        pageCount: null,
        materialList: [],
        tagNameList: [],
        tagList: [],
        canSave: !0,
        tagNameIndex: "",
        showMaterial: !1,
        materialListStatus1: !0,
        materualFlagOne: !0,
        materualFlagTwo: !0,
        materualFlagThree: !0,
        materualFlagFour: !0,
        showUserInfoFlag: !1,
        messageCount: "",
        haveMessageCount: !1,
        BusinssUserID: "",
        dongtaiStatus: !1,
        AllChatIsReadStatus: !1,
        BusinssCardName: null,
        socketHide: !1,
        socketTimeOut: !0,
        socketlianjie: !1
    },
    onPullDownRefresh: function() {
        var a = this;
        a.data.pullDownRefreshFlag && (a.setData({
            pullDownRefreshFlag: !1
        }), a.data.pullDownRefreshFlag = !1, a.data.optionsObj && (a.data.optionsObj.refresh = !0), 
        setTimeout(function() {
            a.loadData(a.data.optionsObj), a.setData({
                pullDownRefreshFlag: !0
            }), wx.stopPullDownRefresh();
        }, 1500));
    },
    onShow: function(t) {
        var e = this;
        e.myaudio = wx.createInnerAudioContext(), a.compareVersion("2.3.0", wx.getStorageSync("userSystemInfo").SDKVersion) <= 0 && wx.setInnerAudioOption({
            obeyMuteSwitch: !1
        }), a.globalData.cardSocket ? e.listenSocket() : (e.setData({
            socketTimeOut: !1,
            socketlianjie: !0
        }), e.openSocket()), e.setData({
            isPlay: !1,
            "music.playtime": "00:00",
            "music.left": -7,
            "music.percent": 0,
            cellphone: 3
        }), a.doAfterUserInfoAuth({
            success: this.initData,
            fail: this.initData
        }), wx.getStorageSync("editCardSuccessOnMycenter") && e.loadData(), e.data.AllChatIsReadStatus && e.getAllChatIsReadCount(), 
        wx.getSetting({
            success: function(a) {
                "" != wx.getStorageSync("authorize") && "false" == wx.getStorageSync("authorize") && (a.authSetting["scope.writePhotosAlbum"] ? e.setData({
                    canSave: !0
                }) : e.setData({
                    canSave: !1
                }));
            }
        });
    },
    onUnload: function() {
        this.myaudio.destroy(), a.globalData.cardSocket && this.data.isShare && (a.globalData.cardSocket.close(), 
        a.globalData.cardSocket = void 0), this.setData({
            socketTimeOut: !1,
            socketlianjie: !1
        }), this.data.socketHide && (a.globalData.cardSocket = void 0), this.setData({
            havePlayAudio: !1
        });
    },
    onHide: function() {
        this.setData({
            socketTimeOut: !1,
            socketlianjie: !1
        }), this.data.socketHide && (a.globalData.cardSocket = void 0), this.myaudio.destroy();
    },
    initData: function(t) {
        1 == t.isShare || 1 == t.business ? this.setData({
            isShare: !0
        }) : t.scene && this.setData({
            isShare: !0
        });
        var e = this;
        e.setData({
            userID: a.globalData.WebUserID,
            optionsObj: t,
            companyName: a.globalData.baseInfo.Name,
            siteLogo: a.globalData.baseInfo.SiteLogo
        }), e.data.stayCurOne || (t.currentTab ? 0 == t.currentTab ? (e.loadData(), e.setData({
            currentTab: t.currentTab
        })) : 1 == t.currentTab && (e.getDynmicList(!0), e.setData({
            currentTab: t.currentTab
        }), wx.setNavigationBarTitle({
            title: "动态"
        })) : e.loadData());
        var s = wx.getStorageSync("invite") || 0, i = a.globalData.getMobileNode ? a.globalData.getMobileNode.entryBusinessCardHome : 0;
        0 === a.globalData.hasMobile && 1 === e.data.authorization && 0 !== s && 0 !== i && 1 !== e.data.phonestatus && e.setData({
            allowspopup: !0,
            authorizationStu: 1
        }), e.setData({
            authorization: 1
        });
    },
    onLoad: function(t) {
        if (t.dongtai && (this.setData({
            dongtaiStatus: !0
        }), this.swichNav()), t.scene) {
            var e = {};
            decodeURIComponent(t.scene).split("&").map(function(a, t) {
                if (-1 !== a.indexOf("=")) {
                    var s = a.split("=");
                    e[s[0]] = s[1];
                }
                if (-1 !== a.indexOf("_")) {
                    var i = a.split("_");
                    e[i[0]] = i[1];
                }
            }), t = e;
        }
        var s = this;
        s.getSwipHeight(), t.SiteID && "" != t.SiteID ? s.setData({
            cardsiteID: t.SiteID
        }) : a.globalData.baseInfo.SiteID ? s.setData({
            cardsiteID: a.globalData.baseInfo.SiteID
        }) : s.getSiteId(), a.registerGlobalFunctions(s), s.setData({
            userID: a.globalData.WebUserID,
            optionsobj: t,
            authorization: 1
        }), wx.getSystemInfo({
            success: function(a) {
                wx.setStorageSync("userSystemInfo", a), "iOS" === a.system.split(" ")[0] ? s.setData({
                    modelType: !0
                }) : "Android" === a.system.split(" ")[0] && s.setData({
                    modelType: !1
                });
            }
        }), wx.setStorageSync("businessCardId", t.BusinessCardID), 1 == t.fromWrokbench && this.setData({
            isFromWorkBench: !0
        });
    },
    getSwipHeight: function() {
        var t = this, e = a.getRpxNum({
            rpx: 96,
            type: "h",
            rateFlag: !1
        });
        t.setData({
            winHeight: e,
            afterWinHeight: e + 96
        });
    },
    getUserInfo: function() {
        var t = this;
        a.sendRequest({
            url: "/index.php?c=Front/WxApp/JsonApi&a=getUserInfo",
            method: "GET",
            success: function(a) {
                "" == a.info.Mobile || null == a.info.Mobile ? t.setData({
                    showGetMobileBtn: !0
                }) : t.setData({
                    showGetMobileBtn: !1
                });
            },
            fail: function(a) {}
        });
    },
    getSiteId: function() {
        var t = this;
        a.sendRequest({
            url: "/index.php?c=front/WxApp/BusinessCard/BusinessCard&a=getSiteID",
            method: "GET",
            success: function(a) {
                t.setData({
                    cardsiteID: a.siteID
                });
            }
        });
    },
    onReady: function() {
        var a = this;
        setTimeout(function() {
            a.setData({
                hiddenLoading: !0
            });
        }, 2e3);
    },
    loadData: function() {
        var t = this;
        t.isloading || (t.isloading = !0, a.sendRequest({
            url: "/index.php?c=front/WxApp/BusinessCard/BusinessCard&a=getBusinessCardInfoByCardID&UserID=" + t.data.userID + "&SiteID=" + t.data.cardsiteID + "&BusinessCardID=" + (t.data.optionsobj.BusinessCardID ? t.data.optionsobj.BusinessCardID : t.data.optionsobj.cid),
            method: "GET",
            success: function(e) {
                if (t.isloading = !1, e.success) {
                    if (null === e.info.card_info || "" === e.info.card_info) t.setData({
                        incard: !0,
                        cardchoice: "0"
                    }), wx.hideShareMenu(); else if (1 == e.info.getUserPhone && t.getUserInfo(), e.info.checkVersions) t.setData({
                        isOverTime: !0,
                        cardchoice: "0"
                    }); else {
                        if (e.info.isBindingMember) wx.removeStorageSync("otherMemberCardId"), t.setData({
                            cardchoice: "1"
                        }), t.data.optionsobj.cid && t.setData({
                            isShare: !0
                        }); else {
                            t.setData({
                                cardchoice: "0"
                            }), wx.setStorageSync("otherMemberCardId", t.data.optionsobj.BusinessCardID);
                            var s = {
                                tbUserID: a.globalData.WebUserID,
                                tbType: "1",
                                tbTypeID: t.data.optionsobj.BusinessCardID ? t.data.optionsobj.BusinessCardID : t.data.optionsobj.cid,
                                tbTypeName: "",
                                tbTypeImg: "",
                                tbBusinessCardID: t.data.optionsobj.BusinessCardID ? t.data.optionsobj.BusinessCardID : t.data.optionsobj.cid
                            };
                            a.buried(s, function(a) {});
                        }
                        e.info.checkUserBusinssCard && t.setData({
                            showMaterial: !0
                        }), t.setData({
                            BusinssUserID: e.info.card_info.UserID,
                            BusinssCardName: e.info.card_info.NickName
                        });
                        var i = e.info.card_info;
                        i.Recording && (t.myaudio.src = t.data.baseUrl + i.Recording, t.setData({
                            "music.duration": i.RecordingTime,
                            Recording: i.Recording
                        }));
                        for (var o = e.info.recordImage, n = 0; n < o.length; n++) o[n].Image && o[n].Image.indexOf("https://wx.qlogo.cn/") < 0 && (o[n].Image = a.globalData.siteBaseUrl + o[n].Image);
                        if (null != e.info.card_info.MoreImg && "" != e.info.card_info.MoreImg) for (var r = 0; r < e.info.card_info.MoreImg.length; r++) e.info.card_info.MoreImg[r] = t.data.baseUrl + e.info.card_info.MoreImg[r];
                        "" === i.QQ && "" === i.WeChat && "" === i.Email && "0" === i.checkAddress ? t.setData({
                            informationAllHiding: !1
                        }) : t.setData({
                            informationAllHiding: !0
                        }), t.popularity(), t.setData({
                            incard: !1,
                            Popularity: e.info.card_info.Popularity > 9999 ? (e.info.card_info.Popularity / 1e4).toFixed(2) + "万" : e.info.card_info.Popularity,
                            cardcontent: e.info.card_info,
                            cardcontentLikes: e.info.card_info.Likes > 9999 ? (e.info.card_info.Likes / 1e4).toFixed(2) + "万" : e.info.card_info.Likes,
                            cardcontentLikescon: e.info.card_info.Likes,
                            moreImg: e.info.card_info.MoreImg,
                            thumbsup: wx.getStorageSync("thumbsup"),
                            recordImage: e.info.recordImage,
                            PostLikesStatus: e.info.PostLikesStatus,
                            isBindingMember: e.info.isBindingMember,
                            Transpond: e.info.card_info.Transpond > 9999 ? (e.info.card_info.Transpond / 1e4).toFixed(2) + "万" : e.info.card_info.Transpond,
                            Transpondcon: e.info.card_info.Transpond,
                            mesCount: e.unreadNum
                        });
                    }
                    t.data.AllChatIsReadStatus || t.getAllChatIsReadCount();
                } else ;
            },
            fail: function(a) {
                t.isloading = !1, console.log("getMyCenterData fail");
            }
        }));
    },
    popularity: function() {
        var t = this;
        "0" == t.data.cardchoice && a.sendRequest({
            url: "/index.php?c=front/WxApp/BusinessCard/BusinessCard&a=afterAttentionTriggerEvent&ID=" + (t.data.optionsobj.BusinessCardID ? t.data.optionsobj.BusinessCardID : t.data.optionsobj.cid) + "&UserID=" + t.data.userID + "&SiteID=" + t.data.cardsiteID + "&ShareID=" + (t.data.optionsobj.userid ? t.data.optionsobj.userid : t.data.optionsobj.invite),
            method: "GET",
            success: function(a) {
                a.success;
            },
            fail: function(a) {}
        });
    },
    openDetail: function() {
        var a = this;
        a.setData({
            openDetailFlag: !a.data.openDetailFlag
        });
    },
    playAudio: function() {
        var t = this;
        if (t.data.isPlay) t.myaudio.pause(), t.setData({
            isPlay: !1
        }); else {
            if (!t.data.havePlayAudio && 1 != t.data.cardchoice) {
                var e = {
                    tbUserID: a.globalData.WebUserID,
                    tbType: "11",
                    tbTypeID: t.data.optionsobj.BusinessCardID ? t.data.optionsobj.BusinessCardID : t.data.optionsobj.cid,
                    tbTypeName: "",
                    tbTypeImg: "",
                    tbBusinessCardID: t.data.optionsobj.BusinessCardID ? t.data.optionsobj.BusinessCardID : t.data.optionsobj.cid
                };
                a.buried(e, function(a) {}), t.setData({
                    havePlayAudio: !0
                });
            }
            "" == t.myaudio.src && (t.myaudio.src = t.data.baseUrl + t.data.Recording), t.myaudio.play(), 
            t.myaudio.onPlay(function() {
                console.log("开始播放");
            }), t.myaudio.onPause(function() {
                t.setData({
                    isPlay: !1
                });
            }), t.myaudio.onEnded(function() {
                console.log("播放结束"), t.setData({
                    havePlayAudio: !1,
                    isPlay: !1,
                    "music.playtime": "00:00",
                    "music.left": -7,
                    "music.percent": 0
                });
            }), t.myaudio.onError(function(a) {
                console.log(a.errMsg), console.log(a.errCode);
            }), t.setData({
                isPlay: !0
            }), setTimeout(function() {
                t.myaudio.currentTime, t.myaudio.onTimeUpdate(function() {
                    t.setData({
                        "music.percent": Math.ceil(t.myaudio.currentTime) / Math.ceil(t.myaudio.duration) * 100,
                        "music.left": Math.ceil(t.myaudio.currentTime) / Math.ceil(t.myaudio.duration) * 483,
                        "music.playtime": t.formseconds(Math.ceil(t.myaudio.currentTime))
                    });
                });
            }, 100);
        }
    },
    formseconds: function(a) {
        var t;
        return a && (t = (parseInt(a % 3600 / 60) > 9 ? parseInt(a % 3600 / 60) : "0" + parseInt(a % 3600 / 60)) + ":" + (parseInt(a % 3600 % 60) > 9 ? parseInt(a % 3600 % 60) : "0" + parseInt(a % 3600 % 60))), 
        t;
    },
    giveThumbs: function() {
        var t = this;
        a.sendRequest({
            url: "/index.php?c=front/WxApp/BusinessCard/BusinessCard&a=postLike&ID=" + t.data.cardcontent.ID + "&UserID=" + t.data.userID + "&SiteID=" + t.data.cardsiteID,
            method: "GET",
            hideLoading: !0,
            success: function(e) {
                if (e.success) {
                    if ("操作过于频繁！" === e.msg) wx.showToast({
                        title: "您点赞过了!",
                        icon: "none",
                        duration: 1500
                    }); else if (t.setData({
                        cardcontentLikes: parseInt(t.data.cardcontentLikescon) > 9999 ? parseInt(t.data.cardcontentLikescon / 1e4).toFixed(2) + "万" : parseInt(t.data.cardcontentLikescon) + 1,
                        PostLikesStatus: !0
                    }), 1 != t.data.cardchoice) {
                        var s = {
                            tbUserID: a.globalData.WebUserID,
                            tbType: "6",
                            tbTypeID: t.data.optionsobj.BusinessCardID ? t.data.optionsobj.BusinessCardID : t.data.optionsobj.cid,
                            tbTypeName: "",
                            tbTypeImg: "",
                            tbBusinessCardID: t.data.optionsobj.BusinessCardID ? t.data.optionsobj.BusinessCardID : t.data.optionsobj.cid
                        };
                        a.buried(s, function(a) {});
                    }
                } else ;
            },
            fail: function(a) {}
        });
    },
    mypictureClickImg: function(a) {
        var t = a.currentTarget.dataset.index, e = this.data.moreImg;
        wx.previewImage({
            current: e[t],
            urls: e
        });
    },
    calling: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.cardcontent.Mobile,
            success: function() {
                console.log("拨打电话成功！");
            },
            fail: function() {
                console.log("拨打电话失败！");
            }
        });
        var t = this;
        if (1 != t.data.cardchoice) {
            var e = {
                tbUserID: a.globalData.WebUserID,
                tbType: "2",
                tbTypeID: t.data.optionsobj.BusinessCardID ? t.data.optionsobj.BusinessCardID : t.data.optionsobj.cid,
                tbTypeName: "",
                tbTypeImg: "",
                tbBusinessCardID: t.data.optionsobj.BusinessCardID ? t.data.optionsobj.BusinessCardID : t.data.optionsobj.cid
            };
            a.buried(e, function(a) {});
        }
    },
    getphone: function() {
        var a = this;
        wx.showActionSheet({
            itemList: [ "添加联系人" ],
            success: function(t) {
                wx.addPhoneContact({
                    firstName: a.data.cardcontent.UserName,
                    mobilePhoneNumber: a.data.cardcontent.Mobile,
                    organization: a.data.cardcontent.CompanyName,
                    title: a.data.cardcontent.Position,
                    email: a.data.cardcontent.Email,
                    weChatNumber: a.data.cardcontent.WeChat
                });
            }
        });
    },
    abolish: function() {
        var a = this;
        a.setData({
            allowspopup: !1
        }), "1" === a.data.cellphone ? a.getphone() : "2" === a.data.cellphone && wx.navigateTo({
            url: "/pages/businesscard/chatdialogue/index?UserID=" + a.data.BusinssUserID + "&SiteID=" + a.data.cardsiteID + "&BusinessCardID=" + (a.data.optionsobj.BusinessCardID ? a.data.optionsobj.BusinessCardID : a.data.optionsobj.cid) + "&OtherName=" + a.data.BusinssCardName
        });
    },
    phoneNumTap: function(t) {
        var e = this, s = wx.getStorageSync("hasMobile") || 0;
        a.globalData.getMobileNode && a.globalData.getMobileNode.savePhoneToAddressBook;
        if (0 === a.globalData.hasMobile && 0 === s && 0 !== a.globalData.getMobileNode.savePhoneToAddressBook ? this.setData({
            allowspopup: !0,
            cellphone: t.currentTarget.dataset.tbphone
        }) : e.getphone(), 1 != e.data.cardchoice) {
            var i = {
                tbUserID: a.globalData.WebUserID,
                tbType: "3",
                tbTypeID: e.data.optionsobj.BusinessCardID ? e.data.optionsobj.BusinessCardID : e.data.optionsobj.cid,
                tbTypeName: "",
                tbTypeImg: "",
                tbBusinessCardID: e.data.optionsobj.BusinessCardID ? e.data.optionsobj.BusinessCardID : e.data.optionsobj.cid
            };
            a.buried(i, function(a) {});
        }
    },
    copyTBL: function(t) {
        var e = this;
        if (1 != e.data.cardchoice) {
            var s = {
                tbUserID: a.globalData.WebUserID,
                tbType: t.currentTarget.dataset.tbtype,
                tbTypeID: e.data.optionsobj.BusinessCardID ? e.data.optionsobj.BusinessCardID : e.data.optionsobj.cid,
                tbTypeName: "",
                tbTypeImg: "",
                tbBusinessCardID: e.data.optionsobj.BusinessCardID ? e.data.optionsobj.BusinessCardID : e.data.optionsobj.cid
            };
            a.buried(s, function(a) {});
        }
        wx.setClipboardData({
            data: t.currentTarget.dataset.text,
            success: function(t) {
                a.showToast({
                    title: "内容已复制",
                    icon: "none",
                    duration: 1500
                });
            }
        });
    },
    share: function() {
        this.setData({
            shareMarkFlag: !0
        });
    },
    close: function() {
        this.setData({
            shareMarkFlag: !1
        });
    },
    sharetoFriend: function() {
        this.setData({
            shareMarkFlag: !1
        });
    },
    ontranspond: function() {
        var t = this;
        a.sendRequest({
            url: "/index.php?c=front/WxApp/BusinessCard/BusinessCard&a=updateShareForwardingAmount&ID=" + t.data.cardcontent.ID + "&SiteID=" + t.data.cardsiteID,
            method: "GET",
            success: function(a) {
                t.isloading = !1, a.success;
            },
            fail: function(a) {
                t.isloading = !1;
            },
            hideLoading: !0
        });
    },
    onShareAppMessage: function(t) {
        var e = this, s = e.data.currentTab, i = e.data.optionsobj;
        if (i.currentTab = s, 0 == s) {
            if (1 != e.data.cardchoice) {
                var o = {
                    tbUserID: a.globalData.WebUserID,
                    tbType: "5",
                    tbTypeID: e.data.optionsobj.BusinessCardID ? e.data.optionsobj.BusinessCardID : e.data.optionsobj.cid,
                    tbTypeName: "",
                    tbTypeImg: "",
                    tbBusinessCardID: e.data.optionsobj.BusinessCardID ? e.data.optionsobj.BusinessCardID : e.data.optionsobj.cid
                };
                a.buried(o, function(a) {});
            }
            i.userid = e.data.userID;
            var n = a.getPageUrl(e, i);
            e.ontranspond(), e.setData({
                Transpond: Number(e.data.Transpondcon) > 9999 ? ((Number(e.data.Transpondcon) + 1) / 1e4).toFixed(2) + "万" : Number(e.data.Transpondcon) + 1,
                Transpondcon: Number(e.data.Transpondcon) + 1
            });
            var r = e.data.cardcontent, d = "您好，我是" + r.CompanyName + r.Position + r.UserName + "，这是我的名片请惠存", c = "" + e.data.baseUrl + r.PersonImg;
            return a.shareAppMessage({
                url: n,
                title: d,
                imageUrl: c
            });
        }
        if (1 == s) {
            i.userid = a.globalData.WebUserID;
            var u = "", l = "", g = "";
            if (t.target) {
                var D = t.target.dataset.articleid;
                u = t.target.dataset.title, l = "" + e.data.baseUrl + t.target.dataset.img, g = "/pages/shop/newsdetail?id=" + D + "&businessid=" + i.BusinessCardID + "&userid=" + a.globalData.WebUserID, 
                e.addTranspond(D);
            } else g = a.getPageUrl(e, i);
            return a.shareAppMessage({
                url: g,
                title: u,
                imageUrl: l
            });
        }
    },
    shareHfive: function() {
        var a = this;
        this.setData({
            shareMarkFlag: !1
        }), setTimeout(function() {
            wx.navigateTo({
                url: "/pages/businesscard/sharecard/index?companyName=" + a.data.cardcontent.CompanyName + "&position=" + a.data.cardcontent.Position + "&mobile=" + a.data.cardcontent.Mobile + "&personImg=" + a.data.cardcontent.PersonImg + "&id=" + a.data.cardcontent.ID + "&username=" + a.data.cardcontent.UserName + "&email=" + a.data.cardcontent.Email + "&SiteID=" + a.data.cardsiteID
            });
        }, 50);
    },
    businessCardsList: function() {
        var a = this;
        setTimeout(function() {
            wx.navigateTo({
                url: "/pages/businesscard/cardcase/index?ID=" + a.data.userID + "&BusinessCardID=" + a.data.cardcontent.ID + "&isBinding=" + a.data.isBindingMember
            });
        }, 50);
    },
    goeditCard: function() {
        var a = this;
        setTimeout(function() {
            wx.navigateTo({
                url: "/pages/businesscard/editcard/index?ID=" + a.data.cardcontent.ID + "&mark=1"
            });
        }, 50);
    },
    goeditCardindex: function() {
        wx.setStorageSync("switchToIndex", !0), wx.setStorageSync("SiteID", a.globalData.baseInfo.SiteID), 
        wx.switchTab({
            url: "/pages/shop/index"
        });
    },
    goAccessRecord: function() {
        var a = this;
        setTimeout(function() {
            wx.navigateTo({
                url: "/pages/businesscard/accessrecord/index?ID=" + a.data.cardcontent.ID
            });
        }, 50);
    },
    navigationalmap: function() {
        var t = this;
        if (1 != t.data.cardchoice) {
            var e = {
                tbUserID: a.globalData.WebUserID,
                tbType: "10",
                tbTypeID: t.data.optionsobj.BusinessCardID ? t.data.optionsobj.BusinessCardID : t.data.optionsobj.cid,
                tbTypeName: "",
                tbTypeImg: "",
                tbBusinessCardID: t.data.optionsobj.BusinessCardID ? t.data.optionsobj.BusinessCardID : t.data.optionsobj.cid
            };
            a.buried(e, function(a) {});
        }
        wx.openLocation({
            address: t.data.cardcontent.Address,
            longitude: Number(t.data.cardcontent.Lng),
            latitude: Number(t.data.cardcontent.Lat)
        });
    },
    toLeaveWrod: function(t) {
        var e = this, s = wx.getStorageSync("hasMobile") || 0, i = a.globalData.getMobileNode ? a.globalData.getMobileNode.entryOnlineMessage : 0;
        e.setData({
            haveMessageCount: !1
        }), 0 === a.globalData.hasMobile && 0 === s && 0 !== i ? this.setData({
            allowspopup: !0,
            cellphone: t.currentTarget.dataset.tbphone
        }) : wx.navigateTo({
            url: "/pages/businesscard/chatdialogue/index?UserID=" + e.data.BusinssUserID + "&SiteID=" + e.data.cardsiteID + "&BusinessCardID=" + (e.data.optionsobj.BusinessCardID ? e.data.optionsobj.BusinessCardID : e.data.optionsobj.cid) + "&OtherName=" + e.data.BusinssCardName
        });
    },
    getAllChatIsReadCount: function() {
        var t = this, e = "";
        a.globalData.WebUserID !== this.data.BusinssUserID && (e = this.data.BusinssUserID), 
        a.sendRequest({
            url: "/index.php?c=Front/Chat/Chat&a=getAllChatIsReadCount&toUserID=" + a.globalData.WebUserID + "&fromUserID=" + e,
            method: "GET",
            hideLoading: !0,
            success: function(a) {
                200 == a.code && t.setData({
                    messageCount: a.data.count,
                    AllChatIsReadStatus: !0,
                    haveMessageCount: a.data.count > 0
                });
            },
            fail: function(a) {}
        });
    },
    openSocket: function() {
        var e = this, s = a.globalData.WebUserID;
        "{}" != JSON.stringify(a.globalData.socket_config) && s ? (a.globalData.cardSocket = t.run(), 
        t.listen("websocket-connected", function(t) {
            var i = {
                client_id: t.clientid,
                fromUserID: s
            };
            a.sendRequest({
                url: "/index.php?c=Front/Chat/Chat&a=bindUid",
                data: i,
                method: "POST",
                hideLoading: !0,
                success: function(t) {
                    200 == t.code ? (e.setData({
                        socketHide: !1
                    }), console.log("绑定成功"), e.getAllChatIsReadCount(), a.globalData.cardSocket.socketTask.onClose(function(t) {
                        e.data.socketlianjie && (a.globalData.cardSocket = void 0, e.setData({
                            socketHide: !0
                        }), e.openSocket());
                    })) : setTimeout(function() {
                        e.data.socketlianjie && e.openSocket();
                    }, 5e3);
                },
                fail: function(a) {}
            });
        }), a.globalData.cardSocket.listen("chat_msg", function(a) {
            var t = a, s = e.data.messageCount;
            e.data.BusinssUserID == t.fromUserID && ("null" == (s = Number(s) + 1) && (s = "..."), 
            e.setData({
                messageCount: s
            }, function() {
                setTimeout(function() {
                    e.setData({
                        haveMessageCount: s > 0
                    });
                }, 300);
            }));
        }), a.globalData.cardSocket.listen("businesscard_msg", function(a) {
            e.setData({
                mesCount: a.count
            });
        }), a.globalData.cardSocket.socketTask.onError(function(a) {
            setTimeout(function() {
                e.data.socketlianjie && e.openSocket();
            }, 5e3);
        }), e.setData({
            WebUserID: s
        })) : setTimeout(function() {
            e.openSocket();
        }, 1500);
    },
    listenSocket: function() {
        var t = this;
        t.setData({
            socketTimeOut: !0,
            socketlianjie: !1
        }), a.globalData.cardSocket.listen("chat_msg", function(a) {
            var e = a, s = t.data.messageCount;
            t.data.BusinssUserID == e.fromUserID && ("null" == (s = Number(s) + 1) && (s = "..."), 
            t.setData({
                messageCount: s
            }, function() {
                setTimeout(function() {
                    t.setData({
                        haveMessageCount: s > 0
                    });
                }, 300);
            }));
        }), a.globalData.cardSocket.listen("businesscard_msg", function(a) {
            t.setData({
                mesCount: a.count
            });
        }), a.globalData.cardSocket.socketTask.onClose(function(e) {
            t.data.socketTimeOut && (a.globalData.cardSocket = void 0, t.setData({
                socketTimeOut: !1,
                socketlianjie: !0,
                socketHide: !0
            }), t.openSocket());
        });
    },
    switchTab: function(t) {
        var e = t.detail.current, s = this;
        if (this.setData({
            currentTab: t.detail.current,
            showUserInfoFlag: !1
        }), 0 == e) s.myaudio = wx.createInnerAudioContext(), s.setData({
            isPlay: !1,
            "music.playtime": "00:00",
            "music.left": -7,
            "music.percent": 0
        }), s.loadData(), wx.setNavigationBarTitle({
            title: "名片详情"
        }); else if (1 == e) s.data.isShare && s.setData({
            stayCurOne: !0
        }), s.myaudio && s.myaudio.destroy(), s.getDynmicList(), wx.setNavigationBarTitle({
            title: "动态"
        }); else if (2 == e) {
            s.myaudio && s.myaudio.destroy(), setTimeout(function() {
                s.setData({
                    showUserInfoFlag: !0
                });
            }, 100);
            var i = a.globalData.userInfo;
            s.setData({
                nickName: i.nickName,
                avatarUrl: i.avatarUrl
            }), s.data.materialListStatus1 && (s.getMaterialBannerList(), s.getALLRelease(), 
            s.getTagList(), s.getMaterialList("", !0), s.setData({
                materialListStatus1: !1
            })), wx.setNavigationBarTitle({
                title: "素材库"
            });
        }
    },
    swichNav: function(t) {
        var e, s = this;
        if (e = s.data.dongtaiStatus ? 1 : t.currentTarget.dataset.current, this.data.currentTab != e) if (this.setData({
            currentTab: e,
            showUserInfoFlag: !1,
            dongtaiStatus: !1
        }), 0 == e) s.myaudio = wx.createInnerAudioContext(), s.loadData(), wx.setNavigationBarTitle({
            title: "名片详情"
        }), s.setData({
            isPlay: !1,
            "music.playtime": "00:00",
            "music.left": -7,
            "music.percent": 0
        }); else if (1 == e) s.data.isShare && s.setData({
            stayCurOne: !0
        }), s.myaudio && s.myaudio.destroy(), s.getDynmicList(), wx.setNavigationBarTitle({
            title: "动态"
        }); else if (2 == e) {
            s.myaudio && s.myaudio.destroy(), setTimeout(function() {
                s.setData({
                    showUserInfoFlag: !0
                });
            }, 100);
            var i = a.globalData.userInfo;
            s.setData({
                nickName: i.nickName,
                avatarUrl: i.avatarUrl
            }), s.data.materialListStatus1 && (s.getMaterialBannerList(), s.getALLRelease(), 
            s.getTagList(), s.getMaterialList("", !0), s.setData({
                materialListStatus1: !1
            })), wx.setNavigationBarTitle({
                title: "素材库"
            });
        }
    },
    from_send: function(t) {
        var e = {
            formID: t.detail.formId,
            userID: a.globalData.WebUserID
        };
        a.saveFormID(e, function(a) {});
    },
    getDynmicList: function(t) {
        var e = this;
        t && (e.data.recordcount = 99, e.data.dynamicList = []);
        var s = e.data.recordcount, i = e.data.dynamicList.length;
        if (s > i && e.data.falgAjax) {
            e.setData({
                falgAjax: !1
            });
            var o = Math.ceil(i / e.data.pagesize) + 1;
            a.sendRequest({
                url: "/index.php?c=Front/WxApp/Dynamic/Dynamic&a=getDynmicList&page=" + o + "&pageSize=" + e.data.pagesize,
                method: "GET",
                success: function(a) {
                    if (a.success) {
                        1 == a.checkCount && e.setData({
                            showMaterial: !0
                        }), 0 === a.list.length ? e.setData({
                            dynamicBlank: !0
                        }) : e.setData({
                            dynamicBlank: !1
                        });
                        for (var t = a.list, s = 0; s < t.length; s++) t[s].showPop = !1, e.data.dynamicList.push(t[s]);
                        e.setData({
                            dynamicList: e.data.dynamicList,
                            falgAjax: !0,
                            recordcount: a.count
                        });
                    } else console.log("getDynmicList fail" + a.msg);
                }
            });
        } else e.setData({
            shape: !0
        });
    },
    loadMoreData: function() {
        this.getDynmicList();
    },
    errArticleImg: function(a) {
        var t = this, e = a.target.dataset.errImg, s = a.target.dataset.errIndex, i = t.data.dynamicList;
        i[s].ImgBig = e, t.setData({
            dynamicList: i
        });
    },
    toNewsDetails: function(t) {
        this.setData({
            showPopFlag: !1
        });
        var e = t.currentTarget.dataset.articleid, s = a.globalData.WebUserID;
        wx.navigateTo({
            url: "/pages/shop/newsdetail?id=" + e + "&userid=" + s
        });
    },
    addTranspond: function(t) {
        a.sendRequest({
            url: "/index.php?c=Front/WxApp/Dynamic/Dynamic&a=addTranspond",
            method: "POST",
            data: {
                ArticleID: t
            },
            success: function(a) {},
            fail: function(a) {}
        });
    },
    TouchDiscuss: function(a) {
        var t = this, e = t.data.dynamicList;
        t.data.currentIndex == a.currentTarget.dataset.index && (e[t.data.currentIndex].showPop = !1);
        for (var s = 0; s < e.length; s++) e[s].showPop = !1, a.currentTarget.dataset.index == s && (e[s].showPop = !0);
        t.setData({
            canhold: !0,
            dynamicList: e
        }), t.data.currentIndex == a.currentTarget.dataset.index ? t.setData({
            currentIndex: a.currentTarget.dataset.index,
            showPopFlag: !t.data.showPopFlag
        }) : t.setData({
            currentIndex: a.currentTarget.dataset.index,
            showPopFlag: !0
        });
    },
    clickLove: function(t) {
        var e = this, s = t.currentTarget.dataset.articleid, i = a.globalData.WebUserID ? a.globalData.WebUserID : 0;
        a.sendRequest({
            url: "/index.php?c=Front/WxApp/Dynamic/Dynamic&a=addLike",
            method: "POST",
            data: {
                ArticleID: s,
                UserID: i
            },
            success: function(t) {
                if (t.success) {
                    var o = e.data.dynamicList, n = "", r = "";
                    if (o.forEach(function(t) {
                        t.ArticleID == s && (n = t.Title, r = t.ImgBig, t.showPop = !1, "" != t.NickNameText ? t.NickNameText = t.NickNameText + "," + a.globalData.userInfo.nickName : t.NickNameText = t.NickNameText + a.globalData.userInfo.nickName);
                    }), 1 != e.data.cardchoice && 0 != i) {
                        var d = {
                            tbUserID: i,
                            tbType: "13",
                            tbTypeID: s,
                            tbTypeName: n,
                            tbTypeImg: r,
                            tbBusinessCardID: e.data.optionsobj.BusinessCardID ? e.data.optionsobj.BusinessCardID : e.data.optionsobj.cid
                        };
                        a.buried(d, function(a) {});
                    }
                    e.setData({
                        dynamicList: o,
                        showPopFlag: !1
                    });
                } else a.showToast({
                    title: t.msg,
                    icon: "none"
                }), e.setData({
                    showPopFlag: !1
                });
            },
            fail: function(a) {}
        });
    },
    toComment: function(t) {
        var e = this, s = t.currentTarget.dataset.articleid, i = a.globalData.WebUserID ? a.globalData.WebUserID : 0;
        a.sendRequest({
            url: "/index.php?c=Front/WxApp/Dynamic/Dynamic&a=getUserCommentCount&ArticleID=" + s + "&UserID=" + i,
            method: "GET",
            success: function(t) {
                e.setData({
                    showPopFlag: !1
                }), t.success ? 0 == t.IsComment ? e.setData({
                    showForm: !0,
                    articleID: s
                }) : a.showToast({
                    title: "文章评论不能超过10条",
                    icon: "none"
                }) : a.showToast({
                    title: t.msg,
                    icon: "none"
                });
            },
            fail: function(a) {}
        });
    },
    sendComment: function(a) {
        var t = a.detail.value.commentcontent;
        "" != t && this.addComment(t);
    },
    inputComment: function(a) {
        this.setData({
            commentcontent: a.detail.value
        });
    },
    sendclose: function(a) {
        var t = this, e = a.detail.value;
        "" == e ? t.setData({
            canhold: !0
        }) : (t.setData({
            canhold: !1
        }), t.addComment(e));
    },
    addComment: function(t) {
        var e = this, s = e.data.articleID, i = e.data.currentIndex, o = a.globalData.WebUserID ? a.globalData.WebUserID : 0, n = e.data.dynamicList;
        a.sendRequest({
            url: "/index.php?c=Front/WxApp/Dynamic/Dynamic&a=getArticleconfig",
            method: "GET",
            success: function(r) {
                r.success && a.sendRequest({
                    url: "/index.php?c=Front/WxApp/Dynamic/Dynamic&a=addComment",
                    method: "POST",
                    data: {
                        ArticleID: s,
                        UserID: o,
                        Content: t
                    },
                    success: function(d) {
                        if (d.success) {
                            if (1 == r.info.EnableCommentReviewMobile) {
                                if (0 != o) {
                                    var c = a.globalData.userInfo.nickName;
                                    n[i].CommentList.push({
                                        nickname: c,
                                        comment: t
                                    });
                                } else n[i].CommentList.push({
                                    nickname: "游客",
                                    comment: t
                                });
                                e.setData({
                                    dynamicList: n,
                                    showForm: !1,
                                    commentcontent: ""
                                });
                            } else a.showToast({
                                title: "审核通过后显示",
                                icon: "none"
                            }), e.setData({
                                showForm: !1,
                                commentcontent: ""
                            });
                            if (1 != e.data.cardchoice && 0 != o) {
                                var u = {
                                    tbUserID: o,
                                    tbType: "14",
                                    tbTypeID: s,
                                    tbTypeName: n[i].Title,
                                    tbTypeImg: n[i].ImgBig,
                                    tbBusinessCardID: e.data.optionsobj.BusinessCardID ? e.data.optionsobj.BusinessCardID : e.data.optionsobj.cid
                                };
                                a.buried(u, function(a) {});
                            }
                        } else ;
                    },
                    fail: function(a) {}
                });
            },
            fail: function(a) {}
        });
    },
    touchstart: function(a) {
        var t = this;
        "" == a.target.id ? a.target.dataset.index || a.target.dataset.isone ? t.setData({
            showForm: !1,
            commentcontent: ""
        }) : t.setData({
            showPopFlag: !1,
            showForm: !1,
            commentcontent: ""
        }) : t.setData({
            showForm: !0
        });
    },
    bindPickerChange: function(a) {
        this.setData({
            tagNameIndex: a.detail.value,
            productPage: "1"
        });
        var t = this.data.tagList[a.detail.value].TagID;
        this.getMaterialList(t, !0);
    },
    getMaterialBannerList: function() {
        var t = this;
        t.data.materualFlagOne && (t.setData({
            materualFlagOne: !1
        }), a.sendRequest({
            url: "/index.php?c=Front/Material/Material&a=getMaterialBannerList",
            method: "GET",
            success: function(a) {
                t.setData({
                    materualFlagOne: !0
                }), a.success && t.setData({
                    imgUrls: a.info.ImagePaths
                });
            },
            fail: function(a) {
                t.setData({
                    materualFlagOne: !0
                });
            }
        }));
    },
    getALLRelease: function() {
        var t = this;
        t.data.materualFlagTwo && (t.setData({
            materualFlagTwo: !1
        }), a.sendRequest({
            url: "/index.php?c=Front/Material/Material&a=getALLRelease",
            method: "GET",
            success: function(a) {
                t.setData({
                    materualFlagTwo: !0
                });
            },
            fail: function(a) {
                t.setData({
                    materualFlagTwo: !0
                });
            }
        }));
    },
    getMaterialList: function(t, e) {
        var s = this;
        e && s.setData({
            productPage: "1"
        });
        var i = "";
        t && (i = t), s.data.materualFlagThree && (s.setData({
            materualFlagThree: !1
        }), a.sendRequest({
            url: "/index.php?c=Front/Material/Material&a=getMaterialList&page=" + s.data.productPage + "&tagID=" + i + "&userID=",
            method: "GET",
            success: function(a) {
                if (s.setData({
                    materualFlagThree: !0
                }), a.success) {
                    var i = [];
                    t || e ? i = a.list : (i = s.data.materialList, a.list.forEach(function(a) {
                        i.push(a);
                    })), s.setData({
                        materialList: i,
                        pageCount: a.pagecount
                    });
                }
            },
            fail: function(a) {
                s.setData({
                    materualFlagThree: !0
                });
            }
        }));
    },
    getTagList: function() {
        var t = this;
        t.data.materualFlagFour && (t.setData({
            materualFlagFour: !1
        }), a.sendRequest({
            url: "/index.php?c=Front/Material/Material&a=getTagList&isPagination=1",
            method: "GET",
            success: function(a) {
                if (t.setData({
                    materualFlagFour: !0
                }), a.success) {
                    var e = [];
                    a.list.forEach(function(a, t) {
                        e[t] = a.TagName;
                    }), t.setData({
                        tagList: a.list,
                        tagNameList: e
                    });
                }
            },
            fail: function(a) {
                t.setData({
                    materualFlagFour: !0
                });
            }
        }));
    },
    copyText: function(t) {
        var e = this, s = t.currentTarget.dataset.descriptor, i = e.data.materialList[s].Descriptor;
        wx.setClipboardData({
            data: i,
            success: function(t) {
                a.showToast({
                    title: "内容已复制",
                    icon: "none"
                });
            }
        });
    },
    saveImg: function(a) {
        var t = this;
        wx.getSetting({
            success: function(e) {
                if (e.authSetting["scope.writePhotosAlbum"]) {
                    var s = a.currentTarget.dataset.saveindex, i = [];
                    if (0 == (i = t.data.materialList[s].MaterialContent).length) return;
                    i.forEach(function(a, e) {
                        i[e].indexOf("https") < 0 && (i[e] = t.data.baseUrl + a);
                    });
                    var o = 0;
                    t.saveLoad(i[o], function(a) {
                        if (a) {
                            if (wx.showToast({
                                title: "第" + (o + 1) + "张成功",
                                icon: "success",
                                mask: !0,
                                duration: 2e3
                            }), i.length === o + 1) return;
                            return o++, i[o];
                        }
                        if (wx.showToast({
                            title: "第" + (o + 1) + "张失败",
                            icon: "loading",
                            mask: !0,
                            duration: 2e3
                        }), i.length !== o + 1) return o++, i[o];
                    });
                } else wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function() {
                        wx.setStorageSync("authorize", "true");
                    },
                    fail: function() {
                        wx.setStorageSync("authorize", "false"), t.setData({
                            canSave: !1
                        });
                    }
                });
            }
        });
    },
    saveLoad: function(a, t) {
        var e = this;
        wx.showToast({
            title: "",
            icon: "loading",
            mask: !0,
            duration: 5e3
        }), wx.downloadFile({
            url: a,
            success: function(a) {
                wx.saveImageToPhotosAlbum({
                    filePath: a.tempFilePath,
                    success: function(a) {
                        var s = t && t(!0);
                        s && setTimeout(function() {
                            e.saveLoad(s, t);
                        }, 2e3);
                    },
                    fail: function(a) {
                        var s = t && t(!1);
                        s && e.saveLoad(s, t);
                    }
                });
            }
        });
    },
    bindClickImg: function(a) {
        var t = this, e = a.currentTarget.dataset.index, s = a.currentTarget.dataset.imagearr;
        s.forEach(function(a, e) {
            s[e] = t.data.baseUrl + a;
        }), wx.previewImage({
            current: s[e],
            urls: s
        });
    },
    goMaterialBottom: function() {
        Number(this.data.productPage) + 1 > this.data.pageCount || (this.data.productPage++, 
        this.getMaterialList("", !1));
    },
    openSet: function() {
        wx.getStorageSync("userSystemInfo") && a.compareVersion("2.0.7", wx.getStorageSync("userSystemInfo").SDKVersion) > -1 && wx.openSetting({});
    },
    getPhoneNumber: function(t) {
        var s = this;
        if (t.detail.errMsg.indexOf("getPhoneNumber:ok") > -1) {
            var i = a.globalData.appId, o = a.globalData.session_key, n = new e(i, o).decryptData(t.detail.encryptedData, t.detail.iv);
            a.loadphoneInfo(n.phoneNumber), "1" === s.data.cellphone ? s.getphone() : "2" === s.data.cellphone && (s.setData({
                showGetMobileBtn: !1
            }), wx.navigateTo({
                url: "/pages/businesscard/chatdialogue/index?UserID=" + s.data.BusinssUserID + "&SiteID=" + s.data.cardsiteID + "&BusinessCardID=" + (s.data.optionsobj.BusinessCardID ? s.data.optionsobj.BusinessCardID : s.data.optionsobj.cid) + "&OtherName=" + s.data.BusinssCardName
            }));
        } else if (s.setData({
            authorization: 2
        }), s.setData({
            allowspopup: !0
        }), "1" === s.data.cellphone) s.getphone(); else if ("2" === s.data.cellphone) return void wx.navigateTo({
            url: "/pages/businesscard/chatdialogue/index?UserID=" + s.data.BusinssUserID + "&SiteID=" + s.data.cardsiteID + "&BusinessCardID=" + (s.data.optionsobj.BusinessCardID ? s.data.optionsobj.BusinessCardID : s.data.optionsobj.cid) + "&OtherName=" + s.data.BusinssCardName
        });
    },
    toWrokBench: function() {
        var t = this, e = t.data.optionsobj.BusinessCardID ? t.data.optionsobj.BusinessCardID : t.data.optionsobj.cid, s = a.globalData.siteId;
        setTimeout(function() {
            t.data.isFromWorkBench ? wx.navigateBack({
                delta: 1
            }) : wx.redirectTo({
                url: "/pages/businesscard/workbench/index?BusinessCardID=" + e + "&SiteID=" + s
            });
        }, 50);
    }
});