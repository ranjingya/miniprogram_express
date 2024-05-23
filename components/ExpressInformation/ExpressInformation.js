// components/ExpressInfomation.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    listNumber: Number, //历史记录中的个数。
    expName: String, //快递公司名称
    number: String, //快递单号
    logo: String, //快递公司的logo地址
    deliveryStatus: String, ///* 0：快递收件(揽件)1.在途中 2.正在派件 3.已签收 4.派送失败 5.疑难件 6.退件签收  */
    updateTime: String, //快递轨迹信息最新时间
    takeTime: String, //发货到收货消耗时长 (截止最新轨迹)

  },

  /**
   * 组件的初始数据
   */
  data: {
    queryResult: null,
    expressStatus: null,
    expressStatusList: ['快递收件(揽件)', '在途中', '正在派件', '已签收', '派送失败', '疑难件', '退件签收'],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //复制快递单号
    copyExpressNumber: function () {
      wx.setClipboardData({
        data: this.properties.number,
        success: function () {
          wx.showToast({
            title: '单号复制成功'
          })
        }
      })
    }
  }
})