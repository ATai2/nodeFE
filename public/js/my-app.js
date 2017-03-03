
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
        if("undefined" != typeof $$('.page-on-center').data('title')){
            document.title = $$('.page-on-center').data('title');
        }
        var $body = $$('body');
        var $iframe = $$('<iframe src="/"></iframe>');
        $iframe.on('load',function() {
            setTimeout(function() {
                $iframe.off('load').remove();
            }, 0);
        }).appendTo($body);
    },
    onPageBack:function(app, page){
        if("undefined" != typeof $$('.page-on-left').data('title')){
            document.title = $$('.page-on-left').data('title');
        }
        var $body = $$('body');
        var $iframe = $$('<iframe src="/"></iframe>');
        $iframe.on('load',function() {
            setTimeout(function() {
                $iframe.off('load').remove();
            }, 0);
        }).appendTo($body);
    }
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true

});
var latitude;
var longitude;

wx.ready(function () {
    wechatConfigInit = true;
    var host = window.location.host;

    //隐藏菜单按钮
    wx.hideMenuItems({
        menuList: ['menuItem:copyUrl']
    });

    wx.getLocation({
        type : 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success : function(res) {
            // alert(JSON.stringify(res));
            latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            // $("#latitude").val(latitude);
            longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            // $("#longitude").val(longitude);
            var speed = res.speed; // 速度，以米/每秒计
            // $("#speed").val(speed);
            var accuracy = res.accuracy; // 位置精度
            // $("#accuracy").val(accuracy);
            getLocation(longitude,latitude);

        },
        fail : function(res) {
            //getPostionByIP();
            localStorage.setItem('cityname','定位失败');
            localStorage.setItem('citycode',null);
            myApp.onPageInit('cinema',cinemaInit);
            cinemaInit();

        },
        cancel: function (res) {
            console.log('用户拒绝授权获取地理位置');
        }

    });

    wx.error(function (res) {
        // alert(res.errMsg);
        wechatConfigInit = false;
    });

});

// function getPostionByIP(){
//     $$.ajax({
//         url:NODESERVER_API + '/getCityByIP',
//         method: 'POST',
//         dataType: 'json',
//         data: {
//         },
//         success: function (data, status, xhr) {
//             if (data.status == 'error'){
//                 myApp.alert(data.message);
//                 return;
//             }
//             latitude = data.lat;
//             longitude = data.long;
//             getLocation(longitude,latitude)
//         },
//         error:function (data,status,xhr) {
//
//         }
//     })
// }

function getLocation(long,lat){
    $$.ajax({
        url: 'getCityByPostion',
        method: 'POST',
        dataType: 'json',
        data: {
            lat: lat,
            long: long
        },
        success: function (data, status, xhr) {
            if (data.status == 'error'){
                myApp.alert(data.message);
                return;
            }
            name = data.city.rows.name;
            citycode = data.city.rows.citycode;
            localStorage.setItem('cityname',name);
            localStorage.setItem('citycode',citycode);
            myApp.onPageInit('cinema',cinemaInit);
            cinemaInit();
        }

    })
}

// Callbacks to run specific code for specific pages, for example for About page:

myApp.onPageInit('location', function (page) {
    wx.getLocation({
        type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
            // alert(JSON.stringify(res));
            latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            // $("#latitude").val(latitude);
            longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            // $("#longitude").val(longitude);
            var speed = res.speed; // 速度，以米/每秒计
            // $("#speed").val(speed);
            var accuracy = res.accuracy; // 位置精度
            // $("#accuracy").val(accuracy);
            $$.ajax({
                url: 'getCityByPostion',
                method: 'POST',
                dataType: 'json',
                data: {
                    lat: latitude,
                    long: longitude
                },
                success: function (data, status, xhr) {
                    if (data.status == 'error') {
                        myApp.alert(data.message);
                        $$('#loc').text('定位失败');
                        return;
                    }
                    name = data.city.rows.name;
                    citycode = data.city.rows.citycode;
                    $$('#loc').find('.item-title').text(name);
                    $$('#loc').attr('citycode', citycode);
                    $$('#loc').attr('href', 'cinema?citycode=' + citycode);
                }
            })
        },
        fail: function (res) {
            //     $$.ajax({
            //         url: NODESERVER_API + '/getCityByIP',
            //         method: 'POST',
            //         dataType: 'json',
            //         data: {
            //         },
            //         success: function (data, status, xhr) {
            //             if (data.status == 'error') {
            //                 myApp.alert(data.message);
            //                 return;
            //             }
            //             latitude = data.lat;
            //             longitude = data.long;
            //             $$.ajax({
            //                 url:NODESERVER_API+'/getCityByPostion',
            //                 method: 'POST',
            //                 dataType: 'json',
            //                 data: {
            //                     lat: latitude,
            //                     long: longitude
            //                 },
            //                 success: function (data, status, xhr) {
            //                     if (data.status == 'error') {
            //                         myApp.alert(data.message);
            //                         $$('#loc').text('定位失败');
            //                         return;
            //                     }
            //                     name = data.city.rows.name;
            //                     id = data.city.rows.citycode;
            //                     $$('#loc').find('.item-title').text(name);
            //                     $$('#loc').attr('citycode',id);
            //                     $$('#loc').attr('href', 'cinema?citycode=' + id);
            //                 }
            //             })
            //         }
            //     })
            // }

            $$('#loc').find('.item-title').text('定位失败');
            $$('#loc').attr('citycode', null);
            $$('#loc').attr('href', 'cinema?citycode=' + null);
        }


    });
    //给a标签添加点击事件
    $$('.location').find('a').on('click',function(e) {
        var citycode = $$(this).attr('citycode');
        var name = $$(this).find('.item-title').html();
        localStorage.setItem('cityname', name);
        localStorage.setItem('citycode', citycode);
    });
});

myApp.onPageInit('cinemadetail', function (page) {
    $$('.comment').on('click',function(e){
        if($$(this).css('-webkit-line-clamp') != 'none'){
            $$(this).data('line',$$(this).css('-webkit-line-clamp'));
            $$(this).css('-webkit-line-clamp',null);
        }else{
            $$(this).css('-webkit-line-clamp',$$(this).data('line'));
        }

    });


    $$('#map').on('click',function (e) {
        wx.openLocation({
            latitude:parseFloat( $$(this).attr('lat')),
            longitude:parseFloat( $$(this).attr('long')),
            name: $$(this).attr('name'),
            address:'地址：'+ $$(this).attr('address')+'[右侧点击为您找到线路→_→]',
            scale: 14,
            infoUrl: 'http://weixin.qq.com'
        })
    })
});


var loading = false;
function cinemaInit() {
    $$("#locat").html(localStorage.cityname);

    var mySearchbar = myApp.searchbar('.cinemasearchbar', {
        customSearch: true,
        onSearch:function () {
            var param = {
                lastIndex: 0,
                citycode: localStorage.citycode,
                lat:latitude,
                long:longitude,
                cinema_name:mySearchbar.query
            };
            $$('.cinema').html('');
            $$(".cinema").data('total',0);
            myApp.attachInfiniteScroll($$('.cinema').parents('.page-content'));
            $$('.infinite-scroll-preloader div').text('正在加载，请稍后...');
            getCinemaInfomation(param);
        },

        onClear:function(){
            var param = {
                lastIndex: 0,
                cinema_name:mySearchbar.query,
                citycode: localStorage.citycode,
                lat:latitude,
                long:longitude,
            };
            $$('.cinema').html('');
            $$(".cinema").data('total',0);
            myApp.attachInfiniteScroll($$('.cinema').parents('.page-content'));
            $$('.infinite-scroll-preloader div').text('正在加载，请稍后...');
            getCinemaInfomation(param);
        },
        onDisable:function() {
            var param = {
                lastIndex: 0,
                citycode: localStorage.citycode,
                lat:latitude,
                long:longitude
            }
            $$('.cinema').html('');
            $$(".cinema").data('total',0);
            myApp.attachInfiniteScroll($$('.cinema').parents('.page-content'));
            $$('.infinite-scroll-preloader div').text('正在加载，请稍后...');
            getCinemaInfomation(param);
        }
    });

    $$('.infinite-scroll-preloader div').text('正在加载，请稍后...');
    var param = {
        lastIndex: $$(".cinema li").length,
        citycode: localStorage.citycode,
        lat:latitude,
        long:longitude
    }
    getCinemaInfomation(param);
    // $$('.cinemapopup').find('input').on('click',function () {
    //     myApp.popup('.popup-search');
    // });
    // 加载flag

    $$('.infinite-scroll').on('infinite', function () {
        // 如果正在加载，则退出
        if (loading) return;
        $$('.infinite-scroll-preloader div').text('正在加载，请稍后...');
        // 设置flag
        loading = true;
        var param;
        if(mySearchbar.active) {
            param = {
                lastIndex: $$(".cinema li").length,
                citycode: localStorage.citycode,
                cinema_name:mySearchbar.query,
                lat: latitude,
                long: longitude
            }
        }else {
            param = {
                lastIndex: $$(".cinema li").length,
                citycode: localStorage.citycode,
                lat:latitude,
                long:longitude
            }
        }
        getCinemaInfomation(param);

    });
};

function getCinemaInfomation(param) {
    $$.post('/cinemainfo',
        param ,
        function (data) {
            var data = JSON.parse(data);
            if(data.status='success'){
                setCinemaForm(data.data);
            }else{
                myApp.alert("出现故障");
                return;
            }
            var _total = data.total;
            if(_total){
                $$(".cinema").data('total',_total);
            }

            if ($$(".cinema li").length >= $$(".cinema").data('total')) {
                myApp.detachInfiniteScroll($$('.infinite-scroll'));
                // Remove preloader
                $$('.infinite-scroll-preloader div').text('加载完毕，没有更多数据');
                return;
            }
        });
}

function setCinemaForm(cinemaData) {

    // 生成新条目的HTML
    var html = '';
    $$.each(cinemaData, function (i, v) {
        html += '<li>';
        html += '<a href="cinemadetail?cinema_code=' + v["cinema_code"] + '">';
        html += '<div class="item-content">';
        html += '<div class="item-media radius"><img src='+v["cinema_picture"]+' onerror=\'this.src="img/1.png"\'  width="80" height="80"></div>';
        html += '<div class="item-inner">';
        html += '<div class="item-title-row">';
        html += '<div class="item-title" style="font-size:large">' + v["cinemaName"] + '</div>';
        html += '</div>';
        html += '<div class="item-title-row" style="font-size: small;color: gray">';
        html += '<div class="item-text" style="font-size: small">' + v["cinemaAddress"] + '</div>';
        html += ' <div class="right" style="text-align:right;"><div>&nbsp;';
        if(v["distance"]) {
            html += v["distance"];
        }
        html += '</div><div style=" text-align:right;">'+'<img style="width: 15vw;margin-top: 10px" src="img/'+ v["score"] + 'star.png" >'+ '</div></div>';
        html += '</div></div></div></div></a></li>';

    });

    $$('.cinema').append(html);
    loading = false;


    // if($$(".cinema li").length >= $$(".cinema").data('total')){
    //     $$('.infinite-scroll-preloader div').text('加载完毕，没有更多数据');
    // }else{
    //     $$('.infinite-scroll-preloader div').text('上拉加载更多');
    // }
}


function getMovieInfomation() {

    $$.post('/movielib',
        {
            param_pageSize: $$("#movie_pageSize").val()
        },
        function (data) {
            var data = JSON.parse(data);
            var _totalPage = parseInt($$("#movie_totalPage").val());
            var _pageSize = parseInt($$("#movie_pageSize").val());
            $$("#movie_pageSize").val(_pageSize + 1);
            if (_pageSize < _totalPage) {
                setMovieForm(data.data);
            } else {
                // 加载完毕，则注销无限加载事件，以防不必要的加载
                myApp.detachInfiniteScroll($$('.infinite-scroll'));
                $$('.infinite-scroll-preloader div').text('加载完毕，没有更多数据');
            }

        });
}


myApp.onPageInit('moviedetail', function (page) {

    $$('.detail').on('click', function (e) {
        if ($$(this).css('-webkit-line-clamp') != 'none') {
            $$(this).data('line', $$(this).css('-webkit-line-clamp'));
            $$(this).css('-webkit-line-clamp', null);
        } else {
            $$(this).css('-webkit-line-clamp', $$(this).data('line'));
        }
    });

});


myApp.onPageInit('movielib', function (page) {
    $$('.infinite-scroll-preloader div').text('该影吧没有影片 >.<');
    // 加载flag
    var loading = false;


    $$('.infinite-scroll').on('infinite', function () {
        // 如果正在加载，则退出
        if (loading) return;

        // 设置flag
        loading = true;
        getMovieInfomation();

    });

    function getMovieInfomation() {

        $$('.infinite-scroll-preloader div').text('正在加载，请稍后...');

        var _totalPage = parseInt($$("#movie_totalPage").val());
        var _pageSize = parseInt($$("#movie_pageSize").val());

        if (_pageSize >= _totalPage) {
            // 加载完毕，则注销无限加载事件，以防不必要的加载
            // myApp.detachInfiniteScroll($$('.infinite-scroll'));
            $$('.infinite-scroll-preloader div').text('加载完毕，没有更多数据');
            // // 删除加载提示符
            // $$('.infinite-scroll-preloader').remove();
        } else {
            $$.post('/movielib',
                {
                    param_pageSize: $$("#movie_pageSize").val()
                },
                function (data) {
                    var data = JSON.parse(data);

                    $$("#movie_pageSize").val(_pageSize + 1);
                    if (_pageSize < _totalPage) {
                        if (data.data.length > 0) {
                            setMovieForm(data.data);
                        } else {
                            $$('.infinite-scroll-preloader div').text('该影吧暂无影片 >.<');
                        }
                    }

                });
        }


    }

    function setMovieForm(MovieData) {

        loading = false;

        // 生成新条目的HTML
        var html = '';

        $$.each(MovieData, function (i, v) {

            html += '<li>';
            html += '<a href="moviedetail?mid=' + v["mid"] + '">';//暂留跳转
            html += '<div class="item-content">';
            html += '<div class="item-media"><img src="' + v["movie_bigpic"] + '"  onerror="this.src=\'img/2.png\'" width="90" height="120"></div>';
            html += '<div class="item-inner">';
            html += '<div class="item-title-row">';
            html += '<div class="item-title">' + v["movie_name"] + '</div>';
            html += '<div class="item-after"><b style="color: gold">' + v["score"] + '</b></div>';
            html += '</div>';
            html += '<div class="item-subtitle">';
            html += '<div style ="margin-top: 30px">导演:' + v["director"] + '</div>';
            html += '<div>演员:' + v["cast"] + '</div>';
            html += '<div class="kinddiv">';
            html += '<span class="kind" style="background-color: #03a9f4 ;max-width: 6em;display:-moz-inline-box;display:inline-block;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + v["category"] + '</span>';
            html += '<span class="kind" style="background-color: #8bc34a ;max-width: 6em;display:-moz-inline-box;display:inline-block;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + v["country"] + '</span>';
            html += '<span class="kind" style="background-color: #5856d6 ;max-width: 6em;display:-moz-inline-box;display:inline-block;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + v["publishdate"] + '</span>';
            html += '</div></div></div></div></a></li>';
        });

        $$('.cinema-group ul').append(html);

        $$('.infinite-scroll-preloader div').text('上拉加载更多');

    }
});

myApp.onPage('register' ,function (page) {
    // 验证手机号是否合法
    $$.click('#btnsms').addEventListener('blur', function () {

    });
    // 开始60s倒计时


    //开始倒计时
    var countdown=60;
    function settime(obj) {
        countdown = getCookieValue("secondsremained");
        if (countdown == 0) {
            obj.removeAttr("disabled");
            obj.val("免费获取验证码");
            return;
        } else {
            obj.attr("disabled", true);
            obj.val("重新发送(" + countdown + ")");
            countdown--;
            editCookie("secondsremained", countdown, countdown + 1);
        }
        setTimeout(function () {
            settime(obj)
        }, 1000) //每1000毫秒执行一次
    }
//校验手机号是否合法
    function isPhoneNum() {
        var phonenum = $("#phonenum").val();
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (!myreg.test(phonenum)) {
            alert('请输入有效的手机号码！');
            return false;
        } else {
            return true;
        }
    }

});





myApp.init();

