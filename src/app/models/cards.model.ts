import express, { Application, Request, Response, NextFunction } from "express";
const sql = require("./db");

interface cardType {
	user_id: number;
	cardnumber: number;
	carddetails: string;
	month: number;
	year: number;
	cvc: number;
}

// constructor
export default class Card {
	private user_id: number;
	private cardnumber: number;
	private carddetails: string;
	private month: number;
	private year: number;
	private cvc: number;

	constructor(card: cardType) {
		this.user_id = card.user_id;
		this.cardnumber = card.cardnumber;
		this.carddetails = card.carddetails;
		this.month = card.month;
		this.year = card.year;
		this.cvc = card.cvc;
	}

	// create method:
	static create(newcard: any, result: any) {
		sql.query(
			"INSERT INTO cards SET ?",
			newcard,
			(err: Error, res: any) => {
				if (err) {
					console.log("error: ", err);
					result(err, null);
					return;
				}

				console.log("created card: ", { id: res.insertId, ...newcard });
				result(null, { id: res.insertId, ...newcard });
			}
		);
	}

	// delete a card:
	static delete(cardId: any, result: any) {
		sql.query(
			"DELETE FROM cards WHERE id = ?",
			cardId,
			(err: Error, res: any) => {
				if (err) {
					console.log("error: ", err);
					result(err, null);
					return;
				}

				console.log("Deleted card: ", { id: res.insertId, ...cardId });
				result(null, { id: res.insertId, ...cardId });
			}
		);
	}
	
	// get all cards for a particular user:
	static getAllUser(userId: any, result:any){
		sql.query(
			`SELECT * FROM cards WHERE user_id = ${userId};`,
			(err: Error, res: any) => {
				if (err) {
					console.log("error: ", err);
					result(err, null);
					return;
				}

				if (res.length) {
					console.log("found cards: ", res);
					result(null, res);
					return;
				}
				// havent found a user:
				result({ kind: "not_found" }, null);
			}
		);
	}

	
} // end of the class
