import { startRegularApi, answerRegularApi } from '../../utils/api.js'

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ing: false,
    showRight: false,
    showError: false,
    showOut: false,
    showSpin: false,
    selectedIndex: '',
    power: 10,
    points: 0,
    index: 1,
    question: {},
    answer: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  goAward () {
    wx.navigateTo({
      url: '../award/award'
    })
  },

  goIndex () {
    wx.navigateTo({
      url: '../index/index'
    })
  },

  next () {
    this.setData({
      selectedIndex: '',
      showSpin: false,
      showRight: false,
      showError: false,
      index: this.data.index + 1
    })
    this.start()
  },

  selected (e) {
    const selectedIndex = e.target.dataset.index
    this.setData({
      selectedIndex
    })
    wx.request({
      url: answerRegularApi,
      method: 'POST',
      data: {
        userId: this.userId,
        answer: selectedIndex,
        questionId: this.data.question.id
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        let { code, result, question: answer } = res.data
        if (code === 0) {
          let { power, points } = answer
          let obj = {}
          // 答题
          // 1、如果体力消耗完了
          // 2、正确
          // 3、错误
          // 4、答对十题，展示轮盘
          if (result === 'true') {
            if (points % 10 === 0) {
              obj['showSpin'] = true
            } else {
              obj['showRight'] = true
            }
          }
          if (result === 'false') {
            if (!power || power < 1) {
              obj['showOut'] = true
            } else {
              obj['showError'] = true
            }
          }
          power = Math.min(10, power)
          obj['answer'] = answer
          obj['power'] = power
          obj['points'] = points
          this.setData(obj)
        }
      }
    })
  },

  start () {
    this.userId = app.globalData.userInfo.id
    wx.request({
      url: startRegularApi,
      method: 'POST',
      data: {
        userId: this.userId
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        let { code, question, msg } = res.data
        if (code === 0) {
          let { power, points } = question
          power = Math.min(10, power)
          this.setData({
            question,
            power,
            points,
            ing: true
          })
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