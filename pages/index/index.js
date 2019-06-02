//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '食安查小程序',
    showAbout: false,
    showRules: false,
    showContest: false,
    showTreasure: false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  goRank () {
    wx.navigateTo({
      url: '../ranking/ranking'
    })
  },
  goRegular () {
    wx.navigateTo({
      url: '../regular/regular'
    })
  },
  goFeature () {
    wx.navigateTo({
      url: '../feature/feature'
    })
  },
  goAward () {
    wx.navigateTo({
      url: '../award/award'
    })
  },
  showAbout () {
    this.setData({
      showAbout: true
    })
  },
  hiddenAbout () {
    this.setData({
      showAbout: false
    })
  },
  showRules () {
    this.setData({
      showRules: true
    })
  },
  hiddenRules () {
    this.setData({
      showRules: false
    })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
