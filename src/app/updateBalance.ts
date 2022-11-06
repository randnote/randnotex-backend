import User from "./models/users.model";
import { updateBalanceType } from "./models/users.model";

/* This file in the switch statments calls addBalance() and reduceBalance() in the User Model */

const updateBalance = (userId: number, type: string, amount: number): void => {
	// console.log(userId + " " + type + " " + " " + amount);
	let updateObject = {
		userId: userId,
		type: type,
		amount: amount,
	};
	//
	switch (type) {
		case "deposit":
			User.addBalance(updateObject);
			break;
		case "withdrawal":
			User.reduceBalance(updateObject);
			break;
		case "buy":
			User.reduceBalance(updateObject);
			break;
		case "sell":
			User.addBalance(updateObject);
			break;
		// default:
		// 	break;
	}
};

export default updateBalance;
