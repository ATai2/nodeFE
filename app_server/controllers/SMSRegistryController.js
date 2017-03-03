var config = require('../../config');
var OAuth = require('wechat-oauth');
var jsapiTicketController = require('./JsapiTicketController');
var sign = require('../../common/utils/sign.js');
var logger = require('../../common/Logger/Logger');

var config = require('../../config');
var dayu = require('alidayu-node');





var sms = new dayu(config.sms.appkey, config.sms.appsecret);


module.exports = {
    getView: function (req, res) {
        res.render('register', {
            title: '注册'
        });


    },

    sendSMS: function (tele,str) {
        //获得手机号
        //生成验证码，加入到数据库中，发送短信
        sms.smsSend({
            sms_free_sign_name: '测试短信验证码', //短信签名，参考这里 http://www.alidayu.com/admin/service/sign
            sms_param: JSON.stringify({"number": str}),//短信变量，对应短信模板里面的变量
            rec_num:tele, //接收短信的手机号
            sms_template_code: 'SMS_51950002' //短信模板，参考这里 http://www.alidayu.com/admin/service/tpl
        }, function (error, response) {
            if (!error) console.log(response);
            else console.log(error);
        });
    }

}


function creatCode() {

}


