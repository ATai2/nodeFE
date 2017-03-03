/**
 * Created by Administrator on 2017/2/25.
 */
var movieDetailDao = require('../dao/MovieDetailDao');

movieDetailDao.getMovieInfo('BESTV150625163346000024', function (data) {
    if (data.isSuccess) {
        console.log(data.rows.length);

    }
});