/**
 * Created by Administrator on 2017/2/13.
 */
var cinemaDao = require('../dao/CinameDao');


module.exports = {
    /**
     * 影吧菜单--影吧信息查询->反馈前台组装
     *      预定每次加载5条
     * @param req
     * @param res
     * http -- post -- ajax : framework --> my-app.js 滚动事件触发 加载
     * rout:cinema
     */
    getCinemaInfoLimitModel: function (req, callback) {
        var resultData = {};


        if (req.body.lastIndex == 0) {
            getConutAndPage(req, function (data) {
                if (data.isSuccess) {
                    total = data.total;
                    cinemaDao.getCinema(data, function (data) {
                        var cinemaInfo = [];
                        if (data.isSuccess) {
                            data.rows.forEach(function (val) {
                                cinemaInfo.push({
                                    cinema_code: val.cinema_code,
                                    cinemaName: val.cinema_name,
                                    cinemaAddress: val.cinema_site,
                                    cinema_picture: val.cinema_picture,
                                    distance: val.distance,
                                    score: val.score
                                });

                            });
                            callback({
                                message: 'success',
                                status: 'success',
                                total: total,
                                data: cinemaInfo
                            });
                        } else {
                            callback({
                                message: 'error',
                                status: 'error',
                                data: ''
                            });

                        }

                    })

                } else {
                    callback({
                        message: 'error',
                        status: 'error',
                        data: ''
                    });

                }
            })
        } else {
            cinemaDao.getCinema({
                citycode: req.body.citycode,
                cinema_name: req.body.cinema_name,
                lat: req.body.lat,
                long: req.body.long,
                lastIndex :parseInt(req.body.lastIndex)
            }, function (data) {
                var cinemaInfo = [];
                if (data.isSuccess) {
                    data.rows.forEach(function (val) {
                        cinemaInfo.push({
                            cinema_code: val.cinema_code,
                            cinemaName: val.cinema_name,
                            cinemaAddress: val.cinema_site,
                            cinema_picture: val.cinema_picture,
                            distance: val.distance,
                            score: val.score
                        });

                    });
                    callback({
                        message: 'success',
                        status: 'success',
                        data: cinemaInfo
                    });
                } else {
                    callback({
                        message: 'error',
                        status: 'error',
                        data: ''
                    });
                }
            })
        }
    }
}
    /**
     *  获得影吧总的加载次数 totalPage,默认 1
     * @param callBack
     */

    function getConutAndPage(req, callBack){
        cinemaDao.findCountByPage({
            citycode: req.body.citycode,
            cinema_name: req.body.cinema_name
        }, function (data) {
            if (data.isSuccess) {
                var _total = data.result[0].total;//总条数
                callBack({
                    isSuccess: true,
                    total: _total,
                    citycode: req.body.citycode,
                    cinema_name: req.body.cinema_name,
                    lastIndex :parseInt(req.body.lastIndex),
                    lat: req.body.lat,
                    long: req.body.long
                });
            } else {
                callBack({
                    isSuccess: false
                });
                console.log('数据库mtsc表cinema查询出错');
            }
        });
    }


