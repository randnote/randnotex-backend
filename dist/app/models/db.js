var mysqlconnect = require("mysql");
var dbConfigconnect = require("../config/db.config");
// Create a connection to the database
var connectionconnect = mysqlconnect.createConnection({
    host: dbConfigconnect.HOST,
    user: dbConfigconnect.USER,
    password: dbConfigconnect.PASSWORD,
    database: dbConfigconnect.DB,
});
//open the mysql connection:
connectionconnect.connect(function (error) {
    if (error)
        throw error;
    // console.log("Successfully connected to the database...");
});
module.exports = connectionconnect;
//# sourceMappingURL=db.js.map