
const app = getApp() 
Page({
 
  /** 
   * 页面的初始数据
   */ 
  data: { 
    orderData:{},
    orderNo:'',
    //优惠券 
    getEditOrderDetailData:null,
    coupon:[],
    coupon2:[],
    index: 0,//
    gotCouponListId:0,
    couponMoney:0,

    setting: null,
    loginUser: null,
    
    //otherArr
    showArr:false,
    addrArr:null,
    hasAddnewAddr:false,
  },
  //will sent
  orderMessage:{
    platformNo:'',
    gotCouponListId:'',
    userId:'', 

    orderNo: '',
    payType: '2',
    buyerScript: '',
    addressId: '',
    jifenDikou: '0',
    buyerBestTime: '',
  },
  /* 积分抵扣 */
  jifenChange :function (e){
    //console.log(e.detail.value[0])
    let jifen = e.detail.value[0]
    this.orderMessage.jifenDikou = jifen
  },
  /* 获取地址列表 */
  showOtherArr:function() {
    var customIndex = app.AddClientUrl("/get_login_user_address_list.html")
    var that = this
    wx.showLoading({
      title: 'loading'
    })
    wx.request({
      url: customIndex.url ,
      header: app.header,
      success: function (res) {
        console.log(res.data)
        wx.hideLoading()
        that.setData({ addrArr:res.data.result, showArr: true })
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
    
  },
  toaddress_new: function() {
    this.setData({ hasAddnewAddr:true})
    wx.navigateTo({
      url: '/pages/add_address/index',
    })
  },
  chooseNewAddr: function (e) {
    wx.showLoading()
    //console.log(e.currentTarget.dataset.chooseid)
    var addrArr = this.data.addrArr
    console.log(addrArr)
    var addressId = e.currentTarget.dataset.chooseid
    var selectAddr = null
    for (let i = 0; i < addrArr.length;i++){
      if (addressId == addrArr[i].id){
        selectAddr = addrArr[i]
      }
    }
    console.log(selectAddr)
    this.data.orderData.buyerName = selectAddr.contactName
    this.data.orderData.buyerTelno = selectAddr.telNo
    this.data.orderData.buyerProvince = selectAddr.province
    this.data.orderData.buyerCity = selectAddr.city
    this.data.orderData.buyerArea = selectAddr.area
    this.data.orderData.buyerAddress = selectAddr.address
   // this.data.orderData.buyerName = selectAddr.contactName
    //this.addressId = addressId
    this.orderMessage.addressId = addressId
    this.setData({
      orderData: this.data.orderData,
      showArr:false
    })
    wx.hideLoading()
  },
  closeShowArr: function () {
    this.setData({ showArr: false })
  },
  /* 支付方式 */
  payWayChange: function(e) {
    console.log(e.detail.value)
    this.orderMessage.payType = e.detail.value
  },
  getBuyerScript: function(e) {
    this.orderMessage.buyerScript = e.detail.value
  },
  //优惠券
  bindPickerChange: function(e) {
    console.log(e.detail)
    var index = e.detail.value
    var coupon = this.data.coupon
    if (index == 0){
      this.setData({
        index: index,
        couponMoney: 0
      })
    }else{
      var gotCouponListId = coupon[index].id
      console.log(gotCouponListId)
      this.orderMessage.gotCouponListId = gotCouponListId
      this.getEditOrderDetail()
      this.setData({
        index: index,
        gotCouponListId: gotCouponListId,
        couponMoney: coupon[index].coupon.youhuiAmount
      })
    }
   
  },
  // 这里需要修改
  getavailableCouponsArr: function() { 
    var arr = ['no']
    var arr2 = ['请选择优惠券']
    for (let i = 0; i < this.data.getEditOrderDetailData.availableCoupons.length;i++){
      arr.push(this.data.getEditOrderDetailData.availableCoupons[i])
      arr2.push(this.data.getEditOrderDetailData.availableCoupons[i].couponName)
    }
    this.setData({ coupon: arr, coupon2: arr2})
    console.log('----------1----------')
    console.log(arr)
    console.log('----------2----------') 
    console.log(arr2)
  },
 
  getEditOrderDetail: function () {
    var that = this

    var getParams = {}
    getParams.orderNo = that.data.orderNo
    getParams.gotCouponListId = that.data.gotCouponListId
    var customIndex = app.AddClientUrl("/get_edit_order_detail.html", getParams)
    wx.showLoading({
      title: 'loading'
    })
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log(res)

        that.setData({ getEditOrderDetailData:res.data })
        that.setData({ orderData:res.data})
        that.getavailableCouponsArr()
        that.loadMessage()
        wx.hideLoading()
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
  /* 确认订单 */
  submitOrder:function(){
    var that = this
    console.log(this.orderMessage)
    if (!this.orderMessage.addressId){
      wx.showModal({
        title: '提示',
        content: '请添加收货地址',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/add_address/index'
            })
          } else if (res.cancel) {

          }
        }
      })
      
    }else{
      var customIndex = app.AddClientUrl("/submit_order.html", that.orderMessage,'post')
      
      wx.showLoading({
        title: 'loading',
        mask: true
      })
      wx.request({
        url: customIndex.url,
        data: customIndex.params,
        header:app.headerPost,
        method: 'POST',
        success: function (res) {
          console.log('--------确认订单------- ')
          console.log(res)
          console.log(res.data)
          if(res.data.errcode == '10001'){
            wx.showModal({
              title: '提示',
              content: '用户未登录',
              success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/login/index'
                  })
                } else if (res.cancel) {

                }
              }
            })
          }else{
            app.payItem = res.data  /* 全局传过去吧... */
            wx.hideLoading()
            wx.redirectTo({
              url: '/pages/submit_order_result/index',
            })
          }
          
          
        },
        fail: function (res) {
          wx.hideLoading()
          app.loadFail()
        }
      })
    }
  },

  onLoad: function (o) {
    var that = this
    this.setData({ setting: app.setting })
    this.setData({ loginUser: app.loginUser })
    console.log(o)
    if (!!o.orderNo){
      this.data.orderNo = o.orderNo
      this.setData({
        orderData: this.data.orderNo
      })
     
      that.getEditOrderDetail()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  loadMessage: function () {
    this.orderMessage.platformNo = app.setting.platformSetting.platformNo
    this.orderMessage.userId = app.loginUser.id
    this.orderMessage.orderNo = this.data.orderData.orderNo
    this.orderMessage.jifenDikou = this.data.orderData.orderJifen.tuijianDikou
    this.orderMessage.gotCouponListId = this.data.gotCouponListId
    this.orderMessage.addressId = this.data.orderData.addressId



    console.log('----------------------------')
    console.log(this.orderMessage)
    console.log('----------------------------')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (!!this.data.orderNo) {
      this.getEditOrderDetail()
    }
    if(this.data.hasAddnewAddr){
      this.showOtherArr()
    }
    
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
  
  }
})