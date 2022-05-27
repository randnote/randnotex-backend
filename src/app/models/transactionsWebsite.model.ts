import express, { Application, Request, Response, NextFunction } from "express";
const sql = require("./db");

export default class TransactionWebsite {
	private user_id: string;
	private ordertype: any;
	private price: number;
	private amount: number;
	private notes: number;
	private timestamp: Date | string;

	constructor(transactionWebsite: any) {
		this.user_id = transactionWebsite.user_id;
		this.ordertype = transactionWebsite.ordertype;
		this.price = transactionWebsite.price;
		this.amount = transactionWebsite.amount;
		this.notes = transactionWebsite.notes;
		this.timestamp = transactionWebsite.timestamp;
	}

	static create(newtransaction: any, result: any) {
		sql.query(
			"INSERT INTO transactionsWebsite SET ?",
			newtransaction,
			(err: Error, res: any) => {
				if (err) {
					console.log("error: ", err);
					result(err, null);
					return;
				}

				console.log("created transaction: ", {
					id: res.insertId,
					...newtransaction,
				});
				result(null, { id: res.insertId, ...newtransaction });
			}
		);
	}

	static getAll(result: any) {
		sql.query(
			"SELECT * FROM transactionsWebsite",
			(err: Error, res: Response) => {
				if (err) {
					console.log("error: ", err);
					result(err, null);
					return;
				}
				console.log("user: ", res);
				result(null, res);
			}
		);
	}

	// static findById(user_id: any, result: any) {
	// 	sql.query(
	// 		`SELECT * FROM transactionsWebsite WHERE id = ${user_id}`,
	// 		(err: Error, res: any) => {
	// 			if (err) {
	// 				console.log("error: ", err);
	// 				result(err, null);
	// 				return;
	// 			}
	// 			if (res.length) {
	// 				console.log("found user: ", res[0]);
	// 				result(null, res[0]);
	// 				return;
	// 			}
	// 			// havent found a transaction:
	// 			result({ kind: "not_found" }, null);
	// 		}
	// 	);
	// }
} // end of the class
