"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDepositsTable = void 0;
exports.createDepositsTable = "create table if not exists deposits(\n    id int primary key auto_increment,\n    user_id int not null,\n    card_id int not null,\n    amount decimal(10,2) not null,\n    timestamp DATETIME not null\n)";
//# sourceMappingURL=createTable.deposits.js.map