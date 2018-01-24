// pages/back_item_detail/index.js
const app = getApp()
Page({

  /** 
   * 页面的初始数据
   */
  data: {
    setting:null,
    Data:null,
    Reason:''
  },
  getReason:function(e){
    this.setData({
      Reason:e.detail.value
    })
  },
  sureBackItem:function(){
    let Reason = this.data.Reason
    let Data = this.data.Data
    let param = {}
      param.orderItemId = Data.id,
      param.backReason =  Reason
    
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认退款',
      success: function (res) {
        if (res.confirm) {
          var customIndex = app.AddClientUrl("/send_back_order_item_req.html", param,'POST')

          wx.request({
            url: customIndex.url,
            data: customIndex.params,
            header: app.headerPost,
            method: 'POST',
            success: function (res) {
              console.log(res.data)
              if(res.data.errcode == '0'){
                wx.showToast({
                  title: '申请退款成功',
                  icon: 'success',
                  duration: 2000
                })
                setTimeout(function () {
                  wx.navigateBack()
                }, 2000)
              }else{
                wx.showToast({
                  title: res.data.errMsg,
                  image: '/images/icons/tip.png',
                  duration: 2000
                })
              }
            },
            fail: function (res) {

            }
          })
        } else if (res.cancel) {

        }
      }
    })
    
    console.log(Reason)
  },

  getItem: function (orderItemId){
    var that = this
    let param = {}
    param.orderItemId = orderItemId
    console.log(orderItemId)
    var customIndex = app.AddClientUrl("/get_back_order_item_page.html", param ,'get')
          wx.request({
            url: customIndex.url ,
            header: app.header,
            success: function (res) {
              that.setData({
                Data:res.data
              })
              console.log(res.data)
              
            },
            fail: function (res) {
              app.loadFail()
            }
          })
       
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getItem(options.orderItemId)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      setting:app.setting
    })
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