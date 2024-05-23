import http from '../utils/http'

/**
 * @description 进行登录操作
 * @param {*} code 临时登录凭证
 * @returns Promise
 */
export const reqLogin = (params) => {
  console.log(params)
  return http.post('/login', {
    code: params.code,
    username: params.username,
    password: params.password
  })
}

/**
 * @description 获取用户信息
 * @returns Promise
 */
export const reqUserInfo = () => {
  return http.get('/weixin/getuserInfo')
}

/**
 * @description 实现本地资源上传
 * @param {*} filePath 要上传的文件资源路径
 * @param {*} name 文件对应的 key
 * @returns Promise
 */
export const reqUploadFile = (filePath, name) => {
  return http.upload('/fileUpload', filePath, name)
}

/**
 * @description 更新用户信息
 * @param {*} userInfo 最新的头像和昵称
 * @returns Promise
 */
export const reqUpdateUserInfo = (userInfo) => {
  return http.post('/weixin/updateUser', userInfo)
}
