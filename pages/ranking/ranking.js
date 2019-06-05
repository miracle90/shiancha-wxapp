import { rankListApi } from '../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 1,
    rankList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getList()
  },

  getList () {
    wx.request({
      url: rankListApi,
      method: 'POST',
      data: {
        nickname: '',
        type: this.data.activeIndex,
        page: 1,
        size: 50
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        let { code, data: { records } } = res.data
        if (code === 0) {
          this.setData({
            rankList: records
          })
        }
      }
    })
  },

  changeIndex (e) {
    const activeIndex = +e.currentTarget.dataset.index
    this.setData({
      activeIndex
    })
    this.getList()
  }
})