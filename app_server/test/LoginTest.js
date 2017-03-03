/**
 * Created by Administrator on 2017/3/3.
 */
var bll=require('../models/UserModel');
bll.selectByPhone('17602107205',function (users) {
    console.log(users[0].phone);
});