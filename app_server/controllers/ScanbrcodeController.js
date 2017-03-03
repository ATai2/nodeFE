var config = require('../../config');
var uDataLogger = require('../../common/Logger/Logger');


module.exports.renderScanbrcodePage = function (req, res) {

    res.render('scanbrcode', {
        title: '公告',
        notices: 'a'
    });
};
