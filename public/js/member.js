/**
 * Created by fupeng on 17/3/2.
 */

// Initialize your app
var myApp = new Framework7({
    init: false, //Disable App's automatica initialization
    // Default title for modals
    modalTitle: 'My App',
    // If it is webapp, we can enable hash navigation:
    pushState: true,
    uniqueHistory: true,
    // imagesLazyLoadPlaceholder:'http://1a65369r25.iask.in/img/i-f7-ios.png',


    // Hide and show indicator during ajax requests
    onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    },
    onPageAfterAnimation: function (app, page) {
        // if("undefined" != typeof $$('.page-on-center').data('title')){
        //     document.title = $$('.page-on-center').data('title');
        // }
        // var $body = $$('body');
        // var $iframe = $$('<iframe src="/"></iframe>');
        // $iframe.on('load',function() {
        //     setTimeout(function() {
        //         $iframe.off('load').remove();
        //     }, 0);
        // }).appendTo($body);
    },
    onPageBack: function (app, page) {
        // if("undefined" != typeof $$('.page-on-left').data('title')){
        //     document.title = $$('.page-on-left').data('title');
        // }
        // var $body = $$('body');
        // var $iframe = $$('<iframe src="/"></iframe>');
        // $iframe.on('load',function() {
        //     setTimeout(function() {
        //         $iframe.off('load').remove();
        //     }, 0);
        // }).appendTo($body);
    }

});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true

});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true

});

wx.ready(function () {
    wechatConfigInit = true;
    var host = window.location.host;

    //隐藏菜单按钮
    wx.hideMenuItems({
        menuList: ['menuItem:copyUrl']
    });

    wx.error(function (res) {
        // alert(res.errMsg);
        wechatConfigInit = false;
    });

});
initApplication();
function initApplication() {
    mainView.router.reloadPage('login')
}


myApp.init();

myApp.onPageInit('login', function (page) {

    $$('#identifyingcode').on('click', function (e) {
        $$(this).attr("src", 'identifyingcode' + '?random=' + Math.random())
    });
//校验手机号是否合法
    function isPhoneNum() {
        var phonenum = $$("#phonenumber").val();
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (!myreg.test(phonenum)) {
            alert('请输入有效的手机号码！');
            return false;
        } else {
            return true;
        }
    }

    //开始倒计时
    var countdown=60;
    function settime() {
        var btn=$$('#vcode');
        countdown = getCookieValue("secondsremained");
        if (countdown == 0) {
            // btn.remo
            // obj.removeAttr("disabled");
            btn.text('获得验证码');
            // obj.val("免费获取验证码");
            return;
        } else {

            // obj.attr("disabled", true);
            // obj.val("重新发送(" + countdown + ")");
            btn.attr('disabled', true);
            btn.text("重新发送(" + countdown + ")");
            countdown--;
            editCookie("secondsremained", countdown, countdown + 1);
        }
        setTimeout(function () {
            settime()
        }, 1000) //每1000毫秒执行一次
    }
    $$('#vcode').on('click', function () {
        if (!isPhoneNum()) {
            return
        }
        if ($$('#identifying').val().trim() == '' || $$('#identifying').val().length != 4) {
            myApp.alert('请输入正确的验证码');
        } else {
            alert("ajax");
            // settime($$('#vcode')[0]);
            $$.ajax({
                // 向后台传递手机号     $$('#identifying').val()
                // url: '/identifyingcode',
                url: '/loginsms',
                method: 'POST',
                dataType: 'json',
                data: {
                    identifyingcode: $$('#identifying').val(),
                    phone: $$('#phonenumber').val()
                },
                success: function (data, status, xhr) {
                    if (data.status == 'error') {
                        myApp.alert(data.message);
                        return;
                    } else {

                    }
                },
                error:function (xhr, status) {
                    alert(status);
                },
                complete:function (xhr, status) {
                    alert(xhr)
                }
            });

        }


    })

    $$('#submit').on('click', function () {
        if (!isPhoneNum()) {
            return
        }
        if ($$('#identifying').val().trim() == '' || $$('#identifying').val().length != 4) {
            myApp.alert('请输入正确的验证码');
        } else {
            $$.ajax({
                // 向后台传递手机号     $$('#identifying').val()
                // url: '/identifyingcode',
                url: '/loginsms',
                method: 'POST',
                dataType: 'json',
                data: {
                    identifyingcode: $$('#identifying').val(),
                    phone: $$('#phonenumber').val()
                },
                success: function (data, status, xhr) {
                    if (data.status == 'error') {
                        myApp.alert(data.message);
                        return;
                    } else {

                    }
                },
                error:function (xhr, status) {
                    alert(status);
                },
                complete:function (xhr, status) {
                    alert(xhr)
                }
            });

        }


    })

});
