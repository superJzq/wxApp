### 评价订单 :   pages/order_shop_comment/index

### 使用接口

    订单详情 Client.Order.GetOrderDetail ( get_order_detail )
    评价商店 Client.Order.CommentOrder ( comment_order )
    评价商品 Client.Order.CommentOrder ( comment_order )

### 链接地址

     订单详情 https://mini.sansancloud.com/chainalliance/xianhua/get_order_detail.html
     评价商店 https://mini.sansancloud.com/chainalliance/xianhua/comment_order.html
     评价商品 https://mini.sansancloud.com/chainalliance/xianhua/comment_order.html

## 订单详情 Client.Order.GetOrderDetail ( get_order_detail )
|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|gotCouponListId|领取优惠券id|否|
|orderNo|订单号|是|-

### Client.Order.GetOrderDetail 返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|orderNo|订单Bean|-
|orderType|订单类型(0普通订单 1到店服务到店自取订单  3预售订单 4充值订单  5租赁抵押订单 6租赁租金支付订|-
|orderStatus|订单状态(0未提交 1已提交 2确认失败 3确认成功 4已送货  5已到货 6已完成  7作废  8已退款)|-
|payStatus|支付状态(0 未支付  1已支付  2已退款)|-
|easyStatus|订单简易状态(1待提交  2待付款  3待发货 4待收货 5待评价  6完成 7作废 8关闭 9退款  10待完成)|-
|buyerName|购买人姓名|-
|goodsAmount|订单金额(商品金额+运费)|-
|goodsOnlyAmount|支付金额(应付金额 goodsAmount-youhuiAmount+adminChangeAmount)|-
|youhuiAmount|优惠金额|-
|yunfeiAmount|运费金额|-
|prepayAmount|预付金额(预售订单使用)|-
|jifenDikou|订单积分抵扣|-
### Client.Order.GetOrderDetail  请求结果:

    {
      "jsonRemark":
      {
        beanRemark: '订单Bean',
        orderNo: '订单编号',
        orderType: '订单类型(0普通订单 1到店服务到店自取订单  3预售订单 4充值订单  5租赁抵押订单 6租赁租金支付订单',
        chatOrder: '是否会话订单(0 否 1会话订单 >1会话聊天室roomId-参考 ProductChatRoom)',
        orderStatus: '订单状态(0未提交 1已提交 2确认失败 3确认成功 4已送货  5已到货 6已完成  7作废  8已退款)',
        shippingStatus: '送货状态(作废)',
        payStatus: '支付状态(0 未支付  1已支付  2已退款)',
        easyStatus: '订单简易状态(1待提交  2待付款  3待发货 4待收货 5待评价  6完成 7作废 8关闭 9退款  10待完成)',
        easyStatusStr: '订单简易状态',
        payType: '支付类型(0货到付款 1支付宝 2余额支付 3微信支付 4网银支付  5线下支付  9积分支付)',
        payTypeStr: '支付类型文字描述',
        thirdOrderNo: '支付第三方单号',
        buyerLoginName: '购买人登陆名',
        buyerId: '购买人用户ID',
        buyerName: '购买人姓名',
        addressId: '订单使用的地址ID(参考 ProductOrderAddress)',
        buyerAddress: '购买人地址',
        buyerTelno: '购买人电话',
        buyerLongitude: '购买人所在经度',
        buyerLatitude: '购买人所在维度',
        buyerProvince: '购买人省份',
        buyerCity: '购买人城市',
        buyerArea: '购买人县区',
        buyerBestTime: '最佳送货时间',
        buyerScript: '购买人备注',
        invPayee: '发票抬头',
        invType: '发票类型(0个人  1单位)',
        invNeed: '需要发票(0不需要 1需要)',
        naShuiHao: '开票人纳税号',
        goodsAmount: '订单金额(商品金额+运费)',
        goodsOnlyAmount: '商品金额',
        payAmount: '支付金额(应付金额 goodsAmount-youhuiAmount+adminChangeAmount)',
        youhuiAmount: '优惠金额',
        yunfeiAmount: '运费金额',
        adminChangeAmount: '管理员变更订单金额',
        backAmount: '退款金额',
        prepayAmount: '预付金额(预售订单使用)',
        jifenDikou: '订单积分抵扣',
        fxProfit: '分销利润',
        huikuanImage: '汇款截图(线下汇款订单使用)',
        expressNo: '订单使用的快递策略号',
        expressStrategyNo: '当expressNo=-1时候 expressStrategyNo根据系统设定自动选择快递策略 否则该值等于expressNo',
        expressStrategy: '快递策略 (参考ProductExpressStrategy)',
        addTime: '生成订单时间',
        confirmTime: '订单确认时间',
        payTime: '订单支付时间',
        receiveTime: '订单到货时间',
        sendTime: '订单发货时间',
        finishedTime: '订单完成时间',
        cancelTime: '订单取消时间',
        confirmMessage: '订单确认消息(确认成功或失败消息)',
        kuaidi: '快递公司编号',
        kuaidiName: '快递公司名',
        invoiceNo: '发货单号',
        belongShop: '归属店铺',
        belongShopName: '归属店铺名',
        useCouponId: '使用的优惠券ID',
        useCouponNo: '使用优惠券号',
        kaiHuHang: '开户行',
        yinHangZhanghao: '银行账号',
        lianxiDianhua: '联系电话',
        lianxiDizhi: '联系地址',
        isComment: '订单是否评论(0未激活评论 1待评论 2已评价)',
        comment: '订单是否评论(0未激活评论 1待评论 2已评价)',
        commentId: '评价ID',
        unshowStatus: '是否对用户隐藏(用户删除订单后就隐藏)',
        tradeType: '交易类型(APP APP下单       JSAPI 微信下单)',
        fromSource: '订单来源(wx  ios_app android_app pc)',
        pressCount: '用户催单次数',
        reversePressCount: '反向催单 店铺向用户催单',
        gainJifen: '订单获得积分数',
        leaseRecordId: '租赁记录ID',
        userTagPriceOrder: '是否使用吊牌价订单(0否 1是 订单商品都要用吊牌价)',
        promotionId: '归属活动ID',
        promotionName: '归属活动名称',
        leaseRecordId: '租赁记录ID(租赁订单 关联租金记录)',
        managerRemark: '后台备注信息',
        innerOrder: '内部测试订单(0否 1是)',
        belongStorageId: '归属店仓ID',
        storageName: '归属店仓名',
        wuliuPackageNo: '物流包号(发货打包物流时候产生物流包号)',
        wuliuImportNo: '物流导入号(默认与订单号相同  如果有合并同用户地址订单则与与用户信息相关)',
        wuliuPackageTime: '物流打包时间',
        pushToErp: '推送至ERP订单(0无需推送  其他状态根据订单状态推送  9999推送失败)',
        logs: '操作记录 (参考List<ProductLog>)',
        promotion: '活动Bean (参考 ProductOrderPromotion)',
        orderShops: '店铺归集订单项(参考 List<ProductShop>)',
        tempShopOrderItems: '店铺归集订单项 (参考 Map<ProductShop, List<ProductOrderItem>>)',
        orderItems: '订单项(参考 List<ProductOrderItem>)',
        orderProcessList: '订单操作记录( 弃用  参考List<ProductOrderProcess>)',
        logs: '操作记录 (参考List<ProductLog>)',
        availableCoupons: '订单可用的优惠券 (参考List<ProductCouponGotList>)',
        chatRoom: '关联的聊天室(参考 ProductChatRoom)',
        orderJifen: '订单使用积分Bean (参考OrderJifenBean)',
        commentBean: '订单可用的评价Bean (参考ProductComment)',
        platformNo: '平台号'
      }，
      "id": 84385,
      "orderNo": "20180116155028237001",
      "orderStatus": 1,
      "shippingStatus": 0,
      "payStatus": 1,
      "payType": 2,
      "payTypeStr": "余额支付",
      "buyerName": "111",
      "buyerAddress": "11111",
      "buyerTelno": "17888888888",
      "buyerBestTime": "",
      "buyerScript": "",
      "invType": 0,
      "invNeed": 0,
      "buyerId": 60176,
      "goodsAmount": 158,
      "goodsOnlyAmount": 158,
      "payAmount": 158,
      "addTime": "2018-01-16 15:50:32",
      "payTime": "2018-01-16 15:51:19",
      "belongShop": 257,
      "belongShopName": "福州鲜花批发",
      "useCouponId": 0,
      "useCouponTypeId": 0,
      "useCouponTypeName": "",
      "youhuiAmount": 0,
      "buyerProvince": "北京市",
      "buyerCity": "北京市",
      "buyerArea": "东城区",
      "yunfeiAmount": 0,
      "isComment": 0,
      "platformNo": "xianhua",
      "shop": {
        "id": 257,
        "shopName": "福州鲜花批发",
        "shopDescription": "",
        "shopLogo": "",
        "belongAreaId": 0,
        "belongUserId": 0,
        "belongShangquanId": 0,
        "shopLevelId": 0,
        "hotShop": 0,
        "shopLevelValue": 0,
        "shopTip": "",
        "checkTime": "2017-12-11 10:39:26",
        "checkUserId": 0,
        "checkState": 1,
        "setEnable": 1,
        "platformNo": "xianhua",
        "telno": "",
        "range": 0,
        "ownerName": "",
        "favoriteCount": 0,
        "ownerQq": "",
        "ownerEmail": "",
        "deleteFlag": 0,
        "turnover": 12586,
        "shopContent": "",
        "adverts": [

        ],
        "productCount": 0,
        "platformShop": 0,
        "shopScore": 0,
        "scoreNum": 0,
        "averageScore": 0,
        "averageScoreHundred": 60,
        "shopOrder": 0,
        "shopIndexPage": "",
        "orderItems": [
          {
            "jsonRemark": "{beanRemark:'用户订单项表',belongOrderNo:'归属订单号',itemId:'产品ID',itemName:'产品名',shopId:'归属店铺ID',shopName:'店铺名',itemPrice:'产品价格',itemTagPrice:'产品标价',itemCount:'产品数量',itemIcon:'产品图标',buyerPayPrice:'购买人应支付价格',buyerZhekou:'购买人享折扣',buyerID:'购买人ID',buyerType:'购买人类型(弃用)',buyerLevel:'购买人等级(参考 用户等级)(用户分等级时使用)',yunfei:'产品运费',measures:'规格描述(规格产品时使用-如衣服红色L码)', measureCartesianId :'规格集ID(规格产品时使用)',waitComment:'评价状态(0 无需评价 1 待评价 2 已评价)',commentId:'评论ID',platformNo:'归属平台号',backItem:'退货退款 ( 0  未退款  1退款处理中  2 同意退款  3 已退款    5 拒绝退款)',sendStorageName:'发货店仓名(多店仓时使用)',sendStorageId:'发货店仓ID(多店仓时使用)',itemCode:'产品编码(多规格产品为规格集编码)',uploadAfterPlatform:'是否同步 至后置平台店铺0 否  1是',productCode:'产品编码(非多规格产品 productCode等于itemCode)'}",
            "id": 100600,
            "belongOrderNo": "20180116155028237001",
            "itemId": 8218,
            "itemName": "33朵粉玫瑰鲜花同城北京花店天津鲜花重庆送花南京鲜花长沙上海",
            "shopId": 257,
            "shopName": "福州鲜花批发",
            "itemPrice": 158,
            "itemTagPrice": 158,
            "itemCount": 1,
            "itemIcon": "http://image1.sansancloud.com/xianhua/2017_12/11/11/51/37_925.jpg",
            "buyerPayPrice": 158,
            "buyerZhekou": 100,
            "buyerId": 60176,
            "buyerType": 0,
            "yunfei": 0,
            "waitComment": 0,
            "commentId": 0,
            "platformNo": "xianhua",
            "backItem": 0,
            "sendStorageId": 0,
            "itemCode": "",
            "productCode": "",
            "uploadAfterPlatform": 0,
            "productItem": {
              "jsonRemark": "{beanRemark:'产品Bean',imagePath:'产品缩略图',name:'产品名',tagPrice:'产品标价',price:'产品售价',price2:'价格2(弃用)',price3:'价格3(弃用)',saleCount:'销售数量',category:'产品分类',saleTime:'开售日期',hotSale:'热销(弃用)',saleStrategy:'销售策略号',disable:'是否上架 0上架    1 下架',linkUrl:'弃用',productCode:'产品编码',description:'描述',orderNumber:'编码',readCount:'访问次数',stock:'库存',belongAreaId:'弃用',belongShangquanId:'弃用',belongShopId:'上传店铺ID',belongAreaName:'弃用',belongShangquanName:'弃用',belongShopName:'上传店铺名',tags:'商品标签',promotion:'参与主活动',shopProductType:'店铺分类（与主分类不同 店铺自己对产品的分类）',phoneImg:'弃用',addTime:'添加时间',minSaleCount:'最少购买数',bigSmallUnitScale:'大小单位比例（弃用）',tip:'tip说明 弃用',unitShow:'单位名称（弃用）',remarkNumber:'备注号(后端使用 前端忽略)',categoryParent:'产品归类父类id',categoryGradparent:'产品归类祖先分类ID',newSale:'新品 (弃用)',brandId:'归属品牌id',brandName:'品牌名',brandNameEn:'品牌英文名',brandNameShort:'品牌缩写',commentCount:'评论次数',yunfei:'运费(弃用 现在使用平台设定的运费模板)',yunfeiTemplate:'运费模板id(弃用 使用平台默认设置的运费模板)',productType:'产品类型 0普通产品  1到店服务类产品 2展示类产品 3预收类产品 5租赁类产品',presalePrice:'预售价格(预售类产品可用)',distributeProfit:'产品分配利润（在二级分润系统使用）',daidingPlatformUserId:'待定平台用户id（忽略）',daidingTime:'待定时间',daidingUserLoginName:'待定用户登录名',daidingUserNickName:'待定用户昵称',remark:'备注（前端忽略 后端使用）',pingfen:'产品评分',pingfenCount:'产品参与评分数量',leaseUnitTypeStr:'租赁单位类型字符表示',leaseUnitType:'租赁单位类型 0小时 1天 2周 3月 4年 （周单位弃用）',productYear:'产品年份',attributesCombind:'属性归集 ',leaseUnitAmount:'租赁单位金额 ',leaseUnitExpireAmount:'租赁逾期单位金额 ',leaseNeedBackUnitCount:'租赁应还单位时长  如值为 10表示10个单位内应归还 单位参考  leaseUnitType ',measureItem:'是否多规格商品 0否 1是 表示有规格 如 红色 L码',saleStrategyDetails:'销售策略详情',measureTypes:'分配规格类型',promotionBean:'参与活动Bean',attrs:'属性列表',platformNo:'平台号' }",
              "id": 8218,
              "imagePath": "http://image1.sansancloud.com/xianhua/2017_12/11/11/51/37_925.jpg",
              "name": "33朵粉玫瑰鲜花同城北京花店天津鲜花重庆送花南京鲜花长沙上海",
              "tagPrice": 158,
              "price": 158,
              "price2": 0,
              "saleCount": 0,
              "category": 1171,
              "saleTime": "2017-12-11 11:51:59",
              "hotSale": 0,
              "disable": 0,
              "description": "",
              "orderNumber": "20171211152611",
              "readCount": 0,
              "stock": 9,
              "price3": 0,
              "productCode": "",
              "belongAreaId": 0,
              "belongShangquanId": 0,
              "belongShopId": 257,
              "belongAreaName": "",
              "belongShangquanName": "",
              "belongShopName": "福州鲜花批发",
              "tags": "",
              "promotion": "0",
              "platformNo": "xianhua",
              "addTime": "2017-12-11 11:51:59",
              "minSaleCount": 1,
              "bigSmallUnitScale": 1,
              "tip": "",
              "unitShow": "束",
              "inCarCount": 0,
              "hgZhekou": 100,
              "lgZhekou": 100,
              "hzZhekou": 100,
              "lzZhekou": 100,
              "fxyZhekou": 100,
              "bdZhekou": 100,
              "categoryParent": 0,
              "categoryGradparent": 0,
              "newSale": 0,
              "brandId": 0,
              "commentCount": 0,
              "yunfei": 0,
              "yunfeiTemplate": 0,
              "productType": 0,
              "presalePrice": 0,
              "distributeProfit": 0,
              "daidingPlatformUserId": 0,
              "remark": "",
              "pingfen": 0,
              "pingfenCount": 0,
              "leaseUnitTypeStr": "小时",
              "productYear": "2017",
              "attributesCombind": "",
              "leaseUnitType": 0,
              "leaseUnitAmount": 0,
              "leaseUnitExpireAmount": 0,
              "leaseNeedBackUnitCount": 1,
              "measureItem": 0,
              "saleStrategyDetails": [

              ]
            }
          }
        ],
        "carItems": [

        ],
        "shopFavorite": 0,
        "backOrderCount": 0,
        "maxOrderPerDay": 0,
        "todayOrderCount": 0,
        "serviceOrderCount": 0,
        "printerType": 1,
        "printerPartner": "",
        "printerMachineCode": "",
        "printerApiKey": "",
        "printerMachineKey": "",
        "serviceStartTime": 0,
        "serviceEndTime": 24,
        "account": {
          "id": 0,
          "shopId": 257,
          "shopName": "福州鲜花批发",
          "platformNo": "xianhua",
          "account": 0
        }
      },
      "buyerLongitude": 119.30405,
      "buyerLatitude": 26.08198,
      "addressId": 41683,
      "easyStatus": 3,
      "easyStatusStr": "待发货",
      "backAmount": 0,
      "thirdOrderNo": "20180116155028237001",
      "orderType": 0,
      "prepayAmount": 0,
      "fxProfit": 0,
      "chatOrder": 0,
      "jifenDikou": 0,
      "unshowStatus": 0,
      "comment": 0,
      "commentId": 0,
      "tradeType": "",
      "pressCount": 0,
      "reversePressCount": 0,
      "gainJifen": 0,
      "buyerLoginName": "112728",
      "leaseRecordId": 0,
      "userTagPriceOrder": 0,
      "promotionId": "0",
      "adminChangeAmount": 0,
      "expressNo": "-1",
      "innerOrder": 0,
      "belongStorageId": 0,
      "promotionName": "",
      "wuliuPackageNo": "",
      "wuliuImportNo": "",
      "pushToErp": 0,
      "fromSource": "",
      "orderShops": [

      ],
      "tempShopOrderItems": {

      },
      "orderItems": [
        {
          "jsonRemark": "{beanRemark:'用户订单项表',belongOrderNo:'归属订单号',itemId:'产品ID',itemName:'产品名',shopId:'归属店铺ID',shopName:'店铺名',itemPrice:'产品价格',itemTagPrice:'产品标价',itemCount:'产品数量',itemIcon:'产品图标',buyerPayPrice:'购买人应支付价格',buyerZhekou:'购买人享折扣',buyerID:'购买人ID',buyerType:'购买人类型(弃用)',buyerLevel:'购买人等级(参考 用户等级)(用户分等级时使用)',yunfei:'产品运费',measures:'规格描述(规格产品时使用-如衣服红色L码)', measureCartesianId :'规格集ID(规格产品时使用)',waitComment:'评价状态(0 无需评价 1 待评价 2 已评价)',commentId:'评论ID',platformNo:'归属平台号',backItem:'退货退款 ( 0  未退款  1退款处理中  2 同意退款  3 已退款    5 拒绝退款)',sendStorageName:'发货店仓名(多店仓时使用)',sendStorageId:'发货店仓ID(多店仓时使用)',itemCode:'产品编码(多规格产品为规格集编码)',uploadAfterPlatform:'是否同步 至后置平台店铺0 否  1是',productCode:'产品编码(非多规格产品 productCode等于itemCode)'}",
          "id": 100600,
          "belongOrderNo": "20180116155028237001",
          "itemId": 8218,
          "itemName": "33朵粉玫瑰鲜花同城北京花店天津鲜花重庆送花南京鲜花长沙上海",
          "shopId": 257,
          "shopName": "福州鲜花批发",
          "itemPrice": 158,
          "itemTagPrice": 158,
          "itemCount": 1,
          "itemIcon": "http://image1.sansancloud.com/xianhua/2017_12/11/11/51/37_925.jpg",
          "buyerPayPrice": 158,
          "buyerZhekou": 100,
          "buyerId": 60176,
          "buyerType": 0,
          "yunfei": 0,
          "waitComment": 0,
          "commentId": 0,
          "platformNo": "xianhua",
          "backItem": 0,
          "sendStorageId": 0,
          "itemCode": "",
          "productCode": "",
          "uploadAfterPlatform": 0,
          "productItem": {
            "jsonRemark": "{beanRemark:'产品Bean',imagePath:'产品缩略图',name:'产品名',tagPrice:'产品标价',price:'产品售价',price2:'价格2(弃用)',price3:'价格3(弃用)',saleCount:'销售数量',category:'产品分类',saleTime:'开售日期',hotSale:'热销(弃用)',saleStrategy:'销售策略号',disable:'是否上架 0上架    1 下架',linkUrl:'弃用',productCode:'产品编码',description:'描述',orderNumber:'编码',readCount:'访问次数',stock:'库存',belongAreaId:'弃用',belongShangquanId:'弃用',belongShopId:'上传店铺ID',belongAreaName:'弃用',belongShangquanName:'弃用',belongShopName:'上传店铺名',tags:'商品标签',promotion:'参与主活动',shopProductType:'店铺分类（与主分类不同 店铺自己对产品的分类）',phoneImg:'弃用',addTime:'添加时间',minSaleCount:'最少购买数',bigSmallUnitScale:'大小单位比例（弃用）',tip:'tip说明 弃用',unitShow:'单位名称（弃用）',remarkNumber:'备注号(后端使用 前端忽略)',categoryParent:'产品归类父类id',categoryGradparent:'产品归类祖先分类ID',newSale:'新品 (弃用)',brandId:'归属品牌id',brandName:'品牌名',brandNameEn:'品牌英文名',brandNameShort:'品牌缩写',commentCount:'评论次数',yunfei:'运费(弃用 现在使用平台设定的运费模板)',yunfeiTemplate:'运费模板id(弃用 使用平台默认设置的运费模板)',productType:'产品类型 0普通产品  1到店服务类产品 2展示类产品 3预收类产品 5租赁类产品',presalePrice:'预售价格(预售类产品可用)',distributeProfit:'产品分配利润（在二级分润系统使用）',daidingPlatformUserId:'待定平台用户id（忽略）',daidingTime:'待定时间',daidingUserLoginName:'待定用户登录名',daidingUserNickName:'待定用户昵称',remark:'备注（前端忽略 后端使用）',pingfen:'产品评分',pingfenCount:'产品参与评分数量',leaseUnitTypeStr:'租赁单位类型字符表示',leaseUnitType:'租赁单位类型 0小时 1天 2周 3月 4年 （周单位弃用）',productYear:'产品年份',attributesCombind:'属性归集 ',leaseUnitAmount:'租赁单位金额 ',leaseUnitExpireAmount:'租赁逾期单位金额 ',leaseNeedBackUnitCount:'租赁应还单位时长  如值为 10表示10个单位内应归还 单位参考  leaseUnitType ',measureItem:'是否多规格商品 0否 1是 表示有规格 如 红色 L码',saleStrategyDetails:'销售策略详情',measureTypes:'分配规格类型',promotionBean:'参与活动Bean',attrs:'属性列表',platformNo:'平台号' }",
            "id": 8218,
            "imagePath": "http://image1.sansancloud.com/xianhua/2017_12/11/11/51/37_925.jpg",
            "name": "33朵粉玫瑰鲜花同城北京花店天津鲜花重庆送花南京鲜花长沙上海",
            "tagPrice": 158,
            "price": 158,
            "price2": 0,
            "saleCount": 0,
            "category": 1171,
            "saleTime": "2017-12-11 11:51:59",
            "hotSale": 0,
            "disable": 0,
            "description": "",
            "orderNumber": "20171211152611",
            "readCount": 0,
            "stock": 9,
            "price3": 0,
            "productCode": "",
            "belongAreaId": 0,
            "belongShangquanId": 0,
            "belongShopId": 257,
            "belongAreaName": "",
            "belongShangquanName": "",
            "belongShopName": "福州鲜花批发",
            "tags": "",
            "promotion": "0",
            "platformNo": "xianhua",
            "addTime": "2017-12-11 11:51:59",
            "minSaleCount": 1,
            "bigSmallUnitScale": 1,
            "tip": "",
            "unitShow": "束",
            "inCarCount": 0,
            "hgZhekou": 100,
            "lgZhekou": 100,
            "hzZhekou": 100,
            "lzZhekou": 100,
            "fxyZhekou": 100,
            "bdZhekou": 100,
            "categoryParent": 0,
            "categoryGradparent": 0,
            "newSale": 0,
            "brandId": 0,
            "commentCount": 0,
            "yunfei": 0,
            "yunfeiTemplate": 0,
            "productType": 0,
            "presalePrice": 0,
            "distributeProfit": 0,
            "daidingPlatformUserId": 0,
            "remark": "",
            "pingfen": 0,
            "pingfenCount": 0,
            "leaseUnitTypeStr": "小时",
            "productYear": "2017",
            "attributesCombind": "",
            "leaseUnitType": 0,
            "leaseUnitAmount": 0,
            "leaseUnitExpireAmount": 0,
            "leaseNeedBackUnitCount": 1,
            "measureItem": 0,
            "saleStrategyDetails": [

            ]
          }
        }
      ],
      "orderProcessList": [

      ],
      "availableCoupons": [

      ],
      "orderJifen": {
        "platformUserId": 65595,
        "userJifen": 10,
        "minDikouJifen": 0,
        "maxDikouJifen": 0,
        "jifenDikou": 0,
        "tuijianDikou": 0,
        "tuijianDikouAmount": 0
      }
    }


## 评价商品 Client.Order.CommentOrder ( comment_order )
###  Client.Order.CommentOrder 请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|orderNo|订单号|是|-
|shopId|店铺ID|是|-
|productId|产品ID|是|-
|commentContent|评论|是|-
|commentImages|评论图片|否|-
|niming|匿名|否|-
|pingfen|评分|是|-


### Client.Order.CommentOrder 返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|comment|评价内容|-
|productId|评价的产品ID|-
|shopId|评价的店铺ID|-
|commentTime|评价时间|-
|commentPlatformUserId|评价的平台用户ID|-
|commentImagesJson|评价的图片JSON|-
|productName|评价的商品名|-
|productImage|评价的商品图|-
|shopName|评价的店铺名|-
|shopImage|评价的店铺logo|-
|niming|匿名评价(0不匿名1匿名)|-
|pingfen|整体评分(0,   12345表示五个星012表示不满意满意非常满意)|-
|shangpinfuhedu|商品符合度12345|-
|dianjiafuwutaidu|店家服务态度12345|-
|wuliufahuosudu|物流发货速度12345|-
|peisongyuanfuwutaidu|配送员态度12345|-
|belongOrderNo|归属订单编号|-
|commentWithImgTag|含图像的评论|-
|commentWithNoImg|文字评论|-
|commentUserName|评论的用户昵称|-
|commentUserIcon|评论的用户头像|-
|jifen|评论获取的积分|-


### Client.Order.CommentOrder  请求结果:

    {
      "jsonRemark":{
             beanRemark: '用户商品店铺评价表',
             comment: '评价内容',
             productId: '评价的产品ID',
             'shopId:'评价的店铺ID',
             'commentTime': '评价时间',
             'commentPlatformUserId: '评价的平台用户ID',
             'commentImagesJson ': 评价的图片JSON',
             'productName':'评价的商品名',
             'productImage': '评价的商品图',
             'shopName':'评价的店铺名',
             'shopImage':评价的店铺logo',
             'niming': '匿名评价(0不匿名1匿名)',
             'pingfen': '整体评分(0,   12345表示五个星012表示不满意满意非常满意)',
             'shangpinfuhedu': '商品符合度12345',
             'dianjiafuwutaidu': '店家服务态度12345',
             'wuliufahuosudu': '物流发货速度12345',
             'peisongyuanfuwutaidu': '配送员态度12345',
             'belongOrderNo': '归属订单编号',
             newComment: '(忽略)',
             commentWithImgTag: '含图像的评论',
             commentWithNoImg: '文字评论',
             commentUserName: '评论的用户昵称',
             commentUserIcon: '评论的用户头像',
             platformNo: '平台号',
             jifen: '评论获取的积分'
                   },
      "id": 603,
      "comment": "wwww",
      "productId": 8223,
      "shopId": 257,
      "commentTime": "2018-01-17 09:42:28",
      "commentPlatformUserId": 65595,
      "commentImagesJson": "",
      "productName": "北京绿桂坊鲜花 小桌花 会议桌花 商务活动桌花 婚礼宴会小桌花",
      "productImage": "http://image1.sansancloud.com/xianhua/2017_12/18/11/58/43_230.jpg",
      "shopName": "福州鲜花批发",
      "shopImage": "",
      "niming": 0,
      "pingfen": 5,
      "shangpinfuhedu": 0,
      "dianjiafuwutaidu": 0,
      "wuliufahuosudu": 0,
      "peisongyuanfuwutaidu": 0,
      "platformNo": "xianhua",
      "belongOrderNo": "20180116151009845001",
      "newComment": 1,
      "commentWithImgTag": "wwww",
      "commentWithNoImg": "wwww",
      "commentUserName": "蒋",
      "commentUserIcon": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJcvKJ4MoSX8Xqt6k84RwKoIwt9vZeGKuicia7oqRjGHqeNmYCn9U4d6lqyrOPm2LwRBA4Cu9FT7TOg/0",
      "monthDay": "01月17日",
      "jifen": 0
    }



## 评价店铺 Client.Order.CommentOrder ( comment_order )
###  Client.Order.CommentOrder 请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|orderNo|订单号|是|-
|shopId|店铺ID|是|-
|shangpinfuhedu|商品符合度|是|-
|dianjiafuwutaidu|店家服务态度|是|-
|wuliufahuosudu|物流发货速度|是|-


### Client.Order.CommentOrder 返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|comment|评价内容|-
|productId|评价的产品ID|-
|shopId|评价的店铺ID|-
|commentTime|评价时间|-
|commentPlatformUserId|评价的平台用户ID|-
|commentImagesJson|评价的图片JSON|-
|productName|评价的商品名|-
|productImage|评价的商品图|-
|shopName|评价的店铺名|-
|shopImage|评价的店铺logo|-
|niming|匿名评价(0不匿名1匿名)|-
|pingfen|整体评分(0,   12345表示五个星012表示不满意满意非常满意)|-
|shangpinfuhedu|商品符合度12345|-
|dianjiafuwutaidu|店家服务态度12345|-
|wuliufahuosudu|物流发货速度12345|-
|peisongyuanfuwutaidu|配送员态度12345|-
|belongOrderNo|归属订单编号|-
|commentWithImgTag|含图像的评论|-
|commentWithNoImg|文字评论|-
|commentUserName|评论的用户昵称|-
|commentUserIcon|评论的用户头像|-
|jifen|评论获取的积分|-


### Client.Order.CommentOrder  请求结果:

    {
      "jsonRemark":{
             beanRemark: '用户商品店铺评价表',
             comment: '评价内容',
             productId: '评价的产品ID',
             'shopId:'评价的店铺ID',
             'commentTime': '评价时间',
             'commentPlatformUserId: '评价的平台用户ID',
             'commentImagesJson ': 评价的图片JSON',
             'productName':'评价的商品名',
             'productImage': '评价的商品图',
             'shopName':'评价的店铺名',
             'shopImage':评价的店铺logo',
             'niming': '匿名评价(0不匿名1匿名)',
             'pingfen': '整体评分(0,   12345表示五个星012表示不满意满意非常满意)',
             'shangpinfuhedu': '商品符合度12345',
             'dianjiafuwutaidu': '店家服务态度12345',
             'wuliufahuosudu': '物流发货速度12345',
             'peisongyuanfuwutaidu': '配送员态度12345',
             'belongOrderNo': '归属订单编号',
             newComment: '(忽略)',
             commentWithImgTag: '含图像的评论',
             commentWithNoImg: '文字评论',
             commentUserName: '评论的用户昵称',
             commentUserIcon: '评论的用户头像',
             platformNo: '平台号',
             jifen: '评论获取的积分'
                   },
      "id": 603,
      "comment": "wwww",
      "productId": 8223,
      "shopId": 257,
      "commentTime": "2018-01-17 09:42:28",
      "commentPlatformUserId": 65595,
      "commentImagesJson": "",
      "productName": "北京绿桂坊鲜花 小桌花 会议桌花 商务活动桌花 婚礼宴会小桌花",
      "productImage": "http://image1.sansancloud.com/xianhua/2017_12/18/11/58/43_230.jpg",
      "shopName": "福州鲜花批发",
      "shopImage": "",
      "niming": 0,
      "pingfen": 5,
      "shangpinfuhedu": 0,
      "dianjiafuwutaidu": 0,
      "wuliufahuosudu": 0,
      "peisongyuanfuwutaidu": 0,
      "platformNo": "xianhua",
      "belongOrderNo": "20180116151009845001",
      "newComment": 1,
      "commentWithImgTag": "wwww",
      "commentWithNoImg": "wwww",
      "commentUserName": "蒋",
      "commentUserIcon": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJcvKJ4MoSX8Xqt6k84RwKoIwt9vZeGKuicia7oqRjGHqeNmYCn9U4d6lqyrOPm2LwRBA4Cu9FT7TOg/0",
      "monthDay": "01月17日",
      "jifen": 0
    }