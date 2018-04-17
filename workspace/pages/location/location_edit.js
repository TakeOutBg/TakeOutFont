// pages/location/location_edit.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {
      address: undefined,
      phone: undefined,
      userId: undefined,
      userName: undefined,
      userSex: 'm',
      addIsDefault: undefined
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var key = "address.userId";
    this.setData({
      [key]: app.globalData.openId
    });
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
  bindAddress: function(e){
    let key = "address.address";
    this.setData({
      [key]: e.detail.value
    });
  },
  bindPhone: function (e) {
    let key = "address.address";
    this.setData({
      [key]: e.detail.value
    });
  },
  changeSex: function(e){
    let key = "address.userSex";
    this.setData({
      [key]: e.target.dataset.sex
    });
  },
  radioChange: function(e){
    let key = "address.addIsDefault";
    this.setData({
      [key]: e.detail.value
    });
  },
  submit: function(){
    var mydata = this.data.address;
    mydata['userId'] = this.data.userId;
    // wx.request({
    //   url: app.globalData.uri + "address/insetSelective.do", //仅为示例，并非真实的接口地址
    //   data: mydata,
    //   method: 'GET',
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // });

    wx.navigateBack({
      delta: 1
    })
  }
})