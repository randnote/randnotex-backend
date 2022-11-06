import { Application, Request, Response, NextFunction } from "express";
import User, {
	depositType,
	userType,
	addressesType,
} from "../models/users.model";
import generateKeys, { KeysType } from "../keys/generateKeys";
import updateBalance from "../updateBalance";

exports.create = async (req: Request, res: Response) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
		console.log("empty");
	}

	const user = new User({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		password: req.body.password,
		verifiedEmail: false,
	});

	let { privateKey, publicKey } = await generateKeys();

	const userKeys: KeysType = {
		publicKey: publicKey,
		privateKey: privateKey,
	};

	User.create(user, (err: Error, data: userType) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while creating the User.",
			});
		else {
			const userAddressObject: addressesType = {
				user_id: data.id,
				publicAddress: publicKey,
				privateAddress: privateKey,
			};

			// store their keys now...
			User.addUserAddresses(
				userAddressObject,
				(err: Error, data: any) => {
					if (err) {
						console.log(err);
						res.status(500).send({
							message:
								err.message ||
								"Error while inserting addresses to the database.",
						});
					}
					console.log("seemingly ran without error");
				}
			);

			res.send({
				success: true,
				data: data,
			});
		}
	});
};

exports.findOne = (req: any, res: any) => {
	User.findById(req.params.userId, (err: any, data: any) => {
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
};

exports.getKeys = (req: any, res: any) => {
	User.getKeys(req.params.userId, (err: any, data: any) => {
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
};
exports.getKeysLocal = (userId: any) => {
	User.getKeys(userId, (err: any, data: any) => {
		if (err) {
			if (err.kind === "not_found") {
				// res.status(404).send({
				// 	message: `Not found User with id ${req.params.userId}.`,
				// });
				return 404;
			} else {
				// res.status(500).send({
				// 	message:
				// 		"Error retrieving User with id " + req.params.userId,
				// });
				return 500;
			}
		} else return data;
	});
};
exports.getData = (req: any, res: any) => {
	User.getData((err: any, data: any) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `NO users were found.`,
				});
			} else {
				res.status(500).send({
					message:
						"Error retrieving Users",
				});
			}
		} else res.send(data);
	});
};

exports.findAutoGens = (req: any, res: any) => {
	User.findAutoGens((err: any, data: any): any => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving Users.",
			});
		else res.send(data);
	});
};

exports.signin = (req: Request, res: Response) => {
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
		console.log("empty");
	}
	const obj = {
		email: req.body.email,
		password: req.body.password,
	};

	User.login(obj, (err: any, data: any) => {
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

exports.signup = async (req: Request, res: Response) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
		console.log("empty");
	}

	const user = new User({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		password: req.body.password,
		verifiedEmail: false,
	});

	let { privateKey, publicKey } = await generateKeys();

	const userKeys: KeysType = {
		publicKey: publicKey,
		privateKey: privateKey,
	};

	User.create(user, (err: Error, data: userType) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while creating the User.",
			});
		else {
			const userAddressObject: addressesType = {
				user_id: data.id,
				publicAddress: publicKey,
				privateAddress: privateKey,
			};

			// store their keys now...
			User.addUserAddresses(
				userAddressObject,
				(err: Error, data: any) => {
					if (err) {
						console.log(err);
						res.status(500).send({
							message:
								err.message ||
								"Error while inserting addresses to the database.",
						});
					}
					console.log("seemingly ran without error");
				}
			);

			res.send({
				success: true,
				data: data,
			});
		}
	});
};

exports.deposit = (req: Request, res: Response) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
		console.log("empty");
	}

	let date: string = new Date().toISOString().slice(0, 19).replace("T", " ");
	const depositObject: depositType = {
		user_id: req.body.userId,
		card_id: req.body.cardId,
		amount: req.body.amount,
		timestamp: date,
	};

	User.deposit(depositObject, (err: any, data: any) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error has occured",
			});
		} else {
			// call update balance here...

			res.status(200).send({
				status: 200,
				message: `Deposit of ${req.body.amount} has been inserted successfully`,
			});
			console.log("the deposit is:" + req.body.amount);
			updateBalance(
				req.body.userId,
				"deposit",
				parseFloat(req.body.amount)
			);
		}
	});
};

exports.zarbalance = (req: Request, res: Response) => {
	//
	User.zarbalance(req.params.userId, (err: any, data: number) => {
		if (err) {
			res.status(500).send({
				message:
					err.message ||
					"An error occured while retrieving the balance.",
			});
		} else {
			res.status(200).send({
				success: true,
				balance: data,
				message: `userId : ${req.params.userId} has the balance of ${data}`,
			});
		}
	});
};
