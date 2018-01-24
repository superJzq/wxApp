
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: 10,
   
  },
  
  getBuyerScript: function (e) {
    this.setData({ money: e.detail.value })
  },

  subMitButn: function () {
    var that = this
    let money = Number(this.data.money) 
    if (money < 0 || money == 0 ){
      return
    }
    let wxChatPayParam = {
      amount: ''
    }

    wxChatPayParam.amount = Number(money) 
    let customIndex = app.AddClientUrl("/req_tixian.html", wxChatPayParam, 'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log(res)
        if (!!res.data.id){
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
        }
        

      },
      fail: function () {

      },


    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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