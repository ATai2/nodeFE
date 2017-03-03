/**
 * Created by Administrator on 2017/3/3.
 */

var dao = require('../dao/LoginDao');
module.exports = {
    selectByPhone: function (phone,callback) {
        var users = [];
        dao.selectByPhone(phone, function (data) {
            if (data.isSuccess) {
                if (data.rows.length > 0) {
                    data.rows.forEach(function (val) {
                        users.push({
                            id: val.id,
                            phone: val.phone,
                            createtime: val.createtime,
                            expiretime: val.expiretime,
                            username: val.username,
                            isdel: val.isdel
                        });
                    });
                }
                 callback(users);
            } else {
                callback( 'null');
            }
        })
    },
    selectSMSCodeByPhone: function (phone,callback) {
        var users = [];
        dao.selectByPhone(phone, function (data) {
            if (data.isSuccess) {
                if (data.rows.length > 0) {
                    data.rows.forEach(function (val) {
                        users.push({
                            id: val.id,
                            phone: val.phone,
                            createtime: val.createtime,
                            expiretime: val.expiretime,
                            username: val.username,
                            isdel: val.isdel
                        });
                    });
                }
                callback(users);
            } else {
                callback( 'null');
            }
        })
    }
}

