/**
 * Created by fupeng on 17/3/2.
 */
var request = require('request');

module.exports.getMemberHome = function (req,res){
    res.render('memberhome',{
        title:'会员',
        layout:false
    })
};
module.exports.getMember = function (req,res){
    res.render('member',{
        title:'会员',
        layout:false
    })
};
module.exports.getLogin = function (req,res){
    res.render('login',{
        title:'会员',
        layout:false
    })
}
