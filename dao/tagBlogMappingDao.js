var dbutil = require("./DBUtil");
function insertTagBlogMapping (tagID, blogId, ctime, success){
    var insertSql = "insert into tag_blog_mapping (tag_id, blog_id, ctime) values(?,?,?)";
    var params = [tagID, blogId, ctime];
    var connection = dbutil.createContention();
    connection.connect();
// console.log(connection.query())
    connection.query(insertSql, params, function(e, res){
    
        if(e == null){
            
            success(res)
        }else{
            console.log(e);
        }
    })
    connection.end();
}
function queryByTag (id, page, pagesize, success){
    var querySql = "select * from tag_blog_mapping where tag_id = ? limit ?,?";
    var params = [id, page*pagesize, pagesize,]
    var connection = dbutil.createContention();
    connection.connect();
    connection.query(querySql, params, function(e, res){
    
        if(e == null){
            
            success(res)
        }else{
            console.log(e);
        }
    })
    connection.end();
}
function queryByTagCount (tagid, success){
    var querySql = "select count(1) as count from tag_blog_mapping where tag_id = ?";
    var connection = dbutil.createContention();
    connection.connect();
    connection.query(querySql, tagid, function (e, result){
        if(e == null){
            success(result);
        }else{
            console.log(e);
        }
    })
    connection.end();
}

module.exports.queryByTagCount = queryByTagCount;
module.exports.queryByTag = queryByTag;
module.exports.insertTagBlogMapping = insertTagBlogMapping;