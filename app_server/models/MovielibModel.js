/**
 * Created by fupeng on 17/2/17.
 */

var movielibDao = require('../dao/MovielibDao');

var resultData = {};
var cinema_code = '';
module.exports = {

    /**
     * 影吧 --> 影吧详情 --> 影吧片库
     * @param req
     * @param res
     * http -- get :framework7 a标签跳转
     * rout:movielib
     */
    getMovielibInfoModel: function (req, res) {

        cinema_code = '';

        cinema_code = req.query.cinema_code; //影吧id
        var _param_pageSize = '0';      //当前页
        var _totalPage = '1';          //总页数
        getConutAndPage(_param_pageSize, cinema_code, function (data) {

            if (data.isSuccess) {
                _totalPage = data.totalPage;
            }

            //根据_param_pageSize查询影吧
            movielibDao.getMovieInfo(cinema_code, _param_pageSize, function (data) {

                var movieInfo = [];

                if (data.isSuccess) {

                    if (data.rows.length > 0) {

                        data.rows.forEach(function (val) {

                            movieInfo.push({
                                mid: val.mid,                       //影片编号
                                movie_name: val.movie_name,         //影片名字
                                director: val.director,              //导演
                                brief: val.brief,                    //详情介绍
                                cast: val.cast,                    //演员
                                score: val.score,                    //评分
                                country: val.country,                //地区
                                category: val.category,               //类型-标签
                                publishdate: val.publishdate,        //影片-年
                                movie_bigpic: val.movie_bigpic
                            });

                        });

                        resultData = {
                            message: 'success',
                            status: 'success',
                            param_pageSize: (parseInt(_param_pageSize) + 1),
                            totalPage: _totalPage,
                            data: movieInfo
                        };

                        res.render('movielib', {
                            title: '影吧片库',
                            layout: false,
                            data: resultData
                        });

                    } else {

                        resultData = {
                            message: 'error',
                            status: 'fail',
                            param_pageSize: (parseInt(_param_pageSize) + 1),
                            totalPage: _totalPage,
                            data: '该影吧没有影片 >.<'
                        };

                        res.render('movielib', {
                            title: '影吧片库',
                            layout: false,
                            data: resultData
                        });
                    }


                } else {

                    resultData = {
                        message: 'error',
                        status: 'error',
                        data: ''
                    };

                    res.render('movielib', {
                        layout: false,
                        data: resultData
                    });

                }

            });
        });

    },
    /**
     * 影吧片库 影片具体信息加载
     * @param req
     * @param res
     * http -- post -- ajax : framework --> my-app.js 滚动事件触发
     * rout:movielib
     */
    postMovielibInfoModel: function (req, res) {

        resultData = {};
        var _param_pageSize = req.body.param_pageSize; //当前页

        //根据_param_pageSize查询影吧
        movielibDao.getMovieInfo(cinema_code, _param_pageSize, function (data) {

            var movieInfo = [];
            if (data.isSuccess) {
                data.rows.forEach(function (val) {

                    movieInfo.push({
                        mid: val.mid,                       //影片编号
                        movie_name: val.movie_name,         //影片名字
                        director: val.director,              //导演
                        brief: val.brief,                    //详情介绍
                        cast: val.cast,                    //演员
                        score: val.score,                    //评分
                        country: val.country,                //地区
                        category: val.category,               //类型-标签
                        publishdate: val.publishdate,        //影片-年
                        movie_bigpic: val.movie_bigpic
                    });

                });

                resultData = {
                    title: '影吧片库',
                    message: 'success',
                    status: 'success',
                    param_pageSize: (_param_pageSize + 1),
                    data: movieInfo
                };

                res.json(resultData);

            } else {

                resultData = {
                    message: 'error',
                    status: 'error',
                    data: ''
                };

                res.json(resultData);
            }

        })

    },
    /**
     * 影吧片库--搜索影片
     * @param req
     * @param res
     * http -- post -- ajax : framework --> my-app.js 搜索按钮
     * rout:movielibbyparam
     */
    postMovieLibinfoModelByParam: function (req, res) {
        resultData = {};
        var _param_pageSize = req.body.param_pageSize; //当前页

        //根据_param_pageSize查询影吧
        movielibDao.getMovieInfoByParam(cinema_code, _param_pageSize, function (data) {

            var movieInfo = [];
            if (data.isSuccess) {
                data.rows.forEach(function (val) {

                    movieInfo.push({
                        mid: val.mid,                       //影片编号
                        movie_name: val.movie_name,         //影片名字
                        director: val.director,              //导演
                        brief: val.brief,                    //详情介绍
                        cast: val.cast,                    //演员
                        score: val.score,                    //评分
                        country: val.country,                //地区
                        category: val.category,              //类型-标签
                        publishdate: val.publishdate,        //影片-年
                        movie_bigpic: val.movie_bigpic
                    });

                });

                resultData = {
                    title: '影吧片库',
                    message: 'success',
                    status: 'success',
                    param_pageSize: (_param_pageSize + 1),
                    data: movieInfo
                };

                res.json(resultData);

            } else {

                resultData = {
                    message: 'error',
                    status: 'error',
                    data: ''
                };

                res.json(resultData);
            }

        })
    }
};

/**
 *  获得影吧总的加载次数 totalPage,默认 1
 * @param callBack
 */
function getConutAndPage(_param_pageSize, _cinemaCode, callBack) {

    //每次加载数量
    var pageSize = 10;
    if ('0' === _param_pageSize) {

        //获得数据总条数
        movielibDao.findCountByPage(_cinemaCode, function (data) {

            if (data.isSuccess) {
                var _total_count = data.rows[0].count;//总条数
                var totalPage = Math.floor(_total_count % pageSize > 0 ? (_total_count / pageSize + 1) : (_total_count / pageSize));//加载次数总和
                callBack({
                    isSuccess: true,
                    totalPage: totalPage
                });
            } else {
                callBack({
                    isSuccess: false
                });
                console.log('数据库mtsc表movie查询出错');
            }

        });

    } else {

        callBack({
            isSuccess: false,
            totalPage: 1
        });

    }
}
/**
 * 测试用
 */
// var param = {};
// var cinemaCode = '"JTLYB" ';
// var page = 0;
// var sort = ' order by ' + 'movie.publishdate ';
// var category = 'and movie.category like "%' + '喜剧' + '%" ';
// var country = 'and movie.country like "%' + '中国大陆' + '%" ';
// var publishdate = parseInt('2015');
// var _publishdate = '';
//
// if (publishdate >= 2011) {
//     _publishdate = 'and DATE_FORMAT(movie.publishdate,"%Y") = ' + publishdate + ' ';
// }
// if (publishdate < 2011 && publishdate >= 2000) {
//     _publishdate = 'and DATE_FORMAT(movie.publishdate,"%Y") BETWEEN 2000 and 2010 ';
// }
// if (publishdate < 2000 && publishdate >= 1990) {
//     _publishdate = 'and DATE_FORMAT(movie.publishdate,"%Y") BETWEEN 1990 and 2000 ';
// }
// if(publishdate <1990 && publishdate >= 1980 ){
//     _publishdate = 'and DATE_FORMAT(movie.publishdate,"%Y") BETWEEN 1980 and 1990 ';
// }
// if(publishdate < 1980){
//     _publishdate = 'and DATE_FORMAT(movie.publishdate,"%Y") < 1980 ';
// }
// param = {
//     "cinemaCode": cinemaCode,
//     "page": page,
//     "sort": sort,
//     "category": category,
//     "country": country,
//     "publishdate": _publishdate
// };
// movielibDao.getMovieInfoByParam(param, page, function (data) {
//
//     var movieInfo = [];
//     if (data.isSuccess) {
//         data.rows.forEach(function (val) {
//
//             movieInfo.push({
//                 mid: val.mid,                          //影片编号
//                 movie_name: val.movie_name,         //影片名字
//                 director: val.director,              //导演
//                 brief: val.brief,                    //详情介绍
//                 cast: val.cast,                      //演员
//                 score: val.score,                    //评分
//                 country: val.country,                //地区
//                 category: val.category,              //类型-标签
//                 publishdate: val.publishdate,          //影片-年
//                 movie_bigpic: val.movie_bigpic
//             });
//
//         });
//
//         resultData = {
//             title: '影吧片库',
//             message: 'success',
//             status: 'success',
//             // param_pageSize: (_param_pageSize+1),
//             data: movieInfo
//         };
//         console.log(resultData);
//         // res.json(resultData);
//
//     } else {
//
//         resultData = {
//             message: 'error',
//             status: 'error',
//             data: ''
//         };
//
//         // res.json(resultData);
//     }
//
// });