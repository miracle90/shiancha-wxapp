// pages/regular/regular.js
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
    power: 2,
    question: {
      index: 1,
      desc: '成功邀请好友积分成功邀请好友积分成功成功邀请好友积分成功邀请好友积分邀请成功邀请好友积分成功邀请好友积分好友成功邀请好友积分成功邀请好友积分积分',
      first: '20',
      second: '30',
      third: '40',
      fourth: '50'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  start () {
    this.setData({
      ing: true
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