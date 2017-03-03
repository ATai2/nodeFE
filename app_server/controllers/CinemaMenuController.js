var config = require('../../config');
var OAuth = require('wechat-oauth');
var jsapiTicketController = require('./JsapiTicketController');
var sign = require('../../common/utils/sign.js');
var cinemaMenuModel = require('../models/CinemaMenuModel');
var client = new OAuth(config.app.appid, config.app.appsecret);



var queryConfig = function (callback, req) {
    var url = req.protocol + '://' + req.host + req.originalUrl; //获取当前url
    var ret = sign(jsapiTicketController.getJsapiTicket(), url);
    console.log(ret);
    callback(ret);
};

module.exports = {

    /**
     * 自定菜单---影吧
     */
    getCinema: function (req, res) {
        queryConfig(function (ret) {
            res.render('cinema', {
                title: '点播影院',
                layout:'layout',
                sign_pkg: ret.jsapi_ticket,
                appId: config.app.appid,
                timestamp: ret.timestamp,
                nonceStr: ret.nonceStr,
                signature: ret.signature,
                open_id: '11',
                ios: req.ua.os === 'iOS'
            });
        }, req);
    },
//影吧页面---获取影吧信息
    getCinemaInfo: function (req, res) {
        cinemaMenuModel.getCinemaInfoLimitModel(req, function(data){
            res.json(data);
        });
    }
    // ,
    // getHome:function (req,res) {
    //     queryConfig(function (ret) {
    //         res.render('home', {
    //             title: '影吧',
    //             layout:false,
    //             sign_pkg: ret.jsapi_ticket,
    //             appId: config.app.appid,
    //             timestamp: ret.timestamp,
    //             nonceStr: ret.nonceStr,
    //             signature: ret.signature,
    //             open_id: '11'
    //         });
    //     }, req);
    // }


};
