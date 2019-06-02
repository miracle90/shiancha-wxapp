// pages/ranking/ranking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 1,
    rankList: [
      { nickname: 'abceeeeeeee', count: 200, time: '01:10:10', url: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLOvZF344lt6NpsHZfcYVQLqpBsywIhaS6NA8WcXxSBRUNeibRYQhu8uByP4ZuZCeByQMxDcljR5lw/132' },
      { nickname: 'abc', count: 200, time: '01:10:10', url: 'https://shiancha.guduokeji.com/lib/home/hero_bg.png' },
      { nickname: 'abc', count: 200, time: '01:10:10', url: 'https://shiancha.guduokeji.com/lib/home/hero_bg.png' },
      { nickname: 'abc', count: 200, time: '01:10:10', url: 'https://shiancha.guduokeji.com/lib/home/hero_bg.png' },
      { nickname: 'abc', count: 200, time: '01:10:10', url: 'https://shiancha.guduokeji.com/lib/home/hero_bg.png' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  changeIndex (e) {
    const activeIndex = +e.currentTarget.dataset.index
    this.setData({
      activeIndex
    })
  }
})