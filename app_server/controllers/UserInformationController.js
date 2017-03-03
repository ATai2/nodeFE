/**
 * Created by Administrator on 2017/2/8.
 */
var request = require('request');
var accessTokenController = require('./AccessTokenController');
var config = require('../../config');
//var accessTokenDao = require('../dao/AccessTokenDao');
var logger = require('../../common/Logger/Logger');
//var userInfoUrl = 'https://api.weixin.qq.com/cgi-bin/user/info?access_token='+accessTokenController.getAccessToken()+'&openid='+a+'&lang=zh_CN';
var userInfoUrl = '',
    openId = '';
/**
 * 用户登录公众号即获得openId
 *   from:  RequestLogger.js
 * @param openid
 */
exports.getOpenId = function(openid){
    this.openId = openid;
    userInfoUrl = 'https://api.weixin.qq.com/cgi-bin/user/info?access_token='+accessTokenController.getAccessToken()+'&openid='+this.openId+'&lang=zh_CN';
    getUserIofomation();
}
/**
 * 该方法预留作今后对 用户基本信息 后续操作处理
 */
function getUserIofomation(){
    request({
        url:userInfoUrl,
        method:'GET'
    },function(err , response , body){
        if(err){
            console.log('UserInfomation 获取访问用户的信息失败'/n);
            return;
        }
        console.log('获取访问用户信息成功'+body);

    } )
}