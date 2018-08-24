Page({
  data: {
    startIndex: 0,
    listArray: [],
    query: {},
    prompt: ''
  },
  onLoad(query) {
    // 页面加载
    my.setNavigationBar({
      title: query.name,
    });
    this.setData({
      query: query
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
      desc: '龙珠直播-列表页页',
      path: 'pages/list/index',
    };
  },
  init() {
    my.showToast({
      content: '加载中...'
    });
    const that = this;
    my.httpRequest({
      url: 'http://stark.longzhu.com/api/streams/search',
      data: {
        'start-index': this.data.startIndex,
        'max-result': 30,
        'game': this.data.query.id,
        'tag': this.data.query.name,
        'device': '6',
        'sort-by': 'views',
        'version': '3.9.3',
        'packageId': '1',
      },
      success: res => {
        if (res.data.data.items[0].streams) {
          let show = false;
          if(res.data.data.items[0].streams.length < 30){
            show = false;
          } else {
            show = true;
          }
          that.setData({
            listArray: [...this.data.listArray, ...res.data.data.items[0].streams],
            prompt: show ? '请给我更多吧！' : '(´・ω・)ﾉ没有更多咯~'
          });
        }
        my.hideToast();
      }
    })
  },
  loadingMore: function() {
    if (this.data.startIndex <= this.data.listArray.length - 30) {
      this.setData({
        startIndex: this.data.startIndex += 30,
      });
      this.init();
    }
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
