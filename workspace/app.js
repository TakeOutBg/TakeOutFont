//app.js
var app = getApp();
App({
  onLaunch: function() {
    var _this = this;
    wx.getUserInfo({
      withCredentials: false,
      success: function (res) {
        _this.globalData.userInfo = res.userInfo;
        console.log(res.userInfo);
      }
    });
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.request({
          url: 'https://api.map.baidu.com/geocoder/v2/?ak=btsVVWf0TM1zUBEbzFz6QqWF&coordtype=gcj02ll&location=' + latitude + ',' + longitude + '&output=json&pois=0',
          method: "get",
          success: function (res) {     
            //console.log(res.data.result.formatted_address)
            //wx.setStorageSync('location', res.data.result.formatted_address.substr(res.data.result.formatted_address.indexOf('市') + 1, 10))
          }
        })
      }
    })
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          console.log(res.userInfo) 
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null,
    location: "",
    openId: '',
    uri: 'http://127.0.0.1:8080/demo-web/'
  }
})
