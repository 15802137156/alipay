Page({
  data: {
    swiperArray: [],
    sportList: [],
    tab: 0
  },
  onLoad(query) {
    // 页面加载
    // console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    my.setNavigationBar({
      title: '龙珠体育',
    });
    this.init();
    this.schedule(0);
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
      desc: '龙珠直播-体育',
      path: 'pages/sport/index',
    };
  },
  // 体育分类
  init() {
    my.showToast({
      content: '加载中...',
      duration: 300000,
    });
    const that = this;
    my.httpRequest({
      url: 'http://api.longzhu.com/sport/home/matches',
      data: {
        'version': '3.9.3',
        'packageId': '1',
        'device': '8'
      },
      success: res => {
        if (res.data.data) {
          const json = {
            image: 'http://r.plures.net/pt/images/pt/ui/sidenav/pic.png?imageView2/format/webp',
            name: '全部',
            target: '0'
          }
          res.data.data.unshift(json);
          that.setData({
            swiperArray: res.data.data
          });
        }
        my.hideToast();
      }
    });
  },
  // 体育赛程表
  schedule(leagueId){
    my.showToast({
      content: '加载中...',
      duration: 300000,
    });
    const that = this;
    my.httpRequest({
      url: 'http://sportsapi.longzhu.com/sportv2/EventNoticeListForIndex',
      data: {
        'leagueId': leagueId,
        'utm_sr': 'chanel_2',
        'version': '3.9.3',
        'packageId': '1',
        'device': '8'
      },
      success: (res) => {
        if (res.data.soon) {
          // let array = [];
          // res.data.soon.forEach((item) => {
          //   array.push(that.formatDate(item.start, 2));
          // });
          // let dateArray = Array.from(new Set(array));
          // let lastArray = [];
          // dateArray.forEach((ele) => {
          //   let itemArray = [];
          //   res.data.soon.forEach((item) => {
          //     if(ele === that.formatDate(item.start, 2)) {
          //       itemArray.push(item);
          //     }
          //   });
          //   lastArray.push(itemArray)
          // });
          res.data.soon.forEach((item) => {
            item.start = that.formatDate(item.start, 2);
          });
          that.setData({
            sportList: res.data.soon
          });
        }
        my.hideToast();
      }
    });
  },
  // 选择体育类型
  sportType(e) {
    let leagueId = e.target.dataset.target.target;
    this.setData({
      tab: e.target.dataset.index
    });
    this.schedule(leagueId);
  },
  // 时间转换
  formatDate(time, index) {
    let result = '';
    let t= parseInt(time.slice(6, 19));
    let dt = new Date(t);
    let year = dt.getFullYear();
    let month = dt.getMonth() + 1;
    let date = dt.getDate();
    let day=dt.getDay();
    switch (day) {
    case 0:
      day="日"; break;
    case 1:
      day="一"; break;
    case 2:
      day="二"; break;
    case 3:
      day="三"; break;
    case 4:
      day="四"; break;
    case 5:
      day="五"; break;
    default:
      day="六"; break;
    }
    let hour = dt.getHours() < 10 ? `0${dt.getHours()}` : dt.getHours();
    let minute = dt.getMinutes() < 10 ? `0${dt.getMinutes()}` : dt.getMinutes();
    if (index === 1) {
      result = hour + ":" + minute;
    } else {
      result = year + "年" + month + "月" + date + "日  周" + day + '  ' + hour + ":" + minute;
    }
    return result;
  }
});
