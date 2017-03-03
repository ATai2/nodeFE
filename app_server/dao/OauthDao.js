var toUTF8 = require('./ToUTF8');
var pool = require('./DBConnectPool');
var logger = require('../../common/Logger/Logger');


module.exports.getOauth = function (openid, callback) {
    pool.getPoolConnection('mtsc', function (err, connection) {
        if (err) {
            console.log('get connection from pool failed in getOauth: ', err);
            return;
        }
        var sql = 'SELECT * FROM gdas_wechat_oauth_token WHERE openid = ?';
        connection.query(sql, [openid], toUTF8(function (queryErr, result) {
            if (queryErr) {
                console.log('database query error: ', err);
                callback(err);
            } else {
                callback(null, result[0]);
            }
            connection.release();
        }));
    });

};

module.exports.setOauth = function (openid, token, callback) {
    pool.getPoolConnection('mtsc', function (err, connection) {
        if (err) {
            console.log('get connection from pool failed in setOauth: ', err);
            return;
        }
        var sql = 'REPLACE INTO gdas_wechat_oauth_token(access_token, expires_in, refresh_token, openid, scope, create_at) VALUES(?, ?, ?, ?, ?, ?)';
        var fields = [token.access_token, token.expires_in, token.refresh_token, token.openid, token.scope, token.create_at];
        connection.query(sql, fields, toUTF8(function (queryErr, result) {
            callback(err);
            connection.release();
        }));
    });

};