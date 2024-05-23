// custom-tab-bar/index.js
Component({
  data: {
    selected: 0,
    selectedColor: "#FE7A15",
    list: [
      {
        iconPath: "/icons/tab_icons/index.png",
        selectedIconPath: "/icons/tab_icons/index_selected.png",
        pagePath: "/pages/index/index",
        text: "首页"
      },
      {
        iconPath: "/icons/tab_icons/history.png",
        selectedIconPath: "/icons/tab_icons/history_selected.png",
        pagePath: "/pages/queryHistory/queryHistory",
        text: "查询历史"
      },
      {
        iconPath: "/icons/tab_icons/user.png",
        selectedIconPath: "/icons/tab_icons/user_selected.png",
        pagePath: "/pages/user/user",
        text: "个人中心"
      }
    ]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
    }
  }
})