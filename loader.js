var fs = require("fs");
var globalConfig = require("./config");
var pathMap = new Map();
var files = fs.readdirSync(globalConfig["web_path"]);
for (var i = 0; i < files.length; i++){
    // console.log(files);
    var temp = require("./" + globalConfig["web_path"] + "/" + files[i]);
    // console.log(temp)
    if(temp.path){
        for (var [key, value] of temp.path){
            if(pathMap.get(key) == null){
                pathMap.set(key, value);
            }else{
                throw new Error("url path 异常" + key)
            }
        }
        
    }
}
// console.log(pathMap.get("/editEveryDay"))
module.exports = pathMap;