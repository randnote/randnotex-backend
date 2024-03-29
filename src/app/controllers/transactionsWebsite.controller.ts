import { Application, Request, Response, NextFunction } from "express";
import TransactionWebsite from "../models/transactionsWebsite.model";
import { PUBLICKEY, PRIVATEKEY } from "../config/randnoteSiteKey";
import Axios from "axios";
import updateBalance from "../updateBalance";
import calculatePrice from "../price";
import { BLOCKCHAIN_API, FRONTEND_API, BACKEND_API } from "../..";

// Create transactionWebsite:
exports.create = (req: Request, res: Response) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
		console.log("empty");
	}

	let amount: any = req.body.amount;
	const transaction = new TransactionWebsite({
		user_id: req.body.user_id,
		price: req.body.price,
		amount: req.body.amount,
		ordertype: req.body.ordertype,
		notes: req.body.notes,
		timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
	});

	TransactionWebsite.create(transaction, async (err: Error, data: object) => {
		if (err) {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while creating the transaction.",
			});
		} else {
			if (req.body.ordertype == "buy") {
				//get first...
				Axios.get(`${BACKEND_API}/getKeys/${req.body.user_id}`)
					.then((newRes) => {
						let transactionInformation = {
							fromAddress: PUBLICKEY,
							toAddress: newRes.data[0].publicKey, //
							fromAddressPrivateKey: PRIVATEKEY,
							amount: req.body.notes,
						};
						let snack = JSON.stringify(transactionInformation);

						// now , send the info to the blockchain
						Axios.post(`${BLOCKCHAIN_API}/transaction`, {
							obj: snack,
						})
							.then((res) => {
								// increase the value of price coz we bought...
								// we make a little calculation to increase price twice in the calculate price function
								let buy_sell = true; // if its a sell, its false
								let buy_sell_value = amount;
								calculatePrice(buy_sell, buy_sell_value);
							})
							.catch((err) => {
								console.log(err);
							});
					})
					.catch((err) => {
						console.log(err);
					});

				//
				res.send(data);
			} else if (req.body.ordertype == "sell") {
				console.log("we wanna sell");
				Axios.get(`${BACKEND_API}/getKeys/${req.body.user_id}`)
					.then((newRes) => {
						let transactionInformation = {
							fromAddress: newRes.data[0].publicKey,
							toAddress: PUBLICKEY,
							fromAddressPrivateKey: newRes.data[0].privateKey,
							amount: req.body.notes,
						};
						let snack = JSON.stringify(transactionInformation);

						// now , send the info to the blockchain
						Axios.post(`${BLOCKCHAIN_API}/transaction`, {
							obj: snack,
						})
							.then((res) => {
								// increase the value of price coz we bought...
								// we make a little calculation to increase price twice in the calculate price function
								let buy_sell = false; // if its a sell, its false
								let buy_sell_value = amount;
								console.log(
									"buy sell value is :" + buy_sell_value
								);
								calculatePrice(buy_sell, buy_sell_value);

								updateBalance(
									req.body.user_id,
									"sell",
									req.body.amount
								);
							})
							.catch((err) => {
								console.log(err);
							});
					})
					.catch((err) => {
						console.log(err);
					});

				res.send(data);
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
