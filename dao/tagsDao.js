var dbutil = require("./DBUtil");
function insertTag (tag, ctime, utime, success){
    var insertSql = "insert into tags (tag, ctime, utime) values(?,?,?)";
    var params = [tag, ctime, utime];
    var connection = dbutil.createContention();
    connection.connect();
// console.log(connection.query())
    connection.query(insertSql, params, function(e, res){
        if(e == null){
            // console.log(11)
            success(res)
        }else{
            console.log(e);
        }
    })
    connection.end();
}
function queryTag (tag, success){
    var insertSql = "select * from tags where tag = ?";
    var params = [tag];
    var connection = dbutil.createContention();
    connection.connect();
    // console.log(tag)
    connection.query(insertSql, params, function(e, res){
        if(e == null){
            // console.log(res)
            success(res)
        }else{
            console.log(e);
        }
    })
    connection.end();
}
function queryAllTag (success){
    var insertSql = "select * from tags";
    var params = [];
    var connection = dbutil.createContention();
    connection.connect();
// console.log(connection.query())
    connection.query(insertSql, params, function(e, res){
        // console.log(22)
        if(e == null){
            // console.log(11)
            success(res)
        }else{
            console.log(e);
        }
    })
    connection.end();
}
module.exports = {
    insertTag: insertTag,
    queryTag: queryTag,
    queryAllTag: queryAllTag
}