// components/query-result/query-result.js
const app = getApp()

import {
  reqExpressByNoAndType
} from '@/api/express'

Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    queryResult: {
      result: ''
    },
    expressStatus: null,
    expressStatusList: ['快递收件(揽件)', '在途中', '正在派件', '已签收', '派送失败', '疑难件', '退件签收'],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getExpressInfo: async function (expressType, expressNumber) {
      const requestParams = { no: expressNumber };
      if (expressType) {
        requestParams.type = expressType;
      }
      await wx.request({
        url: 'https://wuliu.market.alicloudapi.com/kdi',
        method: 'GET',
        header: {
          "Authorization": "APPCODE 44c27a0a24a44c648411801b5501d58c"
        },
        data: requestParams,
        success: (res) => {
          if (res.data.status === "0") {
            this.setData({
              queryResult: res.data,
              expressStatus: this.data.expressStatusList[res.data.result.deliverystatus]
            })
            app.setExpressData(res.data)
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          }
        }
      })
    },
    getExpressInfoFromMongo: async function (expressNo) {
      const res = await reqExpressByNoAndType({
        page: 1,
        count: 1,
        expressNo: expressNo.expressNo, 
        expressType: ''
      })
      this.setData({
        queryResult: res.data.query_history_list[0]
      })
      console.log(this.data.queryResult)
    },

    //复制快递单号
    copyExpressNumber: function () {
      wx.setClipboardData({
        data: this.data.queryResult.result.number,
        success: function () {
          wx.showToast({
            title: '单号复制成功'
          })
        }
      })
    }
  }
})