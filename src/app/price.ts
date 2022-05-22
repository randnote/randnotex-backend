import Axios from "axios";

let PRICE: number = 1;

const getSupply = () =>{
   
    // remember to add env variable here...
	
}


const calculatePrice = async() =>{
    let supply = 23;
    
    await  Axios.get(`http://localhost:8033/supply`).then(
            async(response: any) => {
                // let data = response;
                supply = await response.data.supply;
                return  supply;
                // return response.data.supply;
                // console.log(response.data);
            }
        ).catch(err =>{
            console.log(err)
        });
    
        return supply;
}

// module.exports = {calculatePrice}
export default calculatePrice