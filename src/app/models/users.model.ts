import express, { Application, Request, Response, NextFunction } from "express";
const sql = require("./db");
import { KeysType } from "../keys/generateKeys";

export interface userType {
	id?: number;
	firstname: string;
	lastname: string;
	email: string;
	verifiedEmail: boolean;
	password: string;
}

export interface depositType {
	user_id: number;
	card_id: number;
	amount: number;
	timestamp: Date| string;
}

export interface addressesType {
	user_id: number | undefined;
	publicAddress: string;
	privateAddress: string;
}

export interface updateBalanceType{
	userId: number,
	type: string,
	amount: number
}

// constructor
export default class User {
	private firstname: string;
	private lastname: string;
	private password: string;
	private email: string;
	private verifiedEmail: boolean;

	constructor(user: userType) {
		this.firstname = user.firstname;
		this.lastname = user.lastname;
		this.password = user.password;
		this.email = user.email;
		this.verifiedEmail = user.verifiedEmail;
	}

	// create method:
	static create(newuser: any, result: any) {
		sql.query(
			"INSERT INTO users SET ?",
			newuser,
			(err: Error, res: any) => {
				if (err) {
					console.log("error: ", err);
					result(err, null);
					return;
				}

				console.log("created user: ", { id: res.insertId, ...newuser });
				result(null, { id: res.insertId, ...newuser });
			}
		);
	}

	// get all method:
	static getAll(result: any) {
		sql.query("SELECT * FROM users", (err: Error, res: Response) => {
			if (err) {
				console.log("error: ", err);
				result(err, null);
				return;
			}
			console.log("user: ", res);
			result(null, res);
		});
	}

	static findAutoGens(result: any) {
		sql.query(
			"SELECT * FROM users WHERE `email` LIKE '%randnoteGen.com' ",
			(err: Error, res: Response) => {
				if (err) {
					console.log("error: ", err);
					result(err, null);
					return;
				}
				console.log("Users: ", res);
				result(null, res);
			}
		);
	}

	// find an user by ID method:
	static findById(user: any, result: any) {
		sql.query(
			`SELECT * FROM users WHERE id = ${user}`,
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

	static addUserAddresses(userAddressObject: addressesType, result) {
		sql.query(
			"INSERT INTO addresses SET ?",
			userAddressObject,
			(err: Error, res: any) => {
				if (err) {
					console.log("error: ", err);
					result(err, null);
					return;
				}

				console.log("Inserted into user addresses: ", {
					id: res.insertId,
					...userAddressObject,
				});
				result(null, { id: res.insertId, ...userAddressObject });
			}
		);
	}

	// login the user:
	static login(obj: any, result: any) {
		console.log(obj);

		sql.query(
			`SELECT * FROM users WHERE email = '${obj.email}' AND password = '${obj.password}'`,
			(err: Error, res: any) => {
				if (err) {
					if (err) {
						console.log("error: ", err);
						result(err, null);
						return;
					}
					console.log(err);
					return;
				}

				if (res.length) {
					result(null, { success: true, result: res[0] });
				}

				if (res.length === 0) {
					result(
						{
							success: false,
						},
						null
					);
				}
			}
		);
	}

	static deposit = (obj: depositType, result: any) => {
		sql.query("INSERT INTO deposits SET ?", obj, (err: Error, res: any) => {
			if (err) {
				console.log("error: ", err);
				result(err, null);
				return;
			}

			console.log("created deposit: ", { id: res.insertId, ...obj });
			result(null, { id: res.insertId, ...obj });
		});
	};

	static addBalance = async(updateObject: updateBalanceType) =>{
		// first get the existing balance... and add to it.
		let existingBalance : number ;
		let newBalance : number;
		this.zarbalance(updateObject.userId, (err: Error, data: number)=>{
			if(err){
				console.log(err)
			}
			existingBalance = data;
			newBalance = updateObject.amount+ existingBalance;

			sql.query(`UPDATE users SET balance = '${newBalance}' WHERE id='${updateObject.userId}' `, (err: Error, res: any) => {
				if (err) {
					console.log("error: ", err);
					//result(err, null);
					return;
				}

				console.log(res)
			}); // end of query

		}); // end of addBalance func

		
	}

	static reduceBalance = (updateObject: updateBalanceType) =>{

		// first get the existing balance and reduce it.

	}

	static zarbalance = (userId: number| number, result: any) => {
		sql.query(`SELECT balance FROM users WHERE id = ${userId}`, (err: Error, res: Response) => {
			if (err) {
				console.log("error: ", err);
				result(err, null);
				return;
			}
			// console.log("zarbalance ..: ", res);
			result(null, res[0].balance);
			
		});
	};
} // end of the class:
