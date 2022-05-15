import express, { Application, Request, Response, NextFunction } from "express";
const sql = require("./db");

// this file has 2 models exported: transactionsBlockchain & transactionsWebsite

export default class TransactionBlockchain {
	private user_id: string;
	private publicAddress: string;
	private amount: number;

	constructor(transactionBlockchain: any) {
		this.user_id = transactionBlockchain.user_id;
		this.publicAddress = transactionBlockchain.publicAddress;
		this.amount = transactionBlockchain.amount;
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
				console.log("created transaction: ", { id: res.insertId, ...newtransaction });
				result(null, { id: res.insertId, ...newtransaction });
			}
		);
	}

	static getAll(result: any) {
		sql.query("SELECT * FROM transactionsBlockchain", (err: Error, res: Response) => {
			if (err) {
				console.log("error: ", err);
				result(err, null);
				return;
			}
			console.log("user: ", res);
			result(null, res);
		});
	}

	static findById(user_id: any, result: any) {
		sql.query(
			`SELECT * FROM users WHERE id = ${user_id}`,
			(err: Error, res: any) => {
				if (err) {
					console.log("error: ", err);
					result(err, null);
					return;
				}

				if (res.length) {
					console.log("found user: ", res[0]);
					result(null, res[0]);
					return;
				}
				// havent found a user:
				result({ kind: "not_found" }, null);
			}
		);
	}


} // end of the class:


export  class TransactionWebsite {
	private user_id: string;
	private type: string;
    private price: number;
	private amount: number;

	constructor(transactionWebsite: any) {
		this.user_id = transactionWebsite.user_id;
		this.type = transactionWebsite.type;
        this.price = transactionWebsite.price
		this.amount = transactionWebsite.amount;
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

				console.log("created transaction: ", { id: res.insertId, ...newtransaction });
				result(null, { id: res.insertId, ...newtransaction });
			}
		);
	}

	static getAll(result: any) {
		sql.query("SELECT * FROM transactionsWebsite", (err: Error, res: Response) => {
			if (err) {
				console.log("error: ", err);
				result(err, null);
				return;
			}
			console.log("user: ", res);
			result(null, res);
		});
	}

	static findById(user_id: any, result: any) {
		sql.query(
			`SELECT * FROM users WHERE id = ${user_id}`,
			(err: Error, res: any) => {
				if (err) {
					console.log("error: ", err);
					result(err, null);
					return;
				}
				if (res.length) {
					console.log("found user: ", res[0]);
					result(null, res[0]);
					return;
				}
				// havent found a user:
				result({ kind: "not_found" }, null);
			}
		);
	}


} // end of the class


