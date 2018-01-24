
const app = getApp()
var tab = require('../../view/js/tab.js');
var detailList = require('../../view/js/detail_list.js');
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    /* seeting */
    setting: null,
    userData: null,
    PaiXuPartials: null,

    loginUser:null,
    componentData:{}, //组件的data
  },
/* 微信登录测试 */
  wxLogin: function () {
    console.log('--------------微信登录--------------')
    var customIndex = app.AddClientUrl("/wx_mini_code_login.html",{},'post')
    var that = this
    wx.login({
      success: function (res) {
        console.log('---------111111  success----------')
        console.log(res)
       // return;
       
        if (res.code) {
          //发起网络请求
          wx.request({
            url: customIndex.url,
            data: {
              code: res.code
            },
            header: app.headerPost,
            method:'POST',
            success:function(e){
              console.log('----22222   success------')
              console.log(e)
              if (e.data.errcode == 0) {
                console.log('登陆成功')
                wx.getUserInfo({
                  withCredentials: false,
                  success: function (res) {
                    var userInfo = res.userInfo
                    //var encryptedData = Base64_Decode(res.encryptedData)
                    console.log(userInfo)
                    //console.log(encryptedData)
                  }
                })
              }
              
            },
            fail:function(e){
              console.log('----fail------')
              console.log(e)
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      },
      fail:function(res){
        console.log('---------111111  fail----------')
        console.log(res)
      },
      complete:function(res){
        console.log('---------111111  complete----------')
        console.log(res)
      },
    });
  },
  /*  */
  getData: function () {
    var customIndex = app.AddClientUrl("/custom_page_userinfo.html")
    var that = this
    wx.showLoading({
      title: 'loading'
    })
    //拿custom_page
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log(res.data)
        that.setData({ userData: res.data })
        that.getPartials();
        wx.hideLoading()
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
  /* 格式化数据 */
  getPartials: function () {
    var that = this
    var partials = this.data.userData.partials;
    var PaiXuPartials = [];
    //排序

    for (let i = 0; i < partials.length; i++) {
      if (typeof (partials[i].jsonData) == "string") {
        partials[i].jsonData = JSON.parse(partials[i].jsonData)
      } 
      if (partials[i].partialType == 1) {
        WxParse.wxParse('article', 'html', partials[i].jsonData.content, that, 5);
      } 
      PaiXuPartials.push(partials[i]);
    }
    this.setData({ PaiXuPartials: PaiXuPartials })
    console.log(this.data.PaiXuPartials)
  },
  GetRequest:function(e) {
    var url = e; //获取url中"?"符后的字串
    var theRequest = '';
    if(url.indexOf("?") != -1) {
      var str = url.substr(url.indexOf("?")+1);
      theRequest = str
    }
    return theRequest;
  },

  

  login:function () {
    wx.navigateTo({
      url: '../login/index',
    })
  },

  loginOut: function () {
    wx.navigateTo({
      url: '/pages/pre_change_user_info/index',
    })
  },
  /* 获取getCustomPage */
  getCustomPage: function(e){
    var finnalUrl = "/custom_page_" + e+".html"
    console.log(finnalUrl)
    var customIndex = app.AddClientUrl(finnalUrl)
    var that = this
    wx.showLoading({
      title: 'loading'
    })
    //拿custom_page
    wx.request({
      url: customIndex.url ,
      header: app.header,
      success: function (res) {
        console.log(res.data)
        wx.hideLoading()
        wx.navigateTo({
          url: '/pages/custom_page/index?resultUrl=' + e,
        })
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
    this.getData();
    this.setData({
      loginUser: app.loginUser,
      userInfo: app.globalData.userInfo
    })
    console.log(this.data.userInfo)
    console.log(this.data.loginUser)
    this.setData({ setting: app.setting })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    let componentData = this.data.componentData
    detailList.detailList(this, app,componentData)

   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    this.setData({ loginUser: app.loginUser })

    
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

  /* 组件事件集合 */

  tolinkUrl:function(e){
    let linkUrl = e.currentTarget.dataset.link
    app.linkEvent(linkUrl)
  }
})