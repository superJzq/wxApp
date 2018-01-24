// pages/my_pages/custom_page/index.js
var WxParse= require('../../wxParse/wxParse.js');

import { json2Form } from "../../public/json2Form.js";
const app = getApp()

Page({

  data: {
    partials:null,
    richPage:null
  },
  
  chan:function(){
    var that = this
    wxParse.wxParse('article', 'html', that.test, that, 0);
  },
  getPartials: function (partials) {
    var PaiXuPartials = [];
    var that =this
    for (let i = 0; i < partials.length; i++) {
      if (typeof (partials[i].jsonData) == "string") {
        partials[i].jsonData = JSON.parse(partials[i].jsonData)
      } 
      if (partials[i].partialType == 1) {
        
        WxParse.wxParse('article', 'html', partials[i].jsonData.content, that, 5);
      } 
      if (partials[i].partialType == 12){
        wx.setNavigationBarTitle({
          title: partials[i].jsonData.title
        })
        if (!partials[i].jsonData.titleColor) {
          partials[i].jsonData.titleColor = '#000000'
        }
        if (!partials[i].jsonData.bgColor) {
          partials[i].jsonData.bgColor = '#ffffff'
        }
        wx.setNavigationBarColor({
          frontColor: partials[i].jsonData.titleColor,
          backgroundColor: partials[i].jsonData.bgColor,
          
        })
      }else{
        PaiXuPartials.push(partials[i]);
      }
     
    }
    this.setData({ partials: PaiXuPartials })
    console.log(PaiXuPartials)
  },
  getCustomPage: function (Cpage,pageParam) {
    var finnalUrl = "/custom_page_" + Cpage + ".html"
    console.log(finnalUrl)
    var customIndex = app.AddClientUrl(finnalUrl, pageParam)
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
        wx.hideLoading()
        if (!!res.data.partials){
          that.getPartials(res.data.partials)
        }else{
          console.log('--------error --------' +res.data)
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
  onLoad: function (options) {
    if (!options){
      console.log('-------noOption------')
      return
    }
    if (!options.Cpage) {
      return
    }
    this.getCustomPage(options.Cpage, options)    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //this.chan()
    var article = '<div style="color:red">我是<br>HTML代码</div>';
    /**
    * WxParse.wxParse(bindName , type, data, target,imagePadding)
    * 1.bindName绑定的数据名(必填)
    * 2.type可以为html或者md(必填)
    * 3.data为传入的具体数据(必填)
    * 4.target为Page对象,一般为this(必填)
    * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
    */
   
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