/**
 * Created by Administrator on 2017/2/14.
 */
var movieDao = require('../dao/MovieDao');
var resultData = {};

exports.getMovieInfoModel = function (req, res) {

    /**
     * 自定义菜单主页-----影片-----全查询
     */
    movieDao.getMovies(function (data) {
        var result = [];
        if (data.isSuccess) {

            data.result.forEach(function (val) {

                result.push({
                    movieId: val.mid,         //影片ID
                    movieName: val.movie_name,  //影片中文名称
                    director: val.director,   //导演
                    actors: val.cast,        //演员
                    category: val.category,   //影片类型(标签)
                    country: val.country,    //国家
                    score: val.score,       //评分
                    brief: val.brief        //影片简介
                });
            });

            resultData = {
                message: 'success',
                status: 'success',
                data: result
            }

            console.log(resultData);

        } else {

            resultData = {
                message: 'error',
                status: 'error',
                data: result
            }

            console.log('无影片查询结果或结果处理异常');

        }
    });

}
