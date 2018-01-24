 
const app = getApp()

Page({ 
 
  data: {
    loginUser:null 
  },
  imageUrl:"",
  /* 图片 */
  changeImage: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0]
        console.log(tempFilePaths)
        //console.log(that.data.loginUser)
        that.data.loginUser.userIcon = tempFilePaths
        that.setData({
          loginUser: that.data.loginUser
        })
      }
    })
  },
  /* 提交 */
  //提交成功，重新登陆
  changeUserInfo: function (e) {
    console.log(e.detail)
    var reLoginData = {
      username: "",
      passworld:""
    }
    var loginUser = this.data.loginUser
    reLoginData.username = loginUser.name
    reLoginData.password = loginUser.passworld
    var userInfo = e.detail.value
    userInfo.headimg = this.imageUrl
    var that = this
    var customIndex = app.AddClientUrl("/change_user_info.html", userInfo,'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        if (res.data.errcode == '0'){
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
        }
       // that.loginOut()
        that.loginIn()
      },
      fail: function (res) {
        app.loadFail()
      }
    })
  },
  
 /* 退出登录 */

  loginOut: function () {
    return
    wx.showLoading({
      title: 'loading'
    })
    wx.removeStorage({
      key: 'loginUser',
      success: function (res) {
        app.loginUser = null
        console.log(res.data)
      },
      complete:function () {
        wx.hideLoading()
      },
    })
    wx.removeStorage({
      key: 'cookie',
      success: function (res) {
        app.cookie = null
        app.header = {
          'content-type': 'application/json' // 默认值
        }
        app.headerPost= {
          'content-type': 'application/x-www-form-urlencoded'
        },
        console.log(res.data)
        app.toIndex()
      },
      complete: function () {
        wx.hideLoading()
      },
    })
  },
  loginIn: function (data) {
    
    //app.wxLogin()
    app.get_session_userinfo()
    setTimeout(function () { wx.navigateBack() },200)
    

    return
    console.log(data)
    var that = this;
    
    var loginUrl = app.AddClientUrl("Client.User.Login",data,'post')
    wx.request({
      url: loginUrl.url,
      data: loginUrl.params,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.header)
        var header = res.header
        var cookie = null
        if (!!header['Set-Cookie']) {
          cookie = header['Set-Cookie']
        }
        if (!!header['set-cookie']) {
          cookie = header['set-cookie']
        }

        console.log(cookie)


        //console.log(res.data)
        if (res.data.errcode == 0) {
          wx.setStorage({
            key: "cookie",
            data: cookie
          })
          app.header = {
            'content-type': 'application/json', // 默认值
            'Cookie': cookie
          }
          app.cookie = cookie
          app.loginUser = res.data.relateObj
          that.setData({ loginUser: res.data.relateObj })
          wx.setStorage({
            key: "loginUser",
            data: res.data.relateObj
          })

          wx.navigateBack()


        }
        else { 
          wx.showToast({
            title: '失败',
            icon: 'loading',
            duration: 1500
          })
        }
      },
      fail: function (res) {
        console.log("fail")
        app.loadFail()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      loginUser: app.loginUser
    })
    this.setData({ setting: app.setting })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (!app.checkIfLogin()) {
    
      return
    }
    console.log(".............")
    console.log(this.data.loginUser)
    this.imageUrl = this.data.loginUser.userIcon
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