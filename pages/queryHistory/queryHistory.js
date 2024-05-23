// pages/queryHistory/queryHistory.js
import {
  reqLoadExpress,
  reqExpressByNoAndType
} from "@/api/express"
import {
  ComponentWithStore
} from "mobx-miniprogram-bindings";
const app = getApp()
let {
  count,
  page,
} = {
  "count": 3,
  "page": 1,
}
let is_end = false;

// 保存查询结果和滚动位置
let savedQueryResult = null;
let savedScrollPosition = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: null,
    headPadding: null,
    headHeight: null,
    user: "张三",
    number: "12345678910",
    headIconSrc: "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",

    index: 500,
    multiIndex: ["id", "快递公司", "type缩写"],
    company: "选择快递公司",
    expressCompanies: [{
        'name': '申通',
        'type': 'STO'
      },
      {
        'name': '圆通',
        'type': 'YTO'
      },
      {
        'name': '中通',
        'type': 'ZTO'
      },
      {
        'name': '韵达',
        'type': 'YUNDA'
      },
      {
        'name': '百世快运',
        'type': 'BSKY'
      },
      {
        'name': '京东',
        'type': 'JD'
      },
      {
        'name': '顺丰',
        'type': 'SFEXPRESS'
      },
      {
        'name': '邮政速递物流',
        'type': 'EMS'
      },
      {
        'name': '丹鸟',
        'type': 'DANNIAO'
      },
      {
        'name': '极兔速递',
        'type': 'JITU'
      }
    ],

    // mark : 渲染数据
    selectedCompanyIndex: null,
    selectedexpressType: null,
    deliverystatus: 0,
    expressStatusList: ['快递收件(揽件)', '在途中', '正在派件', '已签收', '派送失败', '疑难件', '退件签收'],
    expressNumber: '',
    queryResult: [],
  },

  bindPickerChange: function (e) {
    // console.log(this.data.array[500][this.data.multiIndex[1]]);
    console.log('picker发送选择改变，携带值为', e.detail.value);
    let data = this.data.array;
    let dataKey = this.data.multiIndex;
    this.setData({
      index: e.detail.value,
      company: data[e.detail.value][dataKey[1]]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  /**
   * 页面加载
   * 用于页面初始化，获取页面参数等
   */
  onLoad() {

    // 获取设备信息
    this.setData({
      statusBarHeight: app.globalData.windowInfo.statusBarHeight,
      headPadding: app.globalData.menuButtonInfo.top - app.globalData.windowInfo.statusBarHeight,
      headHeight: app.globalData.menuButtonInfo.height
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }

    // 如果有保存的查询结果，那么恢复这些结果
    if (savedQueryResult && savedQueryResult.length !== 0) {
      this.setData({
        queryResult: savedQueryResult
      });
      // 恢复滚动位置
      wx.pageScrollTo({
        scrollTop: savedScrollPosition
      });
      // 清空保存的信息
      savedQueryResult = null;
      savedScrollPosition = null;
    } else {
      // 如果没有保存的查询结果，那么显示新的查询结果
      this.showExpress()
    }


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    // 保存查询结果
    savedQueryResult = this.data.queryResult;
    // 保存滚动位置
    wx.createSelectorQuery().selectViewport().scrollOffset((res) => {
      savedScrollPosition = res.scrollTop;
    }).exec();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    page = 1
    this.data.queryResult = []
    is_end = false
    this.setData({
      expressNumber: '',
      selectedCompanyIndex:null,
      selectedexpressType:null
    })
    this.showExpress()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (!is_end) {
      page += 1
      if (this.data.expressNumber) {
        this.searchExpressInfo()
      } else {
        this.showExpress()
      }
    }
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  async showExpress() {

    const {
      code,
      data: express_list
    } = await reqLoadExpress({
      count: count,
      page: page
    })
    if (code === 200) {
      console.log(express_list.query_history_list)
      this.setData({
        queryResult: this.data.queryResult.concat(express_list.query_history_list),
      })
      if (express_list.query_history_list.length < count) {
        is_end = true
      }
      console.log("is_end: ", is_end)
    }
  },

  handleExpressNumberInput(e) {
    this.setData({
      expressNumber: e.detail.value
    });
  },

  handleSearchClick(e) {
    page = 1
    is_end = false
    this.data.queryResult = []
    this.searchExpressInfo()
  },

  handleExpressCompanyChange(e) {
    is_end = false
    this.setData({
      selectedCompanyIndex: e.detail.value,
      selectedexpressType: this.data.expressCompanies[e.detail.value].type
    });
    console.log(this.data.selectedexpressType)
  },

  searchExpressInfo: async function () {

    const requestParams = {
      no: this.data.expressNumber
    };
    if (this.data.selectedexpressType) {
      requestParams.type = this.data.selectedexpressType;
    } else {
      requestParams.type = ""
    }

    const {
      code,
      data: express_list
    } = await reqExpressByNoAndType({
      "page": page,
      "count": count,
      "expressType": requestParams.type,
      "expressNo": requestParams.no
    })
    if (code === 200) {
      console.log(express_list.query_history_list)
      this.setData({
        queryResult: this.data.queryResult.concat(express_list.query_history_list),
      })
      if (express_list.query_history_list.length < count) {
        is_end = true
      }
      console.log("is_end: ", is_end)
    }
  },
})