"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import queries:
var createTable_users_1 = require("./tables/createTable.users");
var createTable_addresses_1 = require("./tables/createTable.addresses");
var createTable_cards_1 = require("./tables/createTable.cards");
var createTable_transactions_1 = require("./tables/createTable.transactions");
var createTable_withdrawals_1 = require("./tables/createTable.withdrawals");
var createTable_deposits_1 = require("./tables/createTable.deposits");
// import mysql functions:
var mysql = require("mysql");
var dbConfig = require("./db.config");
// Create a connection to the database
var connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
});
// connect to the MySQL server
connection.connect(function (err) {
    if (err) {
        return console.error("error: " + err.message);
    }
    var createTable = function (query, msg) {
        connection.query(query, function (err, results, fields) {
            if (err) {
                console.log(err.message);
            }
            else {
                console.log(msg);
            }
        });
    };
    console.log("Successfully connected to the database.");
    createTable(createTable_users_1.createUsers, "Successfully created the users table");
    createTable(createTable_addresses_1.createAddresses, "Successfully created the addresses table");
    createTable(createTable_cards_1.createCards, "Successfully created the cards table");
    createTable(createTable_transactions_1.createTransactionBlockchain, "Successfully created the transactionsBlockchain table");
    createTable(createTable_transactions_1.createTransactionWebsite, "Successfully created the transactionsWebsite table");
    createTable(createTable_withdrawals_1.createWithdrawalsTable, "Successfully created the withdrawals table");
    createTable(createTable_deposits_1.createDepositsTable, "Successfully created the deposits table");
});
//# sourceMappingURL=createTables.js.map