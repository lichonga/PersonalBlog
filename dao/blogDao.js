var dbutil = require("./DBUtil");
function insertBlog (title, content, views, tags, ctime, utime, success){
    var insertSql = "insert into blog (title, content, views, tags, ctime, utime) values(?,?,?,?,?,?)";
    var params = [title, content, views, tags, ctime, utime];
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
function queryBlogById (bid, success){
    var querySql = " select * from blog where id = ?";
    var connection = dbutil.createContention();
    connection.connect();
    connection.query(querySql, bid, function(e, result){
        if(e == null){
            success(result)
        }else{
            console.log(e)
        }
    })
    connection.end();
}
function queryBlogByPage (page, pageSize, success){
    var querySql = "select * from blog order by id desc limit ?,?";
    var params = [page * pageSize, pageSize]
    var connection = dbutil.createContention();
    connection.connect();

    connection.query(querySql, params,  function(e, res){
        if(e == null){
            // console.log(res)
            success(res)
        }else{
            console.log(e);
        }
    })
    connection.end();
}
function queryBlogCount (success){
    var querySql = "select count(1) as count from blog";
    var connection = dbutil.createContention();
    connection.connect();
    connection.query(querySql, function (e, result){
        if(e == null){
            success(result);
        }else{
            console.log(e);
        }
    })
    connection.end();
}

function getAllBlog(success){
    var querySql = "select * from blog order by id desc";
    var connection = dbutil.createContention();
    connection.connect();
    connection.query(querySql, function(e, result){
        if(e == null){
            success(result);
        }else{
            console.log(e)
        }
    })
    connection.end()
}
function addViews (bid, success){
    var querySql = "update blog set views = views + 1 where id = ?";
    var connection = dbutil.createContention();
    connection.connect();
    connection.query(querySql, bid, function(e, result){
        if(e == null){
            success(result)
        }else{
            console.log(e)
        }
    })
    connection.end();
}
function queryHost (size, success){
    var querySql = "select * from blog order by views desc limit ?";
    var connection = dbutil.createContention();
    connection.connect();
    connection.query(querySql, size, function(e, result){
        if(e == null){
            success(result)
        }else{
            console.log(e)
        }
    })
    connection.end();
}
module.exports.getAllBlog= getAllBlog;
module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage; 
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogById = queryBlogById;
module.exports.addViews = addViews;
module.exports.queryHost = queryHost;