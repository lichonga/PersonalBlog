var everyDay = require("../dao/everyDayDao.js");
var getNow = require("../util/timeUtil.js");
var writeutil = require("../util/respUtil.js");

var path = new Map();
function editEveryDay (req, res){
    req.on("data", function(data){
        everyDay.insertEveryDay(data.toString().trim(), getNow(), function(result){
            res.writeHead(200);
            res.write(writeutil.writeResult("sccuess", "添加成功", null));
            res.end();
        })
    })
}
path.set("/editEveryDay", editEveryDay);
function queryEveryDay (req, res){
   
        everyDay.queryEveryDay(function(result){
            res.writeHead(200);
            res.write(writeutil.writeResult("sccuess", "添加成功", result));
            res.end();
        })
    
}
path.set("/queryEveryDay", queryEveryDay);
module.exports.path = path;