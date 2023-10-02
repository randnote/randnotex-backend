"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWithdrawalsTable = void 0;
exports.createWithdrawalsTable = "create table if not exists withdrawals(\n    id int primary key auto_increment,\n    user_id int not null,\n    card_id int not null,\n    amount decimal(10,2) not null,\n    timestamp DATETIME not null\n\n)";
//# sourceMappingURL=createTable.withdrawals.js.map