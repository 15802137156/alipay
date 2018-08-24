App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    // console.info('App onLaunch', options);
    // my.getAuthCode({
    //   scopes: 'auth_user',
    //   success: (res) => {
    //     my.alert({
    //     content: res.authCode,
    //   });
    //   },
    // });
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
});
