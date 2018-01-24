//app.js 
import { clientInterface } from "/public/clientInterface.js";
import { dellUrl } from "/public/requestUrl.js";
 

 
App({
 
  clientUrl:'https://mini.sansancloud.com/chainalliance/',  // 链接地址

  /**
   *   切换项目的开关 ↓↓↓↓↓
   */
  clientNo:'xianhua',   //自定义的项目的名称。

  more_scene:'', //扫码进入场景   用来分销

  miniIndexPage:'',
  setting : null,
  loginUser: null,
  cookie:null, 
  shopOpen:null, // 店铺营业时间-开关

  cart_offline:[],
  //addr:null,

  payItem:null, //下单的时候传过去的
  userSign:null, //账号密码
  EditAddr:null,//传值的
  productParam:null,//传值的
    //  customPageJson:null,//page的动态组件json
  header: {
    'content-type': 'application/json' // 默认值
  },
  headerPost: {
      'content-type': 'application/x-www-form-urlencoded'
  },





  onLaunch: function (options) {
    let that = this
    console.log('------onlauch------')
    console.log(options)
    let inputPlatformNo = options.query.platformNo;
    if (!!inputPlatformNo) {
      this.clientNo = inputPlatformNo
    }
    let more_scene = decodeURIComponent(options.query.scene)
    console.log(more_scene)
    
    if (!!more_scene){
      this.more_scene = more_scene
    }
    

      /* 第三方配置加载 clientNo */
      wx.getExtConfig({
        success: function (res) {
          console.log('第三方配置')
          console.log(res)
          if (res.extConfig && res.extConfig.clientNo){
            console.log(res.extConfig)
            that.clientNo = res.extConfig.clientNo
            
          }
        },
        complete: function(res){
          that.loadFirstEnter(more_scene)
        }
      })

   // console.log(appJson)
   // this.getSetting()
    wx.getUserInfo({
      withCredentials: false,
      success: function (res) {
        let userInfo = res.userInfo
        that.globalData.userInfo = userInfo
      }
    })
    
    
  
  },

  //第一次登录加载的函数
  loadFirstEnter: function (more_scene){
    this.getSetting()
    this.wxLogin(more_scene)
  },
  loadScene: function (inputPlatformNo){
    this.clientNo = inputPlatformNo
  },
  globalData: {
    userInfo: null, 
    sansanUser:null,
    sysWidth: wx.getSystemInfoSync().windowWidth, //图片宽度  
  },
 toIndex:function(){
   console.log(this.miniIndexPage)
   let miniIndexPage = this.getSpaceStr(this.miniIndexPage,'.')
   console.log(miniIndexPage)

   //这个需要注意  switchTab  和  redirectTo
   
   if (!!this.miniIndexPage){
     wx.switchTab({
       url: '/pages/' + miniIndexPage.str1+'/index',
     })
   }else{
     wx.switchTab({
       url: '/pages/custom_page_index/index',
     })
   }
   

 },

 //加载失败处理
 loadFail:function(){
   let that = this
   /*
   wx.showModal({
     title: '提示',
     content: '加载失败，重新加载',
     success: function (res) {
       
       if (res.confirm) {
         that.toIndex()
       } else if (res.cancel) {

       }
     }
   })*/
   wx.showToast({
     title: "加载失败",
     image: '/images/icons/tip.png',
     duration: 2000
   })
 },
 //检查是否已经登录
 checkIfLogin:function(){
  
   if (this.loginUser){
      console.log('已经登录了')
      return true
   } else{
     console.log('未登录')
     
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
     return false
   }
   
 },
 //检查商家开店？
  checkShopOpenTime:function(){
    let that = this
    let shopBean = this.setting.platformSetting.defaultShopBean
    let nowTime = {
      hour:'',
      minutes:''
    }
    let myDate = new Date();
    nowTime.hour =  myDate.getHours()
    nowTime.minutes = myDate.getMinutes()
    let myTime = ''
    if (nowTime.minutes < 10){
      myTime = Number(nowTime.hour + '.0' + nowTime.minutes) 
    }else{
      myTime = Number(nowTime.hour + '.' + nowTime.minutes) 
    }
    if (myTime < Number(shopBean.serviceStartTime) || myTime > Number(shopBean.serviceEndTime) ){
      wx.showModal({
        title: '不是营业时间',
        content: '营业时间为' + shopBean.serviceStartTime + '-' + shopBean.serviceEndTime,
        success: function (res) {
          if (res.confirm) {
            that.toIndex()
          } else if (res.cancel) {

          }
        }
      })
      return false
    }else{
      return true
    }
  },
/* 处理url的函数，放到app里吧 */
  AddClientUrl: function (url, params, method){
    let loginToken = ''
    if (!this.loginUser){
      loginToken = ''
    }else{
      loginToken = this.loginUser.platformUser.loginToken
    }
    var returnUrl = dellUrl(url, params, method, loginToken)
    returnUrl.url = this.clientUrl + this.clientNo + returnUrl.url
    return returnUrl;
  },
  /* 解析LinkUrl */
  getUrlParams: function (url) {
    console.log('------getUrlParams--------')
    console.log(url)
    
    let theResult = { 
      url: '',
      param: ''
    }
    if (url.indexOf('?') != -1) {
      let str2 = url.substr(0, url.indexOf('?')-5);
      let str3 = url.substr(url.indexOf('?'));
      theResult.url = str2
      theResult.param = str3
    }
    if (url.indexOf('?') == -1){
      let str2 = url.substr(0, url.indexOf('.'))
      let str3 = ''
      theResult.url = str2
      theResult.param = str3
    }
    return theResult
  },
  getSpaceStr: function (str,p) {
    let theResult = {
      str1: '',
      str2: ''
    }
    if (str.indexOf(p) != -1) {
      let str2 = str.substr(0, str.indexOf(p));
      let str3 = str.substr(str.indexOf(p)+1);
      theResult.str1 = str2
      theResult.str2 = str3
    }
    return theResult
  },
/* 转换成str */
  jsonToStr: function (json) {
    var returnParam = "?"
    var str = [];
    for (var p in json) {
      str.push(p + "=" + json[p]);
      //str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
    }
    returnParam += str.join("&")
    console.log(returnParam)
    return returnParam
  },
  //link事件   绑定导向对应的控件上
  linkEvent: function (linkUrl) {
    if (!linkUrl){
      return
    }
    let urlData = this.getUrlParams(linkUrl)
    let If_Order_url = urlData.url.substr(0, 10)
    console.log('-----toGridLinkUrl---------')
    console.log(urlData)
    console.log(If_Order_url)

    if (linkUrl.substr(0, 3) == 'tel') {
      wx.navigateTo({
        url: '/pages/custom_page_contact/index',
      })
    }
    else if (linkUrl.substr(0, 12) == 'custom_page_') {
      var resultUrl = linkUrl.substring(12, linkUrl.length - 5)
      if (urlData.param == '') {
        urlData.param = '?'
      }
      wx.navigateTo({
        url: '/pages/custom_page/index' + urlData.param + '&Cpage=' + resultUrl,
      })
    }
    else if (If_Order_url == 'order_list') {
      wx.navigateTo({
        url: '/pages/' + If_Order_url + '/index' + urlData.param,
      })
    }
    else if (linkUrl.substr(0, 15) == 'product_detail_') {
      let productId = linkUrl.replace(/[^0-9]/ig, "");
      wx.navigateTo({
        url: '/pages/productDetail/index?id=' + productId + "&addShopId=236",
      })
    }
    else if (urlData.url == 'shop_map'){
      this.openLocation()
    }
    else {
      wx.navigateTo({
        url: "/pages/" + urlData.url + "/index" + urlData.param,
      })
    }
  },
  checkLogin:function(){
    //let that = this
    if (!this.loginUser){
      this.wxLogin()
    }
  },
  /* 检查是否过期 */
  checkSession:function(){
    let that = this
    wx.checkSession({
      success: function () {
        
        console.log('session 未过期，并且在本生命周期一直有效')
        wx.getStorage({
          //拿cookie
          key: 'cookie',
          success: function (res) {
            that.cookie = res.data
            that.header = {
              'content-type': 'application/json', // 默认值
              'Cookie': res.data
            }
            that.headerPost = {
              'content-type': 'application/x-www-form-urlencoded',
              'Cookie': res.data
            }
          }
        })
        wx.getStorage({
          key: 'loginUser',
          success: function (res) {
            that.loginUser = res.data
          }
        })
      },
      fail: function () {
        //登录态过期
        console.log('登录态过期')
      
        that.wxLogin()
      }
    })
  },
  /* 设置cookie */
  setCookie:function(cookie){
    this.cookie = cookie
    this.header = {
      'content-type': 'application/json', // 默认值
      'Cookie': cookie
    }
    this.headerPost = {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': cookie
    }
  },
  //存用户信息
  setloginUser: function (loginUser,cookie){
    //console.log('--------setloginUser----------')
    //console.log(loginUser)
    //console.log(cookie)

    if (loginUser){
      wx.setStorage({
        key: "loginUser",
        data: loginUser
      })
    }
    if (cookie){
      wx.setStorage({
        key: "cookie",
        data: cookie
      }) 
    }

   
  },


  //获取已经登录了的用户信息和login时一样
  get_session_userinfo: function () {
    var customIndex = this.AddClientUrl("/get_session_userinfo.html", {}, 'post')
    var that = this
    wx.request({
      url: customIndex.url, //仅为示例，并非真实的接口地址
      data: customIndex.params,
      header: that.headerPost,
      success: function (res) {
        console.log('===========get_session_userinfo============')
        if (res.data.errcode == 0) {
          console.log(res.data.relateObj)
          that.loginUser = res.data.relateObj
          that.setloginUser(res.data.relateObj)
        }

      },
      fail: function (res) {

      }
    })
  },

  //sentWxUserInfo 第一次登录给他设置头像
  sentWxUserInfo:function(){
    let that = this
    let userInfo = this.globalData.userInfo
    let infoParam = {
      headimg:'',
      nickname:'',
      sex:''
    }
    infoParam.headimg = userInfo.avatarUrl
    infoParam.nickname = userInfo.nickName
    infoParam.sex = userInfo.gender
    
    let customIndex = this.AddClientUrl("/change_user_info.html", infoParam, 'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: that.headerPost,
      method: 'POST',
      success: function (res) {
        
        console.log(res.data)
        if (res.errcode == 0){
          {
            that.loginUser.nickName = userInfo.nickName;
            that.loginUser.sex = userInfo.sex;
            that.loginUser.userIcon = userInfo.avatarUrl;
          }
          

          console.log('-----第一次登录   传头像成功 --------')
          //that.wxLogin()
          that.get_session_userinfo()
        }else{
          console.log('-----第一次登录   传头像失败 --------')
        }
        
      },
      fail: function(res){
        console.log('-----第一次登录   传头像失败 --------')
        console.log()
      },
      complete:function(res){
        
      },
    })
  },
  /* 微信登录测试 */
  wxLogin: function (more_scene) {
    if (!more_scene || more_scene == 'undefined'){
      more_scene = '0'
    }
    console.log('--------------微信登录--------------')
    wx.showLoading({
      title: '登录中',
      mask: true
    })
    var that = this
    
    
    wx.login({
      success: function (res) {
        
        if (res.code) {
          //发起网络请求
          let loginParam = {}
          loginParam.code = res.code
          loginParam.scene = more_scene
          let customIndex = that.AddClientUrl("/wx_mini_code_login.html", loginParam, 'post')
          wx.request({
            url: customIndex.url,
            data: customIndex.params,
            header: that.headerPost,
            method: 'POST',
            success: function (e) {
              console.log('----22222   success------')
              
              console.log(e)
              if (e.data.errcode == 0) {
                
                let header = e.header
                let cookie = null
                if (!!header['Set-Cookie']) {
                  cookie = header['Set-Cookie']
                }
                if (!!header['set-cookie']) {
                  cookie = header['set-cookie']
                }
                let loginJson = e.data.relateObj
                
                that.setCookie(cookie)
                that.setloginUser(e.data.relateObj, cookie)
                console.log('登陆成功')
                that.loginUser = e.data.relateObj
                that.globalData.sansanUser = e.data.relateObj
             
                wx.hideLoading()

                that.get_session_userinfo()
                
                if (!loginJson.nickName || loginJson.nickName == loginJson.name) {
                  that.sentWxUserInfo()
                }
                 that.toIndex()
              }else{
                wx.hideLoading()
               
                wx.showModal({
                  title: '提示',
                  content: '登录失败，重新登录',
                  success: function (res) {
                    if (res.confirm) {
                      wx.navigateTo({
                        url: '/pages/login/index'
                      })
                    } else if (res.cancel) {

                    }
                  }
                })
              }
            },
            fail: function (e) {
              console.log('----fail------')
              console.log(e)
              wx.showModal({
                title: '提示',
                content: '登录失败，重新登录',
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '/pages/login/index'
                    })
                  } else if (res.cancel) {

                  }
                }
              })
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      },
      fail: function (res) {
        console.log('---------111111  fail----------')
        console.log(res)
      },
      complete: function (res) {
        console.log('---------111111  complete----------')
        console.log(res)
        wx.hideLoading()
      },
    });
  },
  //获取setting
  getSetting: function (self) {
    if(!self){
      self = 0
    }
    console.log('**************************************')
    var settUrl = this.AddClientUrl("/get_platform_setting.html")
    var that = this
    //拿setting
    wx.request({
      url: settUrl.url, //仅为示例，并非真实的接口地址
      header: that.header,
      success: function (res) {
        
        if (!!res.data) {
          let categories = res.data.platformSetting.categories
          let allType = {}
          allType.id = 'all'
          allType.name = '全部'
          allType.active = true
          for (let i = 0; i < categories.length; i++) {
            categories[i].active = false
          }
          categories.unshift(allType)
        }
        that.setting = res.data
        if (!!res.data.platformSetting.miniIndexPage){
          that.miniIndexPage = res.data.platformSetting.miniIndexPage
        }

        if (!self){

        }else{
          self.setData({ setting: res.data })
          self.setNavBar()
        }
        wx.hideLoading()
        return
        let ShopBean = res.data.platformSetting.defaultShopBean
        if (ShopBean.serviceStartTime ){

        }
        
    
        
      },
      fail: function (res) {
        wx.hideLoading()
        that.loadFail()
      }
    })
  },
  //微信内部地图
  openLocation: function () {
    console.log('---------打开地图-------')
    let markers = this.setting.platformSetting.defaultShopBean
    let lat = Number(markers.latitude)
    let lng = Number(markers.longitude)
    let name = markers.shopName
    let address = ''
    wx.getLocation({
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        console.log('11111')
        wx.openLocation({
          latitude: Number(markers.latitude),
          longitude: Number(markers.longitude),
          scale: 28,
          name: name,
          address: address,
          success: function (res) {
            console.log(res)
          },
          fail: function (res) {
            console.log(res)
          }
        })
      },fail:function(res){
        console.log('22222')
        console.log(res)
      }
    })
  },
})