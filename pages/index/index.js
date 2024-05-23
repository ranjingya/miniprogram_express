// mark: head
import instance from "@/utils/http.js"


const app = getApp()

Page({
  data: {
    imgList: ['/icons/index/mesh-1.png', '/icons/index/mesh-2.png',
      '/icons/index/mesh-3.png', '/icons/index/mesh-4.png'
    ],
    navList: [{
        'src': '/icons/index/nav-shopping.png',
        'text': '商城'
      },
      {
        'src': '/icons/index/nav-send.png',
        'text': '寄快递'
      },
      {
        'src': '/icons/index/nav-addrBook.png',
        'text': '地址簿'
      },
      {
        'src': '/icons/index/nav-more.png',
        'text': '更多服务'
      }
    ],
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
    selectedCompanyIndex: null,
    selectedexpressType: null,
    expressNumber: null,
    location: '江苏科技大学（长山校区）',
    weather: '多云，气温：25℃',
    statusBarHeight: null,
    headPadding: null,
    headHeight: null,

  },

  // mark: 获取点击菜单栏下标
  handleNavClick(e) {
    const index = e.currentTarget.dataset.index;
    console.log('点击index', index);
    if (index == 0) {
      wx.navigateTo({
        url: '/pages/classify/classify',
        success: function(res){
          console.log('跳转classify成功', res)
        },
        fail: function(res){
          console.log('失败', res)
        }
      })
    }  
    else if(index == 1){
      wx.navigateTo({
        url: '/pages/expDelivery/expDelivery',
        success: function(res){
          console.log('跳转address成功', res)
        },
        fail: function(res){
          console.log('失败', res)
        }
      })
    }
    else if(index== 2){
      wx.navigateTo({
        url: '/modules/settingModule/pages/address/list/index',
        success: function(res){
          console.log('跳转address成功', res)
        },
        fail: function(res){
          console.log('失败', res)
        }
      })
    }
    if(index == 3) {
      wx.showToast({
        title: '更多功能正在开发，敬请期待',
      })
    }


  },

  handleExpressCompanyChange(e) {
    this.setData({
      selectedCompanyIndex: e.detail.value,
      selectedexpressType: this.data.expressCompanies[e.detail.value].type
    });
  },

  handleExpressNumberInput(e) {
    this.setData({
      expressNumber: e.detail.value
    });
  },

  handleSearch() {
    const queryResult = this.selectComponent('.query-result');
    queryResult.getExpressInfo(this.data.selectedexpressType, this.data.expressNumber);
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
   * 页面初次渲染完成
   * 用于执行页面渲染完成后的操作，如获取节点信息、动画效果等
   */
  onReady() {

  },

  /**
   * 页面显示
   * 用于处理页面显示时的操作，如数据加载、刷新等
   */
  onShow() {

    // 设置底部导航栏选中项
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },

  /**
   * 页面隐藏
   * 用于处理页面进入后台时的操作，如保存数据、清理定时器等
   */
  onHide() {

  },

  /**
   * 页面卸载，如redirectTo或navigateBack到其他页面时
   * 用于处理页面卸载时的操作，如清理数据、清理定时器等
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },




})