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
var users_model_1 = __importDefault(require("../models/users.model"));
var generateKeys_1 = __importDefault(require("../keys/generateKeys"));
var updateBalance_1 = __importDefault(require("../updateBalance"));
exports.create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a, privateKey, publicKey, userKeys;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                // Validate request
                if (!req.body) {
                    res.status(400).send({
                        message: "Content can not be empty!",
                    });
                    console.log("empty");
                }
                user = new users_model_1.default({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: req.body.password,
                    verifiedEmail: false,
                });
                return [4 /*yield*/, (0, generateKeys_1.default)()];
            case 1:
                _a = _b.sent(), privateKey = _a.privateKey, publicKey = _a.publicKey;
                userKeys = {
                    publicKey: publicKey,
                    privateKey: privateKey,
                };
                users_model_1.default.create(user, function (err, data) {
                    if (err)
                        res.status(500).send({
                            message: err.message ||
                                "Some error occurred while creating the User.",
                        });
                    else {
                        var userAddressObject = {
                            user_id: data.id,
                            publicAddress: publicKey,
                            privateAddress: privateKey,
                        };
                        // store their keys now...
                        users_model_1.default.addUserAddresses(userAddressObject, function (err, data) {
                            if (err) {
                                console.log(err);
                                res.status(500).send({
                                    message: err.message ||
                                        "Error while inserting addresses to the database.",
                                });
                            }
                            console.log("seemingly ran without error");
                        });
                        res.send({
                            success: true,
                            data: data,
                        });
                    }
                });
                return [2 /*return*/];
        }
    });
}); };
exports.findOne = function (req, res) {
    users_model_1.default.findById(req.params.userId, function (err, data) {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Not found User with id ".concat(req.params.userId, "."),
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.userId,
                });
            }
        }
        else
            res.send(data);
    });
};
exports.getKeys = function (req, res) {
    users_model_1.default.getKeys(req.params.userId, function (err, data) {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Not found User with id ".concat(req.params.userId, "."),
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.userId,
                });
            }
        }
        else
            res.send(data);
    });
};
exports.getKeysLocal = function (userId) {
    users_model_1.default.getKeys(userId, function (err, data) {
        if (err) {
            if (err.kind === "not_found") {
                // res.status(404).send({
                // 	message: `Not found User with id ${req.params.userId}.`,
                // });
                return 404;
            }
            else {
                // res.status(500).send({
                // 	message:
                // 		"Error retrieving User with id " + req.params.userId,
                // });
                return 500;
            }
        }
        else
            return data;
    });
};
exports.getData = function (req, res) {
    users_model_1.default.getData(function (err, data) {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "NO users were found.",
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving Users",
                });
            }
        }
        else
            res.send(data);
    });
};
exports.findAutoGens = function (req, res) {
    users_model_1.default.findAutoGens(function (err, data) {
        if (err)
            res.status(500).send({
                message: err.message ||
                    "Some error occurred while retrieving Users.",
            });
        else
            res.send(data);
    });
};
exports.signin = function (req, res) {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        console.log("empty");
    }
    var obj = {
        email: req.body.email,
        password: req.body.password,
    };
    users_model_1.default.login(obj, function (err, data) {
        if (err)
            res.send({
                success: false,
                message: /*err.message ||*/ "wrong username or password",
            });
        else
            res.send({
                success: true,
                data: data,
            });
    });
};
exports.signup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a, privateKey, publicKey, userKeys;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                // Validate request
                if (!req.body) {
                    res.status(400).send({
                        message: "Content can not be empty!",
                    });
                    console.log("empty");
                }
                user = new users_model_1.default({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: req.body.password,
                    verifiedEmail: false,
                });
                return [4 /*yield*/, (0, generateKeys_1.default)()];
            case 1:
                _a = _b.sent(), privateKey = _a.privateKey, publicKey = _a.publicKey;
                userKeys = {
                    publicKey: publicKey,
                    privateKey: privateKey,
                };
                users_model_1.default.create(user, function (err, data) {
                    if (err)
                        res.status(500).send({
                            message: err.message ||
                                "Some error occurred while creating the User.",
                        });
                    else {
                        var userAddressObject = {
                            user_id: data.id,
                            publicAddress: publicKey,
                            privateAddress: privateKey,
                        };
                        // store their keys now...
                        users_model_1.default.addUserAddresses(userAddressObject, function (err, data) {
                            if (err) {
                                console.log(err);
                                res.status(500).send({
                                    message: err.message ||
                                        "Error while inserting addresses to the database.",
                                });
                            }
                            console.log("seemingly ran without error");
                        });
                        res.send({
                            success: true,
                            data: data,
                        });
                    }
                });
                return [2 /*return*/];
        }
    });
}); };
exports.deposit = function (req, res) {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        console.log("empty");
    }
    var date = new Date().toISOString().slice(0, 19).replace("T", " ");
    var depositObject = {
        user_id: req.body.userId,
        card_id: req.body.cardId,
        amount: req.body.amount,
        timestamp: date,
    };
    users_model_1.default.deposit(depositObject, function (err, data) {
        if (err) {
            res.status(500).send({
                message: err.message || "An error has occured",
            });
        }
        else {
            // call update balance here...
            res.status(200).send({
                status: 200,
                message: "Deposit of ".concat(req.body.amount, " has been inserted successfully"),
            });
            console.log("the deposit is:" + req.body.amount);
            (0, updateBalance_1.default)(req.body.userId, "deposit", parseFloat(req.body.amount));
        }
    });
};
exports.zarbalance = function (req, res) {
    //
    users_model_1.default.zarbalance(req.params.userId, function (err, data) {
        if (err) {
            res.status(500).send({
                message: err.message ||
                    "An error occured while retrieving the balance.",
            });
        }
        else {
            res.status(200).send({
                success: true,
                balance: data,
                message: "userId : ".concat(req.params.userId, " has the balance of ").concat(data),
            });
        }
    });
};
//# sourceMappingURL=users.controller.js.map