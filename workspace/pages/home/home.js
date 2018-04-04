Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[
      '/pages/images/hong.jpg'
    ],
    categoryList: {
      pageone: [{
        name: "订桌",
        src: "/pages/images/订桌.png",
        method: "dingzhuo"
      }, {
        name: "外卖",
        src: "/pages/images/外卖.png",
        method: "meishi"
      }, {
        name: "商城",
        src: "/pages/images/商城.png"
      }, {
        name: "槐猪工坊",
        src: "/pages/images/猪.png"

      }]
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    
  },
  toast: function () {
    wx.navigateTo({
      url: '../hongbao/hongbao'
    })
  },
    meishi: function () {
      wx.navigateTo({
        url: '../menu/menu'
      })
  },
    dingzhuo:function(){
      wx.navigateTo({
        url: '../hongbao/hongbao',
      })
    }
})