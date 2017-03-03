/**
 * Created by fupeng on 17/2/16.
 */
var pool = require('./DBConnectPool');
var logger = require('../../common/Logger/Logger');


module.exports.getCinemaDetail = function (_param,callBack) {

    pool.getPoolConnection('mtsc', function (err, connection) {

        if (err) {
            console.log('Error: get connection from pool in CineamDetail: ', err);
            return;
        }

        var sql = 'SELECT * FROM cinema where cinema_code = ? ';

        connection.query(sql,[_param] ,function (queryErr, rows) {
            if (queryErr) {

                console.log('select * from cinema failed: ', err);

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

        })
    })
};
