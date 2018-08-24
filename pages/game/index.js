Page({
  data: {
    listArray: [],
  },
  onLoad(query) {
    // 页面加载
    // console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    my.setNavigationBar({
      title: '游戏类型',
    });
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
      desc: '龙珠直播-游戏页', 
      path: 'pages/game/index',
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
        'version':'3.9.3',
        'packageId': '1',
        'device': '6',
        'tab': 'games'
      },
      success: res => {
        if (res.data.data.items) {
          that.setData({
            listArray: res.data.data.items
          });
        }
        my.hideToast();
      }
    });
  },
});
