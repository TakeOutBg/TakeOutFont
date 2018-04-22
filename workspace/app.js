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
                    _this.updateUser();
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
  updateUser: function(){
    let _this = this;
    let user = {
      id: this.globalData.OPEN_ID,
      userName: this.globalData.userInfo.nickName
    };
    wx.request({
      url: _this.globalData.uri + 'user/loginOrRegister.do',
      method: 'POST',
      data: user,
      success: res => {
        console.log(res);
        if(res.data.status == '500'){
          wx.showToast({
            title: '登录失败',
            icon: 'fail',
            duration: 2000
          })
        }else{
          _this.globalData.user = res.data.object

        }
      }
    })
  },
  globalData: {
    userInfo: null,
    location: "",
    OPEN_ID: '',
    curMenu: [],
    cost: 0,
    user: null,
    isLogin: false,
    APP_ID: 'wx9aacc28ca08872f0',
    APP_SECRET: 'c99fa948c489fc34ce21e258e455d66a',
    GRANT_TYPE: 'authorization_code',
    uri: 'http://111.230.48.227:8080/demo-web/'
  }
})
