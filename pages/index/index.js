import { getOpenidApi, shareApi, getContentApi } from '../../utils/api.js'

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
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // btnSrc: 'https://shiancha.guduokeji.com/lib/home/start.png',
    abouts: '',
    rules: '',
    heroTip: ''
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function () {
    this.getContent('hero_post')
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.getData()
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        this.getData()
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
          this.getData()
        }
      })
    }
  },

  getContent (str) {
    wx.request({
      url: getContentApi,
      method: 'POST',
      data: {
        code: str
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        const { code, value, msg } = res.data
        if (code === 0) {
          switch (str) {
            case 'abouts':
              this.setData({
                abouts: value,
                showAbout: true
              })
              break
            case 'rules':
              this.setData({
                rules: value,
                showRules: true
              })
              break
            case 'hero_post':
              this.setData({
                heroTip: value
              })
              break
            default:
              break
          }
        } else {
          wx.showToast({
            title: msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  getData () {
    wx.login({
      success: res => {
        const code = res.code
        const { nickName: nickname, avatarUrl: iconUrl } = app.globalData.userInfo
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
          success: res => {
            const { code, user } = res.data
            const { superBeforQuestionId, superPower, superPoints } = user
            if (code === 0) {
              wx.setStorageSync('questionId', superBeforQuestionId)
              this.setData({
                showContest: superPower === 10 && superPoints === 0,
                userInfo: { ...this.data.userInfo, ...user }
              })
              app.globalData.userInfo = { ...app.globalData.userInfo, ...this.data.userInfo, ...user }
            }
          }
        })
      }
    })
  },
  share () {
    wx.showToast({
      title: '右上角转发给好友，即可+3体力哦',
      icon: 'none',
      duration: 2000
    })
  },
  goShare () {
    this.setData({
      showTreasure: true
    })
  },
  goRank () {
    wx.navigateTo({
      url: '../ranking/ranking'
    })
  },
  goRegular () {
    // this.setData({
    //   btnSrc: 'https://shiancha.guduokeji.com/lib/new/start.png'
    // })
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
    this.getContent('abouts')
  },
  hiddenAbout () {
    this.setData({
      showAbout: false
    })
  },
  hiddenContest () {
    this.setData({
      showContest: false
    })
  },
  showRules () {
    this.getContent('rules')
  },
  hiddenRules () {
    this.setData({
      showRules: false
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.getData()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    wx.request({
      url: shareApi,
      method: 'POST',
      data: {
        userId: app.globalData.userInfo.id
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        const { code, user, msg } = res.data
        if (code === 0) {
          this.setData({
            userInfo: user
          })
        } else {
          wx.showToast({
            title: msg,
            icon: 'none',
            duration: 5000
          })
        }
        this.setData({
          showTreasure: false
        })
      }
    })
  }
})
