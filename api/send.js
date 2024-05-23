import http from '@/utils/http'

export const reqSend = (data) => {
  return http.post(`/send/add`, data)
}