"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var sql = require("./db");
var TransactionBlockchain = /** @class */ (function () {
    function TransactionBlockchain(transactionBlockchain) {
        this.user_id = transactionBlockchain.user_id;
        this.fromAddress = transactionBlockchain.fromAddress;
        this.toAddress = transactionBlockchain.toAddress;
        this.notes = transactionBlockchain.notes;
    }
    TransactionBlockchain.create = function (newtransaction, result) {
        sql.query("INSERT INTO transactionsBlockchain SET ?", newtransaction, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("created transaction: ", __assign({ id: res.insertId }, newtransaction));
            result(null, __assign({ id: res.insertId }, newtransaction));
        });
    };
    TransactionBlockchain.getAll = function (result) {
        sql.query("SELECT * FROM transactionsBlockchain", function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("user: ", res);
            result(null, res);
        });
    };
    TransactionBlockchain.findAllById = function (user_id, result) {
        sql.query("SELECT * FROM transactionsBlockchain WHERE user_id = ".concat(user_id), function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.length) {
                console.log("found transactions: ", res[0]);
                result(null, res[0]);
                return;
            }
            // havent found a user:
            result({ kind: "not_found" }, null);
        });
    };
    return TransactionBlockchain;
}()); // end of the class
exports.default = TransactionBlockchain;
//# sourceMappingURL=transactionsBlockchain.model.js.map