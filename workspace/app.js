//app.js
var app = getApp();
App({
  onLaunch: function() {
    var _this = this;
    wx.login({
      success: function(res){
        console.log(res);
      }
    })
  },

  globalData: {
    userInfo: null,
    location: "",
    openId: '',
    appId: 'wx9aacc28ca08872f0',
    secret: '7bc128b26612a705deb0beee1804a8a5',
    uri: 'http://127.0.0.1:8080/demo-web/'
  }
})
