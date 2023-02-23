import { Application, Request, Response, NextFunction } from "express";
import { calculatePriceClient } from "../price";

exports.getCurrentPrice = (req: any, res: any) => {
	calculatePriceClient((err: any, data: any) => {
		// res.send(data);
		
			if (err){
				res.sendStatus(500)({
					success: false,
					message:err,
					
				});
				console.log(err)
			}
			else{
				res.sendStatus(200).send(data);
			}
				
			
	});
};
