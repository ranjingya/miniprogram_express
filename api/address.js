import http from '@/utils/http'

// export const reqAddCart = ({ goods_id, count, ...data }) => {
//   return http.get(`/cart/add/${goods_id}/${count}`, data)
// }

export const reqSend = (data) => {
  return http.post('/send')
}