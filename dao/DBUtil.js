var mysql = require("mysql");
function createContention(){
    var connection = mysql.createConnection({
        host: "127.0.0.1",
        port: "3306",
        user: "root",
        password: "123456789",
        database: "my_blog"
    });
    return connection;
};
module.exports.createContention = createContention;