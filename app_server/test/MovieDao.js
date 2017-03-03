/**
 * Created by Administrator on 2017/2/14.
 */

var movieDao = require('./MovieDao');
var pool = require('../dao/DBConnectPool');
/**
 * 影片全查询
 * @param callback
 */
module.exports.getMovies = function (param,callBack) {

    pool.getPoolConnection('mtsc', function (err, connection) {

        if (err) {
            console.log('get connection from pool failed in getMovies: ', err);
            return;
        }

        var sql = 'SELECT m.* FROM movie as m  where m.mid like "%'+param+'%"';

        connection.query(sql, function (queryErr, result) {

            if (queryErr) {
                console.log('database query error: ', err);
                callBack({
                    isSuccess: false
                });
            } else {
                callBack({
                    isSuccess: true,
                    result: result
                })
            }

            connection.release();
        });

    });

};
var movieMid = '5150132000';


movieDao.getMovies(movieMid,function(data){
    if(data.isSuccess){
        console.log(data.result);
    }
});