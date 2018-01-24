
const app = getApp()
var timer; // 计时器
Page({
  data: {  
    /* seeting */ 
    setting:null,
    renderData:null,
    PaiXuPartials:null, 
    sysWidth: 320,//图片大小
    topName: {
      SearchProductName: "",//头部搜索的
    },
  },

  
  /* 搜索 */
  searchProduct:function(e){
    var product = e.detail.value
    console.log(product)
    var param ={}
    param.productName = product
    let postParam = app.jsonToStr(param)
   // app.productParam = param
    wx.navigateTo({
      url: '/pages/search_product/index' + postParam
    })
  },
   
  /* 查看更多 */
  lookMoreProduct:function(e){
    let url = e.currentTarget.dataset.link;
    if(!url){
      return
    }
    var urlData = app.getUrlParams(url)
    console.log(urlData)
    {
      wx.navigateTo({
        url: '/pages/' + urlData.url + '/index' + urlData.param,
      })
    }
  },
  //partials
  getPartials: function (){
    var partials = this.data.renderData.partials;
    var PaiXuPartials = [];
    //排序
    if (partials && partials.length){
    for (let i = 0; i < partials.length; i++){
      if (typeof (partials[i].jsonData) == "string"){
        partials[i].jsonData = JSON.parse(partials[i].jsonData)
      }else{
        continue;
      }
      PaiXuPartials.push(partials[i]);
    }}
    this.setData({ PaiXuPartials: PaiXuPartials  })
    console.log(this.data.PaiXuPartials)
  },
  toPage: function(event) {
    console.log(event.currentTarget.dataset)
    wx.navigateTo({
      url: '/pages/' + event.currentTarget.dataset.page+'/index'
    })
  },

 





  

  toProductDetail: function (event) {
    console.log("--------toProductDetail------")
    console.log(event.currentTarget.dataset)
    var detailurl = event.currentTarget.dataset.detailurl
    var productId = detailurl.replace(/[^0-9]/ig, "");
    console.log(productId)
    wx.navigateTo({
      url: '/pages/productDetail/index?id=' + productId + "&addShopId=236",
    })
  
  },

  




  
  onUnload:function(e){
    
  },
 
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },




 
  setNavBar: function (){
    if (app.setting.platformSetting.siteTitle == '') {
      wx.setNavigationBarTitle({
        title: '首页',
      })
    } else {
      wx.setNavigationBarTitle({
        title: app.setting.platformSetting.siteTitle,
      })
    }

    if (app.setting.platformSetting.defaultColor == '') {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#000000',
      })
    } else {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: app.setting.platformSetting.defaultColor,
      })
    }
  },
  getParac:function(){
    var that = this
    var customIndex = app.AddClientUrl("/custom_page_index.html")
    //拿custom_page
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        app.renderData = res.data
        console.log(res.data)
        that.setData({ renderData: res.data })
        that.getPartials();
        wx.hideLoading()
        
      },
      fail: function (res) {
        wx.hideLoading()

        //app.loadFail()
        let that = this
        wx.showModal({
          title: '提示',
          content: '加载失败，重新加载',
          success: function (res) {

            if (res.confirm) {
              that.getParac()
            } else if (res.cancel) {
              app.toIndex()
            }
          }
        })
      }
    })
  },
  getData: function () {
    var that = this
    if (!app.setting) {
      console.log('-------------hasNoneSetting-----------')
      app.getSetting(that)
    } else {
      console.log('-------------hasSetting-----------')
      this.setData({ setting: app.setting })
      console.log(this.data.setting)
      
    }
    
   
  },
  
  /*onload*/
  onLoad: function (options) {
   
    var that = this
    this.setData({
      sysWidth: app.globalData.sysWidth
    });
    this.getParac()
    this.getData()
   

  },
  onReady: function () {
   

  },
  onShow: function () {
    if(!!app.setting){
      this.setNavBar()
    }
  },

  /* 组件事件集合 */
  tolinkUrl: function (e) {
    let linkUrl = e.currentTarget.dataset.link
    app.linkEvent(linkUrl)
  },
  /* 分享 */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
  
  },
  onPullDownRefresh: function () {
    this.onLoad();
    wx.stopPullDownRefresh()
  },
})
function Countdown(page) {
  console.log('2')
  if (!!page.setting) {
    
    page.toIndex()
  }
  else {
    timer = setTimeout(function () {
      Countdown(page);
    }, 1000);
  }
};