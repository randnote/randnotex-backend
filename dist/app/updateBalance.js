"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var users_model_1 = __importDefault(require("./models/users.model"));
/* This file in the switch statments calls addBalance() and reduceBalance() in the User Model */
var updateBalance = function (userId, type, amount) {
    // console.log(userId + " " + type + " " + " " + amount);
    // console.log("updatebalance is called ")
    var updateObject = {
        userId: userId,
        type: type,
        amount: amount,
    };
    //
    switch (type) {
        case "deposit":
            users_model_1.default.addBalance(updateObject);
            break;
        case "withdrawal":
            users_model_1.default.reduceBalance(updateObject);
            break;
        case "buy":
            users_model_1.default.reduceBalance(updateObject);
            break;
        case "sell":
            users_model_1.default.addBalance2(updateObject);
            break;
        // default:
        // 	break;
    }
};
exports.default = updateBalance;
//# sourceMappingURL=updateBalance.js.map