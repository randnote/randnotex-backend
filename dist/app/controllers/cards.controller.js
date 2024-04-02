"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cards_model_1 = __importDefault(require("../models/cards.model"));
exports.create = function (req, res) {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        console.log("empty");
    }
    var card = new cards_model_1.default({
        user_id: req.body.user_id,
        cardnumber: req.body.cardnumber,
        carddetails: req.body.carddetails,
        month: req.body.month,
        year: req.body.year,
        cvc: req.body.cvc,
    });
    // console.log("body is ", req.body);
    cards_model_1.default.create(card, function (err, data) {
        if (err)
            res.status(500).send({
                message: err.message ||
                    "Some error occurred while creating the Card.",
            });
        else
            res.send(data);
    });
};
// get all cards per user
exports.findAllUser = function (req, res) {
    cards_model_1.default.getAllUser(req.params.userId, function (err, data) {
        if (err) {
            res.status(500).send({
                message: err.message ||
                    "Some error occurred while retrieving Users.",
            });
        }
        // else {res.status(200).send({
        // 	success: 200,
        // 	res: res
        // }));
        else {
            res.status(200).send({
                success: true,
                result: data,
            });
        }
    });
};
exports.delete = function (req, res) {
    cards_model_1.default.delete(req.params.cardId, function (err, data) {
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
exports.deposit = function () {
    //
};
//# sourceMappingURL=cards.controller.js.map