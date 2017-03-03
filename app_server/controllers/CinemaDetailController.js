/**
 * Created by fupeng on 17/2/16.
 */
var request = require('request');
var cinemaDetailModel = require('../models/CinemaDetailModel');
module.exports.getCinemaDetail = function (req,res){
    cinemaDetailModel.getCinemaDetailInfoModel(req,function(data){
        res.render('cinemadetail', data);
    });
};

