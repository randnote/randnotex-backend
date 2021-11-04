import { Application, Request, Response, NextFunction } from "express";
import Transaction from "../models/transactions.model";

exports.create = (req: Request, res: Response) => {
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
		console.log("empty");
	}


	// Transactions are a bit complicated to think and work on
	// I first need to go create the transaction route in the blockchain and come back to this...
	const transaction = new Transaction({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.staffnumber,
		password: req.body.password,
		verifiedEmail: req.body.verifiedEmail,
	});


	Transaction.create(transaction, (err: Error, data: object) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while creating the transaction.",
			});
		else res.send(data);
	});
};

exports.findAll = (req: Request, res: Response) => {
	Transaction.getAll((err: any, data: any): any => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving transactions.",
			});
		else res.send(data);
	});
};

exports.findOne = (req: any, res: any) => {
	Transaction.findById(req.params.userId, (err: any, data: any) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Transaction with id ${req.params.userId}.`,
				});
			} else {
				res.status(500).send({
					message:
						"Error retrieving Transaction with id " + req.params.userId,
				});
			}
		} else res.send(data);
	});
};
