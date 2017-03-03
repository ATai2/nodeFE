/**
 * Created by Administrator on 2017/2/14.
 */
var toUTF8 = require('./ToUTF8');
var pool = require('./DBConnectPool');
var logger = require('../../common/Logger/Logger');
/**
 * 影片全查询
 * @param callback
 */
module.exports.getMovies = function (callBack) {

  pool.getPoolConnection('mtsc', function (err, connection) {

    if (err) {
      console.log('get connection from pool failed in getMovies: ', err);
      return;
    }

    var sql = 'SELECT m.* FROM movie as m';

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