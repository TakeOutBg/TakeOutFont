// pages/location/location_edit.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {
      id: undefined,
      address: undefined,
      phone: undefined,
      userid: undefined,
      userName: undefined,
      userSex: 'm',
      addIsDefault: undefined
    },
    method: "add"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!options.addIsDefault){
      options.addIsDefault = 'false';
    }
    if(options.id){
      this.setData({
        method: 'edit'
      })
    }
    this.setData({
      address: options
    });
    let key = "address.userid";
    this.setData({
      [key]: app.globalData.OPEN_ID
    });
    console.log(this.data.address)
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
  bindUserName: function(e){
    let key = "address.userName";
    this.setData({
      [key]: e.detail.value
    });
  },
  bindAddress: function(e){
    let key = "address.address";
    this.setData({
      [key]: e.detail.value
    });
  },
  bindPhone: function (e) {
    let key = "address.phone";
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
    let url = "insertSelective.do";
    if(this.data.method == 'edit'){
      url = 'update.do';
    }
    let mydata = this.data.address;
    wx.request({
      url: app.globalData.uri + "address/" + url, //仅为示例，并非真实的接口地址
      data: mydata,
      method: 'POST',
      success: function (res) {
        wx.navigateBack({
          delta: 1
        })
      }
    });
  }
})