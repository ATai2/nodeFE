/**
 * Created by fupeng on 17/2/23.
 */
var pool = require('./DBConnectPool');
var logger = require('../../common/Logger/Logger');

//根据citycode获取城市信息
module.exports.getCity= function (_param, callBack) {
    pool.getPoolConnection('mtsc', function (err, connection) {
        if (err) {
            console.log('get connection from pool failed in cinema_region: ', err);
            return;
        }
        var sql = 'select * from cinema_region where citycode = ?';
        connection.query(sql,[_param] ,function (queryErr, rows) {
            if (queryErr) {
                console.log('select * from cinema_region failed: ', err);
                callBack({
                    isSuccess: false
                });
            } else {
                callBack({
                    isSuccess: true,
                    rows: rows[0]
                })
            }
            connection.release();
        })
    })
};


