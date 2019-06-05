import { getOpenidApi, awardApi } from '../../utils/api.js'

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    awardList: ['神秘奖品', '满满体力', '加油还有机会！', '神秘奖品', '满满体力', '加油还有机会！'],
    showSuccess: false,
    showFail: false,
    showMystical: false,
    showGift: true,
    prizeCount: 0,
    points: 0,
    animationData: null
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.deg = 0
    this.commonDeg = 3600
    this.extraDeg = 0
    this.getData()
  },

  // 点击抽奖
  start () {
    if (this.ing) return
    this.ing = true
    wx.request({
      url: awardApi,
      method: 'POST',
      data: {
        userId: app.globalData.userInfo.id
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        let { code, msg, type } = res.data
        if (code === 0) {
          type = 1
          let animation = wx.createAnimation({
            duration: 6000,
            timingFunction: "ease",
            delay: 0,
            transformOrigin: "50% 54%"
          })
          // 1 实物奖励    0  180 
          // 2 体力       60  240
          // 3 谢谢参与    120 300
          this.deg = this.deg + this.commonDeg + this.extraDeg + 120 * (type - 1)
          this.extraDeg = 360 - 120 * (type - 1)
          animation.rotate(this.deg).step();
      
          this.setData({
            animationData: animation.export()
          })
          setTimeout(() => {
            this.ing = false
            this.setData({
              showGift: type === 1,
              showMystical: type === 2
            })
          }, 6500);
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
            const { prizeCount, points } = user
            if (code === 0) {
              this.setData({
                prizeCount,
                points
              })
            }
          }
        })
      }
    })
  },

  goRecord: () => {
    wx.navigateTo({
      url: '../record/record'
    })
  },

  goRegular: () => {
    wx.navigateTo({
      url: '../regular/regular'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})