import express, { Application, Request, Response, NextFunction } from "express";
const sql = require("./db");


/*I have to edit this entire file... this is temporary....*/

interface userType {
	firstname: string;
	lastname: string;
	email: string;
	verifiedEmail: boolean;
	password: string;
}

// constructor
export default class Transaction {
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
				result(null, err);
				return;
			}
			console.log("user: ", res);
			result(null, res);
		});
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

	// login the user:
	static login(obj: any, result: any) {
		sql.query(
			`SELECT * FROM users WHERE email = ${obj.email} AND password = ${obj.password}`,
			(err: Error, res: any) => {
				if (err) {
					result(
						{
							success: false,
							message: "wrong parameters provided",
						},
						null
					);
					return;
				}

				if (res.length) {
					result(null, { success: "true", result: res[0] });
					// send success email here
					return;
				}

				result({ kind: "not_found" }, null);
			}
		);
	}
} // end of the class:
