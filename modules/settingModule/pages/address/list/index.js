// 导入接口 API 函数
import { reqAddressList, reqDelAddress } from '../../../api/address'
import { swipeCellBehavior } from '@/behaviors/swipeCell'

// 获取应用实例
const app = getApp()

Page({
  behaviors: [swipeCellBehavior],

  // 页面的初始数据
  data: {
    addressList: [],
    sendFlag:''
  },

  // 删除收货地址
  async delAddress(event) {
    // 解构传递的 id
    const { id } = event.currentTarget.dataset

    // 询问用户是否确认删除
    const modalRes = await wx.modal({
      content: '您确认删除该收货地址吗 ?'
    })

    // 如果用户确认删除，需要调用接口 API
    // 同时需要给用户提示，并且要重新获取收货地址列表
    if (modalRes) {
      await reqDelAddress(id)
      wx.toast({ title: '收货地址删除成功' })
      this.getAddressList()
    }
  },

  // 去编辑页面
  toEdit(event) {
    // 获取要更新的收货地址 id
    const { id } = event.currentTarget.dataset

    wx.navigateTo({
      url: `/modules/settingModule/pages/address/add/index?id=${id}`
    })
  },

  // 获取收货地址列表数据
  async getAddressList() {
    const { data: addressList } = await reqAddressList()
    console.log("addreddList:", addressList)
    this.setData({ addressList: addressList.address_list })
  },

  // 更新收货地址
  changeAddress(event) {

    console.log(this.data.sendFlag);
    let selectSendAddress = null;

    if(this.data.sendFlag.includes('send') || this.data.sendFlag.includes('receive')){
      const addressId = event.currentTarget.dataset.id
      selectSendAddress = this.data.addressList.find((item) => item.id === addressId)
    }

    if (selectSendAddress) {
      const pages = getCurrentPages();
      const prevPage = pages[pages.length - 2];  // 获取上一级页面的实例对象
      if (this.data.sendFlag.includes('send')) {
        prevPage.setData({
          send_address_info: selectSendAddress  // 设置发送地址
        });
      } else if (this.data.sendFlag.includes('receive')) {
        prevPage.setData({
          receive_address_info: selectSendAddress  // 设置接收地址
        });
      }
      wx.navigateBack()
    }




    if (this.flag !== '1') return

    // 如果是从结算支付页面进入的收货地址列表页面，需要获取点击的收货地址详细信息
    const addressId = event.currentTarget.dataset.id

    // 需要从收货地址列表中根据 收货地址 ID 查找到点击的收货地址详情、详细信息
    const selectAddress = this.data.addressList.find((item) => item.id === addressId)

    if (selectAddress) {
      // 如果获取收货地址成功以后，需要赋值给全局共享的数据
      app.globalData.address = selectAddress

      wx.navigateBack()
    }
  },

  onShow() {
    this.getAddressList()
  },

  // onLoad 是在页面加载时触发
  // 如果当前页面没有销毁，onLoad 钩子函数只会执行一次
  // 如果点击了新增、编辑，不会销毁当前页面然后进行新增、编辑页面
  // 在新增、编辑以后，返回到列表页面，这时候 onLoad 不会触发执行
  // 就不会获取最新的数据
  onLoad(options) {
    // 接收传递的参数，挂载到页面的实例上，方便在其他方法中使用
    this.flag = options.flag
    this.setData({
      sendFlag: options.sendFlag
    })
    
  }
})
