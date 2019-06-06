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
    this.page = 1
    this.getList()
  },

  getList () {
    wx.request({
      url: rankListApi,
      method: 'POST',
      data: {
        nickname: '',
        type: this.data.activeIndex,
        page: this.page,
        size: 2
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        let { code, data: { records } } = res.data
        if (code === 0) {
          this.setData({
            rankList: [...this.data.rankList, ...records]
          })
        }
      }
    })
  },

  changeIndex (e) {
    const activeIndex = +e.currentTarget.dataset.index
    this.setData({
      activeIndex,
      rankList: []
    })
    this.getList()
  },

  onReachBottom: function () {
    this.page = this.page + 1
    this.getList()
  }
})