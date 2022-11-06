import { Application, Request, Response, NextFunction } from "express";
import TransactionWebsite from "../models/transactionsWebsite.model";
import { PUBLICKEY, PRIVATEKEY } from "../config/randnoteSiteKey";
import Axios  from "axios";
const User = require("../controllers/users.controller");

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
		else {
			res.send(data);

			// we need to send this user some NOTES:
			// i need to user the users id to get their private and public key
			let obj = User.getKeysLocal(req.body.user_id);
			console.log(obj);
			// console.log()
			// if the user is buying notes- we send them notes:
			if (req.body.ordertype == "buy") {
				let transactionInformation = {
					fromAddress: PUBLICKEY,
					toAddress: obj.publicKey, //
					fromAddressPrivateKey: PRIVATEKEY,
					amount: req.body.notes,
				};

				// now call the blockchain to execute:
				Axios.post(`http://localhost:8033/transaction`, transactionInformation)
					.then((res) => {
						console.log(res.data);
					})
					.catch((err) => {
						console.log(err);
					});
			} else if (req.body.ordertype == "sell") {
				// before i do this, i need to extract their public and private address
			}
		}
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
