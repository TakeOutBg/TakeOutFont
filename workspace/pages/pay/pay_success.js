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
    takePrice: 7,
    appointmentTime: '立即送出',
    remark: undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '支付成功',
      icon: 'success',
      duration: 2000
    })
    let userId = app.globalData.OPEN_ID;
    let uri = app.globalData.uri;
    let _this = this;
    wx.request({
      url: uri + 'order/getOrdersByID.do?ID='+options.id,
      success: function (res) {
        let obj = res.data.object;
        let location = {
          userName: obj.userName,
          userSex: obj.userSex,
          phone: obj.phone,
          address: obj.address
        };
        let dtl = obj.orderDtls;
        let curMenu = [];
        for (let attr in dtl) {
          let menu = {};
          menu.name = dtl[attr].itemName;
          menu.numb = dtl[attr].itemNum;
          menu.price = dtl[attr].itemMoney;
          curMenu.push(menu);
        }
        _this.setData({
          locationList: [location], 
          menu: curMenu,
          cost: obj.money - _this.data.takePrice,
          appointmentTime: obj.appointmentTime,
          remark: obj.remark
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
  bindTimeChange: function (e) {
    this.setData({
      appointmentTime: e.detail.value
    })
  },
  submit: function () {
    wx.switchTab({
      url: '/pages/order/order'
    })
  },
  returnHome: function(){
    wx.switchTab({
      url: '/pages/home/home'
    })
  },
  bindRemark: function (e) {
    this.setData({
      remark: e.detail.value
    })
  },
  chooseAddress: function () {
    wx.navigateTo({
      url: '../location/location_view',
    })
  }
})