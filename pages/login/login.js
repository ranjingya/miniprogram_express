// pages/login/login.js

// 导入封装通用模块方法
import { toast } from '@/utils/extendApi'
// 导入本地存储 api
import { setStorage } from '@/utils/storage'
// 导入接口 API 函数
import { reqLogin, reqUserInfo } from '@/api/user'

// 导入 ComponentWithStore 方法
import { ComponentWithStore } from 'mobx-miniprogram-bindings'
// 导入 store 对象
import { userStore } from '@/stores/userstore'

// 导入防抖函数
import { debounce } from 'miniprogram-licia'

// 使用 ComponentWithStore 方法替换 Component 方法构造页面
ComponentWithStore({
  // 让页面和 Store 对象建立关联
  storeBindings: {
    store: userStore,
    fields: ['token', 'userInfo'],
    actions: ['setToken', 'setUserInfo']
  },

  data: {
    // 登录参数
    params: {
      username: '',
      password: ''
    }
  },

  methods: {
    // 授权登录
    login: debounce(function () {
      // 使用 wx.login 获取用户的临时登录凭证 code
      wx.login({
        success: async ({ code }) => {
          if (code) {
            console.log('login.js:', code)
            // 在获取到临时登录凭证 code 以后，需要传递给开发者服务器
            this.params = {
              code: code,
              username: '',
              password: ''
            };
            console.log('login.js:', this.params)
            const { data } = await reqLogin(this.params)

            // 登录成功以后，需要将服务器响应的自定义登录态存储到本地
            setStorage('token', data.Authorization)

            // 将自定义登录态 token 存储到 Store 对象
            this.setToken(data.Authorization)

            // 返回上一级页面
            wx.navigateBack()
          } else {
            toast({ title: '授权失败，请重新授权' })
          }
        }
      })
    }, 500),
  }
})
