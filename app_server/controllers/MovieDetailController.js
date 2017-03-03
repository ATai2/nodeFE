/**
 * Created by Administrator on 2017/2/25.
 */

var movieDetailModel = require('../models/MovieDetailModel');

module.exports = {
    getMovieDetailModel: function (req, res) {
        movieDetailModel.getMovieDetailInfoModel(req, res);
    }
};