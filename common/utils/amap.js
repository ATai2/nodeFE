/**
 * Created by fupeng on 17/2/23.
 */
var request = require('request');

var AmapKey = "5a2d57532d4dc2d2a0ece6a942ffbbee"; // 填写申请的的ak
var rootUrl = 'http://restapi.amap.com/v3/geocode/regeo'; // 根URL
var ipUrl =  'http://restapi.amap.com/v3/ip';

module.exports.getCityAdcodeByPosition= function (lat,long,callback) {

    var url = rootUrl + '?key=' + AmapKey + '&location=' + long + ',' + lat + '&radius=0&extensions=base&batch=false';

    request.get(url, function (err, response, body) {
        try {
            var responseJson = JSON.parse(body);
            // 解析成功
            if (responseJson['status'] == 1) {
                // 如果返回正常解析数据
                var citycode = responseJson['regeocode']['addressComponent']['citycode']; // 提取城市code
                var adcode = responseJson['regeocode']['addressComponent']['adcode'];

                callback({
                    isSuccess: true,
                    citycode: citycode
                });


            } else {
                callback({
                    isSuccess: false
                });
                // 如果返回错误解析数据
                console.log("地理定位: Fail! " + responseJson['info']);
            }
        } catch (error) {
            // 解析失败
            console.log("地理定位: Error!" + error.stack);

        }
    })
};


module.exports.getCityAdcodeByIP = function (req,callback) {
    var ipAddress =  req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
    var url = ipUrl + '?key=' + AmapKey + '&ip='+ ipAddress;

    request.get(url, function (err, response, body) {
        try {
            var responseJson = JSON.parse(body);
            // 解析成功
            if (responseJson['status'] == 1) {
                // 如果返回正常解析数据
                var rectangle = responseJson['rectangle'];
                var location =  rectangle.split(',');
                var postion =  location[1].split(';');
                var long = (parseFloat(location[0])+parseFloat(postion[1]))/2;
                var lat = (parseFloat(location[2])+parseFloat(postion[0]))/2;
                callback({
                    isSuccess: true,
                    long: long,
                    lat:lat
                });


            } else {
                callback({
                    isSuccess: false
                });
                // 如果返回错误解析数据
                console.log("地理定位: Fail! " + responseJson['info']);
            }
        } catch (error) {
            // 解析失败
            console.log("地理定位: Error!" + error.stack);
            console.log(body); // 输出body以供参考
        }
    })

};