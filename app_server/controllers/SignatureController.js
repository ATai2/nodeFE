var config = require('../../config');
var wechat = require('wechat');
var uDataLogger = require('../../common/Logger/Logger');


module.exports.signatureWeixin = wechat(config.app, function (req, res, next) {
    console.log('1');
    var message = req.weixin;
    console.log(message);
    res.reply('hehe');
    next();
})
