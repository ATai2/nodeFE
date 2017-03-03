var request = require('request');
var jsapiTicketDao = require('../dao/JsapiTicketDao');
var logger = require('../../common/Logger/Logger');
var jsapiTicket = '';

module.exports.getJsapiTicket = function () {
    return jsapiTicket;
};

var queryJsapiTicketFromWechat = function (accessToken) {
    var jsapiTicketUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + accessToken + '&type=jsapi';
    request({
        url: jsapiTicketUrl,
        method: 'GET'
    }, function (err, response, body) {
        body = JSON.parse(body);
        if (err) {
            logger.log('从微信服务器请求JsapiTicket失败: ', err);
            return;
        }
        jsapiTicket = body.ticket;
        console.log('JsapiTicket更新: ' + jsapiTicket);
        saveJsapiTicket(body);
    })
};

var queryJsapiTicketFromDatabase = function (accessToken) {
    jsapiTicketDao.getJsapiTicket(function (data) {
        if (data.isSuccess) {
            if (expired(data.rows)) {
                queryJsapiTicketFromWechat(accessToken);
            } else {
                jsapiTicket = data.rows[0].ticket;
                console.log('\nJsapiTicket init from database: ' + jsapiTicket + '\n\n');
            }
        } else {
            console.log('从数据库请求JsapiTicket失败: ', err);
        }
    });
};

var expired = function (rows) {
    // return true;

    if (rows.length == 0) {
        //此时数据库还没有存jsapiTicket，所以判断为失效
        return true;
    } else {
        var timeRemaining = rows[0].expires_in - Date.now();
        console.log('\n距离JsapiTicket过期还有：' + timeRemaining + '毫秒');
        //如果数据库存的到期时间距离现在已经少于10分钟，则判断为失效
        return rows[0].expires_in - Date.now() < 600000;
    }
};

var saveJsapiTicket = function (data) {
    jsapiTicketDao.setJsapiTicket({
        ticket: data.ticket,
        expires_in: data.expires_in * 1000 + Date.now()
    }, function (message) {
        if (message.isSuccess) {
            console.log('save JsapiTicket to database success.');
        } else {
            console.log('save JsapiTicket to database failed: ', message.err);
        }
    });
};

var initJsapiTicket = function (accessToken) {
    queryJsapiTicketFromDatabase(accessToken);
};

module.exports.initJsapiTicket = initJsapiTicket;
module.exports.queryJsapiTicketFromWechat = queryJsapiTicketFromWechat;

