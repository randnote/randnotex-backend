import { Application, Request, Response, NextFunction } from "express";
// import User from "../models/users.model";
import TransactionBlockchain,{ TransactionWebsite} from '../models/transactions.model'

// --- This file has to controllers: the transactionBlockchain & transactionWebsite

exports.createTransactionBlockchain = (req: Request, res: Response) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
		console.log("empty");
	}
	const transaction = new TransactionBlockchain({
		user_id: req.body.user_id,
		publicAddress: req.body.publicAddress,
		amount: req.body.amount
	});

	TransactionBlockchain.create(transaction, (err: Error, data: object) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while creating the User.",
			});
		else res.send(data);
	});
};

// Get all the transactionsBlockchain for a single user:


// -------------------------------------------------------------------

// Create transactionWebsite:
exports.createTransactionWebsite = (req: Request, res: Response) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
		console.log("empty");
	}
	const transaction = new TransactionWebsite({
		user_id: req.body.user_id,
		type: req.body.type,
        price: req.body.price,
		amount: req.body.amount
	});

	TransactionWebsite.create(transaction, (err: Error, data: object) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while creating the User.",
			});
		else res.send(data);
	});
};

// Get all the transactionsWebsite for a single user: