require('./config$');

function success() {
require('../..//app');
require('../../pages/index/index');
require('../../pages/game/index');
require('../../pages/play/index');
require('../../pages/sport/index');
require('../../pages/list/index');
require('../../pages/video/index');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
