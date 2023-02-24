import { Application, Request, Response, NextFunction } from "express";
import { calculatePriceClient } from "../price";

// I ran into issues... this express wont allow me to sendStatus and all that...

exports.getCurrentPrice = (req: any, res: any) => {
	calculatePriceClient((err: any, data: any) => {
		// res.send(data);
		console.log("ran")
		// if (err) {
		// 	// res.sendStatus(400)({
		// 	// 	success: false,
		// 	// 	message: err,
		// 	// });
		// 	res.status(404).send('Sorry, the requested resource could not be found.');
		if (err) {
			console.log("error: ", err);
			res(err, null);
			return;
		}else{
			res.send({
				success: true,
				data: data,
			});
			return;
		}

		
		
		
	});
};
