var datas ={
  roomName: "gu",
  roomDate: "today",
  roomNum: "2-4",
  roomTime: "11",
  userName: "",
  userPhone: "",
  roomRemark: "",
  roomIsNow: "",
  createTime: ""
};
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/pages/images/hong.jpg'
    ],
    room: datas,
    userId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("load")
    this.setData({
      userId: app.globalData.userInfo.nickName
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
  changePerson: function(e){
    var key = "room.roomNum";
    this.setData({
      [key] : e.target.dataset.roomnum
    });
  },
  changeDate: function (e) {
    var key = "room.roomDate";
    this.setData({
      [key]: e.target.dataset.roomdate
    });
  },
  changeTime: function (e) {
    var key = "room.roomTime";
    this.setData({
      [key]: e.target.dataset.roomtime
    });
  },
  changeName: function(e){
    var key = "room.roomName";
    this.setData({
      [key]: e.target.dataset.roomname
    });
  },
  roomBooking: function(e){
    wx.request({
      url: app.globalData.uri +"room/orderRoom.do", //仅为示例，并非真实的接口地址
      data: {room: this.data.room, userID: this.data.userId},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  }
})