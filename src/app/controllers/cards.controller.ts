import { Application, Request, Response, NextFunction } from "express";
import Card from "../models/cards.model";

exports.create = (req: Request, res: Response) => {
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
		console.log("empty");
	}

	const card = new Card({
		user_id: req.body.user_id,
		cardnumber: req.body.cardnumber,
		carddetails: req.body.carddetails,
		month: req.body.month,
		year: req.body.year,
		cvc: req.body.cvc,
	});

	console.log("body is ", req.body);

	Card.create(card, (err: Error, data: object) => {
		if (err)
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while creating the Card.",
			});
		else res.send(data);
	});
};

