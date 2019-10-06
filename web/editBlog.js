var blogDao = require("../dao/blogDao.js");
var tagsDao = require("../dao/tagsDao");
var getNow = require("../util/timeUtil.js");
var writeutil = require("../util/respUtil.js");
var tagBlogMappingDao = require("../dao/tagBlogMappingDao");
var url = require("url");

var path = new Map();
function queryBlogCount (request, response){
    blogDao.queryBlogCount(function(result){
        response.writeHead(200);
        response.write(writeutil.writeResult("sccuess", "查询成功", result));
        response.end();
    })
}
function queryBlogById (request, response){
    var parmas = url.parse(request.url, true).query;
    blogDao.queryBlogById(parseInt(parmas.bid), function(result){
        response.writeHead(200);
        response.write(writeutil.writeResult("sccuess", "查询成功", result));
        response.end();
        blogDao.addViews(parseInt(parmas.bid), function(resp){})
    })
}
path.set("/queryBlogById", queryBlogById)
path.set("/queryBlogCount", queryBlogCount);
function queryBlogByPage(request, response) {
    var params = url.parse(request.url, true).query;
    // console.log(params)
    blogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), function (result) {
        for (var i = 0; i < result.length; i++){
            result[i].content = result[i].content.replace(/<img[\w\W]*">/, "");
            // console.log(result[i].content)
            // result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g, "");
            result[i].content = result[i].content.substring(0, 300);
        }
        
        response.writeHead(200);
      
        response.write(writeutil.writeResult("sccuess", "查询成功", result));
        response.end();
    })
}
path.set("/queryBlogByPage", queryBlogByPage);
function editBlog(request, response) {
    var pramas = url.parse(request.url, true).query;
    // console.log(pramas)
    var tags = pramas.tags.replace(/ /g, "").replace("，", ",");

    request.on("data", function (data) {

        blogDao.insertBlog(pramas.title, data.toString(), 0, tags, getNow(), getNow(), function (result) {
            response.writeHead(200);
            response.write(writeutil.writeResult("sccuess", "添加成功", null));
            response.end();
            var blogId = result.insertId;
            var tagList = tags.split(",")
            for (var i = 0; i < tagList.length; i++) {
                if (tagList[i] == "") {
                    continue;
                }
                queryTag(tagList[i], blogId)
            }
        })
    })
}
path.set("/editBlog", editBlog);
function getAllBlog (req, res){
    blogDao.getAllBlog(function(result){
        res.writeHead(200);
            res.write(writeutil.writeResult("sccuess", "添加成功", result));
            res.end();
    })
}
path.set("/getAllBlog", getAllBlog);
function queryHost (req, res){
    blogDao.queryHost(9, function(result){
        res.writeHead(200);
            res.write(writeutil.writeResult("sccuess", "添加成功", result));
            res.end();
    })
}
path.set("/queryHost", queryHost);

function queryTag(tag, blogId) {
    // console.log(tag, blogId)
    tagsDao.queryTag(tag, function (result) {

        if (result == null || result.length == 0) {

            insertTag(tag, blogId);
        } else {

            insertTagBlogMaping(result[0].id, blogId)
        }
    })
}
function insertTag(tag, blogId) {
    tagsDao.insertTag(tag, getNow(), getNow(), function (result) {
        insertTagBlogMaping(result.insertId, blogId)
    })
};
function insertTagBlogMaping(tagId, blogId) {
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, getNow(), function (result) {
        // console.log(11)
    })
}

module.exports.path = path;
