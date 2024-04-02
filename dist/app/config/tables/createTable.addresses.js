"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAddresses = void 0;
exports.createAddresses = "create table if not exists addresses(\n    id int primary key auto_increment,\n    user_id int not null,\n    publicAddress MEDIUMTEXT not null,\n    privateAddress MEDIUMTEXT not null\n)";
//# sourceMappingURL=createTable.addresses.js.map