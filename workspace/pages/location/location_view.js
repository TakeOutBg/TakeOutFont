// pages/location/location.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    locationList: [],
    hidden: true
  },
  addLocation: function () {
    wx.navigateTo({
      url: './location_edit',
    })
  },
  onTap: function (e) {
    wx.setStorageSync('location', e.currentTarget.dataset.key)
    wx.switchTab({
      url: '/pages/home/home'
    })
  },
  getLocation: function () {
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log(res);
        wx.request({
          url: 'https://api.map.baidu.com/geocoder/v2/?ak=btsVVWf0TM1zUBEbzFz6QqWF&coordtype=gcj02ll&location=' + latitude + ',' + longitude + '&output=json&pois=0',
          method: "get",
          success: function (res) {
            console.log(res)
            //console.log(res.data.result.formatted_address)
            //wx.setStorageSync('location', res.data.result.formatted_address.substr(res.data.result.formatted_address.indexOf('市') + 1, 10))
          }
        })
      }
    })
    wx.switchTab({
      url: '/pages/home/home'
    })
  },
  input: function (e) {
    if (e.detail.value) {
      this.setData({
        hidden: false
      })
      this.search(e.detail.value);
    } else {
      this.setData({
        hidden: true
      })
    }
  },
  search: function (text) {
    var that = this;
    wx.request({
      url: 'https://api.map.baidu.com/place/v2/search?query=' + text + '&page_size=20&page_num=0&scope=2&region=泉州&output=json&ak=btsVVWf0TM1zUBEbzFz6QqWF',
      type: 'json',
      success: function (res) {
        console.log(res);
        that.setData({
          locationList: res.data.results
        })
      }
    })
  },

  edit: function (e) {
    let location = e.currentTarget.dataset.obj;
    wx.navigateTo({
      url: './location_edit?' + this.getData(location),
    })
  },
  getData: function (value) {
    let val = "";
    for (let attr in value) {
      val += (attr + "=" + value[attr] + "&")
    }
    return val.substr(0, val.length);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  chooseLocation: function (e) {
    let location = e.currentTarget.dataset.location;
    let pages = getCurrentPages();             //  获取页面栈
    let currPage = pages[pages.length - 1];    // 当前页面
    let prevPage = pages[pages.length - 2];    // 上一个页面
    prevPage.setData({
      locationList: [location]                      // 假数据
    });
    wx.navigateBack({
      delta: 1
    })
  },
  getLocationById: function () {
    let userId = app.globalData.OPEN_ID;
    let uri = app.globalData.uri;
    let _this = this;
    wx.request({
      url: uri + 'address/getAddressByUserID.do',
      data: { userID: userId },
      success: function (res) {
        if (res.data.status == "202") {
          _this.setData({
            locationList: res.data.result
          })
        }
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
    this.getLocationById();
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