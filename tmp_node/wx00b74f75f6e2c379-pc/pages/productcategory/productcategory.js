var _Page;

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

// /pages/productsearch/productsearch.js
var app = getApp();

Page((_Page = {
    data: {
        Css: {
            LHeight: 0,
            FirstIndex: 0,
            SecondIndex: 0,
            SortIndex: 1
        },
        CategoryList: [],
        CurrentCategory: null,
        ProductList: null,
        CurrentProduct: null,
        CurrentSku: null,
        Cid: 0,
        SortBy: "",
        SortOrder: "asc",
        KeyWord: "",
        PageIndex: 1,
        PageSize: 10,
        Num: 0,
        SortClass: "",
        isShow: true,
        isShowSkuSelectBox: false,
        selectedskuList: [],
        buyAmount: 1,
        selectedSku: "",
        SkuItemList: null,
        MarginTop: 0,
        TempMarginTop: 0,
        StartScrollTop: 0,
        IsDown: true,
        IsPagePost: false
    },
    /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function onLoad(options) {
        var querycid = options.cid;
        if (parseInt(querycid) > 0) {
            this.setData({
                Cid: querycid,
                IsPagePost: true
            });
        }
        this.loadCategory(this);
        //获取商品分类
        /*this.loadData(this, false);*/    },
    SwitchSubCategory: function SwitchSubCategory() {
        this.setData({
            IsDown: true
        });
    },
    GetShopCart: function GetShopCart() {
        var totalnum = 0;
        var that = this;
        var tempshopcart = that.data.ProductList;
        app.getOpenId(function(openid) {
            wx.request({
                url: app.getUrl(app.globalData.getCartProduct),
                data: {
                    openId: openid
                },
                success: function success(result) {
                    if (result.data.Status == "OK") {
                        var shopcarttemp = result.data.Data;
                        var changeshopcart = {};
                        shopcarttemp.forEach(function(cartitem, index, array) {
                            if (parseInt(cartitem[index].Count) > 0) {
                                if (changeshopcart[cartitem[index].Id] != undefined) {
                                    changeshopcart[cartitem[index].Id] = parseInt(changeshopcart[cartitem[index].Id]) + parseInt(cartitem[index].Count);
                                } else {
                                    changeshopcart[cartitem[index].Id] = cartitem[index].Count;
                                }
                                totalnum += parseInt(cartitem[index].Count);
                            }
                        });
                        if (tempshopcart != null) {
                            tempshopcart.forEach(function(item, index, array) {
                                if (changeshopcart[item.ProductId] != undefined) {
                                    item.CartQuantity = parseInt(changeshopcart[item.ProductId]);
                                } else {
                                    item.CartQuantity = 0;
                                }
                            });
                        }
                    } else if (result.data.Message == "NOUser") {
                        wx.redirectTo({
                            url: "../login/login"
                        });
                    } else {
                        app.showErrorModal(result.data.Message, function(res) {
                            if (res.confirm) {
                                wx.navigateBack({
                                    delta: 1
                                });
                            }
                        });
                    }
                },
                complete: function complete() {
                    if (tempshopcart != null) {
                        that.setData({
                            ProductList: tempshopcart,
                            TotalNum: totalnum
                        });
                    }
                    wx.hideLoading();
                }
            });
        });
    },
    loadCategory: function loadCategory(that) {
        //加载商品分类
        app.getOpenId(function(openid) {
            wx.request({
                url: app.getUrl(app.globalData.getAllCategories),
                data: {},
                success: function success(result) {
                    if (result.data.Status == "OK") {
                        var r = result.data.Data;
                        that.setData({
                            CategoryList: r,
                            CurrentCategory: r[0],
                            Cid: r[0].cid
                        });
                        that.loadData(that, false);
                    } else if (result.data.Message == "NOUser") {
                        wx.navigateTo({
                            url: "../login/login"
                        });
                    } else {
                        app.showErrorModal(result.data.Message, function(res) {
                            if (res.confirm) {
                                wx.navigateBack({
                                    delta: 1
                                });
                            }
                        });
                    }
                },
                complete: function complete() {
                    that.SetSubCategoryHeight();
                }
            });
        });
    },
    EndTouch: function EndTouch(e) {
        var that = this;
        var scrolly = parseInt(e.changedTouches[0].clientY);
        var startscroll = parseInt(that.data.StartScrollTop);
        //往上
                if (scrolly != startscroll) {
            var tempmargin = that.data.TempMarginTop;
            if (scrolly - startscroll > 0) {
                that.setData({
                    IsDown: true,
                    MarginTop: tempmargin
                });
            } else {
                that.setData({
                    IsDown: false,
                    MarginTop: 0
                });
            }
        }
    },
    StartTouch: function StartTouch(e) {
        var that = this;
        var scrolly = e.changedTouches[0].clientY;
        that.setData({
            StartScrollTop: scrolly
        });
    },
    addToCart: function addToCart(id, skuId, quantity) {
        var that = this;
        if (!skuId || skuId.lenght < 1) {
            app.showErrorModal("请选择规格");
            return;
        }
        app.getOpenId(function(openid) {
            wx.request({
                url: app.getUrl(app.globalData.getUpdateToCart),
                data: {
                    openId: openid,
                    SkuID: skuId,
                    Quantity: quantity
                },
                success: function success(result) {
                    if (result.data.Status == "OK") {
                        that.setProductCartQuantity(id, quantity, "+");
                        that.setSkuCartQuantity(skuId, quantity, "+");
                    } else {
                        if (result.data.Message == "NOUser") {
                            wx.navigateTo({
                                url: "../login/login"
                            });
                        } else {
                            app.showErrorModal(result.data.ErrorResponse.ErrorMsg);
                        }
                    }
                },
                complete: function complete() {
                    var totalnum = parseInt(that.data.TotalNum);
                    that.setData({
                        TotalNum: totalnum + parseInt(quantity)
                    });
                }
            });
        });
    },
    setSkuCartQuantity: function setSkuCartQuantity(skuId, num, operator) {
        //修改商品失规格购物车中存在数量,只能操作this.data.CurrentProduct中的规格
        var that = this;
        var hasEdit = false;
        var _curProduct = that.data.CurrentProduct;
        if (_curProduct && _curProduct.Skus) {
            var _sku = _curProduct.Skus.find(function(d) {
                return d.SkuId == skuId;
            });
            var _cursku = that.data.CurrentSku;
            if (_sku) {
                num = parseInt(num);
                switch (operator) {
                  case "=":
                    _sku.CartQuantity = num;
                    break;

                  case "+":
                    _sku.CartQuantity += num;
                    break;
                }
                if (_sku.CartQuantity < 0) {
                    _sku.CartQuantity = 0;
                }
                if (_cursku && _cursku.SkuId == _sku.SkuId) {
                    _cursku.CartQuantity = _sku.CartQuantity;
                }
                hasEdit = true;
            }
        }
        if (hasEdit) {
            var newdata = {
                CurrentProduct: _curProduct,
                CurrentSku: _cursku
            };
            that.setData(newdata);
        }
    },
    setProductCartQuantity: function setProductCartQuantity(id, num, operator) {
        //修改商品购物车中存在数量
        var that = this;
        var hasEdit = false;
        var _Products = that.data.ProductList;
        var _pro = _Products.find(function(d) {
            return d.ProductId == id;
        });
        if (_pro) {
            num = parseInt(num);
            switch (operator) {
              case "=":
                _pro.CartQuantity = num;
                break;

              case "+":
                _pro.CartQuantity += num;
                break;
            }
            if (_pro.CartQuantity < 0) {
                _pro.CartQuantity = 0;
            }
            hasEdit = true;
        }
        if (hasEdit) {
            var newdata = {
                ProductList: _Products
            };
            that.setData(newdata);
        }
    },
    hideSkuDOM: function hideSkuDOM() {
        this.setData({
            isShowSkuSelectBox: false
        });
    },
    catchAddCart: function catchAddCart(e) {
        var that = this;
        var _domThis = e.currentTarget;
        var curProId = _domThis.dataset.productid;
        var curOP = _domThis.dataset.operator;
        var num = parseInt(curOP + "1");
        var opensku = _domThis.dataset.opensku;
        var _pro = that.findProductById(curProId);
        if (!_pro.HasSKU || _pro.HasSKU && opensku == "false") {
            if (that.data.CurrentSku && that.data.CurrentSku.Stock == 0) {
                app.showErrorModal("当前所选规格库存为0");
                return;
            }
            var curSku = _domThis.dataset.sku;
            that.addToCart(curProId, curSku, num);
        } else {
            wx.showLoading({
                title: "商品信息加载中..."
            });
            app.getOpenId(function(openid) {
                wx.request({
                    url: app.getUrl(app.globalData.getProductSkus),
                    data: {
                        ProductId: curProId,
                        openId: openid
                    },
                    success: function success(result) {
                        wx.hideLoading();
                        if (result.data.Status == "OK") {
                            var productInfo = result.data.Data;
                            var cursku = productInfo.DefaultSku;
                            var selectsku = [];
                            if (productInfo != null) {
                                productInfo.SkuItems.forEach(function(item, index, array) {
                                    item.AttributeValue.reverse();
                                    item.AttributeValue[0].UseAttributeImage = "selected";
                                    var defaultsku = new Object();
                                    defaultsku.ValueId = item.AttributeValue[0].ValueId;
                                    defaultsku.Value = item.AttributeValue[0].Value;
                                    selectsku.push(defaultsku);
                                });
                            }
                            that.setData({
                                CurrentProduct: productInfo,
                                CurrentSku: cursku,
                                selectedskuList: selectsku,
                                selectedSku: cursku.SkuId
                            });
                            that.showSkuDOM();
                        }
                    },
                    complete: function complete() {}
                });
            });
        }
    },
    findProductById: function findProductById(id) {
        var _pro = this.data.ProductList.find(function(d) {
            return d.ProductId == id;
        });
        return _pro;
    }
}, _defineProperty(_Page, "hideSkuDOM", function hideSkuDOM() {
    this.setData({
        isShowSkuSelectBox: false
    });
}), _defineProperty(_Page, "showSkuDOM", function showSkuDOM() {
    this.setData({
        isShowSkuSelectBox: true
    });
}), _defineProperty(_Page, "BuyProduct", function BuyProduct(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    //商品索引
        var hassku = e.currentTarget.dataset.sku;
    //是否存在规格
        var productId = e.currentTarget.dataset.productid;
    //商品编号
        var tempproduct = that.data.ProductList;
    var tempcrrentsku = null;
    if (hassku == false) {
        tempproduct[index].CartQuantity = 1;
        that.ChangeQuantiy(that, tempproduct, productId + "_0", 1);
        // that.setData({
        // isShow:true,
        // ProductList:tempproduct,
        // CurrentSku: tempcrrentsku,
        //  selectedskuList:[]
        // });
        } else {
        //存在规格弹出规格框
        wx.request({
            url: app.getUrl(app.globalData.getProductSkus),
            data: {
                ProductId: productId
            },
            success: function success(result) {
                if (result.data.Status == "OK") {
                    var productInfo = result.data.Data;
                    tempcrrentsku = productInfo.DefaultSku;
                    that.setData({
                        isShow: false,
                        CurrentProduct: productInfo,
                        CurrentSku: tempcrrentsku,
                        selectedskuList: []
                    });
                }
            },
            complete: function complete() {}
        });
    }
}), _defineProperty(_Page, "minusCount", function minusCount(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var tempproduct = this.data.ProductList;
    var cartquantiy = tempproduct[index].CartQuantity;
    if (cartquantiy <= 1) {
        return;
    }
    cartquantiy = cartquantiy - 1;
    tempproduct[index].CartQuantity = cartquantiy;
    that.ChangeQuantiy(that, tempproduct, tempproduct[index].SkuId, -1);
}), _defineProperty(_Page, "addCount", function addCount(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var tempproduct = this.data.ProductList;
    var cartquantiy = tempproduct[index].CartQuantity;
    cartquantiy = cartquantiy + 1;
    tempproduct[index].CartQuantity = cartquantiy;
    that.ChangeQuantiy(that, tempproduct, tempproduct[index].SkuId, 1);
}), _defineProperty(_Page, "ChangeQuantiy1", function ChangeQuantiy1(that, skuId, quantity) {
    app.getOpenId(function(openid) {
        wx.request({
            url: app.getUrl(app.globalData.getUpdateToCart),
            data: {
                openId: openid,
                SkuID: skuId,
                Quantity: quantity
            },
            success: function success(result) {
                if (result.data.Status == "OK") {} else {
                    if (result.data.Message == "NOUser") {
                        wx.navigateTo({
                            url: "../login/login"
                        });
                    } else {
                        app.showErrorModal(result.data.ErrorResponse.ErrorMsg);
                    }
                }
            },
            complete: function complete() {
                that.loadData(that);
            }
        });
    });
}), _defineProperty(_Page, "ChangeQuantiy", function ChangeQuantiy(that, tempproduct, skuId, quantity) {
    app.getOpenId(function(openid) {
        wx.request({
            url: app.getUrl(app.globalData.getUpdateToCart),
            data: {
                openId: openid,
                SkuID: skuId,
                Quantity: quantity
            },
            success: function success(result) {
                if (result.data.Status == "OK") {
                    that.setData({
                        ProductList: tempproduct
                    });
                } else {
                    if (result.data.Message == "NOUser") {
                        wx.navigateTo({
                            url: "../login/login"
                        });
                    } else {
                        app.showErrorModal(result.data.ErrorResponse.ErrorMsg);
                    }
                }
            },
            complete: function complete() {}
        });
    });
}), _defineProperty(_Page, "onSkuHide", function onSkuHide(e) {
    that.setData({
        isShow: true
    });
}), _defineProperty(_Page, "onSkuClick", function onSkuClick(e) {
    var that = this;
    var index = e.target.dataset.indexcount;
    var valueid = e.target.id;
    var value = e.target.dataset.skuvalue;
    var selInfo = new Object();
    selInfo.ValueId = valueid;
    selInfo.Value = value;
    var selSku = this.data.selectedskuList;
    selSku[index] = selInfo;
    var selContent = "";
    var isAlSelected = false;
    var tempcurrentproduct = this.data.CurrentProduct;
    var itemList = this.data.CurrentProduct.SkuItems;
    if (tempcurrentproduct.SkuItems.length == selSku.length) isAlSelected = true;
    var skuId = tempcurrentproduct.ProductId;
    for (var i = 0; i < selSku.length; i++) {
        var info = selSku[i];
        if (info != undefined) {
            selContent += selContent == "" ? info.Value : "," + info.Value;
            skuId += "_" + info.ValueId;
        }
    }
    //var curentItem = itemList[index];
        for (var j = 0; j < tempcurrentproduct.SkuItems[index].AttributeValue.length; j++) {
        var item = tempcurrentproduct.SkuItems[index].AttributeValue[j];
        if (item.ValueId == valueid) {
            tempcurrentproduct.SkuItems[index].AttributeValue[j].UseAttributeImage = "selected";
        } else {
            tempcurrentproduct.SkuItems[index].AttributeValue[j].UseAttributeImage = "False";
        }
    }
    var currentProductSku = null;
    this.data.CurrentProduct.Skus.forEach(function(item, index, array) {
        var found = true;
        for (var i = 0; i < selSku.length; i++) {
            if (item.SkuId.indexOf("_" + selSku[i].ValueId) == -1) found = false;
        }
        if (found && itemList.length == selSku.length) {
            currentProductSku = item;
            skuId = item.SkuId;
            that.data.buyAmount = item.CartQuantity > 0 ? item.CartQuantity : 1;
            return;
        }
    });
    this.setData({
        selectedskuList: selSku,
        selectedSku: skuId,
        selectedSkuContent: selContent,
        SkuItemList: itemList,
        CurrentProduct: tempcurrentproduct,
        CurrentSku: currentProductSku
    });
}), _defineProperty(_Page, "OpenCurrentSku", function OpenCurrentSku() {
    var that = this;
    var tempproduct = that.data.ProductList;
    var currentsku = that.data.CurrentSku;
    if (currentsku == null || currentsku == undefined) {
        app.showErrorModal("请选择规格内容");
    }
    currentsku.CartQuantity = 1;
    that.setData({
        CurrentSku: currentsku
    });
    that.ChangeQuantiy1(that, currentsku.SkuId, 1);
}), _defineProperty(_Page, "bindSearchInput", function bindSearchInput(e) {
    var keyword = e.detail.value;
    if (keyword.length > 0) {
        this.setData({
            keyword: keyword
        });
    }
}), _defineProperty(_Page, "bindConfirmSearchInput", function bindConfirmSearchInput(e) {
    var keyword = e.detail.value;
    if (keyword.length > 0) {
        wx.setStorage({
            key: "keyword",
            data: keyword
        });
        wx.switchTab({
            url: "../searchresult/searchresult",
            success: function success(res) {
                wx.hideKeyboard();
            }
        });
    }
}), _defineProperty(_Page, "gotoKeyWordPage", function gotoKeyWordPage(e) {
    wx.navigateTo({
        url: "../search/search"
    });
}), _defineProperty(_Page, "bindBlurInput", function bindBlurInput(e) {
    wx.hideKeyboard();
}), _defineProperty(_Page, "changeAmount", function changeAmount(e) {
    var that = this;
    var amount = parseInt(e.detail.value);
    var stock = this.data.CurrentSkuStock;
    if (isNaN(amount) || amount > stock || amount <= 0) {
        app.showErrorModal("请输入正确的数量,不能大于库存或者小于等于0");
        return;
    } else {
        this.setData({
            buyAmount: amount
        });
    }
}), _defineProperty(_Page, "reduceAmount", function reduceAmount(e) {
    var amount = this.data.buyAmount;
    amount = amount - 1;
    if (amount <= 0) return; else {
        this.setData({
            buyAmount: amount
        });
    }
}), _defineProperty(_Page, "addAmount", function addAmount(e) {
    var amount = this.data.buyAmount;
    var stock = this.data.CurrentSku.Stock;
    amount = amount + 1;
    if (amount > stock) {
        app.showErrorModal("请输入正确的数量,不能大于库存或者小于等于0");
        return;
    } else {
        this.setData({
            buyAmount: amount
        });
    }
}), _defineProperty(_Page, "loadData", function loadData(that, isNextPage) {
    wx.showNavigationBarLoading();
    app.getOpenId(function(openid) {
        wx.request({
            url: app.getUrl(app.globalData.getProducts),
            data: {
                keyword: that.data.KeyWord,
                pageIndex: that.data.PageIndex,
                pageSize: that.data.PageSize,
                sortBy: that.data.SortBy,
                sortOrder: that.data.SortOrder,
                cId: that.data.Cid,
                openId: openid
            },
            success: function success(result) {
                if (result.data.Status == "OK") {
                    var r = result.data.Data;
                    console.log("商品分类r：" + r);
                    if (isNextPage) {
                        var old = that.data.ProductList;
                        old.push.apply(old, r);
                        that.setData({
                            ProductList: old
                        });
                    } else {
                        that.setData({
                            ProductList: r
                        });
                    }
                } else {
                    app.showErrorModal(result.data.Message, function(res) {
                        if (res.confirm) {
                            wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                }
            },
            complete: function complete() {
                wx.getSystemInfo({
                    success: function success(res) {
                        var l_height = res.windowHeight - 53;
                        var tempCss = that.data.Css;
                        tempCss.LHeight = l_height;
                        tempCss.TempHeight = l_height;
                        that.setData({
                            CSS: tempCss
                        });
                    }
                });
                wx.hideNavigationBarLoading();
            }
        });
    });
}), _defineProperty(_Page, "SetSubCategoryHeight", function SetSubCategoryHeight() {
    var subcategory = this.data.CurrentCategory.subs;
    var num_count = parseInt(subcategory.length) + 1;
    var line_num = num_count / 3;
    if (num_count % 3 > 0) {
        line_num = parseInt(line_num) + 1;
    }
    var temp_height = 0;
    if (line_num > 1) {
        temp_height = (line_num - 1) * 90;
    }
    this.setData({
        MarginTop: temp_height,
        TempMarginTop: temp_height,
        IsDown: true
    });
}), _defineProperty(_Page, "commitBuy", function commitBuy(e) {
    var that = this;
    var isselectsku = true;
    for (var x = 0; x < that.data.selectedskuList.length; x++) {
        if (this.data.selectedskuList[x] == undefined || that.data.selectedskuList[x] == "" || this.data.selectedskuList[x] == null) {
            isselectsku = false;
            break;
        }
    }
    if (this.data.SkuItemList == null || that.data.selectedskuList.length != this.data.SkuItemList.length || !isselectsku) {
        app.showErrorModal("请选择规格");
        return;
    }
    if (that.data.buyAmount <= 0) {
        app.showErrorModal("请输入要购买的数量");
        return;
    }
    var amount = this.data.buyAmount;
    var skuid = this.data.selectedSku;
    //选中的规格
        var stock = this.data.CurrentSku.Stock;
    if (amount > stock) {
        app.showErrorModal("请输入正确的数量,不能大于库存或者小于等于0");
        return;
    }
    var cartquantiy = this.data.CurrentSku.CartQuantity;
    var quantity = amount - cartquantiy;
    //实际购买的件数
        var tempproduct = this.data.ProductList;
    //获取商品列表
        tempproduct.find(function(item, index) {
        if (item.ProductId == that.data.CurrentProduct.ProductId) {
            item.CartQuantity += quantity;
            return;
        }
    });
    that.ChangeQuantiy(that, tempproduct, skuid, quantity);
    that.onSkuHide(e);
}), _defineProperty(_Page, "onSkuHide", function onSkuHide(e) {
    this.setData({
        isShow: true,
        CurrentSku: null,
        CurrentProduct: null,
        selectedSku: "",
        buyAmount: 1
    });
}), _defineProperty(_Page, "ChooseCategory", function ChooseCategory(e) {
    var that = this;
    var cid = e.currentTarget.dataset.cid;
    //获取分类Id
        var grade = e.currentTarget.dataset.grade;
    var currentIndex = e.currentTarget.dataset.index;
    var tempCss = that.data.Css;
    if (grade == "1") {
        that.data.CategoryList.find(function(item, index) {
            tempCss.FirstIndex = currentIndex;
            tempCss.SecondIndex = 0;
            if (item.cid == cid) {
                that.setData({
                    CurrentCategory: item,
                    Css: tempCss,
                    Cid: cid,
                    PageIndex: 1
                });
                that.SetSubCategoryHeight();
                return;
            }
        });
    } else {
        tempCss.SecondIndex = currentIndex;
        that.setData({
            Css: tempCss,
            Cid: cid,
            PageIndex: 1
        });
    }
    that.loadData(that, false);
}), _defineProperty(_Page, "SortClick", function SortClick(e) {
    var that = this;
    var sortby = e.currentTarget.dataset.sortby;
    var currentIndex = e.currentTarget.dataset.index;
    var tempCss = that.data.Css;
    tempCss.SortIndex = currentIndex;
    var sortorder = "asc";
    var classname = "shengxu";
    if (that.data.SortOrder == sortorder) {
        sortorder = "desc";
        classname = "jiangxu";
    }
    that.setData({
        PageIndex: 1,
        SortBy: sortby,
        SortOrder: sortorder,
        SortClass: classname,
        Css: tempCss
    });
    that.loadData(that, false);
}), _defineProperty(_Page, "ChooseProduct", function ChooseProduct(e) {
    var productId = e.currentTarget.dataset.productid;
    wx.navigateTo({
        url: "../productdetail/productdetail?id=" + productId
    });
}), _defineProperty(_Page, "onReady", function onReady() {}), _defineProperty(_Page, "onShow", function onShow() {
    this.loadData(this, false);
}), _defineProperty(_Page, "onHide", function onHide() {}), _defineProperty(_Page, "onUnload", function onUnload() {}), 
_defineProperty(_Page, "onPullDownRefresh", function onPullDownRefresh() {}), _defineProperty(_Page, "onReachBottom", function onReachBottom() {
    var pageindex = this.data.PageIndex;
    pageindex = parseInt(pageindex) + 1;
    this.setData({
        PageIndex: pageindex
    });
    this.loadData(this, true);
}), _defineProperty(_Page, "onShareAppMessage", function onShareAppMessage() {}), 
_Page));