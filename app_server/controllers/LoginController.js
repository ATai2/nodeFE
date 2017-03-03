/**
 * Created by fupeng on 17/3/2.
 *
 * 日期：2017-3-3  by at
 * 描述：短信验证==》 1.注册页面，获得手机号，数据库查询是否存在  1）存在，ajax提醒已存在  2）不存在，插入数据库，插入验证码，过期时间10分钟，记录时间
 *                                                                  插入到数据库中  ---》主键  计算验证码
 *                      2. 表单提交，根据手机查询-------验证码过期，提示重新获得验证码   ；  插入数据跳转页面，注册成功
 *
 */
var captchapng = require('captchapng');
const req = require('request');
var dayu = require('alidayu-node');
var config = require('../../config');
var sms = new dayu(config.sms.appkey, config.sms.appsecret);
var user=require('UserModel');

function getSMSCode(){

    //随机验证码生成
    var random=new Random();
    var temp=random.next(0,10000);
    var code=temp.toString('0000');
   // 验证码入库




}

module.exports = {
    // 获得图片验证码
    getCode: function (req, res) {
        var width = 80;
        var height = 40;
        var code = parseInt(Math.random() * 9000 + 1000);
        // req.session.checkcode = code;

        var p = new captchapng(width, height, code);
        p.color(10, 10, 10, 10);
        p.color(80, 80, 80, 255);

        var img = p.getBase64();
        var imgbase64 = new Buffer(img, 'base64');
        res.writeHead(200, {
            'Content-Type': 'image/png'
        });
        res.end(imgbase64);
    },
    // 获得短信验证码
    getSMS: function (req, res) {
        var identifyingcode = req.body.identifyingcode;
        var phone = req.body.phone;

        //判断验证码是否相同     ====暂缓
        //发送手机短信
        console.log(identifyingcode);
        console.log(phone);
        // 短信验证码入库

        sms.smsSend({
            sms_free_sign_name: '测试短信验证码', //短信签名，参考这里 http://www.alidayu.com/admin/service/sign
            sms_param: JSON.stringify({"number": "123456"}),//短信变量，对应短信模板里面的变量
            rec_num: phone, //接收短信的手机号
            sms_template_code: 'SMS_51950002' //短信模板，参考这里 http://www.alidayu.com/admin/service/tpl
        }, function (error, response) {
            if (!error) {
                console.log(response);
                res.json({
                    title: 'fail'
                });
            }
            else {
                console.log(error);
                res.json({
                    title: 'success'
                });
            }
        });


    },
    // 验证手机是否已存在
    validPhone: function (req, res) {

        var identifyingcode = req.body.identifyingcode;
        var phone = req.body.phone;
        var sms=req.body.sms;

        //手机号是否存在
        user.selectByPhone(phone,function (users) {
            if(users){
                // 不存在手机号，继续；存在，提示
                res.json={
                    message: 'error',
                    status: 'fail',
                    data: ''
                }
                return;
            }

            var user=users[0];//存在对象  短信验证

            //mysql数据库转为js日期类型
            var datatime=new Date('yyyy-MM-dd hh-mm-ss');//
            if (datatime>user.createtime&&datetime<user.expiretime){
                //在短信有效期内
                user.register();
            }


        })
        // 1.判断短信验证码

        user.validSMS();

        // 2.
    }

}




