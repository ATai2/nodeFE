/**
 * Created by Administrator on 2017/2/9.
 */
var pool = require('./DBConnectPool');

module.exports = {

    getCinema :function (param,callBack){
        pool.getPoolConnection('mtsc', function (err, connection) {

            if (err) {
                console.log('get connection from pool failed in getCiname: ', err);
                return;
            }
            var sql = 'select a.*, case '
                + ' when a.dis < 1000 then concat(a.dis,"m")'
                + ' when a.dis > 1000 then concat(round(a.dis/1000,2),"km")'
                + ' end as distance from'
                + ' (select ci.*,ROUND(6378.138*2*ASIN(SQRT(POW(SIN((?*PI()/180-ci.cinema_lat*PI()/180)/2),2)+COS(?*PI()/180)*COS(ci.cinema_lat*PI()/180)*POW(SIN((?*PI()/180-ci.cinema_long*PI()/180)/2),2)))*1000)'
                +' AS dis '
                +   ' from cinema as ci where 1=1';

            if(param.citycode != 'null'){
                 sql += ' and ci.cinema_regionid in (select id from cinema_region where citycode= '+ param.citycode +' )';
             }

            if(param.cinema_name){
                sql += ' and ci.cinema_name like "%'+ param.cinema_name +'%" ';
            }
            sql += ' order by dis  LIMIT ?,10) as a';


            connection.query(sql, [param.lat,param.lat,param.long,param.lastIndex],function (queryErr, rows) {

                if (queryErr) {
                    console.log('select * from cinema failed: ', err);
                    callBack({
                        isSuccess: false
                    });
                } else {
                    callBack({
                        isSuccess: true,
                        rows: rows
                    })
                }
                connection.release();
            });

        });
    },
    findCountByPage : function(param,callBack){
        pool.getPoolConnection('mtsc', function (err, connection) {

            if (err) {
                console.log('get connection from pool failed in findCountByPage: ', err);
                return;
            }

            var sql = 'select count(*) as total from cinema as ci where 1=1';

            if(param.citycode != 'null'){
                sql += ' and ci.cinema_regionid in (select id from cinema_region where citycode= '+ param.citycode +' )';
            }

            if(param.cinema_name){
                sql += ' and ci.cinema_name like "%'+ param.cinema_name +'%" ';
            }

            connection.query(sql, function (queryErr, result) {
                if (queryErr) {
                    console.log('select * from cinema failed: ', err);
                    callBack({
                        isSuccess: false
                    });
                } else {
                    callBack({
                        isSuccess: true,
                        result: result
                    })
                }
                connection.release();
            });

        });
    }

};

