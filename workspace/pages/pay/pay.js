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
  bindTimeChange: function(e){
    this.setData({
      appointmentTime: e.detail.value
    })
  },
  submit: function(){
    let order = {
      id: undefined,
      userName: this.data.locationList[0].userName, 
      appointmentTime: this.data.appointmentTime,
      userid: app.globalData.OPEN_ID,
      money: app.globalData.cost + this.data.takePrice,
      phone: this.data.locationList[0].phone,
      remark: this.data.remark,
      address: this.data.locationList[0].address,
      userSex: this.data.locationList[0].userSex,
      docStatus: '20',
      orderDtls: []
    };

    let curMenu = app.globalData.curMenu;
    for(let attr in curMenu){
      let dtl = {};
      dtl.itemName = curMenu[attr].name;
      dtl.itemNum = curMenu[attr].numb;
      dtl.itemMoney = curMenu[attr].price;
      order.orderDtls.push(dtl);
    }
    wx.request({
      url: app.globalData.uri + 'order/createOrder.do',
      data:  order,
      method: 'POST',
      success: function(res){
        if (res.data.status == "202"){
          let _order = res.object
          wx.redirectTo({
            url: '../pay/pay_success?id='+order.id,
          })
        }else{
          wx.showToast({
            title: '失败',
            icon: 'error',
            duration: 2000
          })
        }
      }
    })

  },
  bindRemark: function(e){
    this.setData({
      remark: e.detail.value
    })
  },
  chooseAddress: function(){
    wx.navigateTo({
      url: '../location/location_view',
    })
  }
})