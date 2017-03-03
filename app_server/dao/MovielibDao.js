/**
 * Created by fupeng on 17/2/16.
 */
var pool = require('./dbConnectPool');
var logger = require('../../common/Logger/Logger');


module.exports = {
    getMovieInfo: function (param, _param_page, callBack) {
        pool.getPoolConnection('mtsc', function (err, connection) {
            if (err) {
                console.log('Error: get connection from pool in getMovieInfo: ', err);
                return;
            }


            var sql = 'SELECT movie.mid,movie.movie_name,movie.director,movie.brief,movie.cast,movie.score,movie.country,movie.category,date_format(movie.publishdate, "%Y") as publishdate,movie.movie_bigpic ' +
                'from ((movie INNER JOIN movie_package_detail on movie.mid = movie_package_detail.mid) ' +
                'INNER JOIN movie_package on movie_package.pkg_id = movie_package_detail.pkg_id ) ' +
                'INNER JOIN contract on contract.contract_code = movie_package.contract_code ' +
                'where contract.cinema_code = ? and movie.isdeleted != 1   LIMIT ?,10';

            connection.query(sql, [param,_param_page*10], function (queryErr, rows) {
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
    },
    /**
     * 影吧片库--影片搜索
     * @param Param
     * @param callBack
     */
    getMovieInfoByParam: function (param,_param_page, callBack) {
        pool.getPoolConnection('mtsc', function (err, connection) {
            if (err) {

                console.log('Error: get connection from pool in getMovieInfoByParam: ', err);
                return;
            }
            var sql = 'SELECT movie.mid,movie.movie_name,movie.director,movie.brief,movie.cast,movie.score,movie.country,movie.category,date_format(movie.publishdate, "%Y") as publishdate,movie.movie_bigpic ' +
                'from ' +
                '((movie INNER JOIN movie_package_detail on movie.mid = movie_package_detail.mid) ' +
                'INNER JOIN movie_package on movie_package.pkg_id = movie_package_detail.pkg_id ) ' +
                'INNER JOIN contract on contract.contract_code = movie_package.contract_code ' +
                'where contract.cinema_code = '+param.cinemaCode+param.category+param.country+param.publishdate+'and movie.isdeleted != 1 '+param.sort+' LIMIT ?,10 ';


            connection.query(sql, [_param_page*10], function (queryErr, rows) {

                if (queryErr) {

                    console.log('搜索影吧片库有误: ', err);

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
    },
    /**
     * 查询加载次数(页数)
     * @param cinemaCode
     * @param callBack
     */
    findCountByPage: function (cinemaCode, callBack) {
        pool.getPoolConnection('mtsc', function (err, connection) {

            if (err) {
                console.log('get connection from pool failed in findCountByPage --> movie: ', err);
                return;
            }
            var sql = 'SELECT COUNT(*) as count from (((movie INNER JOIN movie_package_detail on movie.mid = movie_package_detail.mid) INNER JOIN movie_package on movie_package.pkg_id = movie_package_detail.pkg_id )INNER JOIN contract on contract.contract_code = movie_package.contract_code) INNER JOIN cinema on contract.cinema_code = cinema.cinema_code where cinema.cinema_code = ? ';
            connection.query(sql, [cinemaCode], function (queryErr, rows) {
                if (queryErr) {
                    console.log('select * from app_cinema failed: ', err);
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
            });
        });
    }

};