var app = getApp();
var year = new Date().getFullYear();
var month = new Date().getMonth() + 1;
var day = new Date().getDate();
if(month < 10){
  month = '0' + month;
}
var datas ={
  roomName: "gu",
  roomDate: year + "-" + month +"-" + day,
  roomNum: "2",
  roomTime: "11",
  userName: "",
  userPhone: "",
  roomRemark: "",
  roomIsNow: "",
  createTime: undefined
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/pages/images/hong.jpg'
    ],
    room: datas,
    userId: '',
    more: '更多',
    hasMore: false,
    today: year + "-" + month + "-" + day,
    tomorrow: year + "-" + month + "-" + (day + 1),
    dayAto: year + "-" + month + "-" + (day + 2)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(null != options["id"] && undefined != options["id"] && "" != options["id"]){
      let id = options["id"];
      let _this = this;
      wx.request({
        url: app.globalData.uri + 'room/getRoom.do',
        data: {id: id},
        method: 'GET',
        success: res => {
         if(null != res.data.object){
          let date = res.data.object.roomDate;

          if (date != _this.data.today && date != _this.data.tomorrow && date != _this.data.dayAto) {
            _this.setData({
              more: date,
              hasMore: true
            });
          }
          res.data.object.id = undefined;
          delete res.data.object.createTime;
          _this.setData({
            room: res.data.object
          });
          
         }
        }
      });
    }
    console.log("load")
    this.setData({
      userId: app.globalData.OPEN_ID
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
  bindUserName: function (e) {
    var key = "room.userName";
    this.setData({
      [key]: e.detail.value
    });
  },
  bindUserPhone: function (e) {
    var key = "room.userPhone";
    this.setData({
      [key]: e.detail.value
    });
  },
  bindRemark: function (e) {
    var key = "room.roomRemark";
    this.setData({
      [key]: e.detail.value
    });
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
      [key]: e.target.dataset.roomdate,
      hasMore: false
    });
  },
  bindTimeChange: function (e) {
    this.setData({
      more: e.detail.value
    })
    var key = "room.roomDate";
    this.setData({
      [key]: e.detail.value,
      hasMore: true
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
    var mydata = this.data.room;
    mydata['userID'] = this.data.userId;
    wx.request({
      url: app.globalData.uri +"room/orderRoom.do", //仅为示例，并非真实的接口地址
      data: mydata,
      method: 'GET',
      success: function (res) {
        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 2000
        });
        if(res.data.status == '202'){
          setTimeout(function(){
            wx.switchTab({
              url: '/pages/order/order'
            });
          },2000)
        }
      }
    })
  }
})