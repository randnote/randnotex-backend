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
// constructor
var Card = /** @class */ (function () {
    function Card(card) {
        this.user_id = card.user_id;
        this.cardnumber = card.cardnumber;
        this.carddetails = card.carddetails;
        this.month = card.month;
        this.year = card.year;
        this.cvc = card.cvc;
    }
    // create method:
    Card.create = function (newcard, result) {
        sql.query("INSERT INTO cards SET ?", newcard, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("created card: ", __assign({ id: res.insertId }, newcard));
            result(null, __assign({ id: res.insertId }, newcard));
        });
    };
    // delete a card:
    Card.delete = function (cardId, result) {
        sql.query("DELETE FROM cards WHERE id = ?", cardId, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("Deleted a card with the ID ".concat(cardId));
            result(null, {
                success: true,
                message: "Card has been deleted sucessfully",
            });
        });
    };
    // get all cards for a particular user:
    Card.getAllUser = function (userId, result) {
        sql.query("SELECT * FROM cards WHERE user_id = ".concat(userId, ";"), function (err, res) {
            if (res.length < 1) {
                result(null, {
                    success: false,
                    msg: "user owns no cards",
                });
                return;
            }
            else if (res.length) {
                console.log("found cards: ", res);
                result(null, res);
                return;
            }
            else if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            // havent found a user:
            result({ kind: "not_found" }, null);
        });
    };
    return Card;
}()); // end of the class
exports.default = Card;
//# sourceMappingURL=cards.model.js.map