// pages/express/express.js
const pagin = {
  page: 1,
  count: 10
}
let is_end = false;
Page({

  /**
   * 页面的初始数据
      */
    data: {

    order_list: []
  },


  /**
   * 生命周期函数--监听页面显示
      */
    onShow() {

    this.searchOrder()
  },
  onReachBottom(){
    // 如果is_end为false表示还未全部查询完
    if(!is_end){
      pagin.page += 1;
      this.searchOrder()
    }
  },
  onPullDownRefresh(){
    // 将分页重置为第一页，将数组值为空，调用一次查询
  },
  searchOrder(){

    wx.request({
      url: 'http://127.0.0.1:5000/search-order',
      data: pagin,
      success: (res) => {
        this.setData({
          order_list: [...this.data.order_list, ...res.data.data.list]
        })
        if(res.data.data.list.length < pagin.count){
          is_end = true
        }
      }
    })
  }
})