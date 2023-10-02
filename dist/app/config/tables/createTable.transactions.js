"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransactionWebsite = exports.createTransactionBlockchain = void 0;
exports.createTransactionBlockchain = "create table if not exists transactionsBlockchain(\n    id int primary key auto_increment,\n    user_id int not null,\n    fromAddress MEDIUMTEXT not null,\n    toAddress MEDIUMTEXT not null,\n    notes decimal(36,18) not null,\n    timestamp DATETIME not null\n\n)";
exports.createTransactionWebsite = "create table if not exists transactionsWebsite(\n    id int primary key auto_increment,\n    user_id int not null,\n    price decimal(10,2) not null,\n    ordertype varchar(100) not null,  \n    amount decimal(10,2) not null,\n    notes decimal(36,18) not null,\n    timestamp DATETIME not null\n\n)";
//# sourceMappingURL=createTable.transactions.js.map