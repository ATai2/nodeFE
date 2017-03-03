/**
 * Created by Administrator on 2017/2/13.
 */
var wechat = require('wechat');
var request = require('request');
var config = require('../../config');
module.exports.signature = wechat(config.app, function (message, req, res) {

});

/*!
 * 生成随机字符串
 */
var createNonceStr = function () {
  return Math.random().toString(36).substr(2, 15);
};

/*!
 * 生成时间戳
 */
var createTimestamp = function () {
  return parseInt(new Date().getTime() / 1000, 0) + '';
};
/*!
 * 排序查询字符串
 */
var raw = function (args) {
  var keys = Object.keys(args);
  keys = keys.sort();
  var newArgs = {};
  keys.forEach(function (key) {
    newArgs[key.toLowerCase()] = args[key];
  });

  var string = '';
  var newKeys = Object.keys(newArgs);
  for (var i = 0; i < newKeys.length; i++) {
    var k = newKeys[i];
    string += '&' + k + '=' + newArgs[k];
  }
  return string.substr(1);
};