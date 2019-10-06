var dbutil = require("./DBUtil");
function insertComment(blog_id, parent, parentName, user_name, comments, email, ctime, utime, success) {
    var insertSql = "insert into comments (blog_id, parent, parent_name, user_name, commentss, email, ctime, utime) values(?,?,?,?,?,?,?,?)";
    var params = [blog_id, parent, parentName, user_name, comments, email, ctime, utime];
    // console.log(params)
    var connection = dbutil.createContention();
    connection.connect();
    // console.log(connection.query())
    connection.query(insertSql, params, function (e, res) {
        // console.log(22)
        if (e == null) {
            // console.log(11)
            success(res)
        } else {
            console.log(e);
        }
    })
    connection.end();
}
function queryCommentss(bid, success) {
    var querySql = "select * from comments where blog_id = ? limit 5";
    var connection = dbutil.createContention();
    connection.connect();
    connection.query(querySql, bid, function (e, result) {
        if (e == null) {
            success(result);
        } else {
            console.log(e)
        }
    })
    connection.end()
}
function getmore(bid, success) {
    var querySql = "select * from comments where blog_id= ?";
    var connection = dbutil.createContention();
    connection.connect();
    connection.query(querySql, bid, function (e, result) {
        if (e == null) {
            success(result)
        } else {
            console.log(e)
        }
    })
    connection.end()
}
function queryCountCommentss(bid, success) {
    var querySql = "select count(1) as count from comments where blog_id= ?";
    var connection = dbutil.createContention();
    connection.connect();
    connection.query(querySql, bid, function (e, result) {
        if (e == null) {
            success(result)
        } else {
            console.log(e)
        }
    })
    connection.end();
}
function getNew (a, success){
    var querySql = "select * from comments order by id desc limit 5";
    var connection = dbutil.createContention();
    connection.connect();
    connection.query(querySql, a, function(e, result){
        if (e == null){
            success(result);
        }else{
            console.log(e)
        }
    })
}
module.exports.queryCommentss = queryCommentss;
module.exports.insertComment = insertComment;
module.exports.getmore = getmore;
module.exports.queryCountCommentss = queryCountCommentss;
module.exports.getNew = getNew;