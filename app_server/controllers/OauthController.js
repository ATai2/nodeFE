var config = require('../../config');
var oauthDao = require('../dao/OauthDao');
var OAuth = require('wechat-oauth');
var logger = require('../../common/Logger/Logger');

//全局维护AccessToken
var client = new OAuth(config.app.appid, config.app.appsecret, function (openid, callback) {
    // 传入一个根据openid获取对应的全局token的方法
    // 在getUser时会通过该方法来获取token
    oauthDao.getOauth(openid, function (message,result) {
        console.log('save access token to database success.');
        return callback(null, result);
    });
}, function (openid, token, callback) {
    // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
    // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
    // 持久化时请注意，每个openid都对应一个唯一的token!
    oauthDao.setOauth(openid,token, function (message) {
        console.log('save access token to database success.');
        return callback(message);
    });
});

module.exports.getOauth = function (req, res) {

    client.getAccessToken(req.query.code, function (err, result) {
        var accessToken = result.data.access_token;
        var openid = result.data.openid;
    });
};

//获取userinfo
module.exports.getUserInfo = function (req, res) {
    client.getAccessToken(req.query.code, function (err, result) {
        var accessToken = result.data.access_token;
        var openid = result.data.openid;
        client.getUser(openid, function (err, result) {
            var userInfo = result;
            console.log(userInfo);
        });
    });

};

