import Axios from "axios";

let PRICE: number = 1000;
let CURRENT_SUPPLY : number = 100;

// this function just calls the blockchain to get the number of notes in circulation
const getSupply = async() =>{
    let supply = 0;

    // remember to add env variable here...
	await  Axios.get(`http://localhost:8033/supply`).then(
        async(response: any) => {
            supply = await response.data.supply;
            return  supply;
        }
    ).catch(err =>{
        console.log(err)
    });
    return supply;
}

const calculatePrice = async() =>{
    let NEW_SUPPLY: number = await getSupply();

    // price based off of increased supply:
    // check if old mySupply is still the same as the new, if not, it means that it increased and so we decrease the price:
    if(CURRENT_SUPPLY !==  NEW_SUPPLY){
        
        let s: number = CURRENT_SUPPLY/NEW_SUPPLY;
        s= s * 100;
        PRICE = PRICE * s/100;
        CURRENT_SUPPLY = NEW_SUPPLY;
    }

    return PRICE;
}

// module.exports = {calculatePrice}
export default calculatePrice