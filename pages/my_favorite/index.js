
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    favouriteList: []
  },
  toProductDetail: function (event) {
    var info = event.currentTarget.dataset.info
    wx.navigateTo({
      url: '/pages/productDetail/index?id=' + info.itemId + "&addShopId=" + info.shopId,
    })
  },
  /* 获取 */
  getUserVisitList: function () {

    let getParam = {}
    getParam.favoriteType = 1
    getParam.page = this.listPage.page
    var customIndex = app.AddClientUrl("/get_favorite.html", getParam)
    var that = this
    wx.showLoading({
      title: 'loading'
    })
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log('-----------get_favorite--------')
        console.log(res.data)
        that.listPage.pageSize = res.data.pageSize
        that.listPage.curPage = res.data.curPage
        that.listPage.totalSize = res.data.totalSize
        let dataArr = that.data.favouriteList
        dataArr = dataArr.concat(res.data.result)

        if (!res.data.result || res.data.result.length == 0) {
          that.setData({ favouriteList: null })
        } else {
          that.setData({ favouriteList: dataArr })
        }
        
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
  onLoad: function (options) {
    this.getUserVisitList()
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
    this.data.favouriteList = []

    this.listPage.page = 1
    this.getUserVisitList();

    wx.stopPullDownRefresh() 
  },

  listPage: {
    page: 1,
    pageSize: 0,
    totalSize: 0,
    curpage: 1
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    if (that.listPage.totalSize > that.listPage.curPage * that.listPage.pageSize) {
      that.listPage.page++
      this.getUserVisitList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})