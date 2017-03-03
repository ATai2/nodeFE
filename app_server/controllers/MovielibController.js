/**
 * Created by fupeng on 17/2/17.
 */
var request = require('request');
var movielibModel = require('../models/MovielibModel');
module.exports = {
    /**
     *
     * @param req
     * @param res
     */
    getMovielib: function (req, res) {
        movielibModel.getMovielibInfoModel(req, res);
    },
    /**
     * 获取 影吧相关的 影片 信息
     * @param res
     * @param res
     */
    getMovieLibInfo: function (req, res) {
        movielibModel.postMovielibInfoModel(req, res);
    },
    getMovieLibInfoByParam: function (req, res) {
        movielibModel.postMovieLibinfoModelByParam(req,res);
    }
}

