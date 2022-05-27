import { Application, Request, Response, NextFunction } from "express";
import TransactionWebsite from "../models/transactionsWebsite.model";

// Create transactionWebsite:
exports.create = (req: Request, res: Response) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
		console.log("empty");
	}

	const transaction = new TransactionWebsite({
		user_id: req.body.user_id,
		price: req.body.price,
		amount: req.body.amount,
		ordertype: req.body.ordertype,
		notes: req.body.notes,
		timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
	});

	TransactionWebsite.create(transaction, (err: Error, data: object) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while creating the transaction.",
			});
		else res.send(data);
	});
};

// Get all the transactionsWebsite for a single user:

exports.WebsitefindAllUser = (req: Request, res: Response) => {
	TransactionWebsite.findAllTransactionsUser(
		parseInt(req.params.userId),
		(err: any, data: any) => {
			if (err) {
				if (err.kind === "not_found") {
					res.status(404).send({
						message: `Not found User with id ${req.params.userId}.`,
					});
				} else {
					res.status(500).send({
						message:
							"Error retrieving User with id " +
							req.params.userId,
					});
				}
			} else
				res.status(200).send({
					success: true,
					data: data,
				});
		}
	);
};
