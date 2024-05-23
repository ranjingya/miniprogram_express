// pages/expDelivery/expDelivery.js
import { reqSend } from '@/api/send'

Page({

  data: {
    peopleList: [{
        id: 1,
        text: "寄件人信息"
      },
      {
        id: 2,
        text: "收件人信息"
      }
    ],
    send_address_info: {
      name: "寄件人信息",
      phone: '',
      address: "请输入真实姓名"

    },
    receive_address_info: {
      name: "收件人信息",
      phone: '',
      address: "请输入真实姓名"
    },
    combined_address_info: {
      send_address_info: '',
      receive_address_info: ''
    },

    useList: [{
        name: "付款方式"
      },
      {
        name: "保价"
      },
      {
        name: "增值服务"
      },
      {
        name: "信息加密"
      }
    ],
    userName: ''
  },
  handleInput(event) {
    this.setData({
      userName: event.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

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

  handleItemClick(){
    wx.showToast({
      icon: 'none',
      title: "功能建设中，敬请期待"
    })
  },

  async submitOrder(){
    
    if (this.data.send_address_info.address.includes("请输入真实姓名") || this.data.receive_address_info.address.includes("请输入真实姓名")) {
      wx.showToast({
        icon: 'none',
        title: "请填写寄件人和收件人信息"
      })
      return;
    }

    this.setData({
      combine_address_info: {
        send_address_info: this.data.send_address_info,
        receive_address_info: this.data.receive_address_info
      }
    });

    const data = this.data.combine_address_info
    console.log(data)
    const res = await reqSend(data)
    if (res.code == 200)
      wx.showToast({
        title: "寄件成功"
    })
  }

})