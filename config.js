var fs = require("fs");
var globalConfig = {};
// console.log(fs)
var conf = fs.readFileSync("./PersonalBlog/server.conf");
var configArr = conf.toString().split("\r\n");
for (var i = 0; i < configArr.length; i++){
    globalConfig[configArr[i].split("=")[0].trim()] = configArr[i].split("=")[1].trim();
}
module.exports = globalConfig;