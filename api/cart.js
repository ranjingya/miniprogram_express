import http from '@/utils/http'

/**
 * @description [商品详情加入购物车] 以及 [购物车更新商品数量]
 * @param { Object } param { goodsId：商品 ID, count: 购买数量, blessing: 祝福语 }
 * @returns Promise
 */
export const reqAddCart = ({ goods_id, count, ...data }) => {
  return http.get(`/cart/add/${goods_id}/${count}`, data)
}

/**
 * @description 获取购物车列表数据
 * @returns Promise
 */
export const reqCartList = () => {
  return http.get('/cart/get')
}

/**
 * @description 更新商品的选中状态
 * @param {*} goodsId 商品的 ID
 * @param {*} isChecked 商品的勾选状态，0 说明需要取消勾选，1 需要勾选
 * @returns Promise
 */
export const reqUpdateChecked = (goods_id, is_checked) => {
  return http.get(`/cart/update/${goods_id}/${is_checked}`)
}

/**
 * @description 实现全选和全不选功能
 * @param {*} isChecked 全选与全不选状态，0 就是取消全选，1 进行全选
 * @returns Promise
 */
export const reqCheckAllStatus = (is_checked) => {
  return http.get(`/cart/update-all/${is_checked}`)
}

/**
 * @description 删除购物车商品
 * @param {*} goodsId 商品的 ID
 * @returns Promise
 */
export const reqDelCartGoods = (goods_id) => {
  return http.get(`/cart/delete/${goods_id}`)
}
