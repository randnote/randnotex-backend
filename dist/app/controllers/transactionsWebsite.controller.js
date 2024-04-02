"use strict";
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
var transactionsWebsite_model_1 = __importDefault(require("../models/transactionsWebsite.model"));
var randnoteSiteKey_1 = require("../config/randnoteSiteKey");
var axios_1 = __importDefault(require("axios"));
var updateBalance_1 = __importDefault(require("../updateBalance"));
var price_1 = __importDefault(require("../price"));
var __1 = require("../..");
// Create transactionWebsite:
exports.create = function (req, res) {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        console.log("empty");
    }
    var amount = req.body.amount;
    var transaction = new transactionsWebsite_model_1.default({
        user_id: req.body.user_id,
        price: req.body.price,
        amount: req.body.amount,
        ordertype: req.body.ordertype,
        notes: req.body.notes,
        timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
    });
    transactionsWebsite_model_1.default.create(transaction, function (err, data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (err) {
                res.status(500).send({
                    message: err.message ||
                        "Some error occurred while creating the transaction.",
                });
            }
            else {
                if (req.body.ordertype == "buy") {
                    //get first...
                    axios_1.default.get("".concat(__1.BACKEND_API, "/getKeys/").concat(req.body.user_id))
                        .then(function (newRes) {
                        var transactionInformation = {
                            fromAddress: randnoteSiteKey_1.PUBLICKEY,
                            toAddress: newRes.data[0].publicKey,
                            fromAddressPrivateKey: randnoteSiteKey_1.PRIVATEKEY,
                            amount: req.body.notes,
                        };
                        var snack = JSON.stringify(transactionInformation);
                        // now , send the info to the blockchain
                        axios_1.default.post("".concat(__1.BLOCKCHAIN_API, "/transaction"), {
                            obj: snack,
                        })
                            .then(function (res) {
                            // increase the value of price coz we bought...
                            // we make a little calculation to increase price twice in the calculate price function
                            var buy_sell = true; // if its a sell, its false
                            var buy_sell_value = amount;
                            (0, price_1.default)(buy_sell, buy_sell_value);
                        })
                            .catch(function (err) {
                            console.log(err);
                        });
                    })
                        .catch(function (err) {
                        console.log(err);
                    });
                    //
                    res.send(data);
                }
                else if (req.body.ordertype == "sell") {
                    console.log("we wanna sell");
                    axios_1.default.get("".concat(__1.BACKEND_API, "/getKeys/").concat(req.body.user_id))
                        .then(function (newRes) {
                        var transactionInformation = {
                            fromAddress: newRes.data[0].publicKey,
                            toAddress: randnoteSiteKey_1.PUBLICKEY,
                            fromAddressPrivateKey: newRes.data[0].privateKey,
                            amount: req.body.notes,
                        };
                        var snack = JSON.stringify(transactionInformation);
                        // now , send the info to the blockchain
                        axios_1.default.post("".concat(__1.BLOCKCHAIN_API, "/transaction"), {
                            obj: snack,
                        })
                            .then(function (res) {
                            // increase the value of price coz we bought...
                            // we make a little calculation to increase price twice in the calculate price function
                            var buy_sell = false; // if its a sell, its false
                            var buy_sell_value = amount;
                            console.log("buy sell value is :" + buy_sell_value);
                            (0, price_1.default)(buy_sell, buy_sell_value);
                            (0, updateBalance_1.default)(req.body.user_id, "sell", req.body.amount);
                        })
                            .catch(function (err) {
                            console.log(err);
                        });
                    })
                        .catch(function (err) {
                        console.log(err);
                    });
                    res.send(data);
                }
            }
            return [2 /*return*/];
        });
    }); });
};
// Get all the transactionsWebsite for a single user:
exports.WebsitefindAllUser = function (req, res) {
    transactionsWebsite_model_1.default.findAllTransactionsUser(parseInt(req.params.userId), function (err, data) {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Not found User with id ".concat(req.params.userId, "."),
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving User with id " +
                        req.params.userId,
                });
            }
        }
        else
            res.status(200).send({
                success: true,
                data: data,
            });
    });
};
//# sourceMappingURL=transactionsWebsite.controller.js.map