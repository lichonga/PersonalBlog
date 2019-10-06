var dbutil = require("./DBUtil");
function insertEveryDay (content, ctime, success){
    var insertSql = "insert into every_day (content, ctime) values(?,?)";
    var params = [content, ctime];
    var connection = dbutil.createContention();
    connection.connect();
// console.log(connection.query())
    connection.query(insertSql, params, function(e, res){
        // console.log(22)
        if(e == null){
            console.log(11)
            success(res)
        }else{
            console.log(e);
        }
    })
    connection.end();
}
function queryEveryDay (success){
    var querySql = "select * from every_day order by id limit 1";
    var connection = dbutil.createContention();
    connection.connect();
// console.log(connection.query())
    connection.query(querySql, function(e, res){
        if(e == null){
            success(res)
        }else{
            console.log(e);
        }
    })
    connection.end();
}
module.exports.insertEveryDay = insertEveryDay;
module.exports.queryEveryDay = queryEveryDay;