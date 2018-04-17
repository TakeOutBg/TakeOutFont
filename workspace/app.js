//app.js
var app = getApp();
App({
  onLaunch: function() {
    let _this = this;
    wx.getUserInfo({
      success: function(res){
        _this.globalData.userInfo = res.userInfo;
        _this.globalData.isLogin = true;
        wx.login({
          success: function (res) {
            console.log(res);
            if (res) {
              wx.request({
                url: 'https://api.weixin.qq.com/sns/jscode2session',
                data: {
                  appid: _this.globalData.APP_ID,
                  secret: _this.globalData.APP_SECRET,
                  js_code: res.code,
                  grant_type: _this.globalData.GRANT_TYPE
                },
                success: function (response) {
                  if (response.statusCode == 200) {
                    _this.globalData.OPEN_ID = response.data.openid;
                  }
                }
              })
            }
          }
        });
      },
      fail: function(res){
        //alert("授权失败");
        _this.globalData.isLogin = false;
      }
    });
  },

  globalData: {
    userInfo: null,
    location: "",
    OPEN_ID: '',
    isLogin: false,
    APP_ID: 'wx9aacc28ca08872f0',
    APP_SECRET: '7bc128b26612a705deb0beee1804a8a5',
    GRANT_TYPE: 'authorization_code',
    uri: 'http://127.0.0.1:8080/demo-web/'
  }
})
