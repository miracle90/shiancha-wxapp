import { rankListApi } from '../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 1,
    rankList: [],
    page: 1
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
        page: this.data.page,
        size: 10
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        let { code, data: { records } } = res.data
        if (code === 0) {
          const rankList = this.data.rankList
          rankList.push(...records)
          console.log(rankList)
          this.setData({
            rankList
          })
        }
      }
    })
  },

  changeIndex (e) {
    const activeIndex = +e.currentTarget.dataset.index
    this.setData({
      activeIndex,
      rankList: [],
      page: 1
    })
    this.getList()
  },

  scrolltolower () {
    const page = this.data.page + 1
    this.setData({
      page
    }, () => {
      this.getList()
    })
  }
})