var toUTF8 = require('./ToUTF8');
var pool = require('./DBConnectPool');
var logger = require('../../common/Logger/Logger');

module.exports.setJsapiTicket = function (data, callBack) {
    pool.getPoolConnection('mtsc', function (err, connection) {
        if (err) {
            console.log('get connection from pool failed in setJsapiTicket: ', err);
            return;
        }
        var sql = 'REPLACE INTO gdas_wechat_jsapi_ticket (id, ticket, expires_in) values(1, "' + data.ticket + '", ' + data.expires_in + ')';

        connection.query(sql, function (queryErr, rows) {
            if (queryErr) {
                console.log('set ticket err: ', err);
                callBack({
                    isSuccess: false,
                    err: err
                });
            } else {
                // console.log('set ticket success: ', rows);
                callBack({
                    isSuccess: true
                });
                logger.info({
                    message: 'ticket update',
                    sql: sql
                });
            }
            connection.release();
        });
    })
};

module.exports.getJsapiTicket = function (callBack) {
    pool.getPoolConnection('mtsc', function (err, connection) {
        if (err) {
            console.log('Error: get connection from pool in getJsapiTicket: ', err);
            return;
        }
        connection.query('SELECT * FROM gdas_wechat_jsapi_ticket WHERE id = 1', toUTF8(function (queryErr, rows) {
            if (queryErr) {
                console.log('select ticket from gdas_wechat_jsapi_ticket failed: ', err);
                callBack({
                    isSuccess: false
                });
            } else {
                callBack({
                    isSuccess: true,
                    rows: rows
                })
            }
            connection.release();
        }))
    })
};