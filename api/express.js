import http from '@/utils/http'

export const reqExpressIn = ({type, no}) => {
  return http.get(`/get-express?no=${no}&type=${type}`)
}

export const reqLoadExpress = ({ page, count}) => {
  return http.get(`/get-query-history?page=${page}&count=${count}`)
}

export const reqExpressByNoAndType = ({ page, count, expressNo, expressType }) => {
  return http.get(`/get-query-history?page=${ page }&count=${ count }&express_id=${ expressNo }&express_com_type=${ expressType }`)
}