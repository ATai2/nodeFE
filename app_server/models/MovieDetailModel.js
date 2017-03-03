/**
 * Created by Administrator on 2017/2/25.
 */

var movieDetailDao = require('../dao/MovieDetailDao');


var resultData = {};
var mid = '';
module.exports = {
    /**
     * 影吧片库 --> 影片详情
     * @param req
     * @param res
     * http -- get :framework7 a标签
     */
    getMovieDetailInfoModel: function (req, res) {

        mid = '';
        mid = req.query.mid;
        console.log(req.query.mid);

        movieDetailDao.getMovieInfo(mid,function(data){

            var movieInfo = [];

            if(data.isSuccess){
                if(data.rows.length > 0 ){
                    data.rows.forEach(function(val){
                        var filmTime = (Math.floor(val.filmlength/60)+'小时')+(val.filmlength%60+'分');
                        movieInfo.push({
                            mid:val.mid,
                            movie_name:val.movie_name,
                            filmlength:filmTime,
                            score:val.score,
                            category:val.category,
                            publishdate:val.publishdate.format('yyyy-mm-dd'),
                            director:val.director,
                            country:val.country,
                            cast:val.cast,
                            brief:val.brief,
                            movie_bigpic:val.movie_bigpic
                        });
                    });
                    resultData = {
                        message: 'success',
                        status: 'success',
                        data:movieInfo
                    };
                    res.render('moviedetail',{
                        layout:false,
                        data:resultData
                    });
                }
            }

            if(!data.isSuccess){
                resultData = {
                    message: 'error',
                    status: 'error',
                    data: ''
                };

                res.render('moviedetail', {
                    layout: false,
                    data: resultData
                });
            }
        });
    }
};