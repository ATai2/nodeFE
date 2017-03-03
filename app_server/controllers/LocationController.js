/**
 * Created by fupeng on 17/2/17.
 */
var request = require('request');
var locationModel = require('../models/LocationModel');
module.exports.getLocation = function (req,res){
    locationModel.getLocation(req,function(data){
        res.render("location",data);
    });
}

