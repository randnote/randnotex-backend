import Axios from "axios";
import { Console } from "console";

let PRICE: number = 1000;
let CURRENT_SUPPLY: number = 100; // careful buddy, this starting supply can cause infite numbers if not set correctly

// this function just calls the blockchain to get the number of notes in circulation
const getSupply = async () => {
	let supply: number = 0;

	// remember to add env variable here...
	await Axios.get(`http://localhost:8033/supply`)
		.then(async (response: any) => {
			supply = await response.data.supply;
			return supply;
		})
		.catch((err) => {
			console.log(err);
		});
	return supply;
};

const calculatePrice = async () => {
	let NEW_SUPPLY: number = await getSupply();
	if (NEW_SUPPLY === 0) {
		// console.log("caught ya");
		NEW_SUPPLY = 100;
	}
	// price based off of increased supply:
	// check if old mySupply is still the same as the new, if not, it means that it increased and so we decrease the price:

	// console.log(CURRENT_SUPPLY);
	// console.log(NEW_SUPPLY);
	if (CURRENT_SUPPLY !== NEW_SUPPLY) {
		let s: number = CURRENT_SUPPLY / NEW_SUPPLY;
		s = s * 100;
		PRICE = (PRICE * s) / 100;
		CURRENT_SUPPLY = NEW_SUPPLY;
		console.log({
			s: s,
			price: PRICE,
			CURRENT_SUPPLY: CURRENT_SUPPLY,
			NEW_SUPPLY: NEW_SUPPLY,
		});
	}

	// now , write an influencer when user buys and sells....

	
	return PRICE;
};

const calculatePriceClient = async (result: any) => {
	let NEW_SUPPLY: number = await getSupply();
	if (NEW_SUPPLY === 0) {
		// console.log("caught ya");
		NEW_SUPPLY = 100;
		result(null, PRICE);
	}

	if (CURRENT_SUPPLY !== NEW_SUPPLY) {
		let s: number = CURRENT_SUPPLY / NEW_SUPPLY;
		s = s * 100;
		PRICE = (PRICE * s) / 100;
		CURRENT_SUPPLY = NEW_SUPPLY;
		console.log({
			s: s,
			price: PRICE,
			CURRENT_SUPPLY: CURRENT_SUPPLY,
			NEW_SUPPLY: NEW_SUPPLY,
		});
		result(null, PRICE);
	}
};

// write a controller that returns the price to the api....
const getPriceCOntroller = () => {
	return null;
};

// module.exports = {calculatePrice}
export default calculatePrice;
export { calculatePriceClient };
