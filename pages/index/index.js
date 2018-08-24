Page({
  data: {
    imgUrls: [],
    typeArray: [],
    adsArray: [],
  },
  onLoad() {
    this.init();
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: '龙珠直播',
      desc: '龙珠直播-直播页', 
      path: 'pages/index/index',
    };
  },
  init() {
    my.showToast({
      content: '加载中...',
      duration: 300000,
    });
    const that = this;
    my.httpRequest({
      url: 'http://stark.longzhu.com/api/home',
      data: {
        'device': '6',
        'tab': 'hot',
        'version': '3.9.3'
      },
      success: res => {
        if (res.data.data) {
          that.setData({
            imgUrls: res.data.data['banner'],
            typeArray: res.data.data['items'],
            adsArray: res.data.data['adverts'],
          });
        }
        my.hideToast();
      }
    })
  },
  // 跳转列表页
  pageJump(e) {
    const id = e.target.dataset.index.id;
    const name = e.target.dataset.index.name;
    my.navigateTo({
      url: '/pages/list/index?id=' + id + '&name=' + name
    });
  },
  // 跳转直播房间页
  passRoomId(e) {
    const id = e.target.dataset.index.room.id;
    const name = e.target.dataset.index.room.name;
    my.navigateTo({
      url: '/pages/video/index?id=' + id + '&name=' + name
    })
  }
});
