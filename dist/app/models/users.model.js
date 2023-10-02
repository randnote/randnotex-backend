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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var sql = require("./db");
// constructor
var User = /** @class */ (function () {
    function User(user) {
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.password = user.password;
        this.email = user.email;
        this.verifiedEmail = user.verifiedEmail;
    }
    // create method:
    User.create = function (newuser, result) {
        sql.query("INSERT INTO users SET ?", newuser, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("created user: ", __assign({ id: res.insertId }, newuser));
            result(null, __assign({ id: res.insertId }, newuser));
        });
    };
    // get all method:
    User.getAll = function (result) {
        sql.query("SELECT * FROM users", function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("user: ", res);
            result(null, res);
        });
    };
    User.findAutoGens = function (result) {
        sql.query("SELECT * FROM users WHERE `email` LIKE '%randnotex.co.za' ", function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            // console.log("Users: ", res);
            result(null, res);
        });
    };
    // find an user by ID method:
    User.findById = function (userId, result) {
        sql.query("SELECT * FROM users WHERE id = ".concat(userId), function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.length) {
                console.log("found user: ", res[0]);
                result(null, res[0]);
                return;
            }
            // havent found a user:
            result({ kind: "not_found" }, null);
        });
    };
    // find the keys of the user, by inner joining the user table and addresses table:
    // im realizing that i never needed to Join anything, i wouldve been just fine with SELECT all from addresses where user_id = id.. lol
    User.getKeys = function (userId, result) {
        console.log("getKeys model called");
        sql.query("SELECT users.id AS user_id, addresses.publicAddress AS publicKey, addresses.privateAddress AS privateKey FROM users\n\t\t\tINNER JOIN addresses ON users.id = addresses.user_id\n\t\t\tWHERE users.id = ".concat(userId, " "), function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.length) {
                // console.log("found user: ", res[0]);
                // console.log(res)
                result(null, res);
                return;
            }
            // havent found a user:
            result({ kind: "not_found" }, null);
        });
    };
    // this is used by the automator to get a bunch of users information
    User.getData = function (result) {
        sql.query("SELECT users.id AS user_id, users.balance AS balance, users.email AS email, addresses.publicAddress AS publicKey, addresses.privateAddress AS privateKey FROM users\n\t\t\tINNER JOIN addresses ON users.id = addresses.user_id", function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.length) {
                result(null, res);
                return;
            }
            // havent found a user:
            result({ kind: "not_found" }, null);
        });
    };
    User.addUserAddresses = function (userAddressObject, result) {
        sql.query("INSERT INTO addresses SET ?", userAddressObject, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("Inserted into user addresses: ", __assign({ id: res.insertId }, userAddressObject));
            result(null, __assign({ id: res.insertId }, userAddressObject));
        });
    };
    // login the user:
    User.login = function (obj, result) {
        console.log(obj);
        sql.query("SELECT * FROM users WHERE email = '".concat(obj.email, "' AND password = '").concat(obj.password, "'"), function (err, res) {
            if (err) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                console.log(err);
                return;
            }
            if (res.length) {
                result(null, { success: true, result: res[0] });
            }
            if (res.length === 0) {
                result({
                    success: false,
                }, null);
            }
        });
    };
    var _a;
    _a = User;
    User.deposit = function (obj, result) {
        sql.query("INSERT INTO deposits SET ?", obj, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("created deposit: ", __assign({ id: res.insertId }, obj));
            result(null, __assign({ id: res.insertId }, obj));
        });
    };
    User.addBalance = function (updateObject) { return __awaiter(void 0, void 0, void 0, function () {
        var existingBalance, newBalance, updateObjAmount;
        return __generator(_a, function (_b) {
            existingBalance = 0;
            this.zarbalance(updateObject.userId, function (err, data) {
                if (err) {
                    console.log(err);
                }
                existingBalance = data;
                updateObjAmount = parseFloat(updateObject.amount.toFixed(2));
                newBalance = updateObjAmount + existingBalance;
                console.log(newBalance);
                sql.query("UPDATE users SET balance = '".concat(newBalance, "' WHERE id='").concat(updateObject.userId, "' "), function (err, res) {
                    if (err) {
                        console.log("error: ", err);
                        return;
                    }
                    console.log(res);
                }); // end of query
            }); // end of addBalance func
            return [2 /*return*/];
        });
    }); };
    User.addBalance2 = function (updateObject) { return __awaiter(void 0, void 0, void 0, function () {
        var existingBalance, newBalance, updateObjAmount;
        return __generator(_a, function (_b) {
            existingBalance = 0;
            // console.log("updateobject is : "+updateObject)
            this.zarbalance(updateObject.userId, function (err, data) {
                if (err) {
                    console.log(err);
                }
                existingBalance = data;
                // console.log(updateObject)
                // console.log(existingBalance)
                // updateObjAmount = parseFloat(updateObject.amount.toFixed(2));
                updateObjAmount = updateObject.amount;
                newBalance = updateObjAmount + existingBalance;
                // console.log(newBalance);
                console.log(existingBalance);
                console.log(newBalance);
                sql.query("UPDATE users SET balance = '".concat(newBalance, "' WHERE id='").concat(updateObject.userId, "' "), function (err, res) {
                    if (err) {
                        console.log("error: ", err);
                        return;
                    }
                    console.log(res);
                });
            }); // end of addBalance func
            return [2 /*return*/];
        });
    }); };
    User.reduceBalance = function (updateObject) {
        // first get the existing balance... and add to it.
        var existingBalance = 0;
        var newBalance;
        var updateObjAmount;
        _a.zarbalance(updateObject.userId, function (err, data) {
            if (err) {
                console.log(err);
            }
            existingBalance = data;
            newBalance = existingBalance - updateObject.amount;
            console.log(newBalance);
            sql.query("UPDATE users SET balance = '".concat(newBalance, "' WHERE id='").concat(updateObject.userId, "' "), function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    return;
                }
                console.log(res);
            }); // end of query
        }); // end of addBalance func
    };
    User.zarbalance = function (userId, result) {
        sql.query("SELECT balance FROM users WHERE id = ".concat(userId), function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, res[0].balance);
        });
    };
    return User;
}()); // end of the class:
exports.default = User;
//# sourceMappingURL=users.model.js.map