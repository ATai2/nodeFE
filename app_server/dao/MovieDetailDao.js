/**
 * Created by Administrator on 2017/2/25.
 */
var pool = require('./dbConnectPool');

module.exports = {
    getMovieInfo:function(mid,callBack){
        pool.getPoolConnection('mtsc', function (err, connection) {
            if (err) {
                console.log('Error: get connection from pool in getMovieInfo: ', err);
                return;
            }

            var sql = 'SELECT movie.mid,movie.movie_name,movie.filmlength,movie.score,movie.category,movie.publishdate,movie.director,movie.country,movie.cast,movie.brief,movie.movie_bigpic ' +
                'from movie '+
                'where movie.isdeleted != 1 and movie.mid = ? ';

            connection.query(sql, [mid], function (queryErr, rows) {
                if (queryErr) {
                    console.log('影吧片库 影片查询 失败', err);

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
        });
    }
};