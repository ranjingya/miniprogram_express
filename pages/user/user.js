// pages/user/user.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp()
Page({
  data: {
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
    
    bckList:[{
      'src':'/icons/user/vip.png',
    'text':' VIP等级：V6'
    },
   { 
    'src':'/icons/user/sex.png',
     'text':'性别：男'
   }
  ],
    bodyList01:[
      {
'src':'/icons/user/place.png',
'text':'地址簿'},
{
'src':'/icons/user/mywallet.png',
'text':'钱包'
},
{
  'src':'/icons/user/history.png',
  'text':'历史快递'},
  {
    'src':'/icons/user/news.png',
    'text':'消息'},
    {
      'src':'/icons/user/order.png',
      'text':'订单'},
      {
        'src':'/icons/user/setting.png',
        'text':'设置'},
        {
          'src':'/icons/user/numberprotect.png',
          'text':'号码保护'},
          {
            'src':'/icons/user/realname.png',
            'text':'实名认证'},
            {
              'src':'/icons/user/waittingpay.png',
              'text':'待支付'},
              {
                'src':'/icons/user/courier.png',
                'text':'专属快递员'},
  ],
  
  bodyList02:[{
'src':'/icons/user/coupon.png',
'text':'优惠券'
  },
  {
'src':'/icons/user/shop.png',
'text':'积分商城'
  },
  {
  'src':'/icons/user/raffle.png',
  'text':'积分抽奖'
    },
    {
      'src':'/icons/user/vipday.png',
      'text':'会员日'
        }
],
bodyList03:[{
'src':'/icons/user/id.png',
'text':'身份码'

},
{'src':'/icons/user/myexpressage.png',
'text':'我的快递'
}
,
{'src':'/icons/user/mycredits.png',
'text':'我的积分'
}
,
{'src':'/icons/user/preferences.png',
'text':'偏好设置'
}
,
{'src':'/icons/user/serve.png',
'text':'服务查询'
}
,
{'src':'/icons/user/presentcard.png',
'text':'礼品卡'
}
,
{'src':'/icons/user/student.png',
'text':'学生专区'
}
,
{'src':'/icons/user/claim.png',
'text':'理赔中心'
},
{'src':'/icons/user/community.png',
'text':'体验社区'
},
{'src':'/icons/user/family.png',
'text':'亲情卡'
},
{'src':'/icons/user/urgentcard.png',
'text':'加急卡'
},
{'src':'/icons/user/yunshop.png',
'text':'云店'
},
{'src':'/icons/user/monthly.png',
'text':'月报'
},
{'src':'/icons/user/group.png',
'text':'入群有礼'
},
{'src':'/icons/user/living.png',
'text':'好物直播'
}
],
shoppingList:[{
  'src':'/icons/user/shopping-01.jpg',
  'text':'马克杯'
},
{'src':'/icons/user/shopping-02.jpg',
'text':'粽子'
},
{'src':'/icons/user/shopping-03.jpg',
'text':'咖啡'
},
{'src':'/icons/user/shopping-04.jpg',
'text':'黑色中性笔'
},
{'src':'/icons/user/shopping-05.jpg',
'text':'文创飞机模型'
},
{'src':'/icons/user/shopping-06.jpg',
'text':'文创汽车模型'
}
],},
bindViewTap() {
  wx.navigateTo({
    url: '../logs/logs'
  })
},
onChooseAvatar(e) {
  const { avatarUrl } = e.detail
  const { nickName } = this.data.userInfo
  this.setData({
    "userInfo.avatarUrl": avatarUrl,
    hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
  })
},
onInputChange(e) {
  const nickName = e.detail.value
  const { avatarUrl } = this.data.userInfo
  this.setData({
    "userInfo.nickName": nickName,
    hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
  })
},
getUserProfile(e) {
  // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  wx.getUserProfile({
    desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    success: (res) => {
      console.log(res)
      this.setData({
        userInfo: res.userInfo,
        hasUserInfo: true
      })
    }
  })
},
  bckClick(m) {
    wx.showToast({
      title: m.currentTarget.dataset.title
    })
  },

  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  }
}
)