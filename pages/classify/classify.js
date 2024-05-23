// pages/classify/classify.js
import {
  reqAddCart,
} from '@/api/cart'
import {
  reqCategoryData,
  reqCategoryGoods
} from '@/api/category'

Page({
  data: {
    imgList: ['/icons/classify/advertisement01.jpg',
      '/icons/classify/advertisement02.jpg',
      '/icons/classify/advertisement03.jpg', '/icons/classify/advertisement04.jpg'
    ],
    categoryList: [],
    activeIndex: 0,
    shoppingList: []
  },
  async updateActive(event) {
    const index = event.currentTarget.dataset.index
    const type_id = this.data.categoryList[index].id
    const res = await reqCategoryGoods({
      "type_id": type_id
    })
    this.setData({
      activeIndex: index,
      shoppingList: res.data.goods_list
    })
  },

  // 获取商品分类的数据

  async getCategoryData() {
    const res = await reqCategoryData()
    if (res.code === 200) {
      this.setData({
        categoryList: res.data.goods_types
      })
    }

    const goods_tpye1 = await reqCategoryGoods({
      "type_id": 1
    })
    this.setData({
      shoppingList: goods_tpye1.data.goods_list
    })
  },

  // 监听页面的加载
  onLoad() {
    // 调用获取商品分类的数据的方法
    this.getCategoryData()
  },
  addToCart: async (e) => {
    const goods_id = e.currentTarget.dataset.id;
    console.log(goods_id)
    const res = await reqAddCart({
      "goods_id": goods_id,
      "count": 1
    })
    console.log(res)
    if (res.code === 200)
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 2000
      });
  },
  buyNow: function () {
    wx.showToast({
      title: '功能正在建设中',
      icon: 'none',
      duration: 2000
    });
  }
})