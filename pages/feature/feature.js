import { startFeatureApi, answerFeatureApi, checkQualifiApi, updateTimeApi, getContentApi } from '../../utils/api.js'
// import { formatTime } from '../../utils/util.js'

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
    showTips: false,
    showEnd: false,
    showSuccess: false,
    selectedIndex: '',
    superPower: 10,
    index: 1,
    question: {},
    duration: '00:00:00',
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getContent('special_competition_introduction')
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
          this.setData({
            content: value
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

  // 计时
  timeStart (str) {
    let arr = str.split(':')
    let n_sec = arr[2]
    let n_min = arr[1]
    let n_hour = arr[0]
    
    this.timer = setInterval(() => {
      var str_sec = n_sec;
      var str_min = n_min;
      var str_hour = n_hour;
      if (+n_sec < 10 && (n_sec + '').length === 1) {
        str_sec = "0" + n_sec;
      }
      if (+n_min < 10 && (n_min + '').length === 1) {
        str_min = "0" + n_min;
      }
    
      if (+n_hour < 10 && (n_min + '').length === 1) {
        str_hour = "0" + n_hour;
      }

      var time = str_hour + ":" + str_min + ":" + str_sec;
      // ele_timer.value = time;
      if (time.length > 8) time = time.slice(-8)
      this.setData({
        duration: time
      })
      
      n_sec++;
      if (n_sec > 59){
        n_sec = '00';
        n_min++;
      }
      if (n_min > 59) {
        n_sec = '00';
        n_hour++;
      }
    }, 1000)
  },

  // 去答题
  answer () {
    let questionId = wx.getStorageSync('questionId') || 0
    wx.request({
      url: startFeatureApi,
      method: 'POST',
      data: {
        userId: this.userId,
        questionId: questionId
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        let { code, question, user, msg } = res.data
        if (code === 0) {
          // 闯关成功
          if (question === null) {
            this.updateTime()
            this.setData({
              showSuccess: true
            })
            return;
          }
          let { id } = question
          let { superPower, superTime } = user
          superPower = Math.min(10, superPower)
          wx.setStorageSync('questionId', id)
          // 答题，开始计时
          if (!this.timer) this.timeStart(superTime)
          this.setData({
            question,
            user,
            superPower,
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

  start () {
    this.userId = app.globalData.userInfo.id
    wx.request({
      url: checkQualifiApi,
      method: 'POST',
      data: {
        userId: this.userId
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        let { code, status } = res.data
        if (code === 0) {
          // 1 时间还未开始 
          // 2 活动已经结束
          // 3 体力耗尽或者答题结束
          // 0 可以开始专题赛
          if (status === 3 || status === 2) {
            this.setData({
              showEnd: true
            })
          } else if (status === 1) {
            this.setData({
              showTips: true
            })
          } else {
            this.answer()
          }
        }
      }
    })
  },

  // 继续答题
  next () {
    this.setData({
      selectedIndex: '',
      showRight: false,
      showError: false,
      index: this.data.index + 1
    })
    this.answer()
  },

  // 选择答案
  selected (e) {
    const selectedIndex = e.target.dataset.index
    this.setData({
      selectedIndex
    })
    wx.request({
      url: answerFeatureApi,
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
        let { code, result, question: answer, user } = res.data
        if (code === 0) {
          let { superPower } = user
          let obj = {}
          // 答题
          // 1、如果体力消耗完了
          // 2、正确
          // 3、错误
          // 4、答对十题，展示轮盘
          if (result === 'true') {
            obj['showRight'] = true
          }
          if (result === 'false') {
            if (!superPower || superPower < 1) {
              if (this.timer) clearInterval(this.timer)
              this.updateTime()
              obj['showOut'] = true
            } else {
              obj['showError'] = true
            }
          }
          superPower = Math.min(10, superPower)
          obj['answer'] = answer
          obj['selectedIndex'] = ''
          obj['superPower'] = superPower
          obj['user'] = user
          obj['index'] = this.data.index + 1
          this.setData(obj)
        }

        // let { code, user } = res.data
        // if (code === 0) {
          
        //   let { superPower } = user
        //   // 如果没有体力
        //   if (superPower < 1) {
        //     if (this.timer) clearInterval(this.timer)
        //     this.updateTime()
        //     this.setData({
        //       showOut: true
        //     })
        //     return
        //   }
        //   superPower = Math.min(10, superPower)
        //   this.setData({
        //     selectedIndex: '',
        //     superPower,
        //     user,
        //     index: this.data.index + 1
        //   })
        //   this.answer()
        // }
      }
    })
  },

  updateTime () {
    wx.request({
      url: updateTimeApi,
      method: 'POST',
      data: {
        userId: this.userId,
        time: this.data.duration
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        let { code } = res.data
        if (code === 0) {
          
        }
      }
    })
  },

  hiddenTips () {
    this.setData({
      showTips: false
    })
  },

  goRank () {
    if (this.data.duration && this.data.duration !== '00:00:00') this.updateTime()
    wx.navigateTo({
      url: '../ranking/ranking'
    })
  },
  goRegular () {
    if (this.data.duration && this.data.duration !== '00:00:00') this.updateTime()
    wx.navigateTo({
      url: '../regular/regular'
    })
  },

  goIndex () {
    if (this.data.duration && this.data.duration !== '00:00:00') this.updateTime()
    wx.navigateTo({
      url: '../index/index'
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
    if (this.data.duration && this.data.duration !== '00:00:00') this.updateTime()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (this.data.duration && this.data.duration !== '00:00:00') this.updateTime()
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