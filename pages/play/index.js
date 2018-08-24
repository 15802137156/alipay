Page({
  data: {
  },
  onLoad(query) {
    // 页面加载
    // console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    my.setNavigationBar({
      title: '娱乐类型',
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
      desc: '龙珠直播-娱乐页',
      path: 'pages/play/index',
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
        'version': '3.9.3',
        'packageId': '1',
        'device': '6',
        'tab': 'entertainment'
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
  pageJump(e) {
    const id = e.target.dataset.index.id;
    const name = e.target.dataset.index.name;
    my.navigateTo({
      url: '/pages/list/index?id=' + id + '&name=' + name
    })
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
