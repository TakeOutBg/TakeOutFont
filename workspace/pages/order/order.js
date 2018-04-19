// pages/order/order.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    takePrice: 7,
    orderList:[{
      id: undefined,
      restaurantName: "传世排骨汤饭",
      state: "订单取消",
      price: "12",
      date: "2017-07-14",
      time: "12:29:12",
      howToDistribute: "商家"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  formatTime: function (date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(this.formatNumber).join('-') + ' ' + [hour, minute, second].map(this.formatNumber).join(':')
  },
  formatNumber: function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },

  changeStatus: function(e){
    let _this = this;
    let id = e.currentTarget.dataset.id;
    wx.request({
      url: app.globalData.uri + 'order/updateSelective.do',
      data: {id: id, docStatus: '00'},
      method: 'POST',
      success: function (res) {
        _this.onLoad();
      }
    })
  },
  detail: function(e){
    wx.navigateTo({
      url: '../pay/pay_success?id=' + e.currentTarget.dataset.id,
    })
  },
  addMore: function(e){
    wx.navigateTo({
      url: '../pay/pay_more?id=' + e.currentTarget.dataset.id,
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
    let userid = app.globalData.OPEN_ID;
    let uri = app.globalData.uri;
    let _this = this;
    wx.request({
      url: uri + 'order/getOrdersByUserID.do?userID=' + userid,
      success: function (res) {
        let orders = res.data.result;
        let orderList = []
        for (let attr in orders) {

          let order = {
            id: orders[attr].id,
            restaurantName: "红餐桌",
            state: orders[attr].docStatus,
            price: orders[attr].money,
            date: _this.formatTime(new Date(orders[attr].createTime)),
            howToDistribute: "商家"
          };
          orderList.push(order);
        }
        _this.setData({
          orderList: orderList
        })
      }
    })
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
  
  }
})