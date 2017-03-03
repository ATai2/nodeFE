
var locationDao = require('../dao/LocationDao');


module.exports.getLocation= function (req,callback){

    locationDao.getAllCity(function(data){
        if(data.isSuccess){
            var allCity=new Array();
            var index;
            var city;
            var hotCity = new Array() ;
            data.rows.forEach(
                function(val) {
                    if(index  !== val.py){
                        index = val.py;
                        city = new Array();
                        allCity.push({
                            'index':index,
                            'city':city
                        })
                    }
                    if(val.hot_flag == 1){
                        hotCity.push(val)
                    }
                    city.push(val);
                } );
            callback({
                status:"success",
                message:"success",
                allCity:allCity,
                hotCity:hotCity
            })
        }
    });


}