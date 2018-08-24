Page({
  data: {
    videoUrl: '',
    inputValue: ''
  },
  onLoad(query) {
    // 页面加载
    // console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    my.setNavigationBar({
      title: `${query.name}直播间`,
    });
    this.init(query.id);
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
      desc: '龙珠直播-直播房间页', 
      path: 'pages/video/index',
    };
  },
  init(roomid) {
    my.showToast({
      content: '加载中...',
      duration: 300000,
    });
    const that = this;
    my.httpRequest({
      url: 'http://liveapi.plu.cn/liveapp/roomstatus',
      data: {
        'version':'3.9.3',
        'device': '6',
        'roomId': roomid
      },
      success: res => {
        if (res.data.streamUri) {
          that.setData({
            videoUrl: res.data.streamUri
          });
        }
        my.hideToast();
      }
    });
  },
  bindInputBlur(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },
  bindSendDanmu() {
    my.showToast({
      content: this.data.inputValue
    });
    this.setData({
      inputValue: ''
    });
  }
});
