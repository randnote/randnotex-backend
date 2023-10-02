"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (app) {
    var User = require("../controllers/users.controller");
    var TransactionsBlockchain = require("../controllers/transactionsBlockchain.controller");
    var TransactionsWebsite = require("../controllers/transactionsWebsite.controller");
    var Card = require("../controllers/cards.controller");
    var V = require("../valueDeterminer");
    var P = require("../controllers/price.controller");
    // users
    app.post("/signin", User.signin);
    app.post("/signup", User.signup);
    app.post("/usercreate", User.create);
    // app.get("/userfindall", User.findAll); // not impolemented
    app.get("/user/:userId", User.findOne);
    app.get("/zarbalance/:userId", User.zarbalance); // get zar balance
    app.post("/deposit", User.deposit); // create deposit
    // get users public/private keys...
    app.get("/getKeys/:userId", User.getKeys);
    // get price and send to the automator:
    app.get("/getCurrentPrice", P.getCurrentPrice);
    // get users keys and email addresses, given their id:
    // app.get("/getUserData", User.getData); // this is used by the automator
    // get users that are auto generated... (meaning, that have the email address : johnDoe@randnotex.com)
    // also, these are what i use in the automator
    app.get("/userfindAutoGens", User.findAutoGens);
    // app.get("/valueDeterminer/:amount", V.valueDeterminer);
    // transactionBlockchain
    app.post("/transactionBlockchain", TransactionsBlockchain.create); // make a transaction
    app.get("/transactionBlockchain", TransactionsBlockchain.BlockchainfindAll); // get all transactions to blockchain
    app.get("/transactionBlockchain/:userId", TransactionsBlockchain.BlockchainfindAllUser); // get all transactions per user
    // transactionWebsite
    app.post("/transactionWebsite", TransactionsWebsite.create); // make a transaction
    app.get("/transactionWebsite/:userId", TransactionsWebsite.WebsitefindAllUser); // get all transactions per user
    // cards
    app.post("/card", Card.create); // add a card
    app.get("/deletecard/:cardId", Card.delete); // is delete the right name??
    app.get("/cards/:userId", Card.findAllUser); // get a card per user
};
//# sourceMappingURL=index.routers.js.map