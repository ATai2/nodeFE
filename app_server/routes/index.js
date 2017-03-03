var express = require('express');
var router = express.Router();

var autoReplayController = require('../controllers/AutoReplyController');
var oauthController = require('../controllers/OauthController');
var cinemaMenuController = require('../controllers/CinemaMenuController');
var memberController = require('../controllers/MemberController')

//验签用Controller
var signatureController = require('../controllers/SignatureController');

//scan Controller
var scanController = require('../controllers/ScanController');

var cinemaDetailController = require('../controllers/CinemaDetailController');
var locationController = require('../controllers/LocationController');
var movielibController = require('../controllers/MovielibController');
var movieDetailController = require('../controllers/MovieDetailController');
var cityInfoController = require('../controllers/CityInfoController');
var smsRegistryController = require('../controllers/SMSRegistryController');

// var movieController = require('../controllers/MovieController');
var loginController = require('../controllers/LoginController');

//微信自动回复
router.post('/weixin/api/auth/ack', autoReplayController.reply);
//验证消息的确来自微信服务器
router.get('/weixin/api/auth/ack', signatureController.signatureWeixin);
//测试oauth base
router.get('/oauth', oauthController.getOauth);
//测试oauth userinfo
router.get('/userinfo', oauthController.getUserInfo);
//微信绑定影厅扫码页面
router.get('/scan', scanController.setConfig);
//微信绑定影厅扫码页面，验证以及自动发送推送消息
router.post('/scanauth', scanController.sendTextMsg);
//微信公众号打开影吧
router.get('/cinema',cinemaMenuController.getCinema);
router.post('/cinemainfo',cinemaMenuController.getCinemaInfo);
router.post('/getCityByPostion',cityInfoController.getCityByPostion);
router.post('/getCityByIP',cityInfoController.getCityByIP);
router.get('/cinemadetail',cinemaDetailController.getCinemaDetail);

router.get('/location',locationController.getLocation);

//影吧片库
router.get('/movielib',movielibController.getMovielib);
router.post('/movielib',movielibController.getMovieLibInfo);
router.post('/movielibbyparam',movielibController.getMovieLibInfoByParam);
//影片详情
router.get('/moviedetail',movieDetailController.getMovieDetailModel);
//用户注册
// router.get('/register',smsRegistryController.getView);

//获得手机短信验证码
router.get('/register',smsRegistryController.getView);


// router.get('/movie',movieController.getMovie);


// router.get('/moviehome',movieController.getMovieHome);

router.get('/memberhome',memberController.getMemberHome);

router.get('/member',memberController.getMember);

router.get('/login',memberController.getLogin);

router.get('/identifyingcode',loginController.getCode);
router.post('/loginsms',loginController.getSMS);


module.exports = router;
