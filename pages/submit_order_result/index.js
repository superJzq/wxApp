

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    success:null,
    setting:null
  },
  /* 去充值 */
  toAccount:function(){
    wx.navigateTo({
      url: '/pages/user_recharge/index',
    })
  },
  /* 立即支付 */
  payNow:function(e){
  
    var orderNo = e.currentTarget.dataset.orderno
    var orderItem = this.data.success

    if (orderItem.payType == 2){
      console.log('-----余额支付-----')
      this.payByYue(orderItem.orderNo)
    }
    if (orderItem.payType == 3){
      console.log('-----微信支付-----')
      this.payByWechat(orderItem.orderNo)
    }
    
  },
  //微信支付
  payByWechat: function (orderNo){
    var that = this
    let loginUser = app.loginUser
    console.log(loginUser)
    let wxChatPayParam = {
      openid:'',
      orderNo: '',
      app:3
    }
    wxChatPayParam.openid = loginUser.platformUser.miniOpenId
    wxChatPayParam.orderNo = orderNo
    console.log(wxChatPayParam)
    let customIndex = app.AddClientUrl("/unifined_order.html", wxChatPayParam, 'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        let PayStr = res.data
        PayStr ='{' +PayStr+'}'
        let wechatPayStr = JSON.parse(PayStr)
        console.log(wechatPayStr)
        wx.requestPayment({
          'timeStamp': wechatPayStr.timeStamp,
          'nonceStr': wechatPayStr.nonceStr,
          'package': wechatPayStr.package,
          'signType': wechatPayStr.signType,
          'paySign': wechatPayStr.paySign,
          'success': function (res) {
            console.log('------成功--------')
            console.log(res)
          },
          'fail': function (res) {
            console.log('------fail--------')
            console.log(res)
          },
          'complete':function(){
            console.log('------complete--------')
            console.log(res)
          }
        })
      }
    })
  },
  /* 余额支付 */
  payByYue: function (orderNo){
    var that = this
    console.log(orderNo)

    wx.showModal({
      title: '提示',
      content: '确认付款',
      success: function (res) {
        if (res.confirm) {
          let param_post = {}
          param_post.orderNo = orderNo
          var customIndex = app.AddClientUrl("/order_account_pay.html", param_post,'post')

          wx.request({
            url: customIndex.url,
            data: customIndex.params,
            header: app.headerPost,
            method: 'POST',
            success: function (res) {
              console.log(res.data)
              if (res.data.errcode == '0') {
                wx.showToast({
                  title: '付款成功',
                  icon: 'success',
                  duration: 2000
                })
                setTimeout(function () {
                  wx.redirectTo({
                    url: '/pages/order_list/index',
                  })
                }, 2000)
              } else {
                wx.showToast({
                  title: res.data.errMsg,
                  image: '/images/icons/tip.png',
                  duration: 2000
                })
              }
            },
            fail: function (res) {
              app.loadFail()
            }
          })
        } else if (res.cancel) {

        }
      }
    })
  },
  toIndex:function(){
    app.toIndex()
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.payItem)
    this.setData({
      success: app.payItem
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({ setting: app.setting })
    this.setData({ loginUser: app.loginUser })
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
  
  }
})