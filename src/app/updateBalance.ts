import User from "./models/users.model";
import { updateBalanceType } from "./models/users.model";

const updateBalance = (userId: number, type: string, amount: number): void => {
	let updateObject = {
		userId: userId,
		type: type,
		amount: amount,
	};
	//
	switch (type) {
		case "deposit":
			// call user.updatebalance
			User.addBalance(updateObject);
			break;
		case "withdrawal":
		//
		case "buyorder":
		//
		case "sellorder":
		//
		default:
			break;
	}
};

export default updateBalance;
