var config = require('../../config');
var accessTokenController = require('./AccessTokenController');
var request = require('request');

module.exports.customMenu = function (callback, req) {
    var accessToken = accessTokenController.getAccessToken();
    console.log('\n\naccessToken    '+accessToken + '\n\n');
    // console.log('ready to customMenu, accessToken is : ' + accessToken);
    request({
        url: 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=' + accessToken,
        method: 'POST',
        json: {
            "button": [
                {
                    "type": "view",
                    "name": "点播",
                    "url": "http://www.baidu.com"
                },
                {
                    "type": "view",
                    "name": "详情",
                    "sub_button": [
                        {
                            "type": "view",
                            "name": "点播影院",
                            "url": "http://www.baidu.com"
                        },
                        {
                            "type": "view",
                            "name": "影片",
                            "url": "http://www.baidu.com"
                        }
                    ]
                },
                {
                    "type": "view",
                    "name": "我",
                    "sub_button": [
                        {
                            "type": "view",
                            "name": "我的信息",
                            "url": "http://fj16693652.iok.la/memberhome"
                        },
                        {
                            "type": "view",
                            "name": "联系客服",
                            "url": "http://fj16693652.iok.la/memberhome"
                        }
                    ]
                }
            ]
        }
    }, function (err, response, body) {
        if (err) {
            console.log('customMenu 请求失败');
            return;
        }
        console.log('customMenu 请求成功： ', body);
        callback();
    })
};