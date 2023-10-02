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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sql = require("./db");
var updateBalance_1 = __importDefault(require("../updateBalance"));
// when i create a transaction, if its a buy, i need to reduce their balance in the database...
// if its a sell, then i need to increase their balance... hectic.
var TransactionWebsite = /** @class */ (function () {
    function TransactionWebsite(transactionWebsite) {
        this.user_id = transactionWebsite.user_id;
        this.ordertype = transactionWebsite.ordertype;
        this.price = transactionWebsite.price;
        this.amount = transactionWebsite.amount;
        this.notes = transactionWebsite.notes;
        this.timestamp = transactionWebsite.timestamp;
    }
    TransactionWebsite.create = function (newtransaction, result) {
        var _this = this;
        sql.query("INSERT INTO transactionsWebsite SET ?", newtransaction, function (err, res) { return __awaiter(_this, void 0, void 0, function () {
            var obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (err) {
                            console.log("error: ", err);
                            result(err, null);
                            return [2 /*return*/];
                        }
                        obj = __assign({ id: res.insertId }, newtransaction);
                        return [4 /*yield*/, (0, updateBalance_1.default)(obj.user_id, obj.ordertype, obj.amount)];
                    case 1:
                        _a.sent();
                        result(null, __assign({ id: res.insertId }, newtransaction));
                        return [2 /*return*/];
                }
            });
        }); });
    };
    TransactionWebsite.getAll = function (result) {
        sql.query("SELECT * FROM transactionsWebsite", function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            // console.log("user: ", res);
            result(null, res);
        });
    };
    TransactionWebsite.findAllTransactionsUser = function (userId, result) {
        sql.query("SELECT * FROM transactionsWebsite WHERE user_id= ".concat(userId), function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            // console.log("user: ", res);
            result(null, res);
        });
    };
    return TransactionWebsite;
}()); // end of the class
exports.default = TransactionWebsite;
//# sourceMappingURL=transactionsWebsite.model.js.map