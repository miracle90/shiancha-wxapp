import { getPrizeRecordApi, getOpenidApi } from '../../utils/api.js'
const moment = require('../../utils/moment.js')
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordList: [],
    avatar: '',
    nickname: '',
    points: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getData()
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
            const { url: avatar, nickname, points, id } = user
            if (code === 0) {
              this.setData({
                avatar,
                nickname,
                points
              })
              wx.request({
                url: getPrizeRecordApi,
                method: 'POST',
                data: {
                  userId: id,
                },
                header: {
                  'content-type': 'application/json'
                },
                success: res => {
                  const { code, prizeRecords } = res.data
                  if (code === 0) {
                    prizeRecords.map(item => {
                      if (item.createTime) item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
                    })
                    this.setData({
                      recordList: prizeRecords
                    })
                  }
                }
              })
            }
          }
        })
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