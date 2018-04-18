// pages/menu/menu.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperTitle: [{
      text: "点菜",
      id: 1
    },{
      text: "评价",
      id: 2
    },{
      text: "商家",
      id: 3
    }],
    showview: false,
    menu:[],
    curMenu: [],
    currentPage: 0,
    selected: 0,
    howMuch: 12,
    cost:0,
    pullBar: false
  },
  pullBar: function () {
    this.setData({
      pullBar: !this.data.pullBar
    })
  },
  addToTrolley: function (e) {
    var info = this.data.menu;
    info[this.data.selected].menuContent[e.currentTarget.dataset.index].numb++;
    this.setData({
      cost: this.data.cost+this.data.menu[this.data.selected].menuContent[e.currentTarget.dataset.index].price,
      menu: info,
    });
    this.getCurMenu();
  },
  removeFromTrolley: function (e) {
    var info = this.data.menu;
    if (info[this.data.selected].menuContent[e.currentTarget.dataset.index].numb!=0){
      info[this.data.selected].menuContent[e.currentTarget.dataset.index].numb--;
      this.setData({
        cost: this.data.cost - this.data.menu[this.data.selected].menuContent[e.currentTarget.dataset.index].price,
        menu: info,
      });
    }
    this.getCurMenu();
  },
  turnPage: function (e) {
    this.setData({
      currentPage: e.currentTarget.dataset.index
    })
  },
  turnTitle: function (e) {
    if(e.detail.source=="touch"){
      this.setData({
        currentPage: e.detail.current
      })
    }
  },
  turnMenu: function (e) {
    this.setData({
      selected: e.currentTarget.dataset.index
    })
    console.log(e.currentTarget.dataset.index);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: "https://www.easy-mock.com/mock/596257bc9adc231f357c4664/restaurant/menu",
      method: "GET",
      type: 'json',
      success: function (res) {
        that.setData({
          menu: res.data
        })
      }
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

  showMenu: function(e){
    var showview = !this.data.showview;
    this.setData({
      showview: showview
    });
    console.log(this.data.showview);
  },
  paycost: function(e){
    if(this.data.cost == 0){
      return ;
    }
    this.getCurMenu()
    app.globalData.curMenu = this.data.curMenu;
    app.globalData.cost = this.data.cost;
    wx.navigateTo({
      url: '../pay/pay',
    })
  },
  getCurMenu: function(){
    let curMenu = [];
    for (let i = 0; i < this.data.menu.length; i++) {
      let menuContent = this.data.menu[i].menuContent;
      for (let j = 0; j < menuContent.length; j++) {
        let content = menuContent[j];
        if (content.numb != 0) {
          curMenu.push(content);
        }
      }
    }

    this.setData({
      curMenu: curMenu
    });
  }
})