
const app = getApp() 
Page({

  /**
   * 页面的初始数据 
   */
  data: {

    setting: null,
    loginUser: null,

    orderNo:null,
    orderDetailData:null
  },
  getOrderDetail:function(id){
    let that = this
    let getParams = {}
    getParams.orderNo = id
    let customIndex = app.AddClientUrl("/get_order_detail.html", getParams)
    
    wx.showLoading({
      title: 'loading'
    })
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log('-----------orderDetail--------')
        console.log(res.data)
        that.setData({ orderDetailData: res.data})
        wx.hideLoading()
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
  onLoad: function (o) {
    var that = this
    this.setData({ setting: app.setting })
    this.setData({ loginUser: app.loginUser })
    console.log(o)
    if (!!o.orderNo) {
      this.data.orderNo = o.orderNo
      this.setData({
        orderNo: this.data.orderNo
      })

      that.getOrderDetail(o.orderNo)
    }else{
      wx.navigateBack()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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