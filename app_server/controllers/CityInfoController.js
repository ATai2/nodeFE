/**
 * Created by fupeng on 17/2/23.
 */
var request = require('request');
var cityDao = require('../dao/CityDao');
var amap = require('../../common/utils/amap');

module.exports.getCityByPostion = function(req,res){
    var lat = req.body.lat;
    var long = req.body.long;
    amap.getCityAdcodeByPosition(lat,long,function(data){
        if(data.isSuccess){
            cityDao.getCity(data.citycode,function (city) {
                res.json({
                    status: 'success',
                    city:city
                });
            });
        }else{
            res.json({status: 'error',message: 'fail'});
        }
    })

};


module.exports.getCityByIP = function(req,res){

    amap.getCityAdcodeByIP(req,function(data){
        if(data.isSuccess){
             res.json(data);
        }else{
            res.json({status: 'errer',message: 'fail'});
        }
    })

};


