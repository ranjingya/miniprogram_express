// components/query-result/query-result.js

import {
  reqExpressIn
} from "@/api/express"

const app = getApp()
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
    queryResult: null,
    expressStatus: null,
    expressStatusList: ['快递收件(揽件)', '在途中', '正在派件', '已签收', '派送失败', '疑难件', '退件签收'],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getExpressInfo: async function (expressType, expressNumber) {
      const requestParams = {
        no: expressNumber
      };
      if (expressType) {
        requestParams.type = expressType;
      }else{
        requestParams.type = ""
      }
      const res = await reqExpressIn({
        "type": requestParams.type,
        "no": requestParams.no
      })
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