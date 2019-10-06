var captcha = require("svg-captcha")
var getNow = require("../util/timeUtil.js");
var writeutil = require("../util/respUtil.js");
var commentDao = require("../dao/commentDao.js");
var url = require("url");
var path = new Map();
function addComment(request, response) {
    var params = url.parse(request.url, true).query;
    commentDao.insertComment(parseInt(params.bid), parseInt(params.parent), params.parentName, params.userName, params.content, params.email, getNow(), getNow(), function (resp) {
        response.writeHead(200);
        response.write(writeutil.writeResult("sccuess", "评论 成功", null));
        response.end();
    })
}
path.set("/addComment", addComment);

function queryRandomCode(request, response) {
    var img = captcha.create({ fontSize: 50, width: 100, height: 34 });
    // console.log(img);
    response.writeHead(200);
    response.write(writeutil.writeResult("sccuess", "评论 成功", img));
    response.end();
}
path.set("/queryRandomCode", queryRandomCode);
function queryCommentss(request, response) {
    var params = url.parse(request.url, true).query;
    commentDao.queryCommentss(parseInt(params.bid), function (result) {
        response.writeHead(200);
        response.write(writeutil.writeResult("sccuess", "评论 成功", result));
        response.end();
    })
}
path.set("/queryCommentss", queryCommentss)
function getmore(req, res) {
    var params = url.parse(req.url, true).query;
    commentDao.getmore(parseInt(params.bid), function (result) {
        write(res, result);
    })
}
path.set("/getmore", getmore)
path.set("/queryCommentss", queryCommentss)
function queryCountCommentss(req, res) {
    var params = url.parse(req.url, true).query;
    commentDao.queryCountCommentss(parseInt(params.bid), function (result) {
        write(res, result);
    })
}
path.set("/queryCountCommentss", queryCountCommentss);

function write(res, result) {
    res.writeHead(200);
    res.write(writeutil.writeResult("sccuess", "评论 成功", result));
    res.end();
}
function getNew(req, res){
    commentDao.getNew(5, function(result){
        write(res, result)
    })
}
path.set("/getNew", getNew)
module.exports.path = path;