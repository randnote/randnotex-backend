import { Application, Request, Response, NextFunction } from "express";
import TransactionBlockchain from '../models/transactionsBlockchain.model'

exports.create = (req: Request, res: Response) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
		console.log("empty");
	}
	const transaction = new TransactionBlockchain({
		user_id :req.body.user_id,
		fromAddress: req.body.fromAddress,
		toAddress: req.body.toAddress,
		notes :req.body.notes
	});

	TransactionBlockchain.create(transaction, (err: Error, data: object) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while creating the transaction.",
			});
		else res.send(data);
	});
};

exports.BlockchainfindAll = (req: Request, res: Response) =>{
	TransactionBlockchain.getAll((err: any, data: any): any => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving BlockchainTransactions.",
			});
		else res.send(data);
	});
}

// find all the BlockchainTransactions that a user once made: 
exports.BlockchainfindAllUser = (req: Request, res: Response) =>{
	TransactionBlockchain.findAllById(req.params.userId, (err: any, data: any) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found User with id ${req.params.userId}.`,
				});
			} else {
				res.status(500).send({
					message:
						"Error retrieving User with id " + req.params.userId,
				});
			}
		} else res.send(data);
	});
}