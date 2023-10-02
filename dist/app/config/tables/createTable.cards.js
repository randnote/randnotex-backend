"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCards = void 0;
// admins table:
exports.createCards = "create table if not exists cards(\n    id int primary key auto_increment,\n    user_id int not null,\n    cardnumber varchar(200) not null,\n    carddetails varchar(200) not null,\n    month int not null,\n    year int not null,\n    cvc int not null\n)";
//# sourceMappingURL=createTable.cards.js.map