/**
 * Created by Administrator on 2017/3/3.
 */
var pool = require('./DBConnectPool');
var logger = require('../../common/Logger/Logger');

module.exports={
    addUser :function (_param,callBack) {
    // pool.getPoolConnection('mtsc', function (err, connection) {
    pool.getPoolConnection('sss', function (err, connection) {
        if (err) {
            console.log('Error: get connection from pool in CineamDetail: ', err);
            return;
        }
        var sql = 'SELECT * FROM register where phone = ? ';
        connection.query(sql, [_param], function (queryErr, rows) {
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
        })
    })
},
    updateUser:function (_param,callBack) {
        // pool.getPoolConnection('mtsc', function (err, connection) {
        pool.getPoolConnection('sss', function (err, connection) {
            if (err) {
                console.log('Error: get connection from pool in register: ', err);
                return;
            }
            var sql = 'update register set createtime=?,expiretime=?,username=?,smscode=?,times=? where phone=? ';
            // var sql = 'insert into register (phone,createtime,expiretime,username) values(?,?,?,?) ';
            connection.query(sql, [_param], function (queryErr, rows) {
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
            })
        })
    },
    //插入手机号，4字段
    addPhone:function (_param,callBack) {
        // pool.getPoolConnection('mtsc', function (err, connection) {
        pool.getPoolConnection('sss', function (err, connection) {
            if (err) {
                console.log('Error: get connection from pool in register: ', err);
                return;
            }
            var sql = 'insert into register (phone,createtime,expiretime,username) values(?,?,?,?) ';
            connection.query(sql, [_param], function (queryErr, rows) {
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
            })
        })
    },
    // 根据手机号查询结果
    selectByPhone:function (_param,callBack) {
        // pool.getPoolConnection('mtsc', function (err, connection) {
        pool.getPoolConnection('mtsc', function (err, connection) {
            if (err) {
                console.log('Error: get connection from pool in register: ', err);
                return;
            }
            var sql = 'SELECT * FROM register where phone = ? ';
            console.log(sql);
            connection.query(sql, [_param], function (queryErr, rows) {
                console.log(rows);

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
            })
        })
    }

};





