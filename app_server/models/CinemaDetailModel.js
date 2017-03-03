/**
 * Created by fupeng on 17/2/16.
 */
/**
 * Created by Administrator on 2017/2/13.
 */
var cinemaDetailDao = require('../dao/CinemaDetailDao');


module.exports = {

    /**
     * @param req
     * @param callback
     * http -- post -- ajax
     * rout:cinemaDetail
     */
    getCinemaDetailInfoModel: function (req,callback) {

        var cinema_code = req.query.cinema_code; //影吧id

        var resultData = {};//结果集

        cinemaDetailDao.getCinemaDetail( cinema_code , function(data) {

            if (data.isSuccess) {

                resultData = {
                    title:'影吧详情',
                    layout:false,
                    message: 'success',
                    status: 'success',
                    cinemaDetail: data.rows[0]
                };

            } else {

                resultData = {
                    layout: false,
                    message: 'fail',
                    status: 'fail'
                };

            }
            callback(resultData);
        });

    }

};


