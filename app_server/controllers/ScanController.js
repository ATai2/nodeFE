var config = require('../../config');
var OAuth = require('wechat-oauth');
var jsapiTicketController = require('./JsapiTicketController');
var sign = require('../../common/utils/sign.js');
var logger = require('../../common/Logger/Logger');

var wechatAPI = require('wechat-api');
var api = new wechatAPI(config.app.appid, config.app.appsecret);

var client = new OAuth(config.app.appid, config.app.appsecret);

var queryConfig = function (callback, req) {
    var url = req.protocol + '://' + req.host + req.originalUrl; //获取当前url
    var ret = sign(jsapiTicketController.getJsapiTicket(), url);
    console.log(ret);
    callback(ret);
};

module.exports.setConfig = function (req, res) {
    client.getAccessToken(req.query.code, function (err, result) {
        if(err){
            res.render('error',{
                title: 'error',
                layout: 'index'});
        }else{
            //var accessToken = result.data.access_token;
            var openid = result.data.openid;
            if(openid ==null){
                res.render('error',{
                    title: 'error',
                    layout: 'index'});
            }
            queryConfig(function (ret) {
                res.render('scan', {
                    title: '请扫码绑定影厅',
                    layout: 'index',
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

module.exports.sendTextMsg = function (req, res) {
    var myurl = req.body.myurl;
    var open_id = req.body.open_id;
    var networktype = req.body.networktype;
    if(networktype!='1'){
        res.send({error: '1',message: '必须使用影吧WIFI连接！'});
    }else{
        var textMsg = '******** 快捷服务 ********\r\n\r\n- 快捷点播请戳 <a href=\"'+ myurl+'&openid=' + open_id+ '\">打开遥控器</a>\r\n\r\n';
        api.sendText(open_id,textMsg ,function (err, result) {
            if (err) {
                res.send({error: '1',message: 'fail'});
            } else {
                res.send({error: '0',message: 'success'});
            }
        });
    }

};
