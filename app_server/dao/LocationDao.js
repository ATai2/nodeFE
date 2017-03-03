/**
 * Created by fupeng on 17/2/16.
 */
var pool = require('./DBConnectPool');
var logger = require('../../common/Logger/Logger');


module.exports = {
    getAllCity : function(callBack) {
        pool.getPoolConnection('mtsc', function (err, connection) {
            if (err) {
                console.log('Error: get connection from pool in getCity: ', err);
                return;
            }

            var sql = "SELECT *,UPPER(left(`enname`,1)) AS py FROM cinema_region WHERE pid = 1 ORDER BY py";

            connection.query(sql ,function (queryErr, rows) {
                if (queryErr) {
                    console.log('select city from cinema_region failed: ', err);
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
    },
    getHotCity : function(callBack) {
        pool.getPoolConnection('mtsc', function (err, connection) {
            if (err) {
                console.log('Error: get connection from pool in getCity: ', err);
                return;
            }

            var sql = "SELECT * from cinema_region where pid =1 and hot_flag = 1 ";

            connection.query(sql ,function (queryErr, rows) {
                if (queryErr) {
                    console.log('select city from cinema_region failed: ', err);
                    callBack({
                        isSuccess: false
                    });
                } else {
                    callBack({
                        isSuccess: true,
                        hotCity: rows
                    })
                }
                connection.release();
            })
        })
    }
};
