  
var WxParse = require('../../wxParse/wxParse.js');

const app = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    setting: null, // setting 
    productData: null, // 商品数据 
    cart:null,
    countGood:0,

    showCount:false,
    byNowParams:{},
    targs:null,

    bindway:'cart',  //点击的是加入购物车或者立即购买
    showState: 0,
    commitList:[],
    measurementJson:null,
  },
  showCouponState: function (e) {
    var index = e.currentTarget.dataset.id
    this.setData({
      showState: index
    })
  },

  /* 删除收藏 */
  removeFavourite: function (e) {
    var that = this
    wx.showLoading({
      title: 'loading'
    })
    var postData = {
      itemId: '',
      favoriteType: '1'
    }
    let productData = this.data.productData

    postData.itemId = e.currentTarget.dataset.itemid
    console.log(postData)
    
    var customIndex = app.AddClientUrl("/remove_favorite.html", postData,'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        if (res.data.errcode == '0'){
          productData.productInfo.favorite = 0
          that.setData({ productData: productData })
          console.log('000---'+that.data.productData.productInfo.favorite)
        }
       

      },
      fail: function (res) {
       
        app.loadFail()
      },
      complete:function(res){
        wx.hideLoading()
      }
    })
  },
  /* 加入收藏 */
  addToFavourite:function(e){
    var that = this
    var postData={
      itemId:'',
      favoriteType:'1'
    }
    wx.showLoading({
      title: 'loading'
    })
    let productData = this.data.productData

    postData.itemId = e.currentTarget.dataset.itemid
    console.log(postData)
    
    var customIndex = app.AddClientUrl("/add_to_favorite.html", postData,'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        if (res.data.errcode == '0') {
          productData.productInfo.favorite = 1
          that.setData({ productData: productData })
          console.log('111---' + that.data.productData.productInfo.favorite)
        }

      },
      fail: function (res) {
        app.loadFail()
      },
      complete: function (res) {
        wx.hideLoading()
      }
    })
  },
  /* 查看图文详情   -- 已禁用 */
  lookDerection: function (e) {
    var images = e.currentTarget.dataset.derection
    var sentMessage = "";
    for (let i = 0; i < images.length; i++){
      sentMessage += "&" + i + "=" + images[i]
    }
    sentMessage =  sentMessage.substring(1)
    console.log(sentMessage)
    wx.navigateTo({
      url: '/pages/productDetail_derection/index?' + sentMessage,
    })
  },
  /* 查看评价 */
  
  getCommitData: function (param) {
    //productInfo  var paramStr = 'page=1&productId=' + info.productId+'&shopId=' + info.belongShopId
    //var info = e.currentTarget.dataset.info
    //根据把param变成&a=1&b=2的模式
   // var postParam = this.ChangeParam(param)
    console.log('-----getcommit-------------')
    //console.log(postParam)
    var customIndex = app.AddClientUrl("/get_product_comment_list.html", param)
    wx.showLoading({
      title: 'loading'
    })
    var that = this
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log('-----------评价--------')
        console.log(res.data)
        if (!res.data.result || res.data.result.length == 0){
          that.setData({ commitList: null })
        }
        else{
          that.setData({ commitList: res.data.result })
        }
        
      },
      fail: function (res) {
        console.log("fail")
        app.loadFail()
      },
      complete: function (res) {
        wx.hideLoading()
      }
    })
  },
  ChangeParam: function (params) {
    var returnParam = ""
    for (let i in params) {
      returnParam += "&" + i + "=" + params[i]
    }
    return returnParam
  },




  /* dadianhua */
  callShop: function() {
    if (this.data.setting){
      wx.makePhoneCall({
        phoneNumber: this.data.setting.platformSetting.defaultShopBean.telno //仅为示例，并非真实的电话号码
      })
    }
   
  },
  toCart:function(){
    wx.switchTab({
      url: '/pages/shopping_car_list/index',
    })
  },
  /* 找到购物车里面的内容 */
  findInCart: function (data) {
    var cart = null
    this.postParams(data)
    
  },
  readyPay: function (e) {
    this.setData({ showCount: true })
    let info = e.currentTarget.dataset.item
    this.byNowParams.productId = info.productId
    this.byNowParams.shopId = info.belongShopId
    this.byNowParams.orderType = 0
    this.setData({ byNowParams: this.byNowParams})
  },
  readyPay2: function (e) {
    if (!app.checkIfLogin()) {
      return
    }
    let productData = this.data.productData
    let way = e.currentTarget.dataset.way
    if (way == 'cart'){
      if (productData.measures.length == 0) {
        this.addtocart()
      } else {

        this.setData({ bindway: way })
        this.setData({ showCount: true })
        let info = productData.productInfo
        this.byNowParams.productId = info.productId
        this.byNowParams.shopId = info.belongShopId
        this.byNowParams.orderType = 0
        this.setData({ byNowParams: this.byNowParams })
        this.chooseMeasureItem()
      }
    }else{

        this.setData({ bindway: way })
        this.setData({ showCount: true })
        let info = productData.productInfo
        this.byNowParams.productId = info.productId
        this.byNowParams.shopId = info.belongShopId
        this.byNowParams.orderType = 0
        this.setData({ byNowParams: this.byNowParams })
        this.chooseMeasureItem()
      
    }
    

   

  },
  closeZhezhao: function () {
    this.setData({ showCount: false })
  },
  subNum: function () {
    if (this.byNowParams.itemCount == 1){
      return
    }
    this.byNowParams.itemCount--;
    this.setData({ byNowParams: this.byNowParams })
  },
  addNum: function () {
    this.byNowParams.itemCount++;
    this.setData({ byNowParams: this.byNowParams })
  },
  byNowParams:{
    productId: '',
    itemCount: 1,
    shopId: '',
    cartesianId: '0', 
    chatOrder: '',
    fromSource: '', 
    orderType: ''
  },
  /* 立即购买 */
  buyNow:function(){
    if (!app.checkShopOpenTime()) {
      return
    }
    
    if (!app.checkIfLogin()) {
     
      return
    }
    let bindway = this.data.bindway
    console.log(bindway)
  
    if (bindway == 'cart'){
      console.log('-----------addtocart----------')
      this.addtocart()
    }else{
      console.log('-----------buyNow----------')
      this.createOrder22(this.byNowParams)
    }
    
    
  },
  /* 创建订单 */
  createOrder22: function (o) {
    var customIndex = app.AddClientUrl("/buy_now.html", o,'post')
    var that = this
    wx.showLoading({
      title: 'loading',
      mask: true
    })
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log(res)
        if (!!res.data.orderNo) {
          wx.navigateTo({
            url: '/pages/edit_order/index?orderNo=' + res.data.orderNo,
          })
        } else {
          wx.showToast({
            title: res.data.errMsg,
            image: '/images/icons/tip.png',
            duration: 1000
          })
        }
      },
      fail: function (res) {
        app.loadFail()
      },
      complete: function (res) {
        wx.hideLoading()
      }
    })
  },

  /* 加入購物車 */
  addtocart: function () {
   
    if (!app.checkIfLogin()) {
      
      return
    }
    var params = {
      cartesianId: '',
      productId: '',
      shopId: '',
      count: '',
      type: '',
    }

    if (this.data.productData.measures.length == 0){
      params.cartesianId = '0'
    }
    else{
      params.cartesianId = this.data.measurementJson.id
    }

    params. productId = this.data.productData.productInfo.productId
    params. shopId = this.data.productData.productInfo.belongShopBean.id
    params.count = this.byNowParams.itemCount
    params. type = 'add'
    
    this.postParams(params)

  },


  postParams: function (data) {
    var that = this
    var customIndex = app.AddClientUrl("/change_shopping_car_item.html",data,'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log('---------------change_shopping_car_item-----------------')
        console.log(res.data)
        wx.hideLoading()
        
        if (that.data.bindway == 'cart') {
          that.setData({ showCount: false })
        }
        if (res.data.productId && res.data.productId != 0 ) {
          if(data.count == 0){
              console.log('通过加入购物车来确定购物车里面的商品数量')
          }else{
            wx.showToast({
              title: '加入购物车成功',
            })
          }
          
           if (!!res.data.totalCarItemCount || res.data.totalCarItemCount == 0) {
             that.setData({ countGood: res.data.totalCarItemCount })
           }
        }else{
          wx.showToast({
            title: res.data.errMsg,
            image: '/images/icons/tip.png',
            duration: 2000
          })
        }

        
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
    
  /**
   * 生命周期函数--监听页面加载
   */
  getData:function(options){
    let param = {}
    let that = this
    if (!options){
      param = that.dataFOr_getData
    }else{
      param = options
    }

    wx.showLoading({
      title: 'loading'
    })
    
    let postParam = {}
    postParam.productId = param.id
    postParam.addShopId = param.addShopId
    let customIndex = app.AddClientUrl("/product_detail.html", postParam)

    wx.request({
      /* url: app.clientUrl + app.clientNo + "/product_detail_" + param.id + ".html?jsonOnly=1" + "&addShopId=" + param.addShopId, */
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log(res.data)
       
        console.log('--------------getData-------------')
        
        that.setData({ productData: res.data })
        
        if (!!res.data.productInfo.tags){
          let tagsStr = res.data.p11roductInfo.tags
          let tagsStr2 = tagsStr.replace(/\[/g, '');
          let tagArr = tagsStr2.split(']')
          tagArr.length --;
          that.setData({
            targs: tagArr
          })
        }
        if (!!res.data.description){
          WxParse.wxParse('article', 'html', res.data.description.description, that, 0);
        }
        if (!!res.data.productInfo){
          let info = res.data.productInfo
          let postPatam = {}
          //var paramStr = 'page=1&productId=' + info.productId+'&shopId=' + info.belongShopId
          postPatam.page = 1
          postPatam.productId = info.productId
          postPatam.shopId = info.belongShopId
          that.getCommitData(postPatam)
          that.getCart()
        }
        

        
      },
      fail: function (res) {
        console.log("fail")
        app.loadFail()
      },
      complete:function(res){
        wx.hideLoading()
      },
    })
  },
  dataFOr_getData:{
    id:'',
    addShopId:''
  },
  onLoad: function (options) {
    console.log('--------product----------')
    console.log(options)
    this.dataFOr_getData.id = options.id
    this.dataFOr_getData.addShopId = options.addShopId
    
    this.getData(options)
  },



  getCart: function () {


    var params = {
      cartesianId: '',
      productId: '',
      shopId: '',
      count: '',
      type: '',
    }


    params.productId = this.data.productData.productInfo.productId
    params.shopId = this.data.productData.productInfo.belongShopBean.id
    params.count = 0
    params.type = 'add'

    this.postParams(params)

    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({ setting: app.setting })
    
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },



  /* 
     规格操作
  */
  MeasureParams: [],
  //提交规格产品
  submitMeasure: function (id) {
    var that = this
    let focusProduct = this.data.MeasureItem
    let measurementJson = this.data.measurementJson
    let data = {}
    data.cartesianId = measurementJson.id
    data.productId = focusProduct.id
    data.shopId = focusProduct.belongShopId
    data.count = 1
    data.type = 'add'

    var customIndex = app.AddClientUrl("/change_shopping_car_item.html", data, 'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log('--------add----------')
        console.log(res.data)
        that.setData({ showGuigeType: false })
      
      },
      fail: function (res) {
        app.loadFail()
      },
      complete:function(){
        wx.hideLoading()
      }
    })
  },
  //获取规格价格参数
  get_measure_cartesion: function () {
    
    let productId = this.data.productData.productInfo.productId
    let postStr = ''
    if (this.MeasureParams.length == 0){
      this.byNowParams.cartesianId = '0'
      return
    }
    for (let i = 0; i < this.MeasureParams.length; i++) {
      postStr += this.MeasureParams[i].value + ','
    }
    let param = {}
    param.productId = productId
    param.measureIds = postStr
    let customIndex = app.AddClientUrl("/get_measure_cartesion.html", param)

    var that = this
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log(res.data)
        that.byNowParams.cartesianId = res.data.id
        that.setData({
          measurementJson: res.data
        })
      },
      fail: function (res) {
        console.log("fail")
        app.loadFail()
      },
      complete: function () {
      },
    })
  },
  /* 初始化 选规格 */
  chooseMeasureItem: function (event) {
    console.log('----------初始化规格参数-----------')
    let productData = this.data.productData
    let focusProduct = productData
    for (let i = 0; i < focusProduct.measures.length; i++) {
      focusProduct.measures[i].checkedMeasureItem = 0
      //初始化选择的数据
      let param = {}
      param.name = focusProduct.measures[i].name
      param.value = focusProduct.measures[i].productAssignMeasure[0].id

      this.MeasureParams.push(param)

    }
    this.setData({
      productData: focusProduct
    })
    this.get_measure_cartesion()
  },
  //选择规格小巷的---显示
  radioChange: function (e) {
    let index = e.currentTarget.dataset.index
    let indexJson = app.getSpaceStr(index, '-')
    //console.log(indexJson)

    let focusItem = this.data.productData
    focusItem.measures[indexJson.str1].checkedMeasureItem = indexJson.str2
    this.setData({ productData: focusItem })
  },
  //选择规格小巷---获取数据
  chooseMeasure: function (e) {
    console.log(e.detail.value)
    let chooseMeasureJson = app.getSpaceStr(e.detail.value, '-')
    console.log(chooseMeasureJson)

    for (let i = 0; i < this.MeasureParams.length; i++) {
      if (this.MeasureParams[i].name == chooseMeasureJson.str1) {
        this.MeasureParams[i].value = chooseMeasureJson.str2
      }
    }
    this.get_measure_cartesion()
  },

  closeGuigeZhezhao: function () {
    this.setData({ showGuigeType: false })
    this.MeasureParams = []
  },

})