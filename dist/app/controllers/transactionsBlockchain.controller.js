"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var transactionsBlockchain_model_1 = __importDefault(require("../models/transactionsBlockchain.model"));
exports.create = function (req, res) {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        console.log("empty");
    }
    // timestamp:
    var d = new Date();
    var timestamp = d.valueOf() / 1000;
    var transaction = new transactionsBlockchain_model_1.default({
        user_id: req.body.user_id,
        fromAddress: req.body.fromAddress,
        toAddress: req.body.toAddress,
        notes: req.body.notes,
        timestamp: timestamp,
    });
    transactionsBlockchain_model_1.default.create(transaction, function (err, data) {
        if (err)
            res.status(500).send({
                message: err.message ||
                    "Some error occurred while creating the transaction.",
            });
        else
            res.send(data);
    });
};
exports.BlockchainfindAll = function (req, res) {
    transactionsBlockchain_model_1.default.getAll(function (err, data) {
        if (err)
            res.status(500).send({
                message: err.message ||
                    "Some error occurred while retrieving BlockchainTransactions.",
            });
        else
            res.send(data);
    });
};
// find all the BlockchainTransactions that a user once made:
exports.BlockchainfindAllUser = function (req, res) {
    transactionsBlockchain_model_1.default.findAllById(req.params.userId, function (err, data) {
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
            res.send(data);
    });
};
//# sourceMappingURL=transactionsBlockchain.controller.js.map