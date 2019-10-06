var express = require("express");
var globalConfig = require("./config.js");
var loader = require("./loader.js");
var app = new express();
app.use(express.static("./PersonalBlog/page/"));
// console.log(loader.get('/editEveryDay'))
app.post("/editEveryDay", loader.get("/editEveryDay"));
app.get("/queryEveryDay", loader.get("/queryEveryDay"));
app.post("/editBlog", loader.get("/editBlog"));
app.get("/queryBlogByPage", loader.get("/queryBlogByPage"));
app.get("/queryBlogCount", loader.get("/queryBlogCount"));
app.get("/queryBlogById", loader.get("/queryBlogById"));
app.get("/addComment", loader.get("/addComment"));
app.get("/queryRandomCode", loader.get("/queryRandomCode"));
app.get("/queryCommentss", loader.get("/queryCommentss"));
app.get("/getmore", loader.get("/getmore"));
app.get("/queryCountCommentss", loader.get("/queryCountCommentss"));
app.get("/getAllBlog", loader.get("/getAllBlog"));
app.get("/queryRandomTags", loader.get("/queryRandomTags"));
app.get("/queryHost", loader.get("/queryHost"));
app.get("/getNew", loader.get("/getNew"));
app.get("/queryByTag",loader.get("/queryByTag"));
app.get("/queryByTagCount", loader.get("/queryByTagCount"))
app.listen(globalConfig.port, function (){
    // console.log(express.static("./PersonalBlog/page/"));
    // console.log(express)
    console.log("服务器已启动");
})