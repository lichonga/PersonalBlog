var blogDao = require("../dao/blogDao.js");
var tagsDao = require("../dao/tagsDao");
var getNow = require("../util/timeUtil.js");
var writeutil = require("../util/respUtil.js");
var tagBlogMappingDao = require("../dao/tagBlogMappingDao");
var url = require("url");

var path = new Map();
function queryRandomTags(request, res) {
    tagsDao.queryAllTag(function (result) {
        result.sort(function () {
            return Math.random() > 0.5 ? true : false;
        })
    
        res.writeHead(200);
        res.write(writeutil.writeResult("sccuess", "添加成功", result));
        res.end();
    })
}
function queryByTag(req, response) {
    var params = url.parse(req.url, true).query;
    
    tagsDao.queryTag(params.tag, function (result) {
        
        if (result == null || result.length == 0) {
            response.writeHead(200);
            response.write(writeutil.writeResult("sccuess", "添加成功", result));
            response.end();
        } else {
            tagBlogMappingDao.queryByTag(result[0].id, parseInt(params.page), parseInt(params.pageSize), function (result) {
                var blogList = [];
                for (var i = 0; i < result.length; i++) {
                    blogDao.queryBlogById(result[i].blog_id, function (result) {
                        blogList.push(result[0]);
                    })
                }
                getResult(blogList, result.length, response)

            })
        }
    })

}
function queryByTagCount(req, res) {
    var params = url.parse(req.url, true).query;
    tagsDao.queryTag(params.tag, function (result) {
        // console.log(result)
        tagBlogMappingDao.queryByTagCount(result[0].id, function (result) {
            res.writeHead(200);
            res.write(writeutil.writeResult("sccuess", "添加成功", result));
            res.end();
        })

    })

}

function getResult(blogList, len, response) {
    if (blogList.length < len) {
        setTimeout(function () {
            getResult(blogList, len, response)
        }, 10)
    } else {
        for (var i = 0; i < blogList.length; i++) {
            blogList[i].content = blogList[i].content.replace(/<img[\w\W]*">/, "");
          
            blogList[i].content = blogList[i].content.substring(0, 300);
        }
        response.writeHead(200);

        response.write(writeutil.writeResult("sccuess", "查询成功", blogList));
        response.end();
    }
}
path.set("/queryByTagCount", queryByTagCount);
path.set("/queryByTag", queryByTag);
path.set("/queryByTagCount", queryByTagCount)
path.set("/queryRandomTags", queryRandomTags);
module.exports.path = path;