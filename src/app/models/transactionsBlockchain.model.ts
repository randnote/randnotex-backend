import express, { Application, Request, Response, NextFunction } from "express";
const sql = require("./db");

export default class TransactionBlockchain {
	private user_id: string;
	private fromAddress: string;
	private toAddress: string;
	private notes: string;

	constructor(transactionBlockchain: any) {
		this.user_id = transactionBlockchain.user_id;
		this.fromAddress = transactionBlockchain.fromAddress;
		this.toAddress = transactionBlockchain.toAddress;
		this.notes = transactionBlockchain.notes;
	}

	static create(newtransaction: any, result: any) {
		sql.query(
			"INSERT INTO transactionsBlockchain SET ?",
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
			"SELECT * FROM transactionsBlockchain",
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

	static findAllById(user_id: any, result: any) {
		sql.query(
			`SELECT * FROM transactionsBlockchain WHERE user_id = ${user_id}`,
			(err: Error, res: any) => {
				if (err) {
					console.log("error: ", err);
					result(err, null);
					return;
				}

				if (res.length) {
					console.log("found transactions: ", res[0]);
					result(null, res[0]);
					return;
				}
				// havent found a user:
				result({ kind: "not_found" }, null);
			}
		);
	}
} // end of the class
