// 导入封装的网络请求模块实例
import http from '../utils/http'

/**
 * @description 获取商品分类的数据
 * @returns Promise
 */
export const reqCategoryData = () => {
  return http.get('/goods/get-all-types')
}

/**
 * @description 获取商品分类的具体商品
 * @returns Promise
 */
export const reqCategoryGoods = ({ type_id }) => {
  return http.get(`/goods/get-by-type-id?type_id=${type_id}`)
}
