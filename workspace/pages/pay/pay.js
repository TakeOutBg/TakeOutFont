// pages/pay/pay.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    locationList: [],
    menu: [],
    cost: 0,
    takePrice: 7
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      menu: app.globalData.curMenu,
      cost: app.globalData.cost
    });
    let userId = app.globalData.OPEN_ID;
    let uri = app.globalData.uri;
    let _this = this;
    wx.request({
      url: uri + 'address/getLists.do',
      data: { userid: userId, addIsDefault: 'true' },
      success: function (res) {
        _this.setData({
          locationList: res.data
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
  
  },
  submit: function(){

  },
  chooseAddress: function(){
    wx.navigateTo({
      url: '../location/location_view',
    })
  }
})