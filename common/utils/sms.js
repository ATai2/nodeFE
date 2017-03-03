var config = require('../../config');
var dayu = require('alidayu-node');


var sms = new dayu(config.sms.appkey, config.sms.appsecret);

//
// // var sms = new App(config.sms.appkey, config.sms.appsecret);
// var sms=new AliDaYu(config.sms.appkey,config.sms.appsecret);




sms.smsSend({
    sms_free_sign_name: '测试短信验证码', //短信签名，参考这里 http://www.alidayu.com/admin/service/sign
    sms_param: JSON.stringify({"number": "123456"}),//短信变量，对应短信模板里面的变量
    rec_num: '17602107205', //接收短信的手机号
    sms_template_code: 'SMS_51950002' //短信模板，参考这里 http://www.alidayu.com/admin/service/tpl
},function (error, response) {
    if (!error) console.log(response);
    else console.log(error);
});
