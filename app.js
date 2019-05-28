import { getOpenidApi } from './utils/api.js'

App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              const { nickName: nickname, avatarUrl: iconUrl } = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }

              // 登录，根据 res.code 获取 openid 和 
              wx.login({
                success: res => {
                  const code = res.code
                  // 发送 res.code 到后台换取 openId, sessionKey, unionId
                  wx.request({
                    url: getOpenidApi,
                    method: 'POST',
                    data: {
                      nickname,
                      iconUrl,
                      code
                    },
                    header: {
                      'content-type': 'application/json'
                    },
                    success: function (res) {
                      const { code, user } = res.data
                      if (code === 0) {
                        const openid = user.openId //返回openid
                      }
                    }
                  })
                }
              })
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})