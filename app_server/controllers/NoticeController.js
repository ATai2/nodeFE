var config = require('../../config');
var noticeDao = require('../dao/NoticeDao');
var uDataLogger = require('../../common/Logger/Logger');
var OAuth = require('wechat-oauth');
var jsapiTicketController = require('./JsapiTicketController');
var sign = require('../../common/utils/sign.js');
var client = new OAuth(config.app.appid, config.app.appsecret);

var queryNotice = function (callback, req) {
    noticeDao.getNoticeList(function (data) {
        if(data.isSuccess){
            callback(data.notices);
        }else{
            console.log('Err: query notice from notice dao: ', data.err);
        }
    });
};

module.exports.renderNoticePage = function (req, res) {
    queryNotice(function (notices) {
        res.render('cinema', {
            title: '测试'
        });
    }, req);
};

var queryConfig = function (callback, req) {
    var url = req.protocol + '://' + req.host + req.originalUrl; //获取当前url
    var ret = sign(jsapiTicketController.getJsapiTicket(), url);
    console.log(ret);
    callback(ret);
};

module.exports.setConfig = function (req, res) {
    client.getAccessToken(req.query.code, function (err, result) {
        if(err){
            res.render('error');
        }else{
            //var accessToken = result.data.access_token;
            var openid = result.data.openid;
            if(openid ==null){
                res.render('error');
            }
            queryConfig(function (ret) {
                res.render('cinema', {
                    title: '影吧',
                    sign_pkg: ret.jsapi_ticket,
                    appId: config.app.appid,
                    timestamp: ret.timestamp,
                    nonceStr: ret.nonceStr,
                    signature: ret.signature,
                    open_id: openid
                });
            }, req);
        }

    });
};

module.exports.queryNotice = queryNotice;