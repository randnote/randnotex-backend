import Axios from "axios";
import { Console } from "console";

let PRICE: number = 1000;
let CURRENT_SUPPLY: number = 100; // careful buddy, this starting supply can cause infite numbers if not set correctly
let BUYING_PERCENTAGE_INCREASE :number = 20; 
/*
	THIS FILE IS VERY IMPORTANT:
	- we re calculate price whenever there is a mine...
	- we re calculate price whenever there is a buy... and sell too.
	- CURRENT_SUPPLY just keeps track of the overall supply of the blockchains notes out in the public....

	THEREFORE: if you ever want to display the supply, you can either give user the CURRENT_SUPPLY 
	or you can look in the blockchain itself. !
*/

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

const calculatePrice = async (buy_sell?: boolean, buy_sell_value?: number) => {
	// buy_sell_value is the amount we bought for.. eg R400 for 0.4 notes.
	// will use buy_sell to influence price more, at a later stage...

	
	let returnedPrice = 0;
	
	// means that we have a buy order.. so increase price:
	calculatePriceClient((err: any, data: any) => {
		if (err) {
			console.log("error: ", err);
			return;
		} else {
			if(buy_sell == true){
				// buy order... increase price:
				console.log('my data is :'+data)
				let percentage = (data * BUYING_PERCENTAGE_INCREASE) / 100 ;// we incerease price by 20 percent
				returnedPrice = data + percentage;
				console.log('new price after buy order is: '+ returnedPrice)
				PRICE = returnedPrice;
				return returnedPrice;
			}else if(buy_sell == false){
				// sell order... decrease price:
				// console.log(data)
				let percentage = (data * BUYING_PERCENTAGE_INCREASE) / 100 ;// we incerease price by 20 percent
				returnedPrice = data - percentage;
				PRICE = returnedPrice;
				return returnedPrice;
			}
			
		}
	});

	// if (CURRENT_SUPPLY !== NEW_SUPPLY) {
	// 	let s: number = CURRENT_SUPPLY / NEW_SUPPLY;
	// 	s = s * 100;
	// 	//PRICE = (PRICE * s) / 100;
	// 	console.log({
	// 		s: s,
	// 		price: PRICE,
	// 		CURRENT_SUPPLY: CURRENT_SUPPLY,
	// 		NEW_SUPPLY: NEW_SUPPLY,
	// 	});
	// 	console.log("price returned is: " + PRICE);
	// 	return PRICE;
	// }
};

const calculatePriceClient = async (result: any) => {
	let NEW_SUPPLY: number = await getSupply();
	console.log(
		"new-Supply is : " + NEW_SUPPLY + "CurrentSupply is : " + CURRENT_SUPPLY
	);

	// this doesnt do anything, it just makes sure that the supply is never below 100;
	if (NEW_SUPPLY === 0) {
		NEW_SUPPLY = 100;
		result(null, PRICE);
	}

	// console.log("current supply is : "+ CURRENT_SUPPLY + ". New supply is: "+ NEW_SUPPLY)
	if (CURRENT_SUPPLY !== NEW_SUPPLY) {
		let s: number = CURRENT_SUPPLY / NEW_SUPPLY;
		s = s * 100;
		PRICE = (PRICE * s) / 100;
		console.log({
			s: s,
			price: PRICE,
			CURRENT_SUPPLY: CURRENT_SUPPLY,
			NEW_SUPPLY: NEW_SUPPLY,
		});
		console.log("price returned is: " + PRICE);
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
